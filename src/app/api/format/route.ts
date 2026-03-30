import { NextRequest, NextResponse } from "next/server";
import prettier from "prettier";
import { FORMATTER_BY_ID, FormatterId, PluginKey } from "@/lib/formatters";

type FormatPayload = {
  formatter: FormatterId;
  input: string;
  secondaryInput?: string;
  action?: "format" | "minify" | "validate" | "oneLine" | "sort" | "stringify" | "compare";
};

const MAX_INPUT_LENGTH = 200_000;

const pluginLoaders: Record<PluginKey, () => Promise<unknown>> = {
  xml: () => import("@prettier/plugin-xml"),
  php: () => import("@prettier/plugin-php"),
  java: () => import("prettier-plugin-java"),
  csharp: () => import("prettier-plugin-csharp"),
};

async function loadPlugins(keys?: PluginKey[]): Promise<prettier.Plugin[]> {
  if (!keys || keys.length === 0) {
    return [];
  }

  const plugins = await Promise.all(
    keys.map(async (key) => {
      const mod = (await pluginLoaders[key]()) as Record<string, unknown>;
      return (mod.default ?? mod) as prettier.Plugin;
    }),
  );

  return plugins;
}

type SyntaxErrorDetails = {
  message: string;
  line: number | null;
  column: number | null;
  lineContent: string | null;
};

function parseSyntaxError(error: unknown, source: string): SyntaxErrorDetails {
  const message = error instanceof Error ? error.message : "Syntax error";
  const lineColMatch = message.match(/(?:line\s+)?(\d+)(?::|\s+column\s+)(\d+)/i);
  const lineOnlyMatch = message.match(/line\s+(\d+)/i);
  const positionMatch = message.match(/position\s+(\d+)/i);

  let line: number | null = null;
  let column: number | null = null;

  if (lineColMatch) {
    line = Number.parseInt(lineColMatch[1], 10);
    column = Number.parseInt(lineColMatch[2], 10);
  } else if (lineOnlyMatch) {
    line = Number.parseInt(lineOnlyMatch[1], 10);
  } else if (positionMatch) {
    const position = Number.parseInt(positionMatch[1], 10);
    if (!Number.isNaN(position)) {
      const contentUntilPosition = source.slice(0, position);
      const chunks = contentUntilPosition.split("\n");
      line = chunks.length;
      column = chunks[chunks.length - 1]?.length ? chunks[chunks.length - 1].length + 1 : 1;
    }
  }

  const lines = source.split("\n");
  const lineContent = line && line > 0 && line <= lines.length ? lines[line - 1] : null;

  return {
    message,
    line,
    column,
    lineContent,
  };
}

function minifyJson(input: string): string {
  return JSON.stringify(JSON.parse(input));
}

function sortJsonValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => sortJsonValue(item));
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).sort(([a], [b]) =>
      a.localeCompare(b),
    );

    return Object.fromEntries(entries.map(([key, val]) => [key, sortJsonValue(val)]));
  }

  return value;
}

function stringifyJsonInput(input: string): string {
  return JSON.stringify(input);
}

type JsonCompareResult = {
  onlyInLeft: string[];
  onlyInRight: string[];
  differentValues: string[];
  isEqual: boolean;
};

function collectJsonDifferences(
  left: unknown,
  right: unknown,
  path: string,
  result: JsonCompareResult,
): void {
  if (Array.isArray(left) && Array.isArray(right)) {
    const max = Math.max(left.length, right.length);
    for (let i = 0; i < max; i += 1) {
      const leftExists = i < left.length;
      const rightExists = i < right.length;
      const nextPath = `${path}[${i}]`;

      if (leftExists && !rightExists) {
        result.onlyInLeft.push(nextPath);
        continue;
      }

      if (!leftExists && rightExists) {
        result.onlyInRight.push(nextPath);
        continue;
      }

      collectJsonDifferences(left[i], right[i], nextPath, result);
    }
    return;
  }

  if (
    left &&
    right &&
    typeof left === "object" &&
    typeof right === "object" &&
    !Array.isArray(left) &&
    !Array.isArray(right)
  ) {
    const leftRecord = left as Record<string, unknown>;
    const rightRecord = right as Record<string, unknown>;
    const leftKeys = Object.keys(leftRecord);
    const rightKeys = Object.keys(rightRecord);

    for (const key of leftKeys) {
      const nextPath = path ? `${path}.${key}` : key;
      if (!(key in rightRecord)) {
        result.onlyInLeft.push(nextPath);
        continue;
      }

      collectJsonDifferences(leftRecord[key], rightRecord[key], nextPath, result);
    }

    for (const key of rightKeys) {
      const nextPath = path ? `${path}.${key}` : key;
      if (!(key in leftRecord)) {
        result.onlyInRight.push(nextPath);
      }
    }
    return;
  }

  if (JSON.stringify(left) !== JSON.stringify(right)) {
    result.differentValues.push(path || "$root");
  }
}

function compareJson(leftInput: string, rightInput: string): JsonCompareResult {
  const left = JSON.parse(leftInput);
  const right = JSON.parse(rightInput);

  const result: JsonCompareResult = {
    onlyInLeft: [],
    onlyInRight: [],
    differentValues: [],
    isEqual: false,
  };

  collectJsonDifferences(left, right, "", result);

  result.isEqual =
    result.onlyInLeft.length === 0 &&
    result.onlyInRight.length === 0 &&
    result.differentValues.length === 0;

  return result;
}

async function runPrettier(
  input: string,
  parser: string,
  plugins: prettier.Plugin[],
  action: "format" | "minify",
): Promise<string> {
  const options: prettier.Options = {
    parser: parser as prettier.BuiltInParserName,
    plugins,
    printWidth: action === "minify" ? Number.MAX_SAFE_INTEGER : 100,
    tabWidth: 2,
    semi: true,
    singleQuote: false,
    trailingComma: "all",
    bracketSpacing: action === "minify" ? false : true,
    proseWrap: action === "minify" ? "never" : "preserve",
    htmlWhitespaceSensitivity: action === "minify" ? "ignore" : "css",
  };

  return prettier.format(input, options);
}

function toPrettierAction(action: FormatPayload["action"]): "format" | "minify" {
  return action === "minify" || action === "oneLine" ? "minify" : "format";
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const payload = (await request.json()) as Partial<FormatPayload>;

    if (!payload || typeof payload.formatter !== "string" || typeof payload.input !== "string") {
      return NextResponse.json(
        { error: "Invalid payload. Expecting formatter and input." },
        { status: 400 },
      );
    }

    const formatter = payload.formatter as FormatterId;
    const action = payload.action ?? "format";
    const config = FORMATTER_BY_ID[formatter];

    if (!config) {
      return NextResponse.json({ error: "Unsupported formatter." }, { status: 400 });
    }

    if (!["format", "minify", "validate", "oneLine", "sort", "stringify", "compare"].includes(action)) {
      return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
    }

    if (payload.input.length > MAX_INPUT_LENGTH) {
      return NextResponse.json(
        { error: "Input is too large. Max 200,000 characters." },
        { status: 413 },
      );
    }

    const plugins = await loadPlugins(config.pluginKeys);

    try {
      if (action === "compare") {
        if (formatter !== "json") {
          return NextResponse.json(
            { error: "Compare action is only supported for JSON." },
            { status: 400 },
          );
        }

        if (typeof payload.secondaryInput !== "string") {
          return NextResponse.json(
            { error: "secondaryInput is required for compare action." },
            { status: 400 },
          );
        }

        const compare = compareJson(payload.input, payload.secondaryInput);
        return NextResponse.json({ compare, output: JSON.stringify(compare, null, 2), valid: true });
      }

      if (action === "sort") {
        if (formatter !== "json") {
          return NextResponse.json(
            { error: "Sort action is only supported for JSON." },
            { status: 400 },
          );
        }

        const sorted = sortJsonValue(JSON.parse(payload.input));
        return NextResponse.json({ output: JSON.stringify(sorted, null, 2), valid: true });
      }

      if (action === "stringify") {
        if (formatter !== "json") {
          return NextResponse.json(
            { error: "Stringify action is only supported for JSON toolset." },
            { status: 400 },
          );
        }

        return NextResponse.json({ output: stringifyJsonInput(payload.input), valid: true });
      }

      if (action === "validate") {
        if (formatter === "json") {
          JSON.parse(payload.input);
        } else {
          await runPrettier(payload.input, config.parser, plugins, "format");
        }

        return NextResponse.json({ valid: true });
      }

      let output = payload.input;

      if ((action === "minify" || action === "oneLine") && formatter === "json") {
        output = minifyJson(payload.input);
      } else {
        output = await runPrettier(payload.input, config.parser, plugins, toPrettierAction(action));
      }

      return NextResponse.json({ output, valid: true });
    } catch (error) {
      if (formatter === "mdx") {
        try {
          const output = await runPrettier(payload.input, "markdown", plugins, toPrettierAction(action));
          if (action === "validate") {
            return NextResponse.json({ valid: true });
          }

          return NextResponse.json({ output, valid: true });
        } catch (fallbackError) {
          const syntax = parseSyntaxError(fallbackError, payload.input);
          return NextResponse.json({ error: syntax.message, syntax }, { status: 400 });
        }
      }

      const syntax = parseSyntaxError(error, payload.input);
      return NextResponse.json({ error: syntax.message, syntax }, { status: 400 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Formatting failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

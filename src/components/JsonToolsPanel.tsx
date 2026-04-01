"use client";

import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import { useMemo, useState } from "react";
import { List, RowComponentProps } from "react-window";

type SyntaxErrorDetails = {
  message: string;
  line: number | null;
  column: number | null;
  lineContent: string | null;
};

type JsonAction = "format" | "validate" | "minify" | "oneLine" | "sort" | "stringify";

type FlatTreeNode = {
  path: string;
  label: string;
  depth: number;
  kind: "object" | "array" | "value";
  hasChildren: boolean;
  size: number;
  leafText: string;
  matched: boolean;
};

type TreeListData = {
  rows: FlatTreeNode[];
  toggleNode: (path: string) => void;
  isExpanded: (path: string) => boolean;
};

const actionMeta: Record<JsonAction, { title: string; desc: string }> = {
  format: { title: "JSON Formatter", desc: "Format and pretty print JSON" },
  validate: { title: "JSON Validator", desc: "Check syntax and report line errors" },
  minify: { title: "JSON Minify", desc: "Minify JSON payload size" },
  oneLine: { title: "JSON to One Line", desc: "Convert JSON into one single line" },
  sort: { title: "JSON Sorter", desc: "Sort keys recursively for deterministic diff" },
  stringify: { title: "JSON Stringify Online", desc: "Convert text to escaped JSON string" },
};

const defaultJson = '{\n  "name": "Daxnoria",\n  "version": 2,\n  "features": ["formatter", "seo", "validator"]\n}';

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getOffsetFromLineColumn(source: string, line: number, column: number): number {
  const lines = source.split("\n");
  const safeLine = Math.max(1, Math.min(line, lines.length));
  const safeColumn = Math.max(1, column);
  let offset = 0;

  for (let i = 0; i < safeLine - 1; i += 1) {
    offset += lines[i].length + 1;
  }

  const currentLine = lines[safeLine - 1] ?? "";
  offset += Math.min(safeColumn - 1, currentLine.length);
  return offset;
}

function highlightJsonWithError(source: string, syntaxError: SyntaxErrorDetails | null): string {
  const highlighted = Prism.highlight(source, Prism.languages.json, "json");
  if (!syntaxError?.line || source.length === 0) {
    return highlighted;
  }

  const lineStartOffset = getOffsetFromLineColumn(source, syntaxError.line, 1);
  if (lineStartOffset < 0 || lineStartOffset > source.length) {
    return highlighted;
  }

  const lineEndRaw = source.indexOf("\n", lineStartOffset);
  const lineEndOffset = lineEndRaw === -1 ? source.length : lineEndRaw;

  const before = source.slice(0, lineStartOffset);
  const errorLine = source.slice(lineStartOffset, lineEndOffset);
  const after = source.slice(lineEndOffset);

  const beforeHighlighted = Prism.highlight(before, Prism.languages.json, "json");
  const afterHighlighted = Prism.highlight(after, Prism.languages.json, "json");

  if (!syntaxError.column || syntaxError.column < 1 || syntaxError.column > errorLine.length) {
    const lineOnly = Prism.highlight(errorLine, Prism.languages.json, "json");
    return `${beforeHighlighted}<span class="json-error-line">${lineOnly}</span>${afterHighlighted}`;
  }

  const charOffset = syntaxError.column - 1;
  const lineBefore = errorLine.slice(0, charOffset);
  const lineCurrent = errorLine[charOffset] ?? "";
  const lineAfter = errorLine.slice(charOffset + 1);

  const lineBeforeHighlighted = Prism.highlight(lineBefore, Prism.languages.json, "json");
  const lineAfterHighlighted = Prism.highlight(lineAfter, Prism.languages.json, "json");
  const currentChar = lineCurrent === "\n" ? "↵" : escapeHtml(lineCurrent);

  const fullLine = `${lineBeforeHighlighted}<span class="json-error-char">${currentChar}</span>${lineAfterHighlighted}`;
  return `${beforeHighlighted}<span class="json-error-line">${fullLine}</span>${afterHighlighted}`;
}

function getNodeLeafText(value: unknown): string {
  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (value === null) {
    return "null";
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return JSON.stringify(value);
}

function createSearchMatcher(term: string, useRegex: boolean, caseSensitive: boolean): {
  matcher: (text: string) => boolean;
  error: string;
  hasTerm: boolean;
} {
  const normalizedTerm = term.trim();

  if (!normalizedTerm) {
    return {
      matcher: () => true,
      error: "",
      hasTerm: false,
    };
  }

  if (useRegex) {
    try {
      const flags = caseSensitive ? "" : "i";
      const regex = new RegExp(normalizedTerm, flags);
      return {
        matcher: (text: string) => regex.test(text),
        error: "",
        hasTerm: true,
      };
    } catch {
      return {
        matcher: () => true,
        error: "Invalid regex. Falling back to full tree view.",
        hasTerm: true,
      };
    }
  }

  const compareTerm = caseSensitive ? normalizedTerm : normalizedTerm.toLowerCase();
  return {
    matcher: (text: string) => {
      const source = caseSensitive ? text : text.toLowerCase();
      return source.includes(compareTerm);
    },
    error: "",
    hasTerm: true,
  };
}

function checkExpanded(path: string, defaultExpanded: boolean, overrides: Record<string, boolean>): boolean {
  const value = overrides[path];
  return value === undefined ? defaultExpanded : value;
}

function buildFlatTreeRows({
  value,
  matcher,
  hasTerm,
  defaultExpanded,
  overrides,
}: {
  value: unknown;
  matcher: (text: string) => boolean;
  hasTerm: boolean;
  defaultExpanded: boolean;
  overrides: Record<string, boolean>;
}): FlatTreeNode[] {
  function visit(nodeValue: unknown, label: string, path: string, depth: number): {
    included: boolean;
    rows: FlatTreeNode[];
  } {
    if (Array.isArray(nodeValue)) {
      const childResults = nodeValue.map((item, index) =>
        visit(item, `[${index}]`, `${path}[${index}]`, depth + 1),
      );
      const childHasMatch = childResults.some((item) => item.included);
      const selfMatch = matcher(label) || matcher(`array ${nodeValue.length}`);
      const included = !hasTerm || selfMatch || childHasMatch;

      if (!included) {
        return { included: false, rows: [] };
      }

      const isExpanded = checkExpanded(path, defaultExpanded, overrides);
      const rows: FlatTreeNode[] = [
        {
          path,
          label,
          depth,
          kind: "array",
          hasChildren: nodeValue.length > 0,
          size: nodeValue.length,
          leafText: "",
          matched: selfMatch,
        },
      ];

      if (isExpanded) {
        for (const child of childResults) {
          if (child.included) {
            rows.push(...child.rows);
          }
        }
      }

      return { included: true, rows };
    }

    if (nodeValue && typeof nodeValue === "object") {
      const entries = Object.entries(nodeValue as Record<string, unknown>);
      const childResults = entries.map(([key, item]) => visit(item, key, `${path}.${key}`, depth + 1));
      const childHasMatch = childResults.some((item) => item.included);
      const selfMatch = matcher(label) || matcher(`object ${entries.length}`);
      const included = !hasTerm || selfMatch || childHasMatch;

      if (!included) {
        return { included: false, rows: [] };
      }

      const isExpanded = checkExpanded(path, defaultExpanded, overrides);
      const rows: FlatTreeNode[] = [
        {
          path,
          label,
          depth,
          kind: "object",
          hasChildren: entries.length > 0,
          size: entries.length,
          leafText: "",
          matched: selfMatch,
        },
      ];

      if (isExpanded) {
        for (const child of childResults) {
          if (child.included) {
            rows.push(...child.rows);
          }
        }
      }

      return { included: true, rows };
    }

    const leafText = getNodeLeafText(nodeValue);
    const selfMatch = matcher(label) || matcher(leafText);
    const included = !hasTerm || selfMatch;

    if (!included) {
      return { included: false, rows: [] };
    }

    return {
      included: true,
      rows: [
        {
          path,
          label,
          depth,
          kind: "value",
          hasChildren: false,
          size: 0,
          leafText,
          matched: selfMatch,
        },
      ],
    };
  }

  return visit(value, "$root", "$root", 0).rows;
}

function TreeRow({ index, style, ariaAttributes, data }: RowComponentProps<{ data: TreeListData }>) {
  const node = data.rows[index];
  const isExpanded = node.hasChildren ? data.isExpanded(node.path) : false;

  return (
    <div style={style} {...ariaAttributes} className={`json-tree-row ${node.matched ? "is-match" : ""}`}>
      <div className="json-tree-row-inner" style={{ paddingLeft: node.depth * 18 + 8 }}>
        {node.hasChildren ? (
          <button type="button" className="tree-toggle inline" onClick={() => data.toggleNode(node.path)}>
            {isExpanded ? "-" : "+"}
          </button>
        ) : (
          <span className="tree-spacer" />
        )}

        {node.kind === "object" ? (
          <p className="json-tree-title">
            {node.label}: Object ({node.size} keys)
          </p>
        ) : null}

        {node.kind === "array" ? (
          <p className="json-tree-title">
            {node.label}: Array ({node.size} items)
          </p>
        ) : null}

        {node.kind === "value" ? <p className="json-tree-leaf inline">{node.label}: {node.leafText}</p> : null}
      </div>
    </div>
  );
}

export default function JsonToolsPanel() {
  const [leftInput, setLeftInput] = useState<string>(defaultJson);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [syntaxError, setSyntaxError] = useState<SyntaxErrorDetails | null>(null);
  const [selectedAction, setSelectedAction] = useState<JsonAction>("format");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [useRegex, setUseRegex] = useState<boolean>(false);
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [defaultTreeExpanded, setDefaultTreeExpanded] = useState<boolean>(true);
  const [expansionOverrides, setExpansionOverrides] = useState<Record<string, boolean>>({});

  const parsedSummary = useMemo(() => {
    try {
      const parsed = JSON.parse(leftInput) as unknown;
      if (Array.isArray(parsed)) {
        return `Type: array | Length: ${parsed.length}`;
      }

      if (parsed && typeof parsed === "object") {
        return `Type: object | Keys: ${Object.keys(parsed as Record<string, unknown>).length}`;
      }

      return `Type: ${typeof parsed}`;
    } catch {
      return "Parser: waiting for valid JSON";
    }
  }, [leftInput]);

  const parsedJson = useMemo(() => {
    try {
      return {
        value: JSON.parse(leftInput) as unknown,
        parseError: "",
      };
    } catch (parseError) {
      const message = parseError instanceof Error ? parseError.message : "Invalid JSON";
      return {
        value: null,
        parseError: message,
      };
    }
  }, [leftInput]);

  const searchConfig = useMemo(
    () => createSearchMatcher(searchTerm, useRegex, caseSensitive),
    [searchTerm, useRegex, caseSensitive],
  );

  const treeRows = useMemo(() => {
    if (parsedJson.parseError || parsedJson.value === null) {
      return [];
    }

    return buildFlatTreeRows({
      value: parsedJson.value,
      matcher: searchConfig.matcher,
      hasTerm: searchConfig.hasTerm,
      defaultExpanded: defaultTreeExpanded,
      overrides: expansionOverrides,
    });
  }, [parsedJson, searchConfig, defaultTreeExpanded, expansionOverrides]);

  function isExpanded(path: string): boolean {
    return checkExpanded(path, defaultTreeExpanded, expansionOverrides);
  }

  function toggleNode(path: string) {
    setExpansionOverrides((prev) => {
      const next = { ...prev };
      next[path] = !(prev[path] ?? defaultTreeExpanded);
      return next;
    });
  }

  function setAllTreeNodes(open: boolean) {
    setDefaultTreeExpanded(open);
    setExpansionOverrides({});
  }

  function jumpToError() {
    const inputEl = document.getElementById("json-editor-main") as HTMLTextAreaElement | null;

    if (!inputEl || !syntaxError?.line) {
      return;
    }

    const lines = leftInput.split("\n");
    const lineIndex = Math.max(0, syntaxError.line - 1);
    const columnIndex = Math.max(0, (syntaxError.column ?? 1) - 1);
    let absoluteIndex = 0;

    for (let i = 0; i < lineIndex; i += 1) {
      absoluteIndex += (lines[i]?.length ?? 0) + 1;
    }

    absoluteIndex += columnIndex;
    inputEl.focus();
    inputEl.setSelectionRange(absoluteIndex, absoluteIndex + 1);
  }

  async function runAction(action: JsonAction) {
    setSelectedAction(action);
    setIsLoading(true);
    setError("");
    setSyntaxError(null);

    try {
      const response = await fetch("/api/format", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formatter: "json",
          input: leftInput,
          action,
        }),
      });

      const data = (await response.json()) as {
        output?: string;
        error?: string;
        syntax?: SyntaxErrorDetails;
      };

      if (!response.ok) {
        if (data.syntax) {
          setSyntaxError(data.syntax);
        }
        throw new Error(data.error ?? "JSON tool failed.");
      }

      if (action === "validate") {
        setOutput("JSON is valid.");
      } else {
        setOutput(data.output ?? "");
      }
    } catch (toolError) {
      const message = toolError instanceof Error ? toolError.message : "Unknown JSON error";
      setError(message);
      setOutput("");
    } finally {
      setIsLoading(false);
    }
  }

  async function copyOutput() {
    if (!output) {
      return;
    }

    await navigator.clipboard.writeText(output);
  }

  const rowHeight = 34;
  const treeHeight = Math.min(420, Math.max(140, treeRows.length * rowHeight + 6));

  return (
    <section className="tool-shell" aria-label="JSON tools">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Advanced JSON toolkit</p>
          <h2>{actionMeta[selectedAction].title}</h2>
          <p className="eyebrow">{actionMeta[selectedAction].desc}</p>
        </div>

        <div className="control-row">
          <button className="btn primary" onClick={() => runAction("format")} disabled={isLoading}>
            JSON Formatter
          </button>
          <button className="btn" onClick={() => runAction("validate")} disabled={isLoading}>
            JSON Validator
          </button>
          <button className="btn" onClick={() => runAction("minify")} disabled={isLoading}>
            JSON Minify
          </button>
          <button className="btn" onClick={() => runAction("oneLine")} disabled={isLoading}>
            JSON to One Line
          </button>
          <button className="btn" onClick={() => runAction("sort")} disabled={isLoading}>
            JSON Sorter
          </button>
          <button className="btn" onClick={() => runAction("stringify")} disabled={isLoading}>
            JSON Stringify Online
          </button>
          <button className="btn" onClick={copyOutput} disabled={!output}>
            Copy output
          </button>
        </div>
      </div>

      <div className="json-tools-grid">
        <div className="editor-card">
          <p>JSON Editor / Reader Input</p>
          <Editor
            value={leftInput}
            onValueChange={(code) => setLeftInput(code)}
            highlight={(code) => highlightJsonWithError(code, syntaxError)}
            padding={12}
            className="json-editor"
            textareaId="json-editor-main"
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 14,
              minHeight: 270,
              border: "1px solid #2b3142",
              borderRadius: 12,
              background: "var(--code-bg)",
              color: "var(--code-ink)",
            }}
          />
        </div>

        <div className="editor-card">
          <p>Output / Viewer</p>
          <textarea value={output} readOnly spellCheck={false} placeholder="Run a JSON tool to see output" />
        </div>
      </div>

      <div className="editor-card compare-card">
        <p>JSON Grouped Viewer</p>
        <div className="tree-controls">
          <input
            type="text"
            className="tree-search"
            placeholder="Search key/value in tree..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <label className="tree-option">
            <input
              type="checkbox"
              checked={useRegex}
              onChange={(event) => setUseRegex(event.target.checked)}
            />
            Regex
          </label>
          <label className="tree-option">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(event) => setCaseSensitive(event.target.checked)}
            />
            Case sensitive
          </label>
          <button type="button" className="btn" onClick={() => setAllTreeNodes(true)}>
            Expand all
          </button>
          <button type="button" className="btn" onClick={() => setAllTreeNodes(false)}>
            Collapse all
          </button>
        </div>

        {searchConfig.error ? <p className="error">{searchConfig.error}</p> : null}

        {parsedJson.parseError ? (
          <p className="error">{parsedJson.parseError}</p>
        ) : (
          <div className="json-tree-wrap">
            <List
              rowCount={treeRows.length}
              rowHeight={rowHeight}
              rowComponent={TreeRow}
              rowProps={{
                data: {
                  rows: treeRows,
                  toggleNode,
                  isExpanded,
                },
              }}
              style={{ height: treeHeight, width: "100%" }}
            />
          </div>
        )}
      </div>

      <div className="json-meta-grid">
        <div className="editor-card">
          <p>JSON Parser / Viewer Summary</p>
          <pre>{parsedSummary}</pre>
        </div>
      </div>

      {error ? <p className="error">{error}</p> : null}
      {syntaxError ? (
        <div className="syntax-box" role="status" aria-live="polite">
          <p>
            Error line: {syntaxError.line ?? "unknown"} | column: {syntaxError.column ?? "unknown"}
          </p>
          <button type="button" className="btn" onClick={jumpToError}>
            Jump to error
          </button>
          {syntaxError.lineContent ? (
            <pre>
              {syntaxError.lineContent}
              {"\n"}
              {" ".repeat(Math.max((syntaxError.column ?? 1) - 1, 0))}^
            </pre>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

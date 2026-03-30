"use client";

import { useState } from "react";
import { FormatterId } from "@/lib/formatters";

type SyntaxErrorDetails = {
  message: string;
  line: number | null;
  column: number | null;
  lineContent: string | null;
};

type FormatterClientProps = {
  formatter: FormatterId;
  formatterLabel: string;
  sampleInput: string;
};

export default function FormatterClient({
  formatter,
  formatterLabel,
  sampleInput,
}: FormatterClientProps) {
  const [input, setInput] = useState<string>(sampleInput);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [syntaxError, setSyntaxError] = useState<SyntaxErrorDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function runAction(action: "format" | "minify" | "validate") {
    setIsLoading(true);
    setError("");
    setSyntaxError(null);

    if (action !== "validate") {
      setOutput("");
    }

    try {
      const response = await fetch("/api/format", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formatter,
          input,
          action,
        }),
      });

      const data = (await response.json()) as {
        output?: string;
        error?: string;
        valid?: boolean;
        syntax?: SyntaxErrorDetails;
      };

      if (!response.ok) {
        if (data.syntax) {
          setSyntaxError(data.syntax);
        }
        throw new Error(data.error ?? "Format failed.");
      }

      if (action === "validate") {
        setOutput("Syntax valid. No parse errors found.");
      } else {
        setOutput(data.output ?? "");
      }
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Unknown error";
      setError(message);
      if (action !== "validate") {
        setOutput("");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopy() {
    if (!output) {
      return;
    }

    await navigator.clipboard.writeText(output);
  }

  return (
    <section className="tool-shell" aria-label="Code formatter tool">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Formatter, minifier and syntax validator</p>
          <h2>{formatterLabel}</h2>
        </div>
        <div className="control-row">
          <button
            onClick={() => runAction("format")}
            disabled={isLoading || !input.trim()}
            className="btn primary"
          >
            {isLoading ? "Formatting..." : "Format now"}
          </button>
          <button
            onClick={() => runAction("minify")}
            disabled={isLoading || !input.trim()}
            className="btn"
          >
            Minify
          </button>
          <button
            onClick={() => runAction("validate")}
            disabled={isLoading || !input.trim()}
            className="btn"
          >
            Validate syntax
          </button>
          <button onClick={handleCopy} disabled={!output} className="btn">
            Copy output
          </button>
        </div>
      </div>

      <div className="editor-grid">
        <div className="editor-card">
          <p>Input</p>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            spellCheck={false}
            placeholder="Paste your code here"
          />
        </div>

        <div className="editor-card">
          <p>Output</p>
          <textarea value={output} readOnly spellCheck={false} placeholder="Formatted result will appear here" />
        </div>
      </div>

      {error ? <p className="error">{error}</p> : null}
      {syntaxError ? (
        <div className="syntax-box" role="status" aria-live="polite">
          <p>
            Error line: {syntaxError.line ?? "unknown"} | column: {syntaxError.column ?? "unknown"}
          </p>
          {syntaxError.lineContent ? <pre>{syntaxError.lineContent}</pre> : null}
        </div>
      ) : null}
    </section>
  );
}

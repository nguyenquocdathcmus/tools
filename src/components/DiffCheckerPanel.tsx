"use client";

import { useMemo, useState } from "react";

type DiffKind = "equal" | "insert" | "delete";

type DiffRow = {
  kind: DiffKind;
  leftLine: number | null;
  rightLine: number | null;
  text: string;
};

type DiffResult = {
  rows: DiffRow[];
  leftLineCount: number;
  rightLineCount: number;
  addedLines: number;
  removedLines: number;
  unchangedLines: number;
  isEqual: boolean;
};

const LEFT_SAMPLE = `const config = {
  theme: "dark",
  mode: "dev",
  features: ["format", "inspect", "count"],
};`;

const RIGHT_SAMPLE = `const config = {
  theme: "dark",
  mode: "production",
  features: ["format", "inspect", "count", "decode"],
};`;

function splitLines(source: string): string[] {
  if (!source) {
    return [];
  }

  return source.replaceAll("\r\n", "\n").split("\n");
}

function normalizeLine(line: string, ignoreWhitespace: boolean): string {
  if (!ignoreWhitespace) {
    return line;
  }

  return line.replaceAll(/\s+/g, " ").trim();
}

function compareTexts(left: string, right: string, ignoreWhitespace: boolean): DiffResult {
  const leftLines = splitLines(left);
  const rightLines = splitLines(right);
  const leftComparable = leftLines.map((line) => normalizeLine(line, ignoreWhitespace));
  const rightComparable = rightLines.map((line) => normalizeLine(line, ignoreWhitespace));

  const leftCount = leftLines.length;
  const rightCount = rightLines.length;

  const matrix: number[][] = Array.from({ length: leftCount + 1 }, () => Array(rightCount + 1).fill(0));

  for (let leftIndex = leftCount - 1; leftIndex >= 0; leftIndex -= 1) {
    for (let rightIndex = rightCount - 1; rightIndex >= 0; rightIndex -= 1) {
      if (leftComparable[leftIndex] === rightComparable[rightIndex]) {
        matrix[leftIndex][rightIndex] = matrix[leftIndex + 1][rightIndex + 1] + 1;
      } else {
        matrix[leftIndex][rightIndex] = Math.max(matrix[leftIndex + 1][rightIndex], matrix[leftIndex][rightIndex + 1]);
      }
    }
  }

  const rows: DiffRow[] = [];
  let leftPointer = 0;
  let rightPointer = 0;

  while (leftPointer < leftCount || rightPointer < rightCount) {
    const leftLine = leftLines[leftPointer];
    const rightLine = rightLines[rightPointer];

    if (
      leftPointer < leftCount &&
      rightPointer < rightCount &&
      leftComparable[leftPointer] === rightComparable[rightPointer]
    ) {
      rows.push({
        kind: "equal",
        leftLine: leftPointer + 1,
        rightLine: rightPointer + 1,
        text: leftLine,
      });
      leftPointer += 1;
      rightPointer += 1;
      continue;
    }

    if (rightPointer < rightCount && (leftPointer === leftCount || matrix[leftPointer][rightPointer + 1] >= matrix[leftPointer + 1][rightPointer])) {
      rows.push({ kind: "insert", leftLine: null, rightLine: rightPointer + 1, text: rightLine ?? "" });
      rightPointer += 1;
      continue;
    }

    if (leftPointer < leftCount) {
      rows.push({ kind: "delete", leftLine: leftPointer + 1, rightLine: null, text: leftLine ?? "" });
      leftPointer += 1;
    }
  }

  const addedLines = rows.filter((row) => row.kind === "insert").length;
  const removedLines = rows.filter((row) => row.kind === "delete").length;
  const unchangedLines = rows.filter((row) => row.kind === "equal").length;

  return {
    rows,
    leftLineCount: leftCount,
    rightLineCount: rightCount,
    addedLines,
    removedLines,
    unchangedLines,
    isEqual: rows.length > 0 ? addedLines === 0 && removedLines === 0 : leftCount === 0 && rightCount === 0,
  };
}

export default function DiffCheckerPanel() {
  const [leftText, setLeftText] = useState(LEFT_SAMPLE);
  const [rightText, setRightText] = useState(RIGHT_SAMPLE);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);

  const result = useMemo(() => compareTexts(leftText, rightText, ignoreWhitespace), [leftText, rightText, ignoreWhitespace]);

  function swapSides() {
    setLeftText(rightText);
    setRightText(leftText);
  }

  function loadSample() {
    setLeftText(LEFT_SAMPLE);
    setRightText(RIGHT_SAMPLE);
    setIgnoreWhitespace(false);
  }

  function clearBoth() {
    setLeftText("");
    setRightText("");
  }

  return (
    <section className="tool-shell utility-shell diff-shell" aria-label="Diff checker tool">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Diff tools</p>
          <h2>Diff Checker</h2>
          <p className="panel-subtext">
            Compare two text blocks side by side with line-aware diff output. Useful for code snippets,
            configs, and content reviews.
          </p>
        </div>

        <div className="control-row">
          <button type="button" className="btn primary" onClick={loadSample}>
            Load sample
          </button>
          <button type="button" className="btn" onClick={swapSides}>
            Swap sides
          </button>
          <button type="button" className="btn" onClick={clearBoth}>
            Clear
          </button>
        </div>
      </div>

      <div className="action-grid compact">
        <button
          type="button"
          className={`mode-btn ${ignoreWhitespace ? "is-active" : ""}`}
          onClick={() => setIgnoreWhitespace((value) => !value)}
        >
          <span>Ignore whitespace</span>
          <small>Treat spacing changes as equal</small>
        </button>
      </div>

      <div className="diff-summary" aria-label="Diff summary">
        <article className="diff-stat">
          <p>Left lines</p>
          <strong>{result.leftLineCount}</strong>
        </article>
        <article className="diff-stat">
          <p>Right lines</p>
          <strong>{result.rightLineCount}</strong>
        </article>
        <article className="diff-stat">
          <p>Added</p>
          <strong>{result.addedLines}</strong>
        </article>
        <article className="diff-stat">
          <p>Removed</p>
          <strong>{result.removedLines}</strong>
        </article>
      </div>

      <div className="diff-grid">
        <div className="editor-card">
          <p>Left Text</p>
          <textarea
            value={leftText}
            onChange={(event) => setLeftText(event.target.value)}
            spellCheck={false}
            placeholder="Paste the first version here"
          />
        </div>

        <div className="editor-card">
          <p>Right Text</p>
          <textarea
            value={rightText}
            onChange={(event) => setRightText(event.target.value)}
            spellCheck={false}
            placeholder="Paste the second version here"
          />
        </div>
      </div>

      <div className="editor-card diff-output-card">
        <p>Diff Result</p>
        {result.rows.length === 0 ? (
          <div className="diff-empty">
            <strong>No differences to show.</strong>
            <span>Paste two versions to compare them line by line.</span>
          </div>
        ) : (
          <div className="diff-view" aria-live="polite">
            {result.rows.map((row, index) => (
              <div key={`${row.kind}-${index}`} className={`diff-row is-${row.kind}`}>
                <span className="diff-marker">{row.kind === "equal" ? " " : row.kind === "insert" ? "+" : "-"}</span>
                <span className="diff-line-no">{row.leftLine ?? ""}</span>
                <span className="diff-line-text">{row.text || " "}</span>
                <span className="diff-line-no right">{row.rightLine ?? ""}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="hint">
        Result: {result.isEqual ? "The two inputs are identical." : "The two inputs are different."}
      </p>
    </section>
  );
}
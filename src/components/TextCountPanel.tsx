"use client";

import { useState, useMemo } from "react";

export default function TextCountPanel() {
  const [input, setInput] = useState("");

  const stats = useMemo(() => {
    const text = input || "";
    // Character count with spaces
    const chars = text.length;
    // Character count without spaces
    const charsNoSpaces = text.replace(/\s+/g, "").length;
    // Word count
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    // Line count
    const lines = text === "" ? 0 : text.split(/\r\n|\r|\n/).length;
    // Paragraph count (split by double newlines)
    const paragraphs = text === "" ? 0 : text.split(/\n\s*\n/).filter(p => p.trim() !== "").length;

    return {
      chars,
      charsNoSpaces,
      words,
      lines,
      paragraphs
    };
  }, [input]);

  const clearText = () => {
    setInput("");
  };

  async function copyText() {
    if (!input) {
      return;
    }
    await navigator.clipboard.writeText(input);
  }

  return (
    <section className="tool-shell utility-shell" aria-label="Text count tool">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Text tools</p>
          <h2>Word & Character Counter</h2>
          <p className="panel-subtext">Count words, characters, lines, and paragraphs instantly as you type.</p>
        </div>
        <div className="control-row">
          <button onClick={clearText} disabled={!input} className="btn">
            Clear
          </button>
          <button onClick={copyText} disabled={!input} className="btn primary">
            Copy All
          </button>
        </div>
      </div>

      <div className="text-count-stats" aria-label="Text statistics">
        <article className="text-count-stat">
          <p>Words</p>
          <strong>{stats.words}</strong>
        </article>
        <article className="text-count-stat">
          <p>Characters</p>
          <strong>{stats.chars}</strong>
        </article>
        <article className="text-count-stat">
          <p>Characters (no spaces)</p>
          <strong>{stats.charsNoSpaces}</strong>
        </article>
        <article className="text-count-stat">
          <p>Lines</p>
          <strong>{stats.lines}</strong>
        </article>
        <article className="text-count-stat">
          <p>Paragraphs</p>
          <strong>{stats.paragraphs}</strong>
        </article>
      </div>

      <div className="editor-grid" style={{ gridTemplateColumns: "1fr" }}>
        <div className="editor-card">
          <p>Text Input</p>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            spellCheck={false}
            placeholder="Type or paste your text here to count..."
            style={{ minHeight: "300px" }}
          />
        </div>
      </div>
    </section>
  );
}
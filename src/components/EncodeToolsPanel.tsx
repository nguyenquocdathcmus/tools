"use client";

import { useState } from "react";

type EncodeAction =
  | "base64Encode"
  | "base64Decode"
  | "urlEncode"
  | "urlDecode"
  | "htmlEncode"
  | "htmlDecode";

const ENCODE_ACTIONS: Array<{ id: EncodeAction; label: string; helper: string }> = [
  { id: "base64Encode", label: "Base64 Encoder", helper: "Convert plain text to Base64" },
  { id: "base64Decode", label: "Base64 Decoder", helper: "Decode Base64 into readable text" },
  { id: "urlEncode", label: "URL Encoder", helper: "Escape characters for URLs" },
  { id: "urlDecode", label: "URL Decoder", helper: "Decode URL-encoded values" },
  { id: "htmlEncode", label: "HTML Encode", helper: "Escape text for safe HTML output" },
  { id: "htmlDecode", label: "HTML Decode", helper: "Decode HTML entities to plain text" },
];

function htmlEncode(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function htmlDecode(input: string): string {
  return input
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&amp;", "&");
}

export default function EncodeToolsPanel() {
  const [input, setInput] = useState("Hello <world> & dev");
  const [output, setOutput] = useState("");
  const [selectedAction, setSelectedAction] = useState<EncodeAction>("base64Encode");
  const [error, setError] = useState("");

  function run(action: EncodeAction) {
    setSelectedAction(action);
    setError("");
    try {
      if (action === "base64Encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
        return;
      }

      if (action === "base64Decode") {
        setOutput(decodeURIComponent(escape(atob(input.trim()))));
        return;
      }

      if (action === "urlEncode") {
        setOutput(encodeURIComponent(input));
        return;
      }

      if (action === "urlDecode") {
        setOutput(decodeURIComponent(input));
        return;
      }

      if (action === "htmlEncode") {
        setOutput(htmlEncode(input));
        return;
      }

      setOutput(htmlDecode(input));
    } catch (toolError) {
      setError(toolError instanceof Error ? toolError.message : "Encode failed");
      setOutput("");
    }
  }

  async function copyOutput() {
    if (!output) {
      return;
    }

    await navigator.clipboard.writeText(output);
  }

  return (
    <section className="tool-shell utility-shell">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Encode tools</p>
          <h2>Base64, URL, HTML Encode</h2>
          <p className="panel-subtext">Encode and decode text quickly for APIs, links, and frontend HTML payloads.</p>
        </div>
      </div>

      <div className="action-grid">
        {ENCODE_ACTIONS.map((action) => (
          <button
            key={action.id}
            className={`mode-btn ${selectedAction === action.id ? "is-active" : ""}`}
            onClick={() => run(action.id)}
            type="button"
          >
            <span>{action.label}</span>
            <small>{action.helper}</small>
          </button>
        ))}
      </div>

      <div className="editor-grid">
        <div className="editor-card">
          <p>Input</p>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            spellCheck={false}
            placeholder="Paste your text to encode or decode"
          />
        </div>
        <div className="editor-card">
          <p>Output</p>
          <textarea value={output} readOnly spellCheck={false} placeholder="Result will appear here" />
          <div className="result-actions">
            <button className="btn" type="button" onClick={copyOutput} disabled={!output}>
              Copy output
            </button>
          </div>
        </div>
      </div>

      {error ? <p className="error">{error}</p> : null}
    </section>
  );
}

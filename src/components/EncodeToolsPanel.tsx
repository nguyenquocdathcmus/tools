"use client";

import { useState } from "react";

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
  const [error, setError] = useState("");

  function run(action: "base64Encode" | "base64Decode" | "urlEncode" | "urlDecode" | "htmlEncode" | "htmlDecode") {
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

  return (
    <section className="tool-shell">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Encode tools</p>
          <h2>Base64, URL, HTML Encode</h2>
        </div>
      </div>

      <div className="control-row">
        <button className="btn primary" onClick={() => run("base64Encode")}>Base64 Encoder</button>
        <button className="btn" onClick={() => run("base64Decode")}>Base64 Decoder</button>
        <button className="btn" onClick={() => run("urlEncode")}>URL Encoder</button>
        <button className="btn" onClick={() => run("urlDecode")}>URL Decoder</button>
        <button className="btn" onClick={() => run("htmlEncode")}>HTML Encode</button>
        <button className="btn" onClick={() => run("htmlDecode")}>HTML Decode</button>
      </div>

      <div className="editor-grid">
        <div className="editor-card">
          <p>Input</p>
          <textarea value={input} onChange={(event) => setInput(event.target.value)} spellCheck={false} />
        </div>
        <div className="editor-card">
          <p>Output</p>
          <textarea value={output} readOnly spellCheck={false} />
        </div>
      </div>

      {error ? <p className="error">{error}</p> : null}
    </section>
  );
}

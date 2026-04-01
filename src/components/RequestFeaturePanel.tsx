"use client";

import { useState } from "react";

export default function RequestFeaturePanel() {
  const [content, setContent] = useState("");

  const handleSendEmail = () => {
    const subject = encodeURIComponent("Feature Request for Daxnoria");
    const body = encodeURIComponent(content);
    window.location.href = `mailto:nguyenquocdat.public@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="tool-shell utility-shell">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Feedback</p>
          <h2>Request a Feature</h2>
          <p className="panel-subtext">Have an idea for a new tool or feature? Let me know!</p>
        </div>
      </div>

      <div className="editor-grid" style={{ gridTemplateColumns: "1fr" }}>
        <div className="editor-card">
          <p>Describe your idea</p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="I would love a tool that..."
            style={{ minHeight: "200px" }}
          />
          <div className="result-actions" style={{ marginTop: "1rem" }}>
            <button 
              className="btn primary" 
              type="button" 
              onClick={handleSendEmail} 
              disabled={!content.trim()}
            >
              Send via Email
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
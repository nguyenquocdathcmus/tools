"use client";

import { useMemo, useState } from "react";

type JwtRecord = Record<string, unknown>;

type DecodedJwt = {
  header: JwtRecord | null;
  payload: JwtRecord | null;
  signature: string;
  error: string;
  segmentCount: number;
};

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik15VG9vbHMiLCJyb2xlIjoiZGV2ZWxvcGVyIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

function base64UrlDecode(value: string): string {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function prettyJson(value: JwtRecord | null): string {
  if (!value) {
    return "No decoded data";
  }

  return JSON.stringify(value, null, 2);
}

function readableClaim(value: unknown): string {
  if (value === null || value === undefined) {
    return "Not provided";
  }

  if (typeof value === "number") {
    return new Date(value * 1000).toLocaleString();
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) || typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

function decodeJwt(token: string): DecodedJwt {
  const normalized = token.trim().replaceAll(/\s+/g, "");

  if (!normalized) {
    return {
      header: null,
      payload: null,
      signature: "",
      error: "Paste a JWT token to decode.",
      segmentCount: 0,
    };
  }

  const segments = normalized.split(".");

  if (segments.length < 2) {
    return {
      header: null,
      payload: null,
      signature: "",
      error: "JWT needs at least header and payload segments.",
      segmentCount: segments.length,
    };
  }

  try {
    const header = JSON.parse(base64UrlDecode(segments[0])) as JwtRecord;
    const payload = JSON.parse(base64UrlDecode(segments[1])) as JwtRecord;

    return {
      header,
      payload,
      signature: segments[2] ?? "",
      error: "",
      segmentCount: segments.length,
    };
  } catch {
    return {
      header: null,
      payload: null,
      signature: segments[2] ?? "",
      error: "Unable to decode the JWT. Check the Base64URL segments.",
      segmentCount: segments.length,
    };
  }
}

export default function JwtDecoderPanel() {
  const [token, setToken] = useState(SAMPLE_JWT);
  const [decodedAt, setDecodedAt] = useState(() => Date.now());

  const decoded = useMemo(() => decodeJwt(token), [token]);

  const header = decoded.header ?? {};
  const payload = decoded.payload ?? {};
  const headerAlg = typeof header.alg === "string" ? header.alg : "Unknown";
  const headerType = typeof header.typ === "string" ? header.typ : "JWT";
  const issuer = readableClaim(payload.iss);
  const issuedAt = readableClaim(payload.iat);
  const expiresAt = readableClaim(payload.exp);
  const isExpired = typeof payload.exp === "number" ? payload.exp * 1000 < decodedAt : false;
  const status = decoded.error
    ? "Invalid"
    : isExpired
      ? "Expired"
      : decoded.signature
        ? "Decoded"
        : "Unsigned";

  async function copyToken() {
    if (!token.trim()) {
      return;
    }

    await navigator.clipboard.writeText(token);
  }

  function loadSample() {
    setToken(SAMPLE_JWT);
    setDecodedAt(Date.now());
  }

  function clearToken() {
    setToken("");
    setDecodedAt(Date.now());
  }

  function handleTokenChange(value: string) {
    setToken(value);
    setDecodedAt(Date.now());
  }

  return (
    <section className="tool-shell utility-shell jwt-shell" aria-label="JWT decoder tool">
      <div className="panel-head">
        <div>
          <p className="eyebrow">JWT tools</p>
          <h2>JWT Decoder</h2>
          <p className="panel-subtext">
            Decode header, payload, and signature locally. Useful for API debugging, auth inspection, and token review.
          </p>
        </div>

        <div className="control-row">
          <button type="button" className="btn primary" onClick={loadSample}>
            Load sample
          </button>
          <button type="button" className="btn" onClick={clearToken}>
            Clear
          </button>
          <button type="button" className="btn" onClick={copyToken} disabled={!token.trim()}>
            Copy token
          </button>
        </div>
      </div>

      <div className="jwt-stats" aria-label="JWT summary">
        <article className="jwt-stat">
          <p>Segments</p>
          <strong>{decoded.segmentCount || "0"}</strong>
        </article>
        <article className="jwt-stat">
          <p>Algorithm</p>
          <strong>{headerAlg}</strong>
        </article>
        <article className="jwt-stat">
          <p>Type</p>
          <strong>{headerType}</strong>
        </article>
        <article className="jwt-stat">
          <p>Status</p>
          <strong>{status}</strong>
        </article>
      </div>

      <div className="jwt-grid">
        <div className="editor-card jwt-input-card">
          <p>JWT Input</p>
          <textarea
            value={token}
            onChange={(event) => handleTokenChange(event.target.value)}
            spellCheck={false}
            placeholder="Paste a JWT token here"
          />
        </div>

        <div className="jwt-output-stack">
          <div className="editor-card">
            <p>Decoded Header</p>
            <pre className="jwt-json">{prettyJson(decoded.header)}</pre>
          </div>

          <div className="editor-card">
            <p>Decoded Payload</p>
            <pre className="jwt-json">{prettyJson(decoded.payload)}</pre>
          </div>

          <div className="editor-card">
            <p>Claims Overview</p>
            <div className="jwt-claim-grid">
              <article>
                <span>Issuer</span>
                <strong>{issuer}</strong>
              </article>
              <article>
                <span>Issued at</span>
                <strong>{issuedAt}</strong>
              </article>
              <article>
                <span>Expires at</span>
                <strong>{expiresAt}</strong>
              </article>
              <article>
                <span>Signature</span>
                <strong>{decoded.signature ? "Present" : "Not provided"}</strong>
              </article>
            </div>
          </div>

          <div className="editor-card">
            <p>Signature Segment</p>
            <code className="jwt-signature">{decoded.signature || "No signature segment provided"}</code>
          </div>
        </div>
      </div>

      {decoded.error ? <p className="error">{decoded.error}</p> : null}
    </section>
  );
}
"use client";

import { useMemo, useState } from "react";

const timezoneOptions = [
  "UTC",
  "Asia/Ho_Chi_Minh",
  "Asia/Tokyo",
  "Europe/London",
  "America/New_York",
];

export default function TimestampToolsPanel() {
  const [unixValue, setUnixValue] = useState("1711550000");
  const [dateValue, setDateValue] = useState("2026-03-27T12:00");
  const [sourceTimezone, setSourceTimezone] = useState("UTC");
  const [targetTimezone, setTargetTimezone] = useState("Asia/Ho_Chi_Minh");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function unixToDate() {
    setError("");
    const numeric = Number.parseInt(unixValue, 10);
    if (Number.isNaN(numeric)) {
      setError("Unix timestamp is invalid");
      return;
    }
    setOutput(new Date(numeric * 1000).toISOString());
  }

  function dateToUnix() {
    setError("");
    const ms = Date.parse(dateValue);
    if (Number.isNaN(ms)) {
      setError("Date value is invalid");
      return;
    }
    setOutput(String(Math.floor(ms / 1000)));
  }

  const timezonePreview = useMemo(() => {
    try {
      const base = new Date(dateValue);
      if (Number.isNaN(base.getTime())) {
        return "Date value is invalid for timezone conversion";
      }
      const from = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "long",
        timeZone: sourceTimezone,
      }).format(base);
      const to = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "long",
        timeZone: targetTimezone,
      }).format(base);
      return `${sourceTimezone}: ${from}\n${targetTimezone}: ${to}`;
    } catch {
      return "Timezone conversion preview is unavailable";
    }
  }, [dateValue, sourceTimezone, targetTimezone]);

  function timezoneConvert() {
    setOutput(timezonePreview);
  }

  return (
    <section className="tool-shell">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Timestamp converter</p>
          <h2>Unix to Date, Date to Unix, Timezone Convert</h2>
        </div>
      </div>

      <div className="two-col-fields">
        <label className="field">
          <span>Unix timestamp</span>
          <input value={unixValue} onChange={(event) => setUnixValue(event.target.value)} />
        </label>
        <label className="field">
          <span>Date input</span>
          <input type="datetime-local" value={dateValue} onChange={(event) => setDateValue(event.target.value)} />
        </label>
      </div>

      <div className="two-col-fields">
        <label className="field">
          <span>Source timezone</span>
          <select value={sourceTimezone} onChange={(event) => setSourceTimezone(event.target.value)}>
            {timezoneOptions.map((zone) => (
              <option key={zone}>{zone}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Target timezone</span>
          <select value={targetTimezone} onChange={(event) => setTargetTimezone(event.target.value)}>
            {timezoneOptions.map((zone) => (
              <option key={zone}>{zone}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="control-row">
        <button className="btn primary" onClick={unixToDate}>Unix to Date</button>
        <button className="btn" onClick={dateToUnix}>Date to Unix</button>
        <button className="btn" onClick={timezoneConvert}>Timezone Convert</button>
      </div>

      <div className="editor-card">
        <p>Result</p>
        <textarea value={output} readOnly spellCheck={false} />
      </div>

      {error ? <p className="error">{error}</p> : null}
    </section>
  );
}

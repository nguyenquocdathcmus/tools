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
  const [selectedAction, setSelectedAction] = useState<"unixToDate" | "dateToUnix" | "timezoneConvert">("unixToDate");
  const [error, setError] = useState("");

  function unixToDate() {
    setSelectedAction("unixToDate");
    setError("");
    const numeric = Number.parseInt(unixValue, 10);
    if (Number.isNaN(numeric)) {
      setError("Unix timestamp is invalid");
      return;
    }
    setOutput(new Date(numeric * 1000).toISOString());
  }

  function dateToUnix() {
    setSelectedAction("dateToUnix");
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
    setSelectedAction("timezoneConvert");
    setOutput(timezonePreview);
  }

  return (
    <section className="tool-shell utility-shell">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Timestamp converter</p>
          <h2>Unix to Date, Date to Unix, Timezone Convert</h2>
          <p className="panel-subtext">Convert Unix values and timezone outputs quickly without leaving your workflow.</p>
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

      <div className="action-grid compact">
        <button className={`mode-btn ${selectedAction === "unixToDate" ? "is-active" : ""}`} onClick={unixToDate} type="button">
          <span>Unix to Date</span>
          <small>Convert Unix seconds into ISO date</small>
        </button>
        <button className={`mode-btn ${selectedAction === "dateToUnix" ? "is-active" : ""}`} onClick={dateToUnix} type="button">
          <span>Date to Unix</span>
          <small>Convert date input into Unix seconds</small>
        </button>
        <button className={`mode-btn ${selectedAction === "timezoneConvert" ? "is-active" : ""}`} onClick={timezoneConvert} type="button">
          <span>Timezone Convert</span>
          <small>Preview source and target timezone output</small>
        </button>
      </div>

      <div className="editor-card">
        <p>Result</p>
        <textarea value={output} readOnly spellCheck={false} placeholder="Run a conversion action to view output" />
      </div>

      {error ? <p className="error">{error}</p> : null}
    </section>
  );
}

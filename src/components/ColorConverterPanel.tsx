"use client";

import { useMemo, useState } from "react";

type Rgba = {
  r: number;
  g: number;
  b: number;
  a: number;
};

type Hsl = {
  h: number;
  s: number;
  l: number;
};

type Hsv = {
  h: number;
  s: number;
  v: number;
};

type Cmyk = {
  c: number;
  m: number;
  y: number;
  k: number;
};

const CSS_NAME_BY_HEX: Record<string, string> = {
  "#000000": "black",
  "#ffffff": "white",
  "#ff0000": "red",
  "#0000ff": "blue",
  "#00ff00": "lime",
  "#008000": "green",
  "#ffff00": "yellow",
  "#ffa500": "orange",
  "#800080": "purple",
  "#ffc0cb": "pink",
  "#808080": "gray",
  "#a52a2a": "brown",
  "#00ffff": "aqua",
  "#ff00ff": "fuchsia",
  "#000080": "navy",
  "#808000": "olive",
  "#008080": "teal",
  "#c0c0c0": "silver",
  "#ffd700": "gold",
  "#4b0082": "indigo",
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalizeHex(hex: string) {
  const value = hex.trim().replace(/^#/, "").toLowerCase();

  if ([3, 4, 6, 8].includes(value.length) && /^[0-9a-f]+$/.test(value)) {
    if (value.length === 3 || value.length === 4) {
      return value
        .split("")
        .map((char) => `${char}${char}`)
        .join("");
    }
    return value;
  }

  return "";
}

function parseHex(input: string): Rgba | null {
  const normalized = normalizeHex(input);
  if (!normalized) {
    return null;
  }

  const hasAlpha = normalized.length === 8;
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  const a = hasAlpha ? Number.parseInt(normalized.slice(6, 8), 16) / 255 : 1;

  return { r, g, b, a };
}

function parseRgbLike(input: string): Rgba | null {
  const match = input
    .trim()
    .match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i);

  if (!match) {
    return null;
  }

  const r = clamp(Number.parseFloat(match[1]), 0, 255);
  const g = clamp(Number.parseFloat(match[2]), 0, 255);
  const b = clamp(Number.parseFloat(match[3]), 0, 255);
  const a = clamp(Number.parseFloat(match[4] ?? "1"), 0, 1);

  return { r, g, b, a };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const hue = ((h % 360) + 360) % 360;
  const sat = clamp(s / 100, 0, 1);
  const lig = clamp(l / 100, 0, 1);

  if (sat === 0) {
    const gray = Math.round(lig * 255);
    return { r: gray, g: gray, b: gray };
  }

  const q = lig < 0.5 ? lig * (1 + sat) : lig + sat - lig * sat;
  const p = 2 * lig - q;

  const toChannel = (t: number) => {
    let tc = t;
    if (tc < 0) tc += 1;
    if (tc > 1) tc -= 1;
    if (tc < 1 / 6) return p + (q - p) * 6 * tc;
    if (tc < 1 / 2) return q;
    if (tc < 2 / 3) return p + (q - p) * (2 / 3 - tc) * 6;
    return p;
  };

  const hk = hue / 360;
  const r = Math.round(toChannel(hk + 1 / 3) * 255);
  const g = Math.round(toChannel(hk) * 255);
  const b = Math.round(toChannel(hk - 1 / 3) * 255);

  return { r, g, b };
}

function parseHslLike(input: string): Rgba | null {
  const match = input
    .trim()
    .match(/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/i);

  if (!match) {
    return null;
  }

  const h = Number.parseFloat(match[1]);
  const s = clamp(Number.parseFloat(match[2]), 0, 100);
  const l = clamp(Number.parseFloat(match[3]), 0, 100);
  const a = clamp(Number.parseFloat(match[4] ?? "1"), 0, 1);
  const rgb = hslToRgb(h, s, l);

  return { ...rgb, a };
}

function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  const hue = ((h % 360) + 360) % 360;
  const sat = clamp(s / 100, 0, 1);
  const val = clamp(v / 100, 0, 1);
  const c = val * sat;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = val - c;

  let r1 = 0;
  let g1 = 0;
  let b1 = 0;

  if (hue < 60) {
    r1 = c;
    g1 = x;
  } else if (hue < 120) {
    r1 = x;
    g1 = c;
  } else if (hue < 180) {
    g1 = c;
    b1 = x;
  } else if (hue < 240) {
    g1 = x;
    b1 = c;
  } else if (hue < 300) {
    r1 = x;
    b1 = c;
  } else {
    r1 = c;
    b1 = x;
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

function parseHsvLike(input: string): Rgba | null {
  const match = input
    .trim()
    .match(/^hs[vb]\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i);

  if (!match) {
    return null;
  }

  const h = Number.parseFloat(match[1]);
  const s = clamp(Number.parseFloat(match[2]), 0, 100);
  const v = clamp(Number.parseFloat(match[3]), 0, 100);
  const rgb = hsvToRgb(h, s, v);

  return { ...rgb, a: 1 };
}

function cmykToRgb(c: number, m: number, y: number, k: number) {
  const cc = clamp(c / 100, 0, 1);
  const mm = clamp(m / 100, 0, 1);
  const yy = clamp(y / 100, 0, 1);
  const kk = clamp(k / 100, 0, 1);

  return {
    r: Math.round(255 * (1 - cc) * (1 - kk)),
    g: Math.round(255 * (1 - mm) * (1 - kk)),
    b: Math.round(255 * (1 - yy) * (1 - kk)),
  };
}

function parseCmykLike(input: string): Rgba | null {
  const match = input
    .trim()
    .match(/^(?:cmyk\()?\s*([\d.]+)%\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)?$/i);

  if (!match) {
    return null;
  }

  const c = Number.parseFloat(match[1]);
  const m = Number.parseFloat(match[2]);
  const y = Number.parseFloat(match[3]);
  const k = Number.parseFloat(match[4]);
  const rgb = cmykToRgb(c, m, y, k);

  return { ...rgb, a: 1 };
}

function parseCssColor(input: string): Rgba | null {
  if (typeof document === "undefined") {
    return null;
  }

  const probe = document.createElement("span");
  probe.style.color = "";
  probe.style.color = input.trim();

  if (!probe.style.color) {
    return null;
  }

  document.body.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();

  return parseRgbLike(computed);
}

function toHex(rgba: Rgba, withAlpha: boolean) {
  const toPart = (value: number) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0");
  const base = `#${toPart(rgba.r)}${toPart(rgba.g)}${toPart(rgba.b)}`;

  if (!withAlpha) {
    return base;
  }

  return `${base}${toPart(rgba.a * 255)}`;
}

function rgbaToHsl(rgba: Rgba): Hsl {
  const r = clamp(rgba.r, 0, 255) / 255;
  const g = clamp(rgba.g, 0, 255) / 255;
  const b = clamp(rgba.b, 0, 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const l = (max + min) / 2;

  if (delta === 0) {
    return { h: 0, s: 0, l: Math.round(l * 100) };
  }

  const s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let h = 0;

  if (max === r) {
    h = (g - b) / delta + (g < b ? 6 : 0);
  } else if (max === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h *= 60;

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function rgbaToHsv(rgba: Rgba): Hsv {
  const r = clamp(rgba.r, 0, 255) / 255;
  const g = clamp(rgba.g, 0, 255) / 255;
  const b = clamp(rgba.b, 0, 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;

  if (delta !== 0) {
    if (max === r) {
      h = 60 * (((g - b) / delta) % 6);
    } else if (max === g) {
      h = 60 * ((b - r) / delta + 2);
    } else {
      h = 60 * ((r - g) / delta + 4);
    }
  }

  if (h < 0) {
    h += 360;
  }

  const s = max === 0 ? 0 : (delta / max) * 100;
  const v = max * 100;

  return {
    h: Math.round(h),
    s: Math.round(s),
    v: Math.round(v),
  };
}

function rgbaToCmyk(rgba: Rgba): Cmyk {
  const r = clamp(rgba.r, 0, 255) / 255;
  const g = clamp(rgba.g, 0, 255) / 255;
  const b = clamp(rgba.b, 0, 255) / 255;
  const k = 1 - Math.max(r, g, b);

  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  const c = ((1 - r - k) / (1 - k)) * 100;
  const m = ((1 - g - k) / (1 - k)) * 100;
  const y = ((1 - b - k) / (1 - k)) * 100;

  return {
    c: Math.round(c),
    m: Math.round(m),
    y: Math.round(y),
    k: Math.round(k * 100),
  };
}

function parseColorInput(input: string) {
  return (
    parseHex(input) ||
    parseRgbLike(input) ||
    parseHslLike(input) ||
    parseHsvLike(input) ||
    parseCmykLike(input) ||
    parseCssColor(input)
  );
}

export default function ColorConverterPanel() {
  const [input, setInput] = useState("#ff5733");
  const [error, setError] = useState("");

  const color = useMemo(() => {
    const parsed = parseColorInput(input);

    if (!parsed) {
      return null;
    }

    return {
      r: Math.round(parsed.r),
      g: Math.round(parsed.g),
      b: Math.round(parsed.b),
      a: Number(parsed.a.toFixed(3)),
    };
  }, [input]);

  const outputs = useMemo(() => {
    if (!color) {
      return null;
    }

    const hex = toHex(color, false);
    const hex8 = toHex(color, true);
    const hsl = rgbaToHsl(color);
    const hsv = rgbaToHsv(color);
    const cmyk = rgbaToCmyk(color);

    return {
      hex,
      hex8,
      rgb: `rgb(${color.r}, ${color.g}, ${color.b})`,
      rgba: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      hsla: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${color.a})`,
      hsv: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`,
      cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
      cssName: CSS_NAME_BY_HEX[hex] || "No exact common name",
    };
  }, [color]);

  async function copyValue(value: string) {
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setError("");
    } catch {
      setError("Copy failed. Please copy manually.");
    }
  }

  return (
    <section className="tool-shell" aria-label="Color converter tool">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Color utility</p>
          <h2>HEX, RGB, RGBA, HSL, HSV, CMYK Converter</h2>
          <p className="panel-subtext">
            Convert between web, design, and print color formats. Processing runs in your browser only.
          </p>
        </div>
      </div>

      <label className="field" htmlFor="color-input-value">
        <span>Enter a color value</span>
        <input
          id="color-input-value"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setError("");
          }}
          placeholder="Try: #ff5733, rgba(255,87,51,0.5), hsl(14,100%,60%), cmyk(0%,66%,80%,0%), red"
        />
      </label>

      <p className="panel-subtext color-format-help">
        Supported inputs: HEX / HEX8, RGB / RGBA, HSL / HSLA, HSV / HSB, CMYK, and CSS color names.
      </p>

      {color && outputs ? (
        <>
          <div className="color-preview-strip" aria-live="polite">
            <div className="color-swatch" style={{ backgroundColor: outputs.rgba }} aria-hidden="true" />
            <div>
              <strong>Live Preview</strong>
              <p>{outputs.rgba}</p>
            </div>
          </div>

          <div className="editor-grid">
            <article className="editor-card color-output-card">
              <p>HEX ↔ RGB</p>
              <pre>{outputs.hex}</pre>
              <pre>{outputs.rgb}</pre>
              <div className="result-actions">
                <button type="button" className="btn" onClick={() => void copyValue(outputs.hex)}>
                  Copy HEX
                </button>
                <button type="button" className="btn" onClick={() => void copyValue(outputs.rgb)}>
                  Copy RGB
                </button>
              </div>
            </article>

            <article className="editor-card color-output-card">
              <p>HEX ↔ RGBA</p>
              <pre>{outputs.hex}</pre>
              <pre>{outputs.rgba}</pre>
              <div className="result-actions">
                <button type="button" className="btn" onClick={() => void copyValue(outputs.rgba)}>
                  Copy RGBA
                </button>
              </div>
            </article>

            <article className="editor-card color-output-card">
              <p>RGB ↔ HSL</p>
              <pre>{outputs.rgb}</pre>
              <pre>{outputs.hsl}</pre>
              <div className="result-actions">
                <button type="button" className="btn" onClick={() => void copyValue(outputs.hsl)}>
                  Copy HSL
                </button>
              </div>
            </article>

            <article className="editor-card color-output-card">
              <p>HEX ↔ HSL</p>
              <pre>{outputs.hex}</pre>
              <pre>{outputs.hsl}</pre>
              <div className="result-actions">
                <button type="button" className="btn" onClick={() => void copyValue(outputs.hex)}>
                  Copy HEX
                </button>
              </div>
            </article>

            <article className="editor-card color-output-card">
              <p>RGB ↔ CMYK</p>
              <pre>{outputs.rgb}</pre>
              <pre>{outputs.cmyk}</pre>
              <div className="result-actions">
                <button type="button" className="btn" onClick={() => void copyValue(outputs.cmyk)}>
                  Copy CMYK
                </button>
              </div>
            </article>

            <article className="editor-card color-output-card">
              <p>HEX ↔ HSV / HSB</p>
              <pre>{outputs.hex}</pre>
              <pre>{outputs.hsv}</pre>
              <div className="result-actions">
                <button type="button" className="btn" onClick={() => void copyValue(outputs.hsv)}>
                  Copy HSV
                </button>
              </div>
            </article>

            <article className="editor-card color-output-card">
              <p>CSS Color Name</p>
              <pre>{outputs.cssName}</pre>
              <pre>{outputs.hex}</pre>
            </article>

            <article className="editor-card color-output-card">
              <p>8-digit HEX (with alpha)</p>
              <pre>{outputs.hex8}</pre>
              <pre>{outputs.hsla}</pre>
              <div className="result-actions">
                <button type="button" className="btn" onClick={() => void copyValue(outputs.hex8)}>
                  Copy HEX8
                </button>
              </div>
            </article>
          </div>
        </>
      ) : (
        <p className="error">Please enter a valid color format to convert.</p>
      )}

      {error ? <p className="error">{error}</p> : null}
    </section>
  );
}

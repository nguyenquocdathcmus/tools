"use client";

import JSZip from "jszip";
import { useEffect, useMemo, useState } from "react";

type GeneratorMode = "text" | "upload";

type FaviconCheckIcon = {
  url: string;
  rel: string;
  source: "html" | "manifest" | "default";
  sizes: string;
  type: string;
  purpose: string;
  status: number | null;
  ok: boolean;
  contentType: string;
  contentLength: number | null;
};

type FaviconCheckResult = {
  inputUrl: string;
  normalizedUrl: string;
  homepageStatus: number;
  iconCount: number;
  icons: FaviconCheckIcon[];
};

type GeneratedAsset = {
  kind: "png" | "svg" | "ico";
  label: string;
  filename: string;
  url: string;
  size?: number;
};

type OutputSpec = {
  size: number;
  label: string;
  filename: string;
};

const OUTPUT_SPECS: OutputSpec[] = [
  { size: 16, label: "16x16", filename: "favicon-16x16.png" },
  { size: 32, label: "32x32", filename: "favicon-32x32.png" },
  { size: 48, label: "48x48", filename: "favicon-48x48.png" },
  { size: 180, label: "180x180", filename: "apple-touch-icon.png" },
  { size: 192, label: "192x192", filename: "icon-192x192.png" },
  { size: 512, label: "512x512", filename: "icon-512x512.png" },
];

const ICO_SIZES = [16, 32, 48];
const MAX_PADDING = 35;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(typeof reader.result === "string" ? reader.result : "");
    };
    reader.onerror = () => reject(new Error("Unable to read file"));
    reader.readAsDataURL(file);
  });
}

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to render the source image"));
    image.src = source;
  });
}

function dataUrlToArrayBuffer(dataUrl: string) {
  const commaIndex = dataUrl.indexOf(",");
  const payload = commaIndex >= 0 ? dataUrl.slice(commaIndex + 1) : dataUrl;
  const binary = atob(payload);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes.buffer;
}

function arrayBufferToDataUrl(buffer: ArrayBuffer, mimeType: string) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return `data:${mimeType};base64,${btoa(binary)}`;
}

async function createIcoDataUrl(pngDataUrls: string[]) {
  const pngBuffers = pngDataUrls.map((dataUrl) => dataUrlToArrayBuffer(dataUrl));
  const headerSize = 6 + pngBuffers.length * 16;
  const totalSize = headerSize + pngBuffers.reduce((sum, buffer) => sum + buffer.byteLength, 0);
  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);

  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, pngBuffers.length, true);

  let offset = headerSize;

  pngBuffers.forEach((pngBuffer, index) => {
    const size = ICO_SIZES[index] ?? 0;
    const entryOffset = 6 + index * 16;
    view.setUint8(entryOffset, size === 256 ? 0 : size);
    view.setUint8(entryOffset + 1, size === 256 ? 0 : size);
    view.setUint8(entryOffset + 2, 0);
    view.setUint8(entryOffset + 3, 0);
    view.setUint16(entryOffset + 4, 1, true);
    view.setUint16(entryOffset + 6, 32, true);
    view.setUint32(entryOffset + 8, pngBuffer.byteLength, true);
    view.setUint32(entryOffset + 12, offset, true);

    new Uint8Array(buffer, offset, pngBuffer.byteLength).set(new Uint8Array(pngBuffer));
    offset += pngBuffer.byteLength;
  });

  return arrayBufferToDataUrl(buffer, "image/x-icon");
}

function buildTextGlyphSvg(logoText: string, foregroundColor: string) {
  const normalizedText = logoText.trim().slice(0, 3).toUpperCase() || "D";

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="${escapeXml(
      normalizedText,
    )} favicon">
      <text
        x="256"
        y="274"
        fill="${foregroundColor}"
        font-family="Arial, Helvetica, sans-serif"
        font-size="172"
        font-weight="800"
        text-anchor="middle"
        dominant-baseline="middle"
        letter-spacing="-0.05em"
      >
        ${escapeXml(normalizedText)}
      </text>
    </svg>
  `;
}

function buildImageGlyphSvg(sourceDataUrl: string) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Favicon source glyph">
      <image href="${sourceDataUrl}" x="0" y="0" width="512" height="512" preserveAspectRatio="xMidYMid meet" />
    </svg>
  `;
}

function buildFinalFaviconSvg(sourceGlyphDataUrl: string, backgroundColor: string | null, paddingPercent: number) {
  const normalizedPadding = Math.max(0, Math.min(MAX_PADDING, paddingPercent));
  const padding = Math.round(512 * (normalizedPadding / 100));
  const size = Math.max(1, 512 - padding * 2);
  const backgroundRect = backgroundColor
    ? `<rect width="512" height="512" rx="128" fill="${backgroundColor}" />`
    : "";

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Final favicon preview">
      ${backgroundRect}
      <image href="${sourceGlyphDataUrl}" x="${padding}" y="${padding}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet" />
    </svg>
  `;
}

function createSvgDataUrl(markup: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
}

function dataUrlToBlob(dataUrl: string) {
  const [meta, payload = ""] = dataUrl.split(",");
  const mimeMatch = meta.match(/^data:(.*?)(;base64)?$/);
  const mimeType = mimeMatch?.[1] || "application/octet-stream";
  const isBase64 = meta.includes(";base64");

  if (isBase64) {
    const binary = atob(payload);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return new Blob([bytes], { type: mimeType });
  }

  return new Blob([decodeURIComponent(payload)], { type: mimeType });
}

function toSafeFileToken(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
}

async function renderPngDataUrl(
  sourceImage: HTMLImageElement,
  size: number,
  backgroundColor: string | null,
  paddingPercent: number,
) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas is not available");
  }

  if (backgroundColor) {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, size, size);
  }

  const padding = Math.max(0, Math.min(size / 2, Math.round(size * (paddingPercent / 100))));
  const available = Math.max(1, size - padding * 2);
  const scale = Math.min(available / sourceImage.width, available / sourceImage.height);
  const drawWidth = Math.max(1, Math.round(sourceImage.width * scale));
  const drawHeight = Math.max(1, Math.round(sourceImage.height * scale));
  const drawX = Math.round((size - drawWidth) / 2);
  const drawY = Math.round((size - drawHeight) / 2);

  context.drawImage(sourceImage, drawX, drawY, drawWidth, drawHeight);

  return canvas.toDataURL("image/png");
}

function buildInstallSnippet(backgroundColor: string) {
  return [
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
    '<link rel="icon" href="/favicon.ico" sizes="any">',
    '<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">',
    '<link rel="icon" href="/favicon-48x48.png" sizes="48x48" type="image/png">',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">',
    '<link rel="manifest" href="/site.webmanifest">',
    `<meta name="theme-color" content="${backgroundColor}">`,
  ].join("\n");
}

function buildManifest(name: string, backgroundColor: string) {
  return JSON.stringify(
    {
      name,
      short_name: name.slice(0, 12) || name,
      start_url: "/",
      display: "standalone",
      background_color: backgroundColor,
      theme_color: backgroundColor,
      icons: [
        { src: "/icon-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
        { src: "/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
      ],
    },
    null,
    2,
  );
}

export default function FaviconGeneratorPanel() {
  const [mode, setMode] = useState<GeneratorMode>("upload");
  const [brandName, setBrandName] = useState("Daxnoria");
  const [logoText, setLogoText] = useState("D");
  const [backgroundColor, setBackgroundColor] = useState("#0f172a");
  const [foregroundColor, setForegroundColor] = useState("#ffffff");
  const [transparentBackground, setTransparentBackground] = useState(true);
  const [paddingPercent, setPaddingPercent] = useState("14");
  const [sourceDataUrl, setSourceDataUrl] = useState("");
  const [sourceLabel, setSourceLabel] = useState("");
  const [sourceInfo, setSourceInfo] = useState<{ width: number; height: number } | null>(null);
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [checkerUrl, setCheckerUrl] = useState("https://example.com");
  const [isCheckingFavicon, setIsCheckingFavicon] = useState(false);
  const [checkerResult, setCheckerResult] = useState<FaviconCheckResult | null>(null);
  const [error, setError] = useState("");
  const [checkerError, setCheckerError] = useState("");

  const normalizedPadding = useMemo(() => {
    const parsed = Number.parseInt(paddingPercent, 10);
    if (Number.isNaN(parsed)) {
      return 14;
    }

    return Math.max(0, Math.min(MAX_PADDING, parsed));
  }, [paddingPercent]);

  const sourceGlyphSvgMarkup = useMemo(() => {
    if (mode === "text") {
      return buildTextGlyphSvg(logoText, foregroundColor);
    }

    if (!sourceDataUrl) {
      return "";
    }

    return buildImageGlyphSvg(sourceDataUrl);
  }, [foregroundColor, logoText, mode, sourceDataUrl]);

  const sourceGlyphDataUrl = useMemo(() => {
    if (!sourceGlyphSvgMarkup) {
      return "";
    }

    return createSvgDataUrl(sourceGlyphSvgMarkup);
  }, [sourceGlyphSvgMarkup]);

  const finalFaviconSvgMarkup = useMemo(() => {
    if (!sourceGlyphDataUrl) {
      return "";
    }

    return buildFinalFaviconSvg(
      sourceGlyphDataUrl,
      transparentBackground ? null : backgroundColor,
      normalizedPadding,
    );
  }, [backgroundColor, normalizedPadding, sourceGlyphDataUrl, transparentBackground]);

  const sourcePreviewUrl = useMemo(() => {
    if (!finalFaviconSvgMarkup) {
      return "";
    }

    return createSvgDataUrl(finalFaviconSvgMarkup);
  }, [finalFaviconSvgMarkup]);

  const manifestJson = useMemo(() => buildManifest(brandName.trim() || "Daxnoria", backgroundColor), [
    backgroundColor,
    brandName,
  ]);

  const installSnippet = useMemo(() => buildInstallSnippet(backgroundColor), [backgroundColor]);
  const manifestDataUrl = useMemo(() => `data:application/manifest+json;charset=utf-8,${encodeURIComponent(manifestJson)}`, [manifestJson]);
  const snippetDataUrl = useMemo(() => `data:text/plain;charset=utf-8,${encodeURIComponent(installSnippet)}`, [installSnippet]);

  useEffect(() => {
    let cancelled = false;

    async function generateAssets() {
      setError("");

      if (!sourceGlyphDataUrl || !finalFaviconSvgMarkup) {
        setGeneratedAssets([]);
        return;
      }

      setIsGenerating(true);

      try {
        const sourceImage = await loadImage(sourceGlyphDataUrl);
        const pngAssets: GeneratedAsset[] = [];

        for (const spec of OUTPUT_SPECS) {
          const dataUrl = await renderPngDataUrl(
            sourceImage,
            spec.size,
            transparentBackground ? null : backgroundColor,
            normalizedPadding,
          );
          pngAssets.push({
            kind: "png",
            label: `${spec.label} PNG`,
            filename: spec.filename,
            url: dataUrl,
            size: spec.size,
          });
        }

        const icoUrl = await createIcoDataUrl(pngAssets.slice(0, 3).map((asset) => asset.url));
        const svgUrl = createSvgDataUrl(finalFaviconSvgMarkup);

        if (!cancelled) {
          setGeneratedAssets([
            { kind: "svg", label: "SVG favicon", filename: "favicon.svg", url: svgUrl },
            { kind: "ico", label: "ICO pack", filename: "favicon.ico", url: icoUrl },
            ...pngAssets,
          ]);
        }
      } catch (generationError) {
        if (!cancelled) {
          setGeneratedAssets([]);
          setError(generationError instanceof Error ? generationError.message : "Favicon generation failed");
        }
      } finally {
        if (!cancelled) {
          setIsGenerating(false);
        }
      }
    }

    void generateAssets();

    return () => {
      cancelled = true;
    };
  }, [backgroundColor, finalFaviconSvgMarkup, normalizedPadding, sourceGlyphDataUrl, transparentBackground]);

  async function handleFileUpload(file: File | null) {
    setError("");

    if (!file) {
      setSourceDataUrl("");
      setSourceLabel("");
      setSourceInfo(null);
      setGeneratedAssets([]);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please upload a PNG, JPG, WEBP, or SVG file");
      return;
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      setError("File size must be less than 10MB");
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      const image = await loadImage(dataUrl);
      setSourceDataUrl(dataUrl);
      setSourceLabel(file.name);
      setSourceInfo({ width: image.width, height: image.height });
    } catch (fileError) {
      setSourceDataUrl("");
      setSourceLabel("");
      setSourceInfo(null);
      setError(fileError instanceof Error ? fileError.message : "Unable to read the uploaded file");
    }
  }

  async function copyText(value: string) {
    if (!value) {
      return;
    }

    await navigator.clipboard.writeText(value);
  }

  async function downloadAllAsZip() {
    if (!generatedAssets.length || isZipping) {
      return;
    }

    setError("");
    setIsZipping(true);

    try {
      const zip = new JSZip();

      for (const asset of generatedAssets) {
        zip.file(asset.filename, dataUrlToBlob(asset.url));
      }

      zip.file("site.webmanifest", manifestJson);
      zip.file("favicon-head-snippet.txt", installSnippet);

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const token = toSafeFileToken(brandName) || "favicon-pack";
      const zipUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = zipUrl;
      link.download = `${token}-favicon-pack.zip`;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(zipUrl);
    } catch (zipError) {
      setError(zipError instanceof Error ? zipError.message : "Unable to build ZIP package");
    } finally {
      setIsZipping(false);
    }
  }

  async function runFaviconCheck() {
    const trimmed = checkerUrl.trim();
    if (!trimmed) {
      setCheckerError("Please enter a URL to inspect.");
      setCheckerResult(null);
      return;
    }

    setCheckerError("");
    setCheckerResult(null);
    setIsCheckingFavicon(true);

    try {
      const response = await fetch("/api/favicon-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });

      const payload = (await response.json()) as
        | FaviconCheckResult
        | {
            error?: string;
          };

      if (!response.ok || "error" in payload) {
        throw new Error(("error" in payload && payload.error) || "Unable to check favicon");
      }

      setCheckerResult(payload as FaviconCheckResult);
    } catch (checkError) {
      setCheckerError(checkError instanceof Error ? checkError.message : "Unable to check favicon");
    } finally {
      setIsCheckingFavicon(false);
    }
  }

  const checklist = [
    { label: "SVG favicon", ready: generatedAssets.some((asset) => asset.kind === "svg") },
    { label: "ICO pack", ready: generatedAssets.some((asset) => asset.kind === "ico") },
    { label: "PNG sizes", ready: generatedAssets.filter((asset) => asset.kind === "png").length >= 3 },
    { label: "Manifest JSON", ready: Boolean(manifestJson) },
    { label: "HTML head snippet", ready: Boolean(installSnippet) },
  ];

  return (
    <section className="tool-shell favicon-shell" aria-label="Favicon generator tool">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Favicon generator</p>
          <h2>Favicon, SVG icon, PNG pack, ICO, manifest</h2>
          <p className="panel-subtext">
            Create browser and mobile icon assets in your browser with instant previews and install snippets.
          </p>
          <ol className="favicon-steps" aria-label="Favicon generation steps">
            <li>Choose text logo or upload your image.</li>
            <li>Adjust colors and padding until the preview looks balanced.</li>
            <li>Download SVG, ICO, PNG sizes, then apply the generated snippet.</li>
          </ol>
        </div>
      </div>

      <div className="action-grid compact">
        <button className={`mode-btn ${mode === "upload" ? "is-active" : ""}`} type="button" onClick={() => setMode("upload")}>
          <span>Upload image</span>
          <small>Turn an existing logo into icon sizes</small>
        </button>
        <button className={`mode-btn ${mode === "text" ? "is-active" : ""}`} type="button" onClick={() => setMode("text")}>
          <span>Text logo</span>
          <small>Build a monogram favicon from initials</small>
        </button>
      </div>

      <div className="favicon-tool-layout">
        <div>
          <div className="two-col-fields">
            <label className="field">
              <span>Brand name</span>
              <input value={brandName} onChange={(event) => setBrandName(event.target.value)} placeholder="Your product name" />
            </label>
            <label className="field">
              <span>Background color</span>
              <input type="color" value={backgroundColor} onChange={(event) => setBackgroundColor(event.target.value)} />
            </label>
            <label className="field">
              <span>Foreground color</span>
              <input type="color" value={foregroundColor} onChange={(event) => setForegroundColor(event.target.value)} />
            </label>
            <label className="field field-checkbox">
              <span>Background mode</span>
              <span className="checkbox-inline">
                <input
                  type="checkbox"
                  checked={transparentBackground}
                  onChange={(event) => setTransparentBackground(event.target.checked)}
                />
                Keep transparent background for exported icons
              </span>
            </label>
            <label className="field">
              <span>Logo padding % (0 - {MAX_PADDING})</span>
              <input value={paddingPercent} onChange={(event) => setPaddingPercent(event.target.value)} inputMode="numeric" />
            </label>
          </div>

          {mode === "text" ? (
            <label className="field">
              <span>Logo text</span>
              <input value={logoText} onChange={(event) => setLogoText(event.target.value)} placeholder="D" maxLength={3} />
            </label>
          ) : (
            <div className="image-upload-stage">
              <div
                className={`dropzone ${sourceDataUrl ? "has-preview" : "is-empty"}`}
                onClick={() => document.getElementById("favicon-file-input")?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    document.getElementById("favicon-file-input")?.click();
                  }
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  event.currentTarget.classList.add("is-dragging");
                }}
                onDragLeave={(event) => {
                  event.preventDefault();
                  event.currentTarget.classList.remove("is-dragging");
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  event.currentTarget.classList.remove("is-dragging");
                  const file = event.dataTransfer.files?.[0];
                  if (file) {
                    void handleFileUpload(file);
                  }
                }}
                aria-label="Upload logo image"
              >
                {!sourceDataUrl ? (
                  <>
                    <p className="dropzone-title">Drop a logo here</p>
                    <p className="dropzone-subtitle">
                      PNG, JPG, WEBP, or SVG works best. Transparent logos keep alpha when the option above is enabled.
                    </p>
                    <button type="button" className="btn primary">
                      Browse file
                    </button>
                  </>
                ) : (
                  <>
                    <p className="dropzone-title">Uploaded logo preview</p>
                    <p className="dropzone-subtitle">{sourceLabel || "Selected file"}</p>
                    <img className="tool-preview favicon-source-preview" src={sourcePreviewUrl} alt="Uploaded logo preview" />
                    {sourceInfo ? (
                      <div className="image-meta">
                        <span>
                          {sourceInfo.width} x {sourceInfo.height}
                        </span>
                        <span>{sourceLabel}</span>
                      </div>
                    ) : null}
                  </>
                )}
                <input
                  id="favicon-file-input"
                  type="file"
                  className="sr-only"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={(event) => {
                    void handleFileUpload(event.target.files?.[0] ?? null);
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="favicon-preview-stack">
          <div className="editor-card">
            <p>Source preview</p>
            {sourcePreviewUrl ? (
              <img className="tool-preview favicon-preview-source" src={sourcePreviewUrl} alt="Favicon source preview" />
            ) : (
              <div className="favicon-empty-state">Choose a logo or switch to text mode to start generating.</div>
            )}
          </div>

          <div className="favicon-checklist-card">
            <p>Install checklist</p>
            <ul className="favicon-checklist">
              {checklist.map((item) => (
                <li key={item.label} className={item.ready ? "is-ready" : "is-pending"}>
                  <span>{item.label}</span>
                  <small>{item.ready ? "Ready" : "Pending"}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {generatedAssets.length > 0 ? (
        <div className="favicon-results">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Generated pack</p>
              <h3>Download every icon size</h3>
              <p className="panel-subtext">Use the PNG pack, SVG favicon, and ICO file together for broad browser support.</p>
            </div>
            <div className="favicon-pack-actions">
              <button className="btn primary" type="button" onClick={() => void downloadAllAsZip()} disabled={isGenerating || isZipping}>
                {isZipping ? "Preparing ZIP..." : "Download all (ZIP)"}
              </button>
            </div>
          </div>

          <div className="favicon-preview-grid">
            {generatedAssets.map((asset) => (
              <article key={asset.filename} className="favicon-preview-card">
                {asset.kind === "ico" ? (
                  <div className="favicon-ico-badge" aria-hidden="true">
                    ICO
                  </div>
                ) : (
                  <img src={asset.url} alt={asset.label} className="favicon-preview-image" />
                )}
                <div>
                  <strong>{asset.label}</strong>
                  <p>{asset.filename}</p>
                </div>
                <a href={asset.url} download={asset.filename} className="btn primary download-btn">
                  Download file
                </a>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      <div className="editor-grid favicon-snippet-grid">
        <div className="editor-card">
          <p>Manifest JSON</p>
          <pre className="favicon-code">{manifestJson}</pre>
          <div className="favicon-snippet-actions">
            <button type="button" className="btn" onClick={() => copyText(manifestJson)}>
              Copy manifest
            </button>
            <a href={manifestDataUrl} download="site.webmanifest" className="btn primary">
              Download manifest
            </a>
          </div>
        </div>

        <div className="editor-card">
          <p>HTML head snippet</p>
          <pre className="favicon-code">{installSnippet}</pre>
          <div className="favicon-snippet-actions">
            <button type="button" className="btn" onClick={() => copyText(installSnippet)}>
              Copy snippet
            </button>
            <a href={snippetDataUrl} download="favicon-head-snippet.txt" className="btn primary">
              Download snippet
            </a>
          </div>
        </div>
      </div>

      <div className="favicon-checker-shell">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Favicon checker</p>
            <h3>Platform favicon visibility test</h3>
            <p className="panel-subtext">
              Validate how your favicon setup is discovered from HTML and manifest files, then inspect response status and content metadata.
            </p>
          </div>
        </div>

        <label className="favicon-checker-label" htmlFor="favicon-checker-url">
          Website URL
        </label>
        <div className="favicon-checker-input-row">
          <input
            id="favicon-checker-url"
            value={checkerUrl}
            onChange={(event) => setCheckerUrl(event.target.value)}
            placeholder="Enter a full website URL, for example: https://example.com"
            inputMode="url"
          />
          <button className="btn primary" type="button" onClick={() => void runFaviconCheck()} disabled={isCheckingFavicon}>
            {isCheckingFavicon ? "Checking..." : "Check favicon"}
          </button>
        </div>
        <p className="favicon-checker-hint">Tip: include https:// for the most accurate production-like result.</p>

        {checkerError ? <p className="error">{checkerError}</p> : null}

        {checkerResult ? (
          <div className="favicon-checker-results">
            <div className="favicon-checker-summary">
              <p>
                <strong>Resolved URL:</strong> {checkerResult.normalizedUrl}
              </p>
              <p>
                <strong>Homepage status:</strong> {checkerResult.homepageStatus}
              </p>
              <p>
                <strong>Icons found:</strong> {checkerResult.iconCount}
              </p>
            </div>

            <div className="favicon-preview-grid">
              {checkerResult.icons.map((icon) => (
                <article key={`${icon.url}-${icon.rel}`} className="favicon-preview-card">
                  <img src={icon.url} alt={`Favicon candidate ${icon.rel}`} className="favicon-preview-image favicon-preview-image-checker" />
                  <div>
                    <strong>{icon.rel || "icon"}</strong>
                    <p>{icon.url}</p>
                    <p>
                      {icon.ok ? "Reachable" : "Unreachable"}
                      {icon.status ? ` (${icon.status})` : ""}
                    </p>
                    <p>
                      {icon.contentType || "unknown type"}
                      {icon.sizes ? ` • ${icon.sizes}` : ""}
                    </p>
                  </div>
                  <a href={icon.url} target="_blank" rel="noreferrer" className="btn">
                    Open file
                  </a>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {error ? <p className="error">{error}</p> : null}
    </section>
  );
}
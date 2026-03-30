"use client";

import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";

type ImageAction = "compress" | "resize" | "convert";

export default function ImageToolsPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [sourceUrl, setSourceUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [resultInfo, setResultInfo] = useState<{ width: number; height: number } | null>(null);
  const [resultMimeType, setResultMimeType] = useState<"image/png" | "image/jpeg" | "image/webp">("image/jpeg");
  const [isDragging, setIsDragging] = useState(false);
  const [width, setWidth] = useState("1280");
  const [height, setHeight] = useState("720");
  const [quality, setQuality] = useState("0.75");
  const [convertTo, setConvertTo] = useState<"image/png" | "image/jpeg">("image/jpeg");
  const [error, setError] = useState("");
  const [sourceInfo, setSourceInfo] = useState<{ width: number; height: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (sourceUrl) {
        URL.revokeObjectURL(sourceUrl);
      }
    };
  }, [sourceUrl]);

  async function readImageMeta(imageFile: File) {
    const objectUrl = URL.createObjectURL(imageFile);
    const image = new window.Image();
    image.src = objectUrl;

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Unable to read image"));
    });

    setSourceInfo({ width: image.width, height: image.height });
    URL.revokeObjectURL(objectUrl);
  }

  async function applyFile(nextFile: File | null) {
    setError("");

    if (!nextFile) {
      setFile(null);
      setSourceInfo(null);
      setSourceUrl("");
      return;
    }

    if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(nextFile.type)) {
      setError("Only PNG, JPG and WEBP files are supported");
      return;
    }

    if (sourceUrl) {
      URL.revokeObjectURL(sourceUrl);
    }

    setFile(nextFile);
    setResultUrl("");
    setResultInfo(null);
    setResultMimeType("image/jpeg");
    setSourceUrl(URL.createObjectURL(nextFile));

    try {
      await readImageMeta(nextFile);
    } catch {
      setSourceInfo(null);
      setError("Unable to read image metadata");
    }
  }

  function onDropFile(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    void applyFile(event.dataTransfer.files?.[0] ?? null);
  }

  async function processImage(action: ImageAction) {
    setError("");
    if (!file) {
      setError("Please select an image first");
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    try {
      const image = new window.Image();
      image.src = objectUrl;

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Unable to read image"));
      });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Canvas is not available");
        return;
      }

      let targetWidth = image.width;
      let targetHeight = image.height;

      if (action === "resize") {
        targetWidth = Math.max(1, Number.parseInt(width, 10) || image.width);
        targetHeight = Math.max(1, Number.parseInt(height, 10) || image.height);
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

      const normalizedFileType = file.type === "image/jpg" ? "image/jpeg" : file.type;
      const outputType = action === "convert" ? convertTo : (normalizedFileType || "image/jpeg");
      const outputQuality =
        action === "compress" ? Math.min(1, Math.max(0.1, Number.parseFloat(quality) || 0.75)) : 0.92;

      const output = canvas.toDataURL(outputType, outputQuality);
      setResultUrl(output);
      setResultMimeType(outputType === "image/png" ? "image/png" : outputType === "image/webp" ? "image/webp" : "image/jpeg");
      setResultInfo({ width: targetWidth, height: targetHeight });
    } catch (toolError) {
      setResultUrl("");
      setResultInfo(null);
      setError(toolError instanceof Error ? toolError.message : "Image processing failed");
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }

  const downloadExtension = resultMimeType === "image/png" ? "png" : resultMimeType === "image/webp" ? "webp" : "jpg";

  return (
    <section className="tool-shell">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Image tools</p>
          <h2>Compress Image, Resize Image, Convert PNG/JPG</h2>
        </div>
      </div>

      <div className="image-tool-layout">
        <div
          className={`dropzone ${isDragging ? "is-dragging" : ""}`}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDropFile}
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          aria-label="Upload image by dragging or browsing"
        >
          <p className="dropzone-title">Drop image here</p>
          <p className="dropzone-subtitle">Drag and drop PNG/JPG/WEBP or click to browse</p>
          <button type="button" className="btn primary">
            Browse file
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="sr-only"
            accept="image/png,image/jpeg,image/webp"
            onChange={(event) => {
              void applyFile(event.target.files?.[0] ?? null);
            }}
          />
        </div>

        <div className="editor-card image-source-card">
          <p>Source image</p>
          {sourceUrl ? (
            <NextImage
              src={sourceUrl}
              alt="Source preview"
              className="tool-preview"
              width={sourceInfo?.width ?? 1200}
              height={sourceInfo?.height ?? 800}
              unoptimized
            />
          ) : (
            <p className="hint">No image selected yet</p>
          )}
          {file ? (
            <div className="image-meta">
              <span>{file.name}</span>
              <span>{(file.size / 1024).toFixed(1)} KB</span>
              <span>
                {sourceInfo ? `${sourceInfo.width} x ${sourceInfo.height}` : "Loading dimensions..."}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="two-col-fields">
        <label className="field">
          <span>Convert target format</span>
          <select value={convertTo} onChange={(event) => setConvertTo(event.target.value as "image/png" | "image/jpeg")}>
            <option value="image/jpeg">JPG</option>
            <option value="image/png">PNG</option>
          </select>
        </label>
        <label className="field">
          <span>Resize width</span>
          <input value={width} onChange={(event) => setWidth(event.target.value)} />
        </label>
        <label className="field">
          <span>Resize height</span>
          <input value={height} onChange={(event) => setHeight(event.target.value)} />
        </label>
      </div>

      <label className="field">
        <span>Compress quality (0.1 - 1.0)</span>
        <input value={quality} onChange={(event) => setQuality(event.target.value)} />
      </label>

      <div className="control-row">
        <button className="btn primary" onClick={() => processImage("compress")}>Compress Image</button>
        <button className="btn" onClick={() => processImage("resize")}>Resize Image</button>
        <button className="btn" onClick={() => processImage("convert")}>Convert PNG/JPG</button>
      </div>

      {resultUrl ? (
        <div className="editor-card">
          <p>Output preview</p>
          <NextImage
            src={resultUrl}
            alt="Processed output"
            className="tool-preview"
            width={resultInfo?.width ?? sourceInfo?.width ?? 1200}
            height={resultInfo?.height ?? sourceInfo?.height ?? 800}
            unoptimized
          />
          <a href={resultUrl} download={`processed-image.${downloadExtension}`} className="btn primary download-btn">
            Download result
          </a>
        </div>
      ) : null}

      {error ? <p className="error">{error}</p> : null}
    </section>
  );
}

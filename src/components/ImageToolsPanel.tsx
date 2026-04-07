"use client";

import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

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
  const [convertTo, setConvertTo] = useState<"image/png" | "image/jpeg" | "image/webp">("image/jpeg");
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

    trackEvent("upload_image", {
      file_type: nextFile.type || "unknown",
      file_size_kb: Number((nextFile.size / 1024).toFixed(1)),
    });

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

      if (action === "compress") {
        trackEvent("compress_image", {
          source_type: normalizedFileType || "image/jpeg",
          output_type: outputType,
          output_width: targetWidth,
          output_height: targetHeight,
        });
      }
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
          <h2>Compress Image, Resize Image, Convert JPEG/JPG, PNG, WEBP</h2>
          <p className="panel-subtext">Process images directly in your browser with quick export and no server upload.</p>
        </div>
      </div>

      <div className="image-upload-stage">
        <div
          className={`dropzone ${isDragging ? "is-dragging" : ""} ${sourceUrl ? "has-preview" : "is-empty"}`}
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
          {!sourceUrl ? (
            <>
              <p className="dropzone-title">Drop an image here</p>
              <p className="dropzone-subtitle">Drag and drop PNG, JPG, or WEBP files, or click to browse</p>
              <button type="button" className="btn primary">
                Browse file
              </button>
            </>
          ) : (
            <>
              <p className="dropzone-title">Selected image preview</p>
              <p className="dropzone-subtitle">Click to replace with another file</p>
              <NextImage
                src={sourceUrl}
                alt="Source preview"
                className="tool-preview"
                width={sourceInfo?.width ?? 1200}
                height={sourceInfo?.height ?? 800}
                unoptimized
              />
              {file ? (
                <div className="image-meta">
                  <span>{file.name}</span>
                  <span>{(file.size / 1024).toFixed(1)} KB</span>
                  <span>
                    {sourceInfo ? `${sourceInfo.width} x ${sourceInfo.height}` : "Loading dimensions..."}
                  </span>
                </div>
              ) : null}
            </>
          )}
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
      </div>

      <div className="two-col-fields">
        <label className="field">
          <span>Convert target format</span>
          <select
            value={convertTo}
            onChange={(event) =>
              setConvertTo(event.target.value as "image/png" | "image/jpeg" | "image/webp")
            }
          >
            <option value="image/jpeg">JPG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WEBP</option>
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

      <div className="action-grid compact">
        <button className="mode-btn is-active" onClick={() => processImage("compress")} type="button">
          <span>Compress Image</span>
          <small>Reduce file size while keeping visual quality</small>
        </button>
        <button className="mode-btn" onClick={() => processImage("resize")} type="button">
          <span>Resize Image</span>
          <small>Apply custom output dimensions</small>
        </button>
        <button className="mode-btn" onClick={() => processImage("convert")} type="button">
          <span>Convert JPEG/JPG, PNG, WEBP</span>
          <small>Change format for compatibility needs</small>
        </button>
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
          <a
            href={resultUrl}
            download={`processed-image.${downloadExtension}`}
            className="btn primary download-btn"
            onClick={() => {
              trackEvent("download_image", {
                output_type: resultMimeType,
                output_width: resultInfo?.width ?? sourceInfo?.width ?? 0,
                output_height: resultInfo?.height ?? sourceInfo?.height ?? 0,
              });
            }}
          >
            Download result
          </a>
        </div>
      ) : null}

      {error ? <p className="error">{error}</p> : null}
    </section>
  );
}

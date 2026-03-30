"use client";

import NextImage from "next/image";
import { PDFDocument } from "pdf-lib";
import { useEffect, useState } from "react";

type PdfjsModule = typeof import("pdfjs-dist");

function pdfBytesToBlob(bytes: Uint8Array): Blob {
  const normalized = new Uint8Array(bytes.byteLength);
  normalized.set(bytes);
  return new Blob([normalized.buffer], { type: "application/pdf" });
}

export default function PdfToolsPanel() {
  const [files, setFiles] = useState<File[]>([]);
  const [splitRange, setSplitRange] = useState("1-2");
  const [outputUrl, setOutputUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (outputUrl) {
        URL.revokeObjectURL(outputUrl);
      }
    };
  }, [outputUrl]);

  useEffect(() => {
    return () => {
      if (imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  function updateFiles(event: React.ChangeEvent<HTMLInputElement>) {
    setFiles(Array.from(event.target.files ?? []));
  }

  async function mergePdf() {
    setError("");
    if (files.length < 2) {
      setError("Please upload at least 2 PDF files for merge");
      return;
    }

    try {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }

      const out = await merged.save();
      const blob = pdfBytesToBlob(out);
      setOutputUrl(URL.createObjectURL(blob));
      setImageUrl("");
    } catch (toolError) {
      setOutputUrl("");
      setError(toolError instanceof Error ? toolError.message : "Unable to merge PDF files");
    }
  }

  async function splitPdf() {
    setError("");
    if (files.length < 1) {
      setError("Please upload a PDF for split");
      return;
    }

    try {
      const [startRaw, endRaw] = splitRange.split("-");
      const start = Math.max(1, Number.parseInt(startRaw, 10) || 1);
      const end = Math.max(start, Number.parseInt(endRaw, 10) || start);

      const bytes = await files[0].arrayBuffer();
      const source = await PDFDocument.load(bytes);
      const total = source.getPageCount();

      const newPdf = await PDFDocument.create();
      const indices: number[] = [];
      for (let i = start - 1; i <= Math.min(end - 1, total - 1); i += 1) {
        indices.push(i);
      }

      if (indices.length === 0) {
        setError("Split range is outside of PDF pages");
        return;
      }

      const pages = await newPdf.copyPages(source, indices);
      pages.forEach((page) => newPdf.addPage(page));

      const out = await newPdf.save();
      const blob = pdfBytesToBlob(out);
      setOutputUrl(URL.createObjectURL(blob));
      setImageUrl("");
    } catch (toolError) {
      setOutputUrl("");
      setError(toolError instanceof Error ? toolError.message : "Unable to split PDF");
    }
  }

  async function pdfToImage() {
    setError("");
    if (files.length < 1) {
      setError("Please upload a PDF first");
      return;
    }

    try {
      const pdfjs = (await import("pdfjs-dist")) as PdfjsModule;
      const workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

      const bytes = await files[0].arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: bytes });
      const doc = await loadingTask.promise;
      const page = await doc.getPage(1);

      const viewport = page.getViewport({ scale: 1.6 });
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Canvas is unavailable");
        return;
      }

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvas, canvasContext: ctx, viewport }).promise;

      setImageUrl(canvas.toDataURL("image/png"));
      setOutputUrl("");
    } catch (toolError) {
      setImageUrl("");
      setError(toolError instanceof Error ? toolError.message : "Unable to convert PDF to image");
    }
  }

  return (
    <section className="tool-shell">
      <div className="panel-head">
        <div>
          <p className="eyebrow">PDF tools</p>
          <h2>Merge PDF, Split PDF, PDF to Image</h2>
        </div>
      </div>

      <label className="field">
        <span>Upload PDF files</span>
        <input type="file" accept="application/pdf" multiple onChange={updateFiles} />
      </label>

      <label className="field">
        <span>Split range (example: 1-2)</span>
        <input value={splitRange} onChange={(event) => setSplitRange(event.target.value)} />
      </label>

      <div className="control-row">
        <button className="btn primary" onClick={mergePdf}>Merge PDF</button>
        <button className="btn" onClick={splitPdf}>Split PDF</button>
        <button className="btn" onClick={pdfToImage}>PDF to Image</button>
      </div>

      {outputUrl ? (
        <div className="editor-card">
          <p>PDF result</p>
          <a href={outputUrl} download="processed.pdf" className="btn primary download-btn">Download PDF</a>
        </div>
      ) : null}

      {imageUrl ? (
        <div className="editor-card">
          <p>PDF to image preview</p>
          <NextImage
            src={imageUrl}
            alt="PDF converted to image"
            className="tool-preview"
            width={1200}
            height={1600}
            unoptimized
          />
          <a href={imageUrl} download="pdf-page.png" className="btn primary download-btn">Download image</a>
        </div>
      ) : null}

      {error ? <p className="error">{error}</p> : null}
    </section>
  );
}

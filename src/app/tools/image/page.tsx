import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ImageToolsPanel from "@/components/ImageToolsPanel";

export const metadata: Metadata = {
  title: "Image Tools",
  description: "Compress Image, Resize Image, and Convert PNG/JPG online.",
};

export default function ImageToolsPage() {
  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />
      <section className="hero">
        <p className="badge">Image toolkit</p>
        <h1>Compress, Resize, Convert PNG/JPG</h1>
        <p className="lead">Process images directly in browser with simple export and download.</p>
      </section>
      <ImageToolsPanel />
      <SiteFooter />
    </main>
  );
}

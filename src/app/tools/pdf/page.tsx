import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PdfToolsPanel from "@/components/PdfToolsPanel";

export const metadata: Metadata = {
  title: "PDF Tools",
  description: "Merge PDF, Split PDF, and PDF to Image online tools.",
};

export default function PdfToolsPage() {
  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />
      <section className="hero">
        <p className="badge">PDF toolkit</p>
        <h1>Merge PDF, Split PDF, PDF to Image</h1>
        <p className="lead">Handle common PDF workflows quickly with client-side processing tools.</p>
      </section>
      <PdfToolsPanel />
      <SiteFooter />
    </main>
  );
}

import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import DiffCheckerPanel from "@/components/DiffCheckerPanel";

export const metadata: Metadata = {
  title: "Diff Checker",
  description: "Compare two text blocks line by line with a fast diff checker.",
};

export default function DiffCheckerPage() {
  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />
      <section className="hero">
        <p className="badge">Compare toolkit</p>
        <h1>Diff Checker</h1>
        <p className="lead">Compare two versions of text, config, or code with a clean line-by-line diff view.</p>
      </section>
      <DiffCheckerPanel />
      <SiteFooter />
    </main>
  );
}
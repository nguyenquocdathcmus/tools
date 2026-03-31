import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TextCountPanel from "@/components/TextCountPanel";

export const metadata: Metadata = {
  title: "Text & Word Counter Tool",
  description: "Count words, characters, lines, and paragraphs instantly.",
};

export default function TextCountPage() {
  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />
      <section className="hero">
        <p className="badge">Text tools</p>
        <h1>Word & Character Counter</h1>
        <p className="lead">Count words, characters, lines, and paragraphs in your text instantly.</p>
      </section>
      <TextCountPanel />
      <SiteFooter />
    </main>
  );
}
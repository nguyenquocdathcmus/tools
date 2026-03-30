import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import EncodeToolsPanel from "@/components/EncodeToolsPanel";

export const metadata: Metadata = {
  title: "Encode Tools",
  description: "Base64 Encoder, URL Encoder, and HTML Encode tools online.",
};

export default function EncodeToolsPage() {
  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />
      <section className="hero">
        <p className="badge">Encode toolkit</p>
        <h1>Base64, URL, HTML Encode</h1>
        <p className="lead">Encode and decode text quickly for APIs, links, and frontend HTML payloads.</p>
      </section>
      <EncodeToolsPanel />
      <SiteFooter />
    </main>
  );
}

import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import QrCodeToolsPanel from "@/components/QrCodeToolsPanel";

export const metadata: Metadata = {
  title: "QR Code Generator",
  description: "Create QR codes for URL, vCard, text, email, SMS, Wifi, Bitcoin, app stores, and files.",
};

export default function QrCodeToolsPage() {
  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />
      <section className="hero">
        <p className="badge">QR toolkit</p>
        <h1>QR Code Generator</h1>
        <p className="lead">Generate branded QR codes for links, text, contact cards, files, and app distribution.</p>
      </section>
      <QrCodeToolsPanel />
      <SiteFooter />
    </main>
  );
}

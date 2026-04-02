import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import QrCodeToolsPanel from "@/components/QrCodeToolsPanel";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "QR Code Generator",
  description: "Create QR codes for URL, vCard, text, email, SMS, Wifi, Bitcoin, app stores, and files.",
  alternates: {
    canonical: "/tools/qrcode",
  },
  openGraph: {
    title: "QR Code Generator",
    description: "Create QR codes for URL, vCard, text, email, SMS, Wifi, Bitcoin, app stores, and files.",
    url: `${SITE_URL}/tools/qrcode`,
    images: [{ url: `${SITE_URL}/og?name=QR%20Code%20Generator`, width: 1200, height: 630, alt: "QR Code Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator",
    description: "Generate QR codes for links, contact cards, Wi-Fi, and app distribution.",
    images: [`${SITE_URL}/og?name=QR%20Code%20Generator`],
  },
};

export default function QrCodeToolsPage() {
  const relatedTools = [
    { href: "/tools/image", name: "Image Tools" },
    { href: "/tools/pdf", name: "PDF Tools" },
    { href: "/tools/encode", name: "Encode Tools" },
    { href: "/tools/jwt-decoder", name: "JWT Decoder" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What QR types can I create?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can create QR codes for URLs, text, contact cards, Wi-Fi credentials, and multiple app/share formats.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download generated QR images?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Generated codes can be exported for print, social posts, and product packaging use cases.",
        },
      },
      {
        "@type": "Question",
        name: "Is generation fast for repeated edits?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. QR rendering updates quickly so you can iterate text and settings in real time.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools/all` },
      { "@type": "ListItem", position: 3, name: "QR Code Generator", item: `${SITE_URL}/tools/qrcode` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>QR Code Generator</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Create QR codes for links, text, contact cards, Wi-Fi, and app distribution.
        </p>
      </header>

      <QrCodeToolsPanel />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About QR Code Tools</h2>
        <p>
          QR codes streamline offline-to-online journeys, onboarding, and contact sharing. This tool helps you build
          scannable codes quickly for marketing, internal operations, and customer experience flows.
        </p>

        <h2 id="what-is">What is a QR Code?</h2>
        <p>
          A QR code is a two-dimensional barcode that stores data such as URLs, text, or credentials and can be read
          instantly by smartphone cameras and scanner devices.
        </p>

        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>What QR types can I create?</h3>
          <p>You can create QR codes for URLs, text, contact cards, Wi-Fi credentials, and multiple app/share formats.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Can I download generated QR images?</h3>
          <p>Yes. Generated codes can be exported for print, social posts, and product packaging use cases.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Is generation fast for repeated edits?</h3>
          <p>Yes. QR rendering updates quickly so you can iterate text and settings in real time.</p>
        </div>
      </section>

      <section className="supported" aria-labelledby="related-title">
        <h2 id="related-title">Related Tools</h2>
        <ul className="related-grid">
          {relatedTools.map((tool) => (
            <li key={tool.href}>
              <Link href={tool.href}>
                <span>{tool.name}</span>
                <small>Open tool -&gt;</small>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />

      <Script
        id="schema-breadcrumb-qrcode"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-faq-qrcode"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}

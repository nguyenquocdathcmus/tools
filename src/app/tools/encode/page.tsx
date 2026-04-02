import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import EncodeToolsPanel from "@/components/EncodeToolsPanel";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Encode Tools | Base64, URL, HTML Encode & Decode",
  description: "Free online encode tools for Base64, URL, and HTML encode/decode workflows. Fast, secure, and browser-based.",
  alternates: {
    canonical: "/tools/encode",
  },
  openGraph: {
    title: "Encode Tools | Base64, URL, HTML Encode & Decode",
    description: "Free online encode tools for Base64, URL, and HTML encode/decode workflows. Fast, secure, and browser-based.",
    url: `${SITE_URL}/tools/encode`,
    images: [{ url: `${SITE_URL}/og?name=Encode%20Tools`, width: 1200, height: 630, alt: "Encode Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Encode Tools | Base64, URL, HTML Encode & Decode",
    description: "Encode/decode text for APIs, links, and frontend payloads.",
    images: [`${SITE_URL}/og?name=Encode%20Tools`],
  },
};

export default function EncodeToolsPage() {
  const relatedTools = [
    { href: "/tools/text-count", name: "Text Counter" },
    { href: "/tools/timestamp", name: "Timestamp Converter" },
    { href: "/tools/jwt-decoder", name: "JWT Decoder" },
    { href: "/tools/diff-checker", name: "Diff Checker" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What can I encode with this tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can encode and decode text with Base64, URL, and HTML utilities in one place.",
        },
      },
      {
        "@type": "Question",
        name: "Is my input uploaded to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All encode/decode processing runs directly in your browser for privacy and speed.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use this for API debugging?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. It is useful for preparing query params, decoding payloads, and troubleshooting encoded values.",
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
      { "@type": "ListItem", position: 3, name: "Encode Tools", item: `${SITE_URL}/tools/encode` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>Encode Tools</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Base64, URL, and HTML encode/decode in one fast browser toolkit.
        </p>
      </header>

      <EncodeToolsPanel />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About Encode Tools</h2>
        <p>
          Encode utilities are essential when moving data between browsers, APIs, and backend systems. This toolkit
          helps you quickly switch between Base64, URL encoding, and HTML escaping without leaving your workflow.
        </p>

        <h2 id="what-is">What is Text Encoding?</h2>
        <p>
          Text encoding transforms content into formats that are safe for transport or display in specific contexts,
          such as URLs, headers, HTML templates, and serialized payloads.
        </p>

        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>What can I encode with this tool?</h3>
          <p>You can encode and decode text with Base64, URL, and HTML utilities in one place.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Is my input uploaded to a server?</h3>
          <p>No. All processing runs directly in your browser for privacy and speed.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Can I use this for API debugging?</h3>
          <p>Yes. It is useful for preparing query params, decoding payloads, and troubleshooting encoded values.</p>
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
        id="schema-breadcrumb-encode"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-faq-encode"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import AdSlot from "@/components/AdSlot";
import { FORMATTERS } from "@/lib/formatters";
import { SITE_URL } from "@/lib/site";
import EncodeToolsPanelWrapper from "@/components/EncodeToolsPanelWrapper";

export const metadata: Metadata = {
  title: "Base64 Encoder | Free Online Encode Tool | Daxnoria",
  description: "Encode plain text into Base64 format instantly. Free, fast, and secure client-side Base64 encoding tool for developers.",
  alternates: {
    canonical: "/base64-encode",
  },
  openGraph: {
    title: "Base64 Encoder | Free Online Encode Tool | Daxnoria",
    description: "Encode plain text into Base64 format instantly. Free, fast, and secure client-side Base64 encoding tool for developers.",
    url: `${SITE_URL}/base64-encode`,
    images: [{ url: `${SITE_URL}/og?name=Base64%20Encoder`, width: 1200, height: 630, alt: "Base64 Encoder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encoder | Free Online Encode Tool | Daxnoria",
    description: "Encode plain text into Base64 format instantly. Free, fast, and secure client-side Base64 encoding tool for developers.",
    images: [`${SITE_URL}/og?name=Base64%20Encoder`],
  },
};

export default function Page() {
  const relatedLinks = FORMATTERS.filter((item) => item.id !== "json").slice(0, 8);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Is Base64 encoding the same as encryption?", acceptedAnswer: { "@type": "Answer", text: "No. Base64 is an encoding format, safely translating data formats. It provides zero cryptographic security and can be easily decoded by anyone." } },
      { "@type": "Question", name: "What happens to my data?", acceptedAnswer: { "@type": "Answer", text: "All encoding is processed locally in your browser. Your input text is never sent to our servers." } },
      { "@type": "Question", name: "Can I encode URLs?", acceptedAnswer: { "@type": "Answer", text: "Yes, but be aware standard Base64 includes + and / characters. For URLs, it is often better to use a URL encode tool or a URL-safe Base64 variant." } }
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Base64 Encoder", item: `${SITE_URL}/base64-encode` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>Base64 Encoder</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Encode plain text into Base64 format instantly. Free, fast, and secure client-side Base64 encoding tool for developers.
        </p>
      </header>

      <EncodeToolsPanelWrapper />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About Base64 Encoder</h2>
        <p dangerouslySetInnerHTML={{ __html: `Need to safely transmit data across a network without character corruption? Our <strong>Base64 Encoder</strong> instantly converts your plain text or code into a Base64 encoded string. It is perfect for embedding images in CSS, attaching data to URLs, or formatting basic authentication headers.` }} />

        <h2 id="what-is">What is Base64 Encoding?</h2>
        <p dangerouslySetInnerHTML={{ __html: `<strong>Base64 Encoding</strong> is a scheme that converts binary data or text into an ASCII string format. It utilizes a 64-character alphabet (A-Z, a-z, 0-9, +, /) to represent data, ensuring that the payload survives transit across protocols that only support text.` }} />

        {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>Is Base64 encoding the same as encryption?</h3>
          <p>No. Base64 is an encoding format, safely translating data formats. It provides zero cryptographic security and can be easily decoded by anyone.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>What happens to my data?</h3>
          <p>All encoding is processed locally in your browser. Your input text is never sent to our servers.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Can I encode URLs?</h3>
          <p>Yes, but be aware standard Base64 includes + and / characters. For URLs, it is often better to use a URL encode tool or a URL-safe Base64 variant.</p>
        </div>
      </section>

      <section className="supported" aria-labelledby="related-title">
        <h2 id="related-title">Related Tools</h2>
        <ul className="related-grid">
          {relatedLinks.map((item) => (
            <li key={item.id}>
              <Link href={`/${item.slug}`}>
                <span>{item.name}</span>
                <small>Open formatter -&gt;</small>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/json-formatter">
              <span>JSON Formatter</span>
              <small>Open tool -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/base64-encode">
              <span>Base64 Encoder</span>
              <small>Open tool -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/url-encode">
              <span>URL Encoder</span>
              <small>Open tool -&gt;</small>
            </Link>
          </li>
        </ul>
      </section>

      <SiteFooter />

      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}

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
  title: "URL Encoder | Free Online URL Escape Tool | Daxnoria",
  description: "Encode URLs instantly to safely transmit data over the internet. Escape spaces and special characters with this free online developer tool.",
  alternates: {
    canonical: "/url-encode",
  },
  openGraph: {
    title: "URL Encoder | Free Online URL Escape Tool | Daxnoria",
    description: "Encode URLs instantly to safely transmit data over the internet. Escape spaces and special characters with this free online developer tool.",
    url: `${SITE_URL}/url-encode`,
    images: [{ url: `${SITE_URL}/og?name=URL%20Encoder`, width: 1200, height: 630, alt: "URL Encoder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Encoder | Free Online URL Escape Tool | Daxnoria",
    description: "Encode URLs instantly to safely transmit data over the internet. Escape spaces and special characters with this free online developer tool.",
    images: [`${SITE_URL}/og?name=URL%20Encoder`],
  },
};

export default function Page() {
  const relatedLinks = FORMATTERS.filter((item) => item.id !== "json").slice(0, 8);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Why do I need to URL encode?", acceptedAnswer: { "@type": "Answer", text: "To ensure URLs are uniformly processed across all web browsers and servers. Unescaped characters like spaces or raw & symbols can break routing parameters." } },
      { "@type": "Question", name: "How does it encode spaces?", acceptedAnswer: { "@type": "Answer", text: "Our tool standardizes spaces by converting them into the highly compatible %20 format." } },
      { "@type": "Question", name: "Is it free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes, everything is completely free and executes locally inside your web browser." } }
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "URL Encoder", item: `${SITE_URL}/url-encode` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>URL Encoder</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Encode URLs instantly to safely transmit data over the internet. Escape spaces and special characters with this free online developer tool.
        </p>
      </header>

      <EncodeToolsPanelWrapper />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About URL Encoder</h2>
        <p dangerouslySetInnerHTML={{ __html: `Uniform Resource Locators (URLs) can only be sent over the internet using the ASCII character-set. If your URL contains spaces, ampersands, or foreign characters, use our <strong>URL Encoder</strong> to safely escape them into compliant format (like %20 for space).` }} />

        <h2 id="what-is">What is URL Encoding?</h2>
        <p dangerouslySetInnerHTML={{ __html: `<strong>URL Encoding</strong> (or Percent-encoding) is a mechanism for encoding information in a Uniform Resource Identifier (URI). It replaces unsafe ASCII characters with a \&quot;%\&quot; followed by two hexadecimal digits.` }} />

        {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>Why do I need to URL encode?</h3>
          <p>To ensure URLs are uniformly processed across all web browsers and servers. Unescaped characters like spaces or raw & symbols can break routing parameters.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>How does it encode spaces?</h3>
          <p>Our tool standardizes spaces by converting them into the highly compatible %20 format.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Is it free to use?</h3>
          <p>Yes, everything is completely free and executes locally inside your web browser.</p>
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

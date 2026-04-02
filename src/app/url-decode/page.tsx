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
  title: "URL Decoder | Free Online Unescape Tool | Daxnoria",
  description: "Decode URL encoded strings back into readable text instantly. Free client-side tool for unescaping percent-encoded URLs.",
  alternates: {
    canonical: "/url-decode",
  },
  openGraph: {
    title: "URL Decoder | Free Online Unescape Tool | Daxnoria",
    description: "Decode URL encoded strings back into readable text instantly. Free client-side tool for unescaping percent-encoded URLs.",
    url: `${SITE_URL}/url-decode`,
    images: [{ url: `${SITE_URL}/og?name=URL%20Decoder`, width: 1200, height: 630, alt: "URL Decoder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Decoder | Free Online Unescape Tool | Daxnoria",
    description: "Decode URL encoded strings back into readable text instantly. Free client-side tool for unescaping percent-encoded URLs.",
    images: [`${SITE_URL}/og?name=URL%20Decoder`],
  },
};

export default function Page() {
  const relatedLinks = FORMATTERS.filter((item) => item.id !== "json").slice(0, 8);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What does %20 mean?", acceptedAnswer: { "@type": "Answer", text: "The sequence %20 represents a single space character in a URL encoded string." } },
      { "@type": "Question", name: "Is my data secure?", acceptedAnswer: { "@type": "Answer", text: "Yes, the decoding process happens exclusively on your local computer via Javascript." } },
      { "@type": "Question", name: "What if the URL is double encoded?", acceptedAnswer: { "@type": "Answer", text: "If a URL has been encoded twice, you will need to run the decoder twice to retrieve the original plain text." } }
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "URL Decoder", item: `${SITE_URL}/url-decode` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>URL Decoder</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Decode URL encoded strings back into readable text instantly. Free client-side tool for unescaping percent-encoded URLs.
        </p>
      </header>

      <EncodeToolsPanelWrapper />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About URL Decoder</h2>
        <p dangerouslySetInnerHTML={{ __html: `When copying links from the browser address bar, they often come packed with ugly percent-encoded strings (like %20 or %26). Our <strong>URL Decoder</strong> instantly translates those strings back into natural language. This is especially useful for inspecting web tracking parameters and query strings.` }} />

        <h2 id="what-is">What is URL Decoding?</h2>
        <p dangerouslySetInnerHTML={{ __html: `<strong>URL Decoding</strong> is the inverse of URL encoding. It scans a string for percent-encoded hex sequences (e.g. %20) and translates them back into their original Unicode or ASCII character representation.` }} />

        {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>What does %20 mean?</h3>
          <p>The sequence %20 represents a single space character in a URL encoded string.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Is my data secure?</h3>
          <p>Yes, the decoding process happens exclusively on your local computer via Javascript.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>What if the URL is double encoded?</h3>
          <p>If a URL has been encoded twice, you will need to run the decoder twice to retrieve the original plain text.</p>
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

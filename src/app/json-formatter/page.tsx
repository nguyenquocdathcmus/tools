import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import JsonToolsPanelWrapper from "@/components/JsonToolsPanelWrapper";
import BlogFunnelLinks from "@/components/BlogFunnelLinks";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import AdSlot from "@/components/AdSlot";
import { FORMATTERS } from "@/lib/formatters";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free JSON Formatter & Validator | Beautify JSON Online",
  description:
    "Free online JSON Formatter and Validator. Beautify, format, minify, and validate JSON data instantly with precise error line detection. Client-side, secure, and fast.",
  alternates: {
    canonical: "/json-formatter",
  },
  openGraph: {
    title: "Free JSON Formatter & Validator | Beautify JSON Online",
    description:
      "Free online JSON Formatter and Validator. Beautify, format, minify, and validate JSON data instantly with precise error line detection. Client-side, secure, and fast.",
    url: `${SITE_URL}/json-formatter`,
    images: [
      {
        url: `${SITE_URL}/og?name=JSON%20Formatter`,
        width: 1200,
        height: 630,
        alt: "JSON Formatter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JSON Formatter & Validator | Beautify JSON Online",
    description: "Format, beautify, and validate JSON data online securely.",
    images: [`${SITE_URL}/og?name=JSON%20Formatter`],
  },
};

export default function JsonFormatterPage() {
  const relatedLinks = FORMATTERS.filter((item) => item.id !== "json").slice(0, 8);

  const jsonFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a JSON Formatter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A JSON formatter is an online tool that takes unformatted, minified, or messy JSON data and formats it with proper indentation and line breaks, making it readable for humans.",
        },
      },
      {
        "@type": "Question",
        name: "Is my JSON data secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Our JSON formatter runs entirely in your local browser using client-side processing. We do not send, save, or store your JSON data on our servers.",
        },
      },
      {
        "@type": "Question",
        name: "How do I validate JSON syntax?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply paste your JSON into the input box. If there are syntax errors like missing commas or quotes, our tool will highlight the exact line and column where the error occurred.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "JSON Formatter",
        item: `${SITE_URL}/json-formatter`,
      },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>JSON Formatter & Validator</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Format, beautify, minify, and validate your JSON data instantly. 100% free and client-side secure.
        </p>
      </header>

      <JsonToolsPanelWrapper />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About JSON Formatter & Validator</h2>
        <p>
          Dealing with large, minified JSON data can be a headache for developers and analysts. Our <strong>JSON Formatter</strong>{" "}
          instantly turns raw payloads into clean, readable structures. It is ideal for API debugging, config reviews,
          and day-to-day data inspection.
        </p>

        <h2 id="what-is">What is JSON?</h2>
        <p>
          <strong>JSON</strong> (JavaScript Object Notation) is a lightweight data format for structured data exchange.
          It is easy for humans to read, easy for machines to parse, and widely used in REST APIs, web apps, and
          configuration files.
        </p>

        {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>What is a JSON Formatter?</h3>
          <p>
            A JSON formatter is an online tool that takes unformatted, minified, or messy JSON data and formats it
            with proper indentation and line breaks, making it readable for humans.
          </p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Is my JSON data secure?</h3>
          <p>
            Yes! Our JSON formatter runs entirely in your local browser using client-side processing. We do not send,
            save, or store your JSON data on our servers.
          </p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>How do I validate JSON syntax?</h3>
          <p>
            Simply paste your JSON into the input box. If there are syntax errors like missing commas or quotes, our
            tool will highlight the exact line and column where the error occurred.
          </p>
        </div>
      </section>

      <section className="supported" aria-labelledby="related-title">
        <h2 id="related-title">Related SEO Tools</h2>
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
          <li>
            <Link href="/timestamp-converter">
              <span>Timestamp Converter</span>
              <small>Open tool -&gt;</small>
            </Link>
          </li>
        </ul>
      </section>

      <BlogFunnelLinks title="JSON Learning Hub" />

      <SiteFooter />

      <Script
        id="schema-breadcrumb-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-faq-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonFaqSchema) }}
      />
    </main>
  );
}

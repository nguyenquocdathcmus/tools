import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import JsonToolsPanelWrapper from "@/components/JsonToolsPanelWrapper";
import BlogFunnelLinks from "@/components/BlogFunnelLinks";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator Online (Free, Fast, No Login)",
  description:
    "Free online JSON Formatter and Validator. Beautify, format, minify, and validate JSON data instantly with precise error line detection. Client-side, secure, and fast.",
  alternates: {
    canonical: "/json-formatter",
  },
  openGraph: {
    title: "JSON Formatter & Validator Online (Free, Fast, No Login)",
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
    title: "JSON Formatter & Validator Online (Free, Fast, No Login)",
    description: "Format, beautify, and validate JSON data online securely.",
    images: [`${SITE_URL}/og?name=JSON%20Formatter`],
  },
};

export default function JsonFormatterPage() {
  const relatedTools = [
    { href: "/json-validator", label: "JSON Validator", description: "Check syntax and surface line errors." },
    { href: "/json-minify", label: "JSON Minify", description: "Compress payloads for production and APIs." },
    { href: "/json-tools", label: "JSON Tools Hub", description: "Navigate the full JSON cluster page." },
    { href: "/blog/json-format-guide", label: "JSON Format Guide", description: "Learn the formatting workflow." },
    { href: "/blog/fix-invalid-json", label: "Fix Invalid JSON", description: "Repair broken payloads faster." },
    { href: "/blog/common-json-errors", label: "Common JSON Errors", description: "Prevent syntax mistakes before release." },
  ];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "JSON Formatter & Validator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description:
      "Format, minify, and validate JSON data instantly in the browser with line-level error feedback.",
    url: `${SITE_URL}/json-formatter`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

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
        <p className="section-kicker">JSON authority page</p>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>JSON Formatter & Validator Online (Free, Fast, No Login)</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Format, beautify, minify, and validate JSON instantly. Use this page as your primary JSON workflow hub for API payloads, config files, and developer debugging.
        </p>
      </header>

      <JsonToolsPanelWrapper />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About JSON Formatter & Validator</h2>
        <p>
          Our <strong>JSON Formatter</strong> instantly turns raw payloads into clean, readable structures. It is ideal
          for API debugging, config reviews, and day-to-day data inspection. If the input is invalid, use the linked
          validator first, then come back here to format the corrected JSON.
        </p>

        <h2 id="what-is">What is JSON?</h2>
        <p>
          <strong>JSON</strong> (JavaScript Object Notation) is a lightweight data format for structured data exchange.
          It is easy for humans to read, easy for machines to parse, and widely used in REST APIs, web apps, and
          configuration files.
        </p>

        <h2 id="how-to-use">How to use JSON Formatter</h2>
        <ol>
          <li>Paste your raw JSON into the editor.</li>
          <li>Click <strong>JSON Formatter</strong> to auto format the payload.</li>
          <li>If an error appears, jump to the error line and fix the first broken token.</li>
          <li>Use <Link href="/json-validator">JSON Validator</Link> to confirm the final payload is valid.</li>
          <li>Use <Link href="/json-minify">JSON Minify</Link> when you need a compact production version.</li>
        </ol>

        <h2 id="common-errors">Common JSON errors</h2>
        <p>
          The most common syntax problems are missing commas, trailing commas, unquoted keys, single quotes, and
          mismatched braces or brackets. These errors often appear in API payloads copied from logs, UI forms, or AI
          generated content.
        </p>
        <div className="editor-card" style={{ marginTop: "16px" }}>
          <h3 style={{ marginTop: 0 }}>Invalid JSON example</h3>
          <pre>{`{
  "name": "Daxnoria",
  "version": 2,
  "features": ["formatter", "validator",]
}`}</pre>
          <p>Problem: trailing comma after the last array item.</p>
        </div>
        <div className="editor-card" style={{ marginTop: "16px" }}>
          <h3 style={{ marginTop: 0 }}>Valid JSON example</h3>
          <pre>{`{
  "name": "Daxnoria",
  "version": 2,
  "features": ["formatter", "validator"]
}`}</pre>
          <p>Fix: remove the trailing comma and keep double quotes everywhere.</p>
        </div>

        <h2 id="best-practices">JSON Formatter best practices</h2>
        <p>
          A strong workflow uses formatting, validation, and diffing together. Format to improve readability, validate
          to catch syntax issues, and compare revisions before merging changes. This is the same workflow used in the
          related guides below.
        </p>

        <h3>Why line-level error detection matters</h3>
        <p>
          Line-level feedback is the fastest way to fix malformed JSON. Instead of scanning an entire payload for a
          missing quote or bracket, you can jump directly to the reported line and patch the exact character causing
          the parse failure.
        </p>

        <h3>When to minify JSON</h3>
        <p>
          Minify JSON when you need a smaller payload for production, network transport, or storage. Keep the pretty
          formatted version for reviews and debugging, then convert to the minified form only when you are ready to
          ship.
        </p>

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
            Paste the payload into <Link href="/json-validator">JSON Validator</Link>. If there are syntax errors like
            missing commas or quotes, the tool will highlight the exact line and column where the error occurred.
          </p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Can I use this page without logging in?</h3>
          <p>No login is required. All formatting and validation happen locally in your browser.</p>
        </div>

        {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
        <AdSlot variant="in-article" />

        <h2 id="examples">Related JSON workflows</h2>
        <p>
          After formatting, many teams move to <Link href="/json-minify">JSON Minify</Link> for production payloads,
          or use <Link href="/blog/json-format-guide">the JSON format guide</Link> and <Link href="/blog/fix-invalid-json">fix invalid JSON guide</Link>
          to standardize review and debugging steps.
        </p>

      </section>

      <section className="supported" aria-labelledby="related-title">
        <h2 id="related-title">Related tools</h2>
        <p style={{ marginTop: 0, color: "var(--color-text-subtle)" }}>
          Use these pages together to build a compact JSON content cluster.
        </p>
        <ul className="related-grid">
          {relatedTools.map((tool) => (
            <li key={tool.href}>
              <Link href={tool.href}>
                <span>{tool.label}</span>
                <small>{tool.description}</small>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <BlogFunnelLinks title="JSON Learning Hub" />

      <section className="seo-copy" aria-labelledby="json-cluster-title">
        <h2 id="json-cluster-title">JSON cluster navigation</h2>
        <p>
          This site is designed as a topical cluster around JSON formatting, validation, minification, and error
          repair. That structure helps search engines understand that the site is an authority on the topic rather than
          a single isolated tool.
        </p>
        <ul>
          <li><Link href="/json-tools">JSON Tools Hub</Link></li>
          <li><Link href="/json-validator">JSON Validator</Link></li>
          <li><Link href="/json-minify">JSON Minify</Link></li>
          <li><Link href="/blog/json-format-guide">JSON Format Guide</Link></li>
          <li><Link href="/blog/fix-invalid-json">Fix Invalid JSON</Link></li>
          <li><Link href="/blog/common-json-errors">Common JSON Errors</Link></li>
        </ul>
      </section>

      <SiteFooter />

      <Script id="schema-software-json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
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

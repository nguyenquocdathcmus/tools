import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogFunnelLinks from "@/components/BlogFunnelLinks";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "API Debugging Tools",
  description:
    "API debugging tools for payload formatting, JWT claim inspection, timestamp conversion, and diff analysis.",
  keywords: [
    "api debugging tools",
    "debug api payload",
    "jwt claim inspector",
    "json validator for api",
    "timestamp converter for logs",
  ],
  alternates: {
    canonical: "/api-debugging-tools",
  },
  openGraph: {
    title: "API Debugging Tools | Daxnoria",
    description:
      "Debug API payloads faster with JSON formatter, JWT decoder, timestamp converter, and diff checker.",
    url: `${SITE_URL}/api-debugging-tools`,
    type: "website",
    images: [{ url: `${SITE_URL}/og?name=API%20Debugging%20Tools`, width: 1200, height: 630, alt: "API Debugging Tools" }],
  },
};

export default function ApiDebuggingToolsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which tool should I use first for API payload debugging?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with JSON Formatter or JSON Validator to verify structure, then use Diff Checker to compare revisions.",
        },
      },
      {
        "@type": "Question",
        name: "How do I debug JWT expiration issues?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Decode token claims with JWT Decoder and convert exp or iat values using Timestamp Converter.",
        },
      },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <section className="seo-copy" aria-labelledby="api-tools-title">
        <p className="section-kicker">Keyword landing</p>
        <h1 id="api-tools-title">API Debugging Tools</h1>
        <p>
          This page targets practical API debugging workflows: validate malformed payloads, inspect JWT claims,
          compare version changes, and convert event timestamps.
        </p>

        <h2>Debugging checklist for API teams</h2>
        <p>
          1) Validate payload syntax with <Link href="/json-validator">JSON Validator</Link>. 2) Normalize output with{" "}
          <Link href="/json-formatter">JSON Formatter</Link>. 3) Inspect auth claims with <Link href="/jwt-decoder">JWT Decoder</Link>. 4)
          Compare revisions with <Link href="/diff-checker">Diff Checker</Link>.
        </p>

        <h2>Time and auth troubleshooting</h2>
        <p>
          Many API incidents are caused by token expiry and timezone mismatches. Use <Link href="/timestamp-converter">Timestamp Converter</Link>{" "}
          together with JWT decoding for faster root-cause analysis.
        </p>
      </section>

      <section className="supported" aria-labelledby="api-related-title">
        <h2 id="api-related-title">Core API Tools</h2>
        <ul className="related-grid">
          <li>
            <Link href="/json-validator">
              <span>JSON Validator</span>
              <small>Open tool -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/json-formatter">
              <span>JSON Formatter</span>
              <small>Open tool -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/jwt-decoder">
              <span>JWT Decoder</span>
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

      <BlogFunnelLinks title="Deep-Dive Guides" />

      <SiteFooter />

      <Script
        id="schema-api-debug-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}

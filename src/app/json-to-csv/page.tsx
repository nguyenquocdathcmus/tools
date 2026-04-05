import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogFunnelLinks from "@/components/BlogFunnelLinks";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "JSON to CSV Guide | Convert API Data Into Tables",
  description:
    "Learn how to convert JSON to CSV safely for reporting, spreadsheets, and ETL workflows. Includes validation, examples, and debugging tips.",
  alternates: {
    canonical: "/json-to-csv",
  },
  openGraph: {
    title: "JSON to CSV Guide | Convert API Data Into Tables",
    description:
      "Learn how to convert JSON to CSV safely for reporting, spreadsheets, and ETL workflows. Includes validation, examples, and debugging tips.",
    url: `${SITE_URL}/json-to-csv`,
    type: "website",
    images: [{ url: `${SITE_URL}/og?name=JSON%20to%20CSV`, width: 1200, height: 630, alt: "JSON to CSV Guide" }],
  },
};

export default function JsonToCsvPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "JSON to CSV", item: `${SITE_URL}/json-to-csv` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do I need valid JSON before converting to CSV?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Validate and format the JSON first so each object has consistent keys and predictable structure before export.",
        },
      },
      {
        "@type": "Question",
        name: "What JSON structure converts best to CSV?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Arrays of objects with shared keys convert most cleanly. Nested arrays or inconsistent keys usually require preprocessing.",
        },
      },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <section className="seo-copy" aria-labelledby="json-to-csv-title">
        <p className="section-kicker">Long-tail guide</p>
        <h1 id="json-to-csv-title">JSON to CSV Guide</h1>
        <p>
          This guide explains how to convert JSON to CSV safely for reporting, spreadsheets, ETL jobs, and analytics
          pipelines. It is designed for developers who need a structured workflow before exporting tabular data.
        </p>
      </section>

      <section className="seo-copy" aria-labelledby="workflow-title">
        <h2 id="workflow-title">Recommended workflow</h2>
        <ol>
          <li>Validate the JSON with <Link href="/json-validator">JSON Validator</Link>.</li>
          <li>Format the payload with <Link href="/json-formatter">JSON Formatter</Link> so nested data is easy to inspect.</li>
          <li>Flatten or normalize the structure if keys are inconsistent.</li>
          <li>Export the final rows to CSV for spreadsheets or downstream analysis.</li>
        </ol>

        <h2 id="when-to-use">When JSON to CSV is the right choice</h2>
        <p>
          JSON is excellent for APIs, but CSV is often better for reporting, spreadsheets, and quick analysis. The key
          is to convert only after the JSON has been validated and normalized.
        </p>

        <h3>Common conversion pitfalls</h3>
        <p>
          Nested arrays, optional fields, and inconsistent object keys can create messy CSV output. Teams should define
          a canonical schema before conversion so each row maps cleanly to columns.
        </p>
      </section>

      <section className="supported" aria-labelledby="related-json-title">
        <h2 id="related-json-title">Related JSON tools</h2>
        <ul className="related-grid">
          <li>
            <Link href="/json-formatter">
              <span>JSON Formatter</span>
              <small>Format before export -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/json-validator">
              <span>JSON Validator</span>
              <small>Check structure first -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/json-minify">
              <span>JSON Minify</span>
              <small>Compact data when needed -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/json-tools">
              <span>JSON Tools Hub</span>
              <small>Open cluster page -&gt;</small>
            </Link>
          </li>
        </ul>
      </section>

      <BlogFunnelLinks title="JSON Learning Hub" />

      <SiteFooter />

      <Script id="schema-json-to-csv-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="schema-json-to-csv-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}

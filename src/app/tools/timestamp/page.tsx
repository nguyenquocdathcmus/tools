import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TimestampToolsPanel from "@/components/TimestampToolsPanel";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Timestamp Converter Tools",
  description: "Unix to Date, Date to Unix, and Timezone Convert online tools.",
  alternates: {
    canonical: "/timestamp",
  },
  openGraph: {
    title: "Timestamp Converter Tools",
    description: "Unix to Date, Date to Unix, and Timezone Convert online tools.",
    url: `${SITE_URL}/timestamp`,
    images: [{ url: `${SITE_URL}/og?name=Timestamp%20Converter`, width: 1200, height: 630, alt: "Timestamp Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Timestamp Converter Tools",
    description: "Convert Unix timestamps and timezone values online.",
    images: [`${SITE_URL}/og?name=Timestamp%20Converter`],
  },
};

export default function TimestampToolsPage() {
  const relatedTools = [
    { href: "/encode", name: "Encode Tools" },
    { href: "/jwt-decoder", name: "JWT Decoder" },
    { href: "/text-count", name: "Text Counter" },
    { href: "/diff-checker", name: "Diff Checker" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What timestamp formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can convert Unix seconds, Unix milliseconds, and readable date formats in both directions.",
        },
      },
      {
        "@type": "Question",
        name: "Does this tool support timezones?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can compare UTC and local outputs to validate timezone-sensitive values.",
        },
      },
      {
        "@type": "Question",
        name: "Who uses timestamp conversion most?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Developers, analysts, and DevOps teams commonly use it to inspect logs, events, and API responses.",
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
      { "@type": "ListItem", position: 3, name: "Timestamp Tools", item: `${SITE_URL}/timestamp` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>Unix and Timezone Converter</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Convert timestamps and timezone values quickly for APIs, logs, and data pipelines.
        </p>
      </header>

      <TimestampToolsPanel />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About Timestamp Tools</h2>
        <p>
          Timestamp conversion is a daily task in backend debugging and observability workflows. This page helps you
          map Unix values to human-readable dates and verify timezone behavior quickly.
        </p>

        <h2 id="what-is">What is Unix Time?</h2>
        <p>
          Unix time represents the number of seconds (or milliseconds) elapsed since 00:00:00 UTC on January 1, 1970,
          and is commonly used for machine-friendly event timestamps.
        </p>

        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>What timestamp formats are supported?</h3>
          <p>You can convert Unix seconds, Unix milliseconds, and readable date formats in both directions.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Does this tool support timezones?</h3>
          <p>Yes. You can compare UTC and local outputs to validate timezone-sensitive values.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Who uses timestamp conversion most?</h3>
          <p>Developers, analysts, and DevOps teams commonly use it to inspect logs, events, and API responses.</p>
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
        id="schema-breadcrumb-timestamp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-faq-timestamp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}

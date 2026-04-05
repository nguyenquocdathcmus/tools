import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import BlogFunnelLinks from "@/components/BlogFunnelLinks";
import AdSlot from "@/components/AdSlot";
import { FORMATTERS } from "@/lib/formatters";
import { SITE_URL } from "@/lib/site";
import TimestampToolsPanelWrapper from "@/components/TimestampToolsPanelWrapper";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter Online | Convert Epoch to Date",
  description:
    "Convert Unix timestamp to date and date to epoch instantly. Free online timestamp converter with UTC and timezone-aware debugging support.",
  alternates: {
    canonical: "/timestamp-converter",
  },
  openGraph: {
    title: "Unix Timestamp Converter Online | Convert Epoch to Date",
    description:
      "Convert Unix timestamp to date and date to epoch instantly. Free online timestamp converter with UTC and timezone-aware debugging support.",
    url: `${SITE_URL}/timestamp-converter`,
    images: [{ url: `${SITE_URL}/og?name=Unix%20Timestamp%20Converter`, width: 1200, height: 630, alt: "Unix Timestamp Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unix Timestamp Converter Online | Convert Epoch to Date",
    description:
      "Convert Unix timestamp to date and date to epoch instantly with UTC and timezone-aware outputs.",
    images: [`${SITE_URL}/og?name=Unix%20Timestamp%20Converter`],
  },
};

export default function Page() {
  const relatedLinks = FORMATTERS.filter((item) => item.id !== "json").slice(0, 8);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What happens in 2038?", acceptedAnswer: { "@type": "Answer", text: "The Year 2038 problem occurs because 32-bit systems will roll over their maximum integer limit for Unix time. Modern 64-bit systems are unaffected." } },
      { "@type": "Question", name: "Does this tool support timezone conversion?", acceptedAnswer: { "@type": "Answer", text: "Yes, our timestamp converter lets you preview standard date outputs mapped across local and international timezones." } },
      { "@type": "Question", name: "Are timestamps in UTC?", acceptedAnswer: { "@type": "Answer", text: "Yes, by definition, a standard Unix Timestamp is globally identical and anchored to UTC time." } }
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Unix Timestamp Converter", item: `${SITE_URL}/timestamp-converter` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>Unix Timestamp Converter Online</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Convert epoch to date and date to epoch instantly. Built for log analysis, JWT claim checks, and
          timezone-aware incident debugging.
        </p>
      </header>

      <TimestampToolsPanelWrapper />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About Unix Timestamp Converter</h2>
        <p dangerouslySetInnerHTML={{ __html: `Working with databases or APIs that natively store dates as big integers? Our <strong>Unix Timestamp Converter</strong> instantly translates Epoch seconds (or milliseconds) into human-readable ISO dates. You can also easily convert standard datetimes back into Unix format.` }} />

        <h2 id="what-is">What is Unix Timestamp?</h2>
        <p dangerouslySetInnerHTML={{ __html: `A <strong>Unix Timestamp (or Epoch Time)</strong> is a system for describing a point in time. It is the number of seconds that have elapsed since the Unix epoch, minus leap seconds; the Unix epoch is 00:00:00 UTC on 1 January 1970.` }} />

        <h2 id="real-use-cases">Real use cases in production systems</h2>
        <p>
          Dev teams rely on timestamp conversion when mapping alerts to deployment windows, correlating API logs,
          validating analytics event order, and checking whether authentication sessions expired too early.
        </p>

        <h2 id="jwt-workflow">JWT expiration debugging workflow</h2>
        <p>
          Decode claims in <Link href="/jwt-decoder">JWT Decoder</Link>, then convert exp, iat, and nbf values on this
          page to confirm validity windows. This is one of the fastest ways to diagnose token-related login failures.
        </p>

        <h2 id="timezone-workflow">Timezone and UTC consistency checks</h2>
        <p>
          In distributed systems, one service may log UTC while clients show local time. Converting both views side by
          side helps identify clock drift and ordering mistakes that can trigger false alerts or broken reports.
        </p>

        {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>What happens in 2038?</h3>
          <p>The Year 2038 problem occurs because 32-bit systems will roll over their maximum integer limit for Unix time. Modern 64-bit systems are unaffected.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Does this tool support timezone conversion?</h3>
          <p>Yes, our timestamp converter lets you preview standard date outputs mapped across local and international timezones.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Are timestamps in UTC?</h3>
          <p>Yes, by definition, a standard Unix Timestamp is globally identical and anchored to UTC time.</p>
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
            <Link href="/timestamp">
              <span>Unix Timestamp Now</span>
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
            <Link href="/blog/unix-timestamp-converter-use-cases">
              <span>Unix Timestamp Converter Use Cases</span>
              <small>Read guide -&gt;</small>
            </Link>
          </li>
        </ul>
      </section>

      <BlogFunnelLinks title="Timestamp Learning Hub" />

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

import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import AdSlot from "@/components/AdSlot";
import { FORMATTERS } from "@/lib/formatters";
import { SITE_URL } from "@/lib/site";
import TimestampToolsPanelWrapper from "@/components/TimestampToolsPanelWrapper";

export const metadata: Metadata = {
  title: "Unix Time to Date Converter Online | Daxnoria",
  description: "Easily convert epoch Unix seconds into human-readable Date outputs in UTC and local timezones.",
  alternates: {
    canonical: "/unix-time-to-date",
  },
  openGraph: {
    title: "Unix Time to Date Converter Online | Daxnoria",
    description: "Easily convert epoch Unix seconds into human-readable Date outputs in UTC and local timezones.",
    url: `${SITE_URL}/unix-time-to-date`,
    images: [{ url: `${SITE_URL}/og?name=Unix%20Time%20to%20Date%20Converter`, width: 1200, height: 630, alt: "Unix Time to Date Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unix Time to Date Converter Online | Daxnoria",
    description: "Easily convert epoch Unix seconds into human-readable Date outputs in UTC and local timezones.",
    images: [`${SITE_URL}/og?name=Unix%20Time%20to%20Date%20Converter`],
  },
};

export default function Page() {
  const relatedLinks = FORMATTERS.filter((item) => item.id !== "json").slice(0, 8);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How do I know if it is seconds or milliseconds?", acceptedAnswer: { "@type": "Answer", text: "A standard Unix timestamp in seconds is usually 10 digits long (e.g. 1711550000). If it is 13 digits long, it is in milliseconds and must be divided by 1000 first." } },
      { "@type": "Question", name: "Is it completely free?", acceptedAnswer: { "@type": "Answer", text: "Yes, this converter is completely free and works instantly within your browser environment." } },
      { "@type": "Question", name: "Does it consider my local timezone?", acceptedAnswer: { "@type": "Answer", text: "Yes, the tool will automatically output both the absolute UTC time and your localized equivalent." } }
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Unix Time to Date Converter", item: `${SITE_URL}/unix-time-to-date` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>Unix Time to Date Converter</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Easily convert epoch Unix seconds into human-readable Date outputs in UTC and local timezones.
        </p>
      </header>

      <TimestampToolsPanelWrapper />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About Unix Time to Date Converter</h2>
        <p dangerouslySetInnerHTML={{ __html: `If you are staring at a random 10-digit number like 1711550000 retrieved from an API payload, it is almost certainly a Unix timestamp. Use our <strong>Unix Time to Date Converter</strong> to transform that raw integer into an exact human-readable date format.` }} />

        <h2 id="what-is">What is Unix Time to Date Conversion?</h2>
        <p dangerouslySetInnerHTML={{ __html: `The <strong>Unix Time to Date</strong> process takes the total number of seconds since January 1, 1970 (UTC) and maps it against calendar rules to output the exact Year, Month, Day, and Time. It is the core mechanism allowing computers to process time agnostically.` }} />

        {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>How do I know if it is seconds or milliseconds?</h3>
          <p>A standard Unix timestamp in seconds is usually 10 digits long (e.g. 1711550000). If it is 13 digits long, it is in milliseconds and must be divided by 1000 first.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Is it completely free?</h3>
          <p>Yes, this converter is completely free and works instantly within your browser environment.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Does it consider my local timezone?</h3>
          <p>Yes, the tool will automatically output both the absolute UTC time and your localized equivalent.</p>
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

import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogFunnelLinks from "@/components/BlogFunnelLinks";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Developer Tools Online",
  description:
    "Developer tools online for JSON formatting, timestamp conversion, JWT decoding, and payload debugging workflows.",
  keywords: [
    "developer tools online",
    "online developer utilities",
    "json formatter online",
    "jwt decoder online",
    "timestamp converter online",
  ],
  alternates: {
    canonical: "/developer-tools-online",
  },
  openGraph: {
    title: "Developer Tools Online | Daxnoria",
    description:
      "Use online developer utilities for API payload formatting, token decoding, and debugging workflows.",
    url: `${SITE_URL}/developer-tools-online`,
    type: "website",
    images: [{ url: `${SITE_URL}/og?name=Developer%20Tools%20Online`, width: 1200, height: 630, alt: "Developer Tools Online" }],
  },
};

export default function DeveloperToolsOnlinePage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, item: { "@type": "SoftwareApplication", name: "JSON Formatter", url: `${SITE_URL}/json-formatter` } },
      { "@type": "ListItem", position: 2, item: { "@type": "SoftwareApplication", name: "Timestamp Converter", url: `${SITE_URL}/timestamp-converter` } },
      { "@type": "ListItem", position: 3, item: { "@type": "SoftwareApplication", name: "JWT Decoder", url: `${SITE_URL}/jwt-decoder` } },
      { "@type": "ListItem", position: 4, item: { "@type": "SoftwareApplication", name: "Diff Checker", url: `${SITE_URL}/diff-checker` } },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Developer Tools Online", item: `${SITE_URL}/developer-tools-online` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which online developer tools should I use first?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A practical starter stack is JSON Formatter, JWT Decoder, Timestamp Converter, and Diff Checker for daily API and backend troubleshooting.",
        },
      },
      {
        "@type": "Question",
        name: "Are these tools suitable for production debugging?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. They are designed for fast validation workflows such as payload normalization, claim inspection, and pre-release diff checks.",
        },
      },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <section className="seo-copy" aria-labelledby="landing-title">
        <p className="section-kicker">Keyword landing</p>
        <h1 id="landing-title">Developer Tools Online</h1>
        <p>
          This landing page targets developers who need fast online utilities for formatting data, decoding auth
          payloads, and debugging API responses in browser-first workflows.
        </p>

        <h2>Top online tools for daily engineering tasks</h2>
        <p>
          The most practical stack includes <Link href="/json-formatter">JSON Formatter</Link>,{" "}
          <Link href="/timestamp-converter">Timestamp Converter</Link>, <Link href="/jwt-decoder">JWT Decoder</Link>, and{" "}
          <Link href="/diff-checker">Diff Checker</Link>. Together they cover payload inspection, auth debugging, and
          release validation.
        </p>

        <h2>Why browser-based developer tools matter</h2>
        <p>
          Browser-based utilities remove installation friction, speed up debugging, and help teams standardize quick
          validation steps across environments.
        </p>
      </section>

      <section className="supported" aria-labelledby="tool-list-title">
        <h2 id="tool-list-title">Recommended Tools</h2>
        <ul className="related-grid">
          <li>
            <Link href="/json-formatter">
              <span>JSON Formatter</span>
              <small>Open tool -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/timestamp-converter">
              <span>Timestamp Converter</span>
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
            <Link href="/diff-checker">
              <span>Diff Checker</span>
              <small>Open tool -&gt;</small>
            </Link>
          </li>
        </ul>
      </section>

      <BlogFunnelLinks title="Related Guides" />

      <SiteFooter />

      <Script
        id="schema-dev-tools-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Script
        id="schema-dev-tools-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-dev-tools-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}

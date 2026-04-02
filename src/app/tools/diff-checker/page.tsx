import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import DiffCheckerPanel from "@/components/DiffCheckerPanel";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Diff Checker",
  description: "Compare two text blocks line by line with a fast diff checker.",
  alternates: {
    canonical: "/diff-checker",
  },
  openGraph: {
    title: "Diff Checker",
    description: "Compare two text blocks line by line with a fast diff checker.",
    url: `${SITE_URL}/diff-checker`,
    images: [{ url: `${SITE_URL}/og?name=Diff%20Checker`, width: 1200, height: 630, alt: "Diff Checker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diff Checker",
    description: "Compare text, config, or code versions side-by-side.",
    images: [`${SITE_URL}/og?name=Diff%20Checker`],
  },
};

export default function DiffCheckerPage() {
  const relatedTools = [
    { href: "/text-count", name: "Text Counter" },
    { href: "/jwt-decoder", name: "JWT Decoder" },
    { href: "/encode", name: "Encode Tools" },
    { href: "/timestamp", name: "Timestamp Converter" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What can I compare with this diff checker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can compare text, code snippets, configuration files, and document revisions line by line.",
        },
      },
      {
        "@type": "Question",
        name: "Does it highlight changes clearly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Added, removed, and modified lines are shown in a clear visual comparison layout.",
        },
      },
      {
        "@type": "Question",
        name: "Is this useful for code review prep?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. It helps validate patch content, config changes, and refactors before sharing.",
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
      { "@type": "ListItem", position: 3, name: "Diff Checker", item: `${SITE_URL}/diff-checker` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>Diff Checker</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Compare two versions of text, config, or code with a clean line-by-line view.
        </p>
      </header>

      <DiffCheckerPanel />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About Diff Checker</h2>
        <p>
          Comparing revisions manually is error-prone. Diff tools help you focus on actual changes and quickly spot
          regressions, missing lines, and formatting drift.
        </p>

        <h2 id="what-is">What is a Text Diff?</h2>
        <p>
          A text diff is a structured comparison between two versions of content that shows insertions, deletions, and
          modifications, often line by line.
        </p>

        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>What can I compare with this diff checker?</h3>
          <p>You can compare text, code snippets, configuration files, and document revisions line by line.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Does it highlight changes clearly?</h3>
          <p>Yes. Added, removed, and modified lines are shown in a clear visual comparison layout.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Is this useful for code review prep?</h3>
          <p>Absolutely. It helps validate patch content, config changes, and refactors before sharing.</p>
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
        id="schema-breadcrumb-diff"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-faq-diff"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
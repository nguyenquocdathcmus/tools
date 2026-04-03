import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogFunnelLinks from "@/components/BlogFunnelLinks";
import TextCountPanel from "@/components/TextCountPanel";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Text & Word Counter Tool",
  description: "Count words, characters, lines, and paragraphs instantly in your browser.",
  alternates: {
    canonical: "/text-count",
  },
  openGraph: {
    title: "Text & Word Counter Tool",
    description: "Count words, characters, lines, and paragraphs instantly in your browser.",
    url: `${SITE_URL}/text-count`,
    images: [{ url: `${SITE_URL}/og?name=Text%20Counter`, width: 1200, height: 630, alt: "Text Counter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Text & Word Counter Tool",
    description: "Count words, characters, lines, and paragraphs instantly.",
    images: [`${SITE_URL}/og?name=Text%20Counter`],
  },
};

export default function TextCountPage() {
  const relatedTools = [
    { href: "/encode", name: "Encode Tools" },
    { href: "/diff-checker", name: "Diff Checker" },
    { href: "/jwt-decoder", name: "JWT Decoder" },
    { href: "/timestamp", name: "Timestamp Converter" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does this text counter measure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It measures words, characters, lines, and paragraphs from your input text in real time.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use it for SEO content checks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. It is useful for checking article length, meta copy limits, and readability planning.",
        },
      },
      {
        "@type": "Question",
        name: "Is text sent to any backend?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Counting is performed entirely in the browser, so your content stays private.",
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
      { "@type": "ListItem", position: 3, name: "Text Counter", item: `${SITE_URL}/text-count` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>Word & Character Counter</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Count words, characters, lines, and paragraphs instantly while you write.
        </p>
      </header>

      <TextCountPanel />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About Text Counter</h2>
        <p>
          Text counting helps writers, marketers, and developers quickly validate content length. Whether you are
          drafting an article, preparing social copy, or checking UI microcopy, this tool gives instant metrics.
        </p>

        <h2 id="what-is">What is Word Count Analysis?</h2>
        <p>
          Word count analysis is the process of measuring textual structure such as word volume, character usage, and
          paragraph balance to improve quality and fit platform limits.
        </p>

        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>What does this text counter measure?</h3>
          <p>It measures words, characters, lines, and paragraphs from your input text in real time.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Can I use it for SEO content checks?</h3>
          <p>Yes. It is useful for checking article length, meta copy limits, and readability planning.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Is text sent to any backend?</h3>
          <p>No. Counting is performed entirely in the browser, so your content stays private.</p>
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

      <BlogFunnelLinks />

      <SiteFooter />

      <Script
        id="schema-breadcrumb-text-count"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-faq-text-count"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogFunnelLinks from "@/components/BlogFunnelLinks";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "JSON Tools Hub | Formatter, Validator, Minify, Guides",
  description:
    "Browse the JSON tools hub for formatting, validation, minification, debugging guides, and workflow content built for developers.",
  alternates: {
    canonical: "/json-tools",
  },
  openGraph: {
    title: "JSON Tools Hub | Formatter, Validator, Minify, Guides",
    description:
      "Browse the JSON tools hub for formatting, validation, minification, debugging guides, and workflow content built for developers.",
    url: `${SITE_URL}/json-tools`,
    type: "website",
    images: [{ url: `${SITE_URL}/og?name=JSON%20Tools%20Hub`, width: 1200, height: 630, alt: "JSON Tools Hub" }],
  },
};

export default function JsonToolsPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, item: { "@type": "WebPage", name: "JSON Formatter", url: `${SITE_URL}/json-formatter` } },
      { "@type": "ListItem", position: 2, item: { "@type": "WebPage", name: "JSON Validator", url: `${SITE_URL}/json-validator` } },
      { "@type": "ListItem", position: 3, item: { "@type": "WebPage", name: "JSON Minify", url: `${SITE_URL}/json-minify` } },
      { "@type": "ListItem", position: 4, item: { "@type": "WebPage", name: "JSON Format Guide", url: `${SITE_URL}/blog/json-format-guide` } },
      { "@type": "ListItem", position: 5, item: { "@type": "WebPage", name: "Fix Invalid JSON", url: `${SITE_URL}/blog/fix-invalid-json` } },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "JSON Tools", item: `${SITE_URL}/json-tools` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the JSON Tools Hub?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It is the central navigation page for JSON formatting, validation, minification, and long-form JSON workflow guides.",
        },
      },
      {
        "@type": "Question",
        name: "Why do JSON tools need a hub page?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A hub page clusters related pages, improves internal linking, and helps search engines understand topical authority around JSON workflows.",
        },
      },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <section className="seo-copy" aria-labelledby="json-tools-title">
        <p className="section-kicker">Topic cluster</p>
        <h1 id="json-tools-title">JSON Tools Hub</h1>
        <p>
          This page is the central entry point for JSON-formatting workflows. Use it to jump into the formatter,
          validator, minifier, and the blog guides that explain how to use them together.
        </p>
      </section>

      <section className="supported" aria-labelledby="core-json-title">
        <h2 id="core-json-title">Core JSON tools</h2>
        <ul className="related-grid">
          <li>
            <Link href="/json-formatter">
              <span>JSON Formatter</span>
              <small>Format and validate payloads -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/json-validator">
              <span>JSON Validator</span>
              <small>Find syntax errors -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/json-minify">
              <span>JSON Minify</span>
              <small>Compress production JSON -&gt;</small>
            </Link>
          </li>
        </ul>
      </section>

      <section className="seo-copy" aria-labelledby="cluster-title">
        <h2 id="cluster-title">Why this structure improves SEO</h2>
        <p>
          Search engines reward clear topical structure. A single hub page linking to formatter, validator, minifier,
          and guide pages helps Google understand that the site is an authority on JSON workflows rather than a loose
          collection of unrelated utilities.
        </p>
        <p>
          The hub also concentrates internal link equity. The most important pages receive repeated contextual links from
          the homepage, the hub, the blog index, and the individual tool pages, which improves discoverability and crawl
          priority.
        </p>
        <h3>Internal linking logic</h3>
        <ul>
          <li>Hub page links to the core tools and guides.</li>
          <li>Tool pages link back to the hub and to sibling tools.</li>
          <li>Blog posts link down to the tools they explain.</li>
          <li>Every article should point to at least one action page and one related guide.</li>
        </ul>
      </section>

      <section className="supported" aria-labelledby="guide-title">
        <h2 id="guide-title">Guides and workflow content</h2>
        <ul className="related-grid">
          <li>
            <Link href="/blog/json-format-guide">
              <span>JSON Format Guide</span>
              <small>Formatting workflow -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/blog/fix-invalid-json">
              <span>Fix Invalid JSON</span>
              <small>Repair workflow -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/blog/common-json-errors">
              <span>Common JSON Errors</span>
              <small>Error checklist -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/blog/json-formatter-best-practices">
              <span>JSON Formatter Best Practices</span>
              <small>Validation strategy -&gt;</small>
            </Link>
          </li>
        </ul>
      </section>

      <BlogFunnelLinks title="JSON Content Hub" />

      <SiteFooter />

      <Script id="schema-json-tools-itemlist" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Script id="schema-json-tools-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="schema-json-tools-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RequestFeaturePanel from "@/components/RequestFeaturePanel";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Feature | Suggest New Developer Tools",
  description: "Suggest new developer tools, formatter features, or workflow improvements for Daxnoria.",
  alternates: {
    canonical: "/request-feature",
  },
};

export default function RequestFeaturePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Request Feature", item: `${SITE_URL}/request-feature` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />
      <section className="hero">
        <p className="badge">Contact</p>
        <h1>Request a Feature</h1>
        <p className="lead">Let us know what kind of tools you need. We are always looking to improve Daxnoria.</p>
      </section>

      <section className="seo-copy" aria-labelledby="request-guide-title">
        <h2 id="request-guide-title">What to include in a high-quality feature request</h2>
        <p>
          Share the exact workflow, input examples, and expected output format. Clear requests help us prioritize
          tools that solve real production problems for developers.
        </p>
        <p>
          You can also reference existing pages such as <Link href="/json-formatter">JSON Formatter</Link>,{" "}
          <Link href="/timestamp-converter">Timestamp Converter</Link>, or <Link href="/tools">Tools Directory</Link>
          so we can design consistent UX patterns.
        </p>
      </section>

      <RequestFeaturePanel />
      <SiteFooter />

      <Script
        id="schema-request-feature-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </main>
  );
}
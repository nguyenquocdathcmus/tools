import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tools Directory",
  description: "Central directory for formatting, encoding, timestamp, image, PDF, and developer utility tools.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsDirectoryPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <section className="seo-copy" aria-labelledby="tools-title">
        <p className="section-kicker">Navigation hub</p>
        <h1 id="tools-title">Tools Directory</h1>
        <p>Browse all major tool groups and jump straight into the workflow you need.</p>
      </section>

      <section className="supported" aria-labelledby="group-title">
        <h2 id="group-title">Tool groups</h2>
        <ul className="related-grid">
          <li>
            <Link href="/tools/all">
              <span>All tools</span>
              <small>Open group -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/tools/format">
              <span>Format tools</span>
              <small>Open group -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/tools/web">
              <span>Web tools</span>
              <small>Open group -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/tools/code">
              <span>Code tools</span>
              <small>Open group -&gt;</small>
            </Link>
          </li>
        </ul>
      </section>

      <SiteFooter />

      <Script
        id="schema-breadcrumb-tools"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </main>
  );
}

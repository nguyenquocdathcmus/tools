import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import AdSlot from "@/components/AdSlot";
import { FORMATTERS } from "@/lib/formatters";
import { SITE_URL } from "@/lib/site";
import JsonToolsPanelWrapper from "@/components/JsonToolsPanelWrapper";

export const metadata: Metadata = {
  title: "Free JSON Minify & Compressor Online | Daxnoria",
  description: "Minify and compress JSON online. Remove whitespace, comments, and empty lines from JSON to reduce payload size and speed up API responses.",
  alternates: {
    canonical: "/json-minify",
  },
  openGraph: {
    title: "Free JSON Minify & Compressor Online | Daxnoria",
    description: "Minify and compress JSON online. Remove whitespace, comments, and empty lines from JSON to reduce payload size and speed up API responses.",
    url: `${SITE_URL}/json-minify`,
    images: [{ url: `${SITE_URL}/og?name=JSON%20Minifier%20%26%20Compressor`, width: 1200, height: 630, alt: "JSON Minifier & Compressor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JSON Minify & Compressor Online | Daxnoria",
    description: "Minify and compress JSON online. Remove whitespace, comments, and empty lines from JSON to reduce payload size and speed up API responses.",
    images: [`${SITE_URL}/og?name=JSON%20Minifier%20%26%20Compressor`],
  },
};

export default function Page() {
  const relatedLinks = FORMATTERS.filter((item) => item.id !== "json").slice(0, 8);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Does minifying JSON change the data?", acceptedAnswer: { "@type": "Answer", text: "No, minifying only removes visual whitespace. The actual keys, values, arrays, and structure remain completely identical." } },
      { "@type": "Question", name: "How much space can I save?", acceptedAnswer: { "@type": "Answer", text: "Standard pretty-printed JSON contains roughly 10-20% whitespace. Minifying typically reduces the payload size by that margin, leading to faster web performance." } },
      { "@type": "Question", name: "Is it completely free?", acceptedAnswer: { "@type": "Answer", text: "Yes, this tool is 100% free and runs locally in your browser for maximum privacy and speed." } }
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "JSON Minifier & Compressor", item: `${SITE_URL}/json-minify` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>JSON Minifier & Compressor</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Minify and compress JSON online. Remove whitespace, comments, and empty lines from JSON to reduce payload size and speed up API responses.
        </p>
      </header>

      <JsonToolsPanelWrapper />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About JSON Minifier & Compressor</h2>
        <p dangerouslySetInnerHTML={{ __html: `Large JSON files can drastically slow down API response times and increase bandwidth costs. Our <strong>JSON Minify</strong> tool instantly compresses your JSON payload by safely removing all unnecessary whitespace, newline characters, and indentation, giving you the smallest possible file for production use.` }} />

        <h2 id="what-is">What is JSON Minification?</h2>
        <p dangerouslySetInnerHTML={{ __html: `<strong>JSON Minification</strong> is the process of removing whitespace characters (spaces, tabs, newlines) from a JSON object without altering its logical structure. This reduces the file size, allowing applications to transmit data faster over networks.` }} />

        {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>Does minifying JSON change the data?</h3>
          <p>No, minifying only removes visual whitespace. The actual keys, values, arrays, and structure remain completely identical.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>How much space can I save?</h3>
          <p>Standard pretty-printed JSON contains roughly 10-20% whitespace. Minifying typically reduces the payload size by that margin, leading to faster web performance.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Is it completely free?</h3>
          <p>Yes, this tool is 100% free and runs locally in your browser for maximum privacy and speed.</p>
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

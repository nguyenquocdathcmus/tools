import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import AdSlot from "@/components/AdSlot";
import BlogFunnelLinks from "@/components/BlogFunnelLinks";
import { FORMATTERS } from "@/lib/formatters";
import { SITE_URL } from "@/lib/site";
import FormatterClientWrapper from "@/components/FormatterClientWrapper";

export const metadata: Metadata = {
  title: "Free XML Formatter & Beautifier Online | Daxnoria",
  description: "Free online XML Formatter. Beautify, format, and validate XML data instantly. Client-side, secure, and fast.",
  alternates: {
    canonical: "/xml-formatter",
  },
  openGraph: {
    title: "Free XML Formatter & Beautifier Online | Daxnoria",
    description: "Free online XML Formatter. Beautify, format, and validate XML data instantly. Client-side, secure, and fast.",
    url: `${SITE_URL}/xml-formatter`,
    images: [{ url: `${SITE_URL}/og?name=XML%20Formatter%20%26%20Beautifier`, width: 1200, height: 630, alt: "XML Formatter & Beautifier" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free XML Formatter & Beautifier Online | Daxnoria",
    description: "Free online XML Formatter. Beautify, format, and validate XML data instantly. Client-side, secure, and fast.",
    images: [`${SITE_URL}/og?name=XML%20Formatter%20%26%20Beautifier`],
  },
};

export default function Page() {
  const relatedLinks = FORMATTERS.filter((item) => item.id !== "json").slice(0, 8);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is an XML Formatter?", acceptedAnswer: { "@type": "Answer", text: "An XML formatter takes compressed or unformatted XML and applies proper line breaks and indentation (usually 2 or 4 spaces) based on the nested tag hierarchy." } },
      { "@type": "Question", name: "Does this tool validate XML?", acceptedAnswer: { "@type": "Answer", text: "Yes, if your XML lacks closing tags or has invalid syntax, the tool will notify you of the parsing error." } },
      { "@type": "Question", name: "Is this tool secure for confidential XML?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. The formatting is executed directly in your browser. We never upload your data to our servers." } }
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "XML Formatter & Beautifier", item: `${SITE_URL}/xml-formatter` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>XML Formatter & Beautifier</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Free online XML Formatter. Beautify, format, and validate XML data instantly. Client-side, secure, and fast.
        </p>
      </header>

      <FormatterClientWrapper formatter="xml" formatterLabel="XML" sampleInput={"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<note>\n<to>User</to>\n<from>Admin</from>\n<heading>Reminder</heading>\n<body>Format this!</body>\n</note>"} />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About XML Formatter & Beautifier</h2>
        <p dangerouslySetInnerHTML={{ __html: `Working with raw, unformatted XML from SOAP APIs or legacy enterprise systems is difficult. Our <strong>XML Formatter</strong> helps you instantly parse and beautify messy XML strings into readable, well-structured trees. It automatically handles indentation and highlights syntax.` }} />

        <h2 id="what-is">What is XML Formatting?</h2>
        <p dangerouslySetInnerHTML={{ __html: `<strong>XML (eXtensible Markup Language)</strong> is a markup language much like HTML, but designed to store and transport data. It is self-descriptive and highly extensible, making it a staple in enterprise data integrations and older web services.` }} />

        {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>What is an XML Formatter?</h3>
          <p>An XML formatter takes compressed or unformatted XML and applies proper line breaks and indentation (usually 2 or 4 spaces) based on the nested tag hierarchy.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Does this tool validate XML?</h3>
          <p>Yes, if your XML lacks closing tags or has invalid syntax, the tool will notify you of the parsing error.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Is this tool secure for confidential XML?</h3>
          <p>Absolutely. The formatting is executed directly in your browser. We never upload your data to our servers.</p>
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

      <BlogFunnelLinks title="XML Learning Hub" />

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

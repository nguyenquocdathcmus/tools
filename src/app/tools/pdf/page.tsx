import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogFunnelLinks from "@/components/BlogFunnelLinks";
import PdfToolsPanel from "@/components/PdfToolsPanel";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "PDF Tools",
  description: "Merge PDF, Split PDF, and PDF to Image online tools.",
  alternates: {
    canonical: "/pdf",
  },
  openGraph: {
    title: "PDF Tools",
    description: "Merge PDF, Split PDF, and PDF to Image online tools.",
    url: `${SITE_URL}/pdf`,
    images: [{ url: `${SITE_URL}/og?name=PDF%20Tools`, width: 1200, height: 630, alt: "PDF Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Tools",
    description: "Merge, split, and convert PDFs in browser.",
    images: [`${SITE_URL}/og?name=PDF%20Tools`],
  },
};

export default function PdfToolsPage() {
  const relatedTools = [
    { href: "/image", name: "Image Tools" },
    { href: "/qrcode", name: "QR Code Generator" },
    { href: "/encode", name: "Encode Tools" },
    { href: "/diff-checker", name: "Diff Checker" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What can I do with PDF tools here?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can merge PDFs, split pages, and convert PDF content to images for easy sharing.",
        },
      },
      {
        "@type": "Question",
        name: "Are my documents private?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Processing is handled in-browser so files are not sent to external servers by default.",
        },
      },
      {
        "@type": "Question",
        name: "Who benefits from these tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Students, office teams, and developers use these tools for quick document preparation and delivery.",
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
      { "@type": "ListItem", position: 3, name: "PDF Tools", item: `${SITE_URL}/pdf` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>PDF Tools</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Merge, split, and convert PDF files with fast browser-based workflows.
        </p>
      </header>

      <PdfToolsPanel />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About PDF Tools</h2>
        <p>
          PDF operations are common across reporting, contracts, and document exchange. This page centralizes core PDF
          actions so you can process files quickly without switching between multiple apps.
        </p>

        <h2 id="what-is">What is PDF Processing?</h2>
        <p>
          PDF processing includes combining pages, splitting documents, and converting pages into shareable image
          formats while keeping document structure reliable.
        </p>

        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>What can I do with PDF tools here?</h3>
          <p>You can merge PDFs, split pages, and convert PDF content to images for easy sharing.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Are my documents private?</h3>
          <p>Yes. Processing is handled in-browser so files are not sent to external servers by default.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Who benefits from these tools?</h3>
          <p>Students, office teams, and developers use these tools for quick document preparation and delivery.</p>
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
        id="schema-breadcrumb-pdf"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-faq-pdf"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}

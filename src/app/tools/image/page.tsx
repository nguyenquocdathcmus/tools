import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogFunnelLinks from "@/components/BlogFunnelLinks";
import ImageToolsPanel from "@/components/ImageToolsPanel";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Image Tools",
  description: "Compress Image, Resize Image, and Convert PNG/JPG online.",
  alternates: {
    canonical: "/image",
  },
  openGraph: {
    title: "Image Tools",
    description: "Compress Image, Resize Image, and Convert PNG/JPG online.",
    url: `${SITE_URL}/image`,
    images: [{ url: `${SITE_URL}/og?name=Image%20Tools`, width: 1200, height: 630, alt: "Image Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Tools",
    description: "Compress, resize, and convert images online in your browser.",
    images: [`${SITE_URL}/og?name=Image%20Tools`],
  },
};

export default function ImageToolsPage() {
  const relatedTools = [
    { href: "/pdf", name: "PDF Tools" },
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
        name: "Which image operations are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can compress images, resize dimensions, and convert between common formats like PNG and JPG.",
        },
      },
      {
        "@type": "Question",
        name: "Will image quality be preserved?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can choose settings to balance quality and file size depending on your export target.",
        },
      },
      {
        "@type": "Question",
        name: "Is processing local?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Image processing is browser-based to keep uploads private and avoid server transfer delays.",
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
      { "@type": "ListItem", position: 3, name: "Image Tools", item: `${SITE_URL}/image` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>Image Tools</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Compress, resize, and convert PNG/JPG images directly in your browser.
        </p>
      </header>

      <ImageToolsPanel />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About Image Tools</h2>
        <p>
          Image optimization improves page speed, upload performance, and storage efficiency. This toolkit helps you
          quickly prepare assets for websites, apps, and documents.
        </p>

        <h2 id="what-is">What is Image Optimization?</h2>
        <p>
          Image optimization is the process of reducing file size or adjusting dimensions while maintaining acceptable
          visual quality for the target channel.
        </p>

        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>Which image operations are available?</h3>
          <p>You can compress images, resize dimensions, and convert between common formats like PNG and JPG.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Will image quality be preserved?</h3>
          <p>You can choose settings to balance quality and file size depending on your export target.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Is processing local?</h3>
          <p>Yes. Image processing is browser-based to keep uploads private and avoid server transfer delays.</p>
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
        id="schema-breadcrumb-image"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-faq-image"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}

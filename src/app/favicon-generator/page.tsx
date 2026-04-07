import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import AdSlot from "@/components/AdSlot";
import BlogFunnelLinks from "@/components/BlogFunnelLinks";
import FaviconGeneratorPanel from "@/components/FaviconGeneratorPanel";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Favicon Generator",
  description:
    "Create SVG favicon, PNG icon sizes, ICO packs, apple touch icons, and a web app manifest directly in the browser.",
  alternates: {
    canonical: "/favicon-generator",
  },
  openGraph: {
    title: "Favicon Generator",
    description:
      "Create SVG favicon, PNG icon sizes, ICO packs, apple touch icons, and a web app manifest directly in the browser.",
    url: `${SITE_URL}/favicon-generator`,
    images: [{ url: `${SITE_URL}/og?name=Favicon%20Generator`, width: 1200, height: 630, alt: "Favicon Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Favicon Generator",
    description: "Generate favicon assets and install snippets locally in your browser.",
    images: [`${SITE_URL}/og?name=Favicon%20Generator`],
  },
};

export default function FaviconGeneratorPage() {
  const relatedTools = [
    { href: "/image", name: "Image Tools" },
    { href: "/qrcode", name: "QR Code Generator" },
    { href: "/encode", name: "Encode Tools" },
    { href: "/pdf", name: "PDF Tools" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What assets does the favicon generator create?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It creates SVG, PNG, and ICO favicon files along with a manifest JSON and HTML head snippet.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use my own logo image?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can upload PNG, JPG, WEBP, or SVG artwork and export the icon pack from it.",
        },
      },
      {
        "@type": "Question",
        name: "Is generation local to the browser?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The generator works locally in your browser so you can preview and export without sending files to a server.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
      { "@type": "ListItem", position: 3, name: "Favicon Generator", item: `${SITE_URL}/favicon-generator` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>Favicon Generator</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Create favicon files, app icons, and install snippets directly in your browser.
        </p>
      </header>

      <FaviconGeneratorPanel />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About Favicon Generation</h2>
        <p>
          Favicons are part branding and part browser compatibility. A good icon pack covers modern SVG support,
          PNG fallbacks, ICO compatibility, and platform-specific touch icons.
        </p>

        <h2 id="what-is">What is included in the icon pack?</h2>
        <p>
          The generator creates SVG, PNG, and ICO files, plus a manifest JSON file and a head snippet you can paste
          into your layout or HTML template.
        </p>

        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>What assets does the favicon generator create?</h3>
          <p>It creates SVG, PNG, and ICO favicon files along with a manifest JSON and HTML head snippet.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Can I use my own logo image?</h3>
          <p>Yes. You can upload PNG, JPG, WEBP, or SVG artwork and export the icon pack from it.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Is generation local to the browser?</h3>
          <p>Yes. The generator works locally in your browser so you can preview and export without sending files to a server.</p>
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
        id="schema-breadcrumb-favicon-generator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-faq-favicon-generator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
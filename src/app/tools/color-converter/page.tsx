import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogFunnelLinks from "@/components/BlogFunnelLinks";
import ColorConverterPanel from "@/components/ColorConverterPanel";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Color Converter | HEX, RGB, RGBA, HSL, HSV, CMYK",
  description:
    "Convert colors between HEX, RGBA, HSL, HSV/HSB, CMYK, and CSS color names for web design, UI, and print workflows.",
  alternates: {
    canonical: "/color-converter",
  },
  openGraph: {
    title: "Color Converter | HEX, RGB, RGBA, HSL, HSV, CMYK",
    description:
      "Browser-based color conversion tool for designers and developers. Convert between screen and print color models instantly.",
    url: `${SITE_URL}/color-converter`,
    images: [{ url: `${SITE_URL}/og?name=Color%20Converter`, width: 1200, height: 630, alt: "Color Converter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Converter | HEX, RGB, RGBA, HSL, HSV, CMYK",
    description: "Convert HEX, RGB, RGBA, HSL, HSV/HSB, CMYK, and CSS names in one place.",
    images: [`${SITE_URL}/og?name=Color%20Converter`],
  },
};

export default function ColorConverterPage() {
  const relatedTools = [
    { href: "/image", name: "Image Tools" },
    { href: "/favicon-generator", name: "Favicon Generator" },
    { href: "/encode", name: "Encode Tools" },
    { href: "/diff-checker", name: "Diff Checker" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which color formats can I convert?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This tool supports HEX, HEX8, RGB, RGBA, HSL, HSV/HSB, CMYK, and CSS color name conversion.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert colors for print work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can convert RGB to CMYK to prepare color references for print-related workflows.",
        },
      },
      {
        "@type": "Question",
        name: "Is conversion done locally?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All conversion logic runs in your browser without uploading color data to servers.",
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
      { "@type": "ListItem", position: 3, name: "Color Converter", item: `${SITE_URL}/color-converter` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>Color Converter</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Convert HEX, RGB, RGBA, HSL, HSV/HSB, CMYK, and CSS color names in one browser-based tool.
        </p>
      </header>

      <ColorConverterPanel />

      <section className="seo-copy" aria-labelledby="color-about" style={{ marginTop: "32px" }}>
        <h2 id="color-about">About Color Converter</h2>
        <p>
          Color Converter is built for professional design and development workflows where color accuracy and consistency are critical.
          It helps you convert colors across HEX, RGB, RGBA, HSL, HSV/HSB, and CMYK so the same brand palette can be used reliably
          in UI design, frontend implementation, and print production.
        </p>
        <p>
          Whether you are working in Figma, Photoshop, CSS, design tokens, or marketing assets, this online color converter reduces
          manual conversion errors, improves cross-team handoff, and keeps visual identity stable across digital and physical channels.
          For teams that need fast iteration, the tool provides immediate format output to shorten QA cycles and accelerate release speed.
        </p>
        <p>
          Use this browser-based color conversion tool to standardize palette values, validate opacity with HEX8 and RGBA, and map
          screen colors to CMYK references before print delivery. This process helps maintain accessibility, visual harmony, and brand
          compliance from product UI to final production materials.
        </p>
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
        id="schema-breadcrumb-color-converter"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-faq-color-converter"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}

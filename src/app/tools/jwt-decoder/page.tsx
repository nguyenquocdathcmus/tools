import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JwtDecoderPanel from "@/components/JwtDecoderPanel";
import AdSlot from "@/components/AdSlot";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "JWT Decoder",
  description: "Decode JWT header, payload, signature, and claims locally in the browser.",
  alternates: {
    canonical: "/jwt-decoder",
  },
  openGraph: {
    title: "JWT Decoder",
    description: "Decode JWT header, payload, signature, and claims locally in the browser.",
    url: `${SITE_URL}/jwt-decoder`,
    images: [{ url: `${SITE_URL}/og?name=JWT%20Decoder`, width: 1200, height: 630, alt: "JWT Decoder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "JWT Decoder",
    description: "Decode JWT tokens and inspect claims locally.",
    images: [`${SITE_URL}/og?name=JWT%20Decoder`],
  },
};

export default function JwtDecoderPage() {
  const relatedTools = [
    { href: "/encode", name: "Encode Tools" },
    { href: "/timestamp", name: "Timestamp Converter" },
    { href: "/diff-checker", name: "Diff Checker" },
    { href: "/text-count", name: "Text Counter" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can this verify JWT signatures?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This screen is optimized for decoding and inspection. Signature validation depends on algorithm and key workflows.",
        },
      },
      {
        "@type": "Question",
        name: "What token parts are shown?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tool displays header, payload claims, and signature segments in a readable format.",
        },
      },
      {
        "@type": "Question",
        name: "Is token data private?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Decoding runs in your browser, so token content is not uploaded by default.",
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
      { "@type": "ListItem", position: 3, name: "JWT Decoder", item: `${SITE_URL}/jwt-decoder` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>JWT Decoder</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Decode tokens locally and inspect claims, header, and signature segments quickly.
        </p>
      </header>

      <JwtDecoderPanel />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About JWT Decoder</h2>
        <p>
          JWT inspection helps troubleshoot authentication flows and authorization bugs. This screen lets you decode
          token content and verify claim values without switching tools.
        </p>

        <h2 id="what-is">What is a JWT?</h2>
        <p>
          A JSON Web Token (JWT) is a compact token format used to transfer authenticated claims between systems,
          usually containing a header, payload, and signature.
        </p>

        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>Can this verify JWT signatures?</h3>
          <p>This screen is optimized for decoding and inspection. Signature validation depends on algorithm and key workflows.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>What token parts are shown?</h3>
          <p>The tool displays header, payload claims, and signature segments in a readable format.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Is token data private?</h3>
          <p>Yes. Decoding runs in your browser, so token content is not uploaded by default.</p>
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

      <SiteFooter />

      <Script
        id="schema-breadcrumb-jwt"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-faq-jwt"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
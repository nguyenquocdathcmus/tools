import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import AdSlot from "@/components/AdSlot";
import { FORMATTERS } from "@/lib/formatters";
import { SITE_URL } from "@/lib/site";
import EncodeToolsPanelWrapper from "@/components/EncodeToolsPanelWrapper";

export const metadata: Metadata = {
  title: "Base64 Decoder | Free Online Decode Tool | Daxnoria",
  description: "Decode Base64 strings back to plain text instantly. Free, fast, and secure client-side Base64 decoding tool for developers.",
  alternates: {
    canonical: "/base64-decode",
  },
  openGraph: {
    title: "Base64 Decoder | Free Online Decode Tool | Daxnoria",
    description: "Decode Base64 strings back to plain text instantly. Free, fast, and secure client-side Base64 decoding tool for developers.",
    url: `${SITE_URL}/base64-decode`,
    images: [{ url: `${SITE_URL}/og?name=Base64%20Decoder`, width: 1200, height: 630, alt: "Base64 Decoder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Decoder | Free Online Decode Tool | Daxnoria",
    description: "Decode Base64 strings back to plain text instantly. Free, fast, and secure client-side Base64 decoding tool for developers.",
    images: [`${SITE_URL}/og?name=Base64%20Decoder`],
  },
};

export default function Page() {
  const relatedLinks = FORMATTERS.filter((item) => item.id !== "json").slice(0, 8);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Why is my Base64 string not decoding?", acceptedAnswer: { "@type": "Answer", text: "Ensure your string does not contain spaces or invalid characters. Standard Base64 strings only contain A-Z, a-z, 0-9, +, /, and = (for padding)." } },
      { "@type": "Question", name: "Is my decoded text saved anywhere?", acceptedAnswer: { "@type": "Answer", text: "No, our tools operate strictly on the client-side. Your secrets and tokens remain private in your browser session." } },
      { "@type": "Question", name: "Can it decode JSON?", acceptedAnswer: { "@type": "Answer", text: "Yes, if a JSON object was encoded into Base64 (like the body of a JWT), decoding it will reveal the original JSON string." } }
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Base64 Decoder", item: `${SITE_URL}/base64-decode` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>Base64 Decoder</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Decode Base64 strings back to plain text instantly. Free, fast, and secure client-side Base64 decoding tool for developers.
        </p>
      </header>

      <EncodeToolsPanelWrapper />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About Base64 Decoder</h2>
        <p dangerouslySetInnerHTML={{ __html: `Do you have a Base64 string that you need to read? Our <strong>Base64 Decoder</strong> instantly reverses Base64 encoded payloads back into human-readable plain text. Simply paste your string and our tool will decode it locally in milliseconds.` }} />

        <h2 id="what-is">What is Base64 Decoding?</h2>
        <p dangerouslySetInnerHTML={{ __html: `<strong>Base64 Decoding</strong> is the reverse process of Base64 encoding. It takes an ASCII string built from the Base64 alphabet and translates it back into its original binary or text format. This is commonly used in decoding JWT payloads or email attachments.` }} />

        {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>Why is my Base64 string not decoding?</h3>
          <p>Ensure your string does not contain spaces or invalid characters. Standard Base64 strings only contain A-Z, a-z, 0-9, +, /, and = (for padding).</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Is my decoded text saved anywhere?</h3>
          <p>No, our tools operate strictly on the client-side. Your secrets and tokens remain private in your browser session.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Can it decode JSON?</h3>
          <p>Yes, if a JSON object was encoded into Base64 (like the body of a JWT), decoding it will reveal the original JSON string.</p>
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

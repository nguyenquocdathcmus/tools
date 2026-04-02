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
  title: "Free JSON Validator & Syntax Checker Online | Daxnoria",
  description: "Free online JSON Validator. Instantly check JSON syntax, find exact line errors, and ensure your data is perfectly structured and valid. 100% client-side secure.",
  alternates: {
    canonical: "/json-validator",
  },
  openGraph: {
    title: "Free JSON Validator & Syntax Checker Online | Daxnoria",
    description: "Free online JSON Validator. Instantly check JSON syntax, find exact line errors, and ensure your data is perfectly structured and valid. 100% client-side secure.",
    url: `${SITE_URL}/json-validator`,
    images: [{ url: `${SITE_URL}/og?name=JSON%20Validator%20%26%20Syntax%20Checker`, width: 1200, height: 630, alt: "JSON Validator & Syntax Checker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JSON Validator & Syntax Checker Online | Daxnoria",
    description: "Free online JSON Validator. Instantly check JSON syntax, find exact line errors, and ensure your data is perfectly structured and valid. 100% client-side secure.",
    images: [`${SITE_URL}/og?name=JSON%20Validator%20%26%20Syntax%20Checker`],
  },
};

export default function Page() {
  const relatedLinks = FORMATTERS.filter((item) => item.id !== "json").slice(0, 8);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How does the JSON Validator find errors?", acceptedAnswer: { "@type": "Answer", text: "When you input data, our tool attempts to parse it. If the parser fails, it extracts the exact line number and unexpected character, highlighting it in the editor." } },
      { "@type": "Question", name: "Is my data safe?", acceptedAnswer: { "@type": "Answer", text: "Yes! The validation happens entirely in your local browser. No JSON data is ever transmitted or stored on our servers." } },
      { "@type": "Question", name: "Can it format my JSON?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. Once the JSON is valid, you can click the format button to pretty-print it with proper indentation." } }
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "JSON Validator & Syntax Checker", item: `${SITE_URL}/json-validator` },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
      <AdSlot variant="top-banner" />

      <header className="seo-copy" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>JSON Validator & Syntax Checker</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-subtle)" }}>
          Free online JSON Validator. Instantly check JSON syntax, find exact line errors, and ensure your data is perfectly structured and valid. 100% client-side secure.
        </p>
      </header>

      <JsonToolsPanelWrapper />

      <section className="seo-copy" aria-labelledby="introduction" style={{ marginTop: "32px" }}>
        <h2 id="introduction">About JSON Validator & Syntax Checker</h2>
        <p dangerouslySetInnerHTML={{ __html: `Debugging API payloads and configuration files with structural errors is tedious. Our <strong>JSON Validator</strong> instantly checks your raw JSON strings and files against standard specifications. If there is a missing comma, unquoted key, or trailing brace, the tool pinpoints the exact line and column so you can deploy clean data.` }} />

        <h2 id="what-is">What is JSON Validation?</h2>
        <p dangerouslySetInnerHTML={{ __html: `<strong>JSON Validation</strong> is the process of ensuring that a JSON document conforms to the syntax rules defined by the JSON specification (RFC 8259). Valid JSON ensures machines, browsers, and servers can parse the data without throwing fatal execution errors.` }} />

        {/* TODO(ad-slot): slot kept via AdSlot component; enable with NEXT_PUBLIC_ENABLE_ADS=true */}
        <AdSlot variant="in-article" />

        <h2 id="faq">Frequently Asked Questions</h2>
        <div>
          <h3 style={{ fontSize: "1.1rem" }}>How does the JSON Validator find errors?</h3>
          <p>When you input data, our tool attempts to parse it. If the parser fails, it extracts the exact line number and unexpected character, highlighting it in the editor.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Is my data safe?</h3>
          <p>Yes! The validation happens entirely in your local browser. No JSON data is ever transmitted or stored on our servers.</p>
        </div>
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Can it format my JSON?</h3>
          <p>Absolutely. Once the JSON is valid, you can click the format button to pretty-print it with proper indentation.</p>
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

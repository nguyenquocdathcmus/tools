import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Developer Tools Directory: JSON, Encode, Timestamp, JWT, PDF",
  description:
    "Browse the full online developer tools directory for JSON formatting, Base64 encode/decode, Unix timestamp conversion, JWT inspection, diff checks, and file utilities.",
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
        <h1 id="tools-title">Online Developer Tools Directory</h1>
        <p>
          Browse all major tool groups and jump directly into the exact workflow you need, from JSON payload
          validation to timestamp conversion and authentication debugging.
        </p>
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

      <section className="seo-copy" aria-labelledby="directory-usecases-title">
        <h2 id="directory-usecases-title">Common workflows by tool category</h2>
        <p>
          Search engines rank directories better when they explain intent. This directory is organized around real
          engineering tasks instead of generic categories.
        </p>

        <h3>JSON authority cluster</h3>
        <p>
          Start with <Link href="/json-tools">JSON Tools Hub</Link>, then move into <Link href="/json-formatter">JSON Formatter</Link>,
          <Link href="/json-validator">JSON Validator</Link>, and <Link href="/json-minify">JSON Minify</Link>. For long-tail learning,
          read <Link href="/blog/json-format-guide">JSON Format Guide</Link> and <Link href="/blog/fix-invalid-json">Fix Invalid JSON</Link>.
        </p>

        <h3>Data and API debugging</h3>
        <p>
          Use <Link href="/json-formatter">JSON Formatter</Link>, <Link href="/json-validator">JSON Validator</Link>, and{" "}
          <Link href="/xml-formatter">XML Formatter</Link> to inspect payload quality, normalize nested structures,
          and catch schema-level defects before deployment.
        </p>

        <h3>Encoding and transport compatibility</h3>
        <p>
          For query strings and encoded payloads, combine <Link href="/base64-encode">Base64 Encode</Link>,{" "}
          <Link href="/base64-decode">Base64 Decode</Link>, <Link href="/url-encode">URL Encode</Link>, and{" "}
          <Link href="/url-decode">URL Decode</Link>. This prevents character corruption and malformed requests.
        </p>

        <h3>Auth and time-sensitive incident triage</h3>
        <p>
          Pair <Link href="/jwt-decoder">JWT Decoder</Link> with <Link href="/timestamp-converter">Timestamp Converter</Link>
          to validate expiration windows and issued-at claims. This is one of the fastest ways to debug login failures
          and token lifecycle bugs.
        </p>

        <h3>Related guides</h3>
        <ul className="related-grid">
          <li>
            <Link href="/blog/json-formatter-best-practices">
              <span>JSON Formatter Best Practices</span>
              <small>Open guide -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/blog/unix-timestamp-converter-use-cases">
              <span>Unix Timestamp Converter Use Cases</span>
              <small>Open guide -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/blog/ai-tools-for-developers">
              <span>AI Tools For Developers</span>
              <small>Open guide -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/json-tools">
              <span>JSON Tools Hub</span>
              <small>Open hub -&gt;</small>
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

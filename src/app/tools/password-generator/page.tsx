import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogFunnelLinks from "@/components/BlogFunnelLinks";
import PasswordGeneratorPanel from "@/components/PasswordGeneratorPanel";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Password Generator",
  description:
    "Generate secure passwords directly in your browser with customizable length and character rules. Nothing is stored on any server.",
  alternates: {
    canonical: "/password-generator",
  },
  openGraph: {
    title: "Password Generator",
    description:
      "Create short or long secure passwords in your browser only. No password storage, no server-side processing.",
    url: `${SITE_URL}/password-generator`,
    images: [{ url: `${SITE_URL}/og?name=Password%20Generator`, width: 1200, height: 630, alt: "Password Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Generator",
    description: "Create secure passwords instantly in your browser with configurable rules.",
    images: [`${SITE_URL}/og?name=Password%20Generator`],
  },
};

export default function PasswordGeneratorPage() {
  const relatedTools = [
    { href: "/encode", name: "Encode Tools" },
    { href: "/jwt-decoder", name: "JWT Decoder" },
    { href: "/timestamp", name: "Timestamp" },
    { href: "/favicon-generator", name: "Favicon Generator" },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools/all` },
      { "@type": "ListItem", position: 3, name: "Password Generator", item: `${SITE_URL}/password-generator` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are generated passwords stored anywhere?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Password generation happens in your browser and nothing is stored on our servers.",
        },
      },
      {
        "@type": "Question",
        name: "Can I generate multiple passwords at once?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can choose how many passwords to create and copy them individually or all together.",
        },
      },
    ],
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <section className="seo-copy" aria-labelledby="password-generator-title" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 id="password-generator-title" style={{ fontSize: "2.5rem", marginBottom: "8px" }}>
          Password Generator
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--color-text-subtle)" }}>
          Generate secure and hard-to-guess passwords directly in your browser. You can create both short and long passwords for any account.
        </p>
      </section>

      <PasswordGeneratorPanel />

      <section className="seo-copy" aria-labelledby="password-generator-about" style={{ marginTop: "32px" }}>
        <h2 id="password-generator-about">About Password Generator</h2>
        <p>
          Password Generator is built for privacy-first credential creation in modern security workflows. All passwords are produced
          client-side in your browser using cryptographic-grade randomness, which means generation happens locally on your device and
          no password data is transmitted to or stored on our servers.
        </p>
        <p>
          The tool provides flexible controls for password length, character sets, and readability constraints so you can create passwords
          that match different policy requirements across consumer and enterprise systems. Whether you are securing social accounts,
          administrator dashboards, cloud consoles, API integrations, database users, or internal back-office tools, you can generate
          credentials with the right balance of strength and usability.
        </p>
        <p>
          For best security results, generate unique passwords for every account, avoid credential reuse, and store the final values in a
          trusted password manager. This approach reduces the impact of credential leaks, improves compliance posture, and strengthens
          account protection across your entire environment.
        </p>
      </section>

      <section className="supported" aria-labelledby="related-password-tools">
        <h2 id="related-password-tools">Related Tools</h2>
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
        id="schema-breadcrumb-password-generator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-faq-password-generator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}

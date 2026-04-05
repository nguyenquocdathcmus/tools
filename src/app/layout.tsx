import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Daxnoria Formatter Hub | JSON, XML, HTML, YAML, JS, TS, Java, C#",
    template: "%s | Daxnoria Formatter Hub",
  },
  description:
    "Online formatter tools for JSON, JSON5, XML, HTML, YAML, JavaScript, CSS, C#, Java, GraphQL, Angular, Vue, LESS, SCSS, TypeScript, Babel, Markdown, MDX, Glimmer, LWC, PHP, WSDL, SOAP, and Flow.",
  keywords: [
    "json formatter",
    "xml formatter",
    "html formatter",
    "yaml formatter",
    "javascript formatter",
    "typescript formatter",
    "java formatter",
    "csharp formatter",
    "graphql formatter",
    "php formatter",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" }],
  },
  openGraph: {
    title: "Daxnoria Formatter Hub",
    description:
      "One page to format JSON, XML, HTML, YAML, JS, TS, Java, C#, GraphQL, Markdown, MDX, PHP and more.",
    url: "/",
    images: [
      {
        url: "/og?name=Daxnoria%20Formatter%20Hub",
        width: 1200,
        height: 630,
        alt: "Daxnoria Formatter Hub",
      },
    ],
    siteName: "Daxnoria Formatter Hub",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daxnoria Formatter Hub",
    description: "SEO-optimized online formatter for 24 code and markup formats.",
    images: ["/og?name=Daxnoria%20Formatter%20Hub"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "eyTH-TVGFCg9zVibn375yjmuWrXuHeaXI20mrYMbgkg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Daxnoria Formatter Hub",
    url: SITE_URL,
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      { "@type": "SiteNavigationElement", name: "Home", url: `${SITE_URL}/` },
      { "@type": "SiteNavigationElement", name: "Tools", url: `${SITE_URL}/tools` },
      { "@type": "SiteNavigationElement", name: "Format", url: `${SITE_URL}/tools/format` },
      { "@type": "SiteNavigationElement", name: "Encode", url: `${SITE_URL}/encode` },
      { "@type": "SiteNavigationElement", name: "Timestamp", url: `${SITE_URL}/timestamp` },
      { "@type": "SiteNavigationElement", name: "Blog", url: `${SITE_URL}/blog` },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Daxnoria",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon-48x48.png`,
    sameAs: ["https://web.facebook.com/people/Daxnoria/61575367715805/"],
  };

  return (
    <html lang="en">
      <body>
        {children}
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-navigation"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

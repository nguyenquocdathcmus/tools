import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  alternates: {
    canonical: "/",
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
    locale: "vi_VN",
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
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

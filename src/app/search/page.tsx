import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { BLOG_POSTS } from "@/lib/blog";
import { FORMATTERS } from "@/lib/formatters";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

const EXTRA_TOOLS = [
  { name: "Encode Tools", href: "/encode" },
  { name: "Text Counter", href: "/text-count" },
  { name: "Timestamp Tools", href: "/timestamp" },
  { name: "Image Tools", href: "/image" },
  { name: "PDF Tools", href: "/pdf" },
  { name: "QR Code Generator", href: "/qrcode" },
  { name: "JWT Decoder", href: "/jwt-decoder" },
  { name: "Diff Checker", href: "/diff-checker" },
  { name: "Developer Tools Online", href: "/developer-tools-online" },
  { name: "API Debugging Tools", href: "/api-debugging-tools" },
];

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";

  return {
    title: query ? `Search results for ${query}` : "Search",
    description: "Search Daxnoria tools and developer guides.",
    alternates: {
      canonical: "/search",
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.trim().toLowerCase() ?? "";

  const toolResults = [
    ...FORMATTERS.map((item) => ({ name: item.name, href: `/${item.slug}` })),
    ...EXTRA_TOOLS,
  ].filter((item) => (query ? `${item.name} ${item.href}`.toLowerCase().includes(query) : true));

  const blogResults = BLOG_POSTS.filter((item) =>
    query ? `${item.title} ${item.description} ${item.keywords.join(" ")}`.toLowerCase().includes(query) : true,
  );

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <section className="seo-copy" aria-labelledby="search-title">
        <p className="section-kicker">Site search</p>
        <h1 id="search-title">Search Results</h1>
        <p>Query: {query || "all"}</p>
      </section>

      <section className="supported" aria-labelledby="tool-results-title">
        <h2 id="tool-results-title">Tool pages</h2>
        <ul className="related-grid">
          {toolResults.slice(0, 40).map((item) => (
            <li key={`${item.href}-${item.name}`}>
              <Link href={item.href}>
                <span>{item.name}</span>
                <small>Open page -&gt;</small>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="supported" aria-labelledby="guide-results-title">
        <h2 id="guide-results-title">Guides</h2>
        <ul className="related-grid">
          {blogResults.map((item) => (
            <li key={item.slug}>
              <Link href={`/blog/${item.slug}`}>
                <span>{item.title}</span>
                <small>Open guide -&gt;</small>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </main>
  );
}

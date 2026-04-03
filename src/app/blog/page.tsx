import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Developer Blog",
  description:
    "Keyword-driven guides for developers on JSON formatting, timestamp conversion, JWT decoding, and practical debugging workflows.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Developer Blog | Daxnoria",
    description:
      "Practical guides for JSON formatter, Unix timestamp converter, JWT debugging, and developer productivity workflows.",
    url: `${SITE_URL}/blog`,
    type: "website",
    images: [{ url: `${SITE_URL}/og?name=Developer%20Blog`, width: 1200, height: 630, alt: "Developer Blog" }],
  },
};

export default function BlogIndexPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: BLOG_POSTS.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Article",
        headline: post.title,
        description: post.description,
        url: `${SITE_URL}/blog/${post.slug}`,
        datePublished: post.publishedAt,
      },
    })),
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <section className="seo-copy" aria-labelledby="blog-title">
        <p className="section-kicker">Content hub</p>
        <h1 id="blog-title">Developer SEO Guides</h1>
        <p>
          This blog is built as a content funnel for long-tail developer queries like JSON formatter best practices,
          Unix timestamp converter workflows, and JWT debugging playbooks.
        </p>
      </section>

      <section className="supported" aria-labelledby="blog-list-title">
        <h2 id="blog-list-title">Latest Articles</h2>
        <ul className="related-grid">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <span>{post.title}</span>
                <small>{post.readMinutes} min read -&gt;</small>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />

      <Script
        id="schema-blog-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </main>
  );
}

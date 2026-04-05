import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogFunnelLinks from "@/components/BlogFunnelLinks";
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What topics does the Daxnoria blog cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The blog covers JSON formatting, API payload validation, JWT debugging, Unix timestamp conversion, and practical developer workflow optimization.",
        },
      },
      {
        "@type": "Question",
        name: "How does this blog help with tool workflows?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each article maps a real debugging use case and links to related tools, creating a repeatable hub-to-tool workflow for faster incident resolution.",
        },
      },
    ],
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
        <p>
          Instead of generic theory, each guide focuses on production-style workflows: validate payloads, decode auth
          claims, compare diffs, and verify time-sensitive events before release.
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

      <BlogFunnelLinks title="Guides by Cluster" />

      <SiteFooter />

      <Script
        id="schema-blog-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Script
        id="schema-blog-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-blog-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}

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
    "Keyword-driven guides for developers on JSON formatting, timestamp conversion, JWT decoding, encoding workflows, and practical debugging workflows.",
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
  const latestPosts = [...BLOG_POSTS].reverse().slice(0, 12);
  const featuredSlugs = [
    "json-formatter-best-practices",
    "base64-encode-decode-workflow",
    "timestamp-converter-for-productivity",
    "diff-checker-review-workflow",
    "xml-formatter-clean-xml-workflow",
    "pdf-tool-workflow-for-large-documents",
  ];

  const featuredPosts = featuredSlugs
    .map((slug) => BLOG_POSTS.find((post) => post.slug === slug))
    .filter((post): post is (typeof BLOG_POSTS)[number] => Boolean(post));

  const topicGroups = Array.from(
    BLOG_POSTS.reduce((groups, post) => {
      const bucket = groups.get(post.category) ?? [];
      bucket.push(post);
      groups.set(post.category, bucket);
      return groups;
    }, new Map<string, (typeof BLOG_POSTS)[number][]>())
  ).map(([category, posts]) => ({
    category,
    posts,
    sample: posts.slice(0, 4),
  }));

  const totalGuides = BLOG_POSTS.length;
  const categoryCount = topicGroups.length;

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

      <section className="blog-hero" aria-labelledby="blog-title">
        <div className="blog-hero-grid">
          <div className="blog-hero-copy">
            <p className="section-kicker">Content hub</p>
            <h1 id="blog-title">Developer SEO Guides</h1>
            <p>
              This blog is built as a content funnel for long-tail developer queries like JSON formatter best
              practices, Base64 workflows, timestamp conversion, and debugging playbooks.
            </p>
            <p>
              Instead of generic theory, each guide focuses on production-style workflows: validate payloads, decode
              auth claims, compare diffs, inspect encoded strings, and verify time-sensitive events before release.
            </p>
          </div>

          <div className="blog-hero-stats" aria-label="Blog metrics">
            <article>
              <p>Articles</p>
              <strong>{totalGuides}</strong>
              <span>Long-tail guides and support posts</span>
            </article>
            <article>
              <p>Topics</p>
              <strong>{categoryCount}</strong>
              <span>Content clusters with clear intent</span>
            </article>
            <article>
              <p>Workflow</p>
              <strong>Browser-first</strong>
              <span>Built to support fast, local utility flows</span>
            </article>
          </div>
        </div>
      </section>

      <section className="blog-featured" aria-labelledby="featured-articles-title">
        <div className="section-head">
          <div>
            <p className="section-kicker">Start here</p>
            <h2 id="featured-articles-title">Featured Articles</h2>
          </div>
          <p>These are the strongest hub pages for search intent and internal linking.</p>
        </div>

        <ul className="blog-featured-grid">
          {featuredPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="blog-featured-card">
                <p className="blog-featured-category">{post.category}</p>
                <span>{post.title}</span>
                <small>{post.description}</small>
                <strong>{post.readMinutes} min read -&gt;</strong>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="blog-topics" aria-labelledby="topic-library-title">
        <div className="section-head">
          <div>
            <p className="section-kicker">Browse by topic</p>
            <h2 id="topic-library-title">Topic Library</h2>
          </div>
          <p>Grouped by intent so readers can move from a general workflow into a narrower guide.</p>
        </div>

        <div className="blog-topic-grid">
          {topicGroups.map((group) => (
            <article key={group.category} className="blog-topic-card">
              <div className="blog-topic-head">
                <h3>{group.category}</h3>
                <span>{group.posts.length} articles</span>
              </div>
              <ul className="blog-topic-list">
                {group.sample.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`}>
                      <span>{post.title}</span>
                      <small>{post.readMinutes} min read</small>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="supported" aria-labelledby="blog-list-title">
        <div className="section-head">
          <div>
            <p className="section-kicker">All posts</p>
            <h2 id="blog-list-title">Latest Articles</h2>
          </div>
          <p>The newest additions appear first, so the hub stays useful as the content library grows.</p>
        </div>
        <ul className="blog-latest-grid">
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="blog-latest-card">
                <span>{post.title}</span>
                <small>
                  {post.category} · {post.readMinutes} min read -&gt;
                </small>
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

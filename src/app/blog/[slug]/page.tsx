import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { BLOG_BY_SLUG, BLOG_POSTS } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_BY_SLUG[slug];

  if (!post) {
    return { title: "Blog Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      images: [{ url: `${SITE_URL}/og?name=${encodeURIComponent(post.title)}`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${SITE_URL}/og?name=${encodeURIComponent(post.title)}`],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = BLOG_BY_SLUG[slug];

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: "Daxnoria",
    },
    publisher: {
      "@type": "Organization",
      name: "Daxnoria",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon-48x48.png`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <article className="seo-copy" aria-labelledby="post-title">
        <p className="section-kicker">{post.category}</p>
        <h1 id="post-title">{post.title}</h1>
        <p>{post.description}</p>
        <p>
          Published: {post.publishedAt} | Updated: {post.updatedAt} | Read time: {post.readMinutes} minutes
        </p>

        {post.sections.map((section) => (
          <section key={section.heading} style={{ marginTop: "1.5rem" }}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </article>

      <section className="supported" aria-labelledby="read-next-title">
        <h2 id="read-next-title">Read next</h2>
        <ul className="related-grid">
          {BLOG_POSTS.filter((item) => item.slug !== post.slug)
            .slice(0, 3)
            .map((item) => (
              <li key={item.slug}>
                <Link href={`/blog/${item.slug}`}>
                  <span>{item.title}</span>
                  <small>Open article -&gt;</small>
                </Link>
              </li>
            ))}
        </ul>
      </section>

      <section className="supported" aria-labelledby="tool-links-title">
        <h2 id="tool-links-title">Related tools</h2>
        <ul className="related-grid">
          <li>
            <Link href="/json-formatter">
              <span>JSON Formatter</span>
              <small>Open tool -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/timestamp-converter">
              <span>Unix Timestamp Converter</span>
              <small>Open tool -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/jwt-decoder">
              <span>JWT Decoder</span>
              <small>Open tool -&gt;</small>
            </Link>
          </li>
        </ul>
      </section>

      <section className="seo-copy" aria-labelledby="blog-faq-title">
        <h2 id="blog-faq-title">Frequently asked questions</h2>
        {post.faqs.map((item) => (
          <div key={item.question} style={{ marginTop: "1rem" }}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </section>

      <SiteFooter />

      <Script id="schema-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script
        id="schema-breadcrumb-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script id="schema-faq-blog" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}

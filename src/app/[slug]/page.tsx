import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FormatterClient from "@/components/FormatterClient";
import JsonToolsPanel from "@/components/JsonToolsPanel";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { FORMATTERS, FORMATTER_BY_SLUG } from "@/lib/formatters";
import { SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return FORMATTERS.map((formatter) => ({ slug: formatter.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const formatter = FORMATTER_BY_SLUG[slug];

  if (!formatter) {
    return {
      title: "Formatter Not Found",
    };
  }

  const url = `${SITE_URL}/${formatter.slug}`;
  const ogImageUrl = `${SITE_URL}/og?name=${encodeURIComponent(formatter.name)}`;

  return {
    title: `${formatter.name} Online`,
    description: formatter.seoDescription,
    alternates: {
      canonical: `/${formatter.slug}`,
    },
    openGraph: {
      title: `${formatter.name} | MyTools`,
      description: formatter.seoDescription,
      url,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: formatter.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${formatter.name} | MyTools`,
      description: formatter.seoDescription,
      images: [ogImageUrl],
    },
  };
}

export default async function FormatterPage({ params }: PageProps) {
  const { slug } = await params;
  const formatter = FORMATTER_BY_SLUG[slug];

  if (!formatter) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: formatter.name,
        item: `${SITE_URL}/${formatter.slug}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${formatter.name} used for?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: formatter.landingIntro,
        },
      },
      {
        "@type": "Question",
        name: `Does ${formatter.name} validate syntax with line details?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The tool returns syntax issues with line, column, and line content so you can fix errors faster.",
        },
      },
    ],
  };

  const related = FORMATTERS.filter((item) => item.id !== formatter.id).slice(0, 8);

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      {formatter.id === "json" ? (
        <JsonToolsPanel />
      ) : (
        <FormatterClient
          formatter={formatter.id}
          formatterLabel={formatter.name}
          sampleInput={formatter.sampleInput}
        />
      )}

      <section className="seo-copy" aria-labelledby="seo-title">
        <h2 id="seo-title">About {formatter.name}</h2>
        <p>{formatter.seoDescription}</p>
        <p>
          Each formatter page includes its own URL, metadata, Open Graph image, and structured data to improve
          long-tail keyword visibility.
        </p>
      </section>

      <section className="supported" aria-labelledby="related-title">
        <h2 id="related-title">Related formatters</h2>
        <ul className="related-grid">
          {related.map((item) => (
            <li key={item.id}>
              <Link href={`/${item.slug}`}>
                <span>{item.name}</span>
                <small>Open formatter -&gt;</small>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}

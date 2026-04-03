import type { Metadata } from "next";
import Link from "next/link";
import { Braces, Code2, Globe, LayoutGrid } from "lucide-react";
import { FORMATTERS } from "@/lib/formatters";
import { SITE_URL } from "@/lib/site";
import HomeToolSearch from "@/components/HomeToolSearch";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Online Developer Tools",
  description:
    "Keyword-driven online developer tools for JSON formatting, timestamp conversion, JWT decoding, XML formatting, and payload validation.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const spotlight = [
    FORMATTERS.find((f) => f.id === "json")!,
    FORMATTERS.find((f) => f.id === "xml")!,
    {
      id: "text-count",
      name: "Text Count",
      slug: "tools/text-count",
      seoDescription: "Count characters, words, lines, and bytes instantly with real-time text analysis.",
    },
    {
      id: "jwt-decoder",
      name: "JWT Decoder",
      slug: "tools/jwt-decoder",
      seoDescription: "Decode JWT header, payload, and claims locally right in the browser securely.",
    },
    {
      id: "timestamp",
      name: "Unix Timestamp",
      slug: "tools/timestamp",
      seoDescription: "Convert Unix timestamps to human-readable dates and vice versa with precision.",
    },
    {
      id: "diff-checker",
      name: "Diff Checker",
      slug: "tools/diff-checker",
      seoDescription: "Compare text, config, and code files side-by-side with line-by-line diff tracking.",
    },
    {
      id: "encode",
      name: "Encode & Decode",
      slug: "tools/encode",
      seoDescription: "Base64, URL, and HTML encode/decode strings instantly without server calls.",
    },
    {
      id: "qrcode",
      name: "QR Code Generator",
      slug: "tools/qrcode",
      seoDescription: "Generate QR codes for URLs, text, and contact info directly in the browser.",
    },
  ];
  const searchItems = [
    ...FORMATTERS.map((formatter) => ({
      id: formatter.id,
      name: formatter.name,
      slug: formatter.slug,
    })),
    {
      id: "text-count",
      name: "Text Count",
      slug: "tools/text-count",
    },
    {
      id: "encode",
      name: "Encode & Decode",
      slug: "tools/encode",
    },
    {
      id: "timestamp",
      name: "Unix Timestamp",
      slug: "tools/timestamp",
    },
    {
      id: "image",
      name: "Image Processing",
      slug: "tools/image",
    },
    {
      id: "pdf",
      name: "PDF Tools",
      slug: "tools/pdf",
    },
    {
      id: "qrcode",
      name: "QR Code Generator",
      slug: "tools/qrcode",
    },
    {
      id: "jwt-decoder",
      name: "JWT Decoder",
      slug: "tools/jwt-decoder",
    },
    {
      id: "diff-checker",
      name: "Diff Checker",
      slug: "tools/diff-checker",
    }
  ];

  const homeCategories = [
    {
      title: "All Tools",
      desc: "Everything in one place",
      href: "/tools/all",
      Icon: LayoutGrid,
      note: "All in one",
      tone: "tone-all",
    },
    {
      title: "Format",
      desc: "JSON, YAML, XML, SOAP",
      href: "/tools/format",
      Icon: Braces,
      note: "Structured data",
      tone: "tone-format",
    },
    {
      title: "Web Tools",
      desc: "HTML, CSS, JS, TS",
      href: "/tools/web",
      Icon: Globe,
      note: "Frontend stack",
      tone: "tone-web",
    },
    {
      title: "Code Tools",
      desc: "Java, C#, PHP, GraphQL",
      href: "/tools/code",
      Icon: Code2,
      note: "Backend ready",
      tone: "tone-code",
    },
    {
      title: "JWT Decoder",
      desc: "Decode header, payload, claims",
      href: "/jwt-decoder",
      Icon: Code2,
      note: "Auth toolkit",
      tone: "tone-format",
    },
    {
      title: "Diff Checker",
      desc: "Compare text, config, and code",
      href: "/diff-checker",
      Icon: Braces,
      note: "Compare toolkit",
      tone: "tone-web",
    },
  ];

  const featuredTools = [
    {
      icon: "{}",
      pill: "Most used",
      title: "JSON Formatter",
      desc: "Format, validate and inspect JSON with grouped viewer.",
      href: "/json-formatter",
      tone: "featured-tone-json",
    },
    {
      icon: "</>",
      pill: "API ready",
      title: "XML Formatter",
      desc: "Clean and align XML, SOAP and WSDL structures quickly.",
      href: "/xml-formatter",
      tone: "featured-tone-xml",
    },
    {
      icon: "TS",
      pill: "Frontend",
      title: "TypeScript Formatter",
      desc: "Auto format TypeScript code to readable team style.",
      href: "/typescript-formatter",
      tone: "featured-tone-ts",
    },
    {
      icon: "GQ",
      pill: "Schema",
      title: "GraphQL Formatter",
      desc: "Normalize GraphQL query and schema files instantly.",
      href: "/graphql-formatter",
      tone: "featured-tone-graphql",
    },
    {
      icon: "JW",
      pill: "Auth",
      title: "JWT Decoder",
      desc: "Decode JWT header, payload, and claims locally in the browser.",
      href: "/jwt-decoder",
      tone: "featured-tone-ts",
    },
    {
      icon: "DF",
      pill: "Compare",
      title: "Diff Checker",
      desc: "Compare two versions of text with a fast line-by-line diff.",
      href: "/diff-checker",
      tone: "featured-tone-json",
    },
  ];

  const heroMetrics = [
    {
      label: "Tools",
      value: "100+",
      detail: (
        <>
          JSON, XML, HTML, TS, GraphQL, PHP and{" "}
          <Link href="/tools/all" style={{ color: "#8fb4ff", textDecoration: "underline" }}>
            more
          </Link>
        </>
      ),
    },
    {
      label: "Environment",
      value: "Zero install",
      detail: "Runs instantly directly in your browser",
    },
    {
      label: "Workflow",
      value: "All-in-one",
      detail: "Format, validate, encode, and diff seamlessly",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Website này hỗ trợ format những loại nào?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trang hỗ trợ 24 formatter gồm JSON, XML, HTML, YAML, JavaScript, TypeScript, Java, C#, GraphQL, Markdown, PHP và nhiều định dạng khác.",
        },
      },
      {
        "@type": "Question",
        name: "Có cần cài đặt gì để dùng công cụ không?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Không cần cài đặt thêm. Bạn chỉ cần dán nội dung, chọn formatter và bấm Format now.",
        },
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: spotlight.slice(0, 6).map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: tool.name,
        url: `${SITE_URL}/${tool.slug}`,
      },
    })),
  };

  return (
    <main className="page-wrap home-shell">
      <SiteHeader />

      <section className="hero home-hero">
        <div className="hero-layout home-hero-layout">
          <div className="hero-copy">
            <p className="badge home-badge">web-based toolkit</p>
            <p className="hero-command">$ open daxnoria.dev</p>
            <div className="typing-banner" aria-hidden="true">
              <span className="typing-banner-label">developer mode active</span>
              <span className="typing-line typing-line-one">init workflow</span>
              <span className="typing-line typing-line-two">format | encode | diff | inspect</span>
            </div>
            <h1>The ultimate online tools for your daily developer tasks.</h1>
            <p className="lead">
              An online toolkit to format, validate, encode, and manipulate data right in your browser.
              Everything is designed with a minimalist approach, instant processing speed, and tailored for developers.
            </p>

            <div className="hero-actions">
              <Link href="/tools/format" className="btn primary">
                Open Format
              </Link>
              <Link href="/text-count" className="btn">
                Try Text Count
              </Link>
            </div>

            <HomeToolSearch items={searchItems} />
          </div>

          <aside className="hero-metrics home-console" aria-label="Daxnoria highlights">
            <div className="console-window">
              <div className="console-topbar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <pre>{`const tools = [
  "format",
  "encode",
  "count",
  "timestamp",
  "pdf",
];

tools.forEach(openTool);`}</pre>
            </div>

            {heroMetrics.map((metric) => (
              <article key={metric.label}>
                <p>{metric.label}</p>
                <strong>{metric.value}</strong>
                <span>{metric.detail}</span>
              </article>
            ))}
          </aside>
        </div>
      </section>

      <section className="category-board" aria-labelledby="category-board-title">
        <div className="section-head category-head">
          <div>
            <p className="section-kicker">Tool matrix</p>
            <h2 id="category-board-title">Browse by stack</h2>
            <p>Quick jumps into the areas you use most: formatting, encode, web, and backend tools.</p>
          </div>
          <p className="category-head-command">$ open /tools</p>
        </div>

        <div className="category-board-grid">
          {homeCategories.map((category, index) => (
            <Link key={category.title} href={category.href} className={`category-tile ${category.tone}`}>
              <span className="category-index">0{index + 1}</span>
              <span className="category-glow" aria-hidden="true" />
              <div className="category-top">
                <span className="category-icon" aria-hidden="true">
                  <category.Icon size={20} strokeWidth={2} />
                </span>
                <div>
                  <p className="category-note">{category.note}</p>
                  <h3>{category.title}</h3>
                </div>
              </div>
              <p className="category-desc">{category.desc}</p>
              <div className="category-cta" aria-hidden="true">
                <span>View tools</span>
                <span className="category-arrow">-&gt;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="popular-grid" id="popular" aria-labelledby="popular-title">
        <div className="section-head">
          <p className="section-kicker">Top picks</p>
          <h2 id="popular-title">Our Most Popular Tools</h2>
          <p>Best picks for daily formatting and validation workflow.</p>
        </div>

        <div className="tool-cards">
          {spotlight.map((tool) => (
            <Link key={tool.id} href={`/${tool.slug}`} className="tool-card">
              <span className="card-icon" aria-hidden="true">
                {tool.id.slice(0, 2).toUpperCase()}
              </span>
              <p className="tool-tag">
                {["json", "xml"].includes(tool.id) ? "Formatter" : "Tool"}
              </p>
              <h3>{tool.name}</h3>
              <span>{tool.seoDescription}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="featured-grid featured-board" aria-labelledby="featured-title">
        <div className="section-head featured-head">
          <div>
            <p className="section-kicker">Curated stack</p>
            <h2 id="featured-title">Featured Tools</h2>
            <p>Curated picks with high usage and fast output quality.</p>
          </div>
          <p className="featured-head-command">$ open featured</p>
        </div>
        <div className="featured-cards">
          {featuredTools.map((tool, index) => (
            <Link
              key={tool.title}
              href={tool.href}
              className={`featured-card ${tool.tone}`}
              style={{ animationDelay: `${120 + index * 90}ms` }}
            >
              <div className="featured-card-top">
                <span className="featured-pill">{tool.pill}</span>
                <span className="featured-arrow" aria-hidden="true">
                  -&gt;
                </span>
              </div>
              <span className="featured-icon" aria-hidden="true">
                <span>{tool.icon}</span>
              </span>
              <div className="featured-copy">
                <h3>{tool.title}</h3>
                <p>{tool.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="seo-copy" aria-labelledby="why-title">
        <div className="seo-head">
          <div>
            <p className="section-kicker">Tool index</p>
            <h2 id="why-title">All tools directory</h2>
            <p>
              Each tool features a dedicated page to maintain a focused user experience for specific workflows and use cases.
            </p>
          </div>
          <div className="seo-stat" aria-label="Total tools">
            <strong>100+</strong>
            <span>Total tools</span>
          </div>
        </div>

        <ul className="formatter-directory">
          {FORMATTERS.map((formatter) => (
            <li key={formatter.id}>
              <Link href={`/${formatter.slug}`} className="formatter-link-card">
                <span className="formatter-initial" aria-hidden="true">
                  {formatter.name.slice(0, 1).toUpperCase()}
                </span>
                <span className="formatter-name">{formatter.name}</span>
                <span className="formatter-link-arrow" aria-hidden="true">
                  -&gt;
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "center" }}>
          <Link href="/tools/all" className="btn">
            View more tools
          </Link>
        </div>
      </section>

      <section className="seo-copy" aria-labelledby="keyword-hub-title">
        <div className="section-head">
          <p className="section-kicker">Keyword hub</p>
          <h2 id="keyword-hub-title">Guides for long-tail developer queries</h2>
          <p>
            Explore in-depth pages targeting practical searches such as AI tools for developers, JSON formatter
            workflows, and Unix timestamp converter use cases.
          </p>
        </div>

        <ul className="related-grid">
          <li>
            <Link href="/developer-tools-online">
              <span>Developer Tools Online</span>
              <small>Landing page -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/api-debugging-tools">
              <span>API Debugging Tools</span>
              <small>Landing page -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/blog/ai-tools-for-developers">
              <span>AI Tools For Developers</span>
              <small>Workflow guide -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/blog/json-formatter-best-practices">
              <span>JSON Formatter Best Practices</span>
              <small>Validation strategy -&gt;</small>
            </Link>
          </li>
          <li>
            <Link href="/blog/unix-timestamp-converter-use-cases">
              <span>Unix Timestamp Converter Use Cases</span>
              <small>Real-world debugging -&gt;</small>
            </Link>
          </li>
        </ul>
      </section>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />
    </main>
  );
}

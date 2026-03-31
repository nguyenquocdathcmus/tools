import Link from "next/link";
import { Braces, Code2, Globe, LayoutGrid } from "lucide-react";
import { FORMATTERS } from "@/lib/formatters";
import HomeToolSearch from "@/components/HomeToolSearch";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function HomePage() {
  const spotlight = FORMATTERS.slice(0, 8);
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
  ];

  const heroMetrics = [
    {
      label: "Supported formats",
      value: `${FORMATTERS.length}+`,
      detail: "JSON, XML, HTML, TS, GraphQL, PHP and more",
    },
    {
      label: "Setup",
      value: "0 install",
      detail: "Works instantly in browser",
    },
    {
      label: "Workflow",
      value: "Fast",
      detail: "Format, validate and minify in one place",
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

  return (
    <main className="page-wrap home-shell">
      <SiteHeader />

      <section className="hero home-hero">
        <div className="hero-layout home-hero-layout">
          <div className="hero-copy">
            <p className="badge home-badge">developer toolkit</p>
            <p className="hero-command">$ npm run dev</p>
            <div className="typing-banner" aria-hidden="true">
              <span className="typing-banner-label">coding mode active</span>
              <span className="typing-line typing-line-one">npm run dev</span>
              <span className="typing-line typing-line-two">format | encode | count | inspect</span>
            </div>
            <h1>Build, inspect, and ship text tools like a real dev console.</h1>
            <p className="lead">
              MyTools cho ban format, validate, minify va count text ngay tren trinh duyet theo mot phong cach
              quen thuoc cua lap trinh vien: gon, nhanh, ro rang.
            </p>

            <div className="hero-actions">
              <Link href="/tools/format" className="btn primary">
                Open Format
              </Link>
              <Link href="/tools/text-count" className="btn">
                Try Text Count
              </Link>
            </div>

            <HomeToolSearch items={searchItems} />
          </div>

          <aside className="hero-metrics home-console" aria-label="MyTools highlights">
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
          {spotlight.map((formatter) => (
            <Link key={formatter.id} href={`/${formatter.slug}`} className="tool-card">
              <span className="card-icon" aria-hidden="true">
                {formatter.id.slice(0, 2).toUpperCase()}
              </span>
              <p className="tool-tag">Formatter</p>
              <h3>{formatter.name}</h3>
              <span>{formatter.seoDescription}</span>
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
            <h2 id="why-title">All formatter pages</h2>
            <p>
              Mỗi công cụ có landing page riêng để tăng organic traffic cho long-tail keyword, đồng thời giữ
              trải nghiệm người dùng tập trung đúng use case.
            </p>
          </div>
          <div className="seo-stat" aria-label="Total formatter pages">
            <strong>{FORMATTERS.length}</strong>
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
      </section>

      <section className="premium" id="premium" aria-labelledby="premium-title">
        <p className="section-kicker">Premium plan</p>
        <h2 id="premium-title">Get more with Premium</h2>
        <p>Ad-free experience, unlimited usage and faster processing for heavy workflows.</p>
        <button type="button" className="btn primary">
          Upgrade now
        </button>
      </section>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </main>
  );
}

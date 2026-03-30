import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { FORMATTERS, type FormatterId } from "@/lib/formatters";
import { SITE_URL } from "@/lib/site";

type GroupKey = "all" | "format" | "data" | "web" | "code";

type GroupConfig = {
  title: string;
  description: string;
  tag: string;
  tone: "all" | "format" | "web" | "code";
  formatterIds?: Set<FormatterId>;
};

const GROUPS: Record<GroupKey, GroupConfig> = {
  all: {
    title: "All Tools",
    description: "Everything in one place for formatting, validation and developer productivity.",
    tag: "Formatter",
    tone: "all",
  },
  format: {
    title: "Format",
    description: "JSON, YAML, XML, SOAP and WSDL formatters for API payloads and integrations.",
    tag: "Format",
    tone: "format",
    formatterIds: new Set<FormatterId>(["json", "json5", "yaml", "xml", "soap", "wsdl"]),
  },
  data: {
    title: "Format",
    description: "JSON, YAML, XML, SOAP and WSDL formatters for API payloads and integrations.",
    tag: "Format",
    tone: "format",
    formatterIds: new Set<FormatterId>(["json", "json5", "yaml", "xml", "soap", "wsdl"]),
  },
  web: {
    title: "Web Tools",
    description: "HTML, CSS, JavaScript and TypeScript formatters for frontend workflows.",
    tag: "Web",
    tone: "web",
    formatterIds: new Set<FormatterId>([
      "html",
      "css",
      "javascript",
      "typescript",
      "babel",
      "angular",
      "vue",
      "less",
      "scss",
    ]),
  },
  code: {
    title: "Code Tools",
    description: "Java, C#, PHP and GraphQL tools for backend code and service logic.",
    tag: "Code",
    tone: "code",
    formatterIds: new Set<FormatterId>(["java", "csharp", "php", "graphql", "flow"]),
  },
};

const BADGE_LABELS: Partial<Record<FormatterId, string>> = {
  json: "{}",
  json5: "J5",
  xml: "XML",
  yaml: "YML",
  soap: "SOAP",
  wsdl: "WSDL",
  html: "HTML",
  css: "CSS",
  javascript: "JS",
  typescript: "TS",
  babel: "B",
  angular: "NG",
  vue: "VUE",
  less: "LESS",
  scss: "SCSS",
  java: "JAVA",
  csharp: "C#",
  php: "PHP",
  graphql: "GQL",
  flow: "FLOW",
};

type GroupPageProps = {
  params: Promise<{ group: string }>;
};

function getGroupTools(group: GroupKey) {
  const config = GROUPS[group];

  if (!config.formatterIds) {
    return FORMATTERS;
  }

  return FORMATTERS.filter((formatter) => config.formatterIds?.has(formatter.id));
}

export function generateStaticParams() {
  return Object.keys(GROUPS).map((group) => ({ group }));
}

export async function generateMetadata({ params }: GroupPageProps): Promise<Metadata> {
  const { group } = await params;
  const config = GROUPS[group as GroupKey];

  if (!config) {
    return {
      title: "Tools Group Not Found",
    };
  }

  const title = `${config.title} | MyTools`;
  const description = config.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/tools/${group}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/tools/${group}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function GroupToolsPage({ params }: GroupPageProps) {
  const { group } = await params;
  const groupKey = group as GroupKey;
  const config = GROUPS[groupKey];

  if (!config) {
    notFound();
  }

  const tools = getGroupTools(groupKey);
  const groupTheme = `group-hero tone-${config.tone}`;

  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />

      <section className={groupTheme}>
        <p className="badge">Dedicated tools group</p>
        <h1>{config.title}</h1>
        <p className="lead">{config.description}</p>
        <div className="group-hero-meta">
          <article>
            <p>Collection</p>
            <strong>{config.tag}</strong>
          </article>
          <article>
            <p>Available tools</p>
            <strong>{tools.length}</strong>
          </article>
          <article>
            <p>Use case</p>
            <strong>Format + Validate</strong>
          </article>
        </div>
      </section>

      <section className="category-results group-directory" aria-labelledby="group-title">
        <div className="section-head">
          <h2 id="group-title">{config.title}</h2>
          <p>{tools.length} tools available in this group.</p>
        </div>

        <div className="group-tool-grid">
          {tools.map((formatter) => (
            <Link key={formatter.id} href={`/${formatter.slug}`} className="group-tool-card">
              <span className="group-tool-badge" aria-hidden="true">
                {BADGE_LABELS[formatter.id] ?? formatter.name.slice(0, 2).toUpperCase()}
              </span>
              <p className="group-tool-tag">{config.tag}</p>
              <h3>{formatter.name}</h3>
              <p>{formatter.seoDescription}</p>
              <span className="group-tool-cta" aria-hidden="true">
                Open tool -&gt;
              </span>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";

type SearchItem = {
  id: string;
  name: string;
  slug: string;
};

type HomeToolSearchProps = {
  items: SearchItem[];
};

function normalize(value: string) {
  return value.toLowerCase().trim().replaceAll(/[^a-z0-9]+/g, "");
}

export default function HomeToolSearch({ items }: HomeToolSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const keywordRoutes = useMemo(
    () => ({
      format: "/tools/format",
      encode: "/encode",
      timestamp: "/timestamp",
      image: "/image",
      pdf: "/pdf",
      qrcode: "/qrcode",
      jwt: "/jwt-decoder",
      jwtdecoder: "/jwt-decoder",
      token: "/jwt-decoder",
      auth: "/jwt-decoder",
      diff: "/diff-checker",
      diffchecker: "/diff-checker",
      compare: "/diff-checker",
      textcount: "/text-count",
      text: "/text-count",
      wordcount: "/text-count",
      all: "/tools/all",
    }),
    [],
  );

  const quickTags = ["JSON", "XML", "JWT", "Diff", "Text Count", "PDF", "Encode"];

  const liveSuggestions = useMemo(() => {
    const normalized = normalize(query);

    if (!normalized) {
      return [];
    }

    const scored = items
      .map((item) => {
        const name = normalize(item.name);
        const id = normalize(item.id);
        const slug = normalize(item.slug);

        const exact = name === normalized || id === normalized || slug === normalized;
        const startsWith = name.startsWith(normalized) || id.startsWith(normalized) || slug.startsWith(normalized);
        const includes = name.includes(normalized) || id.includes(normalized) || slug.includes(normalized);

        const score = exact ? 3 : startsWith ? 2 : includes ? 1 : 0;
        return { item, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name))
      .slice(0, 6);

    return scored.map((entry) => entry.item);
  }, [items, query]);

  function searchTarget(rawQuery: string) {
    const normalizedQuery = normalize(rawQuery);

    if (!normalizedQuery) {
      return "/tools/all";
    }

    const directRoute = keywordRoutes[normalizedQuery as keyof typeof keywordRoutes];
    if (directRoute) {
      return directRoute;
    }

    const ranked = [...items].sort((a, b) => {
      const aName = normalize(a.name);
      const bName = normalize(b.name);

      const aExact =
        aName === normalizedQuery || normalize(a.id) === normalizedQuery || normalize(a.slug) === normalizedQuery;
      const bExact =
        bName === normalizedQuery || normalize(b.id) === normalizedQuery || normalize(b.slug) === normalizedQuery;

      if (aExact && !bExact) {
        return -1;
      }

      if (!aExact && bExact) {
        return 1;
      }

      const aStartsWith =
        aName.startsWith(normalizedQuery) ||
        normalize(a.id).startsWith(normalizedQuery) ||
        normalize(a.slug).startsWith(normalizedQuery);
      const bStartsWith =
        bName.startsWith(normalizedQuery) ||
        normalize(b.id).startsWith(normalizedQuery) ||
        normalize(b.slug).startsWith(normalizedQuery);

      if (aStartsWith && !bStartsWith) {
        return -1;
      }

      if (!aStartsWith && bStartsWith) {
        return 1;
      }

      return 0;
    });

    const hit = ranked.find((item) => {
      const name = normalize(item.name);
      const id = normalize(item.id);
      const slug = normalize(item.slug);
      return name.includes(normalizedQuery) || id.includes(normalizedQuery) || slug.includes(normalizedQuery);
    });

    return hit ? `/${hit.slug}` : null;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const target = searchTarget(query);
    if (!target) {
      setError("Khong tim thay cong cu phu hop. Thu tim: JSON, XML, TypeScript, PDF...");
      return;
    }

    router.push(target);
  }

  function handleQuickTag(tag: string) {
    setQuery(tag);
    setError("");
    const target = searchTarget(tag);

    if (target) {
      router.push(target);
    }
  }

  return (
    <section className="hero-search-shell" aria-label="Tool search panel">
      <form className="hero-search" role="search" aria-label="Tool search" onSubmit={handleSubmit}>
        <label className="hero-search-input-wrap" htmlFor="home-tool-search-input">
          <Search className="hero-search-icon" aria-hidden="true" size={18} strokeWidth={2.2} />
          <input
            id="home-tool-search-input"
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              if (error) {
                setError("");
              }
            }}
            aria-label="Search tools"
            placeholder="Tim cong cu: JSON, XML, PDF, Encode..."
            autoComplete="off"
          />
        </label>
        <button type="submit" className="btn primary hero-search-btn">
          <Search size={16} strokeWidth={2.4} aria-hidden="true" />
          <span>Search</span>
        </button>
      </form>

      <div className="hero-search-meta" aria-label="Quick suggestions">
        <div className="hero-search-pills">
          {quickTags.map((tag) => (
            <button key={tag} type="button" onClick={() => handleQuickTag(tag)}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {query.trim() && liveSuggestions.length > 0 ? (
        <div className="hero-search-results" aria-live="polite">
          <p>
            <Sparkles size={14} aria-hidden="true" />
            Goi y nhanh
          </p>
          <ul>
            {liveSuggestions.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    setQuery(item.name);
                    setError("");
                    router.push(`/${item.slug}`);
                  }}
                >
                  <span>{item.name}</span>
                  <small>/{item.slug}</small>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {error ? <p className="error">{error}</p> : null}
    </section>
  );
}

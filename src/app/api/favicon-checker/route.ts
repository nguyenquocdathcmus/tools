import { NextRequest, NextResponse } from "next/server";

type DiscoveredIcon = {
  url: string;
  rel: string;
  source: "html" | "manifest" | "default";
  sizes: string;
  type: string;
  purpose: string;
};

type ProbedIcon = DiscoveredIcon & {
  status: number | null;
  ok: boolean;
  contentType: string;
  contentLength: number | null;
};

const MAX_URL_LENGTH = 2048;

function normalizeInputUrl(input: string) {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error("Please provide a website URL.");
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = new URL(withProtocol);

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only http and https URLs are supported.");
  }

  return url;
}

function uniqueByUrl(icons: DiscoveredIcon[]) {
  const map = new Map<string, DiscoveredIcon>();

  for (const icon of icons) {
    const key = icon.url;
    if (!map.has(key)) {
      map.set(key, icon);
    }
  }

  return [...map.values()];
}

function parseAttrs(tag: string) {
  const attrs: Record<string, string> = {};
  const attrRegex = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(["'])(.*?)\2/g;

  for (const match of tag.matchAll(attrRegex)) {
    const [, key, , value] = match;
    attrs[key.toLowerCase()] = value;
  }

  return attrs;
}

function extractHtmlIcons(html: string, baseUrl: URL) {
  const icons: DiscoveredIcon[] = [];
  const linkRegex = /<link\b[^>]*>/gi;

  for (const tagMatch of html.matchAll(linkRegex)) {
    const tag = tagMatch[0];
    const attrs = parseAttrs(tag);
    const rel = (attrs.rel || "").toLowerCase();

    if (!rel) {
      continue;
    }

    const isIconRel =
      rel.includes("icon") || rel.includes("apple-touch-icon") || rel.includes("mask-icon");

    if (!isIconRel) {
      continue;
    }

    const href = attrs.href;
    if (!href) {
      continue;
    }

    try {
      const iconUrl = new URL(href, baseUrl).toString();
      icons.push({
        url: iconUrl,
        rel,
        source: "html",
        sizes: attrs.sizes || "",
        type: attrs.type || "",
        purpose: attrs.purpose || "",
      });
    } catch {
      // Ignore malformed icon URLs from source HTML.
    }
  }

  return icons;
}

function findManifestUrl(html: string, baseUrl: URL) {
  const linkRegex = /<link\b[^>]*>/gi;

  for (const tagMatch of html.matchAll(linkRegex)) {
    const tag = tagMatch[0];
    const attrs = parseAttrs(tag);
    const rel = (attrs.rel || "").toLowerCase();

    if (!rel || !rel.includes("manifest") || !attrs.href) {
      continue;
    }

    try {
      return new URL(attrs.href, baseUrl).toString();
    } catch {
      return null;
    }
  }

  return null;
}

function isValidIconCandidate(icon: unknown): icon is Record<string, unknown> {
  if (!icon || typeof icon !== "object") {
    return false;
  }

  const candidate = icon as Record<string, unknown>;
  return typeof candidate.src === "string" && candidate.src.length > 0;
}

async function extractManifestIcons(manifestUrl: string) {
  const response = await fetch(manifestUrl, {
    method: "GET",
    redirect: "follow",
    headers: { "user-agent": "Mozilla/5.0 (compatible; MyToolsFaviconChecker/1.0)" },
  });

  if (!response.ok) {
    return [] as DiscoveredIcon[];
  }

  const text = await response.text();
  const parsed = JSON.parse(text) as { icons?: unknown[] };

  if (!parsed.icons || !Array.isArray(parsed.icons)) {
    return [] as DiscoveredIcon[];
  }

  const base = new URL(manifestUrl);
  const output: DiscoveredIcon[] = [];

  for (const icon of parsed.icons) {
    if (!isValidIconCandidate(icon)) {
      continue;
    }

    const iconSource = icon as Record<string, unknown>;

    try {
      const url = new URL(iconSource.src as string, base).toString();
      output.push({
        url,
        rel: "manifest icon",
        source: "manifest",
        sizes: typeof iconSource.sizes === "string" ? iconSource.sizes : "",
        type: typeof iconSource.type === "string" ? iconSource.type : "",
        purpose: typeof iconSource.purpose === "string" ? iconSource.purpose : "",
      });
    } catch {
      // Ignore malformed icon URLs from manifest.
    }
  }

  return output;
}

function buildDefaultCandidates(baseUrl: URL) {
  const roots = [
    { path: "/favicon.ico", rel: "default favicon", type: "image/x-icon" },
    { path: "/favicon.png", rel: "default png", type: "image/png" },
    { path: "/apple-touch-icon.png", rel: "apple touch", type: "image/png" },
  ];

  return roots.map((root) => ({
    url: new URL(root.path, baseUrl).toString(),
    rel: root.rel,
    source: "default" as const,
    sizes: "",
    type: root.type,
    purpose: "",
  }));
}

async function probeIcon(icon: DiscoveredIcon): Promise<ProbedIcon> {
  try {
    const response = await fetch(icon.url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 (compatible; MyToolsFaviconChecker/1.0)" },
    });

    const type = response.headers.get("content-type") || icon.type || "";
    const contentLengthRaw = response.headers.get("content-length");
    const contentLength = contentLengthRaw ? Number.parseInt(contentLengthRaw, 10) : null;

    return {
      ...icon,
      status: response.status,
      ok: response.ok,
      contentType: type,
      contentLength: Number.isFinite(contentLength ?? NaN) ? contentLength : null,
    };
  } catch {
    return {
      ...icon,
      status: null,
      ok: false,
      contentType: icon.type || "",
      contentLength: null,
    };
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const payload = (await request.json()) as Partial<{ url: string }>;
    const inputUrl = typeof payload.url === "string" ? payload.url.trim() : "";

    if (!inputUrl || inputUrl.length > MAX_URL_LENGTH) {
      return NextResponse.json(
        { error: "Invalid URL. Please enter a valid website address." },
        { status: 400 },
      );
    }

    const normalized = normalizeInputUrl(inputUrl);

    const homepageResponse = await fetch(normalized.toString(), {
      method: "GET",
      redirect: "follow",
      headers: { "user-agent": "Mozilla/5.0 (compatible; MyToolsFaviconChecker/1.0)" },
    });

    if (!homepageResponse.ok) {
      return NextResponse.json(
        {
          error: `Unable to load homepage (${homepageResponse.status}). Please verify the URL.`,
        },
        { status: 400 },
      );
    }

    const finalUrl = homepageResponse.url;
    const baseUrl = new URL(finalUrl);
    const html = await homepageResponse.text();
    const htmlSlice = html.slice(0, 700_000);

    const htmlIcons = extractHtmlIcons(htmlSlice, baseUrl);
    const manifestUrl = findManifestUrl(htmlSlice, baseUrl);
    const manifestIcons = manifestUrl ? await extractManifestIcons(manifestUrl).catch(() => []) : [];
    const defaultIcons = buildDefaultCandidates(baseUrl);

    const discovered = uniqueByUrl([...htmlIcons, ...manifestIcons, ...defaultIcons]);
    const probed = await Promise.all(discovered.map((icon) => probeIcon(icon)));

    const sortedIcons = probed.sort((a, b) => {
      if (a.ok === b.ok) {
        return a.url.localeCompare(b.url);
      }

      return a.ok ? -1 : 1;
    });

    return NextResponse.json({
      inputUrl,
      normalizedUrl: finalUrl,
      homepageStatus: homepageResponse.status,
      iconCount: sortedIcons.length,
      icons: sortedIcons,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to check favicon.",
      },
      { status: 500 },
    );
  }
}

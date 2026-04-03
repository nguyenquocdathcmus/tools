import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import { FORMATTERS } from "@/lib/formatters";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages = [
    { path: "", priority: 1 },
    { path: "/request-feature", priority: 0.7 },
    { path: "/encode", priority: 0.8 },
    { path: "/text-count", priority: 0.8 },
    { path: "/timestamp", priority: 0.8 },
    { path: "/image", priority: 0.8 },
    { path: "/pdf", priority: 0.8 },
    { path: "/qrcode", priority: 0.8 },
    { path: "/jwt-decoder", priority: 0.8 },
    { path: "/diff-checker", priority: 0.8 },
    { path: "/json-validator", priority: 0.8 },
    { path: "/json-minify", priority: 0.8 },
    { path: "/base64-encode", priority: 0.8 },
    { path: "/base64-decode", priority: 0.8 },
    { path: "/url-encode", priority: 0.8 },
    { path: "/url-decode", priority: 0.8 },
    { path: "/timestamp-converter", priority: 0.8 },
    { path: "/unix-time-to-date", priority: 0.8 },
    { path: "/tools/all", priority: 0.7 },
    { path: "/tools", priority: 0.85 },
    { path: "/tools/format", priority: 0.7 },
    { path: "/tools/data", priority: 0.7 },
    { path: "/tools/web", priority: 0.7 },
    { path: "/tools/code", priority: 0.7 },
    { path: "/blog", priority: 0.75 },
    { path: "/developer-tools-online", priority: 0.85 },
    { path: "/api-debugging-tools", priority: 0.85 },
    { path: "/search", priority: 0.6 },
  ];

  const base = staticPages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: page.priority,
  }));

  const formatterPages = FORMATTERS.map((formatter) => ({
    url: `${SITE_URL}/${formatter.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...base, ...formatterPages, ...blogPages];
}

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Markdown articles committed by the Soch SEO pipeline (n8n gkNsOpDjnRF1SNGe)
// as content/blog/<slug>.md, with the featured image at public/blog/<slug>.<ext>.
// They live at /articles here, because /blog is the Substack writing feed.

export type Article = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  body: string;
  readingTime: number;
};

const ARTICLES_DIR = path.join(process.cwd(), "content/blog");
const WORDS_PER_MINUTE = 200;
const SLUG_PATTERN = /^[a-z0-9-]+$/;

/**
 * Frontmatter date as an ISO `YYYY-MM-DD` string.
 *
 * The pipeline writes `date: 2026-09-17` unquoted, so js-yaml hands gray-matter
 * a real Date object and `String(...)` on that yields "Wed Sep 17 2026 …".
 * Sorting those as strings orders posts by weekday name, so normalise here.
 */
function isoDate(value: unknown): string {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? "" : value.toISOString().slice(0, 10);
  }
  if (typeof value !== "string" && typeof value !== "number") return "";
  const text = String(value).trim();
  if (!text) return "";
  if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10);
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? text : parsed.toISOString().slice(0, 10);
}

function readingTime(body: string): number {
  const words = body.replace(/[#>*`_-]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Articles newest first; undated last, then by slug so builds are deterministic. */
export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const articles = fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: String(data.slug ?? file.replace(/\.md$/, "")),
        title: String(data.title ?? ""),
        date: isoDate(data.date),
        category: String(data.category ?? ""),
        excerpt: String(data.excerpt ?? ""),
        image: String(data.image ?? ""),
        body: content.trim(),
        readingTime: readingTime(content),
      };
    });

  return articles.sort((a, b) => {
    if (a.date !== b.date) {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date < b.date ? 1 : -1;
    }
    return a.slug.localeCompare(b.slug);
  });
}

export function getArticle(slug: string): Article | undefined {
  if (!SLUG_PATTERN.test(slug)) return undefined;
  return getAllArticles().find((article) => article.slug === slug);
}

export function formatArticleDate(raw: string): string {
  if (!raw) return "";
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;
  return parsed.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

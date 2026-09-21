import { getAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/seo";

// Rebuilt at build time, which is every deploy — so every new post.
export const dynamic = "force-static";

/**
 * llms.txt: a plain-text map of the site for language models (llmstxt.org).
 * What the site is, the pages that explain it, and every post with its summary.
 */
export function GET() {
  const posts = getAllArticles()
    .map((p) => `- [${p.title}](${SITE_URL}/articles/${p.slug})${p.excerpt ? `: ${p.excerpt}` : ""}`)
    .join("\n");

  const body = `# Rizwan Mahmood

> Rizwan Mahmood helps business owners think clearly enough that automation actually works, and builds the systems that prove it. Operator and builder, based in Tallinn.

## Pages

- [About](${SITE_URL}/about)
- [Services](${SITE_URL}/services)
- [Case studies](${SITE_URL}/case-studies)
- [Articles](${SITE_URL}/articles)
- [Guides](${SITE_URL}/guides)
- [Writing](${SITE_URL}/writing)
- [Booking](${SITE_URL}/booking)

## Posts

${posts}
`;

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}

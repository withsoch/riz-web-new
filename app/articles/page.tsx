import Link from "next/link";
import type { Metadata } from "next";
import AnimateIn from "@/components/AnimateIn";
import { ArticleCardFeatured, ArticleCardSmall } from "@/components/ArticleCards";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles · Rizwan Mahmood",
  description:
    "Working notes on operations, AI and the systems behind them. Longer pieces live on the writing page.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  const [featured, ...gridArticles] = articles;

  return (
    <>
      {/* Page head, on the tinted band, so the white card section starts clean. */}
      <section style={{ background: "var(--cream)", borderBottom: "1px solid var(--line)" }}>
        <div className="max-w-site pt-28 pb-12 lg:pt-32 lg:pb-16">
          <AnimateIn>
            <p className="m-0 mb-3 font-mono text-14 tracking-[0.08em] text-brand uppercase">Articles</p>
            <h1
              className="m-0 mb-4 font-medium text-ink"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 1.5rem + 3vw, 3.7rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.018em",
              }}
            >
              Notes on ops, AI and the systems behind them.
            </h1>
            <p className="m-0 max-w-[60ch] text-16 leading-relaxed text-muted">
              Shorter working notes. The longer, more personal pieces are on the{" "}
              <Link href="/blog" className="text-brand">
                writing page
              </Link>
              .
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--bg)" }}>
        <div className="max-w-site">
          {articles.length === 0 ? (
            <p className="m-0 text-16 text-muted">Nothing here yet. Check back shortly.</p>
          ) : (
            <>
              <AnimateIn>
                <ArticleCardFeatured post={featured} />
              </AnimateIn>

              {gridArticles.length > 0 && (
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {gridArticles.map((article, i) => (
                    // Stagger each row of three left to right, and reset the
                    // delay per row so later rows do not compound.
                    <AnimateIn key={article.slug} delay={(i % 3) * 80} className="h-full">
                      <ArticleCardSmall post={article} />
                    </AnimateIn>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

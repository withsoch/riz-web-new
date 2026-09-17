import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticles, formatArticleDate } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles · Rizwan Mahmood",
  description:
    "Working notes on operations, AI and the systems behind them. Longer pieces live on the writing page.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <section className="ar-index">
      <style>{`
        .ar-index {
          padding: 112px 0;
          background: #F5EFE0;
        }
        .ar-wrap {
          max-width: 1040px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .ar-eyebrow {
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.875rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--coral);
          margin: 0 0 0.75rem;
        }
        .ar-title {
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: clamp(2.05rem, 1.4rem + 2.3vw, 3.1rem);
          line-height: 1.06;
          letter-spacing: -0.014em;
          color: var(--ink);
          margin: 0 0 1rem;
        }
        .ar-lede {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--muted);
          max-width: 60ch;
          margin: 0 0 3rem;
        }
        .ar-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 28px;
        }
        .ar-card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: var(--radius-card);
          overflow: hidden;
          text-decoration: none;
          transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease);
        }
        .ar-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        .ar-card-img {
          aspect-ratio: 16 / 9;
          width: 100%;
          object-fit: cover;
          display: block;
          background: var(--cream);
        }
        .ar-card-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 24px;
        }
        .ar-pill {
          align-self: flex-start;
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--coral);
          background: var(--peach);
          border-radius: var(--radius-chip);
          padding: 4px 12px;
        }
        .ar-card-title {
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: 1.25rem;
          line-height: 1.3;
          color: var(--ink);
          margin: 0;
        }
        .ar-card-excerpt {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--muted);
          margin: 0;
        }
        .ar-card-meta {
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.8125rem;
          color: var(--faint);
          margin-top: auto;
          padding-top: 6px;
        }
        .ar-empty {
          font-size: 1.0625rem;
          color: var(--muted);
        }
        @media (max-width: 640px) {
          .ar-index { padding: 64px 0; }
          .ar-wrap { padding: 0 24px; }
        }
      `}</style>

      <div className="ar-wrap">
        <p className="ar-eyebrow">Articles</p>
        <h1 className="ar-title">Notes on ops, AI and the systems behind them.</h1>
        <p className="ar-lede">
          Shorter working notes. The longer, more personal pieces are on the{" "}
          <Link href="/blog" style={{ color: "var(--coral)" }}>
            writing page
          </Link>
          .
        </p>

        {articles.length === 0 ? (
          <p className="ar-empty">Nothing here yet. Check back shortly.</p>
        ) : (
          <div className="ar-grid">
            {articles.map((article) => (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="ar-card">
                {article.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="ar-card-img" src={article.image} alt={article.title} loading="lazy" />
                )}
                <div className="ar-card-body">
                  {article.category && <span className="ar-pill">{article.category}</span>}
                  <h2 className="ar-card-title">{article.title}</h2>
                  {article.excerpt && <p className="ar-card-excerpt">{article.excerpt}</p>}
                  <p className="ar-card-meta">
                    {formatArticleDate(article.date)} · {article.readingTime} min read
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

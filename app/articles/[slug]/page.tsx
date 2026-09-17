import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllArticles, getArticle, formatArticleDate } from "@/lib/articles";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} · Rizwan Mahmood`,
    description: article.excerpt || undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      type: "article",
      images: article.image ? [article.image] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <section className="ap-detail">
      <style>{`
        .ap-detail {
          padding: 112px 0;
          background: #F5EFE0;
        }
        .ap-wrap {
          max-width: 760px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .ap-breadcrumb {
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.875rem;
          letter-spacing: 0.04em;
          color: var(--muted);
          margin-bottom: 1.25rem;
        }
        .ap-breadcrumb a {
          color: var(--coral);
          text-decoration: none;
        }
        .ap-pill {
          display: inline-block;
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--coral);
          background: var(--peach);
          border-radius: var(--radius-chip);
          padding: 4px 12px;
          margin-bottom: 1rem;
        }
        .ap-title {
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: clamp(2.05rem, 1.4rem + 2.3vw, 3.1rem);
          line-height: 1.06;
          letter-spacing: -0.014em;
          color: var(--ink);
          margin: 0 0 1.25rem;
        }
        .ap-meta {
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 1rem;
          color: var(--muted);
          margin-bottom: 1.5rem;
        }
        .ap-dot { opacity: 0.5; }
        .ap-hero {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          border-radius: var(--radius-card);
          border: 1px solid var(--line);
          display: block;
          margin-bottom: 2rem;
        }
        .ap-divider {
          height: 1px;
          background: var(--line);
          margin-bottom: 2rem;
        }
        .ap-prose {
          font-size: 1.0625rem;
          line-height: 1.75;
          color: var(--body);
        }
        .ap-prose > p { margin: 0 0 1.35rem; }
        .ap-prose h2 {
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: clamp(1.5rem, 1.2rem + 1vw, 1.9rem);
          line-height: 1.2;
          color: var(--ink);
          margin: 2.75rem 0 1rem;
        }
        .ap-prose h3 {
          font-family: var(--font-fraunces), serif;
          font-weight: 600;
          font-size: 1.25rem;
          color: var(--ink);
          margin: 2rem 0 0.75rem;
        }
        .ap-prose ul, .ap-prose ol { margin: 0 0 1.35rem; padding-left: 1.25rem; }
        .ap-prose li { margin-bottom: 0.6rem; }
        .ap-prose strong { color: var(--ink); font-weight: 650; }
        .ap-prose a { color: var(--coral); text-decoration: none; border-bottom: 1px solid rgba(255,92,53,0.35); }
        .ap-prose a:hover { border-bottom-color: var(--coral); }
        .ap-prose img {
          width: 100%;
          border-radius: var(--radius-card);
          border: 1px solid var(--line);
          display: block;
          margin: 2rem 0 0.75rem;
        }
        /* The pipeline writes an italic caption line straight after an image. */
        .ap-prose p > em:only-child {
          display: block;
          font-family: var(--font-geist-mono), 'Geist Mono', monospace;
          font-size: 0.875rem;
          font-style: normal;
          color: var(--faint);
          margin-top: -0.5rem;
          margin-bottom: 2rem;
        }
        .ap-prose blockquote {
          margin: 2rem 0;
          padding: 0.25rem 0 0.25rem 1.25rem;
          border-left: 3px solid var(--coral);
          color: var(--muted);
        }
        .ap-prose table { width: 100%; border-collapse: collapse; margin: 0 0 1.75rem; font-size: 0.95rem; }
        .ap-prose th, .ap-prose td { border: 1px solid var(--line); padding: 10px 12px; text-align: left; }
        .ap-prose th { background: var(--cream); color: var(--ink); }
        .ap-cta {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--line);
          text-align: center;
        }
        @media (max-width: 640px) {
          .ap-detail { padding: 64px 0; }
          .ap-wrap { padding: 0 24px; }
        }
      `}</style>

      <div className="ap-wrap">
        <div className="ap-breadcrumb">
          <Link href="/articles">Articles</Link> <span className="ap-dot">/</span> {article.category || "Note"}
        </div>

        {article.category && <span className="ap-pill">{article.category}</span>}

        <h1 className="ap-title">{article.title}</h1>

        <div className="ap-meta">
          {formatArticleDate(article.date)} <span className="ap-dot">·</span> {article.readingTime} min read
        </div>

        {article.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="ap-hero" src={article.image} alt={article.title} />
        )}

        <div className="ap-divider" />

        <div className="ap-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
        </div>

        <div className="ap-cta">
          <Link href="/booking" className="btn-coral">
            Have a chat with me
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AnimateIn from "@/components/AnimateIn";
import { ArticleImage } from "@/components/ArticleCards";
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
    <>
      {/* Split hero, per the blog post hero spec: text left, contained image
          right, on a tinted band with a hairline handing off to the white
          body below. The top padding clears the fixed navbar. */}
      <section className="border-b border-line bg-mist">
        <div className="max-w-site grid grid-cols-1 items-center gap-10 pt-28 pb-10 sm:pb-12 lg:grid-cols-2 lg:gap-14 lg:pt-32 lg:pb-14">
          <AnimateIn>
            <div className="flex max-w-2xl flex-col gap-4">
              {article.category && <span className="eyebrow w-fit">{article.category}</span>}
              {/* Deliberately the h2 scale: the post title carries the same
                  weight as an h2 elsewhere on the site, not a size of its own. */}
              <h1 className="text-h2">{article.title}</h1>
              <div className="flex items-center gap-2 text-14 text-slate">
                <span>{formatArticleDate(article.date)}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{article.readingTime} min read</span>
              </div>
            </div>
          </AnimateIn>

          {article.image && (
            <AnimateIn delay={100}>
              {/* The hero image carries a resting shadow: it is a static
                  visual, not an interactive card. */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-line shadow-card">
                <ArticleImage
                  src={article.image}
                  alt={article.title}
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
            </AnimateIn>
          )}
        </div>
      </section>

      <section className="ap-body">
        <style>{`
        .ap-body {
          padding: 72px 0 96px;
          background: var(--bg);
        }
        .ap-wrap {
          max-width: 760px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .ap-prose {
          font-size: 1.0625rem;
          line-height: 1.75;
          color: var(--body);
        }
        .ap-prose > p { margin: 0 0 1.35rem; }
        .ap-prose h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.5rem, 1.2rem + 1vw, 1.9rem);
          line-height: 1.2;
          color: var(--ink);
          margin: 2.75rem 0 1rem;
        }
        .ap-prose h3 {
          font-family: var(--font-display);
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
        /* The pipeline writes an italic caption line straight after an image,
           and a photo credit line in the same shape at the end of the post.
           Both read as small mono type; only a real caption tucks up under
           its image, so the credit keeps normal paragraph spacing. */
        .ap-prose p > em:only-child {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.875rem;
          font-style: normal;
          line-height: 1.5;
          color: var(--faint);
        }
        .ap-prose p:has(> img) { margin: 0; }
        .ap-prose p:has(> img) + p > em:only-child {
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
        .ap-foot {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--line);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
        }
        .ap-back {
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: var(--coral);
          text-decoration: none;
        }
        @media (max-width: 640px) {
          .ap-body { padding: 56px 0 72px; }
          .ap-wrap { padding: 0 24px; }
          .ap-foot { justify-content: flex-start; }
        }
      `}</style>

        <div className="ap-wrap">
          <div className="ap-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
          </div>

          <div className="ap-foot">
            <Link href="/articles" className="ap-back">
              &larr; All articles
            </Link>
            <Link href="/booking" className="btn-coral">
              Have a chat with me
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

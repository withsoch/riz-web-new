import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import { formatArticleDate } from "@/lib/articles";

/**
 * Cards for /articles, following the blog listing design spec: one large
 * featured card over a grid of small horizontal ones, sharing one card
 * treatment. Flat with a hairline border at rest; the shadow and the darker
 * border only appear on hover.
 */

/**
 * Featured images are committed into this repo by the SEO pipeline, so they
 * are local paths and `next/image` handles them. A remote URL would hard-fail
 * the component unless its host is in next.config remotePatterns, so those
 * fall back to a plain <img> rather than taking the page down.
 */
export function ArticleImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (src.startsWith("/")) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}

export function CategoryPill({ category }: { category: string }) {
  return <span className="eyebrow">{category}</span>;
}

export function ArticleCardFeatured({ post }: { post: Article }) {
  return (
    <Link
      href={`/articles/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-[18px] border border-line bg-white no-underline transition-all duration-200 hover:border-ink/20 hover:shadow-card lg:flex-row"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-mist lg:aspect-auto lg:min-h-[30rem] lg:w-[52%]">
        {post.image && (
          <ArticleImage
            src={post.image}
            alt={post.title}
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-4 p-8 sm:p-10 lg:p-12">
        {post.category && <CategoryPill category={post.category} />}
        <h2 className="text-h3 transition-colors group-hover:text-brand">{post.title}</h2>
        {post.excerpt && <p className="m-0 line-clamp-3 text-slate">{post.excerpt}</p>}
        <span className="article-card-meta" style={{ fontSize: 16 }}>
          {formatArticleDate(post.date)} · {post.readingTime} min read
        </span>
      </div>
    </Link>
  );
}

export function ArticleCardSmall({ post }: { post: Article }) {
  return (
    <Link
      href={`/articles/${post.slug}`}
      className="group flex h-full items-stretch gap-4 overflow-hidden rounded-[18px] border border-line bg-white p-3 no-underline transition-all duration-200 hover:border-ink/20 hover:shadow-card"
    >
      <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-[12px] bg-mist sm:w-28">
        {post.image && (
          <ArticleImage
            src={post.image}
            alt={post.title}
            sizes="120px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 py-1 pr-2">
        {post.category && <CategoryPill category={post.category} />}
        <h3 className="article-card-title line-clamp-2 transition-colors group-hover:text-brand">
          {post.title}
        </h3>
        <span className="article-card-meta">{formatArticleDate(post.date)}</span>
      </div>
    </Link>
  );
}

"use client";
import { useEffect, useState } from "react";
import type { Heading } from "@/lib/articles";

/**
 * "In this article" rail, the same one the other Soch blogs carry. Sticks to
 * the left of the article on lg and up, clearing the fixed navbar, and stacks
 * above the article below that. Entries are the post's own `##` headings.
 *
 * The current section is highlighted as you read: the last heading whose top
 * has passed the navbar wins, so the rail always marks where you are rather
 * than what is merely on screen.
 */
export function ArticleToc({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    const pick = () => {
      let current = headings[0].id;
      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 140) current = heading.id;
      }
      setActiveId(current);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        pick();
      });
    };

    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="ar-toc">
      <style>{`
        .ar-toc { margin-bottom: 2.5rem; }
        /* Sized to match the rail on the other Soch blogs, measured rather
           than read off their classes: label 14px/600 at 0.16em tracking,
           entries 16px on 22px, both in the body face. */
        .ar-toc-label {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--faint);
          margin: 0;
        }
        .ar-toc-list {
          list-style: none;
          margin: 1.25rem 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
        }
        .ar-toc-list li { border-top: 1px solid var(--line); }
        .ar-toc-list li:first-child { border-top: 0; }
        .ar-toc-list a {
          display: block;
          padding: 12px 0;
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 400;
          line-height: 22px;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s var(--ease);
        }
        .ar-toc-list a:hover { color: var(--coral); }
        .ar-toc-list a[data-active="true"] { color: var(--ink); font-weight: 500; }
        @media (min-width: 1024px) {
          .ar-toc {
            position: sticky;
            top: 112px;
            align-self: start;
            max-height: calc(100vh - 10rem);
            overflow-y: auto;
            margin-bottom: 0;
            padding-right: 0.5rem;
          }
        }
      `}</style>
      <nav aria-labelledby="article-toc-heading">
        <h2 id="article-toc-heading" className="ar-toc-label">
          In this article
        </h2>
        <ul className="ar-toc-list">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a href={`#${heading.id}`} data-active={heading.id === activeId}>
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

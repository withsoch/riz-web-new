"use client";
import { useRef, useState } from "react";
import AnimateIn from "@/components/AnimateIn";

export type Testimonial = {
  id: string;
  name: string;
  company: string;
  /** Shown under the quote, after the name. */
  roleLine: string;
  /** Second line on the photo panel, e.g. the client's sector. */
  industry: string;
  /** Meta line above the proof block, joined with " · ". */
  meta: string[];
  /** Headline numbers. A slide shows these or `hats`, not both. */
  metrics?: { value: string; label: string }[];
  /** The roles a client says Riz filled, shown as chips when there are no metrics. */
  hats?: string[];
  /** Pull quote shown on the slide. Verbatim from the client. */
  quote: string;
  /** Full testimonial, one string per paragraph, behind "Read the full testimonial". */
  fullQuote?: string[];
  initials: string;
  /** Photo panel colour, also the fallback when `image` fails to load. */
  accent: string;
  /** Rooted at public/. */
  image?: string;
  /** True until this is swapped for a real Riz client. Not shown in the UI - internal tracking only. */
  isPlaceholder?: boolean;
};

// Biola and Kaitlin are real. Gaia and Shahzad are Social Catalyst clients
// carried over as stand-ins (quotes and numbers are about LinkedIn work, not
// Riz's) - swap them for Riz's own clients.
export const testimonials: Testimonial[] = [
  {
    id: "biola-babawale",
    name: "Biola Babawale",
    company: "Cycle Together",
    roleLine: "Founder, Cycle Together",
    industry: "Sport, Wellness & Community",
    meta: ["United Kingdom", "Fractional COO"],
    hats: [
      "Fractional COO",
      "Chief of Staff",
      "HR",
      "2IC",
      "CFO",
      "Product Manager",
      "Thought Partner",
      "AI Strategist",
    ],
    quote:
      "Riz has completely transformed the way I look at my business and how we operate day-to-day. He brought in a level of structure, clarity, and confidence that I didn’t realize we were missing.",
    fullQuote: [
      "Riz is your Fractional COO, part Chief of Staff, part HR, part 2IC, part CFO, part Product Manager, part Thought Partner and part AI Strategist. Riz has completely transformed the way I look at my business and how we operate day-to-day. Before working with him, I often felt stuck in the details constantly juggling hiring, onboarding, and internal systems while never feeling fully in control of them. He brought in a level of structure, clarity, and confidence that I didn’t realize we were missing. From the very beginning, he made what felt complicated and overwhelming suddenly feel clear, simple, and achievable.",
      "What makes Riz stand out is not just his expertise, but the way he delivers it. He has an incredible ability to listen deeply, understand the nuances of how we work, and then design solutions that feel like they were built exactly for us. Nothing ever felt off-the-shelf or generic. Every process, framework, and tool he introduced was thoughtful, practical, and immediately useful with a clear link back to the bigger picture of where we want to go as a business.",
      "I also appreciate how empowering Riz is. He doesn’t just hand over systems and expect us to figure them out. He takes the time to walk through the ‘why’ behind every step, ensuring that I, and my team, feel confident using them long after his direct involvement. This means that instead of becoming dependent on him, we’ve grown stronger and more capable as an organization. That empowerment is priceless.",
      "Another thing I value deeply is his ability to balance strategic vision with hands-on execution. Some consultants are great at big ideas but never make them practical; others are great at execution but don’t connect it to strategy. Riz does both. He can zoom out to help me think long-term and then zoom in to design a process that works seamlessly today. That range is rare, and it’s made a massive difference in how we make decisions and move forward.",
      "On a personal level, Riz is a joy to work with. He communicates with clarity and warmth, is proactive in anticipating challenges, and always brings solutions to the table rather than problems. His calm, positive energy makes even the most complex conversations feel manageable. Every interaction leaves me feeling lighter, clearer, and more motivated.",
      "Working with Riz isn’t just about improving operations, it’s about transforming the way you lead and experience your own business. He helps you see possibilities you might have missed, simplifies challenges you thought were too complex, and gives you the confidence to grow without burning out or losing sight of your values.",
      "If you’re a founder or business owner who wants to build a company that scales sustainably while staying true to what matters most, I cannot recommend Riz enough. His blend of expertise, practicality, and genuine care is exceptional. Partnering with him has been one of the best investments I’ve made in both myself and my business.",
    ],
    initials: "BB",
    accent: "#1f8a66",
    image: "/images/testimonials/biola-babawale.jpg",
  },
  {
    id: "gaia-ferrero",
    name: "Gaia Ferrero",
    company: "Byzantine",
    roleLine: "Founder, Byzantine",
    industry: "Strategy & Advisory",
    meta: ["Europe", "12 weeks", "LinkedIn Management"],
    metrics: [
      { value: "100%", label: "Posting consistency maintained" },
      { value: "4×", label: "Growth in profile views within 60 days" },
      { value: "12+", label: "Qualified inbound conversations in 90 days" },
    ],
    quote:
      "I knew what good LinkedIn looked like. I just couldn't make it happen alongside everything else. Handing it to Social Catalyst was the right call. Within a few weeks it felt like my profile finally sounded like me.",
    initials: "GF",
    accent: "#1f7a8c",
    image: "/images/testimonials/gaia-ferrero.jpg",
    isPlaceholder: true,
  },
  {
    id: "shahzad-akhtar",
    name: "Shahzad Akhtar",
    company: "Strateasy Consulting",
    roleLine: "Founder & Managing Director, Strateasy Consulting",
    industry: "Management Consulting",
    meta: ["Pakistan", "5 months (ongoing)", "Management Consulting"],
    metrics: [
      { value: "29%", label: "Outreach Reply Rate" },
      { value: "6×", label: "Profile Views in 60 Days" },
      { value: "11", label: "Qualified Conversations" },
    ],
    quote:
      "I had the credentials, the track record, the institutional relationships. What I did not have was a way to make any of it visible to the right people without being in the room first. Every engagement still started from zero.",
    initials: "SA",
    accent: "#103129",
    image: "/images/testimonials/shahzad-akhtar.jpg",
    isPlaceholder: true,
  },
  {
    id: "kaitlin-malaspina",
    name: "Kaitlin Malaspina",
    company: "Brenna & Co.",
    roleLine: "Principal & Founder, Brenna & Co.",
    industry: "Business Architecture & Operational Stewardship",
    meta: ["United States", "5 days", "Business Operations"],
    // from the engagement record: May 16-20, 2025, 9 hours, rated 5.0
    metrics: [
      { value: "5.0", label: "Client rating, out of 5" },
      { value: "9 hrs", label: "To organize SOPs and streamline systems" },
      { value: "5 days", label: "Start to finish" },
    ],
    quote:
      "Hiring Rizwan was one of the best decisions we made for our operations. He came in with clarity, efficiency, and a sharp understanding of what needed to be done. Within a short time, he organized our SOPs, streamlined our systems, and helped bring structure to areas that had previously felt overwhelming.",
    fullQuote: [
      "Hiring Rizwan was one of the best decisions we made for our operations. He came in with clarity, efficiency, and a sharp understanding of what needed to be done. Within a short time, he organized our SOPs, streamlined our systems, and helped bring structure to areas that had previously felt overwhelming. Rizwan is not only fast and detail-oriented, but also incredibly bright—he immediately grasped the nuances of our business and delivered thoughtful, effective solutions. I would work with him again in a heartbeat and highly recommend him to anyone seeking operational excellence.",
    ],
    initials: "KM",
    accent: "#1f7a8c",
    image: "/images/testimonials/kaitlin-malaspina.jpg",
  },
];

export const trustedCompanies = ["Careem", "Bolt", "Wise"];

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={dir === "right" ? "M7 4l6 6-6 6" : "M13 4l-6 6 6 6"} />
    </svg>
  );
}

function SlidePhoto({ t }: { t: Testimonial }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="tcar-photo" style={{ background: t.accent }}>
      {t.image && !errored ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={t.image} alt={t.name} onError={() => setErrored(true)} />
      ) : (
        <span className="tcar-photo-initials" aria-hidden="true">
          {t.initials}
        </span>
      )}
      <div className="tcar-photo-shade" />
      <div className="tcar-photo-caption">
        <p className="tcar-photo-name">
          {t.name}, {t.company}
        </p>
        <p className="tcar-photo-industry">{t.industry}</p>
      </div>
    </div>
  );
}

function Slide({
  t,
  active,
  expanded,
  onToggle,
}: {
  t: Testimonial;
  active: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="tcar-slide"
      inert={!active}
      aria-hidden={!active}
      role="group"
      aria-roledescription="slide"
      aria-label={`${t.name}, ${t.company}`}
    >
      <SlidePhoto t={t} />

      <div className="tcar-body">
        <div>
          <span className="tcar-eyebrow">Client story</span>
          <p className="tcar-meta">{t.meta.join("  ·  ")}</p>
        </div>

        {t.metrics ? (
          <div className="tcar-metrics">
            {t.metrics.map((m) => (
              <div key={m.label}>
                <p className="tcar-metric-value">{m.value}</p>
                <p className="tcar-metric-label">{m.label}</p>
              </div>
            ))}
          </div>
        ) : t.hats ? (
          <ul className="tcar-hats" aria-label="Roles Riz filled">
            {t.hats.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        ) : null}

        <div className="tcar-quote-block">
          {expanded && t.fullQuote ? (
            <div className="tcar-full-quote">
              {t.fullQuote.map((p, i) => (
                <p key={i}>
                  {i === 0 && "“"}
                  {p}
                  {i === t.fullQuote!.length - 1 && "”"}
                </p>
              ))}
            </div>
          ) : (
            <blockquote className="tcar-quote">&ldquo;{t.quote}&rdquo;</blockquote>
          )}
          <p className="tcar-author">
            {t.name}, <span>{t.roleLine}</span>
          </p>
          {t.fullQuote && (
            <button type="button" className="tcar-readmore" aria-expanded={expanded} onClick={onToggle}>
              {expanded ? "Show less" : "Read the full testimonial"} <span aria-hidden="true">{expanded ? "↑" : "→"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

type TestimonialsSectionProps = {
  heading: React.ReactNode;
  headingStyle?: React.CSSProperties;
  background?: string;
};

export default function TestimonialsSection({
  heading,
  headingStyle,
  background = "#F1EBDE",
}: TestimonialsSectionProps) {
  const [current, setCurrent] = useState(0);
  // Slides share one track height, so an open full testimonial would stretch
  // every slide. Moving to another slide closes it.
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const count = testimonials.length;
  const go = (i: number) => {
    setCurrent(Math.min(Math.max(i, 0), count - 1));
    setExpandedId(null);
  };
  const next = () => go(current + 1);
  const prev = () => go(current - 1);

  // Horizontal swipe on touch screens; ignores mostly-vertical drags so the page still scrolls.
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next();
    else prev();
  };

  return (
    <section
      id="testimonials"
      className="testimonials-section"
      style={{ background, borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}
    >
      <div className="max-w-site">
        <AnimateIn>
          <h2 style={{ marginBottom: 48, maxWidth: 640, ...headingStyle }}>{heading}</h2>
        </AnimateIn>

        <AnimateIn delay={120}>
          <div
            className="tcar"
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") next();
              if (e.key === "ArrowLeft") prev();
            }}
          >
            <div className="tcar-track" style={{ transform: `translateX(-${current * 100}%)` }}>
              {testimonials.map((t, i) => (
                <Slide
                  key={t.id}
                  t={t}
                  active={i === current}
                  expanded={expandedId === t.id}
                  onToggle={() => setExpandedId((id) => (id === t.id ? null : t.id))}
                />
              ))}
            </div>

            <button
              type="button"
              className="tcar-arrow tcar-arrow-prev"
              onClick={prev}
              disabled={current === 0}
              aria-label="Previous testimonial"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              className="tcar-arrow tcar-arrow-next"
              onClick={next}
              disabled={current === count - 1}
              aria-label="Next testimonial"
            >
              <Chevron dir="right" />
            </button>
          </div>

          {/* Face row: shows at a glance who vouches, and jumps straight to that story. */}
          <div className="tcar-faces" role="tablist" aria-label="Choose a testimonial">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={i === current}
                onClick={() => go(i)}
                className={`tcar-face${i === current ? " is-active" : ""}`}
              >
                <span className="tcar-face-avatar" style={{ background: t.accent }}>
                  {t.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.image} alt="" />
                  ) : (
                    t.initials
                  )}
                </span>
                <span className="tcar-face-text">
                  <span className="tcar-face-name">{t.name}</span>
                  <span className="tcar-face-company">{t.company}</span>
                </span>
              </button>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

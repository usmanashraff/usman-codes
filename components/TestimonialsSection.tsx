"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const QUOTES = [
  {
    q: "Shipped the rebuild in five weeks, on a stack we didn't already use, and it's been the most reliable surface we own.",
    name: "Mira O.",
    role: "CTO · Northtide",
    initial: "M",
  },
  {
    q: "Engineers like Usman are rare. He'll push back on the right things, agree on the right things, and the work is always finished.",
    name: "David L.",
    role: "Founder · Halflight",
    initial: "D",
  },
  {
    q: "Took our crufty internal tools and made them feel like a real product. The team actually opens them now.",
    name: "Sara G.",
    role: "Head of Ops · Polyglot",
    initial: "S",
  },
  {
    q: "He writes the kind of code I want my own engineers to read. Direct, opinionated, with the right amount of comment.",
    name: "Yusuf A.",
    role: "VP Eng · Slate",
    initial: "Y",
  },
  {
    q: "Two weeks in I forgot he was a contractor. He was just one of us, only with better instincts than most.",
    name: "Klara V.",
    role: "Product Lead · Vellum",
    initial: "K",
  },
  {
    q: "Worked with dozens of devs over fifteen years. Usman is in the top three. He thinks before he types.",
    name: "Robert Y.",
    role: "CTO · Mapline",
    initial: "R",
  },
];

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10% 0px" });
  const stripRef = useRef<HTMLDivElement>(null);
  const stripInView = useInView(stripRef, { once: true, margin: "-10% 0px" });

  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateProgress = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setProgress(p);
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft >= max - 8);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateProgress();
    el.addEventListener("scroll", updateProgress, { passive: true });
    return () => el.removeEventListener("scroll", updateProgress);
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 400 : -400,
      behavior: "smooth",
    });
  };

  return (
    <section id="testimonials" style={{ overflow: "hidden" }}>
      <div className="uc-container">
        <div
          ref={headerRef}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="uc-eyebrow">Kind words</span>
            <h2 className="uc-h2" style={{ marginBottom: 0 }}>
              From people I&apos;ve <em>built with</em>.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", gap: 16 }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--fg-3)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {QUOTES.length} quotes · drag or scroll →
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <ScrollBtn dir="left" onClick={() => scroll("left")} disabled={atStart} />
              <ScrollBtn dir="right" onClick={() => scroll("right")} disabled={atEnd} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-bleed scroller */}
      <motion.div
        ref={stripRef}
        initial={{ opacity: 0 }}
        animate={stripInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{ position: "relative" }}
      >
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: 20,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollPaddingLeft: "max(32px, calc((100vw - 1200px) / 2 + 32px))",
            paddingLeft: "max(32px, calc((100vw - 1200px) / 2 + 32px))",
            paddingRight: "max(32px, calc((100vw - 1200px) / 2 + 32px))",
            paddingTop: 8,
            paddingBottom: 24,
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onWheel={(e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && scrollRef.current) {
              scrollRef.current.scrollLeft += e.deltaY;
            }
          }}
        >
          {QUOTES.map((q) => (
            <QuoteCard key={q.name} q={q} />
          ))}
        </div>

        {/* Right fade */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 24,
            width: 80,
            background: "linear-gradient(to left, var(--bg), transparent)",
            pointerEvents: "none",
          }}
        />
      </motion.div>

      {/* Progress bar */}
      <div className="uc-container" style={{ marginTop: 12 }}>
        <div
          style={{
            height: 2,
            background: "var(--border)",
            borderRadius: 999,
            overflow: "hidden",
            maxWidth: 200,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              background: "var(--accent)",
              transition: "width 200ms var(--ease)",
            }}
          />
        </div>
      </div>

      <style>{`
        #testimonials div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

function QuoteCard({ q }: { q: (typeof QUOTES)[0] }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: "0 0 380px",
        background: "var(--bg)",
        border: "1px solid",
        borderColor: hover ? "var(--border-strong)" : "var(--border)",
        borderRadius: 12,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        scrollSnapAlign: "start",
        transition: "all 250ms var(--ease)",
        transform: hover ? "translateY(-3px)" : undefined,
        boxShadow: hover ? "var(--shadow-hover)" : undefined,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 64,
          lineHeight: 0.6,
          color: "var(--accent)",
          height: 28,
          display: "block",
        }}
      >
        &ldquo;
      </span>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 21,
          lineHeight: 1.35,
          letterSpacing: "-0.01em",
          color: "var(--fg-1)",
          margin: 0,
          flex: 1,
          fontWeight: 400,
        }}
      >
        {q.q}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          paddingTop: 16,
          borderTop: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            background: "var(--surface-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 18,
            color: "var(--fg-2)",
            flexShrink: 0,
          }}
        >
          {q.initial}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: "var(--fg-1)" }}>
            {q.name}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--fg-3)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {q.role}
          </span>
        </div>
      </div>
    </article>
  );
}

function ScrollBtn({
  dir,
  onClick,
  disabled,
}: {
  dir: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "left" ? "Previous" : "Next"}
      style={{
        width: 44,
        height: 44,
        borderRadius: 999,
        border: "1px solid var(--border-strong)",
        background: "var(--bg)",
        color: disabled ? "var(--fg-4)" : "var(--fg-1)",
        cursor: disabled ? "default" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 150ms var(--ease)",
        opacity: disabled ? 0.5 : 1,
        padding: 0,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.background = "var(--fg-1)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--bg)";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "var(--bg)";
        (e.currentTarget as HTMLButtonElement).style.color = disabled
          ? "var(--fg-4)"
          : "var(--fg-1)";
      }}
    >
      {dir === "left" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 12H5M11 18l-6-6 6-6"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12h14M13 6l6 6-6 6"/>
        </svg>
      )}
    </button>
  );
}

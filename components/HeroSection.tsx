"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, Fragment } from "react";

const HEADLINE = "I make things on the web · that don't break ·.";

function WordReveal({
  text,
  italic,
  startDelay = 0,
}: {
  text: string;
  italic?: boolean;
  startDelay?: number;
}) {
  const words = text.trim().split(/\s+/);
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span style={{ display: "inline-block" }}>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "bottom",
                paddingBottom: "0.12em",
                marginBottom: "-0.12em",
              }}
            >
              <motion.span
                style={{
                  display: "inline-block",
                  ...(italic ? { fontStyle: "italic", color: "var(--accent)" } : {}),
                }}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.2, 0.7, 0.2, 1],
                  delay: startDelay + i * 0.055,
                }}
              >
                {word}
              </motion.span>
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </>
  );
}

export default function HeroSection() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = `scaleX(${pct.toFixed(4)})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Split headline on · markers for italic segments
  const segments = HEADLINE.split("·");
  let wordCount = 0;

  return (
    <>
      <div ref={progressRef} className="uc-progress" />

      <section
        id="top"
        style={{
          paddingTop: 180,
          paddingBottom: 160,
          borderTop: "none",
          overflow: "hidden",
        }}
      >
        {/* Noise overlay */}
        <div
          style={{
            position: "absolute",
            inset: "-40px 0",
            pointerEvents: "none",
            backgroundImage: "url(/noise.svg)",
            backgroundSize: "200px",
            opacity: 0.05,
            mixBlendMode: "multiply",
          }}
        />

        <div className="uc-container" style={{ position: "relative" }}>
          {/* Available chip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px 6px 12px",
              borderRadius: 999,
              background: "var(--surface-1)",
              border: "1px solid var(--border)",
              fontSize: 12,
              color: "var(--fg-2)",
              marginBottom: 40,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "var(--success)",
                boxShadow: "0 0 0 3px color-mix(in oklab, var(--success) 25%, transparent)",
              }}
            />
            available for freelance work
          </motion.div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 8vw, 112px)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "var(--fg-1)",
              maxWidth: 900,
              fontWeight: 400,
            }}
          >
            {segments.map((part, i) => {
              const isItalic = i % 2 === 1;
              const trimmed = part.trim();
              if (!trimmed) return null;
              const startIdx = wordCount;
              wordCount += (trimmed.match(/\S+/g) || []).length;
              const delay = startIdx * 0.055 + 0.3;
              return (
                <span key={i}>
                  <WordReveal text={trimmed} italic={isItalic} startDelay={delay} />
                  {i < segments.length - 1 && !isItalic ? " " : ""}
                </span>
              );
            })}
          </h1>

          {/* Lead */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 19,
              lineHeight: 1.6,
              color: "var(--fg-2)",
              maxWidth: 540,
              margin: "40px 0 48px",
            }}
          >
            I build full-stack web applications. Mostly TypeScript, mostly fast and {" "}
            <em style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--accent)", fontSize: '22px' }}>occasionally</em>{" "}
            beautiful · SaaS products, dashboards, and AI tools that don't fall over.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <HeroCTA primary href="#work">
              View projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </HeroCTA>
            <HeroCTA href="#contact">Email me</HeroCTA>
          </motion.div>

          {/* Corner mark */}
          <motion.div
            className="hero-cornermark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.25 }}
            style={{
              position: "absolute",
              top: 60,
              right: 32,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--fg-3)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              textAlign: "right",
              lineHeight: 1.7,
            }}
          >
            full-stack engineer
            <br />
            based in pakistan
            <br />
            <span style={{ color: "var(--accent)" }}>● online</span>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function HeroCTA({
  children,
  primary,
  href,
}: {
  children: React.ReactNode;
  primary?: boolean;
  href: string;
}) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "14px 22px",
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "-0.01em",
        background: primary ? "var(--fg-1)" : "transparent",
        color: primary ? "var(--bg)" : "var(--fg-1)",
        border: primary
          ? "1px solid var(--fg-1)"
          : "1px solid var(--border-strong)",
        transition: "all 150ms var(--ease)",
      }}
      onMouseEnter={(e) => {
        if (primary) e.currentTarget.style.background = "var(--accent)";
        else e.currentTarget.style.background = "var(--surface-1)";
      }}
      onMouseLeave={(e) => {
        if (primary) e.currentTarget.style.background = "var(--fg-1)";
        else e.currentTarget.style.background = "transparent";
      }}
    >
      {children}
    </a>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const SERVICES = [
  {
    n: "01",
    title: "Web Development",
    sub: "Marketing sites, dashboards, internal tools",
    desc: "Fast, accessible, sensibly typed end to end. Built to be edited by the team that inherits it.",
    stack: ["React.js", "Next.js", "Tailwind", "Framer Motion", "Express.js", "Nest.js", "Django", "Laravel"],
    work: "Northtide ops dashboard · Vellum site · Halflight CMS",
  },
  {
    n: "02",
    title: "App Development",
    sub: "Native-feeling apps, web or mobile",
    desc: "Cross-platform when it earns its keep, native when it doesn't. Offline-first, real-time, designed to feel made not assembled.",
    stack: ["React Native", "Swift", "Expo", "Flutter", "Supabase", "CRDT"],
    work: "Mapline field tool · Inkpost reader · Loomroom",
  },
  {
    n: "03",
    title: "AI-powered Applications",
    sub: "LLM workflows that survive contact with users",
    desc: "Streaming UIs, evals, caching, fallback providers, observability. The unglamorous part of shipping an AI product.",
    stack: ["OpenAI", "Anthropic", "LangGraph", "pgvector", "Inngest"],
    work: "Polyglot translation API · Quietfile scheduler · Pact tooling",
  },
  {
    n: "04",
    title: "UI/UX Implementation",
    sub: "Pixel-faithful builds from Figma",
    desc: "Componentized, animated where it earns its keep, never where it doesn't. I work well with designers — opinions, but quietly.",
    stack: ["React", "Framer Motion", "Radix", "CSS", "Figma"],
    work: "Ledger billing · Bookkeep · countless landing pages",
  },
];

function ServiceRow({
  s,
  isOpen,
  onToggle,
}: {
  s: (typeof SERVICES)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderTop: "1px solid var(--border)",
        paddingLeft: hover || isOpen ? 24 : 0,
        paddingRight: hover || isOpen ? 24 : 0,
        transition: "padding 350ms var(--ease), background 350ms var(--ease)",
        background: isOpen ? "var(--surface-1)" : "transparent",
        cursor: "pointer",
      }}
      onClick={onToggle}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 1fr auto",
          gap: 32,
          alignItems: "center",
          padding: "36px 0",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: isOpen || hover ? "var(--accent)" : "var(--fg-4)",
            letterSpacing: "0.08em",
            transition: "color 200ms var(--ease)",
          }}
        >
          /{s.n}
        </span>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4.5vw, 56px)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.025em",
              margin: 0,
              color: "var(--fg-1)",
              transition: "color 200ms var(--ease)",
            }}
          >
            {s.title}
            <span
              style={{
                display: "inline-block",
                marginLeft: 16,
                fontStyle: "italic",
                fontSize: "0.4em",
                color: "var(--fg-3)",
                verticalAlign: "middle",
                transform: isOpen ? "translateY(-2px)" : "translateY(0)",
                transition: "transform 300ms var(--ease)",
              }}
            >
              {s.sub}
            </span>
          </h3>
        </div>

        <button
          aria-label={isOpen ? "Collapse" : "Expand"}
          style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            border: "1px solid var(--border-strong)",
            background: isOpen ? "var(--fg-1)" : "transparent",
            color: isOpen ? "var(--bg)" : "var(--fg-1)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 250ms var(--ease)",
            cursor: "pointer",
            flexShrink: 0,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{
              transform: isOpen ? "rotate(45deg)" : "rotate(0)",
              transition: "transform 300ms var(--ease)",
            }}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 450ms cubic-bezier(0.2, 0.7, 0.2, 1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 1fr",
              gap: 32,
              paddingBottom: 40,
              opacity: isOpen ? 1 : 0,
              transition: "opacity 300ms var(--ease)",
              transitionDelay: isOpen ? "200ms" : "0ms",
            }}
          >
            <span />
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--fg-2)",
                margin: 0,
                maxWidth: 480,
              }}
            >
              {s.desc}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--fg-3)",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  typical stack
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.stack.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        padding: "4px 10px",
                        borderRadius: 4,
                        background: "var(--bg)",
                        color: "var(--fg-2)",
                        border: "1px solid var(--border)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--fg-3)",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  recent work
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 15,
                    color: "var(--fg-2)",
                    lineHeight: 1.4,
                  }}
                >
                  {s.work}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  const [openIdx, setOpenIdx] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section id="services">
      <div className="uc-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 56,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <span className="uc-eyebrow">What I do</span>
            <h2 className="uc-h2" style={{ marginBottom: 0 }}>
              Four practices. <em>One person.</em>
            </h2>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--fg-3)",
            }}
          >
            click to expand
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {SERVICES.map((s, i) => (
            <ServiceRow
              key={s.n}
              s={s}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

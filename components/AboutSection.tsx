"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SKILLS: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Go", "SQL", "Python", "Swift"],
  Frontend: ["React", "Next.js", "Remix", "SvelteKit", "Tailwind", "Framer Motion"],
  Backend: ["Node", "Bun", "tRPC", "GraphQL", "Hono", "Fastify"],
  Data: ["Postgres", "Redis", "PlanetScale", "Prisma", "Drizzle", "pgvector"],
  Infra: ["Vercel", "Cloudflare Workers", "Fly.io", "Docker", "GitHub Actions"],
  AI: ["OpenAI", "Anthropic", "LangGraph", "Vercel AI SDK", "Inngest"],
};

const NOW = [
  { label: "reading", value: "Working in Public — Nadia Eghbal" },
  { label: "listening", value: "Tigran Hamasyan, Standards" },
  { label: "building", value: "A small CRDT-based notes app, for me" },
  { label: "learning", value: "Effect.ts — finally getting serious" },
];

function PortraitFrame() {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "4 / 5",
        borderRadius: 16,
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, var(--surface-1) 0%, var(--surface-2) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: 24,
          right: 24,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 28,
            color: "var(--fg-2)",
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          portrait
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--fg-4)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          placeholder · b&amp;w + grain
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--fg-4)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        4:5 · 1.0×
      </div>
    </div>
  );
}

function StatCard({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div
      style={{
        padding: 24,
        border: "1px solid var(--border)",
        borderRadius: 12,
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        transition: "all 250ms var(--ease)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.transform = "none";
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 56,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: accent ? "var(--accent)" : "var(--fg-1)",
          fontWeight: 400,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--fg-3)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function AboutSection() {
  const topRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const nowRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const topInView = useInView(topRef, { once: true, margin: "-10% 0px" });
  const midInView = useInView(midRef, { once: true, margin: "-10% 0px" });
  const nowInView = useInView(nowRef, { once: true, margin: "-10% 0px" });
  const skillsInView = useInView(skillsRef, { once: true, margin: "-10% 0px" });

  return (
    <section id="about" style={{ overflowX: "hidden" }}>
      <div className="uc-container">

        {/* TOP: Big editorial intro */}
        <motion.div
          ref={topRef}
          initial={{ opacity: 0, y: 16 }}
          animate={topInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 96 }}
        >
          <span className="uc-eyebrow">About</span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 88px)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              margin: 0,
              color: "var(--fg-1)",
              fontWeight: 400,
              maxWidth: 1100,
            }}
          >
            A developer who{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>also reads</em>
            . Four years of shipping software for people who use it.
          </h2>
        </motion.div>

        {/* MIDDLE: Asymmetric 12-col grid */}
        <div
          ref={midRef}
          style={{
            display: "grid",
            gridTemplateColumns: "5fr 7fr",
            gap: 24,
            marginBottom: 80,
          }}
          className="about-mid-grid"
        >
          {/* Portrait — 5 cols */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={midInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <PortraitFrame />
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--fg-3)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                margin: "14px 0 0",
              }}
            >
              ↓ London · full-stack · independent
            </p>
          </motion.div>

          {/* Prose — 7 cols */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={midInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              paddingTop: 8,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 22,
                lineHeight: 1.45,
                color: "var(--fg-1)",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              I&apos;m Usman, a full-stack engineer with a decade of shipping software for the web.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--fg-2)",
                margin: 0,
              }}
            >
              Started in product engineering at a small fintech. Spent four years at a venture-backed CMS company. Independent since 2023. I&apos;m happiest in the seam between design and infrastructure — turning a clean idea into a fast, observable, maintainable system.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.7,
                color: "var(--fg-2)",
                margin: 0,
              }}
            >
              I write thoughtfully and ship pragmatically. Prefer boring tech that works. Off-hours: long walks, slow cooking, a stubborn habit of reading the manual.
            </p>

            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
                marginTop: 8,
              }}
            >
              <StatCard value="10+" label="years shipping" accent />
              <StatCard value="40+" label="projects shipped" />
              <StatCard value="3" label="years independent" />
            </div>
          </motion.div>
        </div>

        {/* NOW PANEL */}
        <motion.div
          ref={nowRef}
          initial={{ opacity: 0, y: 16 }}
          animate={nowInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            padding: "32px 32px",
            background: "var(--surface-1)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            marginBottom: 80,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "var(--accent)",
                boxShadow: "0 0 0 4px color-mix(in oklab, var(--accent) 25%, transparent)",
                flexShrink: 0,
              }}
            />
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                fontWeight: 400,
                margin: 0,
                letterSpacing: "-0.02em",
                color: "var(--fg-1)",
              }}
            >
              Right now{" "}
              <em style={{ fontStyle: "italic", color: "var(--fg-3)" }}>· May 2026</em>
            </h3>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
            }}
            className="now-grid"
          >
            {NOW.map((n, i) => (
              <div
                key={n.label}
                style={{
                  padding: "12px 20px 12px 0",
                  borderRight: i < NOW.length - 1 ? "1px solid var(--border)" : "none",
                  paddingLeft: i === 0 ? 0 : 24,
                }}
              >
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
                  {n.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    lineHeight: 1.45,
                    color: "var(--fg-1)",
                  }}
                >
                  {n.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SKILLS — The toolbox */}
        <motion.div
          ref={skillsRef}
          initial={{ opacity: 0, y: 16 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 24,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                fontWeight: 400,
                margin: 0,
                letterSpacing: "-0.02em",
                color: "var(--fg-1)",
              }}
            >
              The toolbox
            </h3>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--fg-3)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              comfortable in, ordered by how often I reach for it
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0 48px",
              borderTop: "1px solid var(--border)",
            }}
            className="skills-grid"
          >
            {Object.entries(SKILLS).map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  gap: 16,
                  padding: "18px 0",
                  borderBottom: "1px solid var(--border)",
                  alignItems: "baseline",
                }}
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
                  {k}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    color: "var(--fg-1)",
                    lineHeight: 1.5,
                  }}
                >
                  {v.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-mid-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-mid-grid > div:first-child {
            max-width: 360px;
            margin: 0 auto;
          }
          .now-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .now-grid > div {
            border-right: none !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            border-bottom: 1px solid var(--border);
          }
          .now-grid > div:nth-last-child(-n+2) { border-bottom: none; }
          .skills-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
        }
        @media (max-width: 480px) {
          .now-grid {
            grid-template-columns: 1fr !important;
          }
          .now-grid > div:nth-last-child(-n+2) { border-bottom: 1px solid var(--border); }
          .now-grid > div:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, memo } from "react";
import CountUp from "./CountUp";

// ── Data ────────────────────────────────────────────────────────────────────

const CATS = [
  { id: "all",      label: "All" },
  { id: "lang",     label: "Languages" },
  { id: "frontend", label: "Frontend" },
  { id: "backend",  label: "Backend" },
  { id: "db",       label: "Databases" },
  { id: "cloud",    label: "Cloud & DevOps" },
  { id: "ai",       label: "AI / LLM" },
];

const TECH = [
  { id: "typescript",  name: "TypeScript",      cat: "lang",     tier: "daily" },
  { id: "javascript",  name: "JavaScript",      cat: "lang",     tier: "daily" },
  { id: "python",      name: "Python",          cat: "lang",     tier: "often" },
  { id: "php",         name: "PHP",             cat: "lang",     tier: "often" },
  { id: "html",        name: "HTML5",           cat: "lang",     tier: "daily" },
  { id: "css",         name: "CSS3",            cat: "lang",     tier: "daily" },
  { id: "json",        name: "JSON",            cat: "lang",     tier: "daily" },
  { id: "xml",         name: "XML",             cat: "lang",     tier: "sometimes" },
  { id: "react",       name: "React",           cat: "frontend", tier: "daily" },
  { id: "nextjs",      name: "Next.js",         cat: "frontend", tier: "daily" },
  { id: "angular",     name: "Angular",         cat: "frontend", tier: "often" },
  { id: "vue",         name: "Vue",             cat: "frontend", tier: "sometimes" },
  { id: "nodejs",      name: "Node.js",         cat: "backend",  tier: "daily" },
  { id: "nestjs",      name: "NestJS",          cat: "backend",  tier: "daily" },
  { id: "express",     name: "Express",         cat: "backend",  tier: "often" },
  { id: "laravel",     name: "Laravel",         cat: "backend",  tier: "often" },
  { id: "django",      name: "Django",          cat: "backend",  tier: "sometimes" },
  { id: "rest",        name: "REST APIs",       cat: "backend",  tier: "daily" },
  { id: "graphql",     name: "GraphQL",         cat: "backend",  tier: "often" },
  { id: "websockets",  name: "WebSockets",      cat: "backend",  tier: "often" },
  { id: "microsvc",    name: "Microservices",   cat: "backend",  tier: "often" },
  { id: "bullmq",      name: "BullMQ",          cat: "backend",  tier: "often" },
  { id: "rabbitmq",    name: "RabbitMQ",        cat: "backend",  tier: "sometimes" },
  { id: "jwt",         name: "JWT",             cat: "backend",  tier: "daily" },
  { id: "oauth",       name: "OAuth 2.0",       cat: "backend",  tier: "often" },
  { id: "rbac",        name: "RBAC",            cat: "backend",  tier: "often" },
  { id: "postgres",    name: "PostgreSQL",      cat: "db",       tier: "daily" },
  { id: "mongodb",     name: "MongoDB",         cat: "db",       tier: "daily" },
  { id: "mysql",       name: "MySQL",           cat: "db",       tier: "often" },
  { id: "redis",       name: "Redis",           cat: "db",       tier: "often" },
  { id: "dynamodb",    name: "DynamoDB",        cat: "db",       tier: "sometimes" },
  { id: "prisma",      name: "Prisma",          cat: "db",       tier: "daily" },
  { id: "mongoose",    name: "Mongoose",        cat: "db",       tier: "often" },
  { id: "eloquent",    name: "Eloquent",        cat: "db",       tier: "sometimes" },
  { id: "aws",         name: "AWS",             cat: "cloud",    tier: "daily" },
  { id: "docker",      name: "Docker",          cat: "cloud",    tier: "daily" },
  { id: "gha",         name: "GitHub Actions",  cat: "cloud",    tier: "often" },
  { id: "vercel",      name: "Vercel",          cat: "cloud",    tier: "often" },
  { id: "nginx",       name: "Nginx",           cat: "cloud",    tier: "often" },
  { id: "git",         name: "Git",             cat: "cloud",    tier: "daily" },
  { id: "github",      name: "GitHub",          cat: "cloud",    tier: "daily" },
  { id: "gitlab",      name: "GitLab",          cat: "cloud",    tier: "sometimes" },
  { id: "openai",      name: "OpenAI",          cat: "ai",       tier: "daily" },
  { id: "anthropic",   name: "Anthropic",       cat: "ai",       tier: "daily" },
  { id: "vertex",      name: "Vertex AI",       cat: "ai",       tier: "often" },
  { id: "rag",         name: "RAG pipelines",   cat: "ai",       tier: "often" },
  { id: "pinecone",    name: "Pinecone",        cat: "ai",       tier: "often" },
];

// Single-stroke geometric SVGs on a 24×24 grid
const GLYPHS: Record<string, string[]> = {
  typescript:  ["M3 6h6M6 6v12", "M14 9c.5-.7 1.3-1 2.2-1 1.3 0 2.3.6 2.3 1.7 0 2-4.5 1.7-4.5 4 0 1.1.9 1.7 2.2 1.7.9 0 1.7-.3 2.3-1"],
  javascript:  ["M8.5 6v10c0 1.4-1 2-2 2", "M14 8c.6-.7 1.5-1 2.5-1 1.5 0 2.5.8 2.5 2 0 2.5-5 2-5 4.5 0 1.2 1 2 2.5 2 1 0 1.9-.3 2.5-1"],
  python:      ["M12 4h-3a3 3 0 0 0-3 3v3h9a2 2 0 0 1 2 2v3a3 3 0 0 1-3 3h-2", "M12 20h3a3 3 0 0 0 3-3v-3H9a2 2 0 0 1-2-2V9a3 3 0 0 1 3-3h2", "M9 7.5h.01", "M15 16.5h.01"],
  php:         ["M3 8c4-1 9-1 13 0 4 1 5 5 0 6-3 .7-6 .7-9 0", "M8 10v6M14 10v6"],
  html:        ["m6 3 1 17 5 1 5-1 1-17z", "M8 7h8l-.5 5H10M9.5 14h5l-.4 3-2 .7-2-.7"],
  css:         ["m6 3 1 17 5 1 5-1 1-17z", "M8 7h8M9 11h7l-.5 6-3.5 1.2L8 17"],
  json:        ["M9 4c-1.2 0-2 .8-2 2v3c0 1-.5 1.5-1.5 1.5M5.5 12.5C6.5 12.5 7 13 7 14v3c0 1.2.8 2 2 2", "M15 4c1.2 0 2 .8 2 2v3c0 1 .5 1.5 1.5 1.5M18.5 12.5C17.5 12.5 17 13 17 14v3c0 1.2-.8 2-2 2", "M12 12h.01"],
  xml:         ["m8 7-4 5 4 5", "m16 7 4 5-4 5", "m14 5-4 14"],
  react:       ["M12 12m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0", "M12 12m-9 0a9 3.6 0 1 0 18 0a9 3.6 0 1 0-18 0", "M3.5 16.5C8 19 13 19.5 16.5 17.5 20 15.5 20.5 11 19 7", "M3.5 7.5C5 4 9 2.5 12.5 4.5 16 6.5 18 11 17 16"],
  nextjs:      ["M12 3a9 9 0 1 0 5 16.5", "M8 7v10M16 17V7l-7 10"],
  angular:     ["m12 3 8 3-1.5 12L12 21l-6.5-3L4 6z", "M9 16 12 8l3 8M10 13h4"],
  vue:         ["m3 5 9 15 9-15M8 5l4 7 4-7"],
  nodejs:      ["m12 3 8 5v8l-8 5-8-5V8z", "M10 9v6c0 .8.7 1.4 1.5 1.4S13 15.8 13 15v-6M16 10c-.4-.6-1.1-1-2-1-1.2 0-2 .7-2 1.7 0 2 4 1.3 4 3.3 0 1-1 1.7-2.2 1.7-.9 0-1.7-.4-2-1"],
  nestjs:      ["m12 3 8 5v8l-8 5-8-5V8z", "M9 9v7M9 9l6 7M15 9v7"],
  express:     ["M3 12h12M4 8a4 4 0 0 1 8 0c0 4-8 4-8 8a4 4 0 0 0 4 4M15 8l5 4-5 4"],
  laravel:     ["m4 14 4 6h11l-7-12-4 1-4 5z", "m8 20 4-6 3 4"],
  django:      ["M5 4h2v16h2c4 0 6-2 6-6s-2-6-6-6H7", "M16 4v3M16 9v11"],
  rest:        ["M3 12a9 9 0 1 1 18 0a9 9 0 1 1-18 0", "M12 3v18M3 12h18M5 7c5 3 9 3 14 0M5 17c5-3 9-3 14 0"],
  graphql:     ["m12 3 8 5v8l-8 5-8-5V8z", "m12 3 8 13M12 3 4 16M4 8h16", "M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"],
  websockets:  ["M3 8c4 0 8 4 8 8M3 14c2 0 4 2 4 4", "M21 16c-4 0-8-4-8-8M21 10c-2 0-4-2-4-4"],
  microsvc:    ["M4 4h5v5H4zM15 4h5v5h-5zM4 15h5v5H4zM15 15h5v5h-5z", "M9 6.5h6M9 17.5h6M6.5 9v6M17.5 9v6"],
  bullmq:      ["M3 6h13M3 12h13M3 18h13", "m18 6 3 3-3 3M21 9h-5"],
  rabbitmq:    ["M5 4v8a3 3 0 0 0 3 3v6M11 4v8a3 3 0 0 0 3 3", "m14 15 4 .5v3.5h-3"],
  jwt:         ["M5 8h14v8H5z", "M9 10v3a1.5 1.5 0 0 1-3 0M13 10v4M11 13h4M17 10v4"],
  oauth:       ["M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0", "M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.2 2.2M16.2 16.2l2.2 2.2M5.6 18.4l2.2-2.2M16.2 7.8l2.2-2.2"],
  rbac:        ["M6 8c0 4 2 8 6 10 4-2 6-6 6-10l-6-3z", "M9 12l2 2 4-4"],
  postgres:    ["M12 4c4 0 7 1.3 7 3v10c0 1.7-3 3-7 3s-7-1.3-7-3V7c0-1.7 3-3 7-3z", "M5 7c0 1.7 3 3 7 3s7-1.3 7-3"],
  mongodb:     ["M12 3c-2 4-4 7-4 11 0 4 2 7 4 7s4-3 4-7c0-4-2-7-4-11z", "M12 21v-3"],
  mysql:       ["M12 4c4 0 7 1.3 7 3v10c0 1.7-3 3-7 3s-7-1.3-7-3V7c0-1.7 3-3 7-3z", "M5 12c0 1.7 3 3 7 3s7-1.3 7-3M5 7c0 1.7 3 3 7 3s7-1.3 7-3"],
  redis:       ["M12 4c4 0 7 1.3 7 3v10c0 1.7-3 3-7 3s-7-1.3-7-3V7c0-1.7 3-3 7-3z", "m10 10 3 2-3 2m4-4v4"],
  dynamodb:    ["M12 4c4 0 7 1.3 7 3v10c0 1.7-3 3-7 3s-7-1.3-7-3V7c0-1.7 3-3 7-3z", "m8 10 4 4 4-4M8 14l4 4"],
  prisma:      ["m12 3 6 16-7 2-5-3z"],
  mongoose:    ["M5 10c3-4 11-4 14 0-3 4-11 4-14 0z", "M12 8v4"],
  eloquent:    ["M5 4h14M5 12h10M5 20h14"],
  aws:         ["m12 3 8 4.5v9L12 21l-8-4.5v-9z", "M4 7.5 12 12l8-4.5M12 12v9"],
  docker:      ["M3 13h16c0 4-3 6-7 6-5 0-9-2-9-6z", "M5 13V9h2v4M8 13V9h2v4M11 13V9h2v4M14 13V9h2v4M8 8V4h2v4M11 8V4h2v4"],
  gha:         ["M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0", "m10 8 5 4-5 4z"],
  vercel:      ["m12 4 9 16H3z"],
  nginx:       ["m12 3 8 5v8l-8 5-8-5V8z", "M9 16V8l6 8V8"],
  git:         ["M6 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0", "M18 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0", "M12 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0", "M6 8v8a2 2 0 0 0 2 2h2M6 8c0 2 2 4 4 4h4"],
  github:      ["M9 19c-3 1-3-1-4-1m13 5v-3a3 3 0 0 0-1-2c3 0 5-2 5-5 0-1.2-.4-2.3-1-3 .3-1 .3-2 0-3 0 0-1 0-3 1.3-2-.5-4-.5-6 0C7 4.7 6 4.7 6 4.7c-.3 1-.3 2 0 3-.6.7-1 1.8-1 3 0 3 2 5 5 5-.5.5-1 1-1 2v3"],
  gitlab:      ["m12 22 4-12-2-6-2 6h-4l-2-6-2 6z"],
  openai:      ["M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0", "m12 5 6 3v8l-6 3-6-3V8z", "M12 8v8M6 11l6 3 6-3"],
  anthropic:   ["M7 20 12 4l5 16M9 14h6"],
  vertex:      ["m12 3 9 18H3z", "m12 9 4.5 9h-9z"],
  rag:         ["M4 6h16M4 10h16M4 14h10", "m16 14 4 4M18 16a2 2 0 1 0 4 0a2 2 0 1 0-4 0"],
  pinecone:    ["M12 3c-2 5-3 9-3 13 0 2 1.3 3 3 3s3-1 3-3c0-4-1-8-3-13z", "M12 19v-4"],
};

function monogram(name: string) {
  return name.charAt(0).toUpperCase();
}

// ── Sub-components ───────────────────────────────────────────────────────────

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
      <CountUp
        value={value}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 56,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: accent ? "var(--accent)" : "var(--fg-1)",
          fontWeight: 400,
        }}
      />
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

const TechIcon = memo(function TechIcon({ id, name, inView, rowIdx, segBase }: {
  id: string;
  name: string;
  inView: boolean;
  rowIdx: number;
  segBase: number;
}) {
  const paths = GLYPHS[id];
  return (
    <div className="tb-tile" aria-hidden="true">
      <span className="tb-tile-ink" />
      <span className="tb-tile-content">
        {paths ? (
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {paths.map((d, si) => (
              <motion.path
                key={si}
                d={d}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{
                  pathLength: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay: rowIdx * 0.06 + (segBase + si) * 0.015 },
                  opacity: { duration: 0.3, delay: rowIdx * 0.06 + (segBase + si) * 0.015 },
                }}
              />
            ))}
          </svg>
        ) : (
          <span className="tb-monogram">{monogram(name)}</span>
        )}
      </span>
    </div>
  );
});

// ── Main section ─────────────────────────────────────────────────────────────

export default function AboutSection() {
  const topRef    = useRef<HTMLDivElement>(null);
  const midRef    = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const topInView    = useInView(topRef,    { once: true, margin: "-10% 0px" });
  const midInView    = useInView(midRef,    { once: true, margin: "-10% 0px" });
  const skillsInView = useInView(skillsRef, { once: true, margin: "-10% 0px" });

  const [filterCat, setFilterCat] = useState("all");
  const [hoverCat,  setHoverCat]  = useState<string | null>(null);
  const activeCat = hoverCat ?? filterCat;

  const handleSetFilter  = useCallback((id: string) => setFilterCat(id), []);
  const handleHoverEnter = useCallback((id: string) => setHoverCat(id),  []);
  const handleHoverLeave = useCallback(() => setHoverCat(null),           []);

  const totalCount = TECH.length;
  const dailyCount = TECH.filter(t => t.tier === "daily").length;

  return (
    <section id="about">
      <div className="uc-container">

        {/* TOP */}
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
            . Five years of shipping software for people who use it.
          </h2>
        </motion.div>

        {/* MID: portrait + prose */}
        <div
          ref={midRef}
          style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 24, marginBottom: 80 }}
          className="about-mid-grid"
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={midInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <PortraitFrame />
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "14px 0 0" }}>
              ↓ Pakistan · full-stack · independent
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={midInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: 8 }}
          >
            <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 22, lineHeight: 1.45, color: "var(--fg-1)", margin: 0, letterSpacing: "-0.01em" }}>
              I&apos;m Usman, a full-stack engineer with 5 years of shipping software for the web.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.7, color: "var(--fg-2)", margin: 0 }}>
              Started in product engineering at a small fintech. Spent five years at a venture-backed company. Independent since 2023. Happiest in the seam between design and infrastructure.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.7, color: "var(--fg-2)", margin: 0 }}>
              I write thoughtfully and ship pragmatically. Prefer boring tech that works. Off-hours: long walks, slow cooking, a stubborn habit of reading the manual.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 8 }}>
              <StatCard value="5+"  label="years shipping" accent />
              <StatCard value="40+" label="projects shipped" />
              <StatCard value="3"   label="years independent" />
            </div>
          </motion.div>
        </div>

        {/* TOOLBOX */}
        <motion.div
          ref={skillsRef}
          initial={{ opacity: 0, y: 16 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, margin: 0, letterSpacing: "-0.02em", color: "var(--fg-1)" }}>
              The toolbox
            </h3>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {totalCount} tools · {dailyCount} in daily use
            </span>
          </div>

          {/* Filter tabs */}
          <div className="tb-tabs">
            {CATS.map(c => {
              const count = c.id === "all" ? TECH.length : TECH.filter(t => t.cat === c.id).length;
              const isActive = filterCat === c.id;
              return (
                <button
                  key={c.id}
                  className={`tb-tab${isActive ? " is-active" : ""}`}
                  onClick={() => handleSetFilter(c.id)}
                  onMouseEnter={() => handleHoverEnter(c.id)}
                  onMouseLeave={handleHoverLeave}
                >
                  {c.label}
                  <span className="tb-tab-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Category rows */}
          <div className="tb-rows">
            {CATS.filter(c => c.id !== "all").map((c, rowIdx) => {
              const items = TECH.filter(t => t.cat === c.id);
              const isDim = activeCat !== "all" && c.id !== activeCat;
              // compute a per-row base offset so icons stagger globally
              const segBase = CATS.slice(1, rowIdx + 1).reduce((acc, cat) => acc + TECH.filter(t => t.cat === cat.id).length, 0);
              return (
                <div key={c.id} className={`tb-row${isDim ? " is-dim" : ""}`}>
                  <div className="tb-row-label">{c.label}</div>
                  <div className="tb-row-chips">
                    {items.map((t, chipIdx) => (
                      <span
                        key={t.id}
                        className={`tb-chip${t.tier === "daily" ? " is-daily" : ""}`}
                        title={`${t.name} · ${t.tier}`}
                      >
                        <TechIcon
                          id={t.id}
                          name={t.name}
                          inView={skillsInView}
                          rowIdx={rowIdx}
                          segBase={segBase + chipIdx}
                        />
                        <span className="tb-chip-name">{t.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-4)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "32px 0 0", textAlign: "right" }}>
            ↑ comfortable in, ordered by how often I reach for it
          </p>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-mid-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-mid-grid > div:first-child { max-width: 360px; margin: 0 auto; }
        }

        /* Toolbox */
        .tb-tabs { display:flex; flex-wrap:wrap; gap:4px; margin-bottom:28px; padding-bottom:16px; border-bottom:1px solid var(--border); }
        .tb-tab { font-family:var(--font-body); font-size:13px; font-weight:500; color:var(--fg-3); background:transparent; border:0; padding:6px 12px; border-radius:999px; display:inline-flex; align-items:center; gap:7px; cursor:pointer; transition:color 200ms var(--ease),background-color 200ms var(--ease); }
        .tb-tab:hover { color:var(--fg-1); }
        .tb-tab.is-active { color:var(--accent-fg); background:var(--accent); }
        .tb-tab-count { font-family:var(--font-mono); font-size:10px; letter-spacing:0.04em; opacity:0.6; }
        .tb-tab.is-active .tb-tab-count { opacity:0.75; }
        .tb-rows { display:flex; flex-direction:column; }
        .tb-row { display:grid; grid-template-columns:130px 1fr; gap:24px; padding:16px 0; border-bottom:1px solid var(--border); align-items:baseline; transition:opacity 350ms var(--ease); }
        .tb-row:first-child { border-top:1px solid var(--border); }
        .tb-row.is-dim { opacity:0.18; }
        .tb-row-label { font-family:var(--font-mono); font-size:11px; color:var(--fg-3); text-transform:uppercase; letter-spacing:0.06em; padding-top:4px; }
        .tb-row-chips { display:flex; flex-wrap:wrap; gap:6px; }
        .tb-chip { position:relative; display:inline-flex; align-items:center; gap:8px; padding:4px 10px 4px 4px; border-radius:999px; border:1px solid var(--border); background:var(--bg); font-family:var(--font-body); font-size:13px; font-weight:500; color:var(--fg-1); line-height:1; cursor:default; user-select:none; transition:border-color 200ms var(--ease),transform 200ms var(--ease); }
        .tb-chip:hover { border-color:var(--border-strong); transform:translateY(-1px); }
        .tb-chip.is-daily::before { content:''; position:absolute; top:4px; right:5px; width:4px; height:4px; border-radius:999px; background:var(--accent); }
        .tb-tile { position:relative; flex-shrink:0; width:24px; height:24px; border-radius:999px; border:1px solid var(--border); background:var(--bg); color:var(--fg-2); overflow:hidden; transition:border-color 250ms var(--ease); }
        .tb-tile-content { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; z-index:2; transition:color 250ms var(--ease); }
        .tb-tile-ink { position:absolute; left:0; right:0; bottom:0; height:0; background:var(--accent); z-index:1; transition:height 380ms var(--ease); }
        .tb-chip:hover .tb-tile { border-color:var(--accent); }
        .tb-chip:hover .tb-tile-content { color:var(--accent-fg); }
        .tb-chip:hover .tb-tile-ink { height:100%; }
        .tb-monogram { font-family:var(--font-display); font-style:italic; font-weight:400; font-size:12px; line-height:1; letter-spacing:-0.02em; color:inherit; }
        @media (max-width:720px) { .tb-row { grid-template-columns:1fr; gap:8px; padding:14px 0; } .tb-row-label { padding-top:0; } }
      `}</style>
    </section>
  );
}

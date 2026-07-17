"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, memo } from "react";
import type { IconType } from "react-icons";
import {
  SiTypescript, SiJavascript, SiPython, SiPhp, SiHtml5, SiCss,
  SiReact, SiNextdotjs, SiAngular, SiVuedotjs,
  SiNodedotjs, SiNestjs, SiExpress, SiLaravel, SiDjango,
  SiGraphql, SiRabbitmq,
  SiPostgresql, SiMongodb, SiMysql, SiRedis, SiPrisma,
  SiDocker, SiGithubactions, SiVercel, SiNginx,
  SiGit, SiGithub, SiGitlab,
  SiOpenai,
} from "react-icons/si";
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

// Brand icons + colors. null color = uses currentColor (safe for both light/dark).
const ICONS: Record<string, { Icon: IconType; color: string | null }> = {
  typescript:  { Icon: SiTypescript,        color: '#3178C6' },
  javascript:  { Icon: SiJavascript,        color: '#F7DF1E' },
  python:      { Icon: SiPython,            color: '#3776AB' },
  php:         { Icon: SiPhp,               color: '#777BB4' },
  html:        { Icon: SiHtml5,             color: '#E34F26' },
  css:         { Icon: SiCss,               color: '#1572B6' },
  react:       { Icon: SiReact,             color: '#61DAFB' },
  nextjs:      { Icon: SiNextdotjs,         color: null },
  angular:     { Icon: SiAngular,           color: '#DD0031' },
  vue:         { Icon: SiVuedotjs,          color: '#4FC08D' },
  nodejs:      { Icon: SiNodedotjs,         color: '#339933' },
  nestjs:      { Icon: SiNestjs,            color: '#E0234E' },
  express:     { Icon: SiExpress,           color: null },
  laravel:     { Icon: SiLaravel,           color: '#FF2D20' },
  django:      { Icon: SiDjango,            color: '#092E20' },
  graphql:     { Icon: SiGraphql,           color: '#E10098' },
  rabbitmq:    { Icon: SiRabbitmq,          color: '#FF6600' },
  postgres:    { Icon: SiPostgresql,        color: '#4169E1' },
  mongodb:     { Icon: SiMongodb,           color: '#47A248' },
  mysql:       { Icon: SiMysql,             color: '#4479A1' },
  redis:       { Icon: SiRedis,             color: '#DC382D' },
  prisma:      { Icon: SiPrisma,            color: null },
  docker:      { Icon: SiDocker,            color: '#2496ED' },
  gha:         { Icon: SiGithubactions,     color: '#2088FF' },
  vercel:      { Icon: SiVercel,            color: null },
  nginx:       { Icon: SiNginx,             color: '#009639' },
  git:         { Icon: SiGit,               color: '#F05032' },
  github:      { Icon: SiGithub,            color: null },
  gitlab:      { Icon: SiGitlab,            color: '#FC6D26' },
  openai:      { Icon: SiOpenai,            color: '#10A37F' },
};

const MONO_COLORS: Record<string, string> = {
  json: '#6366F1', xml: '#005FAD', rest: '#009688', websockets: '#4A90D9',
  microsvc: '#8B5CF6', bullmq: '#EF4444', jwt: '#F59E0B', oauth: '#EB5424',
  rbac: '#5C3EE8', mongoose: '#880000', eloquent: '#FF2D20',
  aws: '#FF9900', dynamodb: '#4053D6',
  vertex: '#4285F4', rag: '#8B5CF6', anthropic: '#C96442', pinecone: '#5AB552',
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

const TechIcon = memo(function TechIcon({ id, name }: { id: string; name: string }) {
  const entry = ICONS[id];
  const monoColor = MONO_COLORS[id];
  const iconColor = entry?.color ?? null;
  const style = (iconColor ?? monoColor)
    ? ({ "--icon-color": iconColor ?? monoColor } as React.CSSProperties)
    : undefined;

  return (
    <div className="tb-tile" aria-hidden="true">
      <span className="tb-tile-ink" />
      <span className="tb-tile-content" style={style}>
        {entry
          ? <entry.Icon size={13} />
          : <span className="tb-monogram">{monogram(name)}</span>}
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
              return (
                <div key={c.id} className={`tb-row${isDim ? " is-dim" : ""}`}>
                  <div className="tb-row-label">{c.label}</div>
                  <div className="tb-row-chips">
                    {items.map((t) => (
                      <span
                        key={t.id}
                        className={`tb-chip${t.tier === "daily" ? " is-daily" : ""}`}
                        title={`${t.name} · ${t.tier}`}
                      >
                        <TechIcon id={t.id} name={t.name} />
                        <span>{t.name}</span>
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
        .tb-tile-content { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; z-index:2; color:var(--icon-color, var(--fg-2)); transition:color 250ms var(--ease); }
        .tb-tile-ink { position:absolute; left:0; right:0; bottom:0; height:0; background:var(--accent); z-index:1; transition:height 380ms var(--ease); }
        .tb-chip:hover .tb-tile { border-color:var(--accent); }
        .tb-chip:hover .tb-tile-content { color:var(--accent-fg) !important; }
        .tb-chip:hover .tb-tile-ink { height:100%; }
        .tb-monogram { font-family:var(--font-display); font-style:italic; font-weight:400; font-size:12px; line-height:1; letter-spacing:-0.02em; color:inherit; }
        @media (max-width:720px) { .tb-row { grid-template-columns:1fr; gap:8px; padding:14px 0; } .tb-row-label { padding-top:0; } }
      `}</style>
    </section>
  );
}

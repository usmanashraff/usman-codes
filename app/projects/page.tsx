"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ARCHIVE = [
  {
    year: "2025",
    count: "04 projects",
    projects: [
      {
        n: "/04",
        title: "Qubie",
        sub: "chat with your documents",
        desc: "Upload any document set and query it conversationally. RAG pipeline — OpenAI embeddings, Pinecone vector search, JWT auth, AWS S3, GraphQL, and Stripe billing.",
        tags: ["Next.js", "OpenAI", "Pinecone", "MySQL", "Stripe", "TypeScript"],
        link: "live ↗",
        href: "https://qubie.vercel.app/",
      },
      {
        n: "/03",
        title: "Expensey",
        sub: "AI-powered expense tracker",
        desc: "NLP-driven expense entry that understands plain-language input, auto-categorises spend, and generates AI-written monthly summaries alongside live dashboards.",
        tags: ["React.js", "Node.js", "MongoDB", "NLP/LLM", "Chart.js"],
        link: "live ↗",
        href: "https://expenseyy.vercel.app/",
      },
      {
        n: "/02",
        title: "VocalSenseAI",
        sub: "voice transcription & analysis",
        desc: "Upload audio, get a full transcription and speech analysis back. React Query polling, JWT-secured file upload API, and Speech-to-Text AI — no complex infrastructure needed.",
        tags: ["React.js", "Node.js", "Speech-to-Text AI", "shadcn/ui", "TypeScript"],
        link: "live ↗",
        href: "https://vocalsense.vercel.app/",
      },
      {
        n: "/01",
        title: "HashExplorer",
        sub: "client-side cryptographic hashing",
        desc: "Real-time SHA-256 and SHA-3 hashing using the Web Crypto API. Fully client-side — sensitive input never touches a server. Zero backend, zero exposure.",
        tags: ["JavaScript ES6+", "Web Crypto API", "TailwindCSS"],
        link: "live ↗",
        href: "https://hashexplorer.vercel.app/",
      },
    ],
  },
  {
    year: "2024",
    count: "02 projects",
    projects: [
      {
        n: "/06",
        title: "CarePlus",
        sub: "patient management system",
        desc: "Full-stack healthcare platform for registering patients, booking appointments, and managing schedules. Staff dashboard lets you schedule, reschedule, and cancel appointments end-to-end.",
        tags: ["Next.js", "TypeScript", "shadcn/ui", "Appwrite"],
        link: "live ↗",
        href: "https://careplus-ten.vercel.app/",
      },
      {
        n: "/05",
        title: "Threads",
        sub: "social media app",
        desc: "Feature-complete clone of Instagram's Threads — post threads, reply, follow users, and browse a real-time activity feed. A deep-dive into full-stack social graph mechanics.",
        tags: ["Next.js", "TypeScript", "MongoDB", "Clerk"],
        link: "live ↗",
        href: "https://threads-green-chi.vercel.app/",
      },
    ],
  },
];

const STATS = [
  { n: "6", l: "projects shipped" },
  { n: "3", l: "AI-powered" },
  { n: "6", l: "live in production" },
  { n: "2", l: "open source" },
];

export default function ProjectsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      <Header />
      <main style={{ paddingTop: 80 }}>
        {/* Page hero */}
        <section
          style={{
            padding: "160px 0 96px",
            borderBottom: "1px solid var(--border)",
            position: "relative",
          }}
        >
          <div className="uc-container" ref={heroRef}>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: "var(--fg-2)",
                  marginBottom: 32,
                  transition: "color 150ms var(--ease)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-1)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-2)")}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
                back to home
              </Link>
            </motion.div>

            <motion.span
              className="uc-eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              Work · 2025
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(56px, 9vw, 128px)",
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
                margin: 0,
                fontWeight: 400,
                color: "var(--fg-1)",
                maxWidth: 1100,
              }}
            >
              Six projects,{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                all of them shipped
              </em>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 19,
                lineHeight: 1.6,
                color: "var(--fg-2)",
                maxWidth: 580,
                margin: "32px 0 0",
              }}
            >
              A complete look at what I&apos;ve built — AI document search, expense intelligence, voice analysis, and cryptographic tooling. All live, all production-grade.
            </motion.p>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                marginTop: 56,
                paddingTop: 24,
                borderTop: "1px solid var(--border)",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 32,
              }}
              className="stats-bar"
            >
              {STATS.map((s) => (
                <div key={s.l} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 40,
                      color: "var(--fg-1)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.n}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--fg-3)",
                    }}
                  >
                    {s.l}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Archive */}
        <section style={{ padding: "96px 0 160px" }}>
          <div className="uc-container">
            {ARCHIVE.map((group, gi) => (
              <YearGroup key={group.year} group={group} groupIndex={gi} />
            ))}
          </div>
        </section>

        {/* Pre-footer CTA */}
        <PreFooter />
      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .stats-bar { grid-template-columns: repeat(2, 1fr) !important; }
          .archive-row { grid-template-columns: 1fr !important; gap: 12px !important; }
          .archive-row .row-arrow { justify-content: flex-start !important; }
        }
      `}</style>
    </>
  );
}

function YearGroup({
  group,
  groupIndex,
}: {
  group: (typeof ARCHIVE)[0];
  groupIndex: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div
      ref={ref}
      style={{
        paddingTop: 64,
        paddingBottom: 64,
        borderBottom: groupIndex < ARCHIVE.length - 1 ? "1px solid var(--border)" : "none",
      }}
    >
      {/* Year head */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 32,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 6vw, 80px)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "var(--fg-1)",
            fontWeight: 400,
          }}
        >
          {group.year}
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
          {group.count}
        </span>
      </motion.div>

      {/* Rows */}
      {group.projects.map((p, i) => (
        <motion.div
          key={p.n}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.07 }}
        >
          <ArchiveRow p={p} />
        </motion.div>
      ))}
    </div>
  );
}

function ArchiveRow({ p }: { p: (typeof ARCHIVE)[0]["projects"][0] }) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={p.href ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr 1.5fr 200px 80px",
        gap: 32,
        padding: hover ? "28px 12px" : "28px 0",
        borderTop: "1px solid var(--border)",
        alignItems: "baseline",
        transition: "padding 250ms var(--ease)",
        textDecoration: "none",
      }}
      className="archive-row"
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--fg-4)",
          letterSpacing: "0.06em",
        }}
      >
        {p.n}
      </span>
      <div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: hover ? "var(--accent)" : "var(--fg-1)",
            fontWeight: 400,
            display: "block",
            transition: "color 200ms var(--ease)",
          }}
        >
          {p.title}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 14,
            color: "var(--fg-3)",
            display: "block",
            marginTop: 4,
          }}
        >
          {p.sub}
        </span>
      </div>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          lineHeight: 1.6,
          color: "var(--fg-2)",
          margin: 0,
        }}
      >
        {p.desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {p.tags.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              padding: "3px 7px",
              borderRadius: 4,
              background: "var(--surface-1)",
              color: "var(--fg-3)",
              letterSpacing: "0.02em",
            }}
          >
            {t}
          </span>
        ))}
      </div>
      <span
        className="row-arrow"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 4,
          fontSize: 12,
          color: hover ? "var(--accent)" : "var(--fg-3)",
          fontFamily: "var(--font-mono)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          transform: hover ? "translateX(6px)" : "none",
          transition: "color 200ms var(--ease), transform 200ms var(--ease)",
        }}
      >
        {p.link}
      </span>
    </a>
  );
}

function PreFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [hover, setHover] = useState(false);

  return (
    <section
      ref={ref}
      style={{
        borderTop: "1px solid var(--border)",
        padding: "96px 0",
        textAlign: "center",
      }}
    >
      <div className="uc-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: "0 0 24px",
            fontWeight: 400,
            color: "var(--fg-1)",
          }}
        >
          Like one of these?{" "}
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
            Let&apos;s make another.
          </em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            color: "var(--fg-2)",
            maxWidth: 480,
            margin: "0 auto 32px",
          }}
        >
          I&apos;m taking on new work — one or two slots open. Quick reply, written proposal, no fuss.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/#contact"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 24px",
              borderRadius: 999,
              background: hover ? "var(--accent)" : "var(--fg-1)",
              color: "var(--bg)",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 500,
              transition: "all 150ms var(--ease)",
              textDecoration: "none",
            }}
          >
            Start a project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


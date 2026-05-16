"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

const PROJECTS = [
  {
    n: "01",
    year: "2026",
    title: "3PL Logistics",
    sub: "Multi-tenant warehouse management system",
    desc: "A production WMS for 3PL providers. Multi-tenant with full data isolation, real-time inventory across warehouses and bins, and order sync with Shopify, Amazon, Walmart, TikTok Shop, and more.",
    stack: ["NestJS", "Node.js", "React", "PostgreSQL", "Prisma", "TypeScript", "Tailwind", "shadcn/ui"],
    live: "https://3pl-logistics.eleaderz.com/",
    featured: true,
  },
  {
    n: "02",
    year: "2026",
    title: "businessLibrary",
    sub: "Marketplace for business document templates",
    desc: "A WordPress-based digital marketplace for professional document templates. Secure e-commerce via Easy Digital Downloads, automatic DOCX-to-image preview generation with watermarking, and a hybrid React and WordPress dashboard.",
    stack: ["WordPress", "Easy Digital Downloads", "React", "PHP", "LibreOffice", "Bootstrap", "Elementor"],
    live: "https://businesslibrary.com.au/",
  },
  {
    n: "03",
    year: "2025",
    title: "Qubie",
    sub: "Chat with your documents",
    desc: "Upload any document set and query it conversationally. RAG pipeline with OpenAI embeddings, Pinecone vector search, AWS S3 storage, and Stripe billing.",
    stack: ["Next.js", "Node.js", "OpenAI", "Pinecone", "MySQL", "Stripe", "TypeScript"],
    live: "https://qubie.vercel.app/",
    code: "https://github.com/usmanashraff/qubie",
  },
  {
    n: "04",
    year: "2025",
    title: "Expensey",
    sub: "Smart expense tracker",
    desc: "NLP-driven expense entry that understands plain-language input, auto-categorises spend, and generates AI-written monthly summaries with live dashboards.",
    stack: ["React.js", "Node.js", "MongoDB", "NLP/LLM", "Chart.js"],
    live: "https://expenseyy.vercel.app/",
    code: "https://github.com/usmanashraff/expensey",
  },
  {
    n: "05",
    year: "2025",
    title: "VocalSenseAI",
    sub: "Voice transcription and analysis",
    desc: "Upload audio and get a full transcription with speech analysis. JWT-secured file upload, React Query polling, and a Speech-to-Text AI backend.",
    stack: ["React.js", "Node.js", "Speech-to-Text AI", "shadcn/ui", "TypeScript"],
    live: "https://vocalsense.vercel.app/",
    code: "https://github.com/usmanashraff/vocalsenseai",
  },
  {
    n: "06",
    year: "2025",
    title: "HashExplorer",
    sub: "Client-side cryptographic hashing",
    desc: "Real-time SHA-256 and SHA-3 hashing via the Web Crypto API. Fully client-side, sensitive input never touches a server.",
    stack: ["JavaScript ES6+", "Web Crypto API", "TailwindCSS"],
    live: "https://hashexplorer.vercel.app/",
    code: "https://github.com/usmanashraff/hashexplorer",
  },
];

interface ProjectsSectionProps {
  limit?: number;
}

export default function ProjectsSection({ limit }: ProjectsSectionProps) {
  const displayed = limit ? PROJECTS.slice(0, limit) : PROJECTS;
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10% 0px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-10% 0px" });
  const footerInView = useInView(footerRef, { once: true, margin: "-10% 0px" });

  return (
    <section id="work">
      <div className="uc-container">
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 56,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="uc-eyebrow">Selected work</span>
            <h2 className="uc-h2" style={{ marginBottom: 0 }}>
              Things I&apos;ve shipped, <em>recently</em>.
            </h2>
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--fg-3)",
            }}
          >
            06 / 2026
          </motion.span>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
          }}
          className="projects-grid"
        >
          {displayed.map((p, i) => (
            <ProjectCard
              key={p.n}
              p={p}
              index={i}
              inView={gridInView}
            />
          ))}
        </div>

        {/* View all / footer */}
        <motion.div
          ref={footerRef}
          initial={{ opacity: 0, y: 16 }}
          animate={footerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: 48,
            paddingTop: 32,
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "var(--fg-3)",
            }}
          >
            More in the archive — AI tools, web apps, and a few things that didn&apos;t survive contact with reality.
          </span>
          <ViewAllBtn />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .projects-grid article { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({
  p,
  index,
  inView,
}: {
  p: (typeof PROJECTS)[0];
  index: number;
  inView: boolean;
}) {
  const [hover, setHover] = useState(false);
  const fromLeft = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, x: fromLeft ? -48 : 48, y: 12 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.2, 0.7, 0.2, 1],
        delay: index * 0.12,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--bg)",
        border: "1px solid",
        borderColor: hover ? "var(--border-strong)" : "transparent",
        borderRadius: 12,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        gridColumn: p.featured ? "span 2" : "span 1",
        transform: hover ? "translateY(-2px)" : undefined,
        boxShadow: hover ? "var(--shadow-hover)" : undefined,
        transition: "all 300ms var(--ease)",
      }}
    >
      {/* Meta row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
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
          {p.n} · {p.year}
        </span>
        <div style={{ display: "flex", gap: 14 }}>
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 13,
                color: "var(--fg-2)",
                display: "inline-flex",
                gap: 4,
                alignItems: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-2)")}
            >
              Live <span style={{ fontSize: 11 }}>↗</span>
            </a>
          )}
          {p.code && (
            <a
              href={p.code}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 13,
                color: "var(--fg-2)",
                display: "inline-flex",
                gap: 4,
                alignItems: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-2)")}
            >
              Code <span style={{ fontSize: 11 }}>↗</span>
            </a>
          )}
        </div>
      </div>

      {/* Title */}
      <div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: p.featured ? 44 : 32,
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: "0 0 6px",
            color: "var(--fg-1)",
          }}
        >
          {p.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            color: "var(--fg-3)",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          {p.sub}
        </p>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--fg-2)",
          margin: 0,
          maxWidth: 520,
        }}
      >
        {p.desc}
      </p>

      {/* Stack tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginTop: "auto",
        }}
      >
        {p.stack.map((s) => (
          <span
            key={s}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              padding: "4px 8px",
              borderRadius: 4,
              background: "var(--surface-1)",
              color: "var(--fg-3)",
              letterSpacing: "0.02em",
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

function ViewAllBtn() {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href="/projects"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 20px",
        borderRadius: 999,
        border: "1px solid",
        borderColor: hover ? "var(--fg-1)" : "var(--border-strong)",
        color: hover ? "var(--bg)" : "var(--fg-1)",
        fontFamily: "var(--font-body)",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "-0.01em",
        background: hover ? "var(--fg-1)" : "transparent",
        transition: "all 200ms var(--ease)",
        whiteSpace: "nowrap",
      }}
    >
      View all projects
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M13 6l6 6-6 6"/>
      </svg>
    </Link>
  );
}

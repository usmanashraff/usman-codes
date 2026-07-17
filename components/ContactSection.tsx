"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import emailjs from "@emailjs/browser";

const BUDGETS = ["< $10k", "$10–25k", "$25–50k", "$50k+", "not sure yet"];

const SOCIALS = [
  {
    href: "https://www.linkedin.com/in/usman-ashraf-304145274/",
    label: "LinkedIn",
    handle: "@usman-ashraf",
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    href: "https://www.instagram.com/usmanashrraf/",
    label: "Instagram",
    handle: "@usmanashrraf",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    href: "https://github.com/usmanashraff",
    label: "GitHub",
    handle: "@usmanashraff",
    icon: (
      <path d="M9 19c-3 1-3-1-4-2m13 4v-3a3 3 0 0 0-1-2c3 0 5-2 5-5 0-1.2-.4-2.3-1-3 .3-1 .3-2 0-3 0 0-1 0-3 1.3-2-.5-4-.5-6 0C7 4.7 6 4.7 6 4.7c-.3 1-.3 2 0 3-.6.7-1 1.8-1 3 0 3 2 5 5 5a3 3 0 0 0-1 2v3" />
    ),
  },
];

const STEPS: [string, string, string][] = [
  ["01", "You send the note", "I read it carefully and reply within a day."],
  ["02", "A short call", "30 minutes — make sure we're a fit."],
  ["03", "Written proposal", "Scope, timeline, price. Plain language."],
  ["04", "We start", "Usually within a week of the call."],
];

function UnderlineField({
  idx,
  label,
  hint,
  children,
}: {
  idx: number;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={() => setFocused(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingBottom: 16,
        borderBottom: "1px solid",
        borderColor: focused ? "var(--accent)" : "var(--border-strong)",
        transition: "border-color 200ms var(--ease)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: focused ? "var(--accent)" : "var(--fg-3)",
            transition: "color 200ms var(--ease)",
          }}
        >
          {String(idx).padStart(2, "0")} — {label}
        </span>
        {hint && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--fg-4)",
              letterSpacing: "0.04em",
            }}
          >
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

const inputBase: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 22,
  color: "var(--fg-1)",
  background: "transparent",
  border: 0,
  padding: "4px 0",
  outline: "none",
  width: "100%",
  fontWeight: 400,
  letterSpacing: "-0.01em",
};

export default function ContactSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10% 0px" });
  const stepsInView = useInView(stepsRef, { once: true, margin: "-10% 0px" });

  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [hoverBtn, setHoverBtn] = useState(false);

  const update = useCallback(
    (k: keyof typeof form) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((prev) => ({ ...prev, [k]: e.target.value })),
    []
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      if (
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY &&
        formRef.current
      ) {
        await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          formRef.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );
      }
      setSubmitted(true);
      setForm({ name: "", email: "", budget: "", message: "" });
      setTimeout(() => setSubmitted(false), 6000);
    } catch {
      setError("Couldn't send — try emailing directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" style={{ paddingTop: 128, paddingBottom: 96 }}>
      <div className="uc-container">

        {/* TOP: Centered headline */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            textAlign: "center",
            maxWidth: 880,
            margin: "0 auto 24px",
          }}
        >
          <span className="uc-eyebrow" style={{ justifyContent: "center" }}>
            Get in touch
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 8vw, 96px)",
              lineHeight: 1,
              letterSpacing: "-0.025em",
              margin: 0,
              color: "var(--fg-1)",
              fontWeight: 400,
            }}
          >
            Got a project in mind?{" "}
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
              Let&apos;s build it.
            </em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--fg-2)",
              maxWidth: 560,
              margin: "24px auto 0",
            }}
          >
            Tell me a little about it below. I read every note and reply within ~12 hours.
          </p>

          {/* Social links */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 28,
            }}
          >
            {SOCIALS.map(({ href, label, handle, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
              >
                <span className="tb-tile">
                  <span className="tb-tile-ink" />
                  <span className="tb-tile-content">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round">
                      {icon}
                    </svg>
                  </span>
                </span>
                {label}
                <span style={{ color: "var(--fg-3)", fontWeight: 400 }}>{handle}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* FORM — centered single column */}
        <motion.form
          ref={formRef}
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            maxWidth: 680,
            margin: "64px auto 0",
            display: "flex",
            flexDirection: "column",
            gap: 36,
          }}
        >
          {/* Hidden budget for emailjs */}
          <input type="hidden" name="budget" value={form.budget} />

          <UnderlineField idx={1} label="Your name">
            <input
              style={inputBase}
              placeholder="Jane Doe"
              name="from_name"
              value={form.name}
              onChange={update("name")}
              required
            />
          </UnderlineField>

          <UnderlineField idx={2} label="Email" hint="i'll reply here">
            <input
              type="email"
              style={inputBase}
              placeholder="jane@yourcompany.com"
              name="reply_to"
              value={form.email}
              onChange={update("email")}
              required
            />
          </UnderlineField>

          {/* Budget chips */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              paddingBottom: 16,
              borderBottom: "1px solid var(--border-strong)",
            }}
          >
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
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--fg-3)",
                }}
              >
                03 — Budget range
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--fg-4)",
                  letterSpacing: "0.04em",
                }}
              >
                optional
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {BUDGETS.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setForm({ ...form, budget: b })}
                  style={{
                    padding: "12px 18px",
                    borderRadius: 999,
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 500,
                    background: form.budget === b ? "var(--fg-1)" : "transparent",
                    color: form.budget === b ? "var(--bg)" : "var(--fg-2)",
                    border: "1px solid",
                    borderColor: form.budget === b ? "var(--fg-1)" : "var(--border-strong)",
                    cursor: "pointer",
                    transition: "all 200ms var(--ease)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <UnderlineField idx={4} label="Tell me about it">
            <textarea
              style={{ ...inputBase, fontSize: 18, minHeight: 120, resize: "vertical", lineHeight: 1.55 }}
              name="message"
              placeholder="Timeline, stack, the thing that's missing — anything you'd send a friend."
              value={form.message}
              onChange={update("message")}
              required
            />
          </UnderlineField>

          {/* Submit row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              marginTop: 8,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: submitted ? "var(--success)" : error ? "var(--danger)" : "var(--fg-3)",
                letterSpacing: "0.04em",
                transition: "color 200ms var(--ease)",
              }}
            >
              {submitted
                ? "✓ noted — i'll be in touch within 24h"
                : error
                  ? error
                  : "or email usmanscodes@gmail.com directly"}
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={() => setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 28px",
                borderRadius: 999,
                background: hoverBtn ? "var(--accent)" : "var(--fg-1)",
                color: hoverBtn ? "var(--accent-fg)" : "var(--bg)",
                border: "none",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "all 200ms var(--ease)",
                transform: hoverBtn ? "translateX(4px)" : "none",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? "Sending…" : "Send it"}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  transform: hoverBtn ? "translateX(2px)" : "none",
                  transition: "transform 200ms var(--ease)",
                }}
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </motion.form>

        {/* HORIZONTAL: What happens next */}
        <motion.div
          ref={stepsRef}
          initial={{ opacity: 0, y: 16 }}
          animate={stepsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            marginTop: 128,
            paddingTop: 48,
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 32,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 400,
                margin: 0,
                letterSpacing: "-0.02em",
                color: "var(--fg-1)",
              }}
            >
              What happens next
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
              four steps · about a week
            </span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
              border: "1px solid var(--border)",
              borderRadius: 12,
              overflow: "hidden",
            }}
            className="steps-grid"
          >
            {STEPS.map(([n, t, d], i) => (
              <div
                key={n}
                style={{
                  padding: "28px 24px",
                  borderRight: i < 3 ? "1px solid var(--border)" : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  background: "var(--bg)",
                  transition: "background 200ms var(--ease)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "var(--surface-1)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "var(--bg)")
                }
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--accent)",
                    letterSpacing: "0.06em",
                    marginBottom: 8,
                  }}
                >
                  /{n}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: 16,
                    letterSpacing: "-0.01em",
                    color: "var(--fg-1)",
                  }}
                >
                  {t}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: "var(--fg-2)",
                  }}
                >
                  {d}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid > div { border-right: 1px solid var(--border) !important; border-bottom: 1px solid var(--border); }
          .steps-grid > div:nth-child(even) { border-right: none !important; }
          .steps-grid > div:nth-last-child(-n+2) { border-bottom: none; }
        }
        @media (max-width: 600px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          .steps-grid > div { border-right: none !important; border-bottom: 1px solid var(--border) !important; }
          .steps-grid > div:last-child { border-bottom: none !important; }
        }

        /* Social pills + shared tile styles */
        .tb-tile { position:relative; flex-shrink:0; width:24px; height:24px; border-radius:999px; border:1px solid var(--border); background:var(--bg); color:var(--fg-2); overflow:hidden; transition:border-color 250ms var(--ease); }
        .tb-tile-content { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; z-index:2; color:var(--icon-color, var(--fg-2)); transition:color 250ms var(--ease); }
        .tb-tile-ink { position:absolute; left:0; right:0; bottom:0; height:0; background:var(--accent); z-index:1; transition:height 380ms var(--ease); }
        .social-pill { display:inline-flex; align-items:center; gap:10px; padding:8px 14px 8px 8px; border-radius:999px; border:1px solid var(--border); background:var(--bg); text-decoration:none; color:var(--fg-1); font-family:var(--font-body); font-size:13px; font-weight:500; transition:border-color 200ms var(--ease),transform 200ms var(--ease); }
        .social-pill:hover { border-color:var(--border-strong); transform:translateY(-2px); }
        .social-pill:hover .tb-tile { border-color:var(--accent); }
        .social-pill:hover .tb-tile-content { color:var(--accent-fg); }
        .social-pill:hover .tb-tile-ink { height:100%; }
      `}</style>
    </section>
  );
}

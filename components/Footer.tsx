"use client";

import DiscLogo from "./DiscLogo";

export default function Footer() {
  const socials = [
    { label: "github", href: "#" },
    { label: "twitter", href: "#" },
    { label: "linkedin", href: "#" },
    { label: "read.cv", href: "#" },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "40px 0",
      }}
    >
      <div
        className="uc-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <DiscLogo layout="wordmark-only" wordmarkSize={20} />

        <div style={{ display: "flex", gap: 24 }}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              style={{
                fontSize: 13,
                color: "var(--fg-2)",
                transition: "color 150ms var(--ease)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-1)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-2)")}
            >
              {s.label}
            </a>
          ))}
        </div>

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--fg-3)",
            letterSpacing: "0.04em",
          }}
        >
          © 2026 · made carefully
        </span>
      </div>
    </footer>
  );
}

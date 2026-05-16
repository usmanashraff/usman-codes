"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import DiscLogo from "./DiscLogo";

const navLinks = [
  { label: "work", href: "/#work" },
  { label: "services", href: "/#services" },
  { label: "about", href: "/#about" },
];


function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      style={{
        width: 32,
        height: 32,
        borderRadius: 999,
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--fg-2)",
        transition: "all 150ms var(--ease)",
        padding: 0,
        flexShrink: 0,
      }}
    >
      {isDark ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}

export default function Header({ forceDark = false }: { forceDark?: boolean }) {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const bg =
    theme === "dark"
      ? "rgba(20,20,26,0.72)"
      : "rgba(247,245,240,0.72)";

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <nav
        style={{
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          gap: 24,
          height: 56,
          padding: "0 8px 0 24px",
          borderRadius: 999,
          background: bg,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--border)",
          boxShadow: scrolled ? "var(--shadow-card)" : "none",
          transition: "box-shadow 200ms var(--ease)",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <DiscLogo discSize={32} wordmarkSize={18} gap={10} />
        </Link>

        {/* Desktop nav */}
        <div
          className="desktop-nav-links"
          style={{ display: "flex", gap: 22, marginLeft: 8 }}
        >
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 8 }}>
          <ThemeToggle />
          <Link
            href="/#contact"
            style={{
              fontSize: 13,
              fontWeight: 500,
              padding: "8px 16px",
              borderRadius: 999,
              background: "var(--fg-1)",
              color: "var(--bg)",
              transition: "background 150ms var(--ease)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--fg-1)")
            }
          >
            email →
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="mobile-menu-btn"
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              background: "var(--surface-1)",
              border: "1px solid var(--border)",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              flexShrink: 0,
            }}
          >
            {menuOpen ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.22, 0.9, 0.2, 1] }}
            style={{
              position: "fixed",
              top: 84,
              left: 16,
              right: 16,
              background: bg,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: "16px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              boxShadow: "var(--shadow-pop)",
              pointerEvents: "auto",
            }}
          >
            {[...navLinks, { label: "contact", href: "/#contact" }].map(
              (link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-body)",
                      fontSize: 15,
                      fontWeight: 500,
                      color: "var(--fg-1)",
                      padding: "12px 0",
                      borderBottom: "1px solid var(--border)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav-links { display: none !important; }
          .mobile-menu-btn { display: inline-flex !important; }
        }
      `}</style>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontSize: 13,
        color: "var(--fg-2)",
        position: "relative",
        padding: "4px 0",
        transition: "color 150ms var(--ease)",
      }}
    >
      {children}
      <span
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 1,
          background: "var(--fg-1)",
          width: hover ? "100%" : 0,
          transition: "width 200ms var(--ease)",
        }}
      />
    </Link>
  );
}

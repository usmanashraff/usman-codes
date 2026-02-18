"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
];

export default function Header({ forceDark = false }: { forceDark?: boolean }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <header className={`site-header ${scrolled ? "site-header--scrolled" : ""} ${forceDark ? "site-header--dark" : ""}`}>
            <a href="/" className="site-logo" aria-label="Usman Codes — Home">
                Usman Codes
            </a>

            {/* Desktop Nav */}
            <nav className="desktop-nav" aria-label="Main navigation">
                {navLinks.map((link) => (
                    <a key={link.label} href={link.href} className="nav-link">
                        {link.label}
                    </a>
                ))}
            </nav>

            {/* Mobile Hamburger */}
            <button
                className="mobile-menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
            >
                <div className="hamburger-lines">
                    <span className={`hamburger-line ${menuOpen ? "hamburger-line--top-open" : ""}`} />
                    <span className={`hamburger-line ${menuOpen ? "hamburger-line--mid-open" : ""}`} />
                    <span className={`hamburger-line ${menuOpen ? "hamburger-line--bot-open" : ""}`} />
                </div>
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25, ease: [0.22, 0.9, 0.2, 1] }}
                        className="mobile-overlay"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06, duration: 0.3 }}
                                className="mobile-nav-link"
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

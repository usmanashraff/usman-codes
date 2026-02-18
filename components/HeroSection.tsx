"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 0.9, 0.2, 1] },
    },
};

export default function HeroSection() {
    return (
        <section className="hero" id="about">
            {/* Hidden SVG clipPath definition */}
            <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                    <clipPath id="blob-clip" clipPathUnits="objectBoundingBox">
                        <path
                            d="M 0.22 0
                               L 1 0
                               L 1 1
                               C 0.85 0.97, 0.65 0.92, 0.52 0.82
                               C 0.37 0.70, 0.31 0.58, 0.32 0.44
                               C 0.34 0.31, 0.25 0.20, 0.22 0.11
                               C 0.21 0.06, 0.27 0.01, 0.22 0
                               Z"
                        />
                    </clipPath>
                </defs>
            </svg>

            {/* Blob with portrait */}
            <div className="hero-blob-container">
                <div className="hero-blob-clipped">
                    <div className="hero-blob-bg" />
                    <img
                        className="hero-blob-portrait"
                        src="/usman.jpeg"
                        alt="Headshot of Usman, full-stack engineer and AI automation specialist"
                        loading="eager"
                        decoding="async"
                    />
                </div>
            </div>

            {/* Content grid */}
            <div className="hero-grid">
                <motion.div variants={container} initial="hidden" animate="show">
                    {/* Top section: label + heading */}
                    <div className="hero-top">
                        <motion.p variants={item} className="hero-label">
                            Full-Stack Engineer &amp; AI Automation Expert
                        </motion.p>

                        <motion.h1 variants={item} className="hero-heading">
                            Hello, my name
                            <br />
                            is Usman
                        </motion.h1>
                    </div>

                    {/* Bottom section: description + CTAs */}
                    <div className="hero-bottom">
                        <motion.p variants={item} className="hero-desc">
                            I build production-grade AI agents and full-stack web platforms that
                            automate decisioning, scale operations, and drive monthly recurring
                            revenue for ambitious businesses.
                        </motion.p>

                        <motion.div variants={item} className="hero-btns">
                            <a href="#projects" className="btn-primary">
                                Projects
                            </a>
                            <a
                                href="#contact"
                                className="btn-outline"
                            >
                                Book a Call
                            </a>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Desktop spacer for right column */}
                <div aria-hidden="true" />
            </div>
        </section>
    );
}

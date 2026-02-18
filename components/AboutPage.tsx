"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 0.9, 0.2, 1] },
    },
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" }
    }
};

export default function AboutPage() {
    return (
        <div className="about-page">
            {/* ───── About Hero Section ───── */}
            <section className="about-hero">
                <motion.div
                    className="about-hero-content"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.h1 variants={item} className="about-heading">
                        About me
                    </motion.h1>

                    <motion.p variants={item} className="about-desc">
                        I&apos;m Usman Ashraf, a Full-Stack Engineer and AI Automation
                        specialist with a passion for building production-grade agentic
                        systems and resilient web platforms. I help ambitious businesses
                        automate complex workflows, scale operations, and materially grow
                        their recurring revenue through intelligent automation.
                    </motion.p>

                    <motion.p variants={item} className="about-desc">
                        With expertise spanning end-to-end web development, AI agent
                        design, and autonomous system architecture, I bridge the gap
                        between strategy and deployment — turning complex requirements
                        into reliable, revenue-generating systems.
                    </motion.p>

                    <motion.div variants={item}>
                        <a href="/resume.pdf" className="btn-primary" target="_blank" rel="noopener noreferrer">
                            Resume
                        </a>
                    </motion.div>
                </motion.div>

                {/* Circular blob with portrait */}
                <motion.div
                    className="about-portrait-wrapper"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.9, 0.2, 1] }}
                >
                    <div className="about-circle-blob">
                        <img
                            src="/usman-about.jpeg"
                            alt="Usman Ashraf"
                            className="about-portrait-img"
                            loading="eager"
                            decoding="async"
                        />
                    </div>
                </motion.div>
            </section>

            {/* ───── Life Sections ───── */}
            <div className="about-life-sections">



                {/* 2. Professional Life */}
                <section className="life-section life-section--alt">
                    <motion.div
                        className="life-grid"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={container}
                    >
                        {/* Text Side - Right (visually Right due to RTL, so put it first in HTML source? No, RTL puts first item on Right)
                            Wait, logic check:
                            HTML: Content, Image
                            RTL Grid: 
                            Item 1 (Content) -> Col 1 (Right)
                            Item 2 (Image) -> Col 2 (Left)
                            Result: Image | Content.
                            
                            Previous HTML: Image, Content.
                            RTL Grid:
                            Item 1 (Image) -> Col 1 (Right)
                            Item 2 (Content) -> Col 2 (Left)
                            Result: Content | Image.
                            
                            User wants SWAP. User probably wants Image | Content? 
                            Or did they want Content | Image?
                            "swap the text and image" - usually implies changing the current position.
                            Current: Content | Image.
                            Target: Image | Content.
                            So yes, HTML should be Content, Image.
                         */}

                        {/* Text Side */}
                        <div className="life-content">
                            <motion.div variants={item} className="section-tag">The Journey</motion.div>
                            <motion.h2 variants={item} className="life-heading">Professional Journey</motion.h2>
                            <motion.div variants={item} className="life-underline" />
                            <motion.p variants={item} className="life-text">
                                Turning my passion into a career, I dove headfirst into full-stack development and later, AI automation. I've had the privilege of working with ambitious startups and established companies, building systems that handle critical operations. My focus shifted from just "writing code" to "architecting solutions" that drive tangible business value—reducing costs, increasing efficiency, and enabling growth through intelligent automation.
                            </motion.p>

                            <motion.div variants={item} style={{ marginTop: "24px" }}>
                                <a href="/contact" className="btn-primary">
                                    Contact Me
                                </a>
                            </motion.div>
                        </div>

                        {/* Image Side */}
                        <motion.div variants={fadeInUp} className="life-image-wrapper">
                            <div className="life-image-blob life-image-blob--2">
                                <div className="life-placeholder-overlay">Professional Image</div>
                                <img
                                    src="/professional.jpeg"
                                    alt="Usman at work"
                                    className="life-img"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

            </div>


        </div>
    );
}

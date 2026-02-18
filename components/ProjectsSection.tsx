"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 0.9, 0.2, 1] },
    },
};

const projects = [
    {
        title: "AI-Powered Onboarding System",
        description:
            "Built an agentic AI pipeline that automated customer onboarding, reducing churn by 18% and scaling throughput 4× for a SaaS platform.",
        image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        reverse: false,
    },
    {
        title: "Full-Stack Fintech Dashboard",
        description:
            "Designed and developed a real-time analytics dashboard for a fintech startup, handling millions of transactions with sub-second response times.",
        image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        reverse: true,
    },
    {
        title: "Autonomous Workflow Engine",
        description:
            "Engineered an autonomous workflow engine that replaced manual processes, saving 200+ hours/month and increasing MRR by 32%.",
        image:
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
        reverse: false,
    },
];

export default function ProjectsSection() {
    return (
        <section className="projects-section" id="projects">
            <motion.h2
                className="projects-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
            >
                Projects
            </motion.h2>

            {projects.map((project, i) => (
                <motion.div
                    key={project.title}
                    className={`project-card ${project.reverse ? "project-card--reverse" : ""}`}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: i * 0.1 }}
                >
                    <div className="project-card__content">
                        <h3 className="project-card__title">{project.title}</h3>
                        <p className="project-card__desc">{project.description}</p>
                        <a href="#" className="project-card__btn">
                            View Project
                        </a>
                    </div>
                    <div className="project-card__image">
                        <img
                            src={project.image}
                            alt={`Screenshot of ${project.title}`}
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </motion.div>
            ))}
        </section>
    );
}

"use client";

import { motion, type Variants } from "framer-motion";

import { projects } from "@/lib/data";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 0.9, 0.2, 1] },
    },
};

interface ProjectsSectionProps {
    limit?: number;
}

export default function ProjectsSection({ limit }: ProjectsSectionProps) {
    const displayedProjects = limit ? projects.slice(0, limit) : projects;

    return (
        <section className="projects-section" id="projects">
            <motion.h2
                className="projects-heading"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
            >
                {limit ? "Featured Projects" : "All Projects"}
            </motion.h2>

            {displayedProjects.map((project, i) => (
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
                        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="project-card__btn">
                                Live Demo
                            </a>
                            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-card__btn" style={{ border: "none", paddingLeft: 0 }}>
                                GitHub
                            </a>
                        </div>
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

            {limit && limit < projects.length && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ textAlign: "center", marginTop: "40px" }}
                >
                    <a href="/projects" className="btn-primary">
                        View All Projects
                    </a>
                </motion.div>
            )}
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
    const form = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    const [socials] = useState([
        { name: "GitHub", url: "https://github.com/usmanashraff" },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/usman-ashraf-304145274/" },
        { name: "Instagram", url: "https://instagram.com/usmanashrraf" },
        { name: "Email", url: "mailto:usmancodess@gmail.com" },
    ]);

    const getSocialIcon = (name: string) => {
        switch (name) {
            case "GitHub":
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                );
            case "LinkedIn":
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                );
            case "Instagram":
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                );
            case "Email":
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                );
            default:
                return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: null, message: '' });

        if (!form.current) return;

        try {
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                form.current,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );
            setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
            form.current.reset();
        } catch (error) {
            console.error("EmailJS Error:", error);
            setStatus({ type: 'error', message: 'Failed to send message. Please try again or use the email link.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header forceDark={true} />
            <main className="contact-page">
                <div className="contact-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="contact-header"
                    >
                        <h1 className="contact-title">Contact Me</h1>
                        <p className="contact-subtitle">
                            Let's build something amazing together. Reach out via the form or social links below.
                        </p>
                    </motion.div>

                    <div className="contact-content">
                        {/* Form Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="contact-form-wrapper"
                        >
                            <form ref={form} onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="from_name">Name</label>
                                    <input type="text" id="from_name" name="from_name" required placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reply_to">Email</label>
                                    <input type="email" id="reply_to" name="reply_to" required placeholder="your.email@example.com" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" name="message" required rows={5} placeholder="How can I help you?"></textarea>
                                </div>

                                {status.message && (
                                    <div style={{
                                        padding: "12px",
                                        borderRadius: "8px",
                                        fontSize: "0.9rem",
                                        backgroundColor: status.type === 'success' ? '#DCFCE7' : '#FEE2E2',
                                        color: status.type === 'success' ? '#166534' : '#991B1B'
                                    }}>
                                        {status.message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn-primary"
                                    style={{ width: "100%", opacity: isSubmitting ? 0.7 : 1 }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </motion.div>

                        {/* Social/Info Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="contact-info"
                        >
                            <h3>Connect Directly</h3>
                            <div className="social-links-grid">
                                {socials.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target={social.name === "Email" ? "_self" : "_blank"}
                                        rel="noopener noreferrer"
                                        className="social-card"
                                    >
                                        <div className="social-icon-box">{getSocialIcon(social.name)}</div>
                                        <span>{social.name}</span>
                                    </a>
                                ))}
                            </div>

                            <div className="whatsapp-cta">
                                <p>Prefer a quick chat?</p>
                                <a
                                    href="https://wa.me/923356670129"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-whatsapp-large"
                                >
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

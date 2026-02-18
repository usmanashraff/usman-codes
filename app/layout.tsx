import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usmancodes.dev"),
  title: "Usman Codes — Full-Stack Engineer & AI Automation Expert",
  description:
    "Full-stack engineer & AI automation expert building agentic systems and web platforms that drive MRR. Engineering, agent design, and deployment.",
  keywords: [
    "Full-Stack Engineer",
    "AI Automation",
    "Agentic AI",
    "Web Development",
    "MRR Growth",
    "Systems Architect",
  ],
  openGraph: {
    title: "Usman Codes — Full-Stack Engineer & AI Automation Expert",
    description:
      "Building agentic AI & web systems for high-yield competitive advantage.",
    type: "website",
    locale: "en_US",
    url: "https://usmancodes.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Usman Codes — Full-Stack Engineer & AI Automation Expert",
    description:
      "Building agentic AI & web systems for high-yield competitive advantage.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Usman",
              url: "https://usmancodes.dev",
              jobTitle: "Full-Stack Engineer & AI Automation Expert",
              knowsAbout: [
                "Agentic AI",
                "Full-Stack Development",
                "AI Automation",
                "Web Systems",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}

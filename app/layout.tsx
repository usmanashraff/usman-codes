import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageLoader from "@/components/PageLoader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://usmancodes.dev"),
  title: "Usman Codes — Full-Stack Engineer",
  description:
    "Full-stack engineer building web applications. Mostly TypeScript, mostly fast.",
  keywords: ["Full-Stack Engineer", "Web Development", "TypeScript", "Next.js"],
  openGraph: {
    title: "Usman Codes — Full-Stack Engineer",
    description: "Full-stack engineer building web applications. Mostly TypeScript, mostly fast.",
    type: "website",
    locale: "en_US",
    url: "https://usmancodes.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Usman Codes — Full-Stack Engineer",
    description: "Full-stack engineer building web applications. Mostly TypeScript, mostly fast.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent theme flash before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('uc-theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t)})()`,
          }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=Instrument+Serif:ital@0;1&family=Inter+Tight:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <PageLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

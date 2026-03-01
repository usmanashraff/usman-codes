export interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    links: {
        demo: string;
        github: string;
    };
    reverse?: boolean;
}

export const projects: Project[] = [
    {
        title: "Qubie — Chat with Your Documents",
        description:
            "An AI-powered document intelligence platform that allows users to upload multiple documents and interact with them through a contextual chat interface. Chat with your documents seamlessly.",
        image: "/qubie.png",
        tags: ["Next.js", "AI", "Chat", "Documents"],
        links: {
            demo: "https://qubie.vercel.app/",
            github: "https://github.com/usmanashraff/qubie",
        },
        reverse: false,
    },
    {
        title: "Expensey — AI-Powered Expense Tracker",
        description:
            "Manage your monthly expenses with AI-powered insights. Get AI summaries for your spending patterns and add expenses using natural language processing for quick entry.",
        image: "/expensey.png",
        tags: ["Finance", "AI", "Dashboard", "NLP"],
        links: {
            demo: "https://expenseyy.vercel.app/",
            github: "https://github.com/usmanashraff/expensey",
        },
        reverse: true,
    },
    {
        title: "Threads — Social Media Platform",
        description:
            "A social media app like threads where users can post tweets and create communities. Connect, share, and build communities with an intuitive and interactive interface.",
        image: "/threads.png",
        tags: ["Next.js", "Social Media", "Communities", "Real-time"],
        links: {
            demo: "https://threads-green-chi.vercel.app/",
            github: "https://github.com/usmanashraff/threads",
        },
        reverse: false,
    },
    {
        title: "CarePlus — Hospital Management System",
        description:
            "A comprehensive healthcare patient management application that streamlines patient journeys and administrative operations. Features patient registration, appointment booking, SMS notifications, secure document uploads, and a powerful admin dashboard.",
        image: "/careplus.png",
        tags: ["Next.js", "TypeScript", "Healthcare", "Appwrite"],
        links: {
            demo: "https://carepluss.vercel.app/",
            github: "https://github.com/usmanashraff/PMS_careplus",
        },
        reverse: true,
    },
    {
        title: "HashExplorer — Hash Algorithms Visualizer",
        description:
            "A modern, interactive web application for exploring cryptographic hashing algorithms. Visualize how different hash functions work, compare algorithms, and generate hashes in real-time for any text input.",
        image: "/hash.png",
        tags: ["React", "TypeScript", "Vite", "Cryptography"],
        links: {
            demo: "https://hashexplorer.vercel.app/",
            github: "https://github.com/usmanashraff/hashexplorer",
        },
        reverse: false,
    },
    {
        title: "VocalSense AI — Speech-to-Text Application",
        description:
            "An AI-powered voice analysis platform that converts audio input into accurate text using advanced speech recognition models. Features secure authentication and a clean, modern interface.",
        image: "/vocal.png",
        tags: ["AI", "Speech Recognition", "Next.js", "Audio"],
        links: {
            demo: "https://vocalsense.vercel.app/",
            github: "https://github.com/usmanashraff/vocalsenseai",
        },
        reverse: true,
    },
];

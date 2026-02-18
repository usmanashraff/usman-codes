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
            "An AI-powered document intelligence platform that allows users to upload multiple documents and interact with them through a contextual chat interface. Built with Next.js and MySQL, Qubie supports secure authentication, document processing pipelines, persistent chat history, and integrated payment functionality.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", // Placeholder
        tags: ["Next.js", "MySQL", "AI", "Payments"],
        links: {
            demo: "https://qubie.vercel.app/",
            github: "https://github.com/usmanashraff",
        },
        reverse: false,
    },
    {
        title: "Expensey — AI-Powered Expense Tracker",
        description:
            "A smart financial tracking application that combines structured expense management with AI-driven insights. Users can record daily transactions, categorize spending, and visualize financial data through interactive dashboards. Integrated NLP-based natural language expense entry.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", // Placeholder
        tags: ["Finance", "AI", "Dashboard", "NLP"],
        links: {
            demo: "https://expenseyy.vercel.app/",
            github: "https://github.com/usmanashraff",
        },
        reverse: true,
    },
    {
        title: "HashExplorer — Universal Text-to-Hash Tool",
        description:
            "A browser-based cryptographic utility that converts input text into secure hashes using multiple algorithms including SHA-256 and SHA-3. All processing is performed client-side to ensure privacy and security, delivering instant, real-time hash outputs without transmitting data externally.",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop", // Placeholder
        tags: ["Cryptography", "Privacy", "Client-side", "Security"],
        links: {
            demo: "https://hashexplorer.vercel.app/",
            github: "https://github.com/usmanashraff",
        },
        reverse: false,
    },
    {
        title: "VocalSense AI — Speech-to-Text Web Application",
        description:
            "An AI-powered voice analysis platform that converts audio input into accurate text using advanced speech recognition models. Features secure authentication, seamless upload-to-result workflow, and a clean modern interface built with shadcn components.",
        image: "https://images.unsplash.com/photo-1614741118830-c7344c2be209?w=800&h=600&fit=crop", // Placeholder
        tags: ["AI", "Speech Recognition", "Shadcn", "Authentication"],
        links: {
            demo: "https://vocalsense.vercel.app/",
            github: "https://github.com/usmanashraff",
        },
        reverse: true,
    },
];

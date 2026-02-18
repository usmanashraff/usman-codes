import Header from "@/components/Header";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
    return (
        <>
            <Header forceDark={true} />
            <main style={{ paddingTop: "80px" }}>
                <ProjectsSection />
            </main>
            <Footer />
        </>
    );
}

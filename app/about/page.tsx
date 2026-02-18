import Header from "@/components/Header";
import AboutPage from "@/components/AboutPage";
import Footer from "@/components/Footer";

export default function About() {
    return (
        <>
            <Header forceDark={true} />
            <main>
                <AboutPage />
            </main>
            <Footer />
        </>
    );
}

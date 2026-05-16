import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 80 }}>
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}

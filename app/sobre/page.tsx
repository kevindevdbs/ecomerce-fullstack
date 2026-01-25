// app/sobre/page.tsx
import AboutHeroSection from "../../components/about/AboutHeroSection";
import ArtistStorySection from "../../components/about/ArtistStorySection";
import ProcessSection from "../../components/about/ProcessSection";
import AboutCTASection from "../../components/about/AboutCTASection";

// Importe seu Header aqui, se ele não estiver no layout principal
// import Header from "@/components/Header";

export default function PageAbout() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Se precisar do Header específico nesta página, descomente abaixo */}
      {/* <Header /> */}

      <AboutHeroSection />

      <ArtistStorySection />

      <ProcessSection />

      <AboutCTASection />

      {/* O Footer geralmente vai no arquivo layout.tsx, mas se precisar dele aqui, importe-o */}
      {/* <Footer /> */}
    </main>
  );
}

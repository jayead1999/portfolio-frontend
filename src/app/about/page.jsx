import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/sections/About";

export const metadata = {
  title: "About | Jayead.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-primary/30 flex flex-col">
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="pt-20 flex-grow">
        <div className="container mx-auto px-6 md:px-12 pt-16">
          <div className="max-w-3xl mb-8">
            <h1 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">About Me</h1>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 font-serif">
              The Developer.
            </h2>
          </div>
        </div>
        
        {/* We reuse the generic About section */}
        <div className="pb-16">
          <AboutSection />
        </div>
      </div>

      <Footer />
    </main>
  );
}

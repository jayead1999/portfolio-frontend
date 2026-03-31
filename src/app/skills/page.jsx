import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TechStack from "@/components/sections/TechStack";

export const metadata = {
  title: "Skills | Jayead.",
};

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-primary/30 flex flex-col">
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="pt-20 flex-grow">
        <div className="container mx-auto px-6 md:px-12 pt-16 -mb-20">
          <div className="max-w-3xl mb-8">
            <h1 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Core Competencies</h1>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 font-serif">
              My Skills.
            </h2>
          </div>
        </div>
        
        {/* Reuse the skills section UI */}
        <div className="pb-16">
          <TechStack />
        </div>
      </div>

      <Footer />
    </main>
  );
}

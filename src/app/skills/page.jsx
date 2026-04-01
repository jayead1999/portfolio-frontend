import TechStack from "@/components/sections/TechStack";
import SEO from "@/components/SEO";

export const metadata = {
  title: "Skills & Technologies | Towfique Hasan Jayead",
  description: "Core competencies and technical skills of Towfique Hasan Jayead, including React, Next.js, Laravel, and more.",
  openGraph: {
    title: "Skills & Technologies | Towfique Hasan Jayead",
    description: "Core competencies and technical skills of Towfique Hasan Jayead, including React, Next.js, Laravel, and more.",
    url: "https://jayead.dev/skills",
    type: "website",
  },
};

export default function SkillsPage() {
  return (
    <>
      <SEO 
        title="Skills | Towfique Hasan Jayead"
        description="Technical skills and expertise of Towfique Hasan Jayead in modern web development."
        url="https://jayead.dev/skills"
      />
      <div className="container mx-auto px-6 md:px-12 pt-16 mt-16 -mb-20">
        <div className="max-w-3xl mb-8">
          <h1 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Core Competencies</h1>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 font-serif">
            My Skills.
          </h2>
        </div>
      </div>
      
      <div className="pt-16">
        <TechStack />
      </div>
    </>
  );
}

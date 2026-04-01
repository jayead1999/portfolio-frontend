import AboutSection from "@/components/sections/About";
import SEO from "@/components/SEO";

export const metadata = {
  title: "About | Towfique Hasan Jayead",
  description: "Learn more about Md Towfique Hasan Jayead, a Full Stack Developer specializing in React, Next.js, and Laravel.",
  openGraph: {
    title: "About | Towfique Hasan Jayead",
    description: "Learn more about Md Towfique Hasan Jayead, a Full Stack Developer specializing in React, Next.js, and Laravel.",
    url: "https://jayead.dev/about",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <>
      <SEO 
        title="About | Towfique Hasan Jayead"
        description="Learn more about Md Towfique Hasan Jayead, a Full Stack Developer specializing in React, Next.js, and Laravel."
        url="https://jayead.dev/about"
      />
      <div className="container mx-auto px-6 md:px-12 pt-16 md:pt-32">
        <div className="max-w-3xl">
          <h1 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">About Me</h1>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 font-serif">
            The Developer.
          </h2>
        </div>
      </div>
      
      <div className="pb-16">
        <AboutSection />
      </div>
    </>
  );
}

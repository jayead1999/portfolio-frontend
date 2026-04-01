import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import SEO from "@/components/SEO";

export const metadata = {
  title: "Md Towfique Hasan Jayead | Full Stack Web Developer",
  description: "Portfolio of Md Towfique Hasan Jayead, a passionate Full Stack Web Developer specializing in Next.js, React, and Laravel.",
  openGraph: {
    title: "Md Towfique Hasan Jayead | Full Stack Web Developer",
    description: "Portfolio of Md Towfique Hasan Jayead, a passionate Full Stack Web Developer specializing in Next.js, React, and Laravel.",
    url: "https://jayead.dev",
    siteName: "Towfique Hasan Jayead",
    images: [
      {
        url: "https://jayead.dev/images/hero/hero.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Towfique Hasan Jayead | Full Stack Web Developer",
    description: "Portfolio of Md Towfique Hasan Jayead, a passionate Full Stack Web Developer specializing in Next.js, React, and Laravel.",
    images: ["https://jayead.dev/images/hero/hero.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <SEO 
        title="Towfique Hasan Jayead | Full Stack Developer"
        description="Portfolio of Md Towfique Hasan Jayead, a passionate Full Stack Web Developer specializing in Next.js, React, and Laravel."
        url="https://jayead.dev"
      />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Pricing />
      <Testimonials />
      <Contact />
    </>
  );
}

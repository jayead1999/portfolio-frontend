import ProjectsPageClient from "./ProjectsPageClient";
import SEO from "@/components/SEO";

export const metadata = {
  title: "Projects | Towfique Hasan Jayead",
  description: "Explore a collection of scalable web applications, client solutions, and open source projects I have engineered using React, Next.js, and Laravel.",
  openGraph: {
    title: "Projects | Towfique Hasan Jayead",
    description: "Explore a collection of scalable web applications, client solutions, and open source projects I have engineered using React, Next.js, and Laravel.",
    url: "https://jayead.dev/projects",
    type: "website",
    images: [
      {
        url: "https://jayead.dev/images/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Towfique Hasan Jayead",
    description: "Explore projects built by Towfique Hasan Jayead using React, Next.js, and Laravel.",
    images: ["https://jayead.dev/images/og-image.jpg"],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <SEO 
        title="Projects | Towfique Hasan Jayead"
        description="Explore projects built by Towfique Hasan Jayead using React, Next.js, and Laravel."
        url="https://jayead.dev/projects"
      />
      <ProjectsPageClient />
    </>
  );
}

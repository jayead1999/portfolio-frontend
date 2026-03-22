import Link from "next/link";
import { FiArrowRight, FiGithub, FiExternalLink } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Native fetch for Next.js Server Component to fetch all projects
async function getAllProjects() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  // Use no-store or revalidate depending on application needs, here caching for 60s
  const res = await fetch(`${API_URL}/projects`, {
    next: { revalidate: 60 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }
  
  return res.json();
}

export const metadata = {
  title: "All Projects | Jayead.",
  description: "Browse all the web applications, APIs, and digital products I have built over my career.",
};

export default async function ProjectsDirectory() {
  let projects = [];

  try {
    const data = await getAllProjects();
    if (data && data.data) {
      projects = data.data;
    }
  } catch (err) {
    // Fallbacks if backend doesn't have projects yet
    projects = [
      {
        id: 1,
        slug: "e-commerce-microservices",
        title: "E-Commerce Microservices",
        description: "A large-scale e-commerce platform built on microservices architecture featuring independent deployability, highly scalable nodes, and seamless cart systems.",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1600&auto=format&fit=crop",
        tags: ["Next.js", "Laravel", "Docker", "Stripe"],
        project_type: "web_app"
      },
      {
        id: 2,
        slug: "real-time-chat",
        title: "Real-time Chat Application",
        description: "Secure, real-time messaging application with end-to-end encryption, typing indicators, read receipts, and multimedia sharing capabilities.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1600&auto=format&fit=crop",
        tags: ["React", "Express", "Socket.io", "MongoDB"],
        project_type: "full_stack"
      },
      {
        id: 3,
        slug: "ai-image-generator",
        title: "AI Image Generator Dashboard",
        description: "A sleek interface connected to advanced Machine Learning models empowering users to generate high-quality images from text prompts within seconds.",
        image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1600&auto=format&fit=crop",
        tags: ["Vue", "Tailwind", "Python", "FastAPI"],
        project_type: "open_source"
      },
      {
        id: 4,
        slug: "fintech-dashboard",
        title: "Fintech Analytics Dashboard",
        description: "Comprehensive financial analytics dashboard with real-time charting, transactional data aggregation, and sophisticated filtering.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
        tags: ["React", "D3.js", "Node", "PostgreSQL"],
        project_type: "client_work"
      }
    ];
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#a89076]/30 font-sans">
      <Navbar />

      <div className="pt-32 pb-24 md:pt-48">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="max-w-3xl mb-16 md:mb-24">
            <h1 className="text-sm font-bold tracking-[0.2em] text-[#a89076] uppercase mb-4">Project Directory</h1>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 font-serif">
              All Works.
            </h2>
            <p className="text-xl md:text-2xl text-[#999999] leading-relaxed">
              Explore a collection of scalable web applications, client solutions, and open source projects I have engineered throughout my career.
            </p>
          </div>

          {/* Filter/Search Bar (UI only placeholder for future functionality) */}
          <div className="flex flex-col md:flex-row justify-between items-center gab-4 mb-12 border-b border-[#222222] pb-6">
            <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
              <button className="px-5 py-2 bg-[#111111] text-white border border-[#333333] hover:border-[#a89076] font-bold text-sm whitespace-nowrap transition-colors">All Projects</button>
              <button className="px-5 py-2 border border-[#222222] text-[#777] hover:text-white hover:border-[#444] transition-colors text-sm whitespace-nowrap">Web Apps</button>
              <button className="px-5 py-2 border border-[#222222] text-[#777] hover:text-white hover:border-[#444] transition-colors text-sm whitespace-nowrap">Full Stack</button>
              <button className="px-5 py-2 border border-[#222222] text-[#777] hover:text-white hover:border-[#444] transition-colors text-sm whitespace-nowrap">Open Source</button>
            </div>
          </div>

          {/* Grid setup mimicking Projects section but spanning differently */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
            {projects.map((project, index) => {
               const projectImage = project.image || (project.images && project.images[0]?.image_path) || "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1600&auto=format&fit=crop";
               const slug = project.slug || 'sample';

               return (
                <div 
                  key={project.id || index}
                  className="group overflow-hidden bg-[#111111] border border-[#222222] hover:border-[#a89076] transition-all flex flex-col h-full relative group shadow-lg"
                >
                  <Link href={`/projects/${slug}`} className="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-[#a89076]">
                    <span className="sr-only">View Details for {project.title}</span>
                  </Link>

                  <div className="relative h-64 overflow-hidden bg-black border-b border-[#222222]">
                    <img
                      src={projectImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    
                    <div className="absolute top-4 left-4 z-20 pointer-events-none">
                       {project.project_type && (
                         <span className="backdrop-blur-md bg-black/60 border border-[#333] px-3 py-1.5 text-xs font-bold text-[#a89076] tracking-wide uppercase">
                           {project.project_type.replace('_', ' ')}
                         </span>
                       )}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col grow z-0">
                    <h3 className="text-2xl font-black text-white mb-3 group-hover:text-[#a89076] font-serif transition-colors pr-8">
                      {project.title}
                    </h3>
                    <p className="text-[#999999] mb-8 line-clamp-3 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-[#222222] flex items-center justify-between">
                       <span className="text-[#a89076] font-medium text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                         View Details
                         <FiArrowRight />
                       </span>
                       
                       {/* Floating links behind absolute link using absolute z-20 logic mapped previously */}
                       {(project.github_url || project.live_url) && (
                         <div className="flex gap-2 relative z-20">
                           {project.github_url && (
                             <a href={project.github_url} target="_blank" rel="noreferrer" className="p-2 text-[#777] hover:text-white hover:bg-[#222] transition-colors focus:ring-2 focus:ring-[#a89076]">
                               <FiGithub size={18} />
                               <span className="sr-only">Github source code</span>
                             </a>
                           )}
                           {project.live_url && (
                             <a href={project.live_url} target="_blank" rel="noreferrer" className="p-2 text-[#777] hover:text-white hover:bg-[#222] transition-colors focus:ring-2 focus:ring-[#a89076]">
                               <FiExternalLink size={18} />
                               <span className="sr-only">Live Demo</span>
                             </a>
                           )}
                         </div>
                       )}
                    </div>
                  </div>
                </div>
               );
            })}
          </div>

          {projects.length === 0 && (
             <div className="text-center py-32 border border-[#222222] border-dashed bg-[#111111]">
                <h3 className="text-2xl font-bold text-white mb-2">No projects found.</h3>
                <p className="text-[#999999]">Check back later for updates to the portfolio directory.</p>
             </div>
          )}

        </div>
      </div>

      <Footer />
    </main>
  );
}

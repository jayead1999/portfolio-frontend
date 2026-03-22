import Link from "next/link";
import { FiArrowLeft, FiGithub, FiExternalLink, FiCalendar, FiUser, FiInfo } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Native fetch for Next.js Server Component to fetch specific project
async function getProjectDetails(slug) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  
  // Try to fetch, return null instead of throwing if not found to handle gracefully 
  try {
    const res = await fetch(`${API_URL}/projects/${slug}`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  // Access params.slug synchronously
  const slug = params.slug;
  const data = await getProjectDetails(slug);
  
  if (!data || !data.data) {
    return { title: 'Project Not Found | Jayead.' };
  }
  
  return {
    title: `${data.data.title} | Jayead Works`,
    description: data.data.description,
  };
}

export default async function ProjectDetails({ params }) {
  // In Next.js App Router, page properties are passed as plain objects
  const slug = params.slug;
  const projectData = await getProjectDetails(slug);
  
  let project = projectData?.data;

  // Graceful visual fallback for demo purposes if backend isn't ready
  if (!project) {
    if (slug === 'sample') {
       project = {
         title: "Sample Dashboard Project",
         description: "A comprehensive analytics dashboard mapping real-time data visualisations for client performance matrix.",
         content: "<p>This is a detailed overview mapping the structural flow of the application architecture integrating websockets and react mapping.</p><p>We focused primarily on optimization and render loops.</p>",
         client_name: "Acme Corp",
         role: "Lead Full Stack Engineer",
         timeline: "Jan 2025 - Mar 2026",
         project_type: "saas_dashboard",
         is_featured: true,
         live_url: "https://example.com",
         github_url: "https://github.com/example",
         tags: ["Next.js", "TailwindCSS", "PostgreSQL", "Laravel"],
         images: [
           { image_path: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop" },
           { image_path: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop" }
         ]
       };
    } else {
      return (
        <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-center items-center text-center px-4 font-sans">
          <h1 className="text-4xl font-bold mb-4 font-serif">Project Not Found</h1>
          <p className="text-[#999999] mb-8">The project you are looking for does not exist or has been removed.</p>
          <Link href="/projects" className="px-6 py-3 bg-[#a89076] hover:bg-white text-black font-bold transition-colors">
            Return to Projects
          </Link>
        </main>
      );
    }
  }

  // Determine images
  const primaryImage = project.image || (project.images && project.images.length > 0 && project.images[0]?.image_path) || "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1600&auto=format&fit=crop";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#a89076]/30 font-sans">
      <Navbar />

      {/* Hero Section Container for Project */}
      <div className="relative h-[60vh] md:h-[70vh] w-full flex items-end pb-16 md:pb-24">
        <div className="absolute inset-0 z-0">
          <img 
            src={primaryImage} 
            alt={project.title} 
            className="w-full h-full object-cover object-center grayscale opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <div className="max-w-4xl">
             <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link href="/projects" className="text-[#a89076] hover:text-white transition-colors flex items-center gap-2 text-sm font-bold tracking-wider uppercase">
                  <FiArrowLeft /> Back to Works
                </Link>
                <span className="text-[#555]">•</span>
                <span className="text-[#999999] text-sm uppercase tracking-wider font-bold">
                  {project.project_type?.replace('_', ' ') || 'Case Study'}
                </span>
             </div>
             
             <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.1] font-serif">
               {project.title}
             </h1>
             
             <p className="text-xl md:text-2xl text-[#999999] leading-relaxed">
               {project.description}
             </p>

             <div className="flex flex-wrap gap-4 mt-8">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#a89076] hover:bg-white text-black font-bold transition-colors flex items-center gap-2">
                    <FiExternalLink /> View Live Project
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#111111] hover:bg-[#222222] border border-[#333333] text-white font-bold transition-colors flex items-center gap-2">
                    <FiGithub /> View Source
                  </a>
                )}
             </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-[#222222]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-serif">Project Overview</h2>
              <div className="prose prose-invert prose-lg max-w-none text-[#999999] opacity-90 leading-loose">
                {project.content ? (
                  <div dangerouslySetInnerHTML={{ __html: project.content }} />
                ) : (
                  <p>{project.long_description || project.description}</p>
                )}
              </div>

              {/* Technologies Section mapped inline if no standard format */}
              <div className="mt-16 pt-12 border-t border-[#222222]">
                <h3 className="text-xl font-bold mb-6 font-serif">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {(project.tags || project.technologies?.map(t => t.name) || ["React", "Node.js"]).map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-[#111111] border border-[#333333] text-[#a89076] font-bold text-xs uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column Meta Details Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-[#111111] border border-[#222222] p-8 md:p-10 sticky top-32">
                <h3 className="text-xl font-bold mb-8 border-b border-[#333333] pb-4 font-serif">Project Details</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-[#555] uppercase tracking-wider mb-2">Client / Company</h4>
                    <p className="text-white font-bold">{project.client_name || "Internal Portfolio"}</p>
                  </div>
                  
                  {project.role && (
                    <div>
                      <h4 className="text-xs font-bold text-[#555] uppercase tracking-wider mb-2">My Role</h4>
                      <p className="text-white font-bold">{project.role}</p>
                    </div>
                  )}

                  {project.timeline && (
                    <div>
                      <h4 className="text-xs font-bold text-[#555] uppercase tracking-wider mb-2">Timeline</h4>
                      <p className="text-white font-bold">{project.timeline}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-bold text-[#555] uppercase tracking-wider mb-2">Status</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-[#a89076]"></span>
                      <p className="text-white font-bold">{project.is_featured ? "Completed & Featured" : "Delivered"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

        {project.images && project.images.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#222222]">
            <h3 className="text-2xl md:text-3xl font-black mb-10 font-serif">Project Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.images.map((img, i) => (
                 <div key={i} className="relative h-64 md:h-96 w-full rounded-none overflow-hidden bg-black border border-[#222222]">
                   <img 
                     src={img.image_path} 
                     alt={`Gallery image ${i+1}`}
                     className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                   />
                 </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

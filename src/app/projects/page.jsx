"use client";

import Link from "next/link";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { fetchAllProjects } from "@/lib/api";
import Image from "next/image";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '');
function resolveImageUrl(path) {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  // Clean leading slash and handle storage/ prefix if it exists
  let cleanPath = path.startsWith('/') ? path.substring(1) : path;
  if (cleanPath.startsWith('storage/')) {
    cleanPath = cleanPath.substring(8);
  }
  
  const baseUrl = BACKEND_URL.endsWith('/') ? BACKEND_URL.slice(0, -1) : BACKEND_URL;
  return `${baseUrl}/storage/${cleanPath}`;
}

function getProjectImage(project) {
  const raw = project.image || (project.gallery_images && project.gallery_images[0]);
  return resolveImageUrl(raw);
}

export default function ProjectsDirectory() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetchAllProjects();
        if (response.data && Array.isArray(response.data)) {
          setProjects(response.data);
        } else if (response.data && response.data.data) {
          setProjects(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#a89076]/30 font-sans flex items-center justify-center">
        <div className="text-[#a89076] animate-pulse">Loading projects...</div>
      </main>
    );
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
               const projectImage = getProjectImage(project);
               const slug = project.slug || 'sample';

               return (
                <div 
                  key={project.id || index}
                  className="group overflow-hidden bg-[#111111] border border-[#222222] hover:border-[#a89076] transition-all flex flex-col h-full relative group shadow-lg"
                >
                  {/* <Link href={`/projects/${slug}`} className="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-[#a89076]">
                    <span className="sr-only">View Details for {project.title}</span>
                  </Link> */}

                  <div className="relative h-64 overflow-hidden bg-black border-b border-[#222222]">
                    <Image
                      src={projectImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    
                    <div className="absolute top-4 left-4 z-20 pointer-events-none">
                       {(project.tag || project.tags || project.project_type) && (
                         <span className="backdrop-blur-md bg-black/60 border border-[#333] px-3 py-1.5 text-xs font-bold text-[#a89076] tracking-wide uppercase">
                           {project.tag?.[0] || project.tags?.[0] || project.project_type?.replace('_', ' ')}
                         </span>
                       )}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col grow z-0">
                    <h3 className="text-2xl font-black text-white mb-3 group-hover:text-[#a89076] font-serif transition-colors pr-8">
                      {project.title}
                    </h3>
                    <p className="text-[#999999] mb-8 line-clamp-3 text-sm leading-relaxed">
                      {project.short_description || project.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-[#222222] flex items-center justify-between relative z-20">
                       <Link href={`/projects/${slug}`} className="text-[#a89076] font-medium text-sm flex items-center gap-1 hover:text-white transition-colors group/link">
                         View Details
                         <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                       </Link>
                       
                       {project.link && (
                           <a href={project.link} target="_blank" rel="noreferrer" className="px-4 py-2 bg-[#111111] hover:bg-[#222222] border border-[#333333] hover:border-[#a89076] text-white hover:text-[#a89076] text-xs font-bold uppercase transition-colors flex items-center gap-2 focus:ring-2 focus:ring-[#a89076]">
                             <FiExternalLink size={14} />
                             Live Demo
                           </a>
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

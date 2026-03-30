"use client";

import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiGithub, FiExternalLink } from "react-icons/fi";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect, use, useRef } from "react";
import { fetchProjectBySlug } from "@/lib/api";
import Image from "next/image";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1600&auto=format&fit=crop";

function resolveImageUrl(path) {
  if (!path) return FALLBACK_IMAGE;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  
  // Clean leading slash and handle storage/ prefix if it exists
  let cleanPath = path.startsWith('/') ? path.substring(1) : path;
  if (cleanPath.startsWith('storage/')) {
    cleanPath = cleanPath.substring(8);
  }
  
  const baseUrl = BACKEND_URL.endsWith('/') ? BACKEND_URL.slice(0, -1) : BACKEND_URL;
  return `${baseUrl}/storage/${cleanPath}`;
}

export default function ProjectDetails({ params }) {
  const { slug } = use(params);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await fetchProjectBySlug(slug);
        if (response.data && response.data.data) {
          setProject(response.data.data);
        } else if (response.data) {
          setProject(response.data);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    getProject();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#a89076]/30 font-sans flex items-center justify-center">
        <div className="text-[#a89076] animate-pulse">Loading project details...</div>
      </main>
    );
  }

  // Graceful visual fallback for demo purposes if backend isn't ready

  // Determine images
  const primaryImage = resolveImageUrl(project.image || (project.gallery_images && project.gallery_images.length > 0 && project.gallery_images[0]));

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#a89076]/30 font-sans">
      <Navbar />

      {/* Hero Section Container for Project */}
      <div className="relative h-[60vh] md:h-[70vh] w-full flex items-end pb-16 md:pb-24">
        <div className="absolute inset-0 z-0">
          <Image 
            src={primaryImage} 
            alt={project.title} 
            fill
            sizes="100vw"
            priority
            className="object-cover object-center  opacity-60"
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
               {project.short_description || project.description}
             </p>

             <div className="flex flex-wrap gap-4 mt-8">
                {(project.link || project.live_url) && (
                  <a href={project.link || project.live_url} target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#a89076] hover:bg-white text-black font-bold transition-colors flex items-center gap-2">
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
                {project.feature_dis && (
                  <div className="mb-12">
                    <h3 className="text-xl font-bold mb-6 font-serif">Key Features</h3>
                    <p className="text-[#999999] opacity-90 leading-loose">
                      {project.feature_dis}
                    </p>
                  </div>
                )}

                <h3 className="text-xl font-bold mb-6 font-serif">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {(project.technology || project.tags || project.technologies?.map(t => t.name) || project.tag || []).map((tech, i) => (
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

        {(project.gallery_images || project.images) && (project.gallery_images?.length > 0 || project.images?.length > 0) && (
          <div className="mt-20 pt-16 border-t border-[#222222]">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-10">
              <h3 className="text-2xl md:text-3xl font-black font-serif">Project Gallery</h3>
              {((project.gallery_images || project.images).length > 3) && (
                <div className="flex gap-3">
                  <button onClick={scrollLeft} className="w-12 h-12 flex items-center justify-center border border-[#333333] bg-[#111111] rounded-full hover:bg-[#a89076] hover:text-[#0a0a0a] transition-all" aria-label="Previous image">
                    <FiArrowLeft size={20} />
                  </button>
                  <button onClick={scrollRight} className="w-12 h-12 flex items-center justify-center border border-[#333333] bg-[#111111] rounded-full hover:bg-[#a89076] hover:text-[#0a0a0a] transition-all" aria-label="Next image">
                    <FiArrowRight size={20} />
                  </button>
                </div>
              )}
            </div>
            <div ref={sliderRef} className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {(project.gallery_images || project.images).map((img, i) => (
                 <div 
                   key={i} 
                   className="flex-none w-[85%] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] snap-start relative h-64 md:h-96 rounded-none overflow-hidden bg-black border border-[#222222]"
                 >
                   <Image 
                     src={resolveImageUrl(typeof img === 'string' ? img : img.image_path)} 
                     alt={`Gallery image ${i+1}`}
                     fill
                     className="object-cover transition-all duration-500"
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

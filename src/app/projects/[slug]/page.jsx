"use client";

import Link from "next/link";
import { 
  FiArrowLeft, 
  FiArrowRight, 
  FiGithub, 
  FiExternalLink, 
  FiUser, 
  FiTag, 
  FiCalendar, 
  FiMapPin, 
  FiMail, 
  FiGlobe,
  FiLayers,
  FiShield,
  FiCheckCircle,
  FiX
} from "react-icons/fi";
import { useState, useEffect, use, useRef } from "react";
import { fetchProjectBySlug } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";

import Image from "next/image";

export default function ProjectDetails({ params }) {
  const { slug } = use(params);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(null);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="mt-4 text-primary font-bold tracking-widest text-xs uppercase animate-pulse text-center">Loading</div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">Project Not Found</h1>
        <Link href="/projects" className="text-primary hover:underline flex items-center justify-center gap-2">
          <FiArrowLeft /> Back to Projects
        </Link>
      </div>
    );
  }

  // Determine images
  const primaryImage = resolveImageUrl(project.image || (project.gallery_images && project.gallery_images.length > 0 && project.gallery_images[0]));

  return (
    <>

      {/* Hero Header Section - Updated to Banner Style from Dummy */}
      <div className="relative h-[65vh] md:h-[75vh] w-full overflow-hidden">
        {/* Background Overlay Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={primaryImage} 
            alt={project.title} 
            fill
            sizes="100vw"
            priority
            className="object-cover object-center opacity-40 transition-transform duration-[10s] hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] z-0"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-20 h-full flex flex-col justify-end pb-12 md:pb-20">
          <div className="max-w-4xl space-y-6">
            {/* Breadcrumb Navigation style from dummy combined with existing */}
             <div className="flex flex-wrap items-center gap-3 mb-4">
                <Link href="/projects" className="text-primary hover:text-white transition-colors flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                  <FiArrowLeft /> Works
                </Link>
                <span className="text-white/20">|</span>
                <span className="text-white/60 text-xs uppercase tracking-widest font-medium">Case Study</span>
             </div>

            {/* Badges for tags and status */}
            <div className="flex flex-wrap gap-2">
              {(project.tag || project.project_type || []).toString().split(',').map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-primary text-black text-[10px] font-black tracking-widest uppercase rounded">
                  {tag.trim().replace('_', ' ')}
                </span>
              ))}
              {project.delivery_status && (
                <span className="px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase rounded">
                  {project.delivery_status.replace('_', ' ')}
                </span>
              )}
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-white drop-shadow-2xl">
              {project.title}
            </h1>
            
            <p className="text-lg md:text-2xl text-white/70 max-w-2xl leading-tight font-medium">
              {project.short_description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {(project.link || project.live_url) && (
                <a href={project.link || project.live_url} target="_blank" rel="noreferrer" 
                  className="flex items-center gap-2 px-8 py-4 bg-primary text-black text-xs font-black uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1 rounded-sm">
                  <FiExternalLink size={18} /> Live Link
                </a>
              )}
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noreferrer" 
                  className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all transform hover:-translate-y-1 rounded-sm">
                  <FiGithub size={18} /> Repository
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info Grid Section */}
      <section className="py-16 md:py-24 border-t border-white/5 bg-card/30">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-16">
              {/* Description */}
              <div>
                <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-8 flex items-center gap-3">
                  <span className="w-8 h-px bg-primary"></span> The Challenge
                </h2>
                <div className="prose prose-invert prose-lg max-w-none">
                  <div className="text-white/60 leading-relaxed space-y-6 text-lg">
                    {project.long_description ? (
                      project.long_description.split('\n').map((para, i) => (
                        <p key={i}>{para}</p>
                      ))
                    ) : (
                      <p>{project.description}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Updated Features as list items with checkmarks - Simple Inline Style */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-10 flex items-center gap-3">
                    <span className="w-8 h-px bg-primary"></span> Project Features
                  </h2>
                  <div className="space-y-4">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-1 group">
                        <div className="mt-1 shrink-0 text-primary transition-transform group-hover:scale-110">
                          <FiCheckCircle size={20} />
                        </div>
                        <div className="text-lg leading-relaxed antialiased">
                          <span className="font-bold text-white uppercase tracking-wider text-sm mr-2">{feature.name} :</span>
                          <span className="text-white/60 font-medium">{feature.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technology Use Section - Re-designed with name and image */}
              <div className="mt-16 pt-12 border-t border-white/5">
                <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-10 flex items-center gap-3">
                  <span className="w-8 h-px bg-primary"></span> Tech Architecture
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {project.technologies && project.technologies.length > 0 ? (
                    project.technologies.map((tech, i) => (
                      <div key={i} className="group relative">
                        {/* Interactive Backdrop Glow */}
                        <div className="absolute -inset-2 bg-linear-to-r from-primary/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative flex flex-col items-center p-6 bg-card border border-white/5 rounded-2xl group-hover:border-primary/40 group-hover:bg-white/3 transition-all duration-300">
                          {/* Tech Icon Container */}
                          <div className="w-16 h-16 relative mb-4 p-3 bg-white/3 rounded-2xl border border-white/5 group-hover:border-primary/20 group-hover:bg-white/5 transition-all transform group-hover:scale-110 group-hover:-rotate-3">
                             {tech.image ? (
                               <Image 
                                 src={resolveImageUrl(tech.image)} 
                                 alt={tech.name} 
                                 fill 
                                 className="object-contain p-3"
                               />
                             ) : (
                               <div className="w-full h-full flex items-center justify-center opacity-20">
                                 <FiLayers size={24} />
                               </div>
                             )}
                          </div>
                          
                          <div className="text-center">
                            <h4 className="text-xs font-black text-white uppercase tracking-[0.15em] mb-1 group-hover:text-primary transition-colors">{tech.name}</h4>
                            <div className="h-1 w-0 bg-primary mx-auto group-hover:w-8 transition-all duration-300 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    /* Fallback for legacy technology data or tags */
                    (project.technology || project.tags || []).map((tech, i) => (
                      <div key={i} className="group relative">
                         <div className="px-5 py-4 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3 hover:border-primary/30 transition-all">
                            <div className="w-2.5 h-2.5 rounded-full bg-primary group-hover:animate-ping shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                            <span className="text-white font-bold text-xs uppercase tracking-widest">{tech}</span>
                         </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar Column */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-8">
                {/* Information Card */}
                <div className="bg-card border border-white/5 p-10 rounded-2xl relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none"></div>
                  
                  <h3 className="text-xl font-bold mb-10 pb-6 border-b border-white/5 flex items-center gap-3">
                    <FiLayers className="text-primary" /> Client Details
                  </h3>

                  <div className="space-y-8">
                    {/* Client Info with Image if available */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                        {project.clients_image ? (
                          <Image src={resolveImageUrl(project.clients_image)} alt={project.clients_name} width={48} height={48} className="object-cover" />
                        ) : (
                          <FiUser className="text-white/40" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-1">Collaborator</h4>
                        <p className="text-white font-bold leading-tight">{project.clients_name || project.client_name || "Internal"}</p>
                        {project.clients_industry && project.clients_industry !== 'NUll' && (
                          <p className="text-white/40 text-xs mt-1 italic">{project.clients_industry}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-1 flex items-center gap-1.5">
                          <FiTag size={10} /> My Role
                        </h4>
                        <p className="text-white text-sm font-bold">{project.role || "Lead Developer"}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/60 mb-1 flex items-center gap-1.5">
                          <FiCalendar size={10} /> Delivered
                        </h4>
                        <p className="text-white text-sm font-bold">{project.year || new Date(project.created_at).getFullYear()}</p>
                      </div>
                    </div>

                    {/* Contact Details in Details Card */}
                    {(project.clients_email || project.clients_phone || project.clients_location) && (
                      <div className="pt-8 mt-8 border-t border-white/5 space-y-4">
                         {project.clients_location && project.clients_location !== 'USA' && (
                            <div className="flex items-center gap-3 text-xs text-white/40">
                              <FiMapPin className="text-primary/60 shrink-0" /> {project.clients_location}
                            </div>
                         )}
                         {project.clients_email && (
                            <div className="flex items-center gap-3 text-xs text-white/40">
                              <FiMail className="text-primary/60 shrink-0" /> {project.clients_email}
                            </div>
                         )}
                         {project.clients_website && project.clients_website !== 'Website Null' && (
                            <div className="flex items-center gap-3 text-xs text-white/40 overflow-hidden text-ellipsis whitespace-nowrap">
                              <FiGlobe className="text-primary/60 shrink-0" /> <a href={project.clients_website} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">{project.clients_website}</a>
                            </div>
                         )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Second Sidebar Card: Achievement/Status */}
                <div className="p-8 bg-primary/5 border border-primary/10 rounded-2xl shadow-xl">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary group-hover:animate-pulse">
                        <FiShield size={24} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-primary uppercase tracking-[0.2em]">Milestone Status</h4>
                        <p className="text-white font-bold">{project.delivery_status?.replace('_', ' ').toUpperCase() || 'LIVE'}</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - KEPT AS ORIGINAL DESIGN AS PER USER REQUEST */}
      {(project.gallery_images && project.gallery_images.length > 0) && (
        <section className="py-24 border-t border-white/5 overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-6 flex items-center gap-3">
                  <span className="w-8 h-px bg-primary"></span> Visual Narrative
                </h2>
                <h3 className="text-4xl md:text-5xl font-black tracking-tight italic">Design Evidence</h3>
              </div>
              
              <div className="flex gap-4">
                <button onClick={scrollLeft} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-card hover:bg-white hover:text-black transition-all">
                  <FiArrowLeft size={24} />
                </button>
                <button onClick={scrollRight} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-card hover:bg-white hover:text-black transition-all">
                  <FiArrowRight size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Slider Area - Optimized for 3 images on desktop */}
          <div className="container mx-auto px-6 md:px-12">
            <div 
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory pb-12 cursor-grab active:cursor-grabbing"
            >
              {project.gallery_images.map((galleryImg, i) => (
                <div 
                  key={i} 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedGalleryImage(galleryImg);
                  }}
                  className="shrink-0 w-[85vw] md:w-[45vw] lg:w-[calc(33.333%-1rem)] aspect-16/10 bg-white/5 border border-white/5 rounded-2xl overflow-hidden snap-center group cursor-pointer relative"
                >
                  <Image 
                    src={resolveImageUrl(galleryImg)} 
                    alt={`Gallery perspective ${i+1}`}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-black transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                      <FiExternalLink size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {selectedGalleryImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl p-4 md:p-12 animate-in fade-in duration-300">
          <button 
            onClick={() => setSelectedGalleryImage(null)}
            className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white hover:bg-primary hover:text-black transition-all z-[110]"
          >
            <FiX size={24} />
          </button>
          
          <div className="relative w-full h-full max-w-7xl max-h-[85vh] animate-in zoom-in duration-300">
             <Image 
                src={resolveImageUrl(selectedGalleryImage)} 
                alt="Enlarged view"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
          </div>
          
          {/* Overlay click to close */}
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedGalleryImage(null)}></div>
        </div>
      )}

      {/* Video Content Section if available */}
      {project.video && (
        <section className="py-24 border-t border-white/5 bg-black">
          <div className="container mx-auto px-6 md:px-12 text-center">
             <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-12">Direct Preview</h2>
             <div className="aspect-video w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.1)]">
                {project.video.includes('youtube.com') || project.video.includes('youtu.be') ? (
                  <iframe 
                    className="w-full h-full"
                    src={project.video.replace('watch?v=', 'embed/')} 
                    title="Work Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video controls className="w-full h-full">
                    <source src={resolveImageUrl(project.video)} type="video/mp4" />
                  </video>
                )}
             </div>
          </div>
        </section>
      )}

      {/* Bottom Navigation */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 bg-card border border-white/5 p-12 rounded-3xl overflow-hidden relative group">
             <div className="absolute top-0 left-0 w-2 h-full bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
             
             <div className="text-center md:text-left">
                <Link href="/projects" className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4 inline-block hover:text-white transition-colors">
                  Interested in this tech stack?
                </Link>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">Let&apos;s build something <span className="text-primary italic">scalable.</span></h3>
             </div>
             
             <Link href="/contact" className="px-10 py-5 bg-primary text-black font-black uppercase text-xs tracking-widest hover:bg-white transition-all transform group-hover:scale-105 rounded-sm">
                Initiate Project
             </Link>
          </div>
        </div>
      </section>

    </>
  );
}

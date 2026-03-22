"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { fetchFeaturedProjects } from "@/lib/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProjects()
      .then(res => {
        setProjects(res.data || []);
      })
      .catch(err => console.error("Error fetching projects:", err))
      .finally(() => setLoading(false));
  }, []);

  // Fallbacks if backend doesn't have projects yet
  const displayProjects = projects.length > 0 ? projects : [
    {
      id: 1,
      title: "E-Commerce Microservices",
      description: "A large-scale e-commerce platform built on microservices architecture featuring independent deployability, highly scalable nodes, and seamless cart systems.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1600&auto=format&fit=crop",
      tags: ["Next.js", "Laravel", "Docker", "Stripe"],
    },
    {
      id: 2,
      title: "Real-time Chat Application",
      description: "Secure, real-time messaging application with end-to-end encryption, typing indicators, read receipts, and multimedia sharing capabilities.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1600&auto=format&fit=crop",
      tags: ["React", "Express", "Socket.io", "MongoDB"],
    },
    {
      id: 3,
      title: "AI Image Generator Dashboard",
      description: "A sleek interface connected to advanced Machine Learning models empowering users to generate high-quality images from text prompts within seconds.",
      image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1600&auto=format&fit=crop",
      tags: ["Vue", "Tailwind", "Python", "FastAPI"],
    }
  ];

  return (
    <section id="projects" className="py-24 relative z-10 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 md:px-12 border-t border-[#222222] pt-24">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-sm font-bold tracking-[0.2em] text-[#a89076] uppercase mb-3">Portfolio</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight font-serif">Selected Works.</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/projects" className="inline-block mt-6 md:mt-0 px-8 py-3 bg-[#111111] hover:bg-white hover:text-black border border-[#333333] text-white font-bold transition-colors">
              View All Projects
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group overflow-hidden bg-[#111111] border border-[#222222] hover:border-[#a89076] transition-all flex flex-col h-full relative"
            >
              <Link href={`/projects/${project.slug || 'sample'}`} className="absolute inset-0 z-10">
                <span className="sr-only">View {project.title}</span>
              </Link>
              
              <div className="relative h-72 overflow-hidden bg-black">
                <img
                  src={project.image || (project.images && project.images[0]?.image_path) || "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1600&auto=format&fit=crop"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 z-20">
                   {project.github_url && (
                     <a href={project.github_url} target="_blank" rel="noreferrer" className="w-10 h-10 bg-black/80 backdrop-blur-md flex items-center justify-center text-[#999999] hover:text-white hover:bg-[#a89076] transition-colors border border-[#333]">
                       <FiGithub size={20} />
                     </a>
                   )}
                   {project.live_url && (
                     <a href={project.live_url} target="_blank" rel="noreferrer" className="w-10 h-10 bg-black/80 backdrop-blur-md flex items-center justify-center text-[#999999] hover:text-white hover:bg-[#a89076] transition-colors border border-[#333]">
                       <FiExternalLink size={20} />
                     </a>
                   )}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow z-0">
                <h4 className="text-2xl font-black text-white mb-4 group-hover:text-[#a89076] font-serif transition-colors">
                  {project.title}
                </h4>
                <p className="text-[#999999] mb-6 line-clamp-3 leading-relaxed text-sm">
                  {project.description}
                </p>
                
                <div className="mt-auto pt-6 border-t border-[#222222] flex flex-wrap gap-2">
                  {(project.tags || project.technologies?.map(t => t.name) || ["Next.js", "Tailwind"]).map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-black text-[#a89076] border border-[#333] tracking-wider text-[10px] font-bold uppercase relative z-20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { fetchAllProjects } from "@/lib/api";

const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_API_URL;

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllProjects()
      .then(res => {
        setProjects(res.data || []);
      })
      .catch(err => console.error("Error fetching projects:", err))
      .finally(() => setLoading(false));
  }, []);

  console.log('projects',projects);
  // Fallbacks removed per user request to show real API data

  return (
    <section id="projects" className="py-24 relative z-10 bg-background">
      <div className="container mx-auto px-6 md:px-12 border-t border-border pt-24">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-3">Portfolio</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight font-serif">Selected Works.</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/projects" className="inline-block mt-6 md:mt-0 px-8 py-3 bg-card hover:bg-white hover:text-black border border-border text-white font-bold transition-colors">
              View All Projects
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && <div className="text-white col-span-3 text-center py-10">Loading projects...</div>}
          {!loading && projects.length === 0 && <div className="text-white col-span-3 text-center py-10">No projects found.</div>}
          {projects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group overflow-hidden bg-card border border-border hover:border-primary transition-all flex flex-col h-full relative"
            >
              <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10">
                <span className="sr-only">View {project.title}</span>
              </Link>
              
              <div className="relative h-72 overflow-hidden bg-black">
                <Image
                  src={project?.image && `${IMAGE_BASE}/storage/${project.image}`}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 z-20">
                   {project.github_url && (
                     <a href={project.github_url} target="_blank" rel="noreferrer" className="w-10 h-10 bg-black/80 backdrop-blur-md flex items-center justify-center text-[#999999] hover:text-white hover:bg-primary transition-colors border border-border">
                       <FiGithub size={20} />
                     </a>
                   )}
                   {project.live_url && (
                     <a href={project.live_url} target="_blank" rel="noreferrer" className="w-10 h-10 bg-black/80 backdrop-blur-md flex items-center justify-center text-[#999999] hover:text-white hover:bg-primary transition-colors border border-border">
                       <FiExternalLink size={20} />
                     </a>
                   )}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow z-0">
                <h4 className="text-2xl font-black text-white mb-4 group-hover:text-primary font-serif transition-colors">
                  {project.title}
                </h4>
                <p className="text-[#999999] mb-6 line-clamp-3 leading-relaxed text-sm">
                  {project.short_description || project.description}
                </p>
                
                <div className="mt-auto pt-6 border-t border-[#222222] flex flex-wrap gap-2">
                  {(project.tags || project.tag || project.technologies?.map(t => t.name) || ["React", "Laravel"]).map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-black text-primary border border-border tracking-wider text-[10px] font-bold uppercase relative z-20">
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

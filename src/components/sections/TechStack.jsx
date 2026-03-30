"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
// import { fetchTechnologies } from "@/lib/api";
import {
  SiNextdotjs,
  SiReact,
  SiLaravel,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiTypescript
} from "react-icons/si";

export default function TechStack() {
  const [techs, setTechs] = useState([]);

  // useEffect(() => {
  //   fetchTechnologies()
  //     .then(res => setTechs(res.data || []))
  //     .catch(err => console.error("Error fetching technologies:", err));
  // }, []);

  // Fallback tech stack if backend doesn't exist
  const skills = [
    { name: "Next.js", icon: <SiNextdotjs size={40} className="text-white" /> },
    { name: "React", icon: <SiReact size={40} className="text-[#61DAFB]" /> },
    { name: "Laravel", icon: <SiLaravel size={40} className="text-[#FF2D20]" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={40} className="text-[#06B6D4]" /> },
    { name: "TypeScript", icon: <SiTypescript size={40} className="text-[#3178C6]" /> },
    { name: "MySQL", icon: <SiMysql size={40} className="text-[#4479A1]" /> },
    { name: "PostgreSQL", icon: <SiPostgresql size={40} className="text-[#336791]" /> },
    { name: "Docker", icon: <SiDocker size={40} className="text-[#2496ED]" /> }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      <div className="container mx-auto px-6 md:px-12 text-center border-t border-[#222222] pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-sm font-bold tracking-[0.2em] text-[#a89076] uppercase mb-3">Technologies</h2>
          <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight font-serif">Tools of the Trade.</h3>
          <p className="max-w-xl mx-auto text-[#999999] text-lg">
            I leverage modern web technologies to build scalable, high-performance applications from frontend interfaces to backend architecture.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group relative bg-[#111111] border border-[#222222] p-6 flex flex-col items-center gap-4 transition-all hover:border-[#a89076] min-w-[140px]"
            >
              <div className="transition-transform group-hover:scale-110 drop-shadow-md grayscale group-hover:grayscale-0">
                {skill.icon}
              </div>
              <span className="text-sm font-medium text-[#555555] group-hover:text-white transition-colors uppercase tracking-wider">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

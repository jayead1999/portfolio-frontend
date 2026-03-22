"use client";

import { motion } from "framer-motion";
import { FiCode, FiLayout, FiDatabase } from "react-icons/fi";

const services = [
  {
    icon: <FiLayout size={32} />,
    title: "Frontend Engineering",
    description: "Building responsive, accessible, and performant user interfaces using React, Next.js, and modern CSS frameworks like Tailwind.",
    color: "text-[#a89076]"
  },
  {
    icon: <FiDatabase size={32} />,
    title: "Backend Development",
    description: "Architecting scalable and secure APIs and server-side logic using PHP, Laravel, Node.js, and powerful relational databases.",
    color: "text-white"
  },
  {
    icon: <FiCode size={32} />,
    title: "Full Stack Integration",
    description: "Connecting the dots between frontend clients and complex backend systems to deliver cohesive and fully-functional web applications.",
    color: "text-[#999999]"
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 md:px-12 border-t border-[#222222] pt-24">
        
        <div className="block lg:flex justify-between items-end mb-16">
          <div className="max-w-2xl text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              What I Do.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#999999] text-lg leading-relaxed"
            >
              I bridge the gap between design and functionality, creating websites that are not only visually impressive but also technically brilliant. I approach every project with a focus on clean code, modern architecture, and a rich user experience.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-none border-l-4 hover:border-[#a89076] border-[#222222] bg-[#111111] hover:bg-[#151515] transition-colors group"
            >
              <div className={`mb-6 ${service.color}`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-serif">{service.title}</h3>
              <p className="text-[#999999] leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

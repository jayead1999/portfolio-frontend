"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { fetchAbout } from "@/lib/api";

export default function FloatingContact() {
  const [socials, setSocials] = useState(null);

  useEffect(() => {
    fetchAbout()
      .then((res) => setSocials(res.data))
      .catch((err) => console.error("Error fetching socials for floating menu:", err));
  }, []);

  const socialLinks = [
    {
      icon: <FaGithub />,
      href: socials?.github || "https://github.com/jayead",
      label: "GitHub",
      color: "hover:bg-white hover:text-black",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
    },
    {
      icon: <FaLinkedin />,
      href: socials?.linkedin || "https://linkedin.com/in/jayead",
      label: "LinkedIn",
      color: "hover:bg-[#0077b5] hover:text-white",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(0,119,181,0.4)]"
    },
    {
      icon: <FaWhatsapp />,
      href: socials?.whatsapp ? `https://wa.me/${socials.whatsapp.replace(/\D/g, '')}` : "https://wa.me/",
      label: "WhatsApp",
      color: "hover:bg-[#25d366] hover:text-white",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(37,211,102,0.4)]"
    },
    {
      icon: <FaEnvelope />,
      href: socials?.email ? `mailto:${socials.email}` : "mailto:hello@jayead.dev",
      label: "Email",
      color: "hover:bg-primary hover:text-black",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      style={{ y: "-50%" }}
      className="fixed right-6 md:right-8 top-1/2 z-50 hidden md:flex flex-col items-center gap-6"
    >
      {/* Decorative Line Top */}
      <div className="w-px h-12 bg-linear-to-t from-border to-transparent"></div>
      
      {/* Icon Container */}
      <div className="flex flex-col gap-5">
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 flex items-center justify-center rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl text-foreground/60 text-xl transition-all duration-300 relative group ${link.color} ${link.hoverShadow}`}
          >
            {link.icon}
            
            {/* Tooltip */}
            <span className="absolute right-full mr-4 px-3 py-1.5 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl translate-x-2 group-hover:translate-x-0">
              {link.label}
              {/* Tooltip Arrow */}
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-primary rotate-45"></div>
            </span>
          </motion.a>
        ))}
      </div>

      {/* Decorative Line Bottom */}
      <div className="w-px h-24 bg-linear-to-b from-border to-transparent"></div>
      
      {/* Sideways Text */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.5 }}
        className="vertical-text text-[10px] font-bold uppercase tracking-[0.4em] text-foreground select-none"
        style={{ writingMode: 'vertical-rl' }}
      >
        FOLLOW ME
      </motion.div>
    </motion.div>
  );
}

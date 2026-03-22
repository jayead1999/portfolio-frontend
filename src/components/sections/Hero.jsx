"use client";

import { motion } from "framer-motion";
import { FiTwitter, FiFacebook, FiGithub, FiLinkedin } from "react-icons/fi";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchAbout } from "@/lib/api";

export default function Hero() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetchAbout()
      .then(res => setAbout(res.data))
      .catch(err => console.error("Error fetching about info:", err));
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-[#0a0a0a] overflow-hidden flex items-center">
      {/* Background Image Container (Right Side) */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="w-full md:w-[60%] h-full relative">
          {/* Gradient overlay to seamlessly blend the left black background with the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 md:w-3/4"></div>
          {/* Bottom gradient snippet just in case */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 h-full"></div>
          
          <Image
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1500&auto=format&fit=crop"
            alt="Portrait"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover object-center grayscale opacity-60 md:opacity-100"
          />
        </div>
      </div>

      {/* Main Content (Left Side) */}
      <div className="container mx-auto px-6 md:px-12 relative z-20 w-full">
        <div className="max-w-3xl pt-24 pb-12">
          
          {/* Hero Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-[80px] font-black leading-[1.1] mb-12 tracking-tight font-serif"
          >
            <span className="text-[#a89076]">Hallo!</span> <span className="text-white">I am {about?.name?.split(' ')[about?.name?.split(' ').length - 1] || 'Jayead'},</span><br />
            <span className="text-white">Full Stack Developer based</span><br />
            <span className="text-white">in {about?.location?.split(',')[0] || 'Bangladesh'}.</span>
          </motion.h1>

          {/* Sub Navigation/Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <p className="text-[#999999] text-sm md:text-base font-medium mb-3">
              See bits and pieces of my code work and projects on
            </p>
            <div className="flex flex-wrap items-center gap-2 text-lg md:text-xl font-bold">
              <a href={about?.github_url || "https://github.com"} target="_blank" rel="noreferrer" className="text-[#f92672] hover:opacity-80 transition-opacity">
                GitHub
              </a>
              <span className="text-white">-</span>
              <a href={about?.linkedin_url || "https://linkedin.com"} target="_blank" rel="noreferrer" className="text-[#0055FF] hover:opacity-80 transition-opacity">
                LinkedIn
              </a>
              <span className="text-white">-</span>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-[#00a1f1] hover:opacity-80 transition-opacity">
                Twitter
              </a>
            </div>
          </motion.div>

          {/* Service Box */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-[#999999] text-xs font-bold tracking-[0.2em] uppercase mb-4">Service</p>
            <p className="text-white text-lg md:text-xl font-bold max-w-sm leading-snug">
              Frontend Engineering, Backend APIs &amp; Full Stack Solutions
            </p>
          </motion.div>

        </div>
      </div>

      {/* Floating Vertical Socials Map (Bottom Left) */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-12 left-6 md:left-12 z-30 flex flex-col gap-6 text-white"
      >
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#00a1f1] transition-colors">
          <FiTwitter size={20} />
          <span className="sr-only">Twitter</span>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#1877F2] transition-colors">
          <FiFacebook size={20} />
          <span className="sr-only">Facebook</span>
        </a>
        <a href={about?.github_url || "https://github.com"} target="_blank" rel="noreferrer" className="hover:text-[#f92672] transition-colors">
          <FiGithub size={20} />
          <span className="sr-only">GitHub</span>
        </a>
      </motion.div>

    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { FiTwitter, FiFacebook, FiGithub, FiLinkedin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchAbout, fetchHero, fetchTitles } from "@/lib/api";


const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_API_URL;
// const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_API_URL ?? "";

export default function Hero() {
  const [about, setAbout] = useState(null);
  const [hero, setHero] = useState(null);
  const [titles, setTitles] = useState([]);
  const [titlesIndex, setTitlesIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);


  useEffect(() => {
    // Featching about apis
    fetchAbout()
      .then(res => setAbout(res.data))
      .catch(err => console.error("Error fetching about info:", err));

    // Featching hero apis
    fetchHero()
      .then(res => setHero(res.data))
      .catch(err => console.error("Error fetching hero info:", err));

    // Featching titles apis
    fetchTitles()
      .then(res => setTitles(res.data || []))
      .catch(err => console.error("Error fetching titles info:", err));

  }, []);

  useEffect(() => {
    if (!titles || titles.length === 0) return;

    const handleTyping = () => {
      const currentTitle = titles[titlesIndex]?.title || "";
      
      if (!isDeleting) {
        if (displayedText.length < currentTitle.length) {
          setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentTitle.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setTitlesIndex((prev) => (prev + 1) % titles.length);
        }
      }
    };

    let timeoutSpeed = isDeleting ? 100 : 150;
    
    const currentTitle = titles[titlesIndex]?.title || "";
    if (!isDeleting && displayedText.length === currentTitle.length) {
      timeoutSpeed = 2000; // Wait at the end of typing
    } else if (isDeleting && displayedText.length === 0) {
      timeoutSpeed = 500; // Wait before starting next title
    }

    const timer = setTimeout(handleTyping, timeoutSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, titles, titlesIndex]);

  return (
    <section id="home" className="relative min-h-screen bg-[var(--background)] overflow-hidden flex items-center">
      {/* Background Image Container (Right Side) */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="w-full md:w-[60%] h-full relative">
          {/* Gradient overlay to seamlessly blend the left background with the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent z-10 md:w-3/4"></div>
          {/* Bottom gradient snippet just in case */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent z-10 h-full"></div>
          <Image
            src={hero?.hero_image ? `${IMAGE_BASE}/storage/${hero.hero_image}` : "/images/hero/hero.jpg"}
            alt="Portrait"
            fill
            className="object-cover object-center opacity-60 md:opacity-100"
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
            <span className="text-[#3390c5]">Hallo!</span> <span className="text-white">I am {about?.f_name || 'Towfique'}</span> <span className="text-white">{about?.l_name || 'Hasan'}</span><br />   
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-[60px] font-black leading-[1.1] mb-12 tracking-tight font-serif"
          >
            {/* <span className="text-[#a89076]">Hallo!</span> <span className="text-white">I am {about?.f_name || 'Towfique'}</span> <span className="text-white">{about?.l_name || 'Hasan'}</span><br /> */}

            <span className="text-[#06572e]"> <span>{`{`}</span>{displayedText}</span>
            <span className="text-[#c9431a] animate-pulse">|</span><span className="text-[#06572e]">{`}`}</span>
          </motion.h2>

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
              <a href={about?.github || "https://github.com"} target="_blank" rel="noreferrer" className="text-primary hover:opacity-80 transition-opacity">
                GitHub
              </a>
              <span className="text-white">-</span>
              <a href={about?.linkedin || "https://linkedin.com"} target="_blank" rel="noreferrer" className="text-[#0055FF] hover:opacity-80 transition-opacity">
                LinkedIn
              </a>
              <span className="text-white">-</span>
              <a href={about?.twitter || "https://twitter.com"} target="_blank" rel="noreferrer" className="text-[#00a1f1] hover:opacity-80 transition-opacity">
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
        className="absolute  left-6 md:left-12 z-30 flex flex-col gap-6 text-white"
      >
        {/* <a href={about?.twitter || "https://twitter.com"} target="_blank" rel="noreferrer" className="hover:text-[#00a1f1] transition-colors">
          <FiTwitter size={20} />
          <span className="sr-only">Twitter</span>
        </a> */}
        <a href={about?.facebook || "https://facebook.com/towfique.jayead"} target="_blank" rel="noreferrer" className="hover:text-[#1877F2] transition-colors">
          <FiFacebook size={20} />
          <span className="sr-only">Facebook</span>
        </a>
        <a href={about?.github || "https://github.com/jayead1999"} target="_blank" rel="noreferrer" className="hover:text-[#f92672] transition-colors">
          <FiGithub size={20} />
          <span className="sr-only">GitHub</span>
        </a>
        {/* Linkind */}
        <a href={about?.linkedin || "https://linkedin.com/in/md-towfique-hasan-jayead"} target="_blank" rel="noreferrer" className="hover:text-[#00a1f1] transition-colors">
          <FiLinkedin size={20} />
          <span className="sr-only">Linkedin</span>
        </a>
        {/* <a href={about?.whatsapp ? `https://wa.me/${about.whatsapp.replace(/\D/g, '')}` : "https://wa.me/+8801567909543"} target="_blank" rel="noreferrer" className="p-2 bg-white/5 text-slate-400 rounded-lg hover:text-white hover:bg-white/10 border border-white/5 transition-colors">
          <FaWhatsapp size={18} />
        </a> */}
      </motion.div>

      {/* Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

    </section>
  );
}

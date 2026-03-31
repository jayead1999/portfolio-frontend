"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiExternalLink, FiUser } from "react-icons/fi";
import { fetchTestimonials } from "@/lib/api";

const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_API_URL;

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials()
      .then(res => setTestimonials(res.data || []))
      .catch(err => console.error("Error fetching testimonials:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="testimonials" className="py-24 relative z-10 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 border-t border-border pt-24">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-3">Testimonials</h2>
          <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight font-serif uppercase">What Clients Say.</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="text-white col-span-3 text-center py-10 opacity-50">Loading testimonials...</div>
          ) : testimonials.length === 0 ? (
            <div className="text-white col-span-3 text-center py-10 opacity-50">No testimonials yet.</div>
          ) : (
            testimonials.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#05051a] border border-white/5 p-8 rounded-3xl relative flex flex-col h-full shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                {/* Quote Icon Background */}
                <div className="absolute top-6 right-8 text-primary/10 text-7xl font-serif select-none">
                  &quot;
                </div>

                {/* Review Text */}
                <p className="text-white/70 italic mb-8 relative z-10 leading-relaxed font-medium">
                  &ldquo;{item.review}&rdquo;
                </p>

                {/* Client Info */}
                <div className="mt-auto flex items-center gap-4 border-t border-white/5 pt-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 bg-white/5 flex items-center justify-center">
                    {item.profile_picture ? (
                      <Image
                        src={`${IMAGE_BASE}/storage/${item.profile_picture}`}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <FiUser size={24} className="text-white/20" />
                    )}
                  </div>
                  <div className="grow">
                    <h4 className="text-white font-bold text-lg leading-tight">{item.name}</h4>
                    <p className="text-primary text-xs font-bold uppercase tracking-widest mt-1">
                      {item.source || "Client"}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  {item.proof_link && (
                    <a
                      href={item.proof_link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 px-4 py-2 bg-white/5 hover:bg-primary hover:text-white border border-white/10 rounded-xl text-white/80 text-xs font-bold transition-all flex items-center justify-center gap-2 group"
                    >
                      <FiExternalLink className="group-hover:translate-x-1 transition-transform" />
                      View Proof
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

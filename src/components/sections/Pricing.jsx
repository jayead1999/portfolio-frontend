"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchPricings } from "@/lib/api";

export default function Pricing() {
  const [pricings, setPricings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPricings()
      .then(res => setPricings(res.data || []))
      .catch(err => console.error("Error fetching pricings:", err))
      .finally(() => setLoading(false));
  }, []);

  // Removed mock fallback to display actual API data

  return (
    <section id="pricing" className="py-24 relative z-10 bg-background">
      <div className="container mx-auto px-6 md:px-12 border-t border-border pt-24">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-3">Pricing</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight font-serif">Flexible Plans.</h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading && <div className="text-white col-span-3 text-center py-10">Loading pricing plans...</div>}
          {!loading && pricings.length === 0 && <div className="text-white col-span-3 text-center py-10">No pricing plans found.</div>}
          {pricings.map((pricing, index) => {
            const features = typeof pricing.features === 'string' ? JSON.parse(pricing.features) : pricing.features || [];
            return (
              <motion.div
                key={pricing.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group overflow-hidden bg-card border ${pricing.is_popular ? 'border-primary' : 'border-border'} hover:border-primary transition-all flex flex-col h-full relative p-8`}
              >
                {pricing.is_popular ? (
                  <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-3 py-1 uppercase tracking-wider">
                    Popular
                  </div>
                ) : null}
                <h4 className="text-2xl font-black text-white mb-2 font-serif transition-colors">
                  {pricing.plan_name}
                </h4>
                <div className="text-4xl font-black text-primary mb-6">
                  ${pricing.price}
                </div>
                
                <ul className="text-[#999999] mb-8 grow flex flex-col gap-3">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="text-primary">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="mt-auto py-3 px-6 bg-[#111111] hover:bg-white hover:text-black border border-[#333333] text-white font-bold transition-colors w-full">
                  Get Started
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

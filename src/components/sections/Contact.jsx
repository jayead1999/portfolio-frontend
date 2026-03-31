"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { submitContact, fetchAbout } from "@/lib/api";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetchAbout()
      .then(res => setAbout(res.data))
      .catch(err => console.error("Error fetching about info:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await submitContact(formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <section id="contact" className="py-32 relative bg-background">
      <div className="container mx-auto px-6 md:px-12 border-t border-border pt-24">
        
        <div className="flex flex-col lg:flex-row gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-3">Get in Touch</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white font-serif mb-6">Let&apos;s work together.</h3>
            <p className="text-[#999999] text-lg mb-10 max-w-md leading-relaxed">
              Whether you have a project in mind, a question, or just want to say hi, my inbox is always open. I&apos;ll try my best to get back to you!
            </p>

            <div className="bg-card border border-border p-8 mb-8">
              <h4 className="text-lg font-bold text-white mb-1">Email</h4>
              <p className="text-[#999999] mb-5">{about?.email || "hello@jayead.dev"}</p>

              <h4 className="text-lg font-bold text-white mb-1">Location</h4>
              <p className="text-[#999999] mb-5">{about?.city || "Dhaka, Bangladesh"}</p>

              <h4 className="text-lg font-bold text-white mb-2">Social</h4>
              <div className="flex flex-wrap gap-4 mt-2">
                {about?.linkedin && (
                  <a href={about.linkedin} target="_blank" rel="noreferrer" className="text-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-wider">LinkedIn</a>
                )}
                {about?.github && (
                  <a href={about.github} target="_blank" rel="noreferrer" className="text-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-wider">GitHub</a>
                )}
                {about?.twitter && (
                  <a href={about.twitter} target="_blank" rel="noreferrer" className="text-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-wider">Twitter</a>
                )}
                {about?.facebook && (
                  <a href={about.facebook} target="_blank" rel="noreferrer" className="text-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-wider">Facebook</a>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <form onSubmit={handleSubmit} className="bg-card border border-border p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-[#999999] uppercase tracking-wider mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a0a0a] border border-[#333333] px-4 py-3 text-white focus:outline-none focus:border-[#a89076] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-[#999999] uppercase tracking-wider mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-xs font-bold text-[#999999] uppercase tracking-wider mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-background border border-border px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-xs font-bold text-[#999999] uppercase tracking-wider mb-2">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-background border border-border px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                ></textarea>
              </div>

              {status === "success" && (
                <div className="bg-green-500/20 text-green-300 p-4 rounded-xl mb-6 text-sm border border-green-500/30">
                  Thanks! Your message has been sent successfully.
                </div>
              )}
              {status === "error" && (
                <div className="bg-red-500/20 text-red-300 p-4 rounded-xl mb-6 text-sm border border-red-500/30">
                  Oops! Something went wrong. Please try again later.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-white disabled:opacity-70 text-black font-bold py-4 px-8 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

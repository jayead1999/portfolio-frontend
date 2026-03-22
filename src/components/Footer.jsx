import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] py-12 border-t border-[#222222] relative z-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center justify-between text-center md:flex-row md:text-left gap-8">
        <div>
          <span className="text-xl font-bold tracking-tighter text-white block mb-2">
            Jayead.
          </span>
          <p className="text-[#999999] text-sm max-w-sm">
            Building digital experiences that combine stunning design with powerful backend architectures.
          </p>
        </div>

        <div className="flex flex-col m-auto md:m-0 items-center justify-center gap-4">
          <div className="flex gap-4 mb-2">
            <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">Home</Link>
            <Link href="/about" className="text-slate-400 hover:text-white text-sm transition-colors">About</Link>
            <Link href="/skills" className="text-slate-400 hover:text-white text-sm transition-colors">Skills</Link>
            <Link href="/projects" className="text-slate-400 hover:text-white text-sm transition-colors">Projects</Link>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 bg-white/5 text-slate-400 rounded-lg hover:text-white hover:bg-white/10 border border-white/5 transition-colors">
              <FiGithub size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 bg-white/5 text-slate-400 rounded-lg hover:text-white hover:bg-white/10 border border-white/5 transition-colors">
              <FiLinkedin size={18} />
            </a>
            <a href="mailto:hello@jayead.dev" className="p-2 bg-white/5 text-slate-400 rounded-lg hover:text-white hover:bg-white/10 border border-white/5 transition-colors">
              <FiMail size={18} />
            </a>
          </div>
        </div>

        <div className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Md Towfique Hasan Jayead. 
          <br className="md:hidden"/> All rights reserved.
        </div>
      </div>
    </footer>
  );
}

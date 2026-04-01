"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/flooting-contct";

export default function WebLayout({ children }) {
  return (
    // min-h-screen bg-background text-white selection:bg-primary/30 flex flex-col
    <div className="flex flex-col min-h-screen relative overflow-hidden  bg-background text-white selection:bg-primary/30">
      {/* Background Glow Effect */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full -z-1 pointer-events-none opacity-50"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full -z-1 pointer-events-none opacity-50"></div>

      {/* Navbar Container */}
      <Navbar />

      {/* Main Content */}
      <main className="grow relative z-10 w-full animate-in fade-in duration-700">
        <div className="h-full">
          {children}
        </div>
      </main>

      {/* Footer Container */}
      <Footer />

      {/* Floating Elements */}
      <FloatingContact />
    </div>
  );
}

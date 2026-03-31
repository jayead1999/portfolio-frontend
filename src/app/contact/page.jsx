import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/sections/Contact";

export const metadata = {
  title: "Contact | Jayead.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-primary/30 flex flex-col">
      <Navbar />
      
      {/* Spacer for fixed navbar */}
      <div className="pt-20 flex-grow">
        <div className="container mx-auto px-6 md:px-12 pt-16 -mb-20">
          <div className="max-w-3xl mb-8">
            <h1 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Reach Out</h1>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 font-serif">
              Contact Me.
            </h2>
          </div>
        </div>
        
        {/* Reuse the contact section UI */}
        <div className="pb-16 -mb-16">
          <ContactSection />
        </div>
      </div>

      <Footer />
    </main>
  );
}

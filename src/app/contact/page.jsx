import ContactSection from "@/components/sections/Contact";
import SEO from "@/components/SEO";

export const metadata = {
  title: "Contact | Towfique Hasan Jayead",
  description: "Get in touch with Md Towfique Hasan Jayead for collaboration, project inquiries, or any questions.",
  openGraph: {
    title: "Contact | Towfique Hasan Jayead",
    description: "Get in touch with Md Towfique Hasan Jayead for collaboration, project inquiries, or any questions.",
    url: "https://jayead.dev/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <SEO 
        title="Contact | Towfique Hasan Jayead"
        description="Get in touch for collaborations or project inquiries."
        url="https://jayead.dev/contact"
      />
      <div className="container mx-auto px-6 md:px-12 pt-32 -mb-20">
        <div className="max-w-3xl mb-8">
          <h1 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Reach Out</h1>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 font-serif">
            Contact Me.
          </h2>
        </div>
      </div>
      
      <div className="pt-16">
        <ContactSection />
      </div>
    </>
  );
}

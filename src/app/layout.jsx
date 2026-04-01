import "./globals.css";
import WebLayout from "@/components/layout/webLayout";

export const metadata = {
  title: {
    default: "Md Towfique Hasan Jayead | Full Stack Web Developer",
    template: "%s | Towfique Hasan Jayead",
  },
  description: "Portfolio of Md Towfique Hasan Jayead, a passionate Full Stack Web Developer specializing in Next.js, React, and Laravel.",
  keywords: ["Towfique Hasan Jayead", "Md Towfique Hasan Jayead", "Jayead", "Full Stack Developer", "React Developer", "Next.js Developer", "Laravel Developer"],
  authors: [{ name: "Md Towfique Hasan Jayead" }],
  creator: "Md Towfique Hasan Jayead",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jayead.dev",
    siteName: "Towfique Hasan Jayead",
    images: [
      {
        url: "https://jayead.dev/images/hero/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Towfique Hasan Jayead Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Towfique Hasan Jayead | Full Stack Web Developer",
    description: "Portfolio of Md Towfique Hasan Jayead, a passionate Full Stack Web Developer specializing in Next.js, React, and Laravel.",
    images: ["https://jayead.dev/images/hero/hero.jpg"],
    creator: "@jayead1999",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-background text-white antialiased selection:bg-primary/30 selection:text-white font-sans" suppressHydrationWarning>
          <WebLayout>
            {children}
          </WebLayout>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jayead | Full Stack Web Developer",
  description: "Portfolio of Md Towfique Hasan Jayead, a passionate Full Stack Web Developer specializing in Next.js, React, and Laravel.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased selection:bg-[#a89076]/30 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}

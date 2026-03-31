import "./globals.css";

export const metadata = {
  title: "Jayead | Full Stack Web Developer",
  description: "Portfolio of Md Towfique Hasan Jayead, a passionate Full Stack Web Developer specializing in Next.js, React, and Laravel.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-background text-white antialiased selection:bg-primary/30 selection:text-white font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

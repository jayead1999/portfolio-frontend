import Head from "next/head";

/**
 * SEO Component
 * NOTE: For Next.js App Router, it's recommended to also use the "metadata" export 
 * in your page.jsx for title and meta tags. This component is useful for JSON-LD 
 * and can be used in Pages Router as well.
 */
export default function SEO({
  title = "Towfique Hasan Jayead | Full Stack Developer",
  description = "Portfolio of Towfique Hasan Jayead (Md Towfique Hasan Jayead, Jayead), a Full Stack Developer specializing in React, Next.js, and Laravel.",
  url = "https://jayead.dev",
  image = "https://jayead.dev/images/hero/hero.jpg",
}) {
  return (
    <>
      <Head>
        {/* Basic SEO */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="Towfique Hasan Jayead, Md Towfique Hasan Jayead, Jayead, Full Stack Developer, React Developer, Next.js Developer, Laravel Developer"
        />
        <meta name="author" content="Md Towfique Hasan Jayead" />

        {/* Canonical */}
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* JSON-LD (🔥 important) - This works in App Router when rendered in the body */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Towfique Hasan Jayead",
            alternateName: [
              "Md Towfique Hasan Jayead",
              "Jayead"
            ],
            url: "https://jayead.dev",
            image: "https://jayead.dev/images/og-image.jpg",
            jobTitle: "Full Stack Developer",
            sameAs: [
              "https://github.com/jayead1999",
              "https://linkedin.com/in/md-towfique-hasan-jayead",
              // facebook instagram
              "https://facebook.com/towfique.jayead/",
              "https://instagram.com/_jayead_/"
            ]
          }),
        }}
      />
    </>
  );
}

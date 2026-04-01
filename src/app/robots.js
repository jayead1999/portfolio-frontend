export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"], // Common practice to hide admin/api
      },
    ],
    sitemap: "https://jayead.dev/sitemap.xml",
  };
}

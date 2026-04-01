import { fetchAllProjects } from "@/lib/api";

const BASE_URL = "https://jayead.dev";

export default async function sitemap() {
  // Static routes
  const routes = ["", "/about", "/projects", "/skills", "/contact"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic project routes
  let projectRoutes = [];
  try {
    const response = await fetchAllProjects();
    const projects = response.data?.data || response.data || [];
    
    if (Array.isArray(projects)) {
      projectRoutes = projects.map((project) => ({
        url: `${BASE_URL}/projects/${project.slug}`,
        lastModified: project.updated_at || new Date().toISOString().split("T")[0],
        changeFrequency: "weekly",
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("Error fetching projects for sitemap:", error);
  }

  return [...routes, ...projectRoutes];
}

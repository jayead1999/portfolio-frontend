import ProjectDetailsClient from "./ProjectDetailsClient";
import { fetchProjectBySlug } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";
import SEO from "@/components/SEO";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const response = await fetchProjectBySlug(slug);
    const project = response.data?.data || response.data;
    
    if (!project) return { title: "Project Not Found" };
    
    const primaryImage = resolveImageUrl(project.image || (project.gallery_images?.length > 0 && project.gallery_images[0]));
    
    return {
      title: `${project.title} | Towfique Hasan Jayead`,
      description: project.short_description || project.description,
      openGraph: {
        title: project.title,
        description: project.short_description || project.description,
        url: `https://jayead.dev/projects/${slug}`,
        images: [{ url: primaryImage }],
        type: 'article',
      },
      twitter: {
        card: "summary_large_image",
        title: project.title,
        description: project.short_description || project.description,
        images: [primaryImage],
      },
    };
  } catch {
    return { title: "Project Details" };
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  let project = null;
  
  try {
    const response = await fetchProjectBySlug(slug);
    project = response.data?.data || response.data;
  } catch (err) {
    console.error("Error fetching project for server render:", err);
  }

  return (
    <>
      {project && (
        <SEO 
          title={`${project.title} | Towfique Hasan Jayead`}
          description={project.short_description || project.description}
          url={`https://jayead.dev/projects/${slug}`}
          image={resolveImageUrl(project.image || (project.gallery_images?.length > 0 && project.gallery_images[0]))}
        />
      )}
      <ProjectDetailsClient slug={slug} initialProject={project} />
    </>
  );
}

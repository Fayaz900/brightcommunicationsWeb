import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { getServiceProjectBySlug } from "@/lib/service-projects";
import { getSiteSettings } from "@/lib/site-settings";
import { services } from "@/lib/site-content";
import { slugify } from "@/lib/slug";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

function getFallbackService(slug: string) {
  return services.find((item) => slugify(item.name) === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getServiceProjectBySlug(slug);
  const service = getFallbackService(slug);

  if (!project && !service) return { title: "Service project not found" };

  return {
    title: `${project?.title ?? service?.name} | Bright Communications`,
    description: project?.projectBrief ?? service?.desc,
  };
}

export default async function ServiceProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getServiceProjectBySlug(slug),
    getSiteSettings(),
  ]);
  const service = getFallbackService(slug);

  if (!project && !service) notFound();

  const title = project?.title ?? service?.name ?? "Service Project";
  const client = project?.client ?? "Bright Communications";
  const year = project?.year ?? new Date().getFullYear().toString();
  const industry = project?.industry ?? service?.tags.join(", ") ?? "Creative Communication";
  const projectBrief = project?.projectBrief ?? service?.desc ?? "";
  const galleryImages = project?.galleryImages ?? [];
  const videoEmbedUrl = project?.youtubeUrl ? getYouTubeEmbedUrl(project.youtubeUrl) : null;
  const heroImage = project?.backgroundImage || galleryImages[0] || null;

  return (
    <>
      <SiteNav />
      <main className="service-project-page">
        <section className="service-project-hero">
          {heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="service-project-hero__image" src={heroImage} alt="" />
          ) : null}
          <div className="service-project-hero__overlay" />
          <div className="container service-project-hero__content">
            <Link className="work-detail-back" href="/#services">
              Back to services
            </Link>
            <p className="section-eyebrow">Project Showcase</p>
            <h1 className="heading-display heading-xl">{title}</h1>
          </div>
        </section>

        <section className="work-detail-overview">
          <div className="container work-detail-overview__grid">
            <dl className="work-detail-facts">
              <div>
                <dt>Client</dt>
                <dd>{client}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{year}</dd>
              </div>
              <div>
                <dt>Industry</dt>
                <dd>{industry}</dd>
              </div>
            </dl>
            <div className="work-detail-brief">
              <p className="section-eyebrow">Project Brief</p>
              <p>{projectBrief}</p>
            </div>
          </div>
        </section>

        {galleryImages.length > 0 ? (
          <section className="work-detail-gallery">
            <div className="container">
              <div className="work-detail-section-head">
                <p className="section-eyebrow">Campaign Visuals</p>
                <h2 className="heading-display">Project Gallery</h2>
              </div>
              <div className="service-project-gallery__grid">
                {galleryImages.map((image: string, index: number) => (
                  <figure className="service-project-gallery__item" key={`${slug}-${index}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt={`${title} visual ${index + 1}`} />
                  </figure>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {videoEmbedUrl ? (
          <section className="work-detail-video">
            <div className="container">
              <div className="work-detail-section-head">
                <p className="section-eyebrow">Campaign Film</p>
                <h2 className="heading-display">Watch The Project Video</h2>
              </div>
              <div className="work-detail-video__frame">
                <iframe
                  src={videoEmbedUrl}
                  title={`${title} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter settings={settings} />
    </>
  );
}
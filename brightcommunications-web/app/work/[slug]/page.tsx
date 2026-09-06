import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { getPortfolioItemBySlug, portfolioItems } from "@/app/assets/portfolio/data";
import { getSiteSettings } from "@/lib/site-settings";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioItemBySlug(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} | Bright Communications`,
    description: project.projectBrief,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    Promise.resolve(getPortfolioItemBySlug(slug)),
    getSiteSettings(),
  ]);

  if (!project) notFound();

  const videoEmbedUrl = project.youtubeUrl ? getYouTubeEmbedUrl(project.youtubeUrl) : null;

  return (
    <>
      <SiteNav />
      <main className="work-detail-page">
        <section className="work-detail-hero">
          <Image
            src={project.backgroundImage}
            alt=""
            fill
            priority
            className="work-detail-hero__image"
            sizes="100vw"
          />
          <div className="work-detail-hero__overlay" />
          <div className="container work-detail-hero__content">
            <Link className="work-detail-back" href="/#work">
              Back to work
            </Link>
            <p className="section-eyebrow">Project Showcase</p>
            <h1 className="heading-display heading-xl">{project.title}</h1>
          </div>
        </section>

        <section className="work-detail-overview">
          <div className="container work-detail-overview__grid">
            <dl className="work-detail-facts">
              <div>
                <dt>Client</dt>
                <dd>{project.client}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Industry</dt>
                <dd>{project.industry}</dd>
              </div>
            </dl>

            <div className="work-detail-brief">
              <p className="section-eyebrow">Project Brief</p>
              <p>{project.projectBrief}</p>
            </div>
          </div>
        </section>

        <section className="work-detail-gallery">
          <div className="container">
            <div className="work-detail-section-head">
              <p className="section-eyebrow">Campaign Visuals</p>
              <h2 className="heading-display">Project Gallery</h2>
            </div>
            <div className="work-detail-gallery__grid">
              {project.galleryImages.map((image, index) => (
                <figure className="work-detail-gallery__item" key={`${project.slug}-${index}`}>
                  <Image
                    src={image}
                    alt={`${project.title} visual ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="work-detail-gallery__image"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

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
                  title={`${project.title} video`}
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
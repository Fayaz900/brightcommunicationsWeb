import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/SiteFooter";
import { LazyYouTubeEmbed } from "@/components/LazyYouTubeEmbed";
import { SiteNav } from "@/components/SiteNav";
import { getServiceProjectBySlug } from "@/lib/service-projects";
import { getSiteSettings } from "@/lib/site-settings";
import { services } from "@/lib/site-content";
import { slugify } from "@/lib/slug";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PageSeo } from "@/components/PageSeo";
import { pageMetadata, plainText } from "@/lib/seo";
import { creativeWorkSchema, serviceSchema } from "@/lib/schema";
import { getServiceClientSlug } from "@/lib/service-clients";

export const dynamic = "force-dynamic";

function getFallbackService(slug: string) {
  return services.find((item) => slugify(item.name) === slug) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getServiceProjectBySlug(slug);
  const service = getFallbackService(slug);

  if (!project && !service) notFound();

  const projectImage = project?.clients.flatMap((client) => client.galleryImages)[0];
  return pageMetadata({ path: `/services/${slug}`, title: project?.title ?? service!.name, description: project?.projectBrief ?? service!.desc, image: project?.backgroundImage || project?.serviceImage || projectImage });
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
  const clients = project?.clients ?? [];
  const projectBrief = project?.projectBrief ?? service?.desc ?? "";
  const videoEmbedUrl = project?.youtubeUrl ? getYouTubeEmbedUrl(project.youtubeUrl) : null;
  const firstProjectImage = clients.flatMap((client) => client.galleryImages)[0];
  const heroImage = project?.backgroundImage || project?.serviceImage || firstProjectImage || null;

  return (
    <>
      <SiteNav />
      <PageSeo path={`/services/${slug}`} title={title} description={plainText(projectBrief)} settings={settings} schema={[
        serviceSchema({ path: `/services/${slug}`, name: project?.serviceName || service?.name || title, description: project?.serviceDesc || service?.desc || projectBrief, image: heroImage }),
        ...(project && clients[0] ? [creativeWorkSchema({ path: `/services/${slug}`, title, description: projectBrief, image: heroImage, client: clients[0].name, year: clients[0].year })] : []),
      ]} />
      <main className="service-project-page">
        <section className="service-project-hero">
          <div className="container service-project-hero__content">
            <Link className="work-detail-back" href="/#services">
              Back to services
            </Link>
            <p className="section-eyebrow">Service Overview</p>
            <h1 className="heading-display heading-xl">{title}</h1>
          </div>
        </section>

        <section className="work-detail-overview">
          <div className="container service-project-brief">
            <div className="work-detail-brief">
              <p className="section-eyebrow">Service Brief</p>
              <p>{projectBrief}</p>
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
              <LazyYouTubeEmbed src={videoEmbedUrl} title={`${title} video`} />
            </div>
          </section>
        ) : null}

        {project?.faqs.length ? <FaqAccordion items={project.faqs} /> : null}

        {clients.length > 0 ? (
          <section className="service-clients">
            <div className="container">
              <div className="service-clients__heading">
                <p className="section-eyebrow">Selected Client Work</p>
                <h2 className="heading-display">Clients we&apos;ve partnered with</h2>
              </div>
              <div className="service-clients__grid">
                {clients.map((client, index) => (
                  <Link className="service-client-card" href={`/services/${slug}/${getServiceClientSlug(client)}`} key={`${client.name}-${index}`}>
                    <h3>{client.name}</h3>
                    <dl>
                      <div><dt>Year</dt><dd>{client.year}</dd></div>
                      <div><dt>Industry</dt><dd>{client.industry}</dd></div>
                    </dl>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter settings={settings} />
    </>
  );
}

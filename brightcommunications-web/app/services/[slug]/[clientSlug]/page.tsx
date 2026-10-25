import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageSeo } from "@/components/PageSeo";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { creativeWorkSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { getServiceClientSlug } from "@/lib/service-clients";
import { getServiceProjectBySlug } from "@/lib/service-projects";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

type ClientProjectParams = Promise<{ slug: string; clientSlug: string }>;

async function getClientProject(params: ClientProjectParams) {
  const { slug, clientSlug } = await params;
  const service = await getServiceProjectBySlug(slug);
  const client = service?.clients.find((item) => getServiceClientSlug(item) === clientSlug);
  return { slug, clientSlug, service, client };
}

export async function generateMetadata({ params }: { params: ClientProjectParams }): Promise<Metadata> {
  const { slug, clientSlug, service, client } = await getClientProject(params);
  if (!service || !client) notFound();

  const path = `/services/${slug}/${clientSlug}`;
  return pageMetadata({
    path,
    title: `${client.name} — ${service.title}`,
    description: client.summary || `${service.title} work for ${client.name}.`,
    image: client.galleryImages[0] || service.serviceImage,
  });
}

export default async function ClientProjectPage({ params }: { params: ClientProjectParams }) {
  const [{ slug, clientSlug, service, client }, settings] = await Promise.all([
    getClientProject(params),
    getSiteSettings(),
  ]);
  if (!service || !client) notFound();

  const path = `/services/${slug}/${clientSlug}`;
  const description = client.summary || `${service.title} work created for ${client.name}.`;

  return (
    <>
      <SiteNav />
      <PageSeo
        path={path}
        title={`${client.name} — ${service.title}`}
        description={description}
        settings={settings}
        schema={[creativeWorkSchema({
          path,
          title: `${client.name} — ${service.title}`,
          description,
          image: client.galleryImages[0],
          client: client.name,
          year: client.year,
        })]}
      />
      <main className="client-project-page">
        <section className="client-project-hero">
          <div className="container">
            <Link className="work-detail-back" href={`/services/${slug}`}>Back to {service.title}</Link>
            <p className="section-eyebrow">Client Project</p>
            <h1 className="heading-display heading-xl">{client.name}</h1>
          </div>
        </section>

        <section className="client-project-overview">
          <div className="container client-project-overview__grid">
            <dl className="client-project-facts">
              <div><dt>Client</dt><dd>{client.name}</dd></div>
              <div><dt>Year</dt><dd>{client.year}</dd></div>
              <div><dt>Industry</dt><dd>{client.industry}</dd></div>
              <div><dt>Service</dt><dd>{service.title}</dd></div>
            </dl>
            <div className="client-project-summary">
              <p className="section-eyebrow">Project Details</p>
              <p>{description}</p>
            </div>
          </div>
        </section>

        {client.galleryImages.length > 0 ? (
          <section className="client-project-gallery">
            <div className="container">
              <div className="work-detail-section-head">
                <p className="section-eyebrow">Project Gallery</p>
                <h2 className="heading-display">The work</h2>
              </div>
              <div className="client-project-gallery__grid">
                {client.galleryImages.map((image, index) => (
                  <figure key={`${client.name}-${index}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt={`${client.name} project visual ${index + 1}`} />
                  </figure>
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

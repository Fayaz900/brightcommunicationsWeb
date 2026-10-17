import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageSeo } from "@/components/PageSeo";
import { getCareerById } from "@/lib/careers";
import { getSiteSettings } from "@/lib/site-settings";
import { pageMetadata } from "@/lib/seo";
import { jobPostingSchema } from "@/lib/schema";

export const dynamic = "force-dynamic";

const getOpening = cache(async (id: string) => {
  const job = await getCareerById(id);
  if (!job?.isActive || !job.createdAt || job.id.startsWith("fallback-")) notFound();
  return job;
});

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const job = await getOpening(id);
  return pageMetadata({ path: `/careers/${id}`, title: `${job.title} — Careers`, description: `${job.title} at Bright Communications. ${job.location}. ${job.description}` });
}

export default async function CareerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [job, settings] = await Promise.all([getOpening(id), getSiteSettings()]);
  const applyUrl = `mailto:${settings.email}?subject=${encodeURIComponent(`Job Application: ${job.title}`)}`;
  return <>
    <SiteNav />
    <PageSeo path={`/careers/${id}`} title={job.title} description={job.description} settings={settings} schema={jobPostingSchema(job)} />
    <main>
      <section className="inner-hero">
        <div className="inner-hero__bg" aria-hidden="true" />
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <nav className="inner-hero__breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/careers">Careers</Link><span>/</span><span>{job.title}</span></nav>
          <p className="section-eyebrow">{job.department}</p>
          <h1 className="heading-display heading-xl inner-hero__title">{job.title}</h1>
          <p className="inner-hero__desc">{job.location} · {job.jobType}</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <h2 className="heading-display heading-lg">About the role</h2>
          <p className="body-lg" style={{ marginTop: 24, whiteSpace: "pre-line" }}>{job.description}</p>
          <dl className="career-detail-facts">
            <div><dt>Department</dt><dd>{job.department}</dd></div>
            <div><dt>Location</dt><dd>{job.location}</dd></div>
            <div><dt>Employment</dt><dd>{job.jobType}</dd></div>
            <div><dt>Experience</dt><dd>{job.experience}</dd></div>
            <div><dt>Posted</dt><dd><time dateTime={job.createdAt!.toISOString()}>{new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeZone: "Asia/Kolkata" }).format(job.createdAt)}</time></dd></div>
          </dl>
          <p className="body-md" style={{ marginBottom: 24 }}>Email your resume and portfolio to <a href={`mailto:${settings.email}`}>{settings.email}</a> to apply for this role.</p>
          <a href={applyUrl} className="btn-primary">Apply for this role →</a>
          <p style={{ marginTop: 24 }}><Link href="/careers">← All opportunities</Link></p>
        </div>
      </section>
    </main>
    <SiteFooter settings={settings} />
  </>;
}

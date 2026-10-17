import { portfolioItems } from "@/app/assets/portfolio/data";
import { getDiscoveryContent } from "@/lib/discovery";
import { absoluteUrl, isIndexableDeployment, publicPages, siteDescription, siteName } from "@/lib/seo";
import { services } from "@/lib/site-content";
import { slugify } from "@/lib/slug";

export const dynamic = "force-dynamic";

function link(title: string, path: string) {
  return `- [${title.replace(/[\[\]\r\n]/g, " ")}](${absoluteUrl(path)})`;
}

export async function GET() {
  if (!isIndexableDeployment()) return new Response("# Preview deployment\n\nThis deployment is not available for indexing.\n", { headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex, nofollow" } });
  const { posts, projects, jobs } = await getDiscoveryContent();
  const serviceLinks = new Map<string, string>(services.map((service) => [`/services/${slugify(service.name)}`, service.name]));
  projects.forEach((project) => serviceLinks.set(`/services/${project.slug}`, project.title));
  const content = [
    `# ${siteName}`, "", `> ${siteDescription}`, "",
    "Bright Communications is an integrated communications agency founded in 1996 and based in Kochi, Kerala, India. This guide links to the site's public information. Contact details and current openings are maintained by the agency.", "",
    "## Company and information", ...Object.entries(publicPages).map(([path, page]) => `${link(page.title, path)}: ${page.description}`), "",
    "## Services", ...[...serviceLinks].map(([path, title]) => link(title, path)), "",
    "## Selected work", ...portfolioItems.map((project) => link(project.title, `/work/${project.slug}`)), "",
    ...(posts.length ? ["## Published articles", ...posts.map((post) => link(post.title, `/blog/${post.slug}`)), ""] : []),
    ...(jobs.length ? ["## Current opportunities", ...jobs.map((job) => link(job.title, `/careers/${job.id}`)), ""] : []),
    "## Discovery", link("XML sitemap", "/sitemap.xml"), link("Crawler access rules", "/robots.txt"), "",
  ].join("\n");
  return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, must-revalidate" } });
}

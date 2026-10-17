import logo from "@/app/assets/logo.png";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, publicPages, siteDescription, siteName } from "@/lib/seo";
import type { SiteSettingsData } from "@/lib/site-settings";

export function PageSeo({ path, settings, title, description, schema = [] }: {
  path: string; settings: SiteSettingsData; title?: string; description?: string; schema?: Record<string, unknown>[];
}) {
  const page = publicPages[path as keyof typeof publicPages];
  const name = title || page?.title || siteName;
  const summary = description || page?.description || siteDescription;
  const url = absoluteUrl(path);
  const organizationId = absoluteUrl("/#organization");
  const websiteId = absoluteUrl("/#website");
  const phone = /^\+?[\d\s().-]{7,}$/.test(settings.phone) ? settings.phone : undefined;
  const sameAs = [settings.linkedinUrl, settings.instagramUrl, settings.facebookUrl].filter((link) => /^https?:\/\//.test(link));
  const parts = path.split("/").filter(Boolean);
  const breadcrumbs = [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    ...parts.map((part, i) => {
      const partPath = `/${parts.slice(0, i + 1).join("/")}`;
      return { "@type": "ListItem", position: i + 2, name: i === parts.length - 1 ? name : publicPages[partPath as keyof typeof publicPages]?.title || (part === "work" ? "Our Work" : part), item: absoluteUrl(partPath === "/work" ? "/portfolio" : partPath) };
    }),
  ];
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@graph": [
      { "@type": ["Organization", "LocalBusiness", "ProfessionalService"], "@id": organizationId, name: siteName, url: absoluteUrl("/"), description: siteDescription, foundingDate: "1996", logo: { "@type": "ImageObject", url: absoluteUrl(logo.src), width: logo.width, height: logo.height }, image: absoluteUrl("/og-image.png"), email: settings.email, telephone: phone, address: { "@type": "PostalAddress", addressLocality: "Kochi", addressRegion: "Kerala", addressCountry: "IN", description: settings.location }, sameAs: sameAs.length ? sameAs : undefined },
      { "@type": "WebSite", "@id": websiteId, name: siteName, url: absoluteUrl("/"), publisher: { "@id": organizationId }, inLanguage: "en-IN" },
      { "@type": path === "/about" ? "AboutPage" : path === "/contact" ? "ContactPage" : "WebPage", "@id": `${url}#webpage`, url, name, description: summary, isPartOf: { "@id": websiteId }, about: { "@id": organizationId }, ...(parts.length ? { breadcrumb: { "@id": `${url}#breadcrumbs` } } : {}), inLanguage: "en-IN" },
      ...(parts.length ? [{ "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`, itemListElement: breadcrumbs }] : []),
      ...schema,
    ],
  }} />;
}

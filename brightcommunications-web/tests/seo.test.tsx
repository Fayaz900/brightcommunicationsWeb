import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { JsonLd } from "../components/JsonLd";
import robots from "../app/robots";
import { absoluteUrl, getSiteUrl, isIndexableDeployment, pageMetadata, publicPages, staticPageMetadata } from "../lib/seo";
import { blogPostSchema, jobPostingSchema } from "../lib/schema";

const keys = ["NODE_ENV", "SITE_URL", "SITE_INDEXING", "DEPLOYMENT_ENV", "VERCEL_ENV", "CONTEXT"];
function environment(values: Partial<Record<string, string>>, run: () => void) {
  const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  keys.forEach((key) => delete process.env[key]);
  Object.assign(process.env, { NODE_ENV: "production", SITE_URL: "https://bright.example.com", ...values });
  try { run(); } finally { keys.forEach((key) => { if (previous[key] === undefined) delete process.env[key]; else process.env[key] = previous[key]; }); }
}

test("every public page has its own canonical and complete social metadata", () => environment({}, () => {
  const canonicals = new Set();
  for (const path of Object.keys(publicPages) as (keyof typeof publicPages)[]) {
    const metadata = staticPageMetadata(path);
    const expected = absoluteUrl(path);
    assert.equal(metadata.alternates?.canonical, expected);
    assert.equal(metadata.openGraph?.url, expected);
    assert(metadata.openGraph?.images);
    assert(metadata.twitter?.images);
    assert(!metadata.title?.toString().includes("| Bright Communications"));
    canonicals.add(expected);
  }
  assert.equal(canonicals.size, Object.keys(publicPages).length);
}));

test("production AI search rules retain private path exclusions", () => environment({}, () => {
  assert(isIndexableDeployment());
  const result = robots();
  assert.equal(result.sitemap, "https://bright.example.com/sitemap.xml");
  const rules = result.rules as { userAgent: string | string[]; disallow: string | string[] }[];
  assert.deepEqual(rules[1].disallow, ["/admin", "/api/"]);
  assert((rules[1].userAgent as string[]).includes("OAI-SearchBot"));
  assert.equal(rules[2].disallow, "/");
}));

test("preview flags block every crawler even with indexing explicitly enabled", () => {
  for (const values of [{ VERCEL_ENV: "preview" }, { CONTEXT: "deploy-preview" }, { DEPLOYMENT_ENV: "staging" }, { NODE_ENV: "development" }, { SITE_URL: "https://preview.bright.example.com" }, { SITE_INDEXING: "false" }]) {
    environment(values, () => { assert(!isIndexableDeployment()); assert.deepEqual(robots(), { rules: [{ userAgent: "*", disallow: "/" }] }); });
  }
  environment({ VERCEL_ENV: "preview", SITE_INDEXING: "true" }, () => assert(!isIndexableDeployment()));
  environment({ SITE_URL: "https://preview.bright.example.com", SITE_INDEXING: "true" }, () => assert(!isIndexableDeployment()));
  environment({ VERCEL_ENV: "preview", DEPLOYMENT_ENV: "production" }, () => assert(!isIndexableDeployment()));
});

test("canonical URLs use the configured production origin and clean article metadata", () => environment({ SITE_URL: "https://www.bright.example.com/subpath/" }, () => {
  assert.equal(getSiteUrl(), "https://www.bright.example.com");
  const metadata = pageMetadata({ path: "/blog/example", title: "Example", description: "<p>Design &amp; strategy</p>", image: "/uploads/article.png", article: { author: "A Writer" } });
  assert.equal(metadata.description, "Design & strategy");
  assert.equal(metadata.alternates?.canonical, "https://www.bright.example.com/blog/example");
  assert.equal(metadata.openGraph && "type" in metadata.openGraph ? metadata.openGraph.type : undefined, "article");
}));

test("JSON-LD cannot break out of its script element", () => {
  const payload = { name: '</script><script>alert("x")</script>', text: "line\u2028separator" };
  const markup = renderToStaticMarkup(<JsonLd data={payload} />);
  const json = markup.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1];
  assert(json);
  assert(!json.includes("<"));
  assert.deepEqual(JSON.parse(json), payload);
});

test("article authors use Person nodes and publication/modification dates", () => environment({}, () => {
  const date = new Date("2026-01-01T00:00:00Z");
  const schema = blogPostSchema({ id: "post-1", slug: "article", title: "Article", body: "<p>Body</p>", faqs: [], published: true, category: "Branding", tags: [], author: "A Writer", featuredImage: null, publishedAt: date, updatedAt: date, createdAt: date });
  assert.equal(schema[0]["@type"], "Person");
  assert.equal(schema[1]["@type"], "BlogPosting");
  assert.equal(schema[1].datePublished, date.toISOString());
  assert.equal(schema[1].url, "https://bright.example.com/blog/article");
}));

test("job schema is generated only for real dated roles", () => environment({}, () => {
  const role = { id: "job-1", title: "Designer", department: "Creative", jobType: "Full-time", location: "Kochi, Kerala (On-site)", experience: "2 years", description: "Design campaigns.", sortOrder: 0, isActive: true };
  assert.deepEqual(jobPostingSchema(role), []);
  const schema = jobPostingSchema({ ...role, createdAt: new Date("2026-01-01") });
  assert.equal(schema[0]["@type"], "JobPosting");
  assert.equal(schema[0].employmentType, "FULL_TIME");
  assert.equal(schema[0].url, "https://bright.example.com/careers/job-1");
}));

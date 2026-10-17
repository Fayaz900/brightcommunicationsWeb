import assert from "node:assert/strict";

const base = process.argv[2] || "http://localhost:3001";
const preview = process.argv.includes("--preview");
const fetchLocal = (path) => fetch(new URL(path, base), { headers: { "user-agent": "Googlebot" }, signal: AbortSignal.timeout(30000) });
const decode = (value) => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
}

const robotsResponse = await fetchLocal("/robots.txt");
assert.equal(robotsResponse.status, 200);
const robots = await robotsResponse.text();
const sitemapResponse = await fetchLocal("/sitemap.xml");
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decode(match[1]));
assert.equal(new Set(urls).size, urls.length);
if (preview) {
  assert(robots.includes("Disallow: /"));
  assert(!robots.includes("Allow: /"));
  assert.equal(urls.length, 0);
} else {
  assert(robots.includes("OAI-SearchBot"));
  assert(robots.includes("Disallow: /admin"));
  assert(urls.length >= 10);
  assert(!urls.some((url) => /\/(admin|api)(\/|$)/.test(new URL(url).pathname)));
}

const paths = preview ? ["/", "/about", "/blog", "/services", "/contact"] : urls.map((url) => new URL(url).pathname);
const schemaTypes = new Set();
for (const path of paths) {
  const response = await fetchLocal(path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map((match) => attributes(match[0]));
  const canonicals = links.filter((link) => link.rel === "canonical");
  assert.equal(canonicals.length, 1, `${path}: one canonical`);
  assert.equal(new URL(canonicals[0].href).pathname, path);
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map((match) => attributes(match[0]));
  for (const key of ["description", "og:title", "og:description", "og:url", "og:image", "twitter:card", "twitter:title", "twitter:description", "twitter:image"]) {
    assert(metas.some((meta) => (meta.name === key || meta.property === key) && meta.content), `${path}: ${key}`);
  }
  assert.equal(metas.find((meta) => meta.property === "og:url").content, canonicals[0].href);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${path}: one primary heading`);
  assert(!html.includes("| Bright Communications | Bright Communications"));
  const graphs = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const nodes = graphs.flatMap((graph) => graph["@graph"] || [graph]);
  for (const node of nodes) for (const type of [node["@type"]].flat()) schemaTypes.add(type);
  assert(nodes.some((node) => [node["@type"]].flat().includes("Organization")), `${path}: Organization`);
  if (path !== "/") assert(nodes.some((node) => node["@type"] === "BreadcrumbList"), `${path}: breadcrumbs`);
  if (path.startsWith("/blog/")) assert(nodes.some((node) => node["@type"] === "BlogPosting"));
  if (path.startsWith("/careers/")) assert(nodes.some((node) => node["@type"] === "JobPosting"));
  if (path.startsWith("/work/")) assert(nodes.some((node) => node["@type"] === "CreativeWork"));
  const robotsMeta = metas.find((meta) => meta.name === "robots")?.content || "";
  assert.equal(robotsMeta.includes("noindex"), preview, `${path}: indexing policy`);
  if (preview) assert(response.headers.get("x-robots-tag")?.includes("noindex"));
}

const llmsResponse = await fetchLocal("/llms.txt");
assert.equal(llmsResponse.status, 200);
assert(llmsResponse.headers.get("content-type")?.includes("text/plain"));
const llms = await llmsResponse.text();
assert(preview ? !llms.includes("## Published articles") : llms.includes("# Bright Communications"));
const manifestResponse = await fetchLocal("/manifest.webmanifest");
assert.equal(manifestResponse.status, 200);
const manifest = await manifestResponse.json();
assert.equal(manifest.name, "Bright Communications");
for (const icon of manifest.icons) assert.equal((await fetchLocal(icon.src)).status, 200);
for (const asset of ["/apple-touch-icon.png", "/og-image.png", "/favicon.ico"]) assert.equal((await fetchLocal(asset)).status, 200);
const admin = await fetchLocal("/admin/login");
assert(admin.headers.get("x-robots-tag")?.includes("noindex"));
const missing = await fetchLocal("/missing-seo-check-page");
assert.equal(missing.status, 404);
assert((await missing.text()).includes('name="robots" content="noindex'));
console.log(`PASS: ${paths.length} ${preview ? "preview" : "production"} pages, discovery files, metadata, JSON-LD, app icons and indexing rules.`);
console.log(`Schema types observed: ${[...schemaTypes].sort().join(", ")}`);

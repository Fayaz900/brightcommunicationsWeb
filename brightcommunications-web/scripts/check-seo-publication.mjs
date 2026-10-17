// Local integration check: creates temporary fixtures and removes only those
// exact IDs in finally. Run against a local production server using the same DB.
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { PrismaClient } from "@prisma/client";

const base = process.argv[2] || "http://localhost:3001";
assert(["localhost", "127.0.0.1"].includes(new URL(base).hostname), "Use a local test server.");
const prisma = new PrismaClient();
const id = `seo-check-${randomUUID()}`;
const paths = [`/blog/${id}`, `/services/${id}`, `/careers/${id}`];
const request = (path) => fetch(new URL(path, base), { headers: { "user-agent": "Googlebot" }, signal: AbortSignal.timeout(30000) });
async function checkDiscovery(expected) {
  const sitemap = await request("/sitemap.xml");
  const llms = await request("/llms.txt");
  assert.equal(sitemap.status, 200);
  assert.equal(llms.status, 200);
  const xml = await sitemap.text();
  const markdown = await llms.text();
  for (const path of paths) {
    assert.equal(xml.includes(path), expected, `${path}: sitemap publication state`);
    assert.equal(markdown.includes(path), expected, `${path}: llms publication state`);
  }
}

try {
  await prisma.blogPost.create({ data: { id, slug: id, title: "Temporary SEO verification", body: "<p>Temporary local integration fixture.</p>", category: "Verification", tags: [], author: "SEO Verification Author", published: true, publishedAt: new Date(Date.now() + 86400000) } });
  await prisma.$executeRaw`INSERT INTO "CareerOpening" (id, title, department, "jobType", location, experience, description, "sortOrder", "isActive", "createdAt", "updatedAt") VALUES (${id}, 'Temporary SEO verification', 'Verification', 'Full-time', 'Kochi, Kerala (On-site)', '2 years', 'Temporary local integration fixture.', 999, false, NOW(), NOW())`;
  await prisma.$executeRaw`INSERT INTO "ServiceProject" (id, "serviceNum", "serviceName", "serviceDesc", "serviceTags", "sortOrder", slug, title, client, year, industry, "projectBrief", "galleryImages", "isActive", "updatedAt") VALUES (${id}, ${id}, 'Temporary SEO verification', 'Temporary local integration fixture.', ARRAY[]::text[], 999, ${id}, 'Temporary SEO verification', 'Verification', '2026', 'Verification', 'Temporary local integration fixture.', ARRAY[]::text[], false, NOW())`;
  await checkDiscovery(false);
  for (const path of paths) assert.equal((await request(path)).status, 404, `${path}: not published`);

  await prisma.blogPost.update({ where: { id }, data: { publishedAt: new Date() } });
  await prisma.$executeRaw`UPDATE "CareerOpening" SET "isActive" = true, "updatedAt" = NOW() WHERE id = ${id}`;
  await prisma.$executeRaw`UPDATE "ServiceProject" SET "isActive" = true, "updatedAt" = NOW() WHERE id = ${id}`;
  await checkDiscovery(true);
  for (const [index, path] of paths.entries()) {
    const response = await request(path);
    assert.equal(response.status, 200, `${path}: published`);
    const html = await response.text();
    const nodes = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((match) => { const graph = JSON.parse(match[1]); return graph["@graph"] || [graph]; });
    assert(nodes.some((node) => node["@type"] === ["BlogPosting", "Service", "JobPosting"][index]));
    if (index === 0) assert(nodes.some((node) => node["@type"] === "Person"));
  }

  await prisma.blogPost.update({ where: { id }, data: { published: false } });
  await prisma.$executeRaw`UPDATE "CareerOpening" SET "isActive" = false WHERE id = ${id}`;
  await prisma.$executeRaw`UPDATE "ServiceProject" SET "isActive" = false WHERE id = ${id}`;
  await checkDiscovery(false);
  for (const path of paths) assert.equal((await request(path)).status, 404, `${path}: unpublished`);
  console.log("PASS: scheduled/inactive content excluded; publication updates sitemap and llms.txt immediately; matching schema renders; unpublishing removes discovery and returns 404.");
} finally {
  try {
    await prisma.blogPost.deleteMany({ where: { id } });
    await prisma.$executeRaw`DELETE FROM "CareerOpening" WHERE id = ${id}`;
    await prisma.$executeRaw`DELETE FROM "ServiceProject" WHERE id = ${id}`;
  } finally { await prisma.$disconnect(); }
}

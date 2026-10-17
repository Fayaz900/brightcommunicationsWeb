# Search and AI discovery

Set `SITE_URL` to the final production origin, including `https://`. Metadata,
canonical URLs, Open Graph/Twitter images, JSON-LD and discovery files use this
one origin. Request host headers never determine canonical URLs.

Production pages are indexable. Development, Vercel previews, Netlify deploy
previews/branch deploys, and hosts containing preview/staging/dev/test labels
return `Disallow: /`, `noindex` metadata and an `X-Robots-Tag` response header.
For other hosts, set `DEPLOYMENT_ENV=preview` or `staging` before building and
running a non-production deployment. `SITE_INDEXING=false` disables indexing;
`true` cannot override a preview environment. Keep these settings consistent
between build and runtime, because Next.js response headers are built into the
deployment. Admin/API routes always receive `X-Robots-Tag: noindex`.

## Discovery files

- `/robots.txt`: allows public production pages, excludes admin/API routes.
  AI search/retrieval agents are allowed. GPTBot, ClaudeBot, Google-Extended and
  CCBot are excluded from model-training crawls. These are independent policies;
  see [OpenAI](https://developers.openai.com/api/docs/bots) and
  [Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler).
- `/sitemap.xml`: reads live publication state. Includes static public pages,
  portfolio projects, services, published articles and active admin-created jobs.
  Drafts, future-dated articles, inactive entries, example job cards, redirects,
  admin/API routes and 404s are excluded. Database entries use real modification
  dates; static entries omit invented modification dates. Database failures return
  an error instead of a successful incomplete sitemap. Preview sitemaps are empty.
- `/llms.txt`: plain-text guide with current public service, article, work and job
  links. This follows the [llms.txt proposal](https://llmstxt.org/); search engines
  and AI products determine whether and how they use it. Preview responses contain
  no published-content directory.

Publishing, editing, unpublishing or deleting a blog post, service project or job
invalidates discovery routes. They also query current content on each request, so
scheduled articles become discoverable at their publication time without a rebuild.

## Templates and structured data

| Template | JSON-LD |
| --- | --- |
| Every public page | Organization, LocalBusiness/ProfessionalService, WebSite, WebPage |
| About / Contact | AboutPage / ContactPage |
| Every inner page | BreadcrumbList |
| Services and service details | Service |
| Work and project details | CreativeWork |
| Published article | BlogPosting and Person for named individual authors |
| Rendered FAQ accordion | FAQPage containing the same visible questions and answers |
| Active job detail (`/careers/[id]`) | JobPosting with actual publication date, location and application link |

Schema uses configured admin contact/social details and omits placeholder phone
numbers. It does not invent ratings, salaries, street addresses or opening hours.
JobPosting only appears on a single real job's page, following
[Google's requirements](https://developers.google.com/search/docs/appearance/structured-data/job-posting#technical-guidelines).
Deactivating or deleting a role removes it from discovery and makes its detail URL
return 404. Example vacancy cards never receive JobPosting markup.

## Brand assets and checks

The web manifest, Apple touch icon, app icons, favicon and default 1200×630 social
image use the existing logo and monochrome brand palette. Regenerate after a logo
change with `node scripts/generate-brand-assets.cjs`. Article/project images
override the default social image where available.

Run `node --import tsx --test tests/seo.test.tsx` for policy/schema tests and
`node scripts/check-seo.mjs http://localhost:3001` against a production server.
For a preview server, append `--preview`. The HTTP check verifies sitemap pages,
canonical/social tags, JSON-LD parsing, primary headings, icons and noindex rules.

To check publication without a rebuild, run
`node --env-file=.env scripts/check-seo-publication.mjs http://localhost:3001`.
This local-only check creates temporary article, service and job fixtures in the
configured database, verifies scheduled/active/unpublished states and removes the
exact fixture IDs in a `finally` block. Use a local test database for this check.

After deployment, submit the production sitemap in Google Search Console and Bing
Webmaster Tools, and validate representative URLs in Google's Rich Results Test.
These account-level steps require the production deployment and verified ownership.
Structured data and these files do not guarantee ranking or rich-result selection.

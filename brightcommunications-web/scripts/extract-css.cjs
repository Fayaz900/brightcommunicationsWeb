const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "..");
const htmlPath = path.join(root, "html", "BrightCommunications.html");
const outPath = path.join(__dirname, "..", "app", "globals.css");

const c = fs.readFileSync(htmlPath, "utf8");
const m = c.match(/<style>([\s\S]*?)<\/style>/);
if (!m) throw new Error("no style block");
let css = m[1].trim();
css = css
  .replace(/'Syne', sans-serif/g, "var(--font-syne), sans-serif")
  .replace(/'DM Sans', sans-serif/g, "var(--font-dm), sans-serif")
  .replace(/group:\s*true;?/g, "");
const nextHeroBlock = `

  /* Next.js: match static HTML first-paint hero state before client entrance */
  .hero-tag,
  .hero-headline,
  .hero-bottom {
    opacity: 0;
    transform: translateY(24px);
  }
`;
if (!css.includes("Next.js: match static HTML")) {
  css = css.trimEnd() + nextHeroBlock;
}
fs.writeFileSync(outPath, css);
console.log("Wrote", outPath);

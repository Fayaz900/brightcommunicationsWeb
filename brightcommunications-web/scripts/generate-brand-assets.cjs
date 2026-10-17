// Deterministic derivatives of the existing logo; no external image services.
const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const logo = path.join(root, "app/assets/logo.png");
const output = path.join(root, "public");

async function icon(size, inset) {
  const mark = await sharp(logo).trim().resize(Math.round(size * (1 - inset * 2)), Math.round(size * (1 - inset * 2)), { fit: "inside" }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: "#0a0a0a" } }).composite([{ input: mark, gravity: "centre" }]).png().toBuffer();
}

async function main() {
  for (const [filename, size, inset] of [["icon-192.png", 192, 0.12], ["icon-512.png", 512, 0.12], ["icon-maskable-512.png", 512, 0.2], ["apple-touch-icon.png", 180, 0.12]]) {
    await fs.writeFile(path.join(output, filename), await icon(size, inset));
  }
  // ICO supports a PNG payload, preserving a crisp brand icon at small sizes.
  const favicon = await icon(64, 0.08);
  const header = Buffer.alloc(22);
  header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
  header[6] = 64; header[7] = 64;
  header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
  header.writeUInt32LE(favicon.length, 14); header.writeUInt32LE(22, 18);
  await fs.writeFile(path.join(root, "app/favicon.ico"), Buffer.concat([header, favicon]));

  const brand = await sharp(logo).resize({ width: 440 }).toBuffer();
  const artwork = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#0a0a0a"/><ellipse cx="1060" cy="250" rx="350" ry="185" fill="none" stroke="#f5f0e8" stroke-opacity=".14" transform="rotate(-30 1060 250)"/><circle cx="1040" cy="70" r="6" fill="#f5f0e8"/><line x1="72" y1="480" x2="1128" y2="480" stroke="#f5f0e8" stroke-opacity=".2"/><text x="72" y="405" font-family="Georgia,serif" font-size="48" fill="#f5f0e8">Bright ideas. Lasting impressions.</text><text x="72" y="535" font-family="Arial,sans-serif" font-size="22" letter-spacing="2" fill="#c5c0b8">ADVERTISING · BRANDING · DIGITAL</text><text x="72" y="575" font-family="Arial,sans-serif" font-size="18" fill="#a5a099">Kochi, Kerala · Since 1996</text></svg>`);
  await sharp(artwork).composite([{ input: brand, left: 72, top: 90 }]).png().toFile(path.join(output, "og-image.png"));
  console.log("Generated branded favicon, app icons, Apple touch icon and 1200x630 social image.");
}

main().catch((error) => { console.error(error); process.exitCode = 1; });

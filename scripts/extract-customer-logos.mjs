/**
 * Slice the official Surabhi Waters customer-logo collage into individual
 * WebP files. Grid line positions were measured from the source JPEG.
 *
 * Run: node scripts/extract-customer-logos.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const src = path.resolve("public/images/customers/source/customers-collage.jpg");
const outDir = path.resolve("public/images/customers");

const slugs = [
  "adithi-projects",
  "acas-group",
  "rohan-builders",
  "dsr-infrastructure",
  "ozone-group",
  "hp-gas",
  "nd-developers",
  "chartered-housing",
  "nambiar-builders",
  "satyadeva-residency",
  "punjabi-by-nature",
  "kolte-patil",
  "kristal-group",
  "sowparnika",
  "kr-construction",
  "park-plaza",
  "gr-constructions",
  "the-creative-homes",
  "ginger-hotels",
  "bureau-veritas",
  "surakshaa-homes",
  "sipani",
  "cubatic",
  "api",
  "jain-heights",
  "skanda",
  "krishnaja",
  "jai-bharathi",
  "pioneer-developers",
  "kingston-properties",
  "unishire",
  "prospect-group",
  "vascon-engineers",
  "aashish-developers",
  "virani-builders",
  "tg-developers",
];

// Inner edges of the 6×6 grey grid (inclusive left/top, exclusive right/bottom).
const cols = [
  [71, 268],
  [282, 480],
  [494, 691],
  [705, 902],
  [916, 1114],
  [1128, 1326],
];
const rows = [
  [143, 222],
  [231, 309],
  [319, 398],
  [408, 487],
  [497, 576],
  [586, 664],
];

const inset = 3;

await mkdir(outDir, { recursive: true });

for (let r = 0; r < 6; r++) {
  for (let c = 0; c < 6; c++) {
    const slug = slugs[r * 6 + c];
    const left = cols[c][0] + inset;
    const top = rows[r][0] + inset;
    const width = cols[c][1] - cols[c][0] - inset * 2;
    const height = rows[r][1] - rows[r][0] - inset * 2;

    await sharp(src)
      .extract({ left, top, width, height })
      .webp({ quality: 86, effort: 6 })
      .toFile(path.join(outDir, `${slug}.webp`));

    console.log(`${slug}.webp  ${width}×${height}`);
  }
}

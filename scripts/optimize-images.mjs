/**
 * Converts the source PNGs in public/images to WebP at sensible maximum
 * dimensions, and produces a JPEG social-share image.
 *
 * Run with: node scripts/optimize-images.mjs
 */
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public/images");

/** Max width per folder — backgrounds are full-bleed, cards never are. */
const maxWidths = {
  backgrounds: 2000,
  solutions: 1500,
  company: 1500,
  industries: 1500,
};

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.name.endsWith(".png")) files.push(full);
  }
  return files;
}

const files = await walk(root);
let savedBytes = 0;

for (const file of files) {
  const folder = path.basename(path.dirname(file));
  const target = file.replace(/\.png$/, ".webp");
  const before = (await stat(file)).size;

  await sharp(file)
    .resize({ width: maxWidths[folder] ?? 1500, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(target);

  const after = (await stat(target)).size;
  savedBytes += before - after;
  await unlink(file);

  console.log(
    `${path.relative(root, target)}  ${(before / 1024 / 1024).toFixed(2)}MB → ${(after / 1024).toFixed(0)}KB`,
  );
}

// Social share image: JPEG for maximum platform compatibility.
await sharp(path.join(root, "backgrounds/hero-treatment-plant.webp"))
  .resize(1200, 630, { fit: "cover" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(root, "backgrounds/og-default.jpg"));

console.log(`\nSaved ${(savedBytes / 1024 / 1024).toFixed(2)}MB across ${files.length} images.`);

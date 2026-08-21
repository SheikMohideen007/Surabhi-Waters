import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const srcDir = "C:/Users/SHEIK/.cursor/projects/d-surabhiwaters/assets";
const outDir = "D:/surabhiwaters/public/images/services";

const map = {
  "service-process-know-how.png": "process-know-how.webp",
  "service-design-engineering.png": "design-and-detail-engineering.webp",
  "service-installation.png": "supply-construction-and-installation.webp",
  "service-ro-rental.png": "ro-on-rentals.webp",
  "service-consultancy.png": "eia-pcb-bwssb-consultancy.webp",
  "service-after-sales.png": "after-sales-service.webp",
  "service-om.png": "operation-and-maintenance.webp",
};

await mkdir(outDir, { recursive: true });

for (const [from, to] of Object.entries(map)) {
  await sharp(path.join(srcDir, from))
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(path.join(outDir, to));
  console.log(to);
}

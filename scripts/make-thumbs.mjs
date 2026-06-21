import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = path.resolve("./images");
const outputDir = path.resolve("./thumbnails");

// Thumbnail size (change as you like)
const width = 320;

fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff"].includes(ext)) continue;

  const inputPath = path.join(inputDir, file);

  // Output keeps the same base name, writes as jpg (safe + compact)
  const base = path.parse(file).name;
  const outPath = path.join(outputDir, `${base}.jpg`);

  await sharp(inputPath)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(outPath);

  console.log(`Created: ${path.relative(process.cwd(), outPath)}`);
}


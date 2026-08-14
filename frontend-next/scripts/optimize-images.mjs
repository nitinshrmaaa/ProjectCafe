/**
 * Recompresses the photography in src/assets/images in place.
 * The originals are committed to git, so `git checkout` reverses this.
 *
 * Run with `npm run optimize:images`.
 */
import { readdir, stat, rename, unlink } from "node:fs/promises";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES = join(ROOT, "src/assets/images");

/** Widest a photo needs to be, by folder. */
const MAX_WIDTH = {
  hero: 2000,
  gallery: 1800,
  menu: 1200,
};

const QUALITY = 74;

async function* walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) yield* walk(path);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) yield path;
  }
}

let totalBefore = 0;
let totalAfter = 0;

for await (const file of walk(IMAGES)) {
  const folder = dirname(file).split("/").pop();
  const width = MAX_WIDTH[folder] ?? 1600;
  const before = (await stat(file)).size;

  const temporary = `${file}.tmp${extname(file)}`;

  await sharp(file)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toFile(temporary);

  const after = (await stat(temporary)).size;

  // Never replace a file with a larger one.
  if (after < before) {
    await rename(temporary, file);
  } else {
    await unlink(temporary);
  }

  totalBefore += before;
  totalAfter += Math.min(before, after);

  console.log(
    `  ${file.replace(ROOT + "/", "")}  ${mb(before)} → ${mb(Math.min(before, after))}`
  );
}

console.log(
  `\nTotal: ${mb(totalBefore)} → ${mb(totalAfter)} ` +
    `(${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller)`
);

function mb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

// Generates WebP variants of the character PNGs and wires them into character.json.
// Re-runnable: `pnpm optimize:images`. Original PNGs are never modified.
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'public/assets/character');
const jsonPath = path.join(root, 'content/global/character.json');
const publicPrefix = '/assets/character';

const VARIANTS = [
  { suffix: '', width: 900, quality: 80 },
  { suffix: '-mobile', width: 480, quality: 75 },
];

const kb = (bytes) => (bytes / 1024).toFixed(0).padStart(6) + ' KB';

const pngs = (await readdir(dir)).filter((f) => /^\d{2}-.*\.png$/.test(f)).sort();
const meta = {}; // png basename -> { width, height }
const totals = { png: 0, desktop: 0, mobile: 0 };

for (const file of pngs) {
  const name = path.basename(file, '.png');
  const src = path.join(dir, file);
  const { width, height } = await sharp(src).metadata();
  meta[file] = { width, height };

  const pngSize = (await stat(src)).size;
  totals.png += pngSize;
  const sizes = [];

  for (const { suffix, width: maxWidth, quality } of VARIANTS) {
    const out = path.join(dir, `${name}${suffix}.webp`);
    await sharp(src)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality, alphaQuality: 90 })
      .toFile(out);
    const size = (await stat(out)).size;
    sizes.push(size);
    totals[suffix ? 'mobile' : 'desktop'] += size;
  }

  console.log(`${file.padEnd(28)} png ${kb(pngSize)} | webp ${kb(sizes[0])} | mobile ${kb(sizes[1])}`);
}

// Wire character.json: only touch poses whose PNG was processed.
const data = JSON.parse(await readFile(jsonPath, 'utf8'));
for (const pose of data.poses) {
  const file = pose.src_png && path.posix.basename(pose.src_png);
  if (!file || !meta[file]) continue;
  const name = path.posix.basename(file, '.png');
  pose.src_webp = `${publicPrefix}/${name}.webp`;
  pose.src_mobile_webp = `${publicPrefix}/${name}-mobile.webp`;
  pose.width = meta[file].width;
  pose.height = meta[file].height;
}
await writeFile(jsonPath, JSON.stringify(data, null, 2) + '\n');

console.log(
  `\nTOTAL png ${kb(totals.png)} | webp ${kb(totals.desktop)} | mobile ${kb(totals.mobile)}`
);

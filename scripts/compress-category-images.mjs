import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';

const SOURCE_DIR = '/Users/abcd/Vibecoding/website/products/category image';
const OUTPUT_DIR = '/Users/abcd/Vibecoding/website/global-castle/public/images/products';
const MAX_KB = 500;

const nameMap = {
  'SS': 'steel-bottles',
  'ceramic': 'ceramic-mugs',
  'glass': 'glassware',
};

async function compress(filePath, outName, maxKB) {
  const img = sharp(filePath);
  const metadata = await img.metadata();
  console.log(`  Input: ${basename(filePath)} (${metadata.width}x${metadata.height}, format=${metadata.format})`);

  // Binary search for quality
  let lo = 1, hi = 100, best = 1;
  for (let i = 0; i < 18; i++) {
    const q = Math.floor((lo + hi) / 2);
    const buf = await img.jpeg({ quality: q, mozjpeg: true }).toBuffer();
    const kb = buf.length / 1024;
    if (kb <= maxKB) {
      best = q;
      lo = q + 1;
    } else {
      hi = q - 1;
    }
    if (lo > hi) break;
  }

  let buf = await img.jpeg({ quality: best, mozjpeg: true }).toBuffer();
  let kb = buf.length / 1024;

  // If still over, reduce resolution
  if (kb > maxKB) {
    const scale = Math.sqrt(maxKB / kb) * 0.95;
    const newW = Math.round((metadata.width || 1200) * scale);
    console.log(`  Quality ${best} still ${kb.toFixed(0)}KB, scaling to ${newW}px wide`);
    buf = await img
      .resize({ width: newW, withoutEnlargement: true })
      .jpeg({ quality: best, mozjpeg: true })
      .toBuffer();
    kb = buf.length / 1024;
  }

  // Ensure .jpg extension
  const outPath = join(OUTPUT_DIR, `${outName}.jpg`);
  await sharp(buf).toFile(outPath);
  console.log(`  Output: ${outName}.jpg (${kb.toFixed(0)}KB, quality=${best})`);
  return { path: outPath, kb };
}

async function main() {
  const entries = await readdir(SOURCE_DIR);
  const files = entries.filter(f => /\.(jpe?g|png|webp)$/i.test(f));

  console.log(`Found ${files.length} images in source dir\n`);

  for (const f of files) {
    const base = basename(f, extname(f));
    const mapped = nameMap[base];
    if (!mapped) {
      console.log(`Skipping ${f} (no mapping)`);
      continue;
    }
    await compress(join(SOURCE_DIR, f), mapped, MAX_KB);
  }

  console.log('\nDone!');
}

main().catch(e => { console.error(e); process.exit(1); });

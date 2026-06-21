import sharp from 'sharp';
import { statSync, readdirSync, copyFileSync } from 'fs';
import { join } from 'path';

const SOURCE_DIR = join(import.meta.dirname, '../process');
const TARGET_DIR = join(import.meta.dirname, '../public/images/process');
const MAX_KB = 500;

async function compressImage(srcPath, destPath) {
  const originalSize = statSync(srcPath).size / 1024;

  if (originalSize <= MAX_KB) {
    // Already under limit, just copy
    copyFileSync(srcPath, destPath);
    console.log(`COPY  ${srcPath.split('/').pop()} → ${originalSize.toFixed(1)}KB (already under ${MAX_KB}KB)`);
    return;
  }

  const image = sharp(srcPath);
  const metadata = await image.metadata();

  // Start with quality 85, max width 1600px
  let quality = 85;
  let width = Math.min(metadata.width || 1600, 1600);

  // Binary search for quality that gets us under MAX_KB
  let low = 30, high = 95;
  let bestBuffer = null;
  let bestQuality = low;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const buffer = await image
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: mid, mozjpeg: true })
      .toBuffer();

    const sizeKB = buffer.length / 1024;
    console.log(`  quality=${mid}, size=${sizeKB.toFixed(1)}KB`);

    if (sizeKB <= MAX_KB) {
      bestBuffer = buffer;
      bestQuality = mid;
      low = mid + 1; // try higher quality
    } else {
      high = mid - 1; // need lower quality
    }
  }

  // If still over at lowest quality, reduce width too
  if (!bestBuffer) {
    console.log('  quality alone insufficient, reducing dimensions...');
    for (let w = 1400; w >= 800; w -= 200) {
      for (const q of [80, 70, 60, 50, 40]) {
        const buffer = await image
          .resize({ width: w, withoutEnlargement: true })
          .jpeg({ quality: q, mozjpeg: true })
          .toBuffer();
        if (buffer.length / 1024 <= MAX_KB) {
          bestBuffer = buffer;
          bestQuality = q;
          width = w;
          break;
        }
      }
      if (bestBuffer) break;
    }
  }

  if (!bestBuffer) {
    console.error(`  FAILED to compress below ${MAX_KB}KB`);
    return;
  }

  const finalSizeKB = bestBuffer.length / 1024;

  // Only write to file using Node.js fs
  const { writeFileSync } = await import('fs');
  writeFileSync(destPath, bestBuffer);

  console.log(`DONE  ${srcPath.split('/').pop()} → ${finalSizeKB.toFixed(1)}KB (q=${bestQuality}, w=${width})`);
}

async function main() {
  const files = readdirSync(SOURCE_DIR).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  console.log(`Compressing ${files.length} images to ≤${MAX_KB}KB...\n`);

  for (const file of files) {
    const src = join(SOURCE_DIR, file);
    const dest = join(TARGET_DIR, file);
    await compressImage(src, dest);
  }

  console.log('\nDone!');
}

main().catch(console.error);

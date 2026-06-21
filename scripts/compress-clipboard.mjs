import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function compress(src, dest, name) {
  const buf = await sharp(src)
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync(dest, buf);
  const sizeKB = Math.round(fs.statSync(dest).size / 1024);
  console.log(`${name}: ${sizeKB}KB`);
}

const input = process.argv[2];
const output = process.argv[3];
const name = process.argv[4];
compress(input, output, name);

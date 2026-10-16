// Generate arcade-themed browser icons (checkerboard grid) as raw PNG.
// No external dependencies — pure Node zlib.
// Usage: node scripts/make_icons.js
const fs = require("fs");
const zlib = require("zlib");

function makePNG(size) {
  const width = size;
  const height = size;
  const depth = 8;
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 3; // color type RGBA
  ihdr[9] = depth;
  ihdr[10] = 0;
  ihdr[11] = 2; // compression

  // RGBA pixel buffer
  const raw = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const x = i % width;
    const y = Math.floor(i / width);
    const dark = ((x >> 3) & 1) !== (y >> 3) & 1;
    const a = dark ? 0 : 255;
    raw[i * 4] = 255; // R
    raw[i * 4 + 1] = 255 * a / 255; // G (pink)
    raw[i * 4 + 2] = 255; // B
    raw[i * 4 + 3] = 255; // A
  }

  // Filter byte per scanline
  const filter = Buffer.alloc(width * height, 0);
  const idat = zlib.deflateSync(Buffer.concat([filter, raw]));
  const iend = Buffer.from([0, 0, 0, 0]);
  return Buffer.concat([signature, ihdr, Buffer.from([0, 0, 0, 0]), filter, idat, iend]);
}

// Icons referenced by the project + PWA manifest
const targets = {
  "public/favicon.ico": 32,
  "public/favicon-16x16.png": 16,
  "public/apple-touch-icon.png": 180,
  "public/icons/icon-192.png": 192,
  "public/icons/icon-512.png": 512,
};

let ok = 0;
for (const [path, size] of Object.entries(targets)) {
  fs.writeFileSync(path, makePNG(size));
  ok++;
}
console.log(`Wrote ${ok}/${Object.keys(targets).length} icons`);

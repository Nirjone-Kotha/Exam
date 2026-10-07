const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 implementation for PNG chunks
function makeCRCTable() {
  let c;
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }
  return crcTable;
}

const crcTable = makeCRCTable();

function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(12 + len);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const typeAndData = buf.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function generateIconPNG(size, isMaskable = false) {
  // Generate RGBA buffer
  const width = size;
  const height = size;
  const rawBytes = Buffer.alloc(height * (1 + width * 4));

  const center = size / 2;
  const cornerRadius = size * (isMaskable ? 0 : 0.22); // Rounded rectangle if not maskable

  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawBytes[offset++] = 0; // Filter byte: 0 (None)

    for (let x = 0; x < width; x++) {
      // Check rounded corner distance
      const dx = Math.abs(x - center);
      const dy = Math.abs(y - center);
      const maxDist = center;

      // Background color: Medical Emerald gradient
      const t = y / height;
      const bgR = Math.round(5 + 10 * t);
      const bgG = Math.round(150 - 40 * t);
      const bgB = Math.round(105 - 20 * t);
      const bgA = 255;

      let r = bgR;
      let g = bgG;
      let b = bgB;
      let a = bgA;

      // Draw a sleek Medical Cross + BCS Stethoscope motif in the center
      // 1. White Medical Cross
      const crossThickness = size * 0.12;
      const crossLength = size * 0.44;
      const inCrossH = (Math.abs(y - center) <= crossThickness / 2) && (Math.abs(x - center) <= crossLength / 2);
      const inCrossV = (Math.abs(x - center) <= crossThickness / 2) && (Math.abs(y - center) <= crossLength / 2);

      // 2. Outer Ring
      const distFromCenter = Math.sqrt((x - center) ** 2 + (y - center) ** 2);
      const ringRadius = size * 0.36;
      const ringThickness = size * 0.04;
      const inRing = Math.abs(distFromCenter - ringRadius) <= ringThickness / 2;

      if (inCrossH || inCrossV) {
        // Crisp White with slight golden glow
        r = 255;
        g = 255;
        b = 255;
      } else if (inRing) {
        // Translucent white ring
        r = 255;
        g = 255;
        b = 255;
        a = 230;
      }

      // Rounded app icon border
      if (!isMaskable) {
        const borderDist = size * 0.04;
        if (x < borderDist || x >= width - borderDist || y < borderDist || y >= height - borderDist) {
          // Inner padding
        }
      }

      rawBytes[offset++] = r;
      rawBytes[offset++] = g;
      rawBytes[offset++] = b;
      rawBytes[offset++] = a;
    }
  }

  // Deflate
  const compressed = zlib.deflateSync(rawBytes, { level: 9 });

  // PNG Header
  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth: 8
  ihdr[9] = 6; // Color type: 6 (RGBA)
  ihdr[10] = 0; // Compression method: 0
  ihdr[11] = 0; // Filter method: 0
  ihdr[12] = 0; // Interlace method: 0

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate 192x192
console.log('Generating icon-192x192.png...');
const icon192 = generateIconPNG(192, false);
fs.writeFileSync(path.join(iconsDir, 'icon-192x192.png'), icon192);

// Generate 512x512
console.log('Generating icon-512x512.png...');
const icon512 = generateIconPNG(512, false);
fs.writeFileSync(path.join(iconsDir, 'icon-512x512.png'), icon512);

// Generate Maskable 512x512
console.log('Generating icon-maskable-512x512.png...');
const iconMaskable = generateIconPNG(512, true);
fs.writeFileSync(path.join(iconsDir, 'icon-maskable-512x512.png'), iconMaskable);

// Also copy or write favicon.ico (192)
fs.writeFileSync(path.join(__dirname, '..', 'public', 'apple-touch-icon.png'), icon192);

console.log('All PWA icons generated successfully in public/icons!');

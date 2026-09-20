import fs from 'fs';
import zlib from 'zlib';

function createCRC32Table() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c >>> 0;
  }
  return table;
}

const crcTable = createCRC32Table();

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function writeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(8 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = crc32(typeAndData);
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

function createPng(width, height, drawPixel) {
  // Signature
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bits per channel
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdrChunk = writeChunk('IHDR', ihdrData);

  // Scanlines
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = drawPixel(x, y, width, height);
      const pxOffset = rowOffset + 1 + x * 4;
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  // IDAT
  const compressed = zlib.deflateSync(rawData);
  const idatChunk = writeChunk('IDAT', compressed);

  // IEND
  const iendChunk = writeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Draw Islamic Emerald & Gold Hadith Icon
function drawSyamilaIcon(x, y, w, h, isMaskable = false) {
  const nx = (x / w) * 2 - 1; // -1 to 1
  const ny = (y / h) * 2 - 1; // -1 to 1
  const dist = Math.sqrt(nx * nx + ny * ny);

  // Background color: Emerald gradient
  const grad = 0.5 + 0.5 * (nx * 0.3 + ny * 0.7);
  let r = Math.round(15 + grad * 10);
  let g = Math.round(60 + grad * 35);
  let b = Math.round(35 + grad * 15);
  let a = 255;

  if (!isMaskable) {
    // Rounded corners for standard icons
    const cornerRadius = 0.25;
    const dx = Math.max(0, Math.abs(nx) - (1 - cornerRadius));
    const dy = Math.max(0, Math.abs(ny) - (1 - cornerRadius));
    const cdist = Math.sqrt(dx * dx + dy * dy);
    if (cdist > cornerRadius) {
      return [0, 0, 0, 0];
    }
  }

  // Gold Rings
  const scaleFactor = isMaskable ? 0.75 : 0.9;
  const ringDist = dist / scaleFactor;
  if (Math.abs(ringDist - 0.85) < 0.02) {
    // Outer gold ring
    return [234, 179, 8, 220];
  }
  if (Math.abs(ringDist - 0.78) < 0.012) {
    // Inner fine gold ring
    return [254, 240, 138, 240];
  }

  // Open Book Center Silhouette
  const bookY = (ny + 0.05) / scaleFactor;
  const bookX = nx / scaleFactor;

  if (bookY >= -0.35 && bookY <= 0.35 && Math.abs(bookX) <= 0.6) {
    const pageCurve = 0.06 * Math.sin(Math.abs(bookX) * Math.PI * 1.5);
    const topEdge = -0.3 + pageCurve;
    const bottomEdge = 0.25 + pageCurve;

    if (bookY >= topEdge && bookY <= bottomEdge) {
      if (Math.abs(bookX) < 0.02) {
        // Book Spine Gold
        return [234, 179, 8, 255];
      }
      // Book Pages (Off-white / Parchment)
      const pageBrightness = 240 + Math.round(Math.abs(bookX) * 15);
      // Ruled text lines
      const lineSpacing = 0.07;
      const onLine = Math.abs((bookY - topEdge) % lineSpacing) < 0.015 && (bookY - topEdge) > 0.04 && (bottomEdge - bookY) > 0.04;
      if (onLine && Math.abs(bookX) > 0.08 && Math.abs(bookX) < 0.52) {
        return [148, 163, 184, 255]; // Text line slate
      }
      return [pageBrightness, pageBrightness - 5, pageBrightness - 15, 255];
    }

    // Wooden Book Stand (Rehal) below
    if (bookY > bottomEdge && bookY <= 0.45) {
      const standWidth = 0.45 - (bookY - bottomEdge) * 0.8;
      if (Math.abs(bookX) <= standWidth && Math.abs(bookX) >= 0.1) {
        return [202, 138, 4, 255]; // Warm Gold Wood
      }
    }
  }

  // Center Islamic 8-Point Star at top
  const starY = (ny + 0.55) / scaleFactor;
  const starX = nx / scaleFactor;
  const starDist = Math.sqrt(starX * starX + starY * starY);
  if (starDist < 0.08) {
    const angle = Math.atan2(starY, starX);
    const starR = 0.06 * (0.6 + 0.4 * Math.abs(Math.cos(angle * 4)));
    if (starDist <= starR) {
      return [254, 240, 138, 255];
    }
  }

  return [r, g, b, a];
}

console.log('Generating PWA icons...');
fs.writeFileSync('public/pwa-192x192.png', createPng(192, 192, (x, y, w, h) => drawSyamilaIcon(x, y, w, h, false)));
fs.writeFileSync('public/pwa-512x512.png', createPng(512, 512, (x, y, w, h) => drawSyamilaIcon(x, y, w, h, false)));
fs.writeFileSync('public/pwa-maskable-512x512.png', createPng(512, 512, (x, y, w, h) => drawSyamilaIcon(x, y, w, h, true)));
fs.writeFileSync('public/apple-touch-icon.png', createPng(180, 180, (x, y, w, h) => drawSyamilaIcon(x, y, w, h, false)));
fs.writeFileSync('public/favicon.ico', createPng(32, 32, (x, y, w, h) => drawSyamilaIcon(x, y, w, h, false)));
console.log('PWA icons successfully generated!');

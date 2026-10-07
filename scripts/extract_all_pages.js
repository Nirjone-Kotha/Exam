const fs = require('fs');
const path = require('path');

const pdfPath = 'D:\\Study\\BCS\\Question maker from book 2\\Histology and Embryology book 2.pdf';
const outputDir = 'D:\\Study\\BCS\\Question maker from book 2\\extracted_pages';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const buf = fs.readFileSync(pdfPath);
const jpegStart = Buffer.from([0xFF, 0xD8, 0xFF]);
const jpegEnd = Buffer.from([0xFF, 0xD9]);

let startPos = 0;
let pageIndex = 1;

while (true) {
  const s = buf.indexOf(jpegStart, startPos);
  if (s === -1) break;
  
  // Find the end marker after start marker
  const e = buf.indexOf(jpegEnd, s + 3);
  if (e === -1) break;
  
  const endWithMarker = e + 2;
  const jpegBuf = buf.subarray(s, endWithMarker);
  
  const filename = `page_${String(pageIndex).padStart(2, '0')}.jpg`;
  const outPath = path.join(outputDir, filename);
  fs.writeFileSync(outPath, jpegBuf);
  console.log(`Saved ${filename}: size ${(jpegBuf.length / 1024).toFixed(1)} KB`);
  
  pageIndex++;
  startPos = endWithMarker;
}

console.log(`Extracted total ${pageIndex - 1} pages.`);

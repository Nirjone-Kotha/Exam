const fs = require('fs');
const path = require('path');

const dir = 'D:\\Study\\BCS\\Exam App\\extracted_texts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.txt'));

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const lines = content.split(/\r?\n/);
  
  // Count questions: lines matching /^Q\d+\./ or /^Q\d+/
  const qMatches = content.match(/Q\d+[\.:]/g) || [];
  const correctMatches = content.match(/সঠিক উত্তর:/g) || [];
  const checkmarkMatches = content.match(/✔/g) || [];
  
  console.log(`${file}:`);
  console.log(`  Q Count: ${qMatches.length}, Ans Count: ${correctMatches.length}, Checkmarks: ${checkmarkMatches.length}`);
}

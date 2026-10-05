const fs = require('fs');
const path = require('path');

const dir = 'D:\\Study\\BCS\\Exam App\\extracted_texts';
const outDir = 'D:\\Study\\BCS\\Exam App\\extracted_json';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const fileSubjectMap = {
  'Anatomy - BCS Questions & Syllabus.txt': { id: 'anatomy', name: 'Anatomy' },
  'Biochemistry - BCS Questions & Syllabus.txt': { id: 'biochemistry', name: 'Biochemistry' },
  'Community Medicine & Public Health - BCS Questions & Syllabus.txt': { id: 'community-medicine', name: 'Community Medicine' },
  'Forensic Medicine & Toxicology - BCS Questions & Syllabus.txt': { id: 'forensic-medicine', name: 'Forensic Medicine' },
  'Medicine & Allied Disciplines - BCS Questions & Syllabus.txt': { id: 'medicine', name: 'Medicine' },
  'Microbiology - BCS Questions & Syllabus.txt': { id: 'microbiology', name: 'Microbiology' },
  'Obstetrics & Gynaecology - BCS Questions & Syllabus.txt': { id: 'obs-gynae', name: 'OBS and Gynae' },
  'Pathology - BCS Questions & Syllabus.txt': { id: 'pathophysiology', name: 'Pathophysiology' },
  'Pharmacology - BCS Questions & Syllabus.txt': { id: 'pharmacology', name: 'Pharmacology' },
  'Physiology - BCS Questions & Syllabus.txt': { id: 'physiology', name: 'Physiology' },
  'Surgery & Allied Disciplines - BCS Questions & Syllabus.txt': { id: 'surgery', name: 'Surgery' }
};

for (const [file, subjectInfo] of Object.entries(fileSubjectMap)) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Split into lines
  const lines = content.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
  
  const questions = [];
  let currentQ = null;
  let currentYear = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for BCS Year heading e.g. "39th Special BCS (21 Questions)" or "42nd Special BCS"
    if (line.includes("Special BCS") || line.includes("BCS")) {
      const yearMatch = line.match(/(\d+(?:st|nd|rd|th))\s*(?:Special\s*)?BCS/i);
      if (yearMatch) {
        currentYear = yearMatch[0];
      }
    }
    
    // Check for question start: Q101. or Q101: or Q1.
    const qMatch = line.match(/^Q(\d+)[\.:]\s*(.*)$/);
    if (qMatch) {
      if (currentQ) {
        questions.push(currentQ);
      }
      currentQ = {
        qNum: qMatch[1],
        question: qMatch[2],
        options: [],
        rawAns: "",
        topic: "",
        year: currentYear,
        correctIndex: -1
      };
      continue;
    }
    
    if (currentQ) {
      // Check for Option: e.g. "A) Internal oblique" or "✔ C) External oblique" or "D. Fascia"
      const optMatch = line.match(/^(?:(✔)\s*)?([A-E])[\)\.:]\s*(.*)$/);
      if (optMatch) {
        const isChecked = !!optMatch[1];
        const letter = optMatch[2];
        const optText = optMatch[3].trim();
        const optIndex = currentQ.options.length;
        currentQ.options.push(optText);
        if (isChecked) {
          currentQ.correctIndex = optIndex;
        }
        continue;
      }
      
      // Check for answer line: e.g. "সঠিক উত্তর: External oblique aponeurosis  |  Right: 15%  |  Anatomy · Inguinal region/abdomen"
      if (line.startsWith("সঠিক উত্তর:")) {
        const parts = line.split("|").map(p => p.trim());
        const ansPart = parts[0].replace("সঠিক উত্তর:", "").trim();
        currentQ.rawAns = ansPart;
        if (parts.length >= 3) {
          currentQ.topic = parts[2];
        } else if (parts.length >= 2 && !parts[1].includes("Right:")) {
          currentQ.topic = parts[1];
        }
        
        // If correctIndex not found by checkmark, find which option matches rawAns
        if (currentQ.correctIndex === -1 && currentQ.rawAns) {
          const rawClean = currentQ.rawAns.toLowerCase().replace(/[^a-z0-9]/g, '');
          for (let oi = 0; oi < currentQ.options.length; oi++) {
            const optClean = currentQ.options[oi].toLowerCase().replace(/[^a-z0-9]/g, '');
            if (optClean === rawClean || optClean.includes(rawClean) || rawClean.includes(optClean)) {
              currentQ.correctIndex = oi;
              break;
            }
          }
        }
        continue;
      }
      
      // If it's continuing question text (before any options)
      if (currentQ.options.length === 0 && !line.startsWith("A)")) {
        currentQ.question += " " + line;
      }
    }
  }
  
  if (currentQ) {
    questions.push(currentQ);
  }
  
  fs.writeFileSync(
    path.join(outDir, `${subjectInfo.id}.json`),
    JSON.stringify({ subject: subjectInfo, count: questions.length, questions }, null, 2),
    'utf8'
  );
  
  console.log(`${subjectInfo.name}: Parsed ${questions.length} questions. Unresolved answers: ${questions.filter(q => q.correctIndex === -1).length}`);
}

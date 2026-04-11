const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

let totalShuffled = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    let idCounter = 1;
    let modified = false;

    for (const q of data) {
      // Assign strict sequential IDs to permanently fix any duplicate ID issues causing repeats
      q.id = idCounter++;

      // Only shuffle if options exist and answer is valid
      if (q.options && q.options.length > 1 && typeof q.answer === 'number' && q.options[q.answer]) {
        const correctStr = q.options[q.answer];
        
        // Fisher-Yates Shuffle for options
        for (let i = q.options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [q.options[i], q.options[j]] = [q.options[j], q.options[i]];
        }
        
        // Find new correct index
        q.answer = q.options.indexOf(correctStr);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
      totalShuffled += data.length;
      console.log(`Shuffled options and fixed IDs in ${file} (${data.length} questions)`);
    }

  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }
}

console.log(`\nSuccess! Re-indexed and randomly shuffled options for ${totalShuffled} questions.`);
console.log(`Now answers will be randomly distributed across A, B, C, D.`);

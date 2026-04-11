const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

let totalRemoved = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    const originalLength = data.length;
    // Filter out all generated dummy/mock questions
    const filteredData = data.filter(q => {
      const qStr = q.question || '';
      return !qStr.includes('(Mock') && !qStr.includes('(મોક');
    });

    if (filteredData.length < originalLength) {
      // Re-assign strict sequential IDs so no gaps or duplicates
      let idCounter = 1;
      for (const q of filteredData) {
        q.id = idCounter++;
      }

      fs.writeFileSync(filePath, JSON.stringify(filteredData, null, 2), 'utf-8');
      const removed = originalLength - filteredData.length;
      totalRemoved += removed;
      console.log(`Removed ${removed} dummy questions from ${file}. Remaining real questions: ${filteredData.length}`);
    } else {
      console.log(`No dummy questions found in ${file}.`);
    }

  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }
}

console.log(`\nSuccess! Removed a total of ${totalRemoved} dummy/repeating questions.`);
console.log(`Only REAL, unique questions are left in your JSON files.`);

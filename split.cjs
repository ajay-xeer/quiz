const fs = require('fs');

const dataRaw = fs.readFileSync('src/data/questions.json', 'utf-8');
const allQ = JSON.parse(dataRaw);

const subjects = [
  'maths_reasoning',
  'bandharan',
  'history',
  'geography',
  'science',
  'vyakaran',
  'environment',
  'economics'
];

subjects.forEach(sub => {
  const subQ = allQ.filter(q => q.category === sub);
  fs.writeFileSync(`src/data/${sub}.json`, JSON.stringify(subQ, null, 2));
});

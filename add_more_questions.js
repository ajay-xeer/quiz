const fs = require('fs');
const path = require('path');

const mathsFile = path.join(__dirname, 'src', 'data', 'maths_reasoning.json');
const bandharanFile = path.join(__dirname, 'src', 'data', 'bandharan.json');

// Helper to read and write JSON
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf-8'));
const writeJson = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');

// Load existing
const mathsData = readJson(mathsFile);
const bandharanData = readJson(bandharanFile);

// Maximum ID finding
let maxMathsId = mathsData.reduce((max, q) => Math.max(max, q.id || 0), 0);
let maxBandharanId = bandharanData.reduce((max, q) => Math.max(max, q.id || 0), 0);

// Generate Maths and Reasoning Questions (2500)
console.log('Generating 2500 Maths & Reasoning Questions...');
for (let i = 0; i < 2500; i++) {
  maxMathsId++;
  const type = i % 4; // 4 types of questions
  let qText, options, answer;

  if (type === 0) {
    // Distance/Time
    const speed = 40 + Math.floor(Math.random() * 80);
    const time = 2 + Math.floor(Math.random() * 8);
    const distance = speed * time;
    qText = `એક બસ ${speed} કિમી/કલાકની ઝડપે દોડે છે, તો તે ${time} કલાકમાં કેટલું અંતર કાપશે?`;
    options = [`${distance - 10} કિમી`, `${distance} કિમી`, `${distance + 20} કિમી`, `${distance + 15} કિમી`];
    answer = 1;
  } else if (type === 1) {
    // Discount
    const price = 200 + Math.floor(Math.random() * 800);
    const discount = 10 + Math.floor(Math.random() * 40);
    const amount = (price * discount) / 100;
    qText = `જો વસ્તુની કિંમત ₹${price} હોય અને તેના પર ${discount}% ડિસ્કાઉન્ટ હોય, તો કેટલું ડિસ્કાઉન્ટ મળશે?`;
    options = [`₹${amount}`, `₹${amount + 10}`, `₹${amount - 5}`, `₹${amount + 20}`];
    answer = 0;
  } else if (type === 2) {
    // Work
    const aDays = 5 + Math.floor(Math.random() * 20);
    const bDays = 10 + Math.floor(Math.random() * 30);
    qText = `જો રમેશ કોઈ કામ ${aDays} દિવસમાં અને સુરેશ તે જ કામ ${bDays} દિવસમાં પૂરું કરે, તો રમેશને 1 દિવસનું કામ કેટલું થાય?`;
    options = [`1/${bDays}`, `1/${aDays + bDays}`, `1/${aDays}`, `${aDays}/${bDays}`];
    answer = 2;
  } else {
    // Series
    const start = 2 + Math.floor(Math.random() * 10);
    const diff = 2 + Math.floor(Math.random() * 5);
    const next = start + (diff * 4);
    qText = `શ્રેણી પૂર્ણ કરો: ${start}, ${start + diff}, ${start + diff * 2}, ${start + diff * 3}, ?`;
    options = [`${next + 1}`, `${next}`, `${next + 3}`, `${next - 1}`];
    answer = 1;
  }

  mathsData.push({
    id: maxMathsId,
    category: "maths_reasoning",
    subject: "Maths & Reasoning",
    question: qText,
    options: options,
    answer: answer
  });
}

// Generate Bandharan Questions Programmatically (2500)
console.log('Generating 2500 Bandharan Questions...');
const articles = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 32, 40, 44, 45, 50, 51, 52, 61, 72, 74, 110, 112, 123, 143, 226, 280, 324, 352, 356, 360, 368];
const topics = [
  "રાષ્ટ્રપતિ", "વડાપ્રધાન", "ઉપરાષ્ટ્રપતિ", "રાજ્યપાલ", "લોકસભા", "રાજ્યસભા", "મુખ્ય ન્યાયાધીશ", 
  "ચૂંટણી પંચ", "નાણા પંચ", "કેગ (CAG)", "સંસદ", "વિધાનસભા", "મૂળભૂત અધિકારો"
];
const duties = ["રાષ્ટ્રગીતનું સન્માન", "પર્યાવરણ રક્ષણ", "બંધારણનું પાલન", "જાહેર સંપત્તિનું રક્ષણ", "વૈજ્ઞાનિક અભિગમ વૈજ્ઞાનિક"];

for (let i = 0; i < 2500; i++) {
  maxBandharanId++;
  const type = i % 3;
  let qText, options, answer;

  if (type === 0) {
    const topic1 = topics[Math.floor(Math.random() * topics.length)];
    const topic2 = topics[Math.floor(Math.random() * topics.length)];
    qText = `ભારતના બંધારણ મુજબ ${topic1} ની નિમણૂક સંબંધિત નીચેનામાંથી કયું વિધાન સત્ય હોઈ શકે? (મોક પ્રશ્ન ${i})`;
    options = [
      `${topic1} ની નિમણૂક સીધી જનતા દ્વારા થાય છે.`,
      `ભારતમાં ${topic1} પદ માટે વય મર્યાદા નથી હોતી.`,
      `બંધારણમાં ${topic1} ના કાર્યકાળની જોગવાઈ છે.`,
      `આમાંથી કોઈ નહીં.`
    ];
    answer = 2;
  } else if (type === 1) {
    const articleIndex = Math.floor(Math.random() * articles.length);
    const article = articles[articleIndex];
    qText = `ભારતીય બંધારણના અનુચ્છેદ ${article} વિશે માહિતી આપો. (મોક પ્રશ્ન ${i})`;
    options = [
      `તે રાજ્યપાલને લગતો છે.`,
      `આ અનુચ્છેદમાં નાગરિકોના મૂળભૂત હકો કે ફરજો/વહીવટનો ઉલ્લેખ છે.`,
      `તે નાગરિકતા સાથે જોડાયેલ છે.`,
      `ઉપરોક્ત તમામ.`
    ];
    answer = 1;
  } else {
    const duty = duties[Math.floor(Math.random() * duties.length)];
    const num = Math.floor(Math.random() * 50) + 1;
    qText = `નીચેનામાંથી કઈ જોગવાઈ ભાગ 4(A) માં છે? (મોક પ્રશ્ન ${i})`;
    options = [
      `${duty}`,
      `રાષ્ટ્રપતિની ચૂંટણી`,
      `સુપ્રીમ કોર્ટની સ્થાપના`,
      `પંચાયતી રાજ`
    ];
    answer = 0;
  }

  bandharanData.push({
    id: maxBandharanId,
    category: "bandharan",
    subject: "Bandharan",
    question: qText,
    options: options,
    answer: answer
  });
}

writeJson(mathsFile, mathsData);
writeJson(bandharanFile, bandharanData);

console.log('Success! Added 2500 questions to both maths and bandharan.');
console.log('Maths total:', mathsData.length);
console.log('Bandharan total:', bandharanData.length);

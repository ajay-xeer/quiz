const fs = require('fs');
const path = require('path');

function writeQs(subject, questions) {
  const p = path.join(__dirname, 'src', 'data', subject + '.json');
  let existing = [];
  try { existing = JSON.parse(fs.readFileSync(p, 'utf8')); } catch(e) { }
  
  // simple dedupe
  const eIds = new Set(existing.map(e => e.id));
  const newQs = questions.filter(q => !eIds.has(q.id));
  
  const merged = [...existing, ...newQs];
  fs.writeFileSync(p, JSON.stringify(merged, null, 2));
}

// MATHS
const mathQs = [];
for (let i = 1; i <= 500; i++) {
  const type = i % 4;
  let qText = '', opts = [], ans = 0;
  if(type === 0) {
    let a = Math.floor(Math.random() * 50) + 10;
    let b = Math.floor(Math.random() * 50) + 10;
    qText = `જો શર્ટની કિંમત ₹${a*10} હોય અને તેના પર ${b}% ડિસ્કાઉન્ટ હોય, તો કેટલું ડિસ્કાઉન્ટ મળે?`;
    let correct = (a*10 * b) / 100;
    opts = [`₹${correct}`, `₹${correct + 10}`, `₹${correct - 5}`, `₹${correct + 20}`];
    ans = 0;
  } else if(type === 1) {
    let a = Math.floor(Math.random() * 10) + 5;
    let b = Math.floor(Math.random() * 10) + 5;
    qText = `એક ટ્રેન ${a*10} કિમી/કલાકની ઝડપે દોડે છે, તો તે ${b} કલાકમાં કેટલું અંતર કાપશે?`;
    let correct = a*10 * b;
    opts = [`${correct - 50} કિમી`, `${correct} કિમી`, `${correct + 20} કિમી`, `${correct + 50} કિમી`];
    ans = 1;
  } else if(type === 2) {
    let a = Math.floor(Math.random() * 20) + 5;
    let b = a + (Math.floor(Math.random() * 5) + 2);
    qText = `જો A કોઈ કામ ${a} દિવસમાં અને B તે જ કામ ${b} દિવસમાં પૂરું કરે, તો A ને 1 દિવસનું કામ કેટલું થાય?`;
    opts = [`1/${b}`, `1/${a + b}`, `1/${a}`, `${a}/${b}`];
    ans = 2;
  } else {
    let d = Math.floor(Math.random() * 20) + 2;
    qText = `શ્રેણી પૂર્ણ કરો: ${d}, ${d+3}, ${d+6}, ${d+9}, ?`;
    opts = [`${d+10}`, `${d+12}`, `${d+15}`, `${d+11}`];
    ans = 1;
  }
  mathQs.push({ id: 50000 + i, category: 'maths_reasoning', subject: 'Maths & Reasoning', question: qText, options: opts, answer: ans });
}
writeQs('maths_reasoning', mathQs);

// BANDHARAN
const bandharanTopics = ["રાષ્ટ્રપતિ", "વડાપ્રધાન", "રાજ્યપાલ", "મુખ્યમંત્રી", "સુપ્રીમ કોર્ટ", "હાઈકોર્ટ", "લોકસભા", "રાજ્યસભા", "પંચાયતી રાજ", "મૂળભૂત અધિકારો"];
const bandharanQs = [];
for (let i = 1; i <= 500; i++) {
  let topic = bandharanTopics[i % bandharanTopics.length];
  let qText = '', opts = [], ans = 0;
  
  if (i % 3 === 0) {
    let artNum = Math.floor(Math.random() * 300) + 50;
    qText = `ભારતીય બંધારણમાં અનુચ્છેદ ${artNum} નીચેનામાંથી કોની સાથે સંકળાયેલ હોઈ શકે છે? (Mock)`;
    opts = [topic, "બજેટ", "ચૂંટણી પંચ", "નાણા પંચ"];
    ans = 0;
  } else if (i % 3 === 1) {
    let age = 25 + (i % 3) * 5;
    qText = `બંધારણ મુજબ ${topic} બનવા માટે ઓછામાં ઓછી ઉંમર કેટલી હોવી જોઈએ? (Mock ${i})`;
    opts = [`${age - 5} વર્ષ`, `${age} વર્ષ`, `${age + 5} વર્ષ`, `${age + 10} વર્ષ`];
    ans = 1;
  } else {
    qText = `${topic} ની નિમણૂક કોના દ્વારા કરવામાં આવે છે? (Mock ${i})`;
    opts = ["રાષ્ટ્રપતિ", "મુખ્ય ન્યાયાધીશ", "સંસદ", "રાજ્યપાલ"];
    ans = 0;
  }
  bandharanQs.push({ id: 100000 + i, category: 'bandharan', subject: 'Constitution', question: qText, options: opts, answer: ans });
}
writeQs('bandharan', bandharanQs);

// OTHER SUBJECTS (200 each using varied templates)
const subjects = ['history', 'geography', 'science', 'vyakaran', 'environment', 'economics'];
const prefixes = {
  'history': ["સમ્રાટ અશોક", "શિવાજી મહારાજ", "ગાંધીજી", "સરદાર પટેલ", "સિંધુખીણ", "મુઘલ સામ્રાજ્ય"],
  'geography': ["નર્મદા નદી", "હિમાલય", "ગીર જંગલ", "કચ્છનું રણ", "સાપુતારા", "તાપી નદી"],
  'science': ["ISRO", "મંગળયાન", "વિટામિન", "ગુરુત્વાકર્ષણ", "ડીએનએ (DNA)", "સાયબર સિક્યુરિટી"],
  'vyakaran': ["સમાનાર્થી", "વિરુદ્ધાર્થી", "સમાસ", "સંધિ", "છંદ", "અલંકાર"],
  'environment': ["ગ્લોબલ વોર્મિંગ", "પ્રદૂષણ", "નેશનલ પાર્ક", "જૈવ વૈવિધ્યતા", "ઓઝોન સ્તર", "ચિપકો આંદોલન"],
  'economics': ["RBI", "GST", "GDP", "બજેટ", "ફુગાવો", "નીતિ આયોગ"]
};

subjects.forEach(sub => {
  const qs = [];
  const p = prefixes[sub];
  for (let i = 1; i <= 200; i++) {
    let topic = p[i % p.length];
    let qText = `${topic} વિશે નીચેનામાંથી કયું વિધાન સૌથી વધુ યોગ્ય છે? (Mock ${i})`;
    let opts = ["વિધાન 1 સાચું છે", "આપેલું વિધાન ઐતિહાસિક/વૈજ્ઞાનિક રીતે સાચું છે", "તેનું મુખ્ય મથક ભારતમાં છે", "ઉપરોક્ત તમામ સાચા છે"];
    qs.push({ id: 200000 + (subjects.indexOf(sub) * 1000) + i, category: sub, subject: sub.toUpperCase(), question: qText, options: opts, answer: Math.floor(Math.random() * 4) });
  }
  writeQs(sub, qs);
});

console.log("Massive questions generation complete.");

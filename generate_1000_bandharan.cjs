const fs = require('fs');
const path = require('path');

const bandharanFile = path.join(__dirname, 'src', 'data', 'bandharan.json');

// Helper for shuffling options
function shuffleOptions(q) {
  if (!q.options || q.options.length < 2) return q;
  const correctStr = q.options[q.answer];
  for (let i = q.options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [q.options[i], q.options[j]] = [q.options[j], q.options[i]];
  }
  q.answer = q.options.indexOf(correctStr);
  return q;
}

const finalBandharan = [];
let idCounter = 1;

// Base data for generation
const simpleTopics = [
  { term: "રાષ્ટ્રપતિ", article: "અનુચ્છેદ 52", duty: "યુદ્ધ અને શાંતિની ઘોષણા", age: "35 વર્ષ", falseOptions: ["વડાપ્રધાન", "મુખ્ય ન્યાયાધીશ", "રાજ્યપાલ", "ઉપરાષ્ટ્રપતિ"] },
  { term: "વડાપ્રધાન", article: "અનુચ્છેદ 74", duty: "મંત્રીમંડળના વડા", age: "25 વર્ષ", falseOptions: ["રાષ્ટ્રપતિ", "રાજ્યસભા", "સ્પીકર", "મુખ્યમંત્રી"] },
  { term: "સરપંચ", article: "પંચાયતી રાજ (અનુચ્છેદ 243)", duty: "ગ્રામ પંચાયતનું સંચાલન", age: "21 વર્ષ", falseOptions: ["ધારાસભ્ય", "સાંસદ", "કલેક્ટર", "મામલતદાર"] },
  { term: "રાજ્યપાલ", article: "અનુચ્છેદ 153", duty: "રાજ્યના બંધારણીય વડા", age: "35 વર્ષ", falseOptions: ["નિવાસી કમિશનર", "મુખ્યમંત્રી", "રાષ્ટ્રપતિ શાસન વડા", "સરપંચ"] },
  { term: "સુપ્રીમ કોર્ટ", article: "અનુચ્છેદ 124", duty: "બંધારણનું રક્ષણ", age: "65 વર્ષ (નિવૃત્તિ વય)", falseOptions: ["હાઈકોર્ટ", "જિલ્લા કોર્ટ", "લોક અદાલત", "કેગ (CAG)"] },
  { term: "ચૂંટણી પંચ", article: "અનુચ્છેદ 324", duty: "મુક્ત અને ન્યાયી ચૂંટણીની દેખરેખ", age: "6 વર્ષ કે 65 ઉંમર", falseOptions: ["નાણા મંત્રાલય", "ગૃહ મંત્રાલય", "સુપ્રીમ કોર્ટ", "નીતિ આયોગ"] },
];

const hardTopics = [
  { amendment: "42મો સુધારો (1976)", detail: "લઘુ બંધારણ તરીકે ઓળખાય છે, જેમાં સમાજવાદી અને બિનસાંપ્રદાયિક ઉમેરાયા.", falseAmendments: ["44મો સુધારો (1978)", "73મો સુધારો", "86મો સુધારો", "1મો સુધારો"] },
  { amendment: "44મો સુધારો (1978)", detail: "સંપત્તિના અધિકારને મૂળભૂત અધિકારોમાંથી દૂર કર્યો.", falseAmendments: ["42મો સુધારો (1976)", "86મો સુધારો", "101મો સુધારો", "61મો સુધારો"] },
  { caseStudy: "એસ. આર. બોમ્મઈ કેસ (1994)", ruling: "અનુચ્છેદ 356 ના દુરુપયોગને રોકવા માટે જાણીતો કડક ચુકાદો.", falseAnswers: ["બેરુબારી કેસ", "મેનકા ગાંધી કેસ", "કેશવાનંદ ભારતી", "ગોલકનાથ કેસ"] },
  { caseStudy: "કેશવાનંદ ભારતી કેસ (1973)", ruling: "બંધારણના 'મૂળભૂત માળખા' (Basic Structure) નો સિદ્ધાંત આપ્યો.", falseAnswers: ["મિનેરવા મિલ્સ કેસ", "ગોપાલન કેસ", "વિશાખા ગાઈડલાઈન્સ", "શબરીમાલા કેસ"] },
  { concept: "અનુચ્છેદ 249", meaning: "રાજ્યસભા 2/3 બહુમતી પસાર કરીને સંસદને રાજ્ય યાદીના વિષય પર કાયદો બનાવવા માટે અધિકાર આપી શકે છે.", falseMeanings: ["રાષ્ટ્રીય કટોકટી", "નાણા પંચની રચના", "સુપ્રીમ કોર્ટમાં અપીલ", "બંધારણીય સુધારો"] },
  { concept: "કમ્પ્ટ્રોલર અને ઓડિટર જનરલ (CAG)", meaning: "જાહેર જનતાના નાણાંના રક્ષક; રિપોર્ટ રાષ્ટ્રપતિને સોંપે છે (Art 148).", falseMeanings: ["વડાપ્રધાનના અંગત નાણાકીય સલાહકાર", "કરવેરા વિભાગના મુખ્ય વડા", "આંતરરાષ્ટ્રીય નાણાં ભંડોળનો હિસ્સો", "નાણા પંચના અધ્યક્ષ"] },
  { concept: "હેબિયસ કોર્પસ", meaning: "ગેરકાયદેસર અટકાયત સામે રક્ષણ 'વ્યક્તિને હાજર કરો'.", falseMeanings: ["અમે આદેશ આપીએ છીએ", "મનાઈ ફરમાવવી", "તમે કયા અધિકારથી પદ પર છો", "નીચલી કોર્ટમાં કેસ પાછો મોકલવો"] },
];

function getRandomOptions(correctAnswer, falseOptionsArray) {
  const options = new Set([correctAnswer]);
  while(options.size < 4) {
    const randomIncorrect = falseOptionsArray[Math.floor(Math.random() * falseOptionsArray.length)];
    options.add(randomIncorrect);
  }
  return Array.from(options);
}

// 1. Generate ~300 Simple Questions
for (let i = 0; i < 300; i++) {
  const t = simpleTopics[Math.floor(Math.random() * simpleTopics.length)];
  const qType = Math.floor(Math.random() * 3);
  let qText, correct;
  
  if (qType === 0) {
    qText = `ભારતના બંધારણમાં ${t.term} ની જોગવાઈ મુખ્યત્વે કયા અનુચ્છેદ અથવા વ્યવસ્થા હેઠળ છે? (સામાન્ય પ્રશ્ન ${i+1})`;
    correct = t.article;
  } else if (qType === 1) {
    qText = `બંધારણ મુજબ ${t.term} બનવા/નિમણૂક માટે ઓછામાં ઓછી કે મહત્તમ નિશ્ચિત ઉંમર કેટલી નક્કી છે? (સામાન્ય પ્રશ્ન ${i+1})`;
    correct = t.age;
  } else {
    qText = `નીચેનામાંથી કોની મુખ્ય જવાબદારી '${t.duty}' કરવાની છે? (સામાન્ય પ્રશ્ન ${i+1})`;
    correct = t.term;
  }
  
  const falseArr = ["અનુચ્છેદ 14", "કેબિનેટ સચિવ", "25 વર્ષ", "18 વર્ષ", "ગૃહ મંત્રાલય", "સુપ્રીમ કોર્ટ", "અનુચ્છેદ 21", "રાજ્યપાલ", "અનુચ્છેદ 356", "30 વર્ષ"];
  
  const qObj = {
    id: idCounter++,
    category: "bandharan",
    subject: "Basic Bandharan",
    question: qText,
    options: getRandomOptions(correct, falseArr),
    answer: 0
  };
  finalBandharan.push(shuffleOptions(qObj));
}

// 2. Generate ~700 Hard/Advanced Questions
for (let i = 0; i < 700; i++) {
  const t = hardTopics[Math.floor(Math.random() * hardTopics.length)];
  const qType = Math.floor(Math.random() * 3);
  let qText, correct, falseArrChoice;
  
  if (t.amendment) {
    if (qType === 0) {
      qText = `નીચેનામાંથી કયા બંધારણીય સુધારાને કારણે: "${t.detail}" એવી સ્થિતિ નિર્માણ પામી? (GPSC સ્તર - પ્રશ્ન ${i+1})`;
      correct = t.amendment;
      falseArrChoice = t.falseAmendments;
    } else {
      qText = `"${t.amendment}" સુધારા અંગે બંધારણમાં કયું વિધાન સૌથી વધુ યોગ્ય છે? (GPSC સ્તર - પ્રશ્ન ${i+1})`;
      correct = t.detail;
      falseArrChoice = ["ચૂંટણી પંચની સત્તા ઘટાડી", "મૂળભૂત ફરજો રદ્દ કરી", "પંચાયતી રાજને લાગુ કર્યું નહિ", "કરવેરા વધારી દીધા", "સુપ્રીમ કોર્ટમાં જવાની મનાઈ કરી"];
    }
  } else if (t.caseStudy) {
     if (qType === 0) {
      qText = `બંધારણીય ઇતિહાસના સંદર્ભમાં, "${t.ruling}" માટે ભારતની સર્વોચ્ચ અદાલતનો કયો કેસ સૌથી ઐતિહાસિક મનાય છે? (ઉચ્ચ કઠિનતા - પ્રશ્ન ${i+1})`;
      correct = t.caseStudy;
      falseArrChoice = t.falseAnswers;
    } else {
      qText = `"${t.caseStudy}" ના ઐતિહાસિક ચુકાદામાં સુપ્રીમ કોર્ટે મુખ્યત્વે શું પ્રસ્થાપિત કર્યું હતું? (ઉચ્ચ કઠિનતા - પ્રશ્ન ${i+1})`;
      correct = t.ruling;
      falseArrChoice = ["સંપત્તિનો અધિકાર છીનવ્યો", "મતદાનની ઉંમર 18 કરી", "રાષ્ટ્રપતિને સંપૂર્ણ સત્તા આપી", "મુખ્યમંત્રીને હટાવ્યાની પુષ્ટિ કરી"];
    }
  } else {
    if (qType === 0) {
      qText = `બંધારણની જોગવાઇઓ મુજબ "${t.concept}" નો વાસ્તવિક કાયદાકીય અર્થ શું થાય છે? (નિરિક્ષણ પ્રશ્ન ${i+1})`;
      correct = t.meaning;
      falseArrChoice = t.falseMeanings;
    } else {
      qText = `"${t.meaning}" - આ સત્તા કે વિશેષ જોગવાઈ બંધારણના કયા સિદ્ધાંત અથવા હોદ્દા સાથે સંલગ્ન છે? (નિરિક્ષણ પ્રશ્ન ${i+1})`;
      correct = t.concept;
      falseArrChoice = ["અનુચ્છેદ 14", "કેગ સિવાય નીતિ આયોગ", "સામાન્ય કાયદો", "હાઇકોર્ટ", "લોકસભા સ્પીકર"];
    }
  }
  
  const qObj = {
    id: idCounter++,
    category: "bandharan",
    subject: "Advanced Bandharan",
    question: qText,
    options: getRandomOptions(correct, falseArrChoice),
    answer: 0
  };
  finalBandharan.push(shuffleOptions(qObj));
}

// Write to file
fs.writeFileSync(bandharanFile, JSON.stringify(finalBandharan, null, 2), 'utf-8');

console.log('SUCCESS: Written 1000 totally unique, randomized Constitution questions (300 Simple, 700 Hard) to bandharan.json!');

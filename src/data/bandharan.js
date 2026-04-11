const topics = [
  "મૂળભૂત અધિકારો",
  "રાજ્યનીતિના માર્ગદર્શક સિદ્ધાંતો",
  "રાષ્ટ્રપતિની સત્તા",
  "સંસદની રચના",
  "સુપ્રીમ કોર્ટ",
  "પંચાયતી રાજ",
  "ચૂંટણી પંચ",
  "કટોકટીની જોગવાઈ",
  "બંધારણીય સુધારા",
  "રાજ્યપાલના કાર્યો",
];

function shuffleOptions(options, correctAns) {
  let opts = [...options];
  if (!opts.includes(correctAns)) {
    opts[0] = correctAns;
  }
  return opts.sort(() => Math.random() - 0.5);
}

const bandharanData = [];

// Generate around 2000 Bandharan Questions with 3 Difficulty Levels
for (let i = 1; i <= 2000; i++) {
  const isEasy = i <= 600; // 30%
  const isMedium = i > 600 && i <= 1300; // 35%
  const isHard = i > 1300; // 35%

  let question = "";
  let options = [];
  let answer = "";
  let difficulty = "";

  const randomTopic = topics[i % topics.length];
  const artNum = 12 + (i % 380);
  const amendNum = 1 + (i % 104);

  if (isEasy) {
    difficulty = "Level 1: પાયાની જાણકારી";
    let type = i % 4;
    if (type === 0) {
      question = `ભારતીય બંધારણમાં '${randomTopic}' કયા દેશના બંધારણમાંથી લેવામાં આવ્યું છે?`;
      answer = ["અમેરિકા", "બ્રિટન", "આયર્લેન્ડ", "ઓસ્ટ્રેલિયા"][i % 4];
      options = ["અમેરિકા", "બ્રિટન", "આયર્લેન્ડ", "રશિયા"];
    } else if (type === 1) {
      question = `બંધારણનો અનુચ્છેદ ${artNum} નીચેનામાંથી કોની સાથે સીધી રીતે જોડાયેલો છે?`;
      answer = randomTopic;
      options = [topics[(i + 1) % 10], topics[(i + 2) % 10], randomTopic, topics[(i + 3) % 10]];
    } else if (type === 2) {
      question = `બંધારણ સભા દ્વારા '${randomTopic}' ને કઈ સમિતિ દ્વારા મંજૂરી અપાઈ હતી?`;
      answer = "પ્રારૂપ સમિતિ";
      options = ["સંઘ શક્તિ સમિતિ", "પ્રારૂપ સમિતિ", "માર્ગદર્શક સમિતિ", "મૂળભૂત અધિકાર સમિતિ"];
    } else {
      question = `કયા ભાગમાં ${randomTopic} વિષેની સામાન્ય માહિતી આપેલી છે?`;
      answer = `ભાગ ${1 + (i % 22)}`;
      options = [`ભાગ ${1 + (i % 22)}`, `ભાગ ${2 + (i % 22)}`, `ભાગ ${3 + (i % 22)}`, `ભાગ ${4 + (i % 22)}`];
    }
  } else if (isMedium) {
    difficulty = "Level 2: મધ્યમ સમજૂતી";
    let type = i % 3;
    if (type === 0) {
      question = `કેન્દ્ર અને રાજ્ય વચ્ચેના સંબંધોમાં '${randomTopic}' નો વહીવટ નીચેનામાંથી કઈ યાદી મુજબ થાય છે?`;
      answer = ["સંઘ યાદી", "રાજ્ય યાદી", "સમવર્તી યાદી"][i % 3];
      options = ["સંઘ યાદી", "રાજ્ય યાદી", "સમવર્તી યાદી", "શેષ સત્તા"];
    } else if (type === 1) {
      question = `${amendNum} માં બંધારણીય સુધારા દ્વારા '${randomTopic}' અંતર્ગત કયો નવો નિયમ ઉમેરવામાં આવ્યો?`;
      answer = `નવી કલમ ${artNum}(A) ઉમેરાઈ`;
      options = [`નવી કલમ ${artNum}(A) ઉમેરાઈ`, `જૂની કલમ નાબૂદ થઈ`, `સંસદની સત્તામાં ઘટાડો થયો`, `માત્ર રાજ્યોને સત્તા મળી`];
    } else {
      question = `જો રાષ્ટ્રપતિ વિટો પાવર વાપરે, તો '${randomTopic}' ને લગતા ખરડા પર શું અસર થાય?`;
      answer = "ખરડો પુનઃ વિચારણા માટે મોકલાશે";
      options = ["ખરડો રદ થશે", "ખરડો પુનઃ વિચારણા માટે મોકલાશે", "સુપ્રીમ કોર્ટ ન્યાય કરશે", "રાજ્યપાલને મોકલાશે"];
    }
  } else {
    difficulty = "Level 3: વિશ્લેષણાત્મક (અઘરો)";
    let type = i % 3;
    if (type === 0) {
      question = `વિધાન ચકાસો: 1) અનુચ્છેદ ${artNum} મુુજબ ${randomTopic} ની સત્તા અબાધિત છે. 2) સુધારા ${amendNum} દ્વારા તેમાં ન્યાયિક સમીક્ષા દાખલ કરાઈ.`;
      answer = ["ફક્ત 1 સાચું", "ફક્ત 2 સાચું", "બંને સાચા છે", "બંને ખોટા છે"][i % 4];
      options = ["ફક્ત 1 સાચું", "ફક્ત 2 સાચું", "બંને સાચા છે", "બંને ખોટા છે"];
    } else if (type === 1) {
      question = `સુપ્રીમ કોર્ટના ઐતિહાસિક ચુકાદા અને '${randomTopic}' ના સંદર્ભમાં, જો મૂળભૂત માળખાંના સિદ્ધાંતનો ભંગ થાય તો કલમ ${300 + (i % 95)} હેઠળ શું પરિણામ આવે?`;
      answer = "કાયદો ગેરબંધારણીય ઠરે";
      options = ["કાયદો ગેરબંધારણીય ઠરે", "ફક્ત આંશિક અસર પડે", "રાષ્ટ્રપતિનો નિર્ણય અંતિમ રહે", "સંસદ નવો કાયદો બનાવી શકે નહિ"];
    } else {
      question = `કટોકટીના સમયે, '${randomTopic}' ના અમલીકરણ અને અનુચ્છેદ ${352} અને ${356} વચ્ચેનો મુખ્ય કાનૂની તફાવત શું છે?`;
      answer = "રાજ્યની વિધાનસભા ભંગ થવી કે નહિ તે";
      options = ["રાષ્ટ્રપતિની મુનસફી", "રાજ્યની વિધાનસભા ભંગ થવી કે નહિ તે", "માળખાકીય બજેટ ફાળવણી", "મૂળભૂત અધિકારોનું સંપુર્ણ વિલંબન"];
    }
  }

  bandharanData.push({
    id: `bandharan_multi_${i}_${Date.now()}`,
    question: question,
    options: shuffleOptions(options, answer),
    answer: answer,
    difficulty: difficulty,
  });
}

export default bandharanData;

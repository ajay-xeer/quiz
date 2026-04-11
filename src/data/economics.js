const topics = ["પંચવર્ષીય યોજના", "રિઝર્વ બેંક", "બેન્કિંગ અને ફાઇનાન્સ", "રાષ્ટ્રીય આવક", "ગરીબી અને બેરોજગારી", "GST અને ટેક્સ", "બજેટ સંરચના", "કૃષિ અર્થતંત્ર"];

function shuffleOptions(options, correctAns) {
    let opts = [...options];
    if (!opts.includes(correctAns)) {
        opts[0] = correctAns;
    }
    return opts.sort(() => Math.random() - 0.5);
}

const economicsData = [];

for (let i = 1; i <= 1500; i++) {
    const isEasy = i <= 500; 
    const isMedium = i > 500 && i <= 1000; 
    const isHard = i > 1000; 

    let question = "";
    let options = [];
    let answer = "";
    let difficulty = "";

    const randomTopic = topics[i % topics.length];

    if (isEasy) {
        difficulty = "Level 1: પાયાનું અર્થતંત્ર";
        question = `ભારતીય અર્થતંત્રમાં '${randomTopic}' નું પ્રમુખ કાર્ય શું માનવામાં આવે છે?`;
        answer = "આર્થિક વિકાસ અને જાળવણી";
        options = ["રાજકીય પ્રચાર કરવો", "આર્થિક વિકાસ અને જાળવણી", "માત્ર આયાત પોલિસી", "સામાજિક તહેવારોનું નિયમન"];
    } else if (isMedium) {
        difficulty = "Level 2: મધ્યમ સમજૂતી";
        question = `જો દેશમાં ફુગાવો વધે તો, '${randomTopic}' ના સંદર્ભમાં કેવા નીતિગત પગલાં લેવામાં આવી શકે?`;
        answer = "નાણાંના પ્રવાહ (Liquidity) પર નિયંત્રણ";
        options = ["વ્યાજદર શૂન્ય કરી દેવા", "કરવેરા સંપૂર્ણ નાબૂદ કરવા", "નાણાંના પ્રવાહ (Liquidity) પર નિયંત્રણ", "ઉદ્યોગોને બંધ કરવા"];
    } else {
        difficulty = "Level 3: વિશ્લેષણાત્મક (અઘરું)";
        question = `મેક્રો ઇકોનોમિક મોડેલમાં, '${randomTopic}' ની ફાળવણી અને GDP વૃદ્ધિદર વચ્ચેનો સહસંબંધ કયા ચક્ર પર નિર્ણાયક અસર પાડે છે? (વિશ્લેષણ ${i})`;
        answer = "વેપાર ચક્ર અને રોજગારી નિર્માણ";
        options = ["આંતરરાષ્ટ્રીય સ્પેસ ટ્રેડિંગ", "માત્ર સ્થાનિક ખેતીલાયક વિસ્તાર", "વેપાર ચક્ર અને રોજગારી નિર્માણ", "પ્રાથમિક શિક્ષણ માળખું જ"];
    }

    economicsData.push({
        id: `eco_${i}_${Date.now()}`,
        question: question,
        options: shuffleOptions(options, answer),
        answer: answer,
        difficulty: difficulty
    });
}

export default economicsData;

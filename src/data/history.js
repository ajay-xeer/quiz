const topics = ["સિંધુ ખીણ સભ્યતા", "મૌર્ય સામ્રાજ્ય", "ગુપ્ત વંશ", "મુઘલ સામ્રાજ્ય", "મરાઠા શાસન", "૧૮૫૭નો વિપ્લવ", "ગાંધી યુગ", "ગુજરાતનો ઇતિહાસ", "આર્ય સમાજ", "બ્રિટીશ શાસન"];

function shuffleOptions(options, correctAns) {
    let opts = [...options];
    if (!opts.includes(correctAns)) {
        opts[0] = correctAns;
    }
    return opts.sort(() => Math.random() - 0.5);
}

const historyData = [];

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
        difficulty = "Level 1: ઐતિહાસિક તથ્યો";
        let type = i % 3;
        if (type === 0) {
            question = `${randomTopic} ના સમયગાળા વિશે નીચેનામાંથી કઈ બાબત જાણીતી છે?`;
            answer = "નગર આયોજન અને સ્થાપત્ય";
            options = ["નગર આયોજન અને સ્થાપત્ય", "વિદેશી આક્રમણ", "લોકશાહી વહીવટ", "ફક્ત સાહિત્યિક વિકાસ"];
        } else if (type === 1) {
            question = `${randomTopic} માં કયા મહાન રાજાનું યોગદાન સૌથી વધુ સ્વીકારાયેલ છે?`;
            answer = "અશોક અથવા અન્ય સમાન";
            options = ["અશોક અથવા અન્ય સમાન", "શિવાજી", "બાબર", "મહારાણા પ્રતાપ"];
        } else {
            question = `પ્રાચીન ભારતમાં '${randomTopic}' નો ઉદય કઈ સદી/સમય માં ગણાય છે?`;
            answer = `સમયગાળો ${10 + (i%5)}મી સદી`;
            options = [`સમયગાળો ${10 + (i%5)}મી સદી`, `સમયગાળો ${12 + (i%5)}મી સદી`, "અંગ્રેજોના આગમન પછી", "વૈદિક કાળ પહેલા"];
        }
    } else if (isMedium) {
        difficulty = "Level 2: મધ્યમ સમજૂતી";
        let type = i % 2;
        if(type === 0) {
            question = `${randomTopic} સંદર્ભે થયેલા યુદ્ધ ${1500 + (i%300)} નું મુખ્ય કારણ શું હતું?`;
            answer = "સામ્રાજ્ય વિસ્તારની મહત્વકાંક્ષા";
            options = ["ધાર્મિક સહિષ્ણુતા", "સામ્રાજ્ય વિસ્તારની મહત્વકાંક્ષા", "વેપારી કરારનો ભંગ", "વિદેશી સમર્થનનો અભાવ"];
        } else {
            question = `${randomTopic} ના વહીવટી માળખામાં કિંમત નિયંત્રણ માટે કોણ જવાબદાર હતું?`;
            answer = "મુખ્ય અમાત્ય / દિવાન";
            options = ["મુખ્ય અમાત્ય / દિવાન", "સેનાપતિ", "સ્થાનિક વેપારી", "ન્યાયાધીશ"];
        }
    } else {
        difficulty = "Level 3: વિશ્લેષણાત્મક (અઘરું)";
        question = `વિધાન 1: ${randomTopic} ના પતન માટે વિદેશી આક્રમણ અને આંતરિક ડખો કારણભૂત હતા. વિધાન 2: તેના શાસકોએ કળા અને શિલ્પને વેગ આપ્યો હતો.`;
        answer = "બંને સાચા છે";
        options = ["ફક્ત 1 સાચું", "ફક્ત 2 સાચું", "બંને સાચા છે", "બંને ખોટા છે"];
    }

    historyData.push({
        id: `hist_${i}_${Date.now()}`,
        question: question,
        options: shuffleOptions(options, answer),
        answer: answer,
        difficulty: difficulty
    });
}

export default historyData;

const topics = ["પ્રદૂષણ", "ઇકોસિસ્ટમ", "જૈવ વિવિધતા", "ગ્રીનહાઉસ અસર", "રાષ્ટ્રીય ઉદ્યાનો", "વન સંરક્ષણ", "ઓઝોન સ્તર", "આબોહવા પરિવર્તન"];

function shuffleOptions(options, correctAns) {
    let opts = [...options];
    if (!opts.includes(correctAns)) {
        opts[0] = correctAns;
    }
    return opts.sort(() => Math.random() - 0.5);
}

const environmentData = [];

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
        difficulty = "Level 1: પર્યાવરણ જાગરૂકતા";
        question = `વિશ્વમાં હાલના સમયમાં '${randomTopic}' ને લગતી મુખ્ય સમસ્યા શું છે?`;
        answer = "માનવીય પ્રવૃત્તિઓથી નુકશાન";
        options = ["સૂર્યનો પ્રકાશ ઓછો થવો", "માનવીય પ્રવૃત્તિઓથી નુકશાન", "પૃથ્વીની આંતરિક ગતિ", "માત્ર પ્રાણીઓનો વિકાસ"];
    } else if (isMedium) {
        difficulty = "Level 2: મધ્યમ સમજૂતી";
        question = `'${randomTopic}' ના નિયંત્રણ માટે કરવામાં આવેલી આંતરરાષ્ટ્રીય સંધિઓ કયા સિદ્ધાંત પર આધારિત છે?`;
        answer = "સસ્ટેનેબલ ડેવલપમેન્ટ (ટકાઉ વિકાસ)";
        options = ["આર્થિક એકાધિકાર", "સસ્ટેનેબલ ડેવલપમેન્ટ (ટકાઉ વિકાસ)", "માત્ર ઔદ્યોગિક નીતિ", "સ્પેસ એક્સપ્લોરેશન"];
    } else {
        difficulty = "Level 3: વિશ્લેષણાત્મક (અઘરું)";
        question = `ગ્લોબલ વોર્મિંગ અને '${randomTopic}' ઘટના વચ્ચેનું સમીકરણ વૈશ્વિક ખાદ્ય શૃંખલા (Food Chain) પર કેવી અસર કરે છે? (અભ્યાસ ${i})`;
        answer = "ઇકોલોજીકલ બેલેન્સ ખોરવાવાની સંભાવના";
        options = ["ઉત્પાદન 5 ગણું વધે છે", "ઇકોલોજીકલ બેલેન્સ ખોરવાવાની સંભાવના", "કોઈ નોંધપાત્ર ફેરફાર નહિ", "માઇક્રો ઓર્ગેનિઝમ નાબૂદ થઈ ઋતુ બદલાય નહિ"];
    }

    environmentData.push({
        id: `env_${i}_${Date.now()}`,
        question: question,
        options: shuffleOptions(options, answer),
        answer: answer,
        difficulty: difficulty
    });
}

export default environmentData;

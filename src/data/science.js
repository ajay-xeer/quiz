const topics = ["ભૌતિક વિજ્ઞાન", "રસાયણ વિજ્ઞાન", "જીવ વિજ્ઞાન", "અવકાશ વિજ્ઞાન", "રોગો અને વિટામિન્સ", "પ્રકાશ અને ધ્વનિ", "બ્રહ્માંડ", "વિજ્ઞાનની શાખાઓ"];

function shuffleOptions(options, correctAns) {
    let opts = [...options];
    if (!opts.includes(correctAns)) {
        opts[0] = correctAns;
    }
    return opts.sort(() => Math.random() - 0.5);
}

const scienceData = [];

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
        difficulty = "Level 1: પાયાની જાણકારી";
        question = `${randomTopic} માં કયા એકમ અથવા પદાર્થનો અભ્યાસ મુખ્યત્વે થાય છે?`;
        answer = "તત્વો અને કણો નો સિદ્ધાંત";
        options = ["તત્વો અને કણો નો સિદ્ધાંત", "સાહિત્યિક ઇતિહાસ", "આબોહવાના ઐતિહાસિક સ્તરો", "નદીના મૂળ"];
    } else if (isMedium) {
        difficulty = "Level 2: મધ્યમ સમજૂતી";
        question = `${randomTopic} ના પ્રાયોગિક મૂલ્યોને માપવા માટે SI એકમ પ્રણાલીમાં કોનો ઉપયોગ થઈ શકે?`;
        answer = "ન્યૂટન / મોલ / મીટર આદિ સામાન્ય માપદંડો";
        options = ["ન્યૂટન / મોલ / મીટર આદિ સામાન્ય માપદંડો", "ફક્ત સાપેક્ષ માપ", "પ્રાચીન વજન પદ્ધતિ", "આ વિષયમાં કોઈ દળ નથી"];
    } else {
        difficulty = "Level 3: વિશ્લેષણાત્મક (અઘરું)";
        question = `${randomTopic} ના સિદ્ધાંતોને આધારે: જો કણનું દળ બમણું કરવામાં આવે, તો તેના વેગગતિના આદર્શ સમીકરણ પર શું અસર થાય? (પ્રયોગ ${i})`;
        answer = "પ્રવેગ અને બળ વચ્ચેનો સંબંધ બદલાય";
        options = ["દળ શૂન્ય થઈ જાય", "પ્રવેગ અને બળ વચ્ચેનો સંબંધ બદલાય", "દબાણ 4 ગણું થાય", "સમય સ્થિર થઈ જાય"];
    }

    scienceData.push({
        id: `sci_${i}_${Date.now()}`,
        question: question,
        options: shuffleOptions(options, answer),
        answer: answer,
        difficulty: difficulty
    });
}

export default scienceData;

const topics = ["સમાનાર્થી શબ્દો", "વિરુદ્ધાર્થી શબ્દો", "સંધિ", "સમાસ", "અલંકાર", "છંદ", "રૂઢિપ્રયોગ", "કહેવતો", "જોડણી", "શબ્દસમૂહ માટે એક શબ્દ"];

function shuffleOptions(options, correctAns) {
    let opts = [...options];
    if (!opts.includes(correctAns)) {
        opts[0] = correctAns;
    }
    return opts.sort(() => Math.random() - 0.5);
}

const vyakaranData = [];

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
        difficulty = "Level 1: સામાન્ય વ્યાકરણ";
        question = `ગુજરાતી વ્યાકરણમાં '${randomTopic}' નો મુખ્ય હેતુ શું છે? (પ્રશ્ન ${i})`;
        answer = "ભાષામાં સ્પષ્ટતા અને સુંદરતા લાવવી";
        options = ["અર્થનો અનર્થ કરવો", "ફક્ત કવિતાઓ વાંચવી", "ભાષામાં સ્પષ્ટતા અને સુંદરતા લાવવી", "ગણિતના સૂત્રો સમજવા"];
    } else if (isMedium) {
        difficulty = "Level 2: મધ્યમ સમજૂતી";
        question = `યોગ્ય વિકલ્પ પસંદ કરો: નીચેનામાંથી કયું ઉદાહરણ '${randomTopic}' સાથે સંપૂર્ણ રીતે મેળ ખાય છે?`;
        answer = "આપેલ વિષયના નિયમોનું પાલન કરતું ઉદાહરણ";
        options = ["સામાન્ય વાતચીતનું વાક્ય", "આપેલ વિષયના નિયમોનું પાલન કરતું ઉદાહરણ", "ધ્વનિ વિનાનો અક્ષર", "માત્ર અંગ્રેજી ભાષાનો શબ્દ"];
    } else {
        difficulty = "Level 3: વિશ્લેષણાત્મક (અઘરું)";
        question = `જ્યારે વાક્યમાં '${randomTopic}' અને વિશેષણ બંને એક સાથે પ્રયોજાય ત્યારે પદચ્છેદમાં ક્યો વિકાર જોવા મળે છે? (સૂક્ષ્મ પ્રશ્ન ${i})`;
        answer = "શબ્દના અર્થ અને વયવસ્થામાં પરિવર્તન";
        options = ["કોઈ અસર થતી નથી", "ક્રિયાપદ હંમેશા અદૃશ્ય થાય છે", "શબ્દના અર્થ અને વયવસ્થામાં પરિવર્તન", "વાક્ય બિનજરૂરી લાંબુ બને છે"];
    }

    vyakaranData.push({
        id: `vya_${i}_${Date.now()}`,
        question: question,
        options: shuffleOptions(options, answer),
        answer: answer,
        difficulty: difficulty
    });
}

export default vyakaranData;

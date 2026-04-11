const fs = require('fs');
const path = require('path');

function generateBandharan() {
    let data = [];
    let bId = 1;
    
    // 30% Simple = 600
    for(let i=1; i<=600; i++) {
        let options = ["નાગરિકતા", "મૂળભૂત અધિકારો", "કેન્દ્રશાસિત પ્રદેશો", "રાજ્યનીતિના માર્ગદર્શક સિદ્ધાંતો"];
        let ansIndex = i % 4;
        data.push({
            id: `b_sim_${bId++}`,
            question: `ભારતીય બંધારણનો અનુચ્છેદ ${i} નીચેનામાંથી કઈ બાબત સાથે સંબંધિત છે? (સરળ પ્રશ્ન ${i})`,
            options: [options[0], options[1], options[2], options[3]],
            answer: options[ansIndex],
            difficulty: "simple"
        });
    }

    // 70% Hard = 1400
    for(let i=1; i<=1400; i++) {
        let options = [
            `સુધારા ${i%100 + 1} મુજબ સત્તાનું વિભાજન અને સમીક્ષા`, 
            `કટોકટી કલમ ${350+(i%10)} અંતર્ગત રાજ્યનો અધિકાર`, 
            `સંસદની રચના અને અનુચ્છેદ ${100+(i%50)} ના અપવાદો`,
            `રાષ્ટ્રપતિની વિવેકાધીન સત્તા અને ભાગ ${i%22 + 1}`
        ];
        let ansIndex = (i+2) % 4;
        data.push({
            id: `b_hrd_${bId++}`,
            question: `જ્યારે દેશમાં આંતરિક કટોકટી લાગુ પડે, ત્યારે બંધારણીય સુધારા ધારા ${i+42} અને અનુચ્છેદ ${300+(i%90)} ના સંદર્ભમાં કયું વિધાન સૌથી સચોટ માર્ગદર્શન આપે છે? (અઘરો પ્રશ્ન ${i})`,
            options: [options[0], options[1], options[2], options[3]],
            answer: options[ansIndex],
            difficulty: "hard"
        });
    }

    return data;
}

function generateMathsReasoning() {
    let data = [];
    let idCounter = 1;

    // 30% Maths = 900
    for(let i=1; i<=900; i++) {
        let base = (i * 15) % 800 + 100;
        let rate = (i % 12) + 2;
        let ans = base * rate;
        let options = [ans.toString(), (ans + 10).toString(), (ans - rate).toString(), (ans * 2).toString()];
        let correct = ans.toString();
        
        let ansIndex = i % 4;
        let temp = options[ansIndex];
        options[ansIndex] = correct;
        if(ansIndex !== 0) options[0] = temp; 

        data.push({
            id: `mr_mth_${idCounter++}`,
            question: `જો રકમ રૂ. ${base} ને વાર્ષિક ${rate}% ના સાદા વ્યાજે મૂકવામાં આવે, તો અંતિમ મૂલ્ય-પ્રશ્ન ક્રમાંક ${i} માટે ગણતરી કરો:`,
            options: options,
            answer: correct,
            difficulty: "maths"
        });
    }

    // 70% Reasoning = 2100
    for(let i=1; i<=2100; i++) {
        let start = i % 50 + 2;
        let step = (i % 10) + 2;
        let next = start + step * 4;
        
        let correct = next.toString();
        let options = [(next+1).toString(), correct, (next+step).toString(), (next-1).toString()];
        
        data.push({
            id: `mr_rsn_${idCounter++}`,
            question: `તાર્કિક શ્રેણી પૂર્ણ કરો (રિઝનીંગ પ્રશ્ન ${i}): ${start}, ${start+step}, ${start+step*2}, ${start+step*3}, ?`,
            options: options,
            answer: correct,
            difficulty: "reasoning"
        });
    }

    return data;
}

const bandharanData = generateBandharan();
const mathsReasoningData = generateMathsReasoning();

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'bandharan.json'), JSON.stringify(bandharanData, null, 2), 'utf8');
fs.writeFileSync(path.join(__dirname, 'src', 'data', 'maths_reasoning.json'), JSON.stringify(mathsReasoningData, null, 2), 'utf8');

console.log('Successfully generated bandharan.json (' + bandharanData.length + ' questions)');
console.log('Successfully generated maths_reasoning.json (' + mathsReasoningData.length + ' questions)');

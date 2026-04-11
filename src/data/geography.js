const topics = ["નદીઓ અને સરોવરો", "પર્વતમાળાઓ", "વરસાદ અને આબોહવા", "ખેતી અને પાક", "જંગલો અને અભયારણ્યો", "અખાત અને બંદરો", "ગુજરાતની ભૂગોળ", "ખનિજ સંપત્તિ", "માટીના પ્રકારો"];

function shuffleOptions(options, correctAns) {
    let opts = [...options];
    if (!opts.includes(correctAns)) {
        opts[0] = correctAns;
    }
    return opts.sort(() => Math.random() - 0.5);
}

const geographyData = [];

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
        difficulty = "Level 1: સામાન્ય ભૂગોળ";
        let type = i % 3;
        if (type === 0) {
            question = `${randomTopic} નો સૌથી મોટો હિસ્સો ભારતના કયા રાજ્યમાં જોવા મળે છે?`;
            answer = "મધ્યપ્રદેશ/ગુજરાત વિસ્તાર";
            options = ["મધ્યપ્રદેશ/ગુજરાત વિસ્તાર", "જમ્મુ કાશ્મીર", "તામિલનાડુ", "સિક્કિમ"];
        } else if (type === 1) {
            question = `ગુજરાતમાં '${randomTopic}' ના ક્યા વિસ્તારને ભૌગોલિક સુરક્ષા આપવામાં આવી છે?`;
            answer = "ગિરનાર અથવા સૌરાષ્ટ્રનો પટ્ટો";
            options = ["ગિરનાર અથવા સૌરાષ્ટ્રનો પટ્ટો", "કચ્છનું રણ", "ખંભાતનો અખાત", "ડાંગ જિલ્લાના જંગલો"];
        } else {
            question = `ભારતની નકશા મુજબ '${randomTopic}' ની ભૌગોલિક રચના કેવી છે?`;
            answer = "વિવિધતા ધરાવતી જટિલ રચના";
            options = ["એકસમાન સપાટ મેદાન", "વિવિધતા ધરાવતી જટિલ રચના", "માત્ર બરફ આચ્છાદિત", "બેરન દ્વીપ સમાન"];
        }
    } else if (isMedium) {
        difficulty = "Level 2: મધ્યમ સમજૂતી";
        question = `${randomTopic} ની ઉત્પત્તિ અને તેના પર્યાવરાણીય પ્રભાવ માટે નીચેના પૈકી કયું પરિબળ જવાબદાર છે?`;
        answer = "મોસમી આબોહવીય ફેરફારો";
        options = ["માનવ ઔદ્યોગિકીકરણ જ", "મોસમી આબોહવીય ફેરફારો", "માત્ર ભૌગોલિક સ્થાનિકીકરણ", "જ્વાળામુખી વિસ્ફોટ વિસ્તાર"];
    } else {
        difficulty = "Level 3: વિશ્લેષણાત્મક (અઘરું)";
        question = `વિધાન 1: ${randomTopic} ના કારણે પડોશી રાજ્યોના જળસ્તરમાં ટકરાવ જોવા મળે છે. વિધાન 2: આ ભૌગોલિક વિતરણથી બાયોડાયવર્સિટી વધુ સંગઠિત બનેલ છે.`;
        answer = "બંને સાચા છે";
        options = ["ફક્ત 1 સાચું", "ફક્ત 2 સાચું", "બંને સાચા છે", "બંને ખોટા છે"];
    }

    geographyData.push({
        id: `geo_${i}_${Date.now()}`,
        question: question,
        options: shuffleOptions(options, answer),
        answer: answer,
        difficulty: difficulty
    });
}

export default geographyData;

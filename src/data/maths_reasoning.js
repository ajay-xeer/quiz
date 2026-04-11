function shuffleOptions(options, correctAns) {
    let opts = [...options];
    if (!opts.includes(correctAns)) {
        opts[0] = correctAns;
    }
    return opts.sort(() => Math.random() - 0.5);
}

const mathsReasoningData = [];

// 1200 Maths Questions
for (let i = 1; i <= 1200; i++) {
    const isEasy = i <= 400; // 33%
    const isMedium = i > 400 && i <= 800; // 33%
    const isHard = i > 800; // 34%

    let question = "";
    let options = [];
    let answer = "";
    let difficulty = "";

    if (isEasy) {
        difficulty = "Maths - પાયાનું ગણિત";
        let type = i % 3;
        if (type === 0) {
            let p = (i * 10) % 500 + 100;
            let r = (i % 10) + 2;
            let t = (i % 5) + 1;
            let si = (p * r * t) / 100;
            question = `${p} રૂપિયાનું ${r}% વાર્ષિક સાદા વ્યાજે ${t} વર્ષનું વ્યાજ શોધો.`;
            answer = si.toString();
            options = [answer, (si + 10).toString(), (si - 5).toString(), (si * 2).toString()];
        } else if (type === 1) {
            let cp = (i * 15) % 1000 + 200;
            let profit = (i % 20) + 5;
            let sp = cp + (cp * profit) / 100;
            question = `એક વસ્તુની મૂળ કિંમત ${cp} રૂ. છે. તેને ${profit}% નફે વેચતા, વેચાણ કિંમત કેટલી થશે?`;
            answer = sp.toString();
            options = [answer, (sp + 15).toString(), (sp - 20).toString(), (cp + profit).toString()];
        } else {
            let num = (i % 50) + 10;
            question = `${num} ના ${num}% કેટલા થાય?`;
            answer = ((num * num)/100).toString();
            options = [answer, (num*2).toString(), (num+10).toString(), (num/2).toString()];
        }
    } else if (isMedium) {
        difficulty = "Maths - મધ્યમ ગાણિતિક કોયડા";
        let type = i % 2;
        if(type === 0) {
            let m1 = (i % 15) + 5;
            let d1 = (i % 20) + 10;
            let m2 = m1 + 5;
            let d2 = (m1 * d1) / m2;
            question = `જો ${m1} માણસો એક કામ ${d1} દિવસમાં પૂરું કરે, તો ${m2} માણસો તે જ કામ કેટલા દિવસમાં પૂરું કરશે? (m1d1=m2d2 આધારે સમજૂતી)`;
            answer = d2.toFixed(1).toString() + " દિવસ";
            options = [answer, (d2 + 2).toFixed(1).toString() + " દિવસ", (d2 - 1).toFixed(1).toString() + " દિવસ", (d1).toString() + " દિવસ"];
        } else {
            let speed = (i % 40) + 40; // km/h
            let len = (i % 300) + 100; // meters
            let time = (len / (speed * 5 / 18)).toFixed(1);
            question = `${len} મીટર લાંબી ટ્રેન, ${speed} કિમી/કલાક ની ઝડપે એક થાંભલાને કેટલી સેકન્ડમાં પસાર કરશે?`;
            answer = time + " સેકન્ડ";
            options = [answer, (parseFloat(time) + 5).toFixed(1) + " સેકન્ડ", (parseFloat(time) - 2).toFixed(1) + " સેકન્ડ", (parseFloat(time) * 2).toFixed(1) + " સેકન્ડ"];
        }
    } else {
        difficulty = "Maths - અઘરું (Advanced)";
        let p = (i * 20) % 2000 + 1000;
        let r = (i % 8) + 2;
        let t = 2; // Fixed to 2 for simplicity of compound logic difference
        let ci = p * Math.pow((1 + r/100), t) - p;
        let si = (p * r * t) / 100;
        let diff = ci - si;
        question = `${p} રૂપિયા પર ${r}% લખે ${t} વર્ષ માટે ચક્રવૃદ્ધિ વ્યાજ અને સાદા વ્યાજનો તફાવત શું હોઈ શકે? (ગણતરી આધારિત પ્રશ્ન)`;
        answer = diff.toFixed(2).toString();
        options = [answer, (diff + 10).toFixed(2).toString(), (diff * 2).toFixed(2).toString(), (ci/2).toFixed(2).toString()];
    }

    mathsReasoningData.push({
        id: `m_${i}_${Date.now()}`,
        question: question,
        options: shuffleOptions(options, answer),
        answer: answer,
        difficulty: difficulty
    });
}

// 1800 Reasoning Questions
for (let i = 1; i <= 1800; i++) {
    const isEasy = i <= 600; // 33%
    const isMedium = i > 600 && i <= 1200; // 33%
    const isHard = i > 1200; // 34%

    let question = "";
    let options = [];
    let answer = "";
    let difficulty = "";

    if (isEasy) {
        difficulty = "Reasoning - પાયાની તાર્કિક ક્ષમતા";
        let type = i % 3;
        if(type === 0) {
            let start = (i % 20) + 2;
            let gap = (i % 5) + 2;
            question = `શ્રેણી પૂર્ણ કરો: ${start}, ${start+gap}, ${start+gap*2}, ${start+gap*3}, ?`;
            answer = (start+gap*4).toString();
            options = [answer, (start+gap*5).toString(), (start+gap*3 - 1).toString(), (start+gap*4 + 2).toString()];
        } else if(type === 1) {
            let num = (i % 10) + 2;
            question = `જો A=1, B=2, C=3 હોય તો 'CAT' નો સરવાળો કેટલો થાય? તેમજ તેમાં ${num} ઉમેરતા નવો અંક શું મળે? (અજોડ પ્રશ્ન ${i})`;
            answer = (24 + num).toString();
            options = [answer, (24 + num + 2).toString(), (24 + num - 5).toString(), "24"];
        } else {
            let dist = (i % 15) + 5;
            question = `એક વ્યક્તિ પૂર્વ તરફ ${dist} કિમી જાય છે, પછી ડાબી બાજુ વળીને ચાલે છે. હવે તેનું મુખ કઈ દિશામાં હશે?`;
            answer = "ઉત્તર";
            options = ["ઉત્તર", "દક્ષિણ", "પૂર્વ", "પશ્ચિમ"];
        }
    } else if (isMedium) {
        difficulty = "Reasoning - મધ્યમ તર્કશક્તિ";
        let type = i % 2;
        if(type === 0) {
            let days = (i % 50) + 10;
            let offset = days % 7;
            const week = ["સોમવાર", "મંગળવાર", "બુધવાર", "ગુરુવાર", "શુક્રવાર", "શનિવાર", "રવિવાર"];
            let startIdx = i % 7;
            let endIdx = (startIdx + offset) % 7;
            question = `જો આજે ${week[startIdx]} હોય, તો ${days} દિવસ પછી કયો વાર હશે?`;
            answer = week[endIdx];
            options = [answer, week[(endIdx+1)%7], week[(endIdx+2)%7], week[(endIdx+6)%7]];
        } else {
            let start = (i % 10) + 2;
            question = `લોજીકલ શ્રેણી શોધો: ${start}, ${start*2}, ${start*4}, ${start*8}, ?`;
            answer = (start*16).toString();
            options = [answer, (start*12).toString(), (start*20).toString(), (start*18).toString()];
        }
    } else {
        difficulty = "Reasoning - એનાલિટીકલ (અઘરું)";
        let type = i % 2;
        if(type === 0) {
            const names = ["A", "B", "C", "D", "E", "F"];
            let p1 = names[i % 6];
            let p2 = names[(i+1) % 6];
            let p3 = names[(i+2) % 6];
            question = `બેઠક વ્યવસ્થા: ${p1}, ${p2} ની બરાબર ડાબે અને ${p3} ની જમણે છે. જો ${p2} છેડે ન હોય, તો શ્રેણીમાં મધ્યમાં કોણ હોવાની સંભાવના વધુ છે? (કોયડો ${i})`;
            answer = p1;
            options = [p1, p2, p3, "નક્કી કરી શકાય નહિ"];
        } else {
            question = `વિધાન 1: બધા સફરજન કેળા છે. વિધાન 2: કોઈ કેળું નારંગી નથી. તારણ કાઢો કે કયું સાચું છે? (સિલોજીસમ પ્રશ્ન ${i})`;
            answer = "કોઈ સફરજન નારંગી નથી";
            options = ["કોઈ સફરજન નારંગી નથી", "બધા નારંગી સફરજન છે", "કેટલાક સફરજન નારંગી છે", "ઉપરનામાંથી કોઈ નહિ"];
        }
    }

    mathsReasoningData.push({
        id: `r_${i}_${Date.now()}`,
        question: question,
        options: shuffleOptions(options, answer),
        answer: answer,
        difficulty: difficulty
    });
}

export default mathsReasoningData;

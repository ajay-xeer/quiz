import { GoogleGenerativeAI } from '@google/generative-ai';

const getPrompt = (subject, qCount, previousQuestions) => {
  const baseInstructions = `
તમે એક પ્રખ્યાત સ્પર્ધાત્મક પરીક્ષાના નિષ્ણાત છો. 
તમારે ગુજરાત પોલીસ કોન્સ્ટેબલ અને PSI પરીક્ષા માટે ${qCount} મલ્ટીપલ ચોઇસ પ્રશ્નો (MCQs) તૈયાર કરવાના છે.
પ્રશ્ન અને તમામ 4 વિકલ્પો શુદ્ધ 'ગુજરાતી' ભાષામાં હોવા જોઈએ (જો અંગ્રેજી વ્યાકરણ હોય તો જ અંગ્રેજીની છૂટ). પ્રશ્નો ક્યારેય પણ સામાન્ય (easy) ન હોવા જોઈએ, પરંતુ ખરેખર પરીક્ષામાં પૂછાય એવા Standard હોવા જોઈએ.

અત્યંત કડક નિયમ (Strict Rule): નીચે આપેલા પ્રશ્નો અથવા તેના જેવા જ કોઈ પ્રશ્નો અગાઉ પૂછાઈ ચૂક્યા છે. એટલે ભૂલથી પણ આ નીચેના પ્રશ્નો ફરીથી ના લખવા:
${previousQuestions.length > 0 ? previousQuestions.slice(-30).join(' | ') : 'હજી કોઈ પ્રશ્ન પુછાયો નથી.'}

ઉપર આપેલા પ્રશ્નો સિવાયના સાવ નવા જ ${qCount} પ્રશ્નો બનાવો. 

તમારે માત્ર નીચે આપેલા JSON ફોર્મેટમાં જ આ જવાબ આપવાનો છે, અન્ય કોઈપણ લખાણ લખવું નહિ. 

JSON ફોર્મેટ ઉદાહરણ:
[
  {
    "question": "પ્રશ્ન અહીં લખો...",
    "options": ["વિકલ્પ 1", "વિકલ્પ 2", "વિકલ્પ 3", "વિકલ્પ 4"],
    "answer": 0 
  }
]
`;

  let subjectDetails = "";

  if (subject === 'maths_reasoning') {
    subjectDetails = "વિષય: ગણિત (Maths) અને લોજિકલ રીઝનિંગ (Reasoning). દાખલાઓ અને તાર્કિક પ્રશ્નો બનાવો. ગણિત અને બુદ્ધિ ચાતુર્યના અઘરા દાખલાઓ પૂછવા.";
  } else if (subject === 'bandharan') {
    subjectDetails = "વિષય: બંધારણ. તેમાં Indian Constitution and Public Administration, evolution and development of the Constitution, its sources, Preamble, Fundamental Rights, Fundamental Duties, Directive Principles, constitutional amendments and basic structure, structure and functions of Union and State governments (Parliament and State Legislature, President and Governor, Executive and Judiciary), federal system and centre-state relations, constitutional bodies, Panchayati Raj and local self-government, evolution of Indian administration, public services, administration at centre, state and district levels, policies and programs વગેરેને આવરી લેતા પ્રશ્નો પૂછવા.";
  } else if (subject === 'history') {
    subjectDetails = "વિષય: ઇતિહાસ અને સાંસ્કૃતિક વારસો. તેમાં ancient, medieval and modern Indian history; Indus Valley Civilization, Vedic Age, Jainism and Buddhism, Maurya and Gupta Empire, Delhi Sultanate and Mughal Empire, Maratha Empire, arrival of Europeans, British rule, Indian freedom struggle, social and religious reform movements, Gujarat history and its cultural development. Cultural Heritage includes art and architecture, literature, music and dance, festivals and traditions, food and lifestyle, folk culture, tribal culture, cultural institutions, and important heritage and tourism places. વગેરેને આવરી લેતા પ્રશ્નો પૂછવા.";
  } else if (subject === 'geography') {
    subjectDetails = "વિષય: ભૂગોળ. તેમાં physical geography, social geography and economic geography; earth structure, climate, natural resources, Indian geography, Gujarat geography, agriculture, industries, population, transportation, and global geography. વગેરેને આવરી લેતા પ્રશ્નો પૂછવા.";
  } else if (subject === 'science') {
    subjectDetails = "વિષય: વિજ્ઞાન અને ટેકનોલોજી. તેમાં basic science such as physics, chemistry and biology; information and communication technology, cyber security, space technology, ISRO missions, defense technology, and recent innovations. વગેરેને આવરી લેતા પ્રશ્નો પૂછવા.";
  } else if (subject === 'vyakaran') {
    subjectDetails = "વિષય: ગુજરાતી અને અંગ્રેજી ભાષા કુશળતા. તેમાં grammar (વ્યાકરણ), vocabulary (શબ્દભંડોળ), comprehension, translation, sentence formation વગેરેને આવરી લેતા પ્રશ્નો પૂછવા.";
  } else if (subject === 'environment') {
    subjectDetails = "વિષય: પર્યાવરણ. તેમાં environmental issues, biodiversity, climate change, pollution (air, water and noise), environmental laws, conservation, national parks and wildlife sanctuaries, and sustainable development. વગેરેને આવરી લેતા પ્રશ્નો પૂછવા.";
  } else if (subject === 'economics') {
    subjectDetails = "વિષય: અર્થશાસ્ત્ર. તેમાં Indian economy and Gujarat economy; economic planning, budgeting and taxation, agriculture sector, industry and services, banking and finance, GDP and inflation, public finance, and government policies. વગેરેને આવરી લેતા પ્રશ્નો પૂછવા.";
  }

  return baseInstructions + "\n\n" + subjectDetails + `\n\nખાસ સૂચના: ${qCount} સંપૂર્ણ 100% નવા જ પ્રશ્નો બનાવો. અગાઉના પ્રશ્નો રિપીટ ન થવા જોઈએ.`;
};

export const generateQuestionsByAI = async (apiKey, subject, qCount, previousQuestions = []) => {
  if (!apiKey) throw new Error("API Key આપવી જરૂરી છે.");
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = getPrompt(subject, qCount, previousQuestions);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    text = text.replace(/```json/gi, '').replace(/```/gi, '').trim();
    
    const questions = JSON.parse(text);
    return questions.map((q) => ({
      ...q,
      id: Math.floor(Math.random() * 10000000) + Date.now(),
      category: subject
    }));
  } catch (error) {
    console.error("AI Generation failed: ", error);
    throw new Error('પ્રશ્નો બનાવવામાં ભૂલ આવી, કૃપા કરીને તમારું ઇન્ટરનેટ અને API Key તપાસો.');
  }
};

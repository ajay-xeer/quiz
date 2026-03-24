const fs = require('fs');
const filepath = 'src/data/questions.json';
const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));

const newQuestions = [
  {
    "category": "environment",
    "subject": "Environment",
    "question": "વિશ્વ પર્યાવરણ દિવસ ક્યારે ઉજવવામાં આવે છે?",
    "options": ["5 જૂન", "21 માર્ચ", "22 એપ્રિલ", "1 ડિસેમ્બર"],
    "answer": 0,
    "id": 701
  },
  {
    "category": "environment",
    "subject": "Environment",
    "question": "ભારતનો પ્રથમ રાષ્ટ્રીય ઉદ્યાન કયો છે?",
    "options": ["ગીર નેશનલ પાર્ક", "જીમ કોર્બેટ નેશનલ પાર્ક", "કાઝીરંગા નેશનલ પાર્ક", "સુંદરવન નેશનલ પાર્ક"],
    "answer": 1,
    "id": 702
  },
  {
    "category": "environment",
    "subject": "Environment",
    "question": "'પ્રોજેક્ટ ટાઈગર' કયા વર્ષમાં શરૂ કરવામાં આવ્યો હતો?",
    "options": ["1970", "1971", "1973", "1975"],
    "answer": 2,
    "id": 703
  },
  {
    "category": "economics",
    "subject": "Economics",
    "question": "ભારતીય રિઝર્વ બેંક (RBI) ની સ્થાપના ક્યારે થઈ હતી?",
    "options": ["1935", "1947", "1950", "1949"],
    "answer": 0,
    "id": 801
  },
  {
    "category": "economics",
    "subject": "Economics",
    "question": "નીચેનામાંથી કયો કર (Tax) પરોક્ષ કર (Indirect Tax) છે?",
    "options": ["આવકવેરો (Income Tax)", "કોર્પોરેટ ટેક્સ", "જીએસટી (GST)", "સંપત્તિ કર (Wealth Tax)"],
    "answer": 2,
    "id": 802
  },
  {
    "category": "economics",
    "subject": "Economics",
    "question": "જીડીપી (GDP) નું પૂર્ણ રૂપ શું છે?",
    "options": ["Gross Domestic Product", "Gross Domestic Plan", "General Domestic Product", "Global Domestic Product"],
    "answer": 0,
    "id": 803
  },
  {
    "category": "bandharan",
    "subject": "Bandharan",
    "question": "ભારતીય બંધારણમાં મૂળભૂત અધિકારો (Fundamental Rights) કયા દેશના બંધારણમાંથી લેવામાં આવ્યા છે?",
    "options": ["બ્રિટન", "અમેરિકા (USA)", "રશિયા (USSR)", "આયર્લેન્ડ"],
    "answer": 1,
    "id": 1051
  },
  {
    "category": "bandharan",
    "subject": "Bandharan",
    "question": "ભારતના રાષ્ટ્રપતિ થવા માટે ન્યૂનતમ કેટલી ઉંમર હોવી જોઈએ?",
    "options": ["25 વર્ષ", "30 વર્ષ", "35 વર્ષ", "40 વર્ષ"],
    "answer": 2,
    "id": 1052
  },
  {
    "category": "bandharan",
    "subject": "Bandharan",
    "question": "લોકસભાના સભ્યોની મહત્તમ સંખ્યા કેટલી હોઈ શકે છે?",
    "options": ["545", "550", "552", "560"],
    "answer": 2,
    "id": 1053
  },
  {
    "category": "bandharan",
    "subject": "Bandharan",
    "question": "ભારતના સંવિધાનમાં કયા અનુચ્છેદ મુજબ 'અસ્પૃશ્યતા નાબૂદી' કરવામાં આવી છે?",
    "options": ["અનુચ્છેદ 14", "અનુચ્છેદ 17", "અનુચ્છેદ 19", "અનુચ્છેદ 21"],
    "answer": 1,
    "id": 1054
  }
];

const finalData = [...data, ...newQuestions];
fs.writeFileSync(filepath, JSON.stringify(finalData, null, 2));

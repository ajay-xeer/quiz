const fs = require('fs');

const path = require('path');

function addToFile(subject, newQs) {
  const p = path.join(__dirname, 'src', 'data', subject + '.json');
  let existing = [];
  try {
    existing = JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch(e) {}
  
  const merged = [...existing, ...newQs];
  fs.writeFileSync(p, JSON.stringify(merged, null, 2));
}

const historyQs = [
  {"id": 2001, "category": "history", "subject": "History", "question": "બારડોલી સત્યાગ્રહની આગેવાની કોણે લીધી હતી?", "options": ["મહાત્મા ગાંધી", "સરદાર વલ્લભભાઈ પટેલ", "મોરારજી દેસાઈ", "રવિશંકર મહારાજ"], "answer": 1},
  {"id": 2002, "category": "history", "subject": "History", "question": "દાંડી કૂચ કયા વર્ષે શરૂ કરવામાં આવી હતી?", "options": ["1920", "1930", "1942", "1915"], "answer": 1},
  {"id": 2003, "category": "history", "subject": "History", "question": "સિંધુખીણ સભ્યતાનું સ્થળ 'ધોળાવીરા' કયા જિલ્લામાં આવેલું છે?", "options": ["અમદાવાદ", "રાજકોટ", "કચ્છ", "ભાવનગર"], "answer": 2},
  {"id": 2004, "category": "history", "subject": "History", "question": "ગુજરાતના સ્થાપના દિને કયા નેતાએ પ્રવચન આપ્યું હતું?", "options": ["જીવરાજ મહેતા", "રવિશંકર મહારાજ", "ઇન્દુલાલ યાજ્ઞિક", "મોરારજી દેસાઈ"], "answer": 1},
  {"id": 2005, "category": "history", "subject": "History", "question": "ચાંપાનેરને કયા વર્ષે UNESCO દ્વારા વર્લ્ડ હેરિટેજ સાઈટ જાહેર કરાયું?", "options": ["2004", "2014", "1994", "2000"], "answer": 0},
  {"id": 2006, "category": "history", "subject": "History", "question": "છત્રપતિ શિવાજી મહારાજનો રાજ્યાભિષેક કયા કિલ્લામાં થયો હતો?", "options": ["પ્રતાપગઢ", "રાયગઢ", "શિવનેરી", "તોરણ"], "answer": 1},
  {"id": 2007, "category": "history", "subject": "History", "question": "'આર્ય સમાજ' ની સ્થાપના કોણે કરી હતી?", "options": ["રાજા રામમોહન રાય", "સ્વામી વિવેકાનંદ", "સ્વામી દયાનંદ સરસ્વતી", "આત્મારામ પાંડુરંગ"], "answer": 2},
  {"id": 2008, "category": "history", "subject": "History", "question": "ભગવાન બુદ્ધે પોતાનો પ્રથમ ઉપદેશ ક્યાં આપ્યો હતો?", "options": ["લુમ્બિની", "બોધગયા", "સારનાથ", "કુશીનગર"], "answer": 2},
  {"id": 2009, "category": "history", "subject": "History", "question": "ગુજરાતમાં 'તરણેતરનો મેળો' કયા જિલ્લામાં ભરાય છે?", "options": ["સુરેન્દ્રનગર", "રાજકોટ", "જૂનાગઢ", "પોરબંદર"], "answer": 0},
  {"id": 2010, "category": "history", "subject": "History", "question": "સૌરાષ્ટ્રના કયા નૃત્યને આંતરરાષ્ટ્રીય ખ્યાતિ મળી છે?", "options": ["ગરબા", "ટિપ્પણી", "રાસડો", "ભવાઈ"], "answer": 1}
];

const geographyQs = [
  {"id": 3001, "category": "geography", "subject": "Geography", "question": "નર્મદા નદીનું ઉદ્ગમ સ્થાન ક્યાં છે?", "options": ["અમરકંટક", "મહાબળેશ્વર", "નાસિક", "ત્ર્યંબકેશ્વર"], "answer": 0},
  {"id": 3002, "category": "geography", "subject": "Geography", "question": "ગુજરાતમાં સૌથી લાંબો દરિયાકિનારો કયા જિલ્લાને મળેલો છે?", "options": ["જામનગર", "કચ્છ", "ભાવનગર", "પોરબંદર"], "answer": 1},
  {"id": 3003, "category": "geography", "subject": "Geography", "question": "ભારતનો સૌથી ઊંચો પર્વત કયો છે?", "options": ["કાંચનજંઘા", "નંદાદેવી", "કેદારનાથ", "માઉન્ટ એવરેસ્ટ"], "answer": 0},
  {"id": 3004, "category": "geography", "subject": "Geography", "question": "સુએઝ નહેર કયા બે સાગરોને જોડે છે?", "options": ["રાતો સમુદ્ર અને અરબી સમુદ્ર", "રાતો સમુદ્ર અને ભૂમધ્ય સમુદ્ર", "કાળો સમુદ્ર અને ભૂમધ્ય સમુદ્ર", "અરબી સમુદ્ર અને બંગાળની ખાડી"], "answer": 1},
  {"id": 3005, "category": "geography", "subject": "Geography", "question": "ગુજરાતનું એકમાત્ર ગિરિમથક સાપુતારા કયા જિલ્લામાં આવેલું છે?", "options": ["ડાંગ", "વલસાડ", "નવસારી", "તાપી"], "answer": 0},
  {"id": 3006, "category": "geography", "subject": "Geography", "question": "કપાસના પાક માટે કયા પ્રકારની જમીન સૌથી વધુ અનુકૂળ છે?", "options": ["કાંપની જમીન", "કાળી જમીન", "લાલ જમીન", "પડખાઉ જમીન"], "answer": 1},
  {"id": 3007, "category": "geography", "subject": "Geography", "question": "ભારતનો કયો રાજ્ય સૌથી વધુ વનક્ષેત્ર ધરાવે છે?", "options": ["મધ્યપ્રદેશ", "અરુણાચલ પ્રદેશ", "છત્તીસગઢ", "મહારાષ્ટ્ર"], "answer": 0},
  {"id": 3008, "category": "geography", "subject": "Geography", "question": "ભારતીય રેલ્વેનું મુખ્યાલય ક્યાં આવેલું છે?", "options": ["મુંબઈ", "નવી દિલ્હી", "કોલકાતા", "ચેન્નઈ"], "answer": 1},
  {"id": 3009, "category": "geography", "subject": "Geography", "question": "ભુજમાં કયા વર્ષે ભયાનક ભૂકંપ આવ્યો હતો?", "options": ["1999", "2000", "2001", "2002"], "answer": 2},
  {"id": 3010, "category": "geography", "subject": "Geography", "question": "વિશ્વનો સૌથી મોટો નદી-દ્વીપ (Island) 'માજુલી' કઈ નદી પર છે?", "options": ["ગંગા", "બ્રહ્મપુત્રા", "સિંધુ", "ગોદાવરી"], "answer": 1}
];

const scienceQs = [
  {"id": 4004, "category": "science", "subject": "Science & Tech", "question": "વિટામિન સી ની ઉણપથી કયો રોગ થાય છે?", "options": ["રતાંધળાપણું", "સ્કર્વી", "સુક્તાન", "ગોઈટર"], "answer": 1},
  {"id": 4005, "category": "science", "subject": "Science & Tech", "question": "મનુષ્યના હૃદયમાં કેટલા ખાના (ખંડો) હોય છે?", "options": ["2", "3", "4", "5"], "answer": 2},
  {"id": 4006, "category": "science", "subject": "Science & Tech", "question": "લીંબુમાં કયો ઍસિડ હોય છે?", "options": ["સાઇટ્રિક ઍસિડ", "લેક્ટિક ઍસિડ", "ટાર્ટરિક ઍસિડ", "ઓક્સેલિક ઍસિડ"], "answer": 0},
  {"id": 4007, "category": "science", "subject": "Science & Tech", "question": "ISRO નું હેડક્વાર્ટર ક્યાં આવેલું છે?", "options": ["હૈદરાબાદ", "તિરુવનંતપુરમ", "બેંગલુરુ", "શ્રીહરિકોટા"], "answer": 2},
  {"id": 4008, "category": "science", "subject": "Science & Tech", "question": "લોખંડને કાટ લાગવો એ કેવી પ્રક્રિયા છે?", "options": ["ભૌતિક", "રાસાયણિક", "જૈવિક", "આપેલ તમામ"], "answer": 1},
  {"id": 4009, "category": "science", "subject": "Science & Tech", "question": "થર્મોમીટરમાં કયું પ્રવાહી વપરાય છે?", "options": ["પાણી", "પારો (Mercury)", "આલ્કોહોલ", "તેલ"], "answer": 1},
  {"id": 4010, "category": "science", "subject": "Science & Tech", "question": "આગ ઓલવવા માટે કયા વાયુનો ઉપયોગ થાય છે?", "options": ["ઓક્સિજન", "નાઇટ્રોજન", "કાર્બન ડાયોક્સાઇડ", "હાઇડ્રોજન"], "answer": 2},
  {"id": 4011, "category": "science", "subject": "Science & Tech", "question": "કોમ્પ્યુટરની સ્મૃતિ (Memory) સામાન્ય રીતે શેમાં મપાય છે?", "options": ["હર્ટ્ઝ (Hz)", "બાઈટ્સ (Bytes)", "વોલ્ટ (Volt)", "એમ્પીયર (Ampere)"], "answer": 1},
  {"id": 4012, "category": "science", "subject": "Science & Tech", "question": "'આદિત્ય L1' મિશન શાના અભ્યાસ માટે છે?", "options": ["ચંદ્ર", "મંગળ", "સૂર્ય", "ગુરુ"], "answer": 2},
  {"id": 4013, "category": "science", "subject": "Science & Tech", "question": "શરીરમાં લોહીના શુદ્ધિકરણનું કાર્ય કયું અંગ કરે છે?", "options": ["હૃદય", "કિડની (મૂત્રપિંડ)", "ફેફસાં", "સ્વાદુપિંડ"], "answer": 1}
];

const vyakaranQs = [
  {"id": 6005, "category": "vyakaran", "subject": "Grammar", "question": "વિરુદ્ધાર્થી શબ્દ આપો: 'રંક'", "options": ["ગરીબ", "રાજા (રાવ)", "પૈસાદાર", "દરિદ્ર"], "answer": 1},
  {"id": 6006, "category": "vyakaran", "subject": "Grammar", "question": "સમાનાર્થી શબ્દ પસંદ કરો: 'નયન'", "options": ["હાથ", "આંખ", "કાન", "નાક"], "answer": 1},
  {"id": 6007, "category": "vyakaran", "subject": "Grammar", "question": "કહેવતનો અર્થ આપો: 'નાચવું ન હોય તો આંગણું વાંકું'", "options": ["કામ ન કરવું હોય તો બહાના કાઢવા", "નાચતા ન આવડવું", "આંગણું ખરાબ હોવું", "બીજાને કામ ન કરવા દેવું"], "answer": 0},
  {"id": 6008, "category": "vyakaran", "subject": "Grammar", "question": "સંધિ છોડો: 'હિમાલય'", "options": ["હિમ + લય", "હિમ + આલય", "હીમ + આલય", "હિમા + લય"], "answer": 1},
  {"id": 6009, "category": "vyakaran", "subject": "Grammar", "question": "નીચેનામાંથી કયું દ્વંદ્વ સમાસનું ઉદાહરણ છે?", "options": ["રાત-દિવસ", "મહાદેવ", "દશાનન", "ત્રિભુવન"], "answer": 0},
  {"id": 6010, "category": "vyakaran", "subject": "Grammar", "question": "Choose the correct article: She is ___ honest girl.", "options": ["a", "an", "the", "no article"], "answer": 1},
  {"id": 6011, "category": "vyakaran", "subject": "Grammar", "question": "Select the plural of 'Child'", "options": ["Childs", "Childrens", "Children", "Childes"], "answer": 2},
  {"id": 6012, "category": "vyakaran", "subject": "Grammar", "question": "Find the synonym of 'Happy'", "options": ["Sad", "Joyful", "Angry", "Tired"], "answer": 1},
  {"id": 6013, "category": "vyakaran", "subject": "Grammar", "question": "'અડકો દડકો' કેવા પ્રકારની રચના છે?", "options": ["કાવ્ય", "નવલકથા", "લોકગીત/લોકરમત", "નાટક"], "answer": 2},
  {"id": 6014, "category": "vyakaran", "subject": "Grammar", "question": "Which tense is 'I was playing cricket'?", "options": ["Simple Past", "Past Continuous", "Future", "Present Perfect"], "answer": 1}
];

const environmentQs = [
  {"id": 7004, "category": "environment", "subject": "Environment", "question": "ઓઝોન સ્તર વાતાવરણના કયા આવરણમાં આવેલું છે?", "options": ["ટ્રોપોસ્ફીયર", "સ્ટ્રેટોસ્ફીયર", "મેસોસ્ફીયર", "આયનોસ્ફીયર"], "answer": 1},
  {"id": 7005, "category": "environment", "subject": "Environment", "question": "વાતાવરણમાં સૌથી વધુ પ્રમાણ કયા વાયુનું છે?", "options": ["ઓક્સિજન", "નાઇટ્રોજન", "કાર્બન ડાયોક્સાઇડ", "આર્ગોન"], "answer": 1},
  {"id": 7006, "category": "environment", "subject": "Environment", "question": "ગુજરાતનું રાજ્ય પ્રાણી કયું છે?", "options": ["સિંહ", "વાઘ", "દીપડો", "હાથી"], "answer": 0},
  {"id": 7007, "category": "environment", "subject": "Environment", "question": "'ચિપકો આંદોલન' કોની સાથે સંકળાયેલું છે?", "options": ["નદી બચાવો", "જંગલો/વૃક્ષો બચાવો", "પ્રાણીઓ બચાવો", "હવા બચાવો"], "answer": 1},
  {"id": 7008, "category": "environment", "subject": "Environment", "question": "કયો વાયુ ગ્રીનહાઉસ અસર માટે સૌથી વધુ જવાબદાર છે?", "options": ["N2", "O2", "CO2", "SO2"], "answer": 2},
  {"id": 7009, "category": "environment", "subject": "Environment", "question": "ભારતનો ઍનિમલ વેલ્ફેર બોર્ડ (AWBI) ક્યાં આવેલ છે?", "options": ["ચેન્નઈ (ફરીદાબાદ શિફ્ટ થયેલ કોલકટા) - હાલ ફરીદાબાદ", "નવી દિલ્હી", "મુંબઈ", "બેંગલુરુ"], "answer": 0},
  {"id": 7010, "category": "environment", "subject": "Environment", "question": "ગુજરાતમાં કાળિયાર (Blackbuck) નેશનલ પાર્ક ક્યાં છે?", "options": ["વેળાવદર", "ગીર", "વાંસદા", "જામનગર"], "answer": 0},
  {"id": 7011, "category": "environment", "subject": "Environment", "question": "'જળ પ્રદૂષણ નિવારણ અને નિયંત્રણ અધિનિયમ' કયા વર્ષે પસાર થયો?", "options": ["1974", "1981", "1986", "1972"], "answer": 0},
  {"id": 7012, "category": "environment", "subject": "Environment", "question": "કેવળાદેવ ઘાના પક્ષી અભયારણ્ય ક્યાં આવેલું છે?", "options": ["ગુજરાત", "રાજસ્થાન", "મધ્યપ્રદેશ", "હરિયાણા"], "answer": 1},
  {"id": 7013, "category": "environment", "subject": "Environment", "question": "વૈશ્વિક તાપમાન વધારા (Global Warming) થી કોને સૌથી વધુ ખતરો છે?", "options": ["હિમનદીઓ પિગળવા (Glaciers)", "જ્વાળામુખી ફાટવા", "ભૂકંપ રચાવા", "તમામ"], "answer": 0}
];

const economicsQs = [
  {"id": 8004, "category": "economics", "subject": "Economics", "question": "નીતિ આયોગ (NITI Aayog) ના ચેરમેન કોણ હોય છે?", "options": ["રાષ્ટ્રપતિ", "નાણામંત્રી", "વડાપ્રધાન", "રિઝર્વ બેંકના ગવર્નર"], "answer": 2},
  {"id": 8005, "category": "economics", "subject": "Economics", "question": "ભારતમાં નોટબંધી (Demonetization) કયા વર્ષે થઈ હતી?", "options": ["2014", "2015", "2016", "2017"], "answer": 2},
  {"id": 8006, "category": "economics", "subject": "Economics", "question": "GST નું પૂરું નામ શું છે?", "options": ["General Sales Tax", "Goods and Services Tax", "Global Standard Tax", "Government Service Tax"], "answer": 1},
  {"id": 8007, "category": "economics", "subject": "Economics", "question": "ભારતની નાણાકીય રાજધાની કઈ ગણાય છે?", "options": ["દિલ્હી", "મુબંઈ", "અમદાવાદ", "બેંગલુરુ"], "answer": 1},
  {"id": 8008, "category": "economics", "subject": "Economics", "question": "પ્રાથમિક ક્ષેત્ર (Primary Sector) માં શેનો સમાવેશ થાય છે?", "options": ["ઉદ્યોગો", "બેન્કિંગ અને સેવાઓ", "ખેતી, પશુપાલન અને ખાણકામ", "ટ્રાન્સપોર્ટેશન"], "answer": 2},
  {"id": 8009, "category": "economics", "subject": "Economics", "question": "ભારતમાં પંચવર્ષીય યોજના ખ્યાલ કયા દેશમાંથી લીધો હતો?", "options": ["અમેરિકા", "રશિયા (USSR)", "બ્રિટન", "જાપાન"], "answer": 1},
  {"id": 8010, "category": "economics", "subject": "Economics", "question": "'શ્વેત ક્રાંતિ' (White Revolution) શેની સાથે સંકળાયેલ છે?", "options": ["કપાસ", "દૂધ", "ચોખા", "ઈંડા"], "answer": 1},
  {"id": 8011, "category": "economics", "subject": "Economics", "question": "SEBI નું મુખ્ય કાર્ય શું છે?", "options": ["શેર બજાર અને સિક્યુરિટીઝનું નિયમન", "બેન્કોને લોન આપવી", "વાહનવ્યવહાર નિયંત્રણ", "નાણાકિય સબસીડી આપવી"], "answer": 0},
  {"id": 8012, "category": "economics", "subject": "Economics", "question": "રેપો રેટ (Repo Rate) કોણ નક્કી કરે છે?", "options": ["SBI", "નાણા મંત્રાલય", "RBI", "SEBI"], "answer": 2},
  {"id": 8013, "category": "economics", "subject": "Economics", "question": "ગુજરાતમાં 'ગિફ્ટ સિટી' (GIFT City) કયા શહેર પાસે આવેલું છે?", "options": ["અમદાવાદ", "વડોદરા", "સુરત", "ગાંધીનગર"], "answer": 3}
];

addToFile('history', historyQs);
addToFile('geography', geographyQs);
addToFile('science', scienceQs);
addToFile('vyakaran', vyakaranQs);
addToFile('environment', environmentQs);
addToFile('economics', economicsQs);

console.log('Done appending offline questions.');

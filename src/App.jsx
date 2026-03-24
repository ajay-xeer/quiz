import { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import mathsReasoningData from './data/maths_reasoning.json';
import bandharanData from './data/bandharan.json';
import historyData from './data/history.json';
import geographyData from './data/geography.json';
import scienceData from './data/science.json';
import vyakaranData from './data/vyakaran.json';
import environmentData from './data/environment.json';
import economicsData from './data/economics.json';
import { generateQuestionsByAI } from './aiService';

const subjectDataMap = {
  'maths_reasoning': mathsReasoningData,
  'bandharan': bandharanData,
  'history': historyData,
  'geography': geographyData,
  'science': scienceData,
  'vyakaran': vyakaranData,
  'environment': environmentData,
  'economics': economicsData
};
import './index.css';

function App() {
  const [gameState, setGameState] = useState('home'); // home, quiz, result
  const [quizConfig, setQuizConfig] = useState({ duration: 10, qCount: 10, subject: '' });
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [apiKey, setApiKey] = useState(localStorage.getItem('geminiApiKey') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  // Store previous AI questions so they never repeat
  const [askedQuestionsHistory, setAskedQuestionsHistory] = useState(() => JSON.parse(localStorage.getItem('askedQuestionsHistory') || '[]'));

  const saveApiKey = (key) => {
    localStorage.setItem('geminiApiKey', key);
    setApiKey(key);
    setShowAiModal(false);
  };

  const startOfflineQuiz = (subject, duration, qCount) => {
    setQuizConfig({ subject, duration, qCount });

    const filteredQuestions = subjectDataMap[subject] || [];
    let selected = [];
    const offlineAsked = JSON.parse(localStorage.getItem('offlineAsked') || '[]');
    let availableQuestions = filteredQuestions.filter(q => !offlineAsked.includes(q.id));

    if (availableQuestions.length >= qCount) {
      selected = [...availableQuestions].sort(() => 0.5 - Math.random()).slice(0, qCount);
      localStorage.setItem('offlineAsked', JSON.stringify([...offlineAsked, ...selected.map(q => q.id)]));
    } else {
      // If we don't have enough offline questions left, alert them
      alert('સાહેબ, આ વિષયના તમામ ઓફલાઇન પ્રશ્નો તમે રમી ચૂક્યા છો! હવે એક પણ વાર રિપીટ ન થાય તે માટે કડક કાયદો છે. વધુ પ્રશ્નો માટે મહેરબાની કરીને ફ્રી AI Key નાખો.');
      return;
    }

    setSelectedQuestions(selected);
    setUserAnswers({});
    setGameState('quiz');
  };

  const startQuiz = async ({ subject, duration, qCount }) => {
    setQuizConfig({ subject, duration, qCount });

    if (apiKey) {
      setIsLoading(true);
      try {
        const aiQuestions = await generateQuestionsByAI(apiKey, subject, qCount, askedQuestionsHistory);

        // Save these to history so we never repeat them in the future
        const newHistory = [...askedQuestionsHistory, ...aiQuestions.map(q => q.question)];
        setAskedQuestionsHistory(newHistory);
        localStorage.setItem('askedQuestionsHistory', JSON.stringify(newHistory));

        setSelectedQuestions(aiQuestions);
        setUserAnswers({});
        setGameState('quiz');
      } catch (error) {
        alert('AI પ્રશ્નો બનાવવામાં ભૂલ: ' + error.message + '\nઓફલાઇન પ્રશ્નોથી શરૂ કરીએ છીએ...');
        startOfflineQuiz(subject, duration, qCount);
      }
      setIsLoading(false);
    } else {
      startOfflineQuiz(subject, duration, qCount);
    }
  };

  const submitQuiz = (answers) => {
    setUserAnswers(answers);
    setGameState('result');
  };

  const restartQuiz = () => {
    setGameState('home');
  };

  return (
    <div className="app-container">
      <div className="glass-panel">
        <header className="app-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div></div>
          <button onClick={() => setShowAiModal(true)} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}>
            {apiKey ? '✅ AI Active' : '🤖 Set AI Key (Unlimited)'}
          </button>
        </header>

        <main className="main-content">
          {showAiModal && (
            <div style={{ background: 'var(--light-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
              <h3>Google Gemini API Key સેટ કરો 🤖</h3>
              <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--gray)' }}>
                તમારી ફ્રી API key (Google AI Studio) અહી નાખવાથી, પ્રશ્નો AI જાતે જ બનાવશે અને <strong>ક્યારેય રિપીટ નહીં થાય</strong>.
              </p>
              <input
                type="password"
                placeholder="Paste Key Here..."
                defaultValue={apiKey}
                id="gemini-key-input"
                style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }}
              />
              <button className="btn-primary" onClick={() => saveApiKey(document.getElementById('gemini-key-input').value)}>Save Key</button>
              <button className="btn-secondary" style={{ marginLeft: '0.5rem' }} onClick={() => setShowAiModal(false)}>Cancel</button>
            </div>
          )}

          {isLoading && (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <h3>🤖 AI નવા પ્રશ્નો બનાવી રહ્યું છે... (10-15 સેકન્ડ રાહ જુઓ)</h3>
            </div>
          )}

          {!isLoading && gameState === 'home' && (
            <Home onStart={startQuiz} />
          )}
          {!isLoading && gameState === 'quiz' && (
            <Quiz
              questions={selectedQuestions}
              duration={quizConfig.duration}
              onSubmit={submitQuiz}
              onCancel={() => setGameState('home')}
            />
          )}
          {!isLoading && gameState === 'result' && (
            <Result
              questions={selectedQuestions}
              answers={userAnswers}
              onRestart={restartQuiz}
            />
          )}
        </main>

        <footer className="app-footer">
          <p>Created for Gujarat Police Aspirants | Best of Luck</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

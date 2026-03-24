import React, { useState } from 'react';

const subjects = [
  { id: 'maths_reasoning', name: 'ગણિત અને બૌદ્ધિક ક્ષમતા (Maths & Reasoning)' },
  { id: 'bandharan', name: 'બંધારણ અને જાહેર વહીવટ (Constitution)' },
  { id: 'history', name: 'ઇતિહાસ અને સાંસ્કૃતિક વારસો (History)' },
  { id: 'geography', name: 'ભૂગોળ (Geography)' },
  { id: 'science', name: 'વિજ્ઞાન અને ટેકનોલોજી (Science)' },
  { id: 'vyakaran', name: 'ગુજરાતી અને અંગ્રેજી વ્યાકરણ (Grammar)' },
  { id: 'environment', name: 'પર્યાવરણ (Environment)' },
  { id: 'economics', name: 'અર્થશાસ્ત્ર (Economics)' }
];

const Home = ({ onStart }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const getOptions = () => {
    if (selectedSubject === 'maths_reasoning') {
      return [
        { time: 5, qCount: 7 },
        { time: 10, qCount: 12 },
        { time: 15, qCount: 18 },
        { time: 20, qCount: 25 },
      ];
    } else {
      // For other subjects: 25 sec per question.
      return [
        { time: 5, qCount: 12 },   // 5 min * 60 = 300 sec / 25 = 12
        { time: 10, qCount: 24 },  // 10 min * 60 = 600 sec / 25 = 24
        { time: 15, qCount: 36 },  // 15 min * 60 = 900 sec / 25 = 36
        { time: 20, qCount: 48 },  // 20 min * 60 = 1200 sec / 25 = 48
      ];
    }
  };

  const handleStart = (time, qCount) => {
    onStart({ subject: selectedSubject, duration: time, qCount });
  };

  return (
    <div className="home-container">
      <div className="welcome-text">
        <h2>તમારું સ્વાગત છે!</h2>
        <p>ગુજરાત પોલીસ કોન્સ્ટેબલ અને PSI ની પરીક્ષા માટે તૈયાર કરેલી ઓનલાઈન મોક ટેસ્ટ. પહેલા વિષય પસંદ કરો અને ત્યારબાદ સમયગાળો.</p>
      </div>

      {!selectedSubject ? (
        <div className="duration-selector subject-selector">
          <h3>વિષય પસંદ કરો (Select Subject)</h3>
          <div className="options-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {subjects.map(sub => (
              <div
                key={sub.id}
                className="duration-card"
                onClick={() => setSelectedSubject(sub.id)}
              >
                <span className="time-label" style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 'bold' }}>{sub.name}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="duration-selector">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>સમયગાળો પસંદ કરો (Select Time)</h3>
            <button className="btn-secondary" style={{ padding: '0.4rem 1rem' }} onClick={() => setSelectedSubject(null)}>પાછળ</button>
          </div>
          <p style={{ color: 'var(--gray)', marginBottom: '1rem' }}>
            {selectedSubject === 'maths_reasoning' ? 'દરેક પ્રશ્ન માટે યોગ્ય સમય આપવામાં આવ્યો છે.' : 'દરેક પ્રશ્ન માટે 25 સેકન્ડનો સમય મળશે.'}
          </p>
          <div className="options-grid">
            {getOptions().map(opt => (
              <div key={opt.time} className="duration-card" onClick={() => handleStart(opt.time, opt.qCount)}>
                <span className="time-val">{opt.time}</span>
                <span className="time-label">મિનિટ</span>
                <span className="q-count">{opt.qCount} પ્રશ્નો</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

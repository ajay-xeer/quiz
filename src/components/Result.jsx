import React from 'react';

const Result = ({ questions, answers, onRestart }) => {
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  questions.forEach((q, idx) => {
    const userAns = answers[idx];
    if (userAns === undefined) {
      skippedCount++;
    } else if (userAns === q.answer) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const totalQuestions = questions.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const getOptionLetter = (index) => String.fromCharCode(65 + index); // A, B, C, D

  return (
    <div className="result-container">
      <div className="score-card">
        <h2 className="score-heading">તમારું પરિણામ (Result)</h2>
        
        <div className="score-circle-wrapper">
          <div className="score-circle" style={{ '--percent': `${percentage}%` }}>
            <div className="score-val">
              <span className="percentage">{percentage}%</span>
              <span className="marks">{correctCount} / {totalQuestions} માર્ક્સ</span>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-val correct">{correctCount}</span>
            <span className="stat-label">સાચા</span>
          </div>
          <div className="stat-item">
            <span className="stat-val wrong">{wrongCount}</span>
            <span className="stat-label">ખોટા</span>
          </div>
          <div className="stat-item">
            <span className="stat-val skipped">{skippedCount}</span>
            <span className="stat-label">છોડેલા</span>
          </div>
        </div>
      </div>

      <div className="review-section">
        <h3>જવાબોની સમીક્ષા (Answer Review)</h3>
        <div className="review-list">
          {questions.map((q, idx) => {
            const userAns = answers[idx];
            const isSkipped = userAns === undefined;
            const isCorrect = userAns === q.answer;
            
            let statusClass = 'unanswered';
            if (!isSkipped) {
              statusClass = isCorrect ? 'correct' : 'wrong';
            }

            return (
              <div key={idx} className={`review-item ${statusClass}`}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                  <span className="subject-tag" style={{marginBottom: 0}}>{q.subject}</span>
                  <span style={{fontWeight: 'bold', color: statusClass === 'correct' ? 'green' : statusClass === 'wrong' ? 'red' : 'gray'}}>
                    {statusClass === 'correct' ? '✅ સાચો જવાબ' : statusClass === 'wrong' ? '❌ ખોટો જવાબ' : '⚠️ છોડેલો પ્રશ્ન'}
                  </span>
                </div>
                
                <h4 className="r-question">પ્રશ્ન {idx + 1}: {q.question}</h4>
                
                <div className="r-options">
                  {q.options.map((opt, optIdx) => {
                    const optionCorrect = optIdx === q.answer;
                    const optionUser = optIdx === userAns;
                    
                    let optClass = 'r-option';
                    if (optionCorrect) {
                       optClass += ' is-correct-ans';
                    } else if (optionUser && !optionCorrect) {
                       optClass += ' is-user-wrong';
                    }

                    return (
                      <div key={optIdx} className={optClass}>
                        <span>{getOptionLetter(optIdx)}. {opt}</span>
                        {optionCorrect && <span>✅</span>}
                        {(optionUser && !optionCorrect) && <span>❌</span>}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="result-actions">
        <button className="btn-start" onClick={onRestart}>નવી ટેસ્ટ શરૂ કરો (Restart)</button>
      </div>
    </div>
  );
};

export default Result;

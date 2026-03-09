import { useState, useEffect, useCallback } from 'react';

// ─── Mock AI Hints (no API key required) ───
const MOCK_HINTS = [
  "**Think about what the question is really asking.** Break it into smaller parts. For logical statements, try substituting simple truth values (T/F) and check each case.",
  "**Use process of elimination.** Identify any option that is clearly impossible or contradicts a given premise — that narrows down your choices significantly.",
  "**Draw a Venn diagram or truth table.** Visualizing the relationships between sets or logical propositions often makes the answer obvious.",
  "**Apply De Morgan's Laws:** ¬(A ∧ B) ≡ ¬A ∨ ¬B, and ¬(A ∨ B) ≡ ¬A ∧ ¬B. These are frequently the key to simplification problems.",
  "**For quantifier questions,** recall: ¬(∀x P(x)) ≡ ∃x ¬P(x), and ¬(∃x P(x)) ≡ ∀x ¬P(x). The negation always flips the quantifier.",
  "**For set cardinality,** remember: ℕ, ℤ, ℚ are all countable (same size). ℝ and any open interval (a,b) are uncountable — proven by Cantor's diagonal argument.",
  "**Inclusion-Exclusion Principle:** |A ∪ B ∪ C| = |A| + |B| + |C| − |A∩B| − |B∩C| − |A∩C| + |A∩B∩C|. Don't forget the triple-intersection term!",
  "**For K-map simplification,** group adjacent '1' cells in powers of 2 (1, 2, 4, 8...). The variable that changes within a group is eliminated from the result.",
  "**Modus Ponens:** From P→Q and P, conclude Q. **Modus Tollens:** From P→Q and ¬Q, conclude ¬P. These are the two most common inference rules.",
  "**For satisfiability,** try extreme cases first: what happens when all variables are True? All False? One True and the rest False?",
];

function getMockHint(questionIndex) {
  return MOCK_HINTS[questionIndex % MOCK_HINTS.length];
}

// ─── MathJax re-render hook ───
function useMathJax(deps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.MathJax) {
      window.MathJax.typesetPromise?.();
    }
  }, deps);
}

export default function QuizRunner({ dpp, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [showGrid, setShowGrid] = useState(false);
  const [hintsCache, setHintsCache] = useState({});
  const [showHint, setShowHint] = useState(false);
  const [hintLoading, setHintLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (!dpp?.id) return;
    const saved = localStorage.getItem(`dpp_progress_${dpp.id}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data && !data.completed) {
          setCurrentIndex(data.currentIndex || 0);
          setUserAnswers(data.userAnswers || new Array(dpp.questions.length).fill(null));
          setStatuses(data.statuses || new Array(dpp.questions.length).fill('unseen'));
        } else {
          setUserAnswers(new Array(dpp.questions.length).fill(null));
          setStatuses(new Array(dpp.questions.length).fill('unseen'));
        }
      } catch (e) {
        setUserAnswers(new Array(dpp.questions.length).fill(null));
        setStatuses(new Array(dpp.questions.length).fill('unseen'));
      }
    } else {
      setUserAnswers(new Array(dpp.questions.length).fill(null));
      setStatuses(new Array(dpp.questions.length).fill('unseen'));
    }
    setIsLoaded(true);
  }, [dpp]);

  // Save to localStorage when progress changes
  useEffect(() => {
    if (!isLoaded || !dpp?.id) return;
    const progress = {
      currentIndex,
      userAnswers,
      statuses,
      completed: false
    };
    localStorage.setItem(`dpp_progress_${dpp.id}`, JSON.stringify(progress));
  }, [currentIndex, userAnswers, statuses, isLoaded, dpp]);

  useMathJax([currentIndex, userAnswers]);

  const currentQuestion = dpp?.questions?.[currentIndex];
  const isSubjective = dpp?.type === 'subjective';

  const selectOption = useCallback((optionIndex) => {
    if (isSubjective || userAnswers[currentIndex] !== null) return;
    setUserAnswers(prev => { const a = [...prev]; a[currentIndex] = optionIndex; return a; });
    setStatuses(prev => { const s = [...prev]; if (s[currentIndex] !== 'marked') s[currentIndex] = 'attempted'; return s; });
  }, [currentIndex, isSubjective, userAnswers]);

  const revealSolution = useCallback(() => {
    setUserAnswers(prev => { const a = [...prev]; a[currentIndex] = 0; return a; });
    setStatuses(prev => { const s = [...prev]; if (s[currentIndex] !== 'marked') s[currentIndex] = 'attempted'; return s; });
  }, [currentIndex]);

  const goToQuestion = useCallback((index) => {
    setStatuses(prev => {
      const s = [...prev];
      if (s[currentIndex] === 'unseen') s[currentIndex] = 'viewed';
      return s;
    });
    setCurrentIndex(index);
    setShowHint(false);
    setShowGrid(false);
  }, [currentIndex]);

  const toggleMarkForReview = useCallback(() => {
    setStatuses(prev => {
      const s = [...prev];
      if (s[currentIndex] === 'marked') {
        s[currentIndex] = userAnswers[currentIndex] !== null ? 'attempted' : 'viewed';
      } else {
        s[currentIndex] = 'marked';
      }
      return s;
    });
  }, [currentIndex, userAnswers]);

  const clearSelection = useCallback(() => {
    setUserAnswers(prev => { const a = [...prev]; a[currentIndex] = null; return a; });
    setStatuses(prev => { const s = [...prev]; if (s[currentIndex] === 'attempted') s[currentIndex] = 'viewed'; return s; });
    setShowHint(false);
  }, [currentIndex]);

  const requestHint = useCallback(() => {
    if (hintsCache[currentIndex]) { setShowHint(true); return; }
    setHintLoading(true);
    setShowHint(true);
    // Simulate a short "loading" delay for realism
    setTimeout(() => {
      const hint = getMockHint(currentIndex);
      setHintsCache(prev => ({ ...prev, [currentIndex]: hint }));
      setHintLoading(false);
    }, 600);
  }, [currentIndex, hintsCache]);

  const submitQuiz = useCallback(() => {
    let score = 0;
    for (let i = 0; i < dpp.questions.length; i++) {
      if (isSubjective) {
        if (userAnswers[i] !== null) score++;
      } else {
        if (userAnswers[i] === dpp.questions[i].correct) score++;
      }
    }

    // Mark as completed in localStorage
    const progress = {
      currentIndex,
      userAnswers,
      statuses,
      completed: true,
      score
    };
    localStorage.setItem(`dpp_progress_${dpp.id}`, JSON.stringify(progress));

    onComplete({ userAnswers, statuses, score, completed: true });
  }, [dpp, isSubjective, userAnswers, statuses, currentIndex, onComplete]);

  if (!dpp || !currentQuestion || !isLoaded) return <div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>;

  const isAnswered = userAnswers[currentIndex] !== null;
  const isLastQ = currentIndex === dpp.questions.length - 1;

  const currentHint = hintsCache[currentIndex];

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '28px 24px 120px' }}>

      {/* ─── Question Tracker & Controls ─── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Question {currentIndex + 1} / {dpp.questions.length}
        </span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* AI Hint button */}
          {!showHint && (
            <button
              onClick={requestHint}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '6px 12px',
                background: 'var(--green-light)',
                color: 'var(--green)',
                border: '1.5px solid var(--green-border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px', fontWeight: '600',
              }}
            >
              ✨ AI Hint
            </button>
          )}
          <button
            onClick={toggleMarkForReview}
            style={{
              padding: '6px 12px',
              background: statuses[currentIndex] === 'marked' ? '#fef3c7' : 'var(--surface)',
              color: statuses[currentIndex] === 'marked' ? '#92400e' : 'var(--text-secondary)',
              border: '1.5px solid ' + (statuses[currentIndex] === 'marked' ? '#fde68a' : 'var(--border)'),
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px', fontWeight: '600',
            }}
          >
            {statuses[currentIndex] === 'marked' ? '🔖 Marked' : 'Mark for Review'}
          </button>
          {!isSubjective && (
            <button
              onClick={clearSelection}
              style={{
                padding: '6px 12px',
                background: 'var(--surface)',
                color: 'var(--text-secondary)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px', fontWeight: '600',
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ─── AI Hint Box ─── */}
      {showHint && (
        <div className="hint-box" style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              ✨ AI Tutor Hint
            </h3>
            <button
              onClick={() => setShowHint(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1, padding: '2px' }}
            >
              ×
            </button>
          </div>
          {hintLoading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '13px' }}>
              <span className="spinner" /> Thinking...
            </div>
          ) : (
            <div className="ai-content math-text" style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.65' }}
              dangerouslySetInnerHTML={{ __html: currentHint?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') || '' }}
            />
          )}
        </div>
      )}

      {/* ─── Question Text ─── */}
      <div style={{ marginBottom: '24px' }}>
        <div
          className="math-text"
          style={{ fontSize: '17px', fontWeight: '600', color: 'var(--text-primary)', lineHeight: '1.65' }}
          dangerouslySetInnerHTML={{ __html: currentQuestion.q }}
        />
        {currentQuestion.code && (
          <pre style={{
            background: '#f9fafb',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '16px',
            fontSize: '13px',
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
            marginTop: '16px',
            overflowX: 'auto',
            lineHeight: '1.6',
            color: 'var(--text-primary)',
          }}>
            {currentQuestion.code}
          </pre>
        )}
      </div>

      {/* ─── Options / Reveal ─── */}
      {isSubjective ? (
        <div>
          {!isAnswered ? (
            <button
              onClick={revealSolution}
              style={{
                width: '100%',
                padding: '16px',
                background: 'var(--green-light)',
                border: '1.5px solid var(--green-border)',
                borderRadius: 'var(--radius)',
                color: 'var(--green)',
                fontSize: '15px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              👀 Reveal Step-by-Step Solution
            </button>
          ) : (
            <div style={{
              background: '#f9fafb',
              border: '1.5px solid var(--green-border)',
              borderRadius: 'var(--radius)',
              padding: '20px',
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--green)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                📝 Detailed Solution
              </h3>
              <div
                className="math-text"
                style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.7' }}
                dangerouslySetInnerHTML={{ __html: currentQuestion.expl }}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          {currentQuestion.a?.map((option, i) => {
            const isCorrect = i === currentQuestion.correct;
            const isSelected = userAnswers[currentIndex] === i;
            let cls = 'option-btn';
            if (isAnswered) {
              if (isCorrect) cls += ' correct';
              else if (isSelected) cls += ' wrong';
            }
            return (
              <button
                key={i}
                className={cls}
                onClick={() => selectOption(i)}
                disabled={isAnswered}
              >
                <span className="opt-label">{String.fromCharCode(65 + i)}.</span>
                <span className="math-text" dangerouslySetInnerHTML={{ __html: option }} />
                {isAnswered && isCorrect && <span style={{ marginLeft: 'auto', fontSize: '16px' }}>✓</span>}
                {isAnswered && isSelected && !isCorrect && <span style={{ marginLeft: 'auto', fontSize: '16px' }}>✗</span>}
              </button>
            );
          })}

          {isAnswered && (
            <div className={`feedback-box ${userAnswers[currentIndex] === currentQuestion.correct ? 'correct' : 'wrong'}`}>
              <p style={{ fontWeight: '700', marginBottom: '6px', fontSize: '14px' }}>
                {userAnswers[currentIndex] === currentQuestion.correct ? '✅ Correct!' : '❌ Incorrect'}
              </p>
              <p className="math-text" style={{ margin: 0, fontSize: '14px' }}>
                <span dangerouslySetInnerHTML={{ __html: currentQuestion.expl }} />
              </p>
            </div>
          )}
        </div>
      )}

      {/* ─── Question Grid ─── */}
      {showGrid && (
        <div style={{ marginTop: '24px', background: '#f9fafb', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
            {dpp.questions.map((_, i) => {
              let cls = 'q-grid-btn';
              if (i === currentIndex) cls += ' current';
              else if (statuses[i] === 'attempted') cls += ' attempted';
              else if (statuses[i] === 'marked') cls += ' marked';
              else if (statuses[i] === 'viewed') cls += ' viewed';
              return (
                <button key={i} className={cls} onClick={() => goToQuestion(i)}>{i + 1}</button>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '11px', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#bbf7d0', display: 'inline-block' }} /> Answered</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fde68a', display: 'inline-block' }} /> Marked</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#bfdbfe', display: 'inline-block' }} /> Current</span>
          </div>
        </div>
      )}

      {/* ─── Footer Navigation ─── */}
      <div className="quiz-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => goToQuestion(currentIndex - 1)}
          disabled={currentIndex === 0}
          style={{
            padding: '10px 20px',
            background: 'var(--surface)',
            border: '1.5px solid var(--border)',
            borderRadius: 'var(--radius)',
            fontSize: '14px', fontWeight: '600',
            color: currentIndex === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          ← Prev
        </button>

        <button
          onClick={() => setShowGrid(!showGrid)}
          style={{
            padding: '10px 14px',
            background: showGrid ? '#eff6ff' : 'var(--surface)',
            border: '1.5px solid ' + (showGrid ? 'var(--blue)' : 'var(--border)'),
            borderRadius: 'var(--radius)',
            fontSize: '13px', fontWeight: '600',
            color: showGrid ? 'var(--blue)' : 'var(--text-secondary)',
          }}
        >
          ☰ Grid
        </button>

        {isLastQ ? (
          <button
            onClick={submitQuiz}
            style={{
              padding: '10px 22px',
              background: 'var(--green)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius)',
              fontSize: '14px', fontWeight: '700',
            }}
          >
            {isSubjective ? 'Finish Review' : 'Submit Quiz'} ✓
          </button>
        ) : (
          <button
            onClick={() => goToQuestion(currentIndex + 1)}
            style={{
              padding: '10px 22px',
              background: 'var(--text-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius)',
              fontSize: '14px', fontWeight: '700',
            }}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
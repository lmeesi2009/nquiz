import { useEffect } from 'react';

export default function ResultsScreen({ dpp, results, onRestart, onHome }) {
  const { userAnswers, score } = results;
  const total = dpp.questions.length;
  const isSubjective = dpp.type === 'subjective';
  const pct = Math.round((score / total) * 100);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.MathJax) {
      window.MathJax.typesetPromise?.();
    }
  }, []);

  const scoreColor = pct >= 70 ? 'var(--green)' : pct >= 40 ? 'var(--amber)' : '#ef4444';
  const scoreBg = pct >= 70 ? 'var(--green-light)' : pct >= 40 ? 'var(--amber-light)' : 'var(--red-light)';
  const scoreBorder = pct >= 70 ? 'var(--green-border)' : pct >= 40 ? 'var(--amber-border)' : 'var(--red-border)';
  const scoreLabel = pct >= 70 ? 'Great work!' : pct >= 40 ? 'Good attempt!' : 'Keep practicing!';

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '40px 24px 80px' }}>

      {/* ─── Score Card ─── */}
      <div style={{
        background: scoreBg,
        border: `1.5px solid ${scoreBorder}`,
        borderRadius: 'var(--radius-xl)',
        padding: '36px',
        textAlign: 'center',
        marginBottom: '40px',
      }}>
        <div style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.08em', color: scoreColor, textTransform: 'uppercase', marginBottom: '8px' }}>
          {isSubjective ? 'Practice Complete' : 'Quiz Complete'}
        </div>
        <div style={{ fontSize: '64px', fontWeight: '800', color: scoreColor, lineHeight: 1, marginBottom: '6px' }}>
          {score}<span style={{ fontSize: '28px', fontWeight: '500', opacity: 0.7 }}>/{total}</span>
        </div>
        <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
          {scoreLabel}
        </div>
        {!isSubjective && (
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            {pct}% correct
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={onRestart}
            style={{
              padding: '11px 24px',
              background: 'var(--surface)',
              border: '2px solid var(--text-primary)',
              borderRadius: 'var(--radius)',
              color: 'var(--text-primary)',
              fontSize: '14px', fontWeight: '700',
            }}
          >
            {isSubjective ? 'Review Again' : 'Retry Test'}
          </button>
          <button
            onClick={onHome}
            style={{
              padding: '11px 24px',
              background: 'var(--green)',
              border: 'none',
              borderRadius: 'var(--radius)',
              color: '#fff',
              fontSize: '14px', fontWeight: '700',
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* ─── Detailed Review ─── */}
      <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1.5px solid var(--border)' }}>
        Detailed Review & Explanations
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {dpp.questions.map((q, i) => {
          const selected = userAnswers[i];
          const isCorrect = isSubjective
            ? selected !== null
            : selected === q.correct;

          let statusColor = isCorrect ? 'var(--green)' : '#ef4444';
          let statusBg = isCorrect ? 'var(--green-light)' : 'var(--red-light)';
          let statusBorder = isCorrect ? 'var(--green-border)' : 'var(--red-border)';
          let statusIcon = isCorrect ? '✅' : '❌';
          let statusLabel = isCorrect
            ? (isSubjective ? 'Reviewed' : 'Correct')
            : (selected === null ? 'Skipped' : 'Incorrect');

          return (
            <div key={i} style={{
              background: 'var(--surface)',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
            }}>
              {/* Question Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                borderBottom: '1px solid var(--border)',
                background: '#fafafa',
              }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)' }}>
                  Q{i + 1}
                </span>
                <span style={{
                  fontSize: '12px', fontWeight: '700',
                  color: statusColor,
                  background: statusBg,
                  border: `1px solid ${statusBorder}`,
                  borderRadius: '20px',
                  padding: '2px 10px',
                }}>
                  {statusIcon} {statusLabel}
                </span>
              </div>

              <div style={{ padding: '16px 18px' }}>
                {/* Question text */}
                <div
                  className="math-text"
                  style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '14px' }}
                  dangerouslySetInnerHTML={{ __html: q.q }}
                />

                {q.code && (
                  <pre style={{
                    background: '#f9fafb', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)', padding: '12px',
                    fontSize: '12px', fontFamily: "'Courier New', monospace",
                    overflowX: 'auto', marginBottom: '14px',
                  }}>
                    {q.code}
                  </pre>
                )}

                {/* MCQ options */}
                {!isSubjective && q.a && (
                  <div style={{ marginBottom: '14px' }}>
                    {q.a.map((opt, j) => {
                      const isThisCorrect = j === q.correct;
                      const isThisSelected = j === selected;
                      let bg = 'transparent', border = 'transparent', textCol = 'var(--text-secondary)';
                      if (isThisCorrect) { bg = 'var(--green-light)'; border = 'var(--green)'; textCol = '#14532d'; }
                      else if (isThisSelected && !isThisCorrect) { bg = 'var(--red-light)'; border = '#ef4444'; textCol = 'var(--red-text)'; }

                      return (
                        <div key={j} style={{
                          display: 'flex', alignItems: 'flex-start', gap: '10px',
                          padding: '10px 12px', marginBottom: '6px',
                          background: bg, border: `1.5px solid ${border || 'var(--border)'}`,
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '14px', color: textCol || 'var(--text-primary)',
                        }}>
                          <span style={{ fontWeight: '700', minWidth: '20px' }}>{String.fromCharCode(65 + j)}.</span>
                          <span className="math-text" dangerouslySetInnerHTML={{ __html: opt }} />
                          {isThisCorrect && <span style={{ marginLeft: 'auto' }}>✓</span>}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Explanation */}
                <div style={{
                  background: '#f9fafb',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 14px',
                  fontSize: '14px',
                  lineHeight: '1.65',
                }}>
                  <span style={{ fontWeight: '700', color: 'var(--text-primary)', marginRight: '4px' }}>Explanation:</span>
                  <span
                    className="math-text"
                    style={{ color: 'var(--text-secondary)' }}
                    dangerouslySetInnerHTML={{ __html: q.expl }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
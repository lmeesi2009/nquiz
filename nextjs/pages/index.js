import Head from 'next/head';
import { useEffect, useState } from 'react';
import QuizRunner from '../components/QuizRunner';
import ResultsScreen from '../components/ResultsScreen';
import { allDPPs } from '../data/dppData';
import { genAiDpps } from '../data/genAiDpps';
import { sdseData } from '../data/sdseData';

// ─── Maths DPP descriptions ───
const MATHS_DESC = {
  1: 'Satisfiability, Sudoku SAT modeling, Rules of Inference, and Quantifier logic.',
  2: 'Boolean Simplification, K-maps, Logic Gates, CNF/DNF, and Predicate Modeling.',
  3: 'Multi-premise arguments, Modus Ponens, Modus Tollens, and Hypothetical Syllogism.',
  4: 'Max-Min intersections, Venn diagrams, and Inclusion-Exclusion.',
  5: 'Set operations, Countability, Infinite intersections and unions.',
  6: 'Subjective step-by-step proofs, logic translations, and binary arithmetic.',
  7: 'Mixed practice on K-maps, Sudoku SAT, quantifiers, and mathematical proofs.',
  8: "Hilbert's Hotel, countable vs uncountable sets, bijections, and the Mapping Rule.",
};

// ─── SDSE DPP descriptions ───
const SDSE_DESC = {
  1: 'Software lifecycle, maintenance, quality attributes, and the importance of design.',
  2: 'Classes, objects, constructors, inheritance, polymorphism, and encapsulation.',
  3: 'Class diagrams, sequence diagrams, use cases, and UML notations.',
  4: 'Entities, relationships, attributes, cardinality, and participation.',
  5: 'Creational, structural, and behavioral patterns (Singleton, Factory, etc.).',
};

// ─── Subject Config ───
const SUBJECTS = [
  {
    id: 'maths',
    title: 'Maths',
    emoji: '∑',
    description: 'Logic, Boolean Algebra, Quantifiers, Set Theory & Discrete Mathematics',
    accent: '#2563eb',
    accentLight: '#eff6ff',
    accentBorder: '#bfdbfe',
    dpps: Object.entries(allDPPs).map(([id, dpp]) => ({
      ...dpp,
      id: `maths-${id}`,
      numId: Number(id),
      description: MATHS_DESC[Number(id)] || '',
    })),
  },
  {
    id: 'genai',
    title: 'Gen AI',
    emoji: '🤖',
    description: 'Foundations of ML, Data Preprocessing, Regression, Evaluation & Decision Trees',
    accent: '#0d9488',
    accentLight: '#f0fdfa',
    accentBorder: '#99f6e4',
    dpps: genAiDpps,
  },
  {
    id: 'sdse',
    title: 'SDSE',
    emoji: '🏗️',
    description: 'Software Engineering, OOP, UML, ERD & Software Design Patterns',
    accent: '#10b981',
    accentLight: '#ecfdf5',
    accentBorder: '#a7f3d0',
    dpps: sdseData.map((dpp, idx) => ({
      ...dpp,
      description: SDSE_DESC[idx + 1] || '',
    })),
  },
];

const DPP_ACCENT_COLORS = [
  '#3b82f6', '#0ea5e9', '#8b5cf6', '#f59e0b',
  '#ec4899', '#6366f1', '#0d9488', '#16a34a',
];

export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentDpp, setCurrentDpp] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [savedProgress, setSavedProgress] = useState({});

  useEffect(() => {
    // Load saved progress for all DPPs
    const progress = {};
    for (const key in localStorage) {
      if (key.startsWith('dpp_progress_')) {
        try {
          progress[key.replace('dpp_progress_', '')] = JSON.parse(localStorage.getItem(key));
        } catch (e) { }
      }
    }
    setSavedProgress(progress);
  }, [currentDpp, quizResults]); // Re-run when returning to home

  const startDpp = (dpp, forceRetake = false) => {
    if (forceRetake) {
      localStorage.removeItem(`dpp_progress_${dpp.id}`);
      setSavedProgress(prev => { const n = { ...prev }; delete n[dpp.id]; return n; });
    }
    setCurrentDpp(dpp);
    setQuizResults(null);
  };

  const reviewDpp = (dpp) => {
    const progress = savedProgress[dpp.id];
    if (progress && progress.completed) {
      setCurrentDpp(dpp);
      setQuizResults({
        userAnswers: progress.userAnswers,
        statuses: progress.statuses,
        score: progress.score,
        completed: true
      });
    }
  };

  const handleQuizComplete = (results) => setQuizResults(results);
  const handleRestart = () => {
    if (currentDpp) {
      localStorage.removeItem(`dpp_progress_${currentDpp.id}`);
      setSavedProgress(prev => { const n = { ...prev }; delete n[currentDpp.id]; return n; });
    }
    setQuizResults(null);
  };
  const handleHome = () => { setCurrentDpp(null); setQuizResults(null); setSelectedSubject(null); };
  const handleBackToSubject = () => { setCurrentDpp(null); setQuizResults(null); };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.MathJax) {
      window.MathJax.typesetPromise?.();
    }
  }, [currentDpp, quizResults]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Head>
        <title>DPP Portal — Logic & Gen AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Interactive DPPs: Discrete Mathematics and Machine Learning." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `window.MathJax = { tex: { inlineMath: [['$','$'],['\\\\(','\\\\)']], displayMath: [['$$','$$'],['\\\\[','\\\\]']] }, startup: { ready: () => { MathJax.startup.defaultReady(); } } };`
        }} />
        <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" async />
      </Head>

      {/* ─── Navbar ─── */}
      <header style={{
        background: 'var(--surface)', borderBottom: '1px solid var(--border)',
        padding: '0 24px', height: '58px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50,
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {(selectedSubject || currentDpp) && (
            <button
              onClick={currentDpp ? handleBackToSubject : handleHome}
              style={{
                background: '#f3f4f6', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)', padding: '6px 10px',
                color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '600',
              }}
            >
              ← {currentDpp ? selectedSubject?.title : 'Home'}
            </button>
          )}
          <span style={{ fontWeight: '800', fontSize: '17px', color: 'var(--text-primary)' }}>
            DPP Portal
          </span>
        </div>
        {currentDpp && (
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {currentDpp.title}
          </div>
        )}
        {selectedSubject && !currentDpp && (
          <button onClick={handleHome} style={{
            background: 'none', border: 'none', fontSize: '13px',
            color: 'var(--text-muted)', fontWeight: '600', cursor: 'pointer',
          }}>
            All Subjects
          </button>
        )}
      </header>

      <main>
        {/* ─── VIEW 1: Subject Selection ─── */}
        {!selectedSubject && !currentDpp && (
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '6px' }}>
                My Daily Practice Problems
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                Choose a subject to start practicing. Instant feedback & AI hints included.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
              {SUBJECTS.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject)}
                  style={{
                    background: 'var(--surface)', border: `1.5px solid var(--border)`,
                    borderRadius: 'var(--radius-xl)', padding: '28px 28px 24px',
                    textAlign: 'left', cursor: 'pointer', boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s ease', position: 'relative', overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = subject.accent;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  {/* Accent bar */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: subject.accent }} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '12px',
                      background: subject.accentLight, border: `1.5px solid ${subject.accentBorder}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '22px', fontWeight: '700', color: subject.accent,
                      fontFamily: 'serif',
                    }}>
                      {subject.emoji}
                    </div>
                    <div>
                      <h2 style={{ fontSize: '19px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '2px' }}>
                        {subject.title}
                      </h2>
                      <span style={{
                        fontSize: '12px', fontWeight: '600', color: subject.accent,
                        background: subject.accentLight, borderRadius: '20px',
                        padding: '1px 8px',
                      }}>
                        {subject.dpps.length} DPPs
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '18px' }}>
                    {subject.description}
                  </p>

                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontSize: '13px', fontWeight: '700', color: subject.accent,
                  }}>
                    Open Subject
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── VIEW 2: DPP List for Subject ─── */}
        {selectedSubject && !currentDpp && (
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: selectedSubject.accentLight, border: `1.5px solid ${selectedSubject.accentBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', color: selectedSubject.accent, fontFamily: 'serif', fontWeight: '700',
              }}>
                {selectedSubject.emoji}
              </div>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                  {selectedSubject.title}
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '2px 0 0' }}>
                  {selectedSubject.description}
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '18px' }}>
              {selectedSubject.dpps.map((dpp, idx) => {
                const accent = DPP_ACCENT_COLORS[idx % DPP_ACCENT_COLORS.length];
                const isSubjective = dpp.type === 'subjective';
                return (
                  <div key={dpp.id} className="dpp-card">
                    <div className="accent-bar" style={{ background: accent }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', paddingTop: '4px' }}>
                      <h2 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', flex: 1, paddingRight: '8px', lineHeight: '1.35' }}>
                        {dpp.title}
                      </h2>
                      <span style={{
                        background: '#f3f4f6', color: 'var(--text-secondary)',
                        borderRadius: '20px', padding: '2px 9px',
                        fontSize: '11px', fontWeight: '700', whiteSpace: 'nowrap',
                      }}>
                        {dpp.questions.length} Qs
                      </span>
                    </div>
                    {dpp.description && (
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', flex: 1, marginBottom: '16px' }}>
                        {dpp.description}
                      </p>
                    )}
                    {isSubjective && (
                      <span style={{
                        fontSize: '10px', fontWeight: '700', color: '#7c3aed',
                        background: '#ede9fe', borderRadius: '4px',
                        padding: '2px 7px', width: 'fit-content', marginBottom: '10px',
                        letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block',
                      }}>
                        Subjective
                      </span>
                    )}

                    {/* Progress State UI */}
                    {(() => {
                      const progress = savedProgress[dpp.id];

                      if (progress?.completed) {
                        return (
                          <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => reviewDpp(dpp)}
                              style={{
                                flex: 1, background: '#f3f4f6', color: 'var(--text-primary)',
                                border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '10px',
                                fontSize: '13px', fontWeight: '700',
                              }}
                            >
                              Review
                            </button>
                            <button
                              onClick={() => startDpp(dpp, true)}
                              style={{
                                flex: 1, background: accent, color: '#fff',
                                border: 'none', borderRadius: 'var(--radius)', padding: '10px',
                                fontSize: '13px', fontWeight: '700',
                              }}
                            >
                              Retake ↺
                            </button>
                          </div>
                        );
                      }

                      if (progress && !progress.completed) {
                        const answeredStr = progress.userAnswers?.filter(a => a !== null).length || 0;
                        return (
                          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ fontSize: '11px', color: accent, fontWeight: '700', textAlign: 'center' }}>
                              In Progress ({answeredStr}/{dpp.questions.length})
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => startDpp(dpp, true)}
                                style={{
                                  flex: 1, background: 'transparent', color: 'var(--text-muted)',
                                  border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '10px',
                                  fontSize: '13px', fontWeight: '600',
                                }}
                              >
                                Restart
                              </button>
                              <button
                                onClick={() => startDpp(dpp)}
                                style={{
                                  flex: 2, background: accent, color: '#fff',
                                  border: 'none', borderRadius: 'var(--radius)', padding: '10px',
                                  fontSize: '13px', fontWeight: '700',
                                }}
                              >
                                Resume →
                              </button>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <button
                          onClick={() => startDpp(dpp)}
                          style={{
                            width: '100%', background: accent, color: '#fff',
                            border: 'none', borderRadius: 'var(--radius)', padding: '10px 14px',
                            fontSize: '13px', fontWeight: '700', marginTop: 'auto',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                          }}
                          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                          {isSubjective ? 'Start Practice' : 'Start Quiz'} →
                        </button>
                      );
                    })()}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── VIEW 3: Quiz Runner ─── */}
        {currentDpp && !quizResults && (
          <QuizRunner dpp={currentDpp} onComplete={handleQuizComplete} />
        )}

        {/* ─── VIEW 4: Results ─── */}
        {currentDpp && quizResults && (
          <ResultsScreen
            dpp={currentDpp}
            results={quizResults}
            onRestart={handleRestart}
            onHome={handleBackToSubject}
          />
        )}
      </main>
    </div>
  );
}

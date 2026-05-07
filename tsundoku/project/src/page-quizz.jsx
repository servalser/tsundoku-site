// Quizz interactif — 5 questions, style manga
// Exports: QuizzPage

const QUIZZ = {
  title:    'Qui a tue L ?',
  subtitle: 'Death Note · par @Ryuzaki',
  plays:    842,
  tag:      'Death Note',
  kanji:    '謎',
  questions: [
    {
      q: 'Dans quel tome Light Yagami trouve-t-il le Death Note ?',
      choices: ['Tome 1', 'Tome 2', 'Tome 3', 'Tome 5'],
      answer: 0, ono: 'BAM !',
    },
    {
      q: 'Quel est le vrai nom de L ?',
      choices: ['Lawrence Langley', 'L Lawliet', 'Luciano Lee', "Liam L'Estrange"],
      answer: 1, ono: 'HMMM…',
    },
    {
      q: 'Quel Shinigami laisse tomber son Death Note sur Terre au debut ?',
      choices: ['Rem', 'Sidoh', 'Ryuk', 'Gelus'],
      answer: 2, ono: 'KUKUKU',
    },
    {
      q: 'Qui est reellement responsable de la mort de L ?',
      choices: ['Light Yagami directement', 'Misa Amane via Rem', 'Near', 'Mello'],
      answer: 1, ono: 'DOON !!',
    },
    {
      q: 'Combien de temps L et Light restent-ils menottes ensemble ?',
      choices: ['30 jours', '50 jours', '1 semaine', '3 mois'],
      answer: 1, ono: 'TSS !',
    },
  ],
};

function QuizzPage({ shop = 'toulon', theme = 'dark', onBack, onShopSwitch, onToggleTheme, onConnect, connected, onNav }) {
  const S      = TSUNDOKU[shop];
  const dark   = theme === 'dark';
  const bg     = dark ? '#0a0a12' : '#f7f5ef';
  const ink    = dark ? '#fff'    : '#111';
  const muted  = dark ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.55)';
  const cardBg = dark ? '#14141c' : '#fff';
  const border = dark ? 'rgba(255,255,255,.1)'  : 'rgba(0,0,0,.1)';

  const bp = useBreakpoint();
  const [phase,   setPhase]   = React.useState('intro'); // intro | play | done
  const [idx,     setIdx]     = React.useState(0);
  const [picked,  setPicked]  = React.useState(null);
  const [correct, setCorrect] = React.useState(0);
  const [streak,  setStreak]  = React.useState(0);

  const q        = QUIZZ.questions[idx];
  const revealed = picked !== null;

  const start = () => { setPhase('play'); setIdx(0); setPicked(null); setCorrect(0); setStreak(0); };

  const pick = (i) => {
    if (revealed) return;
    setPicked(i);
    if (i === q.answer) { setCorrect(c => c + 1); setStreak(s => s + 1); }
    else setStreak(0);
  };

  const next = () => {
    if (idx + 1 >= QUIZZ.questions.length) setPhase('done');
    else { setIdx(i => i + 1); setPicked(null); }
  };

  return (
    <div style={{ width: '100%', background: bg, color: ink, fontFamily: FONTS.body, minHeight: 800 }}>
      <Navbar
        shop={shop} theme={theme} connected={connected}
        active="Quizz"
        onConnect={onConnect} onBack={onBack}
        onToggleTheme={onToggleTheme} onShopSwitch={onShopSwitch} onNav={onNav}
      />

      {/* ── EN-TETE ── */}
      <div style={{
        position: 'relative',
        padding: bp.isMobile ? '46px 20px 32px' : bp.isTablet ? '50px 40px 36px' : '60px 60px 40px',
        overflow: 'hidden', background: S.bg, color: '#fff', borderBottom: `4px solid ${S.accent}`,
      }}>
        <div style={{ position: 'absolute', inset: 0, color: S.accent, opacity: .18, ...HALFTONE_MED }} />
        {!bp.isMobile && (
          <div style={{
            position: 'absolute', left: -20, bottom: -120,
            fontFamily: FONTS.jpDisplay, fontWeight: 900, fontSize: 420,
            color: S.accent, opacity: .16, lineHeight: .85,
          }}>{QUIZZ.kanji}</div>
        )}
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: S.accent, fontWeight: 700, marginBottom: 10 }}>
            QUIZZ COMMUNAUTE · クイズ
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <h1 style={{
                fontFamily: FONTS.display,
                fontSize: bp.isMobile ? 48 : bp.isTablet ? 66 : 84,
                lineHeight: .9, margin: 0, letterSpacing: -3, textShadow: `3px 3px 0 ${S.bgDeep}`,
              }}>
                {QUIZZ.title}
              </h1>
              <div style={{ marginTop: 10, fontSize: 14, opacity: .85, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span>◇ {QUIZZ.subtitle}</span>
                {!bp.isMobile && <><span>·</span><span>{QUIZZ.plays} joueurs</span></>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENU PRINCIPAL ── */}
      <div style={{
        padding: bp.isMobile ? '30px 16px 60px' : bp.isTablet ? '44px 40px 70px' : '60px 60px 80px',
        maxWidth: 1000, margin: '0 auto',
      }}>

        {/* Phase intro */}
        {phase === 'intro' && (
          <div style={{
            border: `3px solid ${ink}`, background: cardBg,
            padding: bp.isMobile ? 24 : 60,
            position: 'relative', overflow: 'hidden',
            boxShadow: `8px 8px 0 ${S.accent}`,
          }}>
            <div style={{ position: 'absolute', inset: 0, color: S.accent, opacity: .08, ...HALFTONE_SMALL }} />
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{
                display: 'inline-block', padding: '8px 16px',
                background: S.accent, color: S.bgDeep,
                fontFamily: FONTS.display, fontSize: 18, letterSpacing: -.5,
                transform: 'rotate(-3deg)', marginBottom: 20,
              }}>Regles du jeu</div>
              <div style={{
                fontFamily: FONTS.display,
                fontSize: bp.isMobile ? 28 : 42,
                lineHeight: 1.05, letterSpacing: -1, color: ink, maxWidth: 640, margin: '0 auto',
              }}>
                5 questions. Pas de chrono.
              </div>
              <div style={{
                marginTop: 20, fontSize: 15, color: muted, lineHeight: 1.6,
                maxWidth: 520, margin: '20px auto 0',
              }}>
                Reponds aux 5 questions, decouvre tes erreurs a chaque etape,
                et compare ton score a la fin.
              </div>
              <button onClick={start} style={{
                marginTop: 36, background: S.accent, color: S.bgDeep, border: 'none',
                padding: '18px 40px', fontWeight: 700, fontSize: 14, letterSpacing: 4,
                textTransform: 'uppercase', borderRadius: 99, cursor: 'pointer',
                fontFamily: FONTS.body, boxShadow: `4px 4px 0 ${ink}`,
              }}>▶ Commencer le quizz</button>
            </div>
          </div>
        )}

        {/* Phase jeu */}
        {phase === 'play' && (
          <>
            {/* Progression + score */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 30, gap: 30, flexWrap: 'wrap',
            }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 3, color: muted, fontWeight: 700 }}>QUESTION</div>
                <div style={{ fontFamily: FONTS.display, fontSize: 36, lineHeight: 1, letterSpacing: -1 }}>
                  {String(idx + 1).padStart(2, '0')}
                  <span style={{ color: muted }}> / {String(QUIZZ.questions.length).padStart(2, '0')}</span>
                </div>
              </div>

              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{
                  height: 8, background: dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)',
                  borderRadius: 99, overflow: 'hidden', border: `1px solid ${border}`,
                }}>
                  <div style={{
                    width: `${((idx + (revealed ? 1 : 0)) / QUIZZ.questions.length) * 100}%`,
                    height: '100%', background: S.accent, transition: 'width .4s ease',
                  }} />
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, letterSpacing: 3, color: muted, fontWeight: 700 }}>BONNES REPONSES</div>
                <div style={{ fontFamily: FONTS.display, fontSize: 36, lineHeight: 1, color: S.accent, letterSpacing: -1 }}>
                  {String(correct).padStart(2, '0')}
                  {streak >= 2 && (
                    <span style={{
                      fontFamily: FONTS.hand, fontSize: 22, color: '#ff3860',
                      marginLeft: 10, transform: 'rotate(-4deg)', display: 'inline-block',
                    }}>
                      🔥 streak × {streak}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Carte question — style case manga */}
            <div style={{
              border: `3px solid ${ink}`, background: cardBg, padding: 40,
              position: 'relative', overflow: 'hidden',
              boxShadow: `6px 6px 0 ${S.accent}`,
            }}>
              <div style={{ position: 'absolute', inset: 0, color: S.accent, opacity: .05, ...HALFTONE_SMALL }} />

              {/* Resultat de la reponse */}
              {revealed && (
                <div style={{
                  position: 'absolute', top: 20, right: 30,
                  fontFamily: FONTS.display, fontSize: 54, letterSpacing: -2,
                  color: picked === q.answer ? '#3bc97a' : '#ff3860',
                  textShadow: `3px 3px 0 ${ink}`, transform: 'rotate(-6deg)',
                }}>{picked === q.answer ? 'OUI !!' : 'NON…'}</div>
              )}

              <div style={{
                fontFamily: FONTS.hand, fontSize: 32, color: S.accent,
                transform: 'rotate(-3deg)', display: 'inline-block', marginBottom: 10,
              }}>{q.ono}</div>

              <div style={{
                fontFamily: FONTS.display, fontSize: 38, lineHeight: 1.1,
                letterSpacing: -1, color: ink, maxWidth: 700,
              }}>
                {q.q}
              </div>

              {/* Choix de reponses */}
              <div style={{ marginTop: 30, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {q.choices.map((c, i) => {
                  const isCorrect = i === q.answer;
                  const isPicked  = i === picked;
                  let borderC = ink, bg2 = cardBg, textC = ink;
                  if (revealed) {
                    if (isCorrect)      { borderC = '#3bc97a'; bg2 = dark ? 'rgba(59,201,122,.15)' : 'rgba(59,201,122,.2)'; }
                    else if (isPicked)  { borderC = '#ff3860'; bg2 = dark ? 'rgba(255,56,96,.15)'  : 'rgba(255,56,96,.2)';  }
                    else                { borderC = border; }
                  } else if (isPicked)  { borderC = S.accent; }

                  return (
                    <button key={i} onClick={() => pick(i)} disabled={revealed}
                      style={{
                        padding: '18px 20px', border: `2px solid ${borderC}`,
                        background: bg2, color: textC, fontFamily: FONTS.body,
                        fontSize: 16, fontWeight: 600, textAlign: 'left',
                        cursor: revealed ? 'default' : 'pointer',
                        display: 'flex', alignItems: 'center', gap: 14,
                        transition: 'all .15s',
                      }}>
                      <span style={{
                        width: 30, height: 30, borderRadius: 99,
                        border: `1.5px solid ${borderC}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: FONTS.display, fontSize: 14,
                        color: revealed && isCorrect ? '#3bc97a' : ink,
                        flexShrink: 0,
                      }}>{String.fromCharCode(65 + i)}</span>
                      <span style={{ flex: 1 }}>{c}</span>
                      {revealed && isCorrect  && <span style={{ color: '#3bc97a', fontSize: 20 }}>✓</span>}
                      {revealed && isPicked && !isCorrect && <span style={{ color: '#ff3860', fontSize: 20 }}>✗</span>}
                    </button>
                  );
                })}
              </div>

              {/* Bouton suivant */}
              {revealed && (
                <div style={{ marginTop: 26, display: 'flex', justifyContent: 'flex-end' }}>
                  <button onClick={next} style={{
                    background: S.accent, color: S.bgDeep, border: 'none',
                    padding: '14px 26px', fontWeight: 700, fontSize: 13,
                    letterSpacing: 3, textTransform: 'uppercase',
                    borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body,
                  }}>
                    {idx + 1 >= QUIZZ.questions.length ? 'Voir le score →' : 'Question suivante →'}
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Phase resultat final */}
        {phase === 'done' && (
          <div style={{
            border: `3px solid ${ink}`, background: cardBg, padding: 60,
            position: 'relative', overflow: 'hidden',
            boxShadow: `8px 8px 0 ${S.accent}`, textAlign: 'center',
          }}>
            <div style={{ position: 'absolute', inset: 0, color: S.accent, opacity: .05, ...HALFTONE_SMALL }} />
            <div style={{ position: 'relative' }}>
              <div style={{
                fontFamily: FONTS.display, fontSize: 28, color: S.accent,
                letterSpacing: -.5, marginBottom: 14,
                transform: 'rotate(-2deg)', display: 'inline-block',
              }}>FINI !!</div>
              <div style={{
                fontFamily: FONTS.display, fontSize: 84, lineHeight: .9,
                letterSpacing: -3, color: ink,
              }}>
                {correct}<span style={{ color: muted }}> / {QUIZZ.questions.length}</span>
              </div>
              <div style={{
                marginTop: 18, fontSize: 18, color: muted,
                fontFamily: FONTS.display, letterSpacing: -.3,
              }}>
                {correct === QUIZZ.questions.length ? '« Parfait. T\'es un vrai Kira. »'
                  : correct >= 3                    ? '« Pas mal, apprenti detective. »'
                  :                                   '« Faut relire le tome 1, Watari s\'inquiete. »'}
              </div>
              <div style={{ marginTop: 36, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={start} style={{
                  padding: '14px 26px', background: 'transparent', color: ink,
                  border: `2px solid ${ink}`, fontWeight: 700, fontSize: 13,
                  letterSpacing: 2, textTransform: 'uppercase',
                  borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body,
                }}>↻ Rejouer</button>
                <button onClick={() => onNav && onNav('shop')} style={{
                  padding: '14px 26px', background: ink, color: bg, border: 'none',
                  fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
                  borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body,
                }}>Retour accueil →</button>
              </div>
            </div>
          </div>
        )}

        {/* Autres quizz communautaires */}
        <div style={{ marginTop: 60 }}>
          <div style={{
            fontSize: 11, letterSpacing: 4, color: S.accent, fontWeight: 700,
            marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 24, height: 1, background: S.accent }} />
            Autres quizz · もっと
          </div>
          <h2 style={{ fontFamily: FONTS.display, fontSize: 44, margin: '0 0 24px', letterSpacing: -1.5 }}>
            Par la communaute.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { t: 'Ordre des arcs de Naruto',          a: '@Kakashi_07', plays: 1204, emoji: '🍜' },
              { t: 'Stand ou pas Stand ?',               a: '@JojoFan83',  plays: 457,  emoji: '☆' },
              { t: 'Reconnais le mangaka a son style',   a: '@inkline',    plays: 289,  emoji: '✒️' },
            ].map((qz, i) => (
              <div key={i} style={{
                border: `2px solid ${ink}`, background: cardBg, padding: 18,
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', inset: 0, color: S.accent, opacity: .06, ...HALFTONE_SMALL }} />
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ fontSize: 32 }}>{qz.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONTS.display, fontSize: 18, lineHeight: 1.1, color: ink, letterSpacing: -.3 }}>
                      {qz.t}
                    </div>
                    <div style={{ fontSize: 11, color: muted, marginTop: 4 }}>
                      par {qz.a} · {qz.plays} joueurs
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer shop={shop} theme={theme} />
    </div>
  );
}

Object.assign(window, { QuizzPage });

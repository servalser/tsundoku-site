// Fiche manga — page de detail
// Exports: MangaDetailPage

function MangaDetailPage({ shop = 'toulon', theme = 'dark', mangaId = 'cs', onBack, onShopSwitch, onToggleTheme, onConnect, connected, onNav }) {
  const S      = TSUNDOKU[shop];
  const dark   = theme === 'dark';
  const bg     = dark ? '#0a0a12' : '#f7f5ef';
  const ink    = dark ? '#fff'    : '#111';
  const muted  = dark ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.55)';
  const cardBg = dark ? '#14141c' : '#fff';
  const border = dark ? 'rgba(255,255,255,.1)'  : 'rgba(0,0,0,.1)';

  const bp = useBreakpoint();
  // Utilise le catalogue importe si disponible, sinon le catalogue statique
  const catalog = typeof getActiveCatalog === 'function' ? getActiveCatalog() : MANGAS;
  const m = catalog.find(x => x.id === mangaId) || catalog[0] || MANGAS[0];

  // Titres similaires (meme genre, max 4)
  const similar = catalog.filter(x => x.tag === m.tag && x.id !== m.id).slice(0, 4);

  return (
    <div style={{ width: '100%', background: bg, color: ink, fontFamily: FONTS.body, minHeight: 800 }}>
      <Navbar
        shop={shop} theme={theme} connected={connected}
        active="Reservations"
        onConnect={onConnect} onBack={onBack}
        onToggleTheme={onToggleTheme} onShopSwitch={onShopSwitch} onNav={onNav}
      />

      {/* CHEMIN DE NAVIGATION */}
      <div style={{
        padding: bp.isMobile ? '16px 20px 0' : '24px 60px 0',
        maxWidth: 1400, margin: '0 auto',
        fontSize: 11, letterSpacing: 2, color: muted,
        textTransform: 'uppercase', fontWeight: 600,
      }}>
        <span style={{ cursor: 'pointer' }} onClick={() => onNav && onNav('catalog')}>Reservations</span>
        <span style={{ margin: '0 10px' }}>›</span>
        <span style={{ cursor: 'pointer' }}>{m.tag}</span>
        <span style={{ margin: '0 10px' }}>›</span>
        <span style={{ color: S.accent }}>{m.title} {m.vol}</span>
      </div>

      {/* ── BLOC PRINCIPAL : couverture + infos ── */}
      <div style={{
        padding: bp.isMobile ? '24px 20px 50px' : bp.isTablet ? '36px 40px 60px' : '40px 60px 70px',
        maxWidth: 1400, margin: '0 auto',
      }}>
        {/* 2 cols desktop → 1 col mobile (couverture au-dessus, infos en-dessous) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: bp.isDesktop ? '1fr 1.3fr' : '1fr',
          gap: bp.isMobile ? 28 : 60, alignItems: 'flex-start',
        }}>

          {/* COLONNE GAUCHE — couverture */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'relative', maxWidth: 420, margin: '0 auto' }}>
              <FakeCover m={m} />
              {/* Lignes de vitesse en fond */}
              <div style={{
                position: 'absolute', inset: -30,
                color: S.accent, opacity: dark ? .07 : .13,
                ...SPEED_LINES('currentColor'), zIndex: -1,
                maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
              }} />
            </div>

            {/* Vignettes */}
            <div style={{ marginTop: 24, display: 'flex', gap: 10, justifyContent: 'center' }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{
                  width: 64, height: 80,
                  border: i === 0 ? `2px solid ${S.accent}` : `1px solid ${border}`,
                  background: i === 0 ? m.accent : cardBg,
                  position: 'relative', overflow: 'hidden', cursor: 'pointer',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    color: 'rgba(0,0,0,.3)', ...HALFTONE_SMALL,
                    opacity: i === 0 ? .6 : .2,
                  }} />
                  {i === 0 && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: FONTS.jpDisplay, fontWeight: 900, color: '#111', fontSize: 28,
                    }}>{m.kanji}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* COLONNE DROITE — infos + reservation */}
          <div>
            <div style={{
              fontSize: 11, letterSpacing: 4, color: S.accent, fontWeight: 700,
              marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ width: 24, height: 1, background: S.accent }} />
              {m.tag} · {m.vol}
            </div>
            <h1 style={{
              fontFamily: FONTS.display,
              fontSize: bp.isMobile ? 48 : bp.isTablet ? 64 : 80,
              lineHeight: .9, margin: 0, letterSpacing: -3, color: ink,
            }}>
              {m.title}
            </h1>
            <div style={{ marginTop: 10, fontSize: 17, color: muted, fontWeight: 500 }}>
              par <span style={{ color: ink, fontWeight: 700 }}>{m.author}</span> · {m.year}
            </div>

            {/* Prix */}
            <div style={{
              marginTop: 28, paddingTop: 20,
              borderTop: `1px solid ${border}`,
            }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: muted, fontWeight: 700, marginBottom: 4 }}>PRIX</div>
              <div style={{
                fontFamily: FONTS.display, fontSize: 52,
                lineHeight: 1, color: ink, letterSpacing: -2,
              }}>{m.price}</div>
            </div>

            {/* Bouton reserver */}
            <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                onClick={() => onNav && onNav('catalog')}
                style={{
                  background: S.accent, color: S.bgDeep, border: 'none',
                  padding: '16px 26px', fontWeight: 700, fontSize: 13,
                  letterSpacing: 3, textTransform: 'uppercase',
                  borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body, flex: 1,
                }}
              >
                Reserver ce manga →
              </button>
            </div>

            <div style={{
              marginTop: 14, fontSize: 12, color: muted, lineHeight: 1.5,
              padding: '12px 14px', background: cardBg, border: `1px solid ${border}`,
            }}>
              ◇ <b style={{ color: ink }}>Click & collect gratuit</b> · mis de cote pendant 7 jours —
              vous payez en boutique lors de votre passage.
            </div>

            {/* Resume */}
            <div style={{ marginTop: 36 }}>
              <div style={{
                fontSize: 11, letterSpacing: 3, color: S.accent,
                fontWeight: 700, textTransform: 'uppercase', marginBottom: 16,
              }}>
                Resume
              </div>
              <div style={{
                fontSize: 15, lineHeight: 1.7,
                color: dark ? 'rgba(255,255,255,.8)' : 'rgba(0,0,0,.75)',
              }}>
                <p style={{ margin: 0 }}>
                  Denji, 16 ans, croule sous les dettes de son pere. Pour survivre, il chasse les Demons
                  avec son fidele Pochita, une creature mi-tronconneuse mi-chien. Quand la trahison le tue,
                  Pochita fusionne avec lui — et Chainsaw Man est ne.
                </p>
                <p style={{ marginTop: 14 }}>
                  Dans ce tome <b style={{ color: ink }}>{m.vol}</b>, Fujimoto pousse son heros dans
                  ses retranchements les plus visceraux. Un cliffhanger monumental.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MANGAS SIMILAIRES ── */}
      <div style={{
        padding: bp.isMobile ? '40px 20px 60px' : bp.isTablet ? '50px 40px 70px' : '70px 60px',
        maxWidth: 1400, margin: '0 auto',
      }}>
        <div style={{
          fontSize: 11, letterSpacing: 4, color: S.accent, fontWeight: 700,
          marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ width: 24, height: 1, background: S.accent }} />
          Dans le meme rayon · おすすめ
        </div>
        <h2 style={{
          fontFamily: FONTS.display,
          fontSize: bp.isMobile ? 32 : 48,
          margin: '0 0 24px', letterSpacing: -1.5,
        }}>
          Tu aimeras aussi.
        </h2>
        {/* 2 cols mobile → 4 cols desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: bp.isMobile ? 'repeat(2, 1fr)' : bp.isTablet ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
          gap: bp.isMobile ? 14 : 22,
        }}>
          {similar.map(sm => (
            <div key={sm.id} onClick={() => onNav && onNav('manga', sm.id)} style={{ cursor: 'pointer' }}>
              <FakeCover m={sm} />
              <div style={{ marginTop: 12 }}>
                <div style={{
                  fontSize: 10, letterSpacing: 2, color: S.accent,
                  fontWeight: 700, textTransform: 'uppercase',
                }}>
                  {sm.tag} · {sm.vol}
                </div>
                <div style={{ fontFamily: FONTS.display, fontSize: 20, letterSpacing: -.5, marginTop: 2 }}>
                  {sm.title}
                </div>
                <div style={{ fontSize: 12, color: muted, marginTop: 2 }}>{sm.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer shop={shop} theme={theme} />
    </div>
  );
}

Object.assign(window, { MangaDetailPage });

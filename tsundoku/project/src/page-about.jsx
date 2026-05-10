// Page A propos — histoire, equipe, valeurs
// Exports: AboutPage

const TEAM = [
  { name: 'Armony',  role: 'Libraire · Toulon',    kanji: '花', accent: '#ff7db8', bio: 'Toujours un manga a recommander et un avis tranche sur les derniers chapitres.' },
  { name: 'Damien',  role: 'Libraire · Toulon',    kanji: '力', accent: '#f4c83d', bio: 'Specialiste shonen, il peut debattre pendant des heures de quel arc de One Piece est le meilleur.' },
  { name: 'Fred',    role: 'Libraire · Marseille',  kanji: '海', accent: '#e8b648', bio: 'Fan de seinen et de recits sombres. Si vous cherchez du Berserk ou du Vagabond, c\'est lui qu\'il faut voir.' },
  { name: 'Fanny',   role: 'Libraire · Marseille',  kanji: '星', accent: '#8cd3a0', bio: 'Elle gere les evenements et connait chaque client par son prenom. Ambiance garantie.' },
];

const VALEURS = [
  { num: '01', title: 'Des humains, pas des algos', desc: 'Nos recommandations viennent de l\'equipe — des gens qui ont lu les mangas qu\'ils conseillent.' },
  { num: '02', title: 'Le manga comme art',          desc: 'On traite chaque tome avec le meme respect qu\'un roman graphique. Parce que c\'en est un.' },
  { num: '03', title: 'La communaute d\'abord',      desc: 'Les quizz du mercredi, les evenements, les dedicaces — tout est la pour que les clients se retrouvent.' },
];

const TIMELINE = [
  { year: '2018', event: 'Ouverture Toulon · 30 m² rue Pierre Semard',       kanji: '開' },
  { year: '2019', event: 'Premier evenement : dedicace Gege Akutami',         kanji: '会' },
  { year: '2020', event: 'Creation des quizz communautaires du mercredi',     kanji: '謎' },
  { year: '2021', event: 'Ouverture Marseille · cours Pierre Puget',          kanji: '海' },
  { year: '2023', event: 'Passage a 12 000 volumes en stock',                 kanji: '本' },
  { year: '2026', event: 'Lancement du service de reservation en ligne',      kanji: '予' },
];

function AboutPage({ shop = 'toulon', theme = 'dark', onBack, onShopSwitch, onToggleTheme, onConnect, connected, onNav }) {
  const S      = TSUNDOKU[shop];
  const dark   = theme === 'dark';
  const bg     = dark ? '#0a0a12' : '#f7f5ef';
  const ink    = dark ? '#fff'    : '#111';
  const muted  = dark ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.55)';
  const cardBg = dark ? '#14141c' : '#fff';
  const border = dark ? 'rgba(255,255,255,.1)'  : 'rgba(0,0,0,.1)';
  const bp     = useBreakpoint();

  return (
    <div style={{ width: '100%', background: bg, color: ink, fontFamily: FONTS.body, minHeight: 800 }}>
      <Navbar
        shop={shop} theme={theme} connected={connected}
        active="A propos"
        onConnect={onConnect} onBack={onBack}
        onToggleTheme={onToggleTheme} onShopSwitch={onShopSwitch} onNav={onNav}
      />

      {/* ── EN-TETE ── */}
      <div style={{
        position: 'relative',
        padding: bp.isMobile ? '50px 20px 60px' : bp.isTablet ? '60px 40px 70px' : '80px 60px 90px',
        overflow: 'hidden', background: S.bg, color: '#fff', borderBottom: `4px solid ${S.accent}`,
      }}>
        <div style={{ position: 'absolute', inset: 0, color: S.accent, opacity: .15, ...HALFTONE_MED }} />
        <div style={{
          position: 'absolute', inset: 0, color: S.accent, opacity: .06,
          ...SPEED_LINES('currentColor'),
          maskImage: 'radial-gradient(circle at 75% 40%, transparent 20%, black 65%)',
          WebkitMaskImage: 'radial-gradient(circle at 75% 40%, transparent 20%, black 65%)',
        }} />
        {/* Kanji géant de fond — masqué sur mobile */}
        {!bp.isMobile && (
          <div style={{
            position: 'absolute', right: -40, top: -80,
            fontFamily: FONTS.jpDisplay, fontWeight: 900,
            fontSize: bp.isTablet ? 300 : 560,
            color: S.accent, opacity: .15, lineHeight: .82, letterSpacing: -20,
          }}>本</div>
        )}
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
          <div style={{
            fontSize: 11, letterSpacing: 4, color: S.accent, fontWeight: 700,
            marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 24, height: 1, background: S.accent }} />
            A propos · 私たちについて
          </div>
          <h1 style={{
            fontFamily: FONTS.display,
            fontSize: bp.isMobile ? 52 : bp.isTablet ? 72 : 100,
            lineHeight: .88, margin: 0, letterSpacing: -4, textShadow: `5px 5px 0 ${S.bgDeep}`,
          }}>
            L'histoire<br />
            <span style={{ color: S.accent }}>de Tsundoku.</span>
          </h1>
          {!bp.isMobile && (
            <div style={{ marginTop: 22, maxWidth: 580, fontSize: 17, lineHeight: 1.6, opacity: .88 }}>
              Tsundoku (積ん読) signifie « acheter des livres et les laisser s'empiler ».
              On a fonde cette librairie pour que ca n'arrive plus — ou au moins,
              pour que la pile soit belle.
            </div>
          )}
        </div>
      </div>

      {/* ── HISTOIRE + TIMELINE ── */}
      <div style={{
        padding: bp.isMobile ? '50px 20px' : bp.isTablet ? '60px 40px' : '90px 60px',
        maxWidth: 1400, margin: '0 auto',
      }}>
        {/* 2 cols desktop → 1 col mobile/tablet */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: bp.isDesktop ? '1fr 1fr' : '1fr',
          gap: bp.isMobile ? 40 : 80, alignItems: 'flex-start',
        }}>
          <div>
            <div style={{
              fontSize: 11, letterSpacing: 4, color: S.accent, fontWeight: 700,
              marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ width: 24, height: 1, background: S.accent }} />
              L'histoire · 歴史
            </div>
            <h2 style={{
              fontFamily: FONTS.display,
              fontSize: bp.isMobile ? 40 : bp.isTablet ? 52 : 64,
              lineHeight: .9, margin: 0, letterSpacing: -2, color: ink,
            }}>
              Depuis 2018,<br />a Toulon.
            </h2>
            <div style={{
              marginTop: 24, fontSize: 16, lineHeight: 1.75,
              color: dark ? 'rgba(255,255,255,.82)' : 'rgba(0,0,0,.72)',
            }}>
              <p style={{ margin: '0 0 16px' }}>
                Tsundoku a ouvert ses portes en mai 2018, rue Pierre Semard a Toulon.
                Au depart 30 m², 800 volumes et une equipe de deux personnes. Aujourd'hui :
                deux boutiques, plus de 12 000 references, et des mercredis de sortie
                qui attirent des files devant la porte.
              </p>
              <p style={{ margin: 0 }}>
                En 2021, Nassim Belaid rejoint l'aventure pour ouvrir Tsundoku Marseille.
                Meme ADN, meme passion — juste la Mediterranee qui change de couleur.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative', paddingLeft: 40 }}>
            <div style={{
              position: 'absolute', left: 8, top: 6, bottom: 6, width: 2,
              background: `linear-gradient(to bottom, ${S.accent}, ${S.accent}18)`,
            }} />
            {TIMELINE.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 28, position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: -34, top: 7,
                  width: 12, height: 12, borderRadius: 99, background: S.accent,
                  boxShadow: `0 0 0 4px ${S.accent}33`,
                }} />
                <div>
                  <div style={{
                    fontFamily: FONTS.display, fontSize: 24, color: S.accent,
                    letterSpacing: -1, lineHeight: 1,
                  }}>
                    {item.year}
                    <span style={{ fontFamily: FONTS.jpDisplay, fontSize: 18, marginLeft: 10, opacity: .65 }}>
                      {item.kanji}
                    </span>
                  </div>
                  <div style={{ fontSize: 14, color: muted, marginTop: 4, lineHeight: 1.45 }}>
                    {item.event}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── VALEURS ── */}
      <div style={{
        background: S.bg,
        padding: bp.isMobile ? '50px 20px' : bp.isTablet ? '60px 40px' : '80px 60px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, color: S.accent, opacity: .1, ...HALFTONE_MED }} />
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
          <div style={{
            fontSize: 11, letterSpacing: 4, color: S.accent, fontWeight: 700,
            marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 24, height: 1, background: S.accent }} />
            Nos valeurs · 価値観
          </div>
          <h2 style={{
            fontFamily: FONTS.display,
            fontSize: bp.isMobile ? 40 : bp.isTablet ? 56 : 72,
            lineHeight: .9, margin: '0 0 36px', letterSpacing: -2, color: '#fff',
          }}>
            Ce qui nous<br />
            <span style={{ color: S.accent }}>anime.</span>
          </h2>
          {/* 1 col mobile → 2 col tablette → 3 col desktop */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: bp.isMobile ? '1fr' : bp.isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: bp.isMobile ? 14 : 24,
          }}>
            {VALEURS.map((v, i) => (
              <div key={i} style={{
                background: 'rgba(0,0,0,.25)', border: `1px solid ${S.accent}33`,
                padding: '30px 28px',
              }}>
                <div style={{
                  fontFamily: FONTS.display, fontSize: 56, color: S.accent,
                  lineHeight: 1, letterSpacing: -2, marginBottom: 16, opacity: .7,
                }}>{v.num}</div>
                <div style={{
                  fontFamily: FONTS.display, fontSize: 28, color: '#fff',
                  letterSpacing: -.5, marginBottom: 12, lineHeight: 1.1,
                }}>{v.title}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,.7)', lineHeight: 1.6 }}>
                  {v.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EQUIPE ── */}
      <div style={{
        padding: bp.isMobile ? '50px 20px' : bp.isTablet ? '60px 40px' : '90px 60px',
        maxWidth: 1400, margin: '0 auto',
      }}>
        <div style={{
          fontSize: 11, letterSpacing: 4, color: S.accent, fontWeight: 700,
          marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ width: 24, height: 1, background: S.accent }} />
          L'equipe · チーム
        </div>
        <h2 style={{
          fontFamily: FONTS.display,
          fontSize: bp.isMobile ? 40 : bp.isTablet ? 56 : 72,
          lineHeight: .9, margin: '0 0 36px', letterSpacing: -2, color: ink,
        }}>
          Ceux qui font<br />
          <span style={{ color: S.accent }}>la boutique.</span>
        </h2>
        {/* 1 col mobile → 2 col tablette/desktop → 4 col large desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: bp.isMobile ? 'repeat(2, 1fr)' : bp.isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: bp.isMobile ? 12 : 24,
        }}>
          {TEAM.map((member, i) => (
            <div key={i} style={{
              border: `2px solid ${border}`, background: cardBg,
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Avatar stylise BD */}
              <div style={{
                height: 220,
                background: `linear-gradient(135deg, ${S.bg} 0%, ${S.bgDeep} 100%)`,
                position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ position: 'absolute', inset: 0, color: member.accent, opacity: .22, ...HALFTONE_SMALL }} />
                <div style={{
                  fontFamily: FONTS.jpDisplay, fontWeight: 900, fontSize: 120,
                  color: member.accent, opacity: .9, lineHeight: 1,
                  textShadow: `4px 4px 0 rgba(0,0,0,.4)`,
                }}>{member.kanji}</div>
              </div>
              <div style={{ padding: '20px 20px 24px' }}>
                <div style={{
                  fontSize: 10, letterSpacing: 2, color: S.accent,
                  fontWeight: 700, textTransform: 'uppercase', marginBottom: 6,
                }}>{member.role}</div>
                <div style={{
                  fontFamily: FONTS.display, fontSize: 22, lineHeight: 1,
                  letterSpacing: -.5, color: ink,
                }}>{member.name}</div>
                <div style={{ marginTop: 12, fontSize: 13, color: muted, lineHeight: 1.6 }}>
                  {member.bio}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA rejoindre ── */}
      <div style={{
        padding: bp.isMobile ? '40px 20px 60px' : '70px 60px 90px',
        maxWidth: 1400, margin: '0 auto',
        borderTop: `1px solid ${border}`,
        display: 'flex',
        flexDirection: bp.isMobile ? 'column' : 'row',
        alignItems: bp.isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between', gap: 28, flexWrap: 'wrap',
      }}>
        <div>
          <div style={{
            fontFamily: FONTS.display,
            fontSize: bp.isMobile ? 34 : 56,
            letterSpacing: -2, lineHeight: .9, color: ink,
          }}>
            Tu veux nous rejoindre ?
          </div>
          <div style={{ marginTop: 14, fontSize: 15, color: muted, maxWidth: 520, lineHeight: 1.6 }}>
            On recrute ponctuellement des libraires passionnes.
            Depose ta candidature en boutique ou ecris-nous.
          </div>
        </div>
        <button onClick={() => onNav && onNav('contact')} style={{
          background: S.accent, color: S.bgDeep, border: 'none',
          padding: '18px 32px', fontWeight: 700, fontSize: 14,
          letterSpacing: 3, textTransform: 'uppercase',
          borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body,
          whiteSpace: 'nowrap', boxShadow: `0 0 0 4px ${S.accent}44`,
        }}>Nous contacter →</button>
      </div>

      <Footer shop={shop} theme={theme} />
    </div>
  );
}

Object.assign(window, { AboutPage });

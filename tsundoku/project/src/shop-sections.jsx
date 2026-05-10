// Sections de la page d'accueil boutique
// Exports: Section, QuizzTeaser, InstaFeed, Events, Reviews, Infos, Footer, ShopHomepage

// Composant de section générique avec en-tête
function Section({ label, title, dark, shop, children, cta }) {
  const S     = TSUNDOKU[shop];
  const ink   = dark ? '#fff'  : '#111';
  const bp    = useBreakpoint();

  // Padding responsive : plus compact sur mobile
  const sectionPad = bp.isMobile ? '60px 20px' : bp.isTablet ? '70px 40px' : '90px 60px';
  // Taille du titre responsive
  const titleSize  = bp.isMobile ? 36 : bp.isTablet ? 48 : 60;

  return (
    <section style={{ padding: sectionPad, color: ink, position: 'relative' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          // Sur mobile : empiler titre et CTA verticalement
          flexDirection: bp.isMobile ? 'column' : 'row',
          alignItems: bp.isMobile ? 'flex-start' : 'flex-end',
          justifyContent: 'space-between',
          gap: bp.isMobile ? 16 : 40,
          marginBottom: bp.isMobile ? 28 : 40,
          flexWrap: 'wrap',
        }}>
          <div>
            <div style={{
              fontSize: 11, letterSpacing: 4, color: S.accent,
              textTransform: 'uppercase', fontWeight: 700, marginBottom: 10,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ width: 24, height: 1, background: S.accent }} />
              {label}
            </div>
            <h2 style={{
              fontFamily: FONTS.display, fontSize: titleSize, lineHeight: .95,
              margin: 0, letterSpacing: -1,
            }}>{title}</h2>
          </div>
          {cta && (
            <a href="#" style={{
              color: ink, textDecoration: 'none', fontSize: 12, letterSpacing: 3,
              textTransform: 'uppercase', fontWeight: 700, padding: '10px 16px',
              border: `1px solid ${dark ? 'rgba(255,255,255,.2)' : 'rgba(0,0,0,.15)'}`,
              borderRadius: 99,
            }}>{cta} →</a>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

// ── Bloc "Réservez un manga" ──────────────────────────────────────────────────
function ResaHighlight({ shop, theme, onNav }) {
  const S    = TSUNDOKU[shop];
  const dark = theme === 'dark';
  const bp   = useBreakpoint();

  const steps = [
    { num: '01', title: 'Cherchez',   desc: 'Parcourez les titres disponibles ou tapez directement le nom du manga voulu.' },
    { num: '02', title: 'Reservez',   desc: `Selectionnez jusqu'a ${typeof RESA_LIMIT !== 'undefined' ? RESA_LIMIT : '…'} titres — on les met de cote pour vous.` },
    { num: '03', title: 'Recuperez',  desc: 'Passez en boutique dans les 7 jours. Paiement sur place, aucun frais en ligne.' },
  ];

  const sectionPad = bp.isMobile ? '60px 20px' : bp.isTablet ? '70px 40px' : '80px 60px';
  const titleSize  = bp.isMobile ? 40 : bp.isTablet ? 56 : 72;

  // Colonnes de la grille d'étapes : 1 col mobile → 2 col tablette → 3 col desktop
  const stepCols = bp.isMobile ? '1fr' : bp.isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';

  return (
    <section style={{ background: S.bg, padding: sectionPad, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, color: S.accent, opacity: .1, ...HALFTONE_MED }} />
      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>

        {/* En-tête */}
        <div style={{
          display: 'flex',
          flexDirection: bp.isMobile ? 'column' : 'row',
          alignItems: bp.isMobile ? 'flex-start' : 'flex-end',
          justifyContent: 'space-between',
          gap: bp.isMobile ? 20 : 40,
          marginBottom: bp.isMobile ? 32 : 56,
          flexWrap: 'wrap',
        }}>
          <div>
            <div style={{
              fontSize: 11, letterSpacing: 4, color: S.accent, fontWeight: 700,
              marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ width: 24, height: 1, background: S.accent }} />
              Reservations · 予約
            </div>
            <h2 style={{
              fontFamily: FONTS.display, fontSize: titleSize, lineHeight: .9,
              margin: 0, letterSpacing: -2, color: '#fff',
            }}>
              Reservez,<br/>
              <span style={{ color: S.accent }}>on met de cote.</span>
            </h2>
          </div>
          <button onClick={() => onNav && onNav('catalog')} style={{
            background: S.accent, color: S.bgDeep, border: 'none',
            padding: bp.isMobile ? '14px 22px' : '18px 32px',
            fontWeight: 700, fontSize: bp.isMobile ? 12 : 14,
            letterSpacing: 3, textTransform: 'uppercase',
            borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body,
            boxShadow: `0 0 0 4px ${S.accent}44`,
            alignSelf: bp.isMobile ? 'stretch' : 'flex-end',
          }}>
            Reserver un manga →
          </button>
        </div>

        {/* 3 étapes — grille responsive */}
        <div style={{ display: 'grid', gridTemplateColumns: stepCols, gap: 16 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(0,0,0,.25)', border: `1px solid ${S.accent}33`,
              padding: bp.isMobile ? '22px 20px' : '28px 26px',
            }}>
              <div style={{
                fontFamily: FONTS.display,
                fontSize: bp.isMobile ? 40 : 56,
                color: S.accent, lineHeight: 1, letterSpacing: -2, marginBottom: 12, opacity: .7,
              }}>{s.num}</div>
              <div style={{
                fontFamily: FONTS.display,
                fontSize: bp.isMobile ? 22 : 28,
                color: '#fff', letterSpacing: -.5, marginBottom: 10,
              }}>{s.title}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,.7)', lineHeight: 1.6 }}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Teaser Quizz ─────────────────────────────────────────────────────────────
function QuizzTeaser({ shop, theme, onNav }) {
  const S      = TSUNDOKU[shop];
  const dark   = theme === 'dark';
  const bp     = useBreakpoint();
  const panelBg = dark ? '#0f0f18' : '#faf8f3';
  const cardBg  = dark ? '#18181f' : '#fff';
  const border  = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)';
  const ink     = dark ? '#fff'  : '#111';
  const muted   = dark ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.55)';

  const quizzes = [
    { title: 'Qui a tue L ?',              author: '@Ryuzaki',   plays: 842,  tag: 'Death Note', emoji: '🍎', color: S.accent },
    { title: 'Ordre des arcs de Naruto',   author: '@Kakashi_07', plays: 1204, tag: 'Naruto',    emoji: '🍜', color: S.accent },
    { title: 'Stand ou pas Stand ?',       author: '@JojoFan83', plays: 457,  tag: 'JoJo',      emoji: '☆',  color: S.accent },
  ];

  const sectionPad = bp.isMobile ? '60px 20px' : bp.isTablet ? '70px 40px' : '90px 60px';
  const titleSize  = bp.isMobile ? 36 : bp.isTablet ? 52 : 72;

  return (
    <section style={{ background: panelBg, padding: sectionPad, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, color: S.accent,
        opacity: dark ? .05 : .08, ...SPEED_LINES(`${S.accent}`),
      }} />
      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
        {/* Sur desktop : 2 colonnes (texte + grille de cards). Sur mobile/tablette : une seule colonne. */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: bp.isDesktop ? '1fr 1fr' : '1fr',
          gap: bp.isMobile ? 36 : 60,
          alignItems: 'center',
        }}>
          {/* Texte de présentation */}
          <div>
            <div style={{
              fontSize: 11, letterSpacing: 4, color: S.accent,
              textTransform: 'uppercase', fontWeight: 700, marginBottom: 10,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ width: 24, height: 1, background: S.accent }} />
              Communaute · クイズ
            </div>
            <h2 style={{
              fontFamily: FONTS.display, fontSize: titleSize, lineHeight: .95,
              margin: 0, letterSpacing: -2, color: ink,
            }}>
              Les quizz<br/>de la maison.
            </h2>
            <p style={{ fontSize: bp.isMobile ? 15 : 17, lineHeight: 1.6, color: muted, marginTop: 20, maxWidth: 440 }}>
              Les quizz viennent des clients. Teste tes connaissances
              ou cree le tien directement en boutique.
            </p>
            <button onClick={() => onNav && onNav('quizz')} style={{
              marginTop: 30,
              background: S.accent, color: S.bgDeep, border: 'none',
              padding: bp.isMobile ? '14px 20px' : '14px 22px',
              fontWeight: 700, fontSize: 13, letterSpacing: 3,
              textTransform: 'uppercase', borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body,
            }}>Jouer maintenant →</button>
          </div>

          {/* Grille manga-panel — masquée sur mobile pour alléger la page */}
          {!bp.isMobile && (
            <div style={{
              display: 'grid', gridTemplateColumns: '1.4fr 1fr', gridTemplateRows: 'repeat(3, 1fr)',
              gap: 10, height: bp.isTablet ? 360 : 440,
            }}>
              {/* Grande case */}
              <div style={{
                gridRow: 'span 2',
                border: `2px solid ${ink}`, background: cardBg, padding: 20,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', inset: 0, color: S.accent, opacity: .15, ...HALFTONE_SMALL }} />
                <div style={{ position: 'relative' }}>
                  <div style={{ fontSize: 10, letterSpacing: 3, color: muted, fontWeight: 700 }}>
                    #01 · {quizzes[0].tag}
                  </div>
                  <div style={{ fontFamily: FONTS.display, fontSize: 30, color: ink, lineHeight: 1, marginTop: 10, letterSpacing: -1 }}>
                    {quizzes[0].title}
                  </div>
                  <div style={{ fontFamily: FONTS.hand, fontSize: 28, color: S.accent, transform: 'rotate(-6deg)', marginTop: 16 }}>
                    « impossible ! »
                  </div>
                </div>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div style={{ fontSize: 11, color: muted }}>
                    <div>par {quizzes[0].author}</div>
                    <div style={{ marginTop: 4 }}>{quizzes[0].plays} joueurs</div>
                  </div>
                  <div style={{ fontSize: 40 }}>{quizzes[0].emoji}</div>
                </div>
              </div>

              {/* Case accent */}
              <div style={{
                border: `2px solid ${ink}`, background: S.accent,
                padding: 16, color: S.bgDeep, position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ fontSize: 10, letterSpacing: 3, fontWeight: 700 }}>#02 · {quizzes[1].tag}</div>
                <div style={{ fontFamily: FONTS.display, fontSize: 22, lineHeight: 1.05, marginTop: 8, letterSpacing: -.5 }}>
                  {quizzes[1].title}
                </div>
                <div style={{
                  position: 'absolute', right: -10, bottom: -20,
                  fontFamily: FONTS.jpDisplay, fontWeight: 900, fontSize: 100, opacity: .3, lineHeight: 1,
                }}>ン</div>
              </div>

              {/* Petite case */}
              <div style={{
                border: `2px solid ${ink}`, background: cardBg, padding: 16, color: ink,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{ fontSize: 36 }}>{quizzes[2].emoji}</div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: muted, fontWeight: 700 }}>#03 · {quizzes[2].tag}</div>
                  <div style={{ fontFamily: FONTS.display, fontSize: 18, lineHeight: 1.1, marginTop: 2 }}>
                    {quizzes[2].title}
                  </div>
                </div>
              </div>

              {/* Bande du bas */}
              <div style={{
                gridColumn: 'span 2',
                border: `2px solid ${ink}`, background: cardBg, padding: '14px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: ink,
              }}>
                <div style={{ fontSize: 13, color: muted }}>
                  <b style={{ color: ink }}>+ 23 quizz</b> crees par la communaute cette semaine
                </div>
                <div style={{ fontFamily: FONTS.hand, fontSize: 24, color: S.accent, transform: 'rotate(-3deg)' }}>
                  a toi de jouer →
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Feed Instagram ────────────────────────────────────────────────────────────
function InstaFeed({ shop, theme }) {
  const S       = TSUNDOKU[shop];
  const dark    = theme === 'dark';
  const bp      = useBreakpoint();
  const cardBorder = dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)';

  const posts = [
    { caption: 'Arrivage du tome 108 de One Piece 🏴‍☠️', likes: 342, kanji: '海' },
    { caption: 'Rencontre avec le mangaka ce samedi',      likes: 891, kanji: '会' },
    { caption: "Nouveau coin lecture installe a l'etage",  likes: 221, kanji: '本' },
    { caption: 'Les goodies Chainsaw Man sont la',          likes: 567, kanji: '鋸' },
    { caption: 'Soiree projection · Akira 4K',             likes: 412, kanji: '光' },
    { caption: 'Yuki a fini de reclasser tout le rayon seinen', likes: 129, kanji: '棚' },
  ];

  // Grille : 2 cols mobile → 4 cols tablette → 6 cols desktop
  const cols = bp.isMobile ? 'repeat(2, 1fr)' : bp.isTablet ? 'repeat(4, 1fr)' : 'repeat(6, 1fr)';

  return (
    <Section
      label={`@tsundoku_${shop} · Instagram`}
      title="Les derniers posts."
      dark={dark} shop={shop} cta="Tout voir"
    >
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: bp.isMobile ? 8 : 14 }}>
        {/* Sur mobile : afficher seulement 4 posts pour ne pas surcharger */}
        {posts.slice(0, bp.isMobile ? 4 : 6).map((p, i) => (
          <div key={i} style={{
            aspectRatio: '1', border: `1px solid ${cardBorder}`,
            background: i % 2 === 0 ? S.bg : S.bgDeep,
            position: 'relative', overflow: 'hidden', cursor: 'pointer',
            transition: 'transform .25s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ position: 'absolute', inset: 0, color: S.accent, opacity: .25, ...HALFTONE_SMALL }} />
            <div style={{
              position: 'absolute', right: -20, top: -20,
              fontFamily: FONTS.jpDisplay, fontWeight: 900,
              fontSize: bp.isMobile ? 100 : 180,
              color: S.accent, opacity: .25, lineHeight: .9,
            }}>{p.kanji}</div>
            <div style={{ position: 'absolute', left: 10, bottom: 10, right: 10, color: '#fff' }}>
              <div style={{ fontSize: bp.isMobile ? 9 : 11, lineHeight: 1.3, textShadow: '0 1px 3px rgba(0,0,0,.8)', marginBottom: 4 }}>
                {p.caption}
              </div>
              <div style={{ fontSize: 10, opacity: .8, display: 'flex', alignItems: 'center', gap: 4 }}>
                ♥ {p.likes}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ── Prochains événements ──────────────────────────────────────────────────────
function Events({ shop, theme, onNav }) {
  const S      = TSUNDOKU[shop];
  const dark   = theme === 'dark';
  const bp     = useBreakpoint();
  const ink    = dark ? '#fff'  : '#111';
  const muted  = dark ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.55)';
  const cardBg = dark ? '#14141c' : '#fff';
  const border = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)';

  const events = [
    { day: '03', month: 'MAI', title: 'Dedicace · Tatsuki Fujimoto',        tag: 'Rencontre',  desc: 'Le mangaka de Chainsaw Man en visite surprise. Places limitees.' },
    { day: '10', month: 'MAI', title: 'Soiree quizz — special Ghibli',      tag: 'Communaute', desc: 'Equipes de 4, lots Studio Ghibli a gagner. Inscription gratuite en boutique.' },
    { day: '17', month: 'MAI', title: 'Projection · Akira 4K remaster',     tag: 'Cine-club',  desc: 'Au cinema Pathe voisin, tarif preferentiel pour les clients Tsundoku.' },
    { day: '24', month: 'MAI', title: 'Atelier dessin manga — debutants',   tag: 'Atelier',    desc: 'Anime par Camille. 2h, materiel fourni, 15 places.' },
  ];

  // 1 col mobile → 2 col tablette/desktop
  const cols = bp.isMobile ? '1fr' : 'repeat(2, 1fr)';

  return (
    <Section label="Agenda · イベント" title="Prochains evenements." dark={dark} shop={shop} cta="Calendrier complet">
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: bp.isMobile ? 10 : 14 }}>
        {events.map((e, i) => (
          <div key={i} onClick={() => onNav && onNav('event')} style={{
            display: 'flex', border: `1px solid ${border}`, background: cardBg,
            overflow: 'hidden', cursor: 'pointer', transition: 'transform .2s',
          }}
            onMouseEnter={ev => ev.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={ev => ev.currentTarget.style.transform = 'translateY(0)'}
          >
            {/* Bloc date */}
            <div style={{
              width: bp.isMobile ? 80 : 110, flexShrink: 0, background: S.bg, color: S.accent,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: bp.isMobile ? '14px 8px' : '18px 10px', position: 'relative',
            }}>
              <div style={{ position: 'absolute', inset: 0, color: S.accent, opacity: .15, ...HALFTONE_SMALL }} />
              <div style={{ fontFamily: FONTS.display, fontSize: bp.isMobile ? 38 : 52, lineHeight: 1, letterSpacing: -1 }}>
                {e.day}
              </div>
              <div style={{ fontSize: 10, letterSpacing: 3, fontWeight: 700, marginTop: 4 }}>
                {e.month}
              </div>
            </div>
            {/* Contenu */}
            <div style={{ padding: bp.isMobile ? '14px 16px' : '20px 22px', flex: 1 }}>
              <div style={{
                fontSize: 10, letterSpacing: 2, color: S.accent,
                fontWeight: 700, textTransform: 'uppercase', marginBottom: 6,
              }}>{e.tag}</div>
              <div style={{ fontFamily: FONTS.display, fontSize: bp.isMobile ? 16 : 22, lineHeight: 1.1, color: ink, letterSpacing: -.5 }}>
                {e.title}
              </div>
              {/* Description masquée sur mobile pour gagner de la place */}
              {!bp.isMobile && (
                <div style={{ fontSize: 13, lineHeight: 1.5, color: muted, marginTop: 8 }}>
                  {e.desc}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ── Avis clients ──────────────────────────────────────────────────────────────
function Reviews({ shop, theme }) {
  const S      = TSUNDOKU[shop];
  const dark   = theme === 'dark';
  const bp     = useBreakpoint();
  const ink    = dark ? '#fff'  : '#111';
  const muted  = dark ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.55)';
  const cardBg = dark ? '#14141c' : '#fff';
  const border = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)';

  const reviews = [
    { name: 'Leo M.',      rating: 5, text: "La meilleure librairie manga du coin. L'equipe connait vraiment ses classiques.",  when: 'il y a 3j' },
    { name: 'Claire B.',   rating: 5, text: "J'ai trouve une edition collector que je cherchais depuis 2 ans. Accueil genial.", when: 'il y a 1 sem.' },
    { name: 'Raphael D.',  rating: 4, text: 'Rayon seinen impressionnant. Les quizz du mercredi valent le detour.',             when: 'il y a 2 sem.' },
  ];

  // 1 col mobile → 2 col tablette → 3 col desktop
  const cols = bp.isMobile ? '1fr' : bp.isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';

  return (
    <Section label="4.9 / 5 · 342 avis" title="Ce que disent les clients." dark={dark} shop={shop} cta="Lire tous les avis">
      <div style={{ display: 'grid', gridTemplateColumns: cols, gap: bp.isMobile ? 12 : 18 }}>
        {reviews.map((r, i) => (
          <div key={i} style={{
            background: cardBg, border: `1px solid ${border}`, padding: bp.isMobile ? 20 : 26, position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: 16, right: 20,
              fontFamily: FONTS.display, fontSize: bp.isMobile ? 48 : 72, color: S.accent, opacity: .3, lineHeight: 1,
            }}>"</div>
            <div style={{ color: S.accent, fontSize: 14, letterSpacing: 2 }}>
              {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
            </div>
            <div style={{
              fontFamily: FONTS.display, fontSize: bp.isMobile ? 15 : 18, lineHeight: 1.4, color: ink,
              marginTop: 14, letterSpacing: -.2,
            }}>
              "{r.text}"
            </div>
            <div style={{
              marginTop: 14, paddingTop: 12, borderTop: `1px solid ${border}`,
              display: 'flex', justifyContent: 'space-between', fontSize: 12, color: muted,
            }}>
              <span style={{ fontWeight: 700, color: ink }}>{r.name}</span>
              <span>{r.when}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ── Infos boutique (adresse, horaires, carte) ─────────────────────────────────
function Infos({ shop, theme }) {
  const S  = TSUNDOKU[shop];
  const bp = useBreakpoint();
  const sectionPad = bp.isMobile ? '60px 20px' : bp.isTablet ? '70px 40px' : '80px 60px';

  // 1 col mobile → 3 cols desktop
  const cols = bp.isMobile ? '1fr' : bp.isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';

  return (
    <section style={{ background: S.bg, padding: sectionPad, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, color: S.accent, opacity: .12, ...HALFTONE_MED }} />
      <div style={{
        maxWidth: 1400, margin: '0 auto', position: 'relative',
        display: 'grid', gridTemplateColumns: cols, gap: bp.isMobile ? 36 : 50, color: '#fff',
      }}>
        {/* Adresse */}
        <div>
          <div style={{ fontSize: 11, letterSpacing: 4, color: S.accent, fontWeight: 700, marginBottom: 14 }}>
            ADRESSE · 住所
          </div>
          <div style={{ fontFamily: FONTS.display, fontSize: bp.isMobile ? 22 : 28, lineHeight: 1.2, letterSpacing: -.5 }}>
            {S.address}
          </div>
          <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <a href="#" style={{
              color: S.accent, textDecoration: 'none', fontSize: 12, letterSpacing: 2,
              textTransform: 'uppercase', fontWeight: 700, padding: '10px 14px',
              border: `1px solid ${S.accent}`, borderRadius: 99,
            }}>Itineraire →</a>
            <a href="#" style={{
              color: '#fff', textDecoration: 'none', fontSize: 12, letterSpacing: 2,
              textTransform: 'uppercase', fontWeight: 700, padding: '10px 14px',
              border: '1px solid rgba(255,255,255,.25)', borderRadius: 99,
            }}>{S.phone}</a>
          </div>
        </div>

        {/* Horaires */}
        <div>
          <div style={{ fontSize: 11, letterSpacing: 4, color: S.accent, fontWeight: 700, marginBottom: 14 }}>
            HORAIRES · 営業時間
          </div>
          {S.hours.map(([d, h], i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', padding: '10px 0',
              borderBottom: '1px solid rgba(255,255,255,.1)', fontSize: 14,
            }}>
              <span>{d}</span>
              <span style={{ color: h === 'Ferme' ? 'rgba(255,255,255,.4)' : S.accent, fontWeight: 600 }}>{h}</span>
            </div>
          ))}
        </div>

        {/* Carte — masquée sur tablette (2 col) pour éviter orphelin, visible sur desktop et mobile */}
        {!bp.isTablet && (
          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, color: S.accent, fontWeight: 700, marginBottom: 14 }}>
              PLAN · 地図
            </div>
            <div style={{
              height: bp.isMobile ? 160 : 200, background: S.bgDeep,
              border: `1px solid ${S.accent}55`, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, color: S.accent, opacity: .2, ...HALFTONE_SMALL }} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 20, height: 20, borderRadius: 99, background: S.accent,
                boxShadow: `0 0 0 8px ${S.accent}33, 0 0 0 16px ${S.accent}1a`,
              }} />
              <div style={{
                position: 'absolute', bottom: 10, left: 10,
                fontSize: 10, color: S.accent, letterSpacing: 2, fontFamily: 'ui-monospace, monospace',
              }}>[carte · placeholder]</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Pied de page ──────────────────────────────────────────────────────────────
function Footer({ shop, theme }) {
  const S    = TSUNDOKU[shop];
  const dark = theme === 'dark';
  const bp   = useBreakpoint();
  const bg   = dark ? '#050508' : '#0f0f15';

  return (
    <footer style={{
      background: bg, padding: bp.isMobile ? '32px 20px 24px' : '40px 60px 30px',
      color: 'rgba(255,255,255,.5)', fontSize: 12,
      borderTop: '1px solid rgba(255,255,255,.08)',
    }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        display: 'flex',
        flexDirection: bp.isMobile ? 'column' : 'row',
        justifyContent: 'space-between', alignItems: bp.isMobile ? 'flex-start' : 'center',
        gap: bp.isMobile ? 16 : 20,
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: FONTS.jpDisplay, fontWeight: 900, color: S.accent, fontSize: 16 }}>積ん読</span>
          <span>Tsundoku · Librairie manga</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: bp.isMobile ? 14 : 20 }}>
          <a href="#" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Instagram</a>
          <a href="#" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>TikTok</a>
          <a href="#" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>Mentions legales</a>
          <a href="#" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>CGV</a>
        </div>
        <div>© 2026 Tsundoku {S.name}</div>
      </div>
    </footer>
  );
}

// ── Page d'accueil boutique ───────────────────────────────────────────────────
function ShopHomepage({
  shop = 'toulon', theme = 'dark', intensity = 1,
  connected, onConnect, onBack, onToggleTheme, onShopSwitch, onNav,
}) {
  const dark = theme === 'dark';
  const bg   = dark ? '#0a0a12' : '#f7f5ef';
  const ink  = dark ? '#fff'    : '#111';

  return (
    <div style={{ width: '100%', background: bg, color: ink, fontFamily: FONTS.body, minHeight: 800 }}>
      <Navbar
        shop={shop} theme={theme} connected={connected}
        active="Accueil" onNav={onNav}
        onConnect={onConnect} onBack={onBack}
        onToggleTheme={onToggleTheme} onShopSwitch={onShopSwitch}
      />
      <HeroGallery shop={shop} theme={theme} intensity={intensity} onNav={onNav} />
      <ResaHighlight shop={shop} theme={theme} onNav={onNav} />
      <QuizzTeaser shop={shop} theme={theme} onNav={onNav} />
      <InstaFeed shop={shop} theme={theme} />
      <Events shop={shop} theme={theme} onNav={onNav} />
      <Reviews shop={shop} theme={theme} />
      <Infos shop={shop} theme={theme} />
      <Footer shop={shop} theme={theme} />
    </div>
  );
}

Object.assign(window, { Section, QuizzTeaser, InstaFeed, Events, Reviews, Infos, Footer, ShopHomepage });

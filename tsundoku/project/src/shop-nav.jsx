// Navbar + HeroGallery de la page d'accueil boutique
// Exports: Navbar, HeroGallery

// client : objet profil du client connecté ({ id, prenom, nom, email }) ou null
function Navbar({ shop, theme, connected, client, onConnect, onBack, onToggleTheme, onShopSwitch, active = 'Accueil', onNav }) {
  const S    = TSUNDOKU[shop];
  const dark = theme === 'dark';
  const bg     = dark ? 'rgba(12,12,18,.85)' : 'rgba(255,255,255,.9)';
  const ink    = dark ? '#fff'  : '#111';
  const muted  = dark ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.55)';
  const border = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)';

  // Détection du breakpoint pour adapter la navbar
  const bp = useBreakpoint();

  // État du menu hamburger (mobile uniquement)
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Fermer le menu quand on change de taille d'écran vers desktop
  React.useEffect(() => {
    if (bp.isDesktop) setMenuOpen(false);
  }, [bp.isDesktop]);

  const pages = ['Accueil', 'Reservations', 'Quizz', 'A propos', 'Contact'];

  // Prénom affiché quand le client est connecté (avec un fallback)
  const prenomAffiche = client?.prenom || 'Mon compte';

  // Mapping nom de page → vue du routeur
  const pageTarget = (p) =>
    p === 'Accueil'       ? 'shop'
    : p === 'Reservations'  ? 'catalog'
    : p === 'Quizz'         ? 'quizz'
    : p === 'A propos'      ? 'about'
    : p === 'Contact'       ? 'contact'
    : null;

  // Navigation depuis le menu mobile : ferme le menu puis navigue
  const handleNav = (p) => {
    setMenuOpen(false);
    const target = pageTarget(p);
    if (target && onNav) onNav(target);
  };

  return (
    <>
      {/* ── Barre de navigation principale ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: bg, backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${border}`, color: ink, fontFamily: FONTS.body,
      }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto',
          // Padding réduit sur mobile pour économiser l'espace
          padding: bp.isMobile ? '12px 16px' : '14px 32px',
          display: 'flex', alignItems: 'center', gap: bp.isMobile ? 12 : 24,
        }}>

          {/* Bouton retour au choix de boutique — masqué sur mobile (dans le menu) */}
          {!bp.isMobile && (
            <button onClick={onBack} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'transparent', border: `1px solid ${border}`,
              color: muted, fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
              padding: '7px 12px', borderRadius: 99, cursor: 'pointer', fontWeight: 600,
            }}>
              <span style={{ fontSize: 14 }}>◇</span> Changer
            </button>
          )}

          {/* Logo — toujours visible */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 38, height: 38, position: 'relative',
              background: S.bg, borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONTS.jpDisplay, fontWeight: 900, color: S.accent, fontSize: 12,
            }}>
              <div style={{
                position: 'absolute', inset: 5,
                border: `1.5px solid ${S.accent}`,
                transform: 'rotate(45deg)', borderRadius: 2,
              }} />
              <span style={{ position: 'relative' }}>積</span>
            </div>
            <div>
              <div style={{ fontFamily: FONTS.display, fontSize: 18, lineHeight: 1, letterSpacing: -.5 }}>
                Tsundoku
              </div>
              <div style={{ fontSize: 9, letterSpacing: 3, color: muted, marginTop: 2, fontWeight: 600 }}>
                {S.name}
              </div>
            </div>
          </div>

          {/* Navigation principale — desktop uniquement (tablet et desktop) */}
          {bp.isDesktop && (
            <div style={{ display: 'flex', gap: 4, marginLeft: 20 }}>
              {pages.map(p => {
                const isActive = p === active;
                return (
                  <a
                    key={p} href="#"
                    onClick={e => { e.preventDefault(); const t = pageTarget(p); if (t && onNav) onNav(t); }}
                    style={{
                      fontSize: 13, color: isActive ? ink : muted,
                      padding: '6px 12px', textDecoration: 'none',
                      fontWeight: isActive ? 700 : 500, borderRadius: 6,
                      position: 'relative',
                      cursor: pageTarget(p) ? 'pointer' : 'default',
                    }}
                  >
                    {p}
                    {isActive && (
                      <span style={{
                        position: 'absolute', left: 12, right: 12, bottom: 0,
                        height: 2, background: S.accent, borderRadius: 2,
                      }} />
                    )}
                  </a>
                );
              })}
            </div>
          )}

          {/* Spacer flexible */}
          <div style={{ flex: 1 }} />

          {/* Selecteur de boutique — desktop uniquement */}
          {!bp.isMobile && (
            <div style={{
              display: 'flex', alignItems: 'center',
              background: dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.05)',
              borderRadius: 99, padding: 3,
              fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
            }}>
              {['toulon', 'marseille'].map(s => (
                <button key={s} onClick={() => onShopSwitch(s)} style={{
                  padding: '6px 12px', border: 'none', cursor: 'pointer', borderRadius: 99,
                  background: shop === s ? TSUNDOKU[s].accent : 'transparent',
                  color: shop === s ? TSUNDOKU[s].bgDeep : muted,
                  textTransform: 'uppercase', fontFamily: FONTS.body, fontWeight: 700,
                }}>{TSUNDOKU[s].name}</button>
              ))}
            </div>
          )}

          {/* Bascule thème — masquée sur mobile (dans le menu) */}
          {!bp.isMobile && (
            <button onClick={onToggleTheme} style={{
              width: 36, height: 36, border: `1px solid ${border}`, borderRadius: 99,
              background: 'transparent', color: ink, cursor: 'pointer', fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{dark ? '☾' : '☀'}</button>
          )}

          {/* Connexion — masqué sur mobile (dans le menu) */}
          {!bp.isMobile && (
            <button onClick={onConnect} style={{
              padding: '9px 16px', borderRadius: 99,
              background: connected ? 'transparent' : S.accent,
              color:      connected ? ink           : S.bgDeep,
              border: connected ? `1px solid ${border}` : 'none',
              fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: FONTS.body,
            }}>
              {/* Quand connecté : affiche le prénom réel (ex: "◉ Mehdi") */}
              {connected ? `◉ ${prenomAffiche}` : 'Se connecter'}
            </button>
          )}

          {/* Bouton hamburger — mobile uniquement */}
          {bp.isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu"
              style={{
                width: 40, height: 40, border: `1px solid ${border}`,
                borderRadius: 8, background: 'transparent',
                color: ink, cursor: 'pointer',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 5,
              }}
            >
              {/* 3 barres du hamburger — deviennent une croix quand ouvert */}
              <span style={{
                display: 'block', width: 18, height: 2,
                background: ink, borderRadius: 2,
                transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                transition: 'transform .2s',
              }} />
              <span style={{
                display: 'block', width: 18, height: 2,
                background: ink, borderRadius: 2,
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity .2s',
              }} />
              <span style={{
                display: 'block', width: 18, height: 2,
                background: ink, borderRadius: 2,
                transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                transition: 'transform .2s',
              }} />
            </button>
          )}
        </div>
      </div>

      {/* ── Menu overlay mobile ── */}
      {/* Ce panneau s'ouvre en glissant depuis le haut quand on clique sur le hamburger */}
      {bp.isMobile && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 40,
          // Visible/masqué selon menuOpen
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}>
          {/* Fond semi-transparent qui ferme le menu au clic */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,.5)',
              opacity: menuOpen ? 1 : 0,
              transition: 'opacity .25s',
            }}
          />

          {/* Panneau de navigation */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            background: dark ? '#0c0c12' : '#fff',
            borderBottom: `2px solid ${S.accent}`,
            padding: '80px 24px 32px',
            transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform .3s cubic-bezier(.4,0,.2,1)',
            boxShadow: '0 20px 60px rgba(0,0,0,.3)',
          }}>

            {/* Pages de navigation */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 24 }}>
              {pages.map(p => {
                const isActive = p === active;
                return (
                  <a
                    key={p} href="#"
                    onClick={e => { e.preventDefault(); handleNav(p); }}
                    style={{
                      fontSize: 22, fontFamily: FONTS.display,
                      color: isActive ? S.accent : ink,
                      padding: '10px 0',
                      textDecoration: 'none', fontWeight: isActive ? 700 : 400,
                      borderBottom: `1px solid ${border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}
                  >
                    {p}
                    {isActive && <span style={{ fontSize: 12, color: S.accent }}>●</span>}
                  </a>
                );
              })}
            </nav>

            {/* Sélecteur de boutique */}
            <div style={{
              display: 'flex', gap: 8, marginBottom: 16,
              background: dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.05)',
              borderRadius: 99, padding: 3,
            }}>
              {['toulon', 'marseille'].map(s => (
                <button key={s} onClick={() => { onShopSwitch(s); setMenuOpen(false); }} style={{
                  flex: 1, padding: '10px', border: 'none', cursor: 'pointer', borderRadius: 99,
                  background: shop === s ? TSUNDOKU[s].accent : 'transparent',
                  color: shop === s ? TSUNDOKU[s].bgDeep : muted,
                  textTransform: 'uppercase', fontFamily: FONTS.body, fontWeight: 700,
                  fontSize: 12, letterSpacing: 2,
                }}>{TSUNDOKU[s].name}</button>
              ))}
            </div>

            {/* Actions secondaires */}
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button onClick={() => { onBack(); setMenuOpen(false); }} style={{
                flex: 1, padding: '12px', border: `1px solid ${border}`,
                borderRadius: 8, background: 'transparent', color: muted,
                fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase',
                cursor: 'pointer', fontFamily: FONTS.body, fontWeight: 600,
              }}>
                ◇ Changer boutique
              </button>
              <button onClick={onToggleTheme} style={{
                width: 44, height: 44, border: `1px solid ${border}`,
                borderRadius: 8, background: 'transparent', color: ink,
                cursor: 'pointer', fontSize: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{dark ? '☾' : '☀'}</button>
              <button onClick={() => { onConnect(); setMenuOpen(false); }} style={{
                flex: 1, padding: '12px',
                background: connected ? 'transparent' : S.accent,
                color: connected ? ink : S.bgDeep,
                border: connected ? `1px solid ${border}` : 'none',
                borderRadius: 8, fontSize: 12, fontWeight: 700,
                letterSpacing: 1.5, textTransform: 'uppercase',
                cursor: 'pointer', fontFamily: FONTS.body,
              }}>
                {/* Bouton mobile : même logique — prénom réel quand connecté */}
                {connected ? `◉ ${prenomAffiche}` : 'Connexion'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Carousel héros avec CTA de réservation
function HeroGallery({ shop, theme, intensity, onNav }) {
  const S    = TSUNDOKU[shop];
  const dark = theme === 'dark';
  const bp   = useBreakpoint();
  const [idx, setIdx] = React.useState(0);

  const slides = [
    { label: 'Devanture · vitrine manga', kanji: '表' },
    { label: 'Rayon shonen',              kanji: '少' },
    { label: "Coin lecture a l'etage",    kanji: '読' },
    { label: 'Murs de goodies',           kanji: '物' },
  ];

  React.useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % slides.length), 4200 / intensity);
    return () => clearInterval(id);
  }, [intensity, slides.length]);

  // Hauteur du hero : réduite sur mobile pour laisser de la place au contenu
  const heroHeight = bp.isMobile ? 420 : bp.isTablet ? 490 : 560;

  // Taille du titre : fluide selon l'écran
  const titleSize = bp.isMobile ? 44 : bp.isTablet ? 68 : 96;

  // Padding interne du texte superposé
  const heroPadding = bp.isMobile ? '40px 20px' : bp.isTablet ? '60px 40px' : '80px 60px';

  return (
    <div style={{ position: 'relative', height: heroHeight, overflow: 'hidden', background: S.bg }}>
      {/* Slides */}
      {slides.map((sl, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          opacity: i === idx ? 1 : 0,
          transform: i === idx ? 'scale(1)' : 'scale(1.04)',
          transition: `opacity ${0.8 * intensity}s, transform ${6 * intensity}s linear`,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(${i * 37}deg, ${S.bgDeep} 0%, ${S.bg} 50%, ${S.bgDeep} 100%)`,
          }} />
          <div style={{
            position: 'absolute', inset: 0, color: S.accent, opacity: .18,
            ...HALFTONE_MED,
            maskImage: 'linear-gradient(135deg, black, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(135deg, black, transparent 80%)',
          }} />
          {/* Kanji décoratif de fond — masqué sur mobile pour libérer l'espace */}
          {!bp.isMobile && (
            <div style={{
              position: 'absolute', right: -40, top: -40, bottom: -40,
              fontFamily: FONTS.jpDisplay, fontWeight: 900, fontSize: 620,
              color: S.accent, opacity: .12, lineHeight: .9, pointerEvents: 'none',
            }}>{sl.kanji}</div>
          )}
          {/* Label de la slide — masqué sur mobile */}
          {!bp.isMobile && (
            <div style={{
              position: 'absolute', bottom: 40, left: 40,
              fontFamily: 'ui-monospace, monospace', fontSize: 11, color: S.accent,
              letterSpacing: 2, textTransform: 'uppercase',
              background: 'rgba(0,0,0,.4)', padding: '6px 10px', borderRadius: 3,
            }}>[img {(i + 1).toString().padStart(2, '0')}] {sl.label}</div>
          )}
        </div>
      ))}

      {/* Texte superposé */}
      <div style={{
        position: 'absolute', inset: 0, padding: heroPadding,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        color: '#fff', pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: FONTS.jpDisplay, fontSize: bp.isMobile ? 11 : 14, color: S.accent,
          letterSpacing: 6, fontWeight: 900, marginBottom: 14,
        }}>積ん読 · LIBRAIRIE MANGA</div>
        <div style={{
          fontFamily: FONTS.display, fontSize: titleSize, lineHeight: .9,
          letterSpacing: -2, maxWidth: 900,
          textShadow: `4px 4px 0 ${S.bgDeep}`,
        }}>
          Bienvenue a<br/>
          <span style={{ color: S.accent }}>Tsundoku {S.name}</span>
        </div>
        <div style={{
          marginTop: bp.isMobile ? 14 : 24,
          maxWidth: 520,
          fontSize: bp.isMobile ? 14 : 17,
          lineHeight: 1.55, opacity: .9,
          // Masquer le sous-titre sur très petit écran pour gagner de la place
          display: bp.isMobile ? 'none' : 'block',
        }}>
          12 000 volumes en stock. L'equipe connait ses classiques
          et les mercredis de sortie remplissent la boutique.
        </div>

        {/* CTA — colonne sur mobile, ligne sur desktop */}
        <div style={{
          marginTop: bp.isMobile ? 20 : 40,
          display: 'flex',
          flexDirection: bp.isMobile ? 'column' : 'row',
          gap: bp.isMobile ? 10 : 14,
          pointerEvents: 'auto',
          // Limiter la largeur des boutons en colonne sur mobile
          maxWidth: bp.isMobile ? 280 : 'none',
        }}>
          <button onClick={() => onNav && onNav('catalog')} style={{
            background: S.accent, color: S.bgDeep, border: 'none',
            padding: bp.isMobile ? '14px 20px' : '16px 26px',
            fontWeight: 700, fontSize: bp.isMobile ? 12 : 14,
            letterSpacing: 3, textTransform: 'uppercase',
            borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body,
            boxShadow: `0 0 0 4px ${S.accent}44`,
          }}>Reserver un manga →</button>
          <button onClick={() => onNav && onNav('catalog')} style={{
            background: 'rgba(255,255,255,.1)', color: '#fff',
            border: '1px solid rgba(255,255,255,.3)',
            backdropFilter: 'blur(8px)',
            padding: bp.isMobile ? '14px 20px' : '16px 26px',
            fontWeight: 700, fontSize: bp.isMobile ? 12 : 14,
            letterSpacing: 3, textTransform: 'uppercase',
            borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body,
          }}>Voir les titres</button>
        </div>
      </div>

      {/* Pagination dots */}
      <div style={{
        position: 'absolute', bottom: 24, right: bp.isMobile ? 16 : 40,
        display: 'flex', gap: 6, zIndex: 2,
      }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{
            width: i === idx ? 28 : 8, height: 8, borderRadius: 99, border: 'none',
            background: i === idx ? S.accent : 'rgba(255,255,255,.3)',
            transition: 'all .3s', cursor: 'pointer',
          }} />
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Navbar, HeroGallery });

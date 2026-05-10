// Split-screen Variation A — manga panels / cases BD style
// Exports: SplitScreenA
// Responsive : split diagonal sur desktop, split horizontal (haut/bas) sur mobile

function SplitScreenA({ width = 1400, height = 860, animIntensity = 1 }) {
  const [hover, setHover] = React.useState(null); // 'toulon' | 'marseille' | null
  const [entered, setEntered] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setEntered(true), 50); return () => clearTimeout(t); }, []);

  // Breakpoint pour adapter le layout
  const bp = useBreakpoint();

  const T = TSUNDOKU.toulon;
  const M = TSUNDOKU.marseille;

  // ─── Clip paths selon l'orientation ─────────────────────────────────────
  // Desktop : split diagonal (gauche → droite)
  // Mobile  : split horizontal (haut → bas) — plus lisible en portrait
  const leftClip   = bp.isMobile ? 'polygon(0 0, 100% 0, 100% 52%, 0 46%)' : 'polygon(0 0, 58% 0, 42% 100%, 0 100%)';
  const rightClip  = bp.isMobile ? 'polygon(0 46%, 100% 52%, 100% 100%, 0 100%)' : 'polygon(58% 0, 100% 0, 100% 100%, 42% 100%)';

  const panelBase = {
    position: 'absolute', inset: 0, overflow: 'hidden',
    transition: `transform ${0.55 * animIntensity}s cubic-bezier(.2,.8,.2,1), filter .4s`,
    cursor: 'pointer',
  };

  // Taille du titre selon l'écran
  const titleSize = bp.isMobile ? 42 : bp.isTablet ? 58 : 76;

  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: '#000', fontFamily: FONTS.body, userSelect: 'none',
    }}>
      {/* ====== TOULON (gauche sur desktop / haut sur mobile) ====== */}
      <div
        onMouseEnter={() => setHover('toulon')}
        onMouseLeave={() => setHover(null)}
        style={{
          ...panelBase, clipPath: leftClip,
          background: `radial-gradient(120% 80% at 30% 40%, ${T.bg} 0%, ${T.bgDeep} 70%, #000 120%)`,
          transform: hover === 'toulon' ? 'scale(1.02)' : hover === 'marseille' ? 'scale(.98)' : 'scale(1)',
          filter: hover === 'marseille' ? 'brightness(.5) saturate(.6)' : 'brightness(1)',
        }}
      >
        {/* Motif halftone */}
        <div style={{
          position: 'absolute', inset: 0, color: T.accent, opacity: .22,
          ...HALFTONE_MED,
          maskImage: bp.isMobile
            ? 'linear-gradient(to bottom, black 20%, transparent 75%)'
            : 'linear-gradient(115deg, black 20%, transparent 75%)',
          WebkitMaskImage: bp.isMobile
            ? 'linear-gradient(to bottom, black 20%, transparent 75%)'
            : 'linear-gradient(115deg, black 20%, transparent 75%)',
        }} />
        {/* Lignes de vitesse au survol */}
        <div style={{
          position: 'absolute', inset: '-20%', ...SPEED_LINES('rgba(255,125,184,0.18)'),
          opacity: hover === 'toulon' ? 0.5 : 0,
          transition: 'opacity .4s',
          transformOrigin: '30% 50%',
          animation: hover === 'toulon' ? 'tsu-spin 30s linear infinite' : 'none',
        }} />

        {/* Label Toulon — repositionné selon le mode */}
        <div style={{
          position: 'absolute',
          // Mobile : centré horizontalement, dans la moitié haute
          // Desktop : à gauche, pleine hauteur
          ...(bp.isMobile ? {
            left: 0, right: 0, top: 0,
            height: '48%',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            textAlign: 'center', padding: '20px 16px',
          } : {
            left: 80, top: 80, bottom: 80,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }),
          transform: entered
            ? 'translate(0, 0)'
            : bp.isMobile ? 'translateY(-30px)' : 'translateX(-60px)',
          opacity: entered ? 1 : 0,
          transition: `all ${0.9 * animIntensity}s cubic-bezier(.2,.8,.2,1) .1s`,
        }}>
          <div>
            {/* Sous-titre japonais — masqué sur mobile pour économiser l'espace */}
            {!bp.isMobile && (
              <div style={{
                color: T.accent, fontFamily: FONTS.jpDisplay, fontWeight: 900,
                fontSize: 18, letterSpacing: 8, marginBottom: 14,
              }}>トゥーロン店 · トゥーロン</div>
            )}
            <div style={{
              fontFamily: FONTS.display, fontSize: titleSize, lineHeight: .9,
              color: T.accent, letterSpacing: -2, whiteSpace: 'nowrap',
              textShadow: `6px 6px 0 ${T.bgDeep}, 12px 12px 0 rgba(0,0,0,.4)`,
            }}>
              TOULON
            </div>
            {!bp.isMobile && (
              <div style={{
                marginTop: 18, color: '#fff', fontSize: 15, maxWidth: 300,
                letterSpacing: 0.3, lineHeight: 1.55, opacity: .9,
              }}>
                Eh oui le zin.
              </div>
            )}
          </div>
          {/* CTA — adapté selon le mode */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            color: '#fff', fontSize: bp.isMobile ? 11 : 13,
            letterSpacing: 2, textTransform: 'uppercase',
            marginTop: bp.isMobile ? 10 : 0,
          }}>
            <span style={{
              width: bp.isMobile ? 10 : 14, height: bp.isMobile ? 10 : 14,
              background: T.accent, borderRadius: 2,
              transform: hover === 'toulon' ? 'rotate(45deg) scale(1.3)' : 'rotate(0)',
              transition: 'transform .35s',
            }} />
            <span>{bp.isMobile ? 'Entrer →' : 'Entrer dans la boutique →'}</span>
          </div>
        </div>

        {/* Onomatopée — masquée sur mobile (trop chargé) */}
        {!bp.isMobile && (
          <Onomatopoeia
            text="ドキドキ"
            translit="DOKIDOKI!"
            x="8%"
            y="54%"
            rotate={-10}
            color={T.accent}
            active={hover === 'toulon'}
            intensity={animIntensity}
            scale={1.35}
            delay={0}
            duration={4.2}
          />
        )}
      </div>

      {/* ====== MARSEILLE (droite sur desktop / bas sur mobile) ====== */}
      <div
        onMouseEnter={() => setHover('marseille')}
        onMouseLeave={() => setHover(null)}
        style={{
          ...panelBase, clipPath: rightClip,
          background: `radial-gradient(120% 80% at 70% 60%, ${M.bg} 0%, ${M.bgDeep} 70%, #000 120%)`,
          transform: hover === 'marseille' ? 'scale(1.02)' : hover === 'toulon' ? 'scale(.98)' : 'scale(1)',
          filter: hover === 'toulon' ? 'brightness(.5) saturate(.6)' : 'brightness(1)',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, color: M.accent, opacity: .18,
          ...HALFTONE_MED,
          maskImage: bp.isMobile
            ? 'linear-gradient(to top, black 20%, transparent 75%)'
            : 'linear-gradient(-115deg, black 20%, transparent 75%)',
          WebkitMaskImage: bp.isMobile
            ? 'linear-gradient(to top, black 20%, transparent 75%)'
            : 'linear-gradient(-115deg, black 20%, transparent 75%)',
        }} />
        <div style={{
          position: 'absolute', inset: '-20%', ...SPEED_LINES('rgba(232,182,72,0.18)'),
          opacity: hover === 'marseille' ? 0.5 : 0,
          transition: 'opacity .4s',
          transformOrigin: '70% 50%',
          animation: hover === 'marseille' ? 'tsu-spin-rev 30s linear infinite' : 'none',
        }} />

        {/* Label Marseille */}
        <div style={{
          position: 'absolute',
          ...(bp.isMobile ? {
            left: 0, right: 0, bottom: 0,
            height: '52%',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            textAlign: 'center', padding: '20px 16px',
          } : {
            right: 80, top: 80, bottom: 80,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            alignItems: 'flex-end', textAlign: 'right',
          }),
          transform: entered
            ? 'translate(0, 0)'
            : bp.isMobile ? 'translateY(30px)' : 'translateX(60px)',
          opacity: entered ? 1 : 0,
          transition: `all ${0.9 * animIntensity}s cubic-bezier(.2,.8,.2,1) .1s`,
        }}>
          <div>
            {!bp.isMobile && (
              <div style={{
                color: M.accent, fontFamily: FONTS.jpDisplay, fontWeight: 900,
                fontSize: 18, letterSpacing: 8, marginBottom: 14,
              }}>マルセイユ店 · マルセイユ</div>
            )}
            <div style={{
              fontFamily: FONTS.display, fontSize: titleSize, lineHeight: .9,
              color: M.accent, letterSpacing: -2, whiteSpace: 'nowrap',
              textShadow: `6px 6px 0 ${M.bgDeep}, 12px 12px 0 rgba(0,0,0,.4)`,
            }}>
              MARSEILLE
            </div>
            {!bp.isMobile && (
              <div style={{
                marginTop: 18, color: '#fff', fontSize: 15, maxWidth: 300,
                letterSpacing: 0.3, lineHeight: 1.55, opacity: .9,
                marginLeft: 'auto',
              }}>
                Eh oui mon gate.
              </div>
            )}
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            color: '#fff', fontSize: bp.isMobile ? 11 : 13,
            letterSpacing: 2, textTransform: 'uppercase',
            marginTop: bp.isMobile ? 10 : 0,
          }}>
            {!bp.isMobile && <span>← Entrer dans la boutique</span>}
            {bp.isMobile && <span>Entrer →</span>}
            <span style={{
              width: bp.isMobile ? 10 : 14, height: bp.isMobile ? 10 : 14,
              background: M.accent, borderRadius: 2,
              transform: hover === 'marseille' ? 'rotate(45deg) scale(1.3)' : 'rotate(0)',
              transition: 'transform .35s',
            }} />
          </div>
        </div>

        {/* Onomatopée — masquée sur mobile */}
        {!bp.isMobile && (
          <Onomatopoeia
            text="ゴゴゴ"
            translit="GOGOGO!"
            x="70%"
            y="54%"
            rotate={10}
            color={M.accent}
            active={hover === 'marseille'}
            intensity={animIntensity}
            scale={1.35}
            delay={0.3}
            duration={4.6}
          />
        )}
      </div>

      {/* ====== Logo central — masqué sur mobile pour éviter la surcharge visuelle ====== */}
      {!bp.isMobile && (
        <CenterLogo hover={hover} entered={entered} intensity={animIntensity} />
      )}

      {/* Logo simplifié sur mobile : carré coloré centré */}
      {bp.isMobile && entered && (
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 5, pointerEvents: 'none',
          // Ligne de séparation stylisée entre les deux panels
          width: 2, height: 60,
          background: 'linear-gradient(to bottom, rgba(255,125,184,.8), rgba(232,182,72,.8))',
          borderRadius: 2,
          boxShadow: '0 0 20px rgba(255,255,255,.3)',
        }} />
      )}

      {/* Bandeau supérieur — plus compact sur mobile */}
      <div style={{
        position: 'absolute',
        top: bp.isMobile ? 16 : 32,
        left: '50%', transform: 'translateX(-50%)',
        color: '#fff',
        fontSize: bp.isMobile ? 9 : 11,
        letterSpacing: bp.isMobile ? 3 : 6,
        textTransform: 'uppercase',
        fontFamily: FONTS.body, fontWeight: 500,
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
        padding: bp.isMobile ? '8px 14px' : '10px 18px',
        borderRadius: 99, zIndex: 10,
        whiteSpace: 'nowrap',
      }}>
        <span style={{ opacity: .6 }}>積ん読</span>
        <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,.3)' }} />
        <span>{bp.isMobile ? 'Choisissez votre boutique' : 'Choisissez votre nindo'}</span>
      </div>

      {/* Indication basse — masquée sur mobile pour ne pas surcharger */}
      {!bp.isMobile && (
        <div style={{
          position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          color: 'rgba(255,255,255,.5)', fontSize: 11, letterSpacing: 3,
          textTransform: 'uppercase', zIndex: 10, textAlign: 'center',
        }}>
          Survolez une boutique · Cliquez pour entrer
        </div>
      )}

      <style>{`
        @keyframes tsu-spin { to { transform: rotate(360deg); } }
        @keyframes tsu-spin-rev { to { transform: rotate(-360deg); } }
        @keyframes tsu-pulse { 0%,100% { transform: scale(1);} 50% { transform: scale(1.05);} }
        @keyframes tsu-shake { 0%,100%{transform:translate(0,0) rotate(var(--r))} 25%{transform:translate(-2px,1px) rotate(var(--r))} 50%{transform:translate(2px,-1px) rotate(var(--r))} 75%{transform:translate(-1px,2px) rotate(var(--r))} }
        @keyframes tsu-float { 0%,100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(5px, -12px) rotate(1deg); } }
        @keyframes tsu-float-alt { 0%,100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(-6px, -10px) rotate(-1.5deg); } }
      `}</style>
    </div>
  );
}

function Onomatopoeia({ text, translit, x, y, rotate = 0, color = '#fff', active = false, intensity = 1, scale = 1, delay = 0, duration = 4 }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      animation: `${text.length > 2 ? 'tsu-float-alt' : 'tsu-float'} ${duration}s ease-in-out ${delay}s infinite`,
      pointerEvents: 'none',
    }}>
      <div style={{
        transform: `rotate(${rotate}deg) scale(${(active ? 1.12 : 1) * scale})`,
        transition: `transform ${0.35 * intensity}s cubic-bezier(.2,2,.4,1)`,
        animation: active ? `tsu-shake ${0.3 * intensity}s infinite` : 'none',
        '--r': `${rotate}deg`,
      }}>
        <div style={{
          fontFamily: FONTS.jpDisplay, fontWeight: 900, fontSize: 72, lineHeight: 1,
          color, letterSpacing: 2,
          textShadow: `4px 4px 0 rgba(0,0,0,.6), 8px 8px 0 rgba(0,0,0,.3)`,
          WebkitTextStroke: '2px rgba(0,0,0,0.7)',
        }}>{text}</div>
        <div style={{
          fontFamily: FONTS.display, fontSize: 18, color: '#fff',
          letterSpacing: 1, marginTop: 4, textAlign: 'center',
          textShadow: `2px 2px 0 rgba(0,0,0,.6)`,
        }}>{translit}</div>
      </div>
    </div>
  );
}

// Logo central fusionné — moitié gauche Toulon, moitié droite Marseille
function CenterLogo({ hover, entered, intensity = 1 }) {
  const T = TSUNDOKU.toulon, M = TSUNDOKU.marseille;

  const SIZE = 340;
  const trans = `clip-path ${0.6 * intensity}s cubic-bezier(.2,.9,.25,1), opacity ${0.4 * intensity}s`;

  const rootRef = React.useRef(null);
  const [dims, setDims] = React.useState({ w: 1400, h: 860 });
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || !el.parentElement) return;
    const parent = el.parentElement;
    const update = () => {
      const r = parent.getBoundingClientRect();
      if (r.width && r.height) setDims({ w: r.width, h: r.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const kx = 0.08 * (dims.w / dims.h);
  const topPct = 50 + kx * 100;
  const botPct = 50 - kx * 100;

  const toulonClip =
    hover === 'toulon'    ? `polygon(0 0, ${topPct + 100}% 0, ${botPct + 100}% 100%, 0 100%)`
  : hover === 'marseille' ? `polygon(0 0, ${topPct - 100}% 0, ${botPct - 100}% 100%, 0 100%)`
  :                         `polygon(0 0, ${topPct}% 0, ${botPct}% 100%, 0 100%)`;

  const marseilleClip =
    hover === 'marseille' ? `polygon(${topPct - 100}% 0, 100% 0, 100% 100%, ${botPct - 100}% 100%)`
  : hover === 'toulon'    ? `polygon(${topPct + 100}% 0, 100% 0, 100% 100%, ${botPct + 100}% 100%)`
  :                         `polygon(${topPct}% 0, 100% 0, 100% 100%, ${botPct}% 100%)`;

  return (
    <div ref={rootRef} style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: `translate(-50%, -50%) scale(${entered ? 1 : 0.6})`,
      opacity: entered ? 1 : 0,
      transition: `all ${1.1 * intensity}s cubic-bezier(.2,.8,.2,1)`,
      pointerEvents: 'none', zIndex: 5,
    }}>
      {/* Halo lumineux */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%,-50%)',
        width: SIZE + 260, height: SIZE + 260, borderRadius: '50%',
        background: hover === 'toulon'
          ? `radial-gradient(circle, ${T.accent}66 0%, transparent 60%)`
          : hover === 'marseille'
          ? `radial-gradient(circle, ${M.accent}66 0%, transparent 60%)`
          : 'radial-gradient(circle, rgba(255,255,255,.12) 0%, transparent 60%)',
        transition: 'background .4s',
      }} />

      <div style={{
        position: 'relative', width: SIZE, height: SIZE,
        borderRadius: 32, overflow: 'hidden',
        boxShadow: hover === 'toulon'
          ? `0 30px 80px rgba(0,0,0,.6), 0 0 0 3px ${T.accent}`
          : hover === 'marseille'
          ? `0 30px 80px rgba(0,0,0,.6), 0 0 0 3px ${M.accent}`
          : '0 20px 60px rgba(0,0,0,.5)',
        transition: 'box-shadow .35s',
      }}>
        <img src="assets/logo-toulon.jpg" alt="Tsundoku Toulon" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', transform: 'scale(1.1) translateY(1px)',
          transformOrigin: 'center',
          clipPath: toulonClip, WebkitClipPath: toulonClip, transition: trans,
        }} />
        <img src="assets/logo-marseille.jpg" alt="Tsundoku Marseille" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', transform: 'scale(1.2)',
          transformOrigin: 'center',
          clipPath: marseilleClip, WebkitClipPath: marseilleClip, transition: trans,
        }} />
      </div>
    </div>
  );
}

Object.assign(window, { SplitScreenA });

// Tokens & helpers for Tsundoku site
// Based on the two logos: Toulon (electric blue + pink) / Marseille (navy + gold)

const TSUNDOKU = {
  toulon: {
    name: 'TOULON',
    bg: '#2b2bf0',        // electric blue
    bgDeep: '#1a1ac8',
    accent: '#ff7db8',     // pink
    accentDeep: '#e04d93',
    ink: '#0a0a2a',
    paper: '#fff5fb',
    address: '12 rue Pierre Semard, 83000 Toulon',
    phone: '04 94 31 02 80',
    tagline: 'Librairie Manga — Toulon',
    hours: [
      ['Lundi', '14h – 19h'],
      ['Mardi – Samedi', '10h – 19h'],
      ['Dimanche', 'Ferme'],
    ],
  },
  marseille: {
    name: 'MARSEILLE',
    bg: '#0d2340',         // navy
    bgDeep: '#081530',
    accent: '#e8b648',     // gold
    accentDeep: '#c89628',
    ink: '#050f20',
    paper: '#fbf5e8',
    address: '49 Cr Pierre Puget, 13006 Marseille',
    phone: '04 91 48 53 24',
    tagline: 'Librairie Manga — Marseille',
    hours: [
      ['Lundi', '14h – 19h'],
      ['Mardi – Samedi', '10h – 19h'],
      ['Dimanche', 'Ferme'],
    ],
  },
};

// Fonts loaded once
if (typeof document !== 'undefined' && !document.getElementById('tsundoku-fonts')) {
  // Google Fonts (sans Crispy Tofu qui est chargee en local)
  const link = document.createElement('link');
  link.id = 'tsundoku-fonts';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&family=DM+Sans:wght@400;500;700&family=Zen+Kaku+Gothic+New:wght@400;700;900&family=Reenie+Beanie&display=swap';
  document.head.appendChild(link);

  // Crispy Tofu — police locale (fichier TTF dans assets/fonts/)
  const style = document.createElement('style');
  style.id = 'tsundoku-crispy-tofu';
  style.textContent = `
    @font-face {
      font-family: 'Crispy Tofu';
      src: url('tsundoku/project/assets/fonts/crispy-tofu.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
}

const FONTS = {
  display: '"Crispy Tofu", "Zen Kaku Gothic New", sans-serif',
  jp: '"Noto Sans JP", sans-serif',
  jpDisplay: '"Zen Kaku Gothic New", "Noto Sans JP", sans-serif',
  body: '"DM Sans", system-ui, sans-serif',
  hand: '"Reenie Beanie", cursive',
};

// Unified kanji 積ん読 for center-logo lockups
const KANJI = '積ん読';

// Small SVG: stylized octogon-ish double-diamond like the logo's frame
function LogoMark({ size = 120, color = '#ff7db8', stroke = 6, rotated = false }) {
  const s = size;
  const rot = rotated ? 'rotate(45 50 50)' : '';
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" style={{ display: 'block' }}>
      <g transform={rot}>
        {/* Outer rotated square */}
        <rect x="10" y="10" width="80" height="80" transform="rotate(45 50 50)"
          fill="none" stroke={color} strokeWidth={stroke} strokeLinejoin="round" rx="4" />
        {/* Inner upright square */}
        <rect x="18" y="18" width="64" height="64"
          fill="none" stroke={color} strokeWidth={stroke - 1} strokeLinejoin="round" rx="3" />
      </g>
    </svg>
  );
}

// Placeholder striped image (replace-later pattern)
function Placeholder({ label = 'image', width = '100%', height = 200, tone = 'dark', radius = 0, style = {} }) {
  const dark = tone === 'dark';
  const c1 = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
  const c2 = dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';
  return (
    <div style={{
      width, height, borderRadius: radius,
      background: `repeating-linear-gradient(45deg, ${c1} 0 10px, ${c2} 10px 20px)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
      border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
      overflow: 'hidden', position: 'relative', ...style,
    }}>
      {label}
    </div>
  );
}

// Halftone / trame dots — pure CSS
const HALFTONE_SMALL = {
  backgroundImage: 'radial-gradient(currentColor 1px, transparent 1.2px)',
  backgroundSize: '8px 8px',
};
const HALFTONE_MED = {
  backgroundImage: 'radial-gradient(currentColor 1.8px, transparent 2px)',
  backgroundSize: '12px 12px',
};
const HALFTONE_BIG = {
  backgroundImage: 'radial-gradient(currentColor 3px, transparent 3.2px)',
  backgroundSize: '22px 22px',
};

// Speed lines (radial)
const SPEED_LINES = (color = 'rgba(0,0,0,0.25)') => ({
  backgroundImage: `repeating-conic-gradient(from 0deg, ${color} 0deg 1deg, transparent 1deg 7deg)`,
});

// ─── Breakpoints & hooks responsives ───────────────────────────────────────
// Seuils de largeur d'écran :
//   isMobile  → width < 768px  (smartphones)
//   isTablet  → 768 – 1023px   (tablettes)
//   isDesktop → >= 1024px      (desktop)
const BP = { tablet: 768, desktop: 1024 };

// Hook bas niveau : retourne la largeur courante de la fenêtre.
// Se met à jour automatiquement quand la fenêtre est redimensionnée.
function useWindowWidth() {
  const [w, setW] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return w;
}

// Hook de commodité : retourne un objet { isMobile, isTablet, isDesktop, width }.
// Usage dans un composant : const bp = useBreakpoint();
function useBreakpoint() {
  const w = useWindowWidth();
  return {
    isMobile:  w < BP.tablet,
    isTablet:  w >= BP.tablet && w < BP.desktop,
    isDesktop: w >= BP.desktop,
    width: w,
  };
}

Object.assign(window, {
  TSUNDOKU, FONTS, KANJI, LogoMark, Placeholder,
  HALFTONE_SMALL, HALFTONE_MED, HALFTONE_BIG, SPEED_LINES,
  BP, useWindowWidth, useBreakpoint,
});

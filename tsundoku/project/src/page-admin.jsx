// Panel Admin — Tsundoku
// Accessible via http://localhost:7788/#admin (sans authentification)
// Exporte AdminPage sur window

// ── Donnees mock ──────────────────────────────────────────────

const ADMIN_MANGAS = [
  { id: 'cs',  title: 'Chainsaw Man',     author: 'Tatsuki Fujimoto',  vol: 'T17',  price: '7,20e',  tag: 'Seinen', stock: true  },
  { id: 'op',  title: 'One Piece',         author: 'Eiichiro Oda',      vol: 'T108', price: '7,20e',  tag: 'Shonen', stock: true  },
  { id: 'jjk', title: 'Jujutsu Kaisen',   author: 'Gege Akutami',      vol: 'T27',  price: '6,95e',  tag: 'Shonen', stock: true  },
  { id: 'dn',  title: 'Death Note',        author: 'Tsugumi Ohba',      vol: 'T13',  price: '6,95e',  tag: 'Seinen', stock: false },
  { id: 'mha', title: 'My Hero Academia', author: 'Kohei Horikoshi',   vol: 'T39',  price: '6,95e',  tag: 'Shonen', stock: true  },
  { id: 'spy', title: 'Spy x Family',     author: 'Tatsuya Endo',      vol: 'T12',  price: '7,20e',  tag: 'Shonen', stock: true  },
  { id: 'ds',  title: 'Demon Slayer',      author: 'Koyoharu Gotouge', vol: 'T23',  price: '6,95e',  tag: 'Shonen', stock: false },
  { id: 'bl',  title: 'Berserk',           author: 'Kentaro Miura',    vol: 'T41',  price: '8,50e',  tag: 'Seinen', stock: true  },
  { id: 'vb',  title: 'Vinland Saga',      author: 'Makoto Yukimura',  vol: 'T27',  price: '8,50e',  tag: 'Seinen', stock: true  },
  { id: 'ab',  title: 'Akira',             author: 'Katsuhiro Otomo',  vol: 'T6',   price: '12,95e', tag: 'Seinen', stock: true  },
  { id: 'nb',  title: 'Naruto',            author: 'Masashi Kishimoto', vol: 'T72', price: '6,95e',  tag: 'Shonen', stock: false },
  { id: 'sk',  title: 'SK8 Infinity',      author: 'Hiroko Utsumi',    vol: 'T4',   price: '7,20e',  tag: 'Shojo',  stock: true  },
];

const ADMIN_RESAS = [
  { id: 1, client: 'Yuki K.',  manga: 'Chainsaw Man T17',   boutique: 'Toulon',    date: '28/04/2026', statut: 'confirme'   },
  { id: 2, client: 'Tom B.',   manga: 'One Piece T108',      boutique: 'Marseille', date: '28/04/2026', statut: 'en_attente' },
  { id: 3, client: 'Sara M.',  manga: 'Jujutsu Kaisen T27', boutique: 'Toulon',    date: '27/04/2026', statut: 'confirme'   },
  { id: 4, client: 'Lena P.',  manga: 'Spy x Family T12',   boutique: 'Marseille', date: '27/04/2026', statut: 'en_attente' },
  { id: 5, client: 'Remy O.',  manga: 'Berserk T41',         boutique: 'Toulon',    date: '26/04/2026', statut: 'annule'     },
  { id: 6, client: 'Naomi L.', manga: 'Vinland Saga T27',   boutique: 'Marseille', date: '26/04/2026', statut: 'confirme'   },
  { id: 7, client: 'Jules A.', manga: 'Demon Slayer T23',    boutique: 'Toulon',    date: '25/04/2026', statut: 'en_attente' },
  { id: 8, client: 'Chloe R.', manga: 'Naruto T72',          boutique: 'Marseille', date: '25/04/2026', statut: 'annule'     },
];

const ADMIN_EVENTS = [
  { id: 1, titre: 'Dedicace Gege Akutami', date: '15 Mai 2026', boutique: 'Toulon',    prix: 'Gratuit', inscrits: 42, actif: true  },
  { id: 2, titre: 'Quiz Shonen Battle',    date: '7 Mai 2026',  boutique: 'Marseille', prix: '5e',      inscrits: 28, actif: true  },
  { id: 3, titre: 'Atelier Dessin Manga',  date: '3 Mai 2026',  boutique: 'Toulon',    prix: '15e',     inscrits: 12, actif: false },
];

const ADMIN_TEAM = [
  { name: 'Armony',  role: 'Libraire', boutique: 'Toulon',    kanji: '花', accent: '#ff7db8' },
  { name: 'Damien',  role: 'Libraire', boutique: 'Toulon',    kanji: '力', accent: '#f4c83d' },
  { name: 'Fred',    role: 'Libraire', boutique: 'Marseille', kanji: '海', accent: '#e8b648' },
  { name: 'Fanny',   role: 'Libraire', boutique: 'Marseille', kanji: '星', accent: '#8cd3a0' },
];

// ── Composants utilitaires ────────────────────────────────────

function StatCard({ color, label, value, kanji }) {
  return (
    <div style={{
      background: '#14141c', border: '1px solid rgba(255,255,255,.1)',
      borderRadius: 8, padding: '28px 32px',
      position: 'relative', overflow: 'hidden', flex: 1, minWidth: 160,
    }}>
      {/* Halftone decoratif */}
      <div style={{
        position: 'absolute', inset: 0, color, opacity: .06,
        ...HALFTONE_MED, pointerEvents: 'none',
      }} />
      {/* Kanji fantome */}
      <div style={{
        position: 'absolute', right: -8, bottom: -16,
        fontFamily: FONTS.jpDisplay, fontWeight: 900, fontSize: 80,
        color, opacity: .12, lineHeight: 1, pointerEvents: 'none',
      }}>{kanji}</div>
      <div style={{ position: 'relative' }}>
        <div style={{
          fontSize: 10, letterSpacing: 4, color: 'rgba(255,255,255,.5)',
          fontWeight: 700, marginBottom: 10, textTransform: 'uppercase',
        }}>{label}</div>
        <div style={{
          fontFamily: FONTS.display, fontSize: 56, lineHeight: .9, color,
          textShadow: '3px 3px 0 rgba(0,0,0,.4)',
        }}>{value}</div>
      </div>
    </div>
  );
}

function StatusBadge({ statut }) {
  const map = {
    confirme:   { bg: 'rgba(100,220,100,.15)', border: 'rgba(100,220,100,.4)', text: '#6ddc6d', label: 'Confirme'   },
    en_attente: { bg: 'rgba(232,182,72,.15)',  border: 'rgba(232,182,72,.4)',  text: '#e8b648', label: 'En attente' },
    annule:     { bg: 'rgba(255,80,80,.15)',   border: 'rgba(255,80,80,.4)',   text: '#ff5050', label: 'Annule'     },
  };
  const c = map[statut] || map.en_attente;
  return (
    <span style={{
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
      fontSize: 10, letterSpacing: 2, fontWeight: 700,
      padding: '4px 10px', borderRadius: 99, textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>{c.label}</span>
  );
}

function SectionHeader({ accent, label, title }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{
        fontSize: 11, letterSpacing: 4, color: accent, fontWeight: 700,
        marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ width: 24, height: 1, background: accent, display: 'inline-block' }} />
        {label}
      </div>
      <div style={{
        fontFamily: FONTS.display, fontSize: 52, lineHeight: .9,
        color: '#fff', letterSpacing: -2,
        textShadow: '3px 3px 0 rgba(0,0,0,.5)',
      }}>{title}</div>
    </div>
  );
}

function ActionBtn({ label, color = 'rgba(255,255,255,.7)', bg = 'rgba(255,255,255,.08)', onClick }) {
  return (
    <button onClick={onClick} style={{
      background: bg, color, border: 'none',
      fontSize: 10, letterSpacing: 2, fontWeight: 700,
      padding: '6px 14px', borderRadius: 99,
      cursor: 'pointer', fontFamily: FONTS.body, textTransform: 'uppercase',
    }}>{label}</button>
  );
}

// Style commun pour les en-tetes de tableau
const TH_STYLE = {
  padding: '12px 20px', textAlign: 'left',
  fontSize: 10, letterSpacing: 2, color: 'rgba(255,255,255,.4)',
  fontWeight: 700, fontFamily: 'inherit',
};

// ── Vue Dashboard ─────────────────────────────────────────────

function DashboardView({ accent }) {
  return (
    <div>
      <SectionHeader accent={accent} label="VUE D'ENSEMBLE · 概要" title="Dashboard" />

      {/* Stat cards */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
        <StatCard color={accent}    label="Reservations actives" value="7"  kanji="予" />
        <StatCard color="#a35bff"   label="Mangas en catalogue"  value="12" kanji="本" />
        <StatCard color="#6ddc6d"   label="Evenements a venir"   value="3"  kanji="会" />
        <StatCard color="#f4c83d"   label="Membres equipe"       value="4"  kanji="人" />
      </div>

      {/* Tableau des dernieres reservations */}
      <div style={{
        background: '#14141c', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, overflow: 'hidden',
      }}>
        <div style={{
          padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,.08)',
        }}>
          <div style={{ fontSize: 11, letterSpacing: 4, fontWeight: 700, color: 'rgba(255,255,255,.4)' }}>
            DERNIERES RESERVATIONS
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONTS.body }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,.03)' }}>
              {['Client', 'Manga', 'Boutique', 'Date', 'Statut'].map(h => (
                <th key={h} style={TH_STYLE}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ADMIN_RESAS.slice(0, 5).map(r => (
              <tr key={r.id} style={{ borderTop: '1px solid rgba(255,255,255,.05)' }}>
                <td style={{ padding: '12px 20px', fontSize: 14, color: '#fff', fontWeight: 600 }}>{r.client}</td>
                <td style={{ padding: '12px 20px', fontSize: 13, color: 'rgba(255,255,255,.7)' }}>{r.manga}</td>
                <td style={{ padding: '12px 20px', fontSize: 12, color: 'rgba(255,255,255,.5)' }}>{r.boutique}</td>
                <td style={{ padding: '12px 20px', fontSize: 12, color: 'rgba(255,255,255,.4)' }}>{r.date}</td>
                <td style={{ padding: '12px 20px' }}><StatusBadge statut={r.statut} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Vue Catalogue ─────────────────────────────────────────────

function CatalogueView({ accent }) {
  const KEY = 'tsundoku_catalog';

  // ── Parseur CSV ────────────────────────────────────────────
  // Detecte le separateur (virgule ou point-virgule)
  function detectSep(line) {
    return (line.match(/;/g)||[]).length > (line.match(/,/g)||[]).length ? ';' : ',';
  }
  // Convertit un texte CSV brut en tableau d'objets
  function parseCSVText(text) {
    const lines = text.trim().split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) return { err: 'Fichier vide ou sans donnees.' };
    const sep     = detectSep(lines[0]);
    const headers = lines[0].split(sep).map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());
    const rows    = lines.slice(1).map(line => {
      const vals = line.split(sep).map(v => v.trim().replace(/^"|"$/g, ''));
      const obj  = {};
      headers.forEach((h, i) => { obj[h] = vals[i] || ''; });
      return obj;
    });
    return { rows, headers };
  }

  // ── Normalisation des donnees importees ────────────────────
  // Cherche la premiere valeur non-vide pour les cles proposees
  function pickField(obj) {
    // Renvoie une fonction qui cherche les cles dans l'ordre
    return function() {
      for (let i = 0; i < arguments.length; i++) {
        const k = arguments[i].toLowerCase();
        for (const ok of Object.keys(obj)) {
          if (ok.toLowerCase() === k && obj[ok]) return obj[ok];
        }
      }
      return '';
    };
  }

  // Convertit une ligne brute (CSV ou JSON) au format interne du site
  function normalize(raw, i) {
    const p = pickField(raw);
    const titre  = p('titre','title','nom','name') || 'Manga ' + (i + 1);
    const genre  = p('genre','tag','categorie','type','category');
    const gl     = genre.toLowerCase();

    // Kanji et couleur auto selon le genre (decor graphique)
    const KANJI = { shonen:'少', seinen:'青', shojo:'少女', josei:'女', yonkoma:'四', 'one-shot':'読' };
    const COLOR = { shonen:'#f4c83d', seinen:'#a35bff', shojo:'#ff7db8', josei:'#ff9ec4', yonkoma:'#5bffa6', 'one-shot':'#00d4ff' };

    const prixRaw  = p('prix','price','tarif','prix_eur');
    const prixNum  = parseFloat(String(prixRaw).replace(',', '.'));
    const stockStr = String(p('stock','disponible','available','dispo') || 'oui').toLowerCase();
    const nouvStr  = String(p('nouveau','new','nouveaute','new_release') || 'non').toLowerCase();

    return {
      id:     p('id','ean','isbn','reference') || titre.toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,6) + '_' + i,
      title:  titre,
      author: p('auteur','author','auteurs'),
      vol:    p('volume','vol','tome'),
      price:  isNaN(prixNum) ? prixRaw : prixNum.toFixed(2).replace('.',',') + '€',
      tag:    genre,
      kanji:  p('kanji') || KANJI[gl] || '本',
      accent: p('accent','couleur','color') || COLOR[gl] || '#8cd3a0',
      year:   parseInt(p('annee','year','an')) || 2026,
      rating: parseFloat(p('note','rating','score')) || 4.5,
      stock:  !['non','false','no','0','rupture','indisponible'].includes(stockStr),
      new:    ['oui','true','yes','1'].includes(nouvStr),
      desc:   p('description','desc','resume','synopsis'),
    };
  }

  // ── Persistance localStorage + API ───────────────────────────────
  function applyImport(rawList, source, info) {
    const normalized = rawList.map(function(r, i) { return normalize(r, i); });
    const payload = { source: source, sourceInfo: info, importedAt: new Date().toISOString(), count: normalized.length, mangas: normalized };
    // Sauvegarde locale (fallback offline)
    localStorage.setItem(KEY, JSON.stringify(payload));
    setMangas(normalized);
    setDataSource(source);
    setSourceInfo(info);
    setShowImport(false);
    setCsvPreview(null);
    setApiPreview(null);
    setCsvError('');
    setApiError('');

    // Envoi vers l'API backend (si disponible)
    if (typeof API_URL !== 'undefined') {
      fetch(API_URL + '/api/admin/mangas/import', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: JSON.stringify({ mangas: normalized }),
      })
        .then(r => r.json())
        .then(data => {
          if (data.success) {
            console.log('[Admin] Catalogue sauvegardé en base :', data.message);
          } else {
            console.warn('[Admin] Import API échoué :', data.message, '(localStorage conservé)');
          }
        })
        .catch(() => {
          console.warn('[Admin] Backend hors ligne — catalogue uniquement dans localStorage.');
        });
    }
  }

  function resetToStatic() {
    localStorage.removeItem(KEY);
    setMangas(ADMIN_MANGAS);
    setDataSource('static');
    setSourceInfo('');
  }

  // ── Initialisation depuis localStorage ─────────────────────
  const initData = React.useMemo(function() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
    catch (e) { return {}; }
  }, []);

  const [dataSource, setDataSource] = React.useState(initData.source || 'static');
  const [sourceInfo, setSourceInfo] = React.useState(initData.sourceInfo || '');
  const [mangas, setMangas]         = React.useState(function() {
    return (initData.mangas && initData.mangas.length) ? initData.mangas : ADMIN_MANGAS;
  });

  const [showModal,  setShowModal]  = React.useState(false);  // modal ajout manuel
  const [showImport, setShowImport] = React.useState(false);  // panneau import
  const [importTab,  setImportTab]  = React.useState('csv');  // 'csv' | 'api'
  const [showGuide,  setShowGuide]  = React.useState(false);  // guide du format

  // CSV
  const fileRef                     = React.useRef(null);
  const [csvError,   setCsvError]   = React.useState('');
  const [csvPreview, setCsvPreview] = React.useState(null); // null | { rows, rawList, filename }

  // API
  const [apiUrl,      setApiUrl]      = React.useState('');
  const [apiError,    setApiError]    = React.useState('');
  const [apiPreview,  setApiPreview]  = React.useState(null);
  const [apiFetching, setApiFetching] = React.useState(false);

  // Actions tableau
  const toggleStock = function(id) { setMangas(function(prev) { return prev.map(function(m) { return m.id === id ? Object.assign({}, m, {stock: !m.stock}) : m; }); }); };
  const remove      = function(id) { setMangas(function(prev) { return prev.filter(function(m) { return m.id !== id; }); }); };

  // ── Gestionnaires import ───────────────────────────────────
  function handleCSVFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      const res = parseCSVText(ev.target.result);
      if (res.err) { setCsvError(res.err); setCsvPreview(null); return; }
      setCsvError('');
      setCsvPreview({ rows: res.rows.slice(0, 3), rawList: res.rows, filename: file.name });
    };
    reader.readAsText(file, 'utf-8');
  }

  function fetchAPI() {
    if (!apiUrl.trim()) { setApiError('Saisissez une URL valide.'); return; }
    setApiFetching(true);
    setApiError('');
    setApiPreview(null);
    fetch(apiUrl.trim())
      .then(function(resp) {
        if (!resp.ok) throw new Error('HTTP ' + resp.status + ' — ' + resp.statusText);
        return resp.json();
      })
      .then(function(json) {
        let arr = json;
        if (!Array.isArray(arr)) {
          // Cherche un tableau dans la reponse (ex: { data: [...] })
          const found = Object.values(arr).find(function(v) { return Array.isArray(v); });
          if (!found) throw new Error('La reponse doit etre un tableau JSON [ {...}, {...} ].');
          arr = found;
        }
        setApiPreview({ rows: arr.slice(0, 3), rawList: arr });
        setApiFetching(false);
      })
      .catch(function(err) {
        setApiError(err.message);
        setApiFetching(false);
      });
  }

  // ── Source badge ───────────────────────────────────────────
  const SRC_COLOR = { static: 'rgba(255,255,255,.3)', csv: '#5bffa6', api: '#00d4ff' };
  const srcColor  = SRC_COLOR[dataSource] || SRC_COLOR.static;
  const srcLabel  = dataSource === 'csv'
    ? 'CSV importe · ' + sourceInfo
    : dataSource === 'api'
      ? 'API connectee · ' + sourceInfo
      : 'Donnees statiques du site';

  // Template CSV exemple affiche dans le guide
  const CSV_EXAMPLE = 'titre,auteur,volume,genre,prix,stock,nouveau\n' +
    'Chainsaw Man,Tatsuki Fujimoto,T17,Seinen,7.20,oui,non\n' +
    'One Piece,Eiichiro Oda,T108,Shonen,7.20,oui,oui\n' +
    'Berserk,Kentaro Miura,T42,Seinen,15.00,oui,non';

  const JSON_EXAMPLE = '[\n  {\n    "titre": "Chainsaw Man",\n    "auteur": "Tatsuki Fujimoto",\n    "volume": "T17",\n    "genre": "Seinen",\n    "prix": 7.20,\n    "stock": true,\n    "nouveau": false\n  }\n]';

  // Colonnes du guide
  const COL_REQUIS = [
    ['titre',  'Titre du manga (ex: Chainsaw Man)'],
    ['auteur', 'Auteur(s) (ex: Tatsuki Fujimoto)'],
    ['volume', 'Numero de tome (ex: T17)'],
    ['genre',  'Shonen · Seinen · Shojo · Josei · Yonkoma · One-shot'],
    ['prix',   'Prix en euros, virgule ou point acceptes (ex: 7.20 ou 7,20)'],
    ['stock',  'Disponibilite : oui / non'],
  ];
  const COL_OPT = [
    ['id',          'Identifiant unique (genere automatiquement si absent)'],
    ['nouveau',     'Mise en avant nouveaute : oui / non'],
    ['description', 'Resume / presentation du manga'],
    ['note',        'Note sur 5 (ex: 4.8)'],
    ['annee',       'Annee de parution (ex: 2026)'],
  ];

  // Rendu d'un apercu (preview) apres parse/fetch
  function PreviewTable({ preview }) {
    return (
      <div style={{ marginTop: 14 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,.4)', marginBottom: 8, fontWeight: 700 }}>
          APERCU — {preview.rawList.length} MANGA{preview.rawList.length > 1 ? 'S' : ''} DETECTE{preview.rawList.length > 1 ? 'S' : ''}
        </div>
        <div style={{ background: '#14141c', borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONTS.body }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,.04)' }}>
                {['Titre','Auteur','Volume','Genre','Prix','Stock'].map(function(h) {
                  return <th key={h} style={TH_STYLE}>{h}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {preview.rows.map(function(row, i) {
                const n = normalize(row, i);
                return (
                  <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,.05)' }}>
                    <td style={{ padding: '10px 16px', fontSize: 13, color: '#fff', fontWeight: 600 }}>{n.title}</td>
                    <td style={{ padding: '10px 16px', fontSize: 12, color: 'rgba(255,255,255,.6)' }}>{n.author}</td>
                    <td style={{ padding: '10px 16px', fontSize: 12, color: 'rgba(255,255,255,.5)' }}>{n.vol}</td>
                    <td style={{ padding: '10px 16px', fontSize: 11, color: 'rgba(255,255,255,.5)' }}>{n.tag}</td>
                    <td style={{ padding: '10px 16px', fontSize: 12, color: 'rgba(255,255,255,.6)' }}>{n.price}</td>
                    <td style={{ padding: '10px 16px' }}><StatusBadge statut={n.stock ? 'confirme' : 'annule'} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {preview.rawList.length > 3 && (
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', marginTop: 6, textAlign: 'right', letterSpacing: 1 }}>
            ... et {preview.rawList.length - 3} autre{preview.rawList.length - 3 > 1 ? 's' : ''}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>

      {/* ── EN-TETE SECTION ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <SectionHeader accent={accent} label="CATALOGUE · カタログ" title="Mangas" />
          {/* Badge source active */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: -14 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: srcColor, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: srcColor, letterSpacing: 1 }}>{srcLabel}</span>
            {dataSource !== 'static' && (
              <button onClick={resetToStatic} style={{
                background: 'none', border: '1px solid rgba(255,80,80,.4)', color: '#ff5050',
                fontSize: 10, letterSpacing: 1, padding: '2px 10px', borderRadius: 99,
                cursor: 'pointer', fontFamily: FONTS.body,
              }}>Reinitialiser</button>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button onClick={function() { setShowImport(function(v) { return !v; }); }} style={{
            background: showImport ? accent : accent + '1a',
            color: showImport ? '#0a0a12' : accent,
            border: '1px solid ' + accent + '44',
            padding: '10px 22px', fontSize: 11, letterSpacing: 3, fontWeight: 700,
            borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body, textTransform: 'uppercase',
          }}>
            {showImport ? '✕ Fermer' : '⇧ Importer'}
          </button>
          <button onClick={function() { setShowModal(true); }} style={{
            background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.7)',
            border: '1px solid rgba(255,255,255,.15)',
            padding: '10px 22px', fontSize: 11, letterSpacing: 3, fontWeight: 700,
            borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body, textTransform: 'uppercase',
          }}>+ Ajouter</button>
        </div>
      </div>

      {/* ── PANNEAU IMPORT ── */}
      {showImport && (
        <div style={{
          background: '#0e0e1a', border: '1px solid ' + accent + '33',
          borderRadius: 10, padding: 28, marginBottom: 28,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, color: accent, opacity: .03, ...HALFTONE_MED, pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>

            <div style={{ fontSize: 11, letterSpacing: 4, color: accent, fontWeight: 700, marginBottom: 18 }}>
              IMPORT CATALOGUE · データインポート
            </div>

            {/* Tabs CSV / API */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 22 }}>
              {[['csv','CSV / Fichier'],['api','API / JSON']].map(function(pair) {
                const id = pair[0]; const label = pair[1];
                return (
                  <button key={id} onClick={function() {
                    setImportTab(id);
                    setCsvPreview(null); setApiPreview(null);
                    setCsvError(''); setApiError('');
                    setShowGuide(false);
                  }} style={{
                    padding: '8px 22px', borderRadius: 99, border: 'none', cursor: 'pointer',
                    background: importTab === id ? accent : 'rgba(255,255,255,.07)',
                    color: importTab === id ? '#0a0a12' : 'rgba(255,255,255,.55)',
                    fontFamily: FONTS.body, fontWeight: 700, fontSize: 12, letterSpacing: 2,
                  }}>{label}</button>
                );
              })}
            </div>

            {/* ── TAB CSV ── */}
            {importTab === 'csv' && (
              <div>
                {/* Input fichier cache + zone de depot cliquable */}
                <input ref={fileRef} type="file" accept=".csv,.txt" style={{ display: 'none' }} onChange={handleCSVFile} />
                <div
                  onClick={function() { if (fileRef.current) fileRef.current.click(); }}
                  style={{
                    border: '2px dashed ' + accent + '44', borderRadius: 8,
                    padding: '28px 24px', textAlign: 'center', cursor: 'pointer',
                    background: 'rgba(255,255,255,.02)', marginBottom: 14,
                  }}
                >
                  <div style={{ fontSize: 26, marginBottom: 6, opacity: .4 }}>⇧</div>
                  <div style={{ fontSize: 13, color: '#fff', fontWeight: 600, marginBottom: 4 }}>
                    {csvPreview ? csvPreview.filename : 'Cliquez ou deposez votre fichier CSV ici'}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', letterSpacing: 1 }}>
                    {csvPreview
                      ? csvPreview.rawList.length + ' enregistrement' + (csvPreview.rawList.length > 1 ? 's' : '') + ' detecte' + (csvPreview.rawList.length > 1 ? 's' : '')
                      : '.csv · separateur , ou ; detecte automatiquement · encodage UTF-8'}
                  </div>
                </div>

                {/* Message d'erreur */}
                {csvError && (
                  <div style={{ background: 'rgba(255,80,80,.1)', border: '1px solid rgba(255,80,80,.3)', borderRadius: 6, padding: '10px 14px', color: '#ff5050', fontSize: 12, marginBottom: 12 }}>
                    {csvError}
                  </div>
                )}

                {/* Guide du format */}
                <button onClick={function() { setShowGuide(function(v) { return !v; }); }} style={{
                  background: 'none', border: 'none', color: accent, fontSize: 11,
                  letterSpacing: 2, cursor: 'pointer', fontFamily: FONTS.body, fontWeight: 700,
                  padding: 0, marginBottom: showGuide ? 12 : 4,
                }}>
                  {showGuide ? '▾' : '▸'} FORMAT DU FICHIER CSV
                </button>

                {showGuide && (
                  <div style={{ background: '#0a0a12', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, padding: 18, marginBottom: 14 }}>
                    <div style={{ fontSize: 10, letterSpacing: 3, color: accent, fontWeight: 700, marginBottom: 10 }}>COLONNES OBLIGATOIRES</div>
                    {COL_REQUIS.map(function(c) {
                      return (
                        <div key={c[0]} style={{ display: 'flex', gap: 12, marginBottom: 7, alignItems: 'flex-start' }}>
                          <code style={{ background: accent + '22', color: accent, padding: '2px 8px', borderRadius: 3, fontSize: 11, minWidth: 90, fontFamily: 'monospace', flexShrink: 0, letterSpacing: 0 }}>{c[0]}</code>
                          <span style={{ color: 'rgba(255,255,255,.55)', fontSize: 12, lineHeight: 1.4 }}>{c[1]}</span>
                        </div>
                      );
                    })}
                    <div style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,.3)', fontWeight: 700, margin: '14px 0 10px' }}>COLONNES OPTIONNELLES</div>
                    {COL_OPT.map(function(c) {
                      return (
                        <div key={c[0]} style={{ display: 'flex', gap: 12, marginBottom: 7, alignItems: 'flex-start' }}>
                          <code style={{ background: 'rgba(255,255,255,.07)', color: 'rgba(255,255,255,.45)', padding: '2px 8px', borderRadius: 3, fontSize: 11, minWidth: 90, fontFamily: 'monospace', flexShrink: 0, letterSpacing: 0 }}>{c[0]}</code>
                          <span style={{ color: 'rgba(255,255,255,.35)', fontSize: 12, lineHeight: 1.4 }}>{c[1]}</span>
                        </div>
                      );
                    })}
                    <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', marginTop: 14, paddingTop: 12 }}>
                      <div style={{ fontSize: 10, letterSpacing: 2, color: 'rgba(255,255,255,.3)', marginBottom: 8, fontWeight: 700 }}>EXEMPLE</div>
                      <pre style={{ color: '#5bffa6', background: '#070710', padding: '12px 14px', borderRadius: 6, fontSize: 11, lineHeight: 1.7, overflowX: 'auto', margin: 0, fontFamily: 'monospace' }}>{CSV_EXAMPLE}</pre>
                    </div>
                  </div>
                )}

                {/* Apercu CSV */}
                {csvPreview && <PreviewTable preview={csvPreview} />}
                {csvPreview && (
                  <button onClick={function() { applyImport(csvPreview.rawList, 'csv', csvPreview.filename); }} style={{
                    marginTop: 14, background: accent, color: '#0a0a12',
                    border: 'none', padding: '12px 30px', fontWeight: 700, fontSize: 12, letterSpacing: 3,
                    borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body, textTransform: 'uppercase',
                  }}>
                    Appliquer ({csvPreview.rawList.length} titres) →
                  </button>
                )}
              </div>
            )}

            {/* ── TAB API ── */}
            {importTab === 'api' && (
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', marginBottom: 16, lineHeight: 1.65 }}>
                  Saisissez l'URL de votre API ou d'un fichier JSON accessible en ligne.
                  La reponse attendue est un tableau d'objets <code style={{ background: 'rgba(255,255,255,.08)', padding: '1px 7px', borderRadius: 3, fontFamily: 'monospace', fontSize: 11 }}>{'[{...}]'}</code>.
                </div>

                {/* Saisie URL */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                  <input
                    value={apiUrl}
                    onChange={function(e) { setApiUrl(e.target.value); }}
                    placeholder="https://mon-serveur.com/api/catalogue"
                    style={{
                      flex: 1, padding: '12px 16px',
                      background: '#0a0a12', border: '1px solid ' + accent + '33',
                      color: '#fff', fontSize: 13, fontFamily: FONTS.body,
                      borderRadius: 6, outline: 'none',
                    }}
                  />
                  <button onClick={fetchAPI} disabled={apiFetching} style={{
                    background: accent, color: '#0a0a12', border: 'none',
                    padding: '12px 24px', fontWeight: 700, fontSize: 12, letterSpacing: 2,
                    borderRadius: 6, cursor: apiFetching ? 'wait' : 'pointer',
                    opacity: apiFetching ? .7 : 1, flexShrink: 0,
                    fontFamily: FONTS.body, textTransform: 'uppercase',
                  }}>
                    {apiFetching ? '...' : 'Tester →'}
                  </button>
                </div>

                {/* Guide format JSON */}
                <button onClick={function() { setShowGuide(function(v) { return !v; }); }} style={{
                  background: 'none', border: 'none', color: accent, fontSize: 11,
                  letterSpacing: 2, cursor: 'pointer', fontFamily: FONTS.body, fontWeight: 700,
                  padding: 0, marginBottom: showGuide ? 12 : 4,
                }}>
                  {showGuide ? '▾' : '▸'} FORMAT JSON ATTENDU
                </button>

                {showGuide && (
                  <div style={{ background: '#0a0a12', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, padding: 18, marginBottom: 14 }}>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', marginBottom: 10, lineHeight: 1.5 }}>
                      Les noms de champs sont les memes que le CSV. Si votre API retourne un objet enveloppant
                      <code style={{ fontFamily: 'monospace', background: 'rgba(255,255,255,.08)', padding: '1px 6px', borderRadius: 3, marginLeft: 4 }}>{'{ data: [...] }'}</code>,
                      le tableau est detecte automatiquement.
                    </div>
                    <pre style={{ color: '#5bffa6', background: '#070710', padding: '12px 14px', borderRadius: 6, fontSize: 11, lineHeight: 1.7, overflowX: 'auto', margin: 0, fontFamily: 'monospace' }}>{JSON_EXAMPLE}</pre>
                  </div>
                )}

                {/* Erreur */}
                {apiError && (
                  <div style={{ background: 'rgba(255,80,80,.1)', border: '1px solid rgba(255,80,80,.3)', borderRadius: 6, padding: '10px 14px', color: '#ff5050', fontSize: 12, marginBottom: 12 }}>
                    {apiError}
                  </div>
                )}

                {/* Apercu API */}
                {apiPreview && <PreviewTable preview={apiPreview} />}
                {apiPreview && (
                  <button onClick={function() { applyImport(apiPreview.rawList, 'api', apiUrl.trim()); }} style={{
                    marginTop: 14, background: accent, color: '#0a0a12',
                    border: 'none', padding: '12px 30px', fontWeight: 700, fontSize: 12, letterSpacing: 3,
                    borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body, textTransform: 'uppercase',
                  }}>
                    Appliquer ({apiPreview.rawList.length} titres) →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TABLE DU CATALOGUE ── */}
      <div style={{ background: '#14141c', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONTS.body }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,.03)' }}>
              {['Titre','Auteur','Volume','Genre','Prix','Statut','Actions'].map(function(h) {
                return <th key={h} style={TH_STYLE}>{h}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {mangas.map(function(m) {
              return (
                <tr key={m.id} style={{ borderTop: '1px solid rgba(255,255,255,.05)' }}>
                  <td style={{ padding: '12px 20px', fontSize: 14, color: '#fff', fontWeight: 600 }}>{m.title || m.titre}</td>
                  <td style={{ padding: '12px 20px', fontSize: 13, color: 'rgba(255,255,255,.6)' }}>{m.author || m.auteur}</td>
                  <td style={{ padding: '12px 20px', fontSize: 12, color: 'rgba(255,255,255,.5)' }}>{m.vol || m.volume}</td>
                  <td style={{ padding: '12px 20px' }}>
                    <span style={{ background: 'rgba(255,255,255,.06)', color: 'rgba(255,255,255,.55)', fontSize: 10, letterSpacing: 1, padding: '3px 8px', borderRadius: 4 }}>
                      {m.tag || m.genre}
                    </span>
                  </td>
                  <td style={{ padding: '12px 20px', fontSize: 13, color: 'rgba(255,255,255,.6)' }}>{m.price || m.prix}</td>
                  <td style={{ padding: '12px 20px' }}>
                    <button onClick={function() { toggleStock(m.id); }} style={{
                      background: m.stock ? 'rgba(100,220,100,.15)' : 'rgba(255,80,80,.15)',
                      border: '1px solid ' + (m.stock ? 'rgba(100,220,100,.4)' : 'rgba(255,80,80,.4)'),
                      color: m.stock ? '#6ddc6d' : '#ff5050',
                      fontSize: 10, letterSpacing: 2, padding: '4px 12px', borderRadius: 99,
                      cursor: 'pointer', fontFamily: FONTS.body, fontWeight: 700,
                    }}>{m.stock ? 'En stock' : 'Rupture'}</button>
                  </td>
                  <td style={{ padding: '12px 20px' }}>
                    <ActionBtn label="Suppr." color="#ff5050" onClick={function() { remove(m.id); }} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── MODAL AJOUT MANUEL ── */}
      {showModal && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(6px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={function() { setShowModal(false); }}
        >
          <div onClick={function(e) { e.stopPropagation(); }} style={{ background: '#14141c', border: '1px solid ' + accent + '44', borderRadius: 12, padding: 40, width: 460, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, color: accent, opacity: .05, ...HALFTONE_MED, borderRadius: 12, pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: accent, fontWeight: 700, marginBottom: 6 }}>NOUVEAU MANGA</div>
              <div style={{ fontFamily: FONTS.display, fontSize: 36, color: '#fff', marginBottom: 24 }}>Ajouter</div>
              {['Titre','Auteur','Volume','Prix'].map(function(field) {
                return (
                  <div key={field} style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, color: 'rgba(255,255,255,.45)', marginBottom: 6, fontWeight: 700 }}>{field.toUpperCase()}</div>
                    <input placeholder={field} style={{ width: '100%', padding: '10px 14px', background: '#0a0a12', border: '1px solid rgba(255,255,255,.1)', color: '#fff', fontSize: 14, fontFamily: FONTS.body, borderRadius: 4, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                );
              })}
              <button onClick={function() { setShowModal(false); }} style={{ marginTop: 10, width: '100%', background: accent, color: '#0a0a12', border: 'none', padding: '13px', fontSize: 12, letterSpacing: 3, fontWeight: 700, borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body }}>
                Enregistrer →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Vue Reservations ──────────────────────────────────────────

function ReservationsView({ accent, shop }) {
  const [resas, setResas]   = React.useState(ADMIN_RESAS);
  const [filtre, setFiltre] = React.useState('Tous');

  // Nom de la boutique active pour filtrer les reservations
  const boutiqueName = TSUNDOKU[shop].name;

  const FILTRES = ['Tous', 'en_attente', 'confirme', 'annule'];
  const LABELS  = { Tous: 'Tous', en_attente: 'En attente', confirme: 'Confirme', annule: 'Annule' };

  // Filtre d'abord par boutique, puis par statut
  const parBoutique = resas.filter(r => r.boutique === boutiqueName);
  const visible = filtre === 'Tous' ? parBoutique : parBoutique.filter(r => r.statut === filtre);
  const update  = (id, statut) => setResas(prev => prev.map(r => r.id === id ? { ...r, statut } : r));

  return (
    <div>
      <SectionHeader accent={accent} label="RESERVATIONS · 予約" title="Reservations" />

      {/* Pills filtre */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {FILTRES.map(f => (
          <button key={f} onClick={() => setFiltre(f)} style={{
            background: filtre === f ? accent : 'rgba(255,255,255,.06)',
            color: filtre === f ? '#0a0a12' : 'rgba(255,255,255,.55)',
            border: 'none', padding: '7px 16px', fontSize: 11, letterSpacing: 2,
            fontWeight: 700, borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body,
          }}>{LABELS[f]}</button>
        ))}
      </div>

      <div style={{
        background: '#14141c', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONTS.body }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,.03)' }}>
              {['Client', 'Manga', 'Boutique', 'Date', 'Statut', 'Actions'].map(h => (
                <th key={h} style={TH_STYLE}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map(r => (
              <tr key={r.id} style={{ borderTop: '1px solid rgba(255,255,255,.05)' }}>
                <td style={{ padding: '12px 20px', fontSize: 14, color: '#fff', fontWeight: 600 }}>{r.client}</td>
                <td style={{ padding: '12px 20px', fontSize: 13, color: 'rgba(255,255,255,.7)' }}>{r.manga}</td>
                <td style={{ padding: '12px 20px', fontSize: 12, color: 'rgba(255,255,255,.5)' }}>{r.boutique}</td>
                <td style={{ padding: '12px 20px', fontSize: 12, color: 'rgba(255,255,255,.4)' }}>{r.date}</td>
                <td style={{ padding: '12px 20px' }}><StatusBadge statut={r.statut} /></td>
                <td style={{ padding: '12px 20px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {r.statut !== 'confirme' && (
                      <ActionBtn label="Confirmer" color="#6ddc6d" onClick={() => update(r.id, 'confirme')} />
                    )}
                    {r.statut !== 'annule' && (
                      <ActionBtn label="Annuler" color="#ff5050" onClick={() => update(r.id, 'annule')} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Vue Evenements ────────────────────────────────────────────

function EvenementsView({ accent, shop }) {
  const [events, setEvents] = React.useState(ADMIN_EVENTS);
  const [showAdd, setShowAdd] = React.useState(false);
  const [newEvt, setNewEvt] = React.useState({ titre: '', date: '', prix: '', boutique: '' });

  const boutiqueName = TSUNDOKU[shop].name;
  // Filtre par boutique active
  const visible = events.filter(e => e.boutique === boutiqueName);

  const toggle = (id) => setEvents(prev => prev.map(e => e.id === id ? { ...e, actif: !e.actif } : e));
  const supprimer = (id) => setEvents(prev => prev.filter(e => e.id !== id));

  const ajouter = () => {
    if (!newEvt.titre.trim()) return;
    const evt = {
      id: Date.now(),
      titre: newEvt.titre,
      date: newEvt.date || 'A definir',
      boutique: boutiqueName,
      prix: newEvt.prix || 'Gratuit',
      inscrits: 0,
      actif: true,
    };
    setEvents(prev => [...prev, evt]);
    setNewEvt({ titre: '', date: '', prix: '', boutique: '' });
    setShowAdd(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <SectionHeader accent={accent} label="EVENEMENTS · イベント" title="Evenements" />
        <button onClick={() => setShowAdd(true)} style={{
          background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.7)',
          border: '1px solid rgba(255,255,255,.15)',
          padding: '10px 22px', fontSize: 11, letterSpacing: 3, fontWeight: 700,
          borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body, textTransform: 'uppercase',
        }}>+ Ajouter</button>
      </div>

      {visible.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 20px', color: 'rgba(255,255,255,.3)' }}>
          Aucun evenement pour {boutiqueName}.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {visible.map(ev => (
          <div key={ev.id} style={{
            background: '#14141c',
            border: `1px solid ${ev.actif ? 'rgba(255,255,255,.1)' : 'rgba(255,255,255,.04)'}`,
            borderRadius: 8, padding: '22px 28px',
            display: 'flex', alignItems: 'center', gap: 24,
            opacity: ev.actif ? 1 : 0.5, transition: 'opacity .3s',
          }}>
            {/* Badge date */}
            <div style={{
              background: accent + '1a', border: `1px solid ${accent}44`,
              borderRadius: 8, padding: '12px 16px', textAlign: 'center', minWidth: 64, flexShrink: 0,
            }}>
              <div style={{ fontFamily: FONTS.display, fontSize: 26, color: accent, lineHeight: 1 }}>
                {ev.date.split(' ')[0]}
              </div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: accent + 'cc', marginTop: 3 }}>
                {(ev.date.split(' ')[1] || '').toUpperCase()}
              </div>
            </div>

            {/* Infos */}
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONTS.display, fontSize: 22, color: '#fff', marginBottom: 6 }}>
                {ev.titre}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.45)', display: 'flex', gap: 16 }}>
                <span>· {ev.prix}</span>
                <span>· {ev.inscrits} inscrits</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <StatusBadge statut={ev.actif ? 'confirme' : 'annule'} />
              <ActionBtn label={ev.actif ? 'Desactiver' : 'Activer'} onClick={() => toggle(ev.id)} />
              <ActionBtn label="Suppr." color="#ff5050" onClick={() => supprimer(ev.id)} />
            </div>
          </div>
        ))}
      </div>

      {/* Modale ajout evenement */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(6px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setShowAdd(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#14141c', border: '1px solid ' + accent + '44', borderRadius: 12, padding: 40, width: 460, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, color: accent, opacity: .05, ...HALFTONE_MED, borderRadius: 12, pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: accent, fontWeight: 700, marginBottom: 6 }}>NOUVEL EVENEMENT</div>
              <div style={{ fontFamily: FONTS.display, fontSize: 36, color: '#fff', marginBottom: 24 }}>Ajouter</div>
              {[['Titre', 'titre', 'Ex: Dedicace Gege Akutami'], ['Date', 'date', 'Ex: 15 Mai 2026'], ['Prix', 'prix', 'Ex: Gratuit ou 5e']].map(([label, key, ph]) => (
                <div key={key} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: 'rgba(255,255,255,.45)', marginBottom: 6, fontWeight: 700 }}>{label.toUpperCase()}</div>
                  <input value={newEvt[key]} onChange={e => setNewEvt(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={ph} style={{ width: '100%', padding: '10px 14px', background: '#0a0a12', border: '1px solid rgba(255,255,255,.1)', color: '#fff', fontSize: 14, fontFamily: FONTS.body, borderRadius: 4, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', marginBottom: 16 }}>
                Boutique : <strong style={{ color: accent }}>{boutiqueName}</strong>
              </div>
              <button onClick={ajouter} style={{ width: '100%', background: accent, color: '#0a0a12', border: 'none', padding: '13px', fontSize: 12, letterSpacing: 3, fontWeight: 700, borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body }}>
                Enregistrer →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Vue Equipe ────────────────────────────────────────────────

function EquipeView({ accent, shop }) {
  const [team, setTeam] = React.useState(ADMIN_TEAM);
  const [showAdd, setShowAdd] = React.useState(false);
  const [newMember, setNewMember] = React.useState({ name: '', role: '', kanji: '' });

  const boutiqueName = TSUNDOKU[shop].name;
  // Filtre par boutique active
  const visible = team.filter(m => m.boutique === boutiqueName);

  const supprimer = (name) => setTeam(prev => prev.filter(m => m.name !== name));

  const ajouter = () => {
    if (!newMember.name.trim()) return;
    const membre = {
      name: newMember.name,
      role: newMember.role || 'Libraire',
      boutique: boutiqueName,
      kanji: newMember.kanji || '人',
      accent: accent,
    };
    setTeam(prev => [...prev, membre]);
    setNewMember({ name: '', role: '', kanji: '' });
    setShowAdd(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <SectionHeader accent={accent} label="EQUIPE · チーム" title="Membres" />
        <button onClick={() => setShowAdd(true)} style={{
          background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.7)',
          border: '1px solid rgba(255,255,255,.15)',
          padding: '10px 22px', fontSize: 11, letterSpacing: 3, fontWeight: 700,
          borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body, textTransform: 'uppercase',
        }}>+ Ajouter</button>
      </div>

      {visible.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 20px', color: 'rgba(255,255,255,.3)' }}>
          Aucun membre pour {boutiqueName}.
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 16,
      }}>
        {visible.map(m => (
          <div key={m.name} style={{
            background: '#14141c', border: '1px solid rgba(255,255,255,.1)',
            borderRadius: 8, padding: '28px 24px', position: 'relative', overflow: 'hidden',
          }}>
            {/* Kanji fantome */}
            <div style={{
              position: 'absolute', right: -8, bottom: -12,
              fontFamily: FONTS.jpDisplay, fontWeight: 900, fontSize: 90,
              color: m.accent, opacity: .1, lineHeight: 1, pointerEvents: 'none',
            }}>{m.kanji}</div>

            <div style={{ position: 'relative' }}>
              {/* Avatar */}
              <div style={{
                width: 52, height: 52, borderRadius: 99,
                background: m.accent + '1a', border: `2px solid ${m.accent}55`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FONTS.jpDisplay, fontWeight: 900, fontSize: 22, color: m.accent,
                marginBottom: 14,
              }}>{m.kanji}</div>

              <div style={{ fontFamily: FONTS.display, fontSize: 20, color: '#fff', marginBottom: 4 }}>{m.name}</div>
              <div style={{ fontSize: 12, letterSpacing: 1, color: 'rgba(255,255,255,.45)', marginBottom: 16 }}>{m.role}</div>
              <ActionBtn label="Supprimer" color="#ff5050" onClick={() => supprimer(m.name)} />
            </div>
          </div>
        ))}
      </div>

      {/* Modale ajout membre */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(6px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setShowAdd(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#14141c', border: '1px solid ' + accent + '44', borderRadius: 12, padding: 40, width: 460, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, color: accent, opacity: .05, ...HALFTONE_MED, borderRadius: 12, pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: accent, fontWeight: 700, marginBottom: 6 }}>NOUVEAU MEMBRE</div>
              <div style={{ fontFamily: FONTS.display, fontSize: 36, color: '#fff', marginBottom: 24 }}>Ajouter</div>
              {[['Nom complet', 'name', 'Ex: Mehdi Ayyadi'], ['Role', 'role', 'Ex: Libraire shonen'], ['Kanji', 'kanji', 'Un seul caractere, ex: 力']].map(([label, key, ph]) => (
                <div key={key} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: 'rgba(255,255,255,.45)', marginBottom: 6, fontWeight: 700 }}>{label.toUpperCase()}</div>
                  <input value={newMember[key]} onChange={e => setNewMember(prev => ({ ...prev, [key]: e.target.value }))}
                    placeholder={ph} style={{ width: '100%', padding: '10px 14px', background: '#0a0a12', border: '1px solid rgba(255,255,255,.1)', color: '#fff', fontSize: 14, fontFamily: FONTS.body, borderRadius: 4, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', marginBottom: 16 }}>
                Boutique : <strong style={{ color: accent }}>{boutiqueName}</strong>
              </div>
              <button onClick={ajouter} style={{ width: '100%', background: accent, color: '#0a0a12', border: 'none', padding: '13px', fontSize: 12, letterSpacing: 3, fontWeight: 700, borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body }}>
                Enregistrer →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Composant principal AdminPage ─────────────────────────────

function AdminPage({ shop, onBack, onShopSwitch }) {
  const S      = TSUNDOKU[shop];
  const accent = S.accent;

  const [section, setSection] = React.useState('dashboard');

  const NAV = [
    { id: 'dashboard',    label: 'Dashboard',    kanji: '◈' },
    { id: 'catalogue',    label: 'Catalogue',    kanji: '本' },
    { id: 'reservations', label: 'Reservations', kanji: '予' },
    { id: 'evenements',   label: 'Evenements',   kanji: '会' },
    { id: 'equipe',       label: 'Equipe',       kanji: '人' },
  ];

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', background: '#0a0a12',
      fontFamily: FONTS.body, color: '#fff', overflow: 'hidden',
    }}>

      {/* ── SIDEBAR ── */}
      <div style={{
        width: 240, flexShrink: 0,
        background: '#070710', borderRight: '1px solid rgba(255,255,255,.08)',
        display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 32, height: 32, background: accent + '1a',
              border: `1px solid ${accent}55`, borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: FONTS.jpDisplay, fontWeight: 900, fontSize: 14, color: accent,
            }}>積</div>
            <div style={{ fontFamily: FONTS.display, fontSize: 18, lineHeight: 1 }}>Tsundoku</div>
          </div>
          <div style={{
            display: 'inline-block', background: accent + '1a',
            border: `1px solid ${accent}44`, borderRadius: 4,
            fontSize: 9, letterSpacing: 3, fontWeight: 700, color: accent, padding: '3px 8px',
          }}>ADMIN PANEL</div>
        </div>

        {/* Selecteur boutique */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: 'rgba(255,255,255,.3)', marginBottom: 8, fontWeight: 700 }}>BOUTIQUE</div>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,.04)', borderRadius: 99, padding: 3 }}>
            {['toulon', 'marseille'].map(s => (
              <button key={s} onClick={() => onShopSwitch(s)} style={{
                flex: 1, padding: '6px 0', border: 'none', cursor: 'pointer', borderRadius: 99,
                background: shop === s ? TSUNDOKU[s].accent : 'transparent',
                color: shop === s ? TSUNDOKU[s].bgDeep : 'rgba(255,255,255,.4)',
                fontFamily: FONTS.body, fontSize: 10, fontWeight: 700,
                letterSpacing: 1, textTransform: 'uppercase',
              }}>{TSUNDOKU[s].name}</button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '10px 0', overflowY: 'auto' }}>
          {NAV.map(n => {
            const active = section === n.id;
            return (
              <button key={n.id} onClick={() => setSection(n.id)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 24px', border: 'none', cursor: 'pointer',
                background: active ? accent + '14' : 'transparent',
                borderLeft: `2px solid ${active ? accent : 'transparent'}`,
                color: active ? '#fff' : 'rgba(255,255,255,.42)',
                fontFamily: FONTS.body, fontSize: 13,
                fontWeight: active ? 700 : 500, textAlign: 'left', transition: 'all .18s',
              }}>
                <span style={{
                  fontFamily: FONTS.jpDisplay, fontSize: 15,
                  color: active ? accent : 'rgba(255,255,255,.22)', width: 20, textAlign: 'center',
                }}>{n.kanji}</span>
                {n.label}
              </button>
            );
          })}
        </nav>

        {/* Retour au site */}
        <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <button onClick={onBack} style={{
            width: '100%', padding: '10px', border: '1px solid rgba(255,255,255,.1)',
            background: 'transparent', color: 'rgba(255,255,255,.45)',
            fontSize: 11, letterSpacing: 2, fontWeight: 700, borderRadius: 99,
            cursor: 'pointer', fontFamily: FONTS.body,
          }}>◇ Retour au site</button>
        </div>
      </div>

      {/* ── CONTENU PRINCIPAL ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '48px 52px' }}>
        {section === 'dashboard'    && <DashboardView    accent={accent} />}
        {section === 'catalogue'    && <CatalogueView    accent={accent} />}
        {section === 'reservations' && <ReservationsView accent={accent} shop={shop} />}
        {section === 'evenements'   && <EvenementsView   accent={accent} shop={shop} />}
        {section === 'equipe'       && <EquipeView       accent={accent} shop={shop} />}
      </div>
    </div>
  );
}

Object.assign(window, { AdminPage });

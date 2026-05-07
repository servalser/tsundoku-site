// Reservations — recherche et reservation de mangas
// Exports: CatalogPage, MANGAS, FakeCover

// ─── Limite de reservations par personne ───────────────────────────────────
// Pas encore defini — changer cette seule constante quand le chiffre est fixe.
const RESA_LIMIT = 3;
// ───────────────────────────────────────────────────────────────────────────

const GENRES = ['Tous', 'Shonen', 'Seinen', 'Shojo', 'Josei', 'Yonkoma', 'One-shot'];

const MANGAS = [
  { id: 'cs',  title: 'Chainsaw Man',     author: 'Tatsuki Fujimoto',  vol: 'T17',  price: '7,20€',  tag: 'Seinen', kanji: '鋸', accent: '#ff3860', year: 2026, rating: 4.9 },
  { id: 'op',  title: 'One Piece',         author: 'Eiichiro Oda',      vol: 'T108', price: '7,20€',  tag: 'Shonen', kanji: '海', accent: '#f4c83d', year: 2026, rating: 4.8 },
  { id: 'jjk', title: 'Jujutsu Kaisen',    author: 'Gege Akutami',      vol: 'T27',  price: '6,95€',  tag: 'Shonen', kanji: '呪', accent: '#a35bff', year: 2026, rating: 4.7 },
  { id: 'vnl', title: 'Vinland Saga',      author: 'Makoto Yukimura',   vol: 'T28',  price: '8,95€',  tag: 'Seinen', kanji: '斧', accent: '#d8a35b', year: 2025, rating: 4.9 },
  { id: 'dai', title: 'Dai Dark',          author: 'Q Hayashida',       vol: 'T08',  price: '8,50€',  tag: 'Seinen', kanji: '闇', accent: '#00d4ff', year: 2026, rating: 4.6 },
  { id: 'frn', title: 'Frieren',           author: 'Kanehito Yamada',   vol: 'T13',  price: '6,95€',  tag: 'Shonen', kanji: '葬', accent: '#8cd3a0', year: 2026, rating: 4.9 },
  { id: 'brc', title: 'Blue Period',       author: 'Tsubasa Yamaguchi', vol: 'T15',  price: '7,20€',  tag: 'Seinen', kanji: '青', accent: '#5b89ff', year: 2025, rating: 4.8 },
  { id: 'sak', title: 'Sakamoto Days',     author: 'Yuto Suzuki',       vol: 'T19',  price: '6,95€',  tag: 'Shonen', kanji: '殺', accent: '#ff7db8', year: 2026, rating: 4.6 },
  { id: 'brk', title: 'Berserk',           author: 'Kentaro Miura',     vol: 'T42',  price: '15,00€', tag: 'Seinen', kanji: '剣', accent: '#c8412a', year: 2025, rating: 5.0 },
  { id: 'knh', title: 'Kaiju No. 8',       author: 'Naoya Matsumoto',   vol: 'T13',  price: '6,95€',  tag: 'Shonen', kanji: '怪', accent: '#5bffa6', year: 2026, rating: 4.5 },
  { id: 'tbo', title: 'Tokyo Revengers',   author: 'Ken Wakui',         vol: 'T31',  price: '6,95€',  tag: 'Shonen', kanji: '時', accent: '#ffab4a', year: 2025, rating: 4.4 },
  { id: 'ccb', title: 'Cat on the Hero',   author: 'Kureha',            vol: 'T04',  price: '7,95€',  tag: 'Shojo',  kanji: '猫', accent: '#ff9ec4', year: 2026, rating: 4.7 },
];

// Retourne le catalogue actif :
// — donnees importees via le panel admin (localStorage) si disponibles
// — sinon revient sur le tableau MANGAS statique ci-dessus
// Note : cette fonction synchrone est utilisée en fallback.
// Le composant CatalogPage charge le catalogue depuis l'API en premier.
function getActiveCatalog() {
  try {
    const raw = localStorage.getItem('tsundoku_catalog');
    if (!raw) return MANGAS;
    const data = JSON.parse(raw);
    if (Array.isArray(data.mangas) && data.mangas.length > 0) return data.mangas;
  } catch (e) { /* localStorage indisponible ou JSON corrompu */ }
  return MANGAS;
}

// Couverture manga generee en CSS pur — pas de badge editorial
function FakeCover({ m, style = {}, compact = false }) {
  return (
    <div style={{
      aspectRatio: compact ? '0.7' : '0.68',
      background: m.accent,
      position: 'relative', overflow: 'hidden',
      border: '2px solid #111',
      boxShadow: '4px 4px 0 #111',
      ...style,
    }}>
      <div style={{ position: 'absolute', inset: 0, color: 'rgba(0,0,0,.35)', opacity: .7, ...HALFTONE_SMALL }} />
      <div style={{
        position: 'absolute', left: '-10%', top: '38%', right: '-10%', height: '3px',
        background: '#111', transform: 'rotate(-18deg)',
      }} />
      <div style={{
        position: 'absolute', right: '-10%', top: '-14%',
        fontFamily: FONTS.jpDisplay, fontWeight: 900,
        fontSize: 'clamp(120px, 80cqw, 360px)', containerType: 'inline-size',
        lineHeight: .85, color: '#111', opacity: .9, mixBlendMode: 'multiply',
      }}>{m.kanji}</div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: '#111', color: m.accent, padding: '10px 12px 12px',
        borderTop: '2px solid #111',
      }}>
        <div style={{ fontFamily: FONTS.display, fontSize: compact ? 12 : 16, lineHeight: 1, letterSpacing: -.5, textTransform: 'uppercase' }}>
          {m.title}
        </div>
        <div style={{ fontSize: 8, letterSpacing: 2, marginTop: 4, color: '#fff', opacity: .65, fontWeight: 700 }}>
          {m.vol} · {m.author}
        </div>
      </div>
    </div>
  );
}

function FilterPill({ label, active, onClick, accent, ink, dark }) {
  return (
    <button onClick={onClick} style={{
      padding: '8px 16px', borderRadius: 99,
      border: active ? `2px solid ${accent}` : `1.5px solid ${dark ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.12)'}`,
      background: active ? accent : 'transparent',
      color: active ? '#111' : ink,
      fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
      cursor: 'pointer', fontFamily: FONTS.body, transition: 'all .15s',
    }}>{label}</button>
  );
}

function CatalogPage({ shop = 'toulon', theme = 'dark', onBack, onShopSwitch, onToggleTheme, onConnect, connected, client, onOpenManga, onNav }) {
  const S      = TSUNDOKU[shop];
  const dark   = theme === 'dark';
  const bg     = dark ? '#0a0a12' : '#f7f5ef';
  const ink    = dark ? '#fff'    : '#111';
  const muted  = dark ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.55)';
  const cardBg = dark ? '#14141c' : '#fff';
  const border = dark ? 'rgba(255,255,255,.1)'  : 'rgba(0,0,0,.1)';

  // Breakpoint pour adapter le layout
  const bp = useBreakpoint();
  // Filtres ouverts/fermés sur mobile (accordéon)
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  // Catalogue chargé depuis l'API, avec fallback sur localStorage puis MANGAS statique
  const [catalog, setCatalog] = React.useState(getActiveCatalog);

  // Charge le catalogue depuis l'API au montage du composant
  React.useEffect(() => {
    if (typeof API_URL === 'undefined') return;   // backend non configuré
    fetch(API_URL + '/api/mangas?sort=new&page=1')
      .then(r => r.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCatalog(data.data);
        }
      })
      .catch(() => { /* serveur hors ligne — catalogue statique conservé */ });
  }, []);

  const [genre, setGenre]           = React.useState('Tous');
  const [sort,  setSort]            = React.useState('new');
  const [search, setSearch]         = React.useState('');
  // reservations stocke les mangas sélectionnés ({ id: slug, dbId: int })
  const [reservations, setReservations] = React.useState([]);

  // État de la soumission de la réservation
  const [resaLoading, setResaLoading] = React.useState(false);
  const [resaSucces,  setResaSucces]  = React.useState(false);
  const [resaErreur,  setResaErreur]  = React.useState('');

  // Basculer la reservation d'un manga (ajouter ou retirer)
  const toggleResa = (manga) => {
    setReservations(r => {
      const id = manga.id ?? manga.dbId ?? manga;
      const deja = r.find(x => (x.id ?? x) === id);
      if (deja) return r.filter(x => (x.id ?? x) !== id);  // retirer
      if (r.length >= RESA_LIMIT) return r;                 // limite atteinte
      // Stocker l'objet entier pour accéder au dbId lors de la soumission
      return [...r, typeof manga === 'object' ? manga : { id: manga }];
    });
    setResaSucces(false);
    setResaErreur('');
  };

  // Soumettre les réservations à l'API
  async function soumettreReservation() {
    if (!connected) {
      // Si non connecté, ouvrir la modale de connexion
      onConnect && onConnect();
      return;
    }

    // Récupère les IDs numériques (dbId) des mangas sélectionnés
    const mangaIds = reservations
      .map(r => r.dbId)
      .filter(id => typeof id === 'number');

    if (mangaIds.length === 0) {
      setResaErreur('Identifiants de mangas introuvables. Rechargez le catalogue depuis l\'API.');
      return;
    }

    setResaLoading(true);
    setResaErreur('');
    try {
      const res = await fetch(API_URL + '/api/reservations', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: JSON.stringify({ manga_ids: mangaIds }),
      });
      const data = await res.json();
      if (data.success) {
        setResaSucces(true);
        setReservations([]);   // vider la sélection après succès
      } else {
        setResaErreur(data.message || 'Erreur lors de la réservation');
      }
    } catch (e) {
      setResaErreur('Impossible de contacter le serveur.');
    }
    setResaLoading(false);
  }

  // Aide pour vérifier si un manga est dans la sélection
  const isResaActive = (m) => !!reservations.find(r => (r.id ?? r) === (m.id ?? m));

  // Filtrage : genre + recherche textuelle (titre ou auteur)
  const q = search.toLowerCase().trim();
  let filtered = catalog.filter(m => {
    const matchGenre  = genre === 'Tous' || m.tag === genre;
    const matchSearch = !q
      || m.title.toLowerCase().includes(q)
      || m.author.toLowerCase().includes(q);
    return matchGenre && matchSearch;
  });

  if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sort === 'new')    filtered = [...filtered].sort((a, b) => b.year   - a.year);

  const limitAtteinte = reservations.length >= RESA_LIMIT;
  const reservationsIds = reservations.map(r => r.id ?? r);

  return (
    <div style={{ width: '100%', background: bg, color: ink, fontFamily: FONTS.body, minHeight: 800 }}>
      <Navbar
        shop={shop} theme={theme} connected={connected}
        active="Reservations"
        onConnect={onConnect} onBack={onBack}
        onToggleTheme={onToggleTheme} onShopSwitch={onShopSwitch} onNav={onNav}
      />

      {/* ── EN-TETE BD-style ── */}
      <div style={{
        position: 'relative',
        padding: bp.isMobile ? '50px 20px 36px' : bp.isTablet ? '60px 40px 40px' : '70px 60px 50px',
        overflow: 'hidden', background: S.bg, color: '#fff',
      }}>
        <div style={{ position: 'absolute', inset: 0, color: S.accent, opacity: .18, ...HALFTONE_MED }} />
        {/* Kanji de fond — masqué sur mobile pour ne pas surcharger */}
        {!bp.isMobile && (
          <div style={{
            position: 'absolute', right: -20, top: -60,
            fontFamily: FONTS.jpDisplay, fontWeight: 900,
            fontSize: bp.isTablet ? 200 : 340,
            color: S.accent, opacity: .18, lineHeight: .85, letterSpacing: -10,
          }}>予約</div>
        )}
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
          <div style={{
            fontSize: 11, letterSpacing: 4, color: S.accent, fontWeight: 700,
            marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 24, height: 1, background: S.accent }} />
            Reservations · 予約
          </div>
          <h1 style={{
            fontFamily: FONTS.display,
            fontSize: bp.isMobile ? 52 : bp.isTablet ? 72 : 92,
            lineHeight: .9, margin: 0, letterSpacing: -3,
            textShadow: `4px 4px 0 ${S.bgDeep}`,
          }}>
            Reservez<br/>
            <span style={{ color: S.accent }}>votre manga.</span>
          </h1>
          {/* Sous-titre masqué sur mobile */}
          {!bp.isMobile && (
            <div style={{ marginTop: 18, maxWidth: 560, fontSize: 16, lineHeight: 1.55, opacity: .85 }}>
              {catalog.length} titres disponibles a {S.name}. Selectionnez ceux qui vous interessent
              et recuperez-les directement en boutique — mis de cote pendant 7 jours.
            </div>
          )}
        </div>
      </div>

      {/* ── BARRE DE RECHERCHE + FILTRES (sticky sous la navbar) ── */}
      <div style={{
        position: 'sticky', top: 71, zIndex: 10,
        background: dark ? 'rgba(10,10,18,.95)' : 'rgba(247,245,239,.95)',
        backdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${border}`,
        padding: bp.isMobile ? '12px 16px' : '16px 60px',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          {/* Recherche + toggle filtres sur mobile */}
          <div style={{ display: 'flex', gap: 8, marginBottom: bp.isMobile ? 0 : 14, alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{
                position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                fontSize: 17, color: muted, pointerEvents: 'none', userSelect: 'none',
              }}>⌕</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Titre, auteur…"
                style={{
                  width: '100%', padding: '11px 40px',
                  background: dark ? '#14141c' : '#fff',
                  border: `1.5px solid ${search ? S.accent : border}`,
                  color: ink, fontSize: bp.isMobile ? 14 : 15, fontFamily: FONTS.body,
                  borderRadius: 99, outline: 'none', transition: 'border-color .2s',
                }}
              />
              {search && (
                <button onClick={() => setSearch('')} style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'transparent', border: 'none', color: muted,
                  fontSize: 20, lineHeight: 1, cursor: 'pointer',
                }}>×</button>
              )}
            </div>

            {/* Compteur de réservations — toujours visible */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 12px', borderRadius: 99, flexShrink: 0,
              background: limitAtteinte ? S.accent : dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.05)',
              color: limitAtteinte ? S.bgDeep : ink,
              fontSize: 12, fontWeight: 700, letterSpacing: 1,
              transition: 'background .25s, color .25s',
            }}>
              <span style={{
                width: 20, height: 20, borderRadius: 99,
                background: limitAtteinte ? S.bgDeep : S.accent,
                color: limitAtteinte ? S.accent : S.bgDeep,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 900,
              }}>{reservations.length}</span>
              <span>/{RESA_LIMIT}</span>
            </div>

            {/* Bouton toggle filtres — mobile uniquement */}
            {bp.isMobile && (
              <button onClick={() => setFiltersOpen(o => !o)} style={{
                padding: '10px 14px', borderRadius: 99, border: `1.5px solid ${border}`,
                background: filtersOpen ? S.accent : 'transparent',
                color: filtersOpen ? S.bgDeep : ink,
                fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
                textTransform: 'uppercase', cursor: 'pointer', fontFamily: FONTS.body,
                flexShrink: 0,
              }}>Filtres {filtersOpen ? '▲' : '▼'}</button>
            )}
          </div>

          {/* Filtres genre + tri — toujours visibles sur desktop, accordéon sur mobile */}
          {(!bp.isMobile || filtersOpen) && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
              marginTop: bp.isMobile ? 10 : 0,
              paddingTop: bp.isMobile ? 10 : 0,
              borderTop: bp.isMobile ? `1px solid ${border}` : 'none',
            }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: muted, fontWeight: 700, textTransform: 'uppercase' }}>Genre</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {GENRES.map(g => (
                  <FilterPill key={g} label={g} active={genre === g}
                    onClick={() => { setGenre(g); if (bp.isMobile) setFiltersOpen(false); }}
                    accent={S.accent} ink={ink} dark={dark} />
                ))}
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ fontSize: 10, letterSpacing: 3, color: muted, fontWeight: 700, textTransform: 'uppercase' }}>Tri</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[['new', 'Nouveaute'], ['rating', 'Note']].map(([k, l]) => (
                  <FilterPill key={k} label={l} active={sort === k}
                    onClick={() => setSort(k)} accent={S.accent} ink={ink} dark={dark} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── GRILLE DE MANGAS ── */}
      <div style={{ padding: bp.isMobile ? '30px 16px 60px' : bp.isTablet ? '40px 40px 70px' : '50px 60px 90px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          {/* Etat vide apres recherche */}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: muted }}>
              <div style={{ fontFamily: FONTS.display, fontSize: bp.isMobile ? 36 : 52, letterSpacing: -1.5, marginBottom: 12 }}>
                Aucun resultat.
              </div>
              <div style={{ fontSize: 15 }}>Essayez un autre titre ou auteur.</div>
              <button onClick={() => setSearch('')} style={{
                marginTop: 20, padding: '10px 22px', border: `1px solid ${border}`,
                background: 'transparent', color: ink, borderRadius: 99,
                fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                cursor: 'pointer', fontFamily: FONTS.body,
              }}>Effacer la recherche</button>
            </div>
          )}

          {/* Grille responsive : 2 cols mobile → 3 cols tablette → 4 cols desktop */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: bp.isMobile ? 'repeat(2, 1fr)' : bp.isTablet ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
            gap: bp.isMobile ? 14 : 28,
          }}>
            {filtered.map((m) => {
              const isResa   = isResaActive(m);
              const disabled = !isResa && limitAtteinte;
              return (
                <div key={m.id}>
                  {/* Couverture — clic → fiche detail */}
                  <div
                    onClick={() => onOpenManga && onOpenManga(m.id)}
                    style={{ cursor: 'pointer', transition: 'transform .25s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px) rotate(-0.5deg)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) rotate(0)'}
                  >
                    <FakeCover m={m} />
                  </div>

                  {/* Infos + bouton reserver */}
                  <div style={{ marginTop: bp.isMobile ? 8 : 14 }}>
                    <div style={{
                      fontSize: 9, letterSpacing: 2, color: S.accent,
                      fontWeight: 700, textTransform: 'uppercase', marginBottom: 3,
                    }}>
                      {m.tag} · {m.vol}
                    </div>
                    <div style={{ fontFamily: FONTS.display, fontSize: bp.isMobile ? 15 : 20, lineHeight: 1, letterSpacing: -.5 }}>
                      {m.title}
                    </div>
                    {/* Auteur masqué sur mobile pour éviter la surcharge */}
                    {!bp.isMobile && (
                      <div style={{ fontSize: 12, color: muted, marginTop: 3 }}>{m.author}</div>
                    )}
                    <div style={{
                      marginTop: 6, display: 'flex',
                      justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      <span style={{ fontFamily: FONTS.display, fontSize: bp.isMobile ? 14 : 18 }}>{m.price}</span>
                    </div>

                    {/* Bouton reserver / reserve / limite */}
                    <button
                      onClick={() => toggleResa(m)}
                      disabled={disabled}
                      style={{
                        marginTop: 12, width: '100%', padding: '11px 0',
                        background: isResa ? S.accent : 'transparent',
                        color:      isResa ? S.bgDeep : disabled ? muted : ink,
                        border:     isResa ? 'none'
                                  : `2px solid ${disabled ? border : ink}`,
                        fontWeight: 700, fontSize: 12, letterSpacing: 2,
                        textTransform: 'uppercase', borderRadius: 99,
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        fontFamily: FONTS.body, transition: 'all .2s',
                      }}
                    >
                      {isResa ? '✓ Reserve' : disabled ? 'Limite atteinte' : 'Reserver'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── CONFIRMATION POST-RESERVATION ── */}
          {resaSucces && (
            <div style={{
              marginTop: 40, padding: '28px 30px', border: `2px solid ${S.accent}`,
              background: dark ? '#14141c' : '#fff', textAlign: 'center',
            }}>
              <div style={{ fontFamily: FONTS.display, fontSize: 40, color: S.accent, letterSpacing: -1.5 }}>
                Réservé !
              </div>
              <div style={{ fontSize: 15, color: muted, marginTop: 10 }}>
                Vos mangas sont mis de côté pendant 7 jours. Passez en boutique pour les récupérer.
              </div>
            </div>
          )}

          {/* ── RECAPITULATIF (visible des qu'un manga est selectionne) ── */}
          {reservations.length > 0 && !resaSucces && (
            <div style={{
              marginTop: 60,
              border: `2px solid ${ink}`,
              background: S.accent, color: '#111',
              padding: '28px 30px',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, color: '#111', opacity: .1, ...HALFTONE_SMALL }} />
              <div style={{
                position: 'relative',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', gap: 30, flexWrap: 'wrap',
              }}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 3, fontWeight: 700, marginBottom: 12 }}>
                    TA SELECTION · {reservations.length} / {RESA_LIMIT}
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {reservations.map(r => {
                      const id = r.id ?? r;
                      const m  = catalog.find(x => x.id === id) ?? r;
                      return (
                        <div key={id} style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          background: 'rgba(0,0,0,.15)',
                          padding: '6px 12px', borderRadius: 99,
                        }}>
                          <span style={{ fontFamily: FONTS.display, fontSize: 14 }}>{m.title}</span>
                          <span style={{ fontSize: 11, opacity: .7 }}>{m.vol}</span>
                          <button onClick={() => toggleResa(r)} style={{
                            background: 'transparent', border: 'none',
                            cursor: 'pointer', color: '#111',
                            fontSize: 16, lineHeight: 1, padding: '0 0 0 4px',
                          }}>×</button>
                        </div>
                      );
                    })}
                  </div>
                  {/* Message d'erreur sous la sélection */}
                  {resaErreur && (
                    <div style={{ marginTop: 10, fontSize: 12, color: '#c0392b', fontWeight: 700 }}>
                      ⚠ {resaErreur}
                    </div>
                  )}
                </div>
                <button
                  onClick={soumettreReservation}
                  disabled={resaLoading}
                  style={{
                    background: resaLoading ? 'rgba(0,0,0,.4)' : '#111',
                    color: S.accent, border: 'none',
                    padding: '14px 28px', fontWeight: 700, fontSize: 13,
                    letterSpacing: 3, textTransform: 'uppercase',
                    borderRadius: 99,
                    cursor: resaLoading ? 'wait' : 'pointer',
                    fontFamily: FONTS.body, whiteSpace: 'nowrap',
                  }}
                >
                  {resaLoading ? 'Envoi…'
                    : !connected ? 'Se connecter pour réserver →'
                    : 'Valider ma reservation →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer shop={shop} theme={theme} />
    </div>
  );
}

Object.assign(window, { CatalogPage, MANGAS, FakeCover, getActiveCatalog });

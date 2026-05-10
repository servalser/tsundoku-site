// page-client.jsx
// Espace client : points de fidélité, réservations actives, profil.
// Export : ClientPage (disponible sur window.ClientPage)

function ClientPage({ shop, theme, connected, client, onConnect, onDeconnect, onBack, onToggleTheme, onShopSwitch, onNav }) {
  const S    = TSUNDOKU[shop];
  const dark = theme === 'dark';
  const bp   = useBreakpoint();

  // ── Couleurs adaptées au thème ──
  const bg     = dark ? '#0c0c14'                  : '#f5f5f8';
  const ink    = dark ? '#fff'                     : '#111';
  const muted  = dark ? 'rgba(255,255,255,.5)'     : 'rgba(0,0,0,.5)';
  const card   = dark ? 'rgba(255,255,255,.05)'    : '#fff';
  const border = dark ? 'rgba(255,255,255,.08)'    : 'rgba(0,0,0,.08)';

  // ── État local ──
  const [onglet,    setOnglet]    = React.useState('fidelite');
  const [resas,     setResas]     = React.useState([]);
  const [loading,   setLoading]   = React.useState(true);
  const [annulant,  setAnnulant]  = React.useState(null); // id de la resa en cours d'annulation
  const [flash,     setFlash]     = React.useState('');   // message temporaire (succès / erreur)

  // Charger les réservations dès que le composant est monté
  React.useEffect(() => {
    chargerResas();
  }, []);

  // ── Récupère les réservations actives via l'API ──
  async function chargerResas() {
    setLoading(true);
    try {
      const { ok, data } = await apiFetch('/api/reservations');
      if (ok && data.success) setResas(data.data);
    } catch (_) {
      // backend hors-ligne → liste vide, pas de crash
    }
    setLoading(false);
  }

  // ── Annule une réservation (DELETE /api/reservations/:id) ──
  async function annulerResa(id) {
    setAnnulant(id);
    try {
      const { ok, data } = await apiFetch(`/api/reservations/${id}`, { method: 'DELETE' });
      if (ok && data.success) {
        setResas(prev => prev.filter(r => r.id !== id));
        afficherFlash('Réservation annulée avec succès.');
      } else {
        afficherFlash(data.message || "Impossible d'annuler cette réservation.");
      }
    } catch (_) {
      afficherFlash('Impossible de contacter le serveur.');
    }
    setAnnulant(null);
  }

  // Affiche un message flash qui disparaît après 3 s
  function afficherFlash(msg) {
    setFlash(msg);
    setTimeout(() => setFlash(''), 3200);
  }

  // ── Initiales pour l'avatar (ex: "Mehdi Ayyadi" → "MA") ──
  const initiales = client
    ? `${client.prenom?.[0] || ''}${client.nom?.[0] || ''}`.toUpperCase()
    : '?';

  // ── Points de fidélité ──
  const points = client?.points_fidelite || 0;

  // Paliers de fidélité — chaque palier a un nom et un seuil de points
  const paliers = [
    { nom: 'Genin',     seuil: 0,   couleur: '#94a3b8' },
    { nom: 'Chunin',    seuil: 50,  couleur: '#38bdf8' },
    { nom: 'Jonin',     seuil: 150, couleur: '#a78bfa' },
    { nom: 'Kage',      seuil: 300, couleur: '#f59e0b' },
    { nom: 'Hokage',    seuil: 500, couleur: '#ef4444' },
  ];

  // Palier actuel du client
  const palierActuel = [...paliers].reverse().find(p => points >= p.seuil) || paliers[0];
  // Prochain palier (null si au max)
  const palierSuivant = paliers.find(p => p.seuil > points) || null;
  // Progression vers le prochain palier (en %)
  const progression = palierSuivant
    ? ((points - palierActuel.seuil) / (palierSuivant.seuil - palierActuel.seuil)) * 100
    : 100;

  // ── Libellé et couleur d'un statut de réservation ──
  function statutInfo(statut) {
    if (statut === 'en_attente') return { label: 'En préparation',   couleur: '#f59e0b' };
    if (statut === 'prete')      return { label: 'Prête à retirer',  couleur: '#22c55e' };
    return                              { label: statut,             couleur: muted    };
  }

  return (
    <>
      {/* Barre de navigation */}
      <Navbar
        shop={shop} theme={theme} connected={connected} client={client}
        onConnect={onConnect} onBack={onBack} onToggleTheme={onToggleTheme}
        onShopSwitch={onShopSwitch} active="Compte" onNav={onNav}
      />

      <div style={{ minHeight: '100vh', background: bg, color: ink, fontFamily: FONTS.body }}>

        {/* ════════════════════════════════════════════
            BLOC EN-TÊTE — avatar, nom, email, points   */}
        <div style={{
          background: S.bgDeep,
          borderBottom: `1px solid ${S.accent}25`,
          padding: bp.isMobile ? '32px 20px' : '48px 60px',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Motif décoratif halftone en fond */}
          <div style={{
            position: 'absolute', inset: 0,
            color: S.accent, opacity: .06, ...HALFTONE_MED,
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: bp.isMobile ? 16 : 24, flexWrap: 'wrap' }}>

              {/* Avatar circulaire avec les initiales */}
              <div style={{
                width:  bp.isMobile ? 56 : 72,
                height: bp.isMobile ? 56 : 72,
                borderRadius: '50%',
                background: S.accent, color: S.bgDeep,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FONTS.display,
                fontSize: bp.isMobile ? 20 : 26, fontWeight: 900, flexShrink: 0,
              }}>{initiales}</div>

              {/* Nom + email + badge palier */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  {/* Pas d'accents dans FONTS.display */}
                  <div style={{
                    fontFamily: FONTS.display,
                    fontSize: bp.isMobile ? 22 : 30,
                    lineHeight: 1, letterSpacing: -1, color: '#fff',
                  }}>
                    {client ? `${client.prenom} ${client.nom}` : 'Mon compte'}
                  </div>
                  {/* Badge du palier de fidélité */}
                  <div style={{
                    padding: '3px 10px', borderRadius: 99,
                    background: `${palierActuel.couleur}22`,
                    border: `1px solid ${palierActuel.couleur}44`,
                    color: palierActuel.couleur,
                    fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                    textTransform: 'uppercase',
                  }}>{palierActuel.nom}</div>
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', marginTop: 6 }}>
                  {client?.email}
                </div>
              </div>

              {/* Compteur de points dans l'en-tête */}
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{
                  fontFamily: FONTS.display, fontWeight: 900,
                  fontSize: bp.isMobile ? 28 : 38, lineHeight: 1,
                  color: S.accent,
                }}>{points}</div>
                <div style={{
                  fontSize: 9, letterSpacing: 2, textTransform: 'uppercase',
                  color: 'rgba(255,255,255,.4)', marginTop: 4, fontWeight: 700,
                }}>POINTS</div>
              </div>

              {/* Bouton déconnexion */}
              <button onClick={onDeconnect} style={{
                padding: '9px 18px', borderRadius: 99,
                background: 'transparent',
                color: 'rgba(255,255,255,.45)',
                border: '1px solid rgba(255,255,255,.15)',
                fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                cursor: 'pointer', fontFamily: FONTS.body, flexShrink: 0,
              }}>
                Deconnexion
              </button>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            ONGLETS                                      */}
        <div style={{
          borderBottom: `1px solid ${border}`,
          background: dark ? 'rgba(255,255,255,.02)' : 'rgba(0,0,0,.02)',
        }}>
          <div style={{
            maxWidth: 900, margin: '0 auto', padding: '0 20px',
            display: 'flex', overflowX: 'auto',
          }}>
            {[
              ['fidelite',      'Fidelite'],
              ['reservations',  'Reservations'],
              ['profil',        'Profil'],
            ].map(([id, label]) => (
              <button key={id} onClick={() => setOnglet(id)} style={{
                padding: '15px 20px', border: 'none', background: 'transparent',
                color: onglet === id ? S.accent : muted,
                fontWeight: 700, fontSize: 12, letterSpacing: 2,
                textTransform: 'uppercase', cursor: 'pointer', fontFamily: FONTS.body,
                borderBottom: onglet === id ? `2px solid ${S.accent}` : '2px solid transparent',
                marginBottom: -1, transition: 'color .15s', whiteSpace: 'nowrap',
              }}>{label}</button>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════
            CONTENU PRINCIPAL                            */}
        <div style={{
          maxWidth: 900, margin: '0 auto',
          padding: bp.isMobile ? '24px 16px' : '40px 20px',
        }}>

          {/* Message flash */}
          {flash && (
            <div style={{
              marginBottom: 20, padding: '12px 16px',
              background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.3)',
              borderRadius: 6, fontSize: 13, color: '#4ade80',
            }}>{flash}</div>
          )}

          {/* ── ONGLET FIDÉLITÉ ── */}
          {onglet === 'fidelite' && (
            <div>
              {/* Titre sans accents (Crispy Tofu) */}
              <div style={{ fontFamily: FONTS.display, fontSize: 22, letterSpacing: -.5, marginBottom: 28 }}>
                Programme de fidelite
              </div>

              {/* Carte principale — points + barre de progression */}
              <div style={{
                background: card, border: `1px solid ${border}`, borderRadius: 12,
                padding: bp.isMobile ? '24px 20px' : '32px 36px',
                marginBottom: 20,
              }}>
                {/* Ligne : points actuels + palier */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
                  <div>
                    <div style={{
                      fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
                      color: muted, fontWeight: 700, marginBottom: 8,
                    }}>MES POINTS</div>
                    <div style={{
                      fontFamily: FONTS.display, fontWeight: 900,
                      fontSize: bp.isMobile ? 48 : 64, lineHeight: 1, color: S.accent,
                    }}>{points}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
                      color: muted, fontWeight: 700, marginBottom: 8,
                    }}>RANG ACTUEL</div>
                    <div style={{
                      fontFamily: FONTS.display, fontSize: 24, color: palierActuel.couleur,
                    }}>{palierActuel.nom}</div>
                  </div>
                </div>

                {/* Barre de progression vers le prochain palier */}
                {palierSuivant && (
                  <div>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      fontSize: 11, color: muted, marginBottom: 8,
                    }}>
                      <span>{palierActuel.nom} ({palierActuel.seuil} pts)</span>
                      <span>{palierSuivant.nom} ({palierSuivant.seuil} pts)</span>
                    </div>
                    {/* Fond de la barre */}
                    <div style={{
                      width: '100%', height: 8, borderRadius: 99,
                      background: dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)',
                      overflow: 'hidden',
                    }}>
                      {/* Remplissage */}
                      <div style={{
                        width: `${Math.min(progression, 100)}%`, height: '100%',
                        borderRadius: 99,
                        background: `linear-gradient(90deg, ${palierActuel.couleur}, ${palierSuivant.couleur})`,
                        transition: 'width .6s ease',
                      }} />
                    </div>
                    <div style={{ fontSize: 12, color: muted, marginTop: 8 }}>
                      Encore <strong style={{ color: ink }}>{palierSuivant.seuil - points}</strong> points pour atteindre le rang {palierSuivant.nom}
                    </div>
                  </div>
                )}

                {/* Message quand le joueur est au palier max */}
                {!palierSuivant && (
                  <div style={{
                    fontSize: 14, color: palierActuel.couleur, fontWeight: 600,
                    marginTop: 8,
                  }}>
                    Rang maximum atteint !
                  </div>
                )}
              </div>

              {/* Tous les paliers */}
              <div style={{
                background: card, border: `1px solid ${border}`, borderRadius: 12,
                padding: bp.isMobile ? '20px 16px' : '28px 36px',
                marginBottom: 20,
              }}>
                <div style={{
                  fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
                  color: muted, fontWeight: 700, marginBottom: 20,
                }}>PALIERS</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {paliers.map((p, i) => {
                    const atteint = points >= p.seuil;
                    return (
                      <div key={p.nom} style={{
                        display: 'flex', alignItems: 'center', gap: 16,
                        padding: '14px 0',
                        borderBottom: i < paliers.length - 1 ? `1px solid ${border}` : 'none',
                        opacity: atteint ? 1 : .4,
                      }}>
                        {/* Indicateur rond */}
                        <div style={{
                          width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                          background: atteint ? p.couleur : 'transparent',
                          border: `2px solid ${p.couleur}`,
                        }} />
                        {/* Nom du palier */}
                        <div style={{ flex: 1, fontWeight: 700, fontSize: 14, color: atteint ? ink : muted }}>
                          {p.nom}
                        </div>
                        {/* Seuil */}
                        <div style={{
                          fontSize: 12, color: atteint ? p.couleur : muted, fontWeight: 600,
                        }}>{p.seuil} pts</div>
                        {/* Check si atteint */}
                        {atteint && (
                          <span style={{ color: p.couleur, fontSize: 14 }}>✓</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Comment gagner des points */}
              <div style={{
                background: card, border: `1px solid ${border}`, borderRadius: 12,
                padding: bp.isMobile ? '20px 16px' : '28px 36px',
              }}>
                <div style={{
                  fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
                  color: muted, fontWeight: 700, marginBottom: 16,
                }}>COMMENT GAGNER DES POINTS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    ['Reservation recuperee', '+10 pts', 'Chaque manga recupere en boutique rapporte 10 points.'],
                  ].map(([titre, pts, desc]) => (
                    <div key={titre} style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '12px 16px', borderRadius: 8,
                      background: dark ? 'rgba(255,255,255,.03)' : 'rgba(0,0,0,.02)',
                    }}>
                      <div style={{
                        padding: '4px 10px', borderRadius: 6,
                        background: `${S.accent}18`, color: S.accent,
                        fontSize: 12, fontWeight: 700, flexShrink: 0,
                      }}>{pts}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{titre}</div>
                        <div style={{ fontSize: 12, color: muted, marginTop: 2 }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── ONGLET RÉSERVATIONS ── */}
          {onglet === 'reservations' && (
            <div>
              {/* Sous-titre + compteur — sans accents dans FONTS.display */}
              <div style={{
                display: 'flex', alignItems: 'flex-start',
                justifyContent: 'space-between', marginBottom: 28, gap: 12,
              }}>
                <div>
                  <div style={{ fontFamily: FONTS.display, fontSize: 22, letterSpacing: -.5 }}>
                    Reservations actives
                  </div>
                  <div style={{ fontSize: 12, color: muted, marginTop: 5, lineHeight: 1.5 }}>
                    Maximum 3 réservations · Mise de côté 7 jours
                  </div>
                </div>
                {/* Compteur X/3 */}
                <div style={{
                  fontFamily: FONTS.display, fontWeight: 900,
                  fontSize: 36, lineHeight: 1, color: S.accent, flexShrink: 0,
                }}>
                  {resas.length}
                  <span style={{ fontSize: 14, color: muted, fontFamily: FONTS.body, fontWeight: 400 }}>/3</span>
                </div>
              </div>

              {/* Spinner de chargement */}
              {loading && (
                <div style={{ textAlign: 'center', padding: '60px 0', color: muted }}>
                  Chargement…
                </div>
              )}

              {/* État vide */}
              {!loading && resas.length === 0 && (
                <div style={{
                  textAlign: 'center', padding: bp.isMobile ? '48px 20px' : '64px 20px',
                  background: card, border: `1px solid ${border}`, borderRadius: 10,
                }}>
                  <div style={{
                    fontFamily: FONTS.jpDisplay, fontWeight: 900,
                    fontSize: 64, color: S.accent, opacity: .4, marginBottom: 12,
                  }}>積</div>
                  <div style={{ fontFamily: FONTS.display, fontSize: 20, marginBottom: 8 }}>
                    Aucune reservation active
                  </div>
                  <div style={{ fontSize: 14, color: muted, marginBottom: 28, lineHeight: 1.5 }}>
                    Rendez-vous dans le catalogue pour réserver vos mangas.
                  </div>
                  <button onClick={() => onNav('catalog')} style={{
                    padding: '12px 28px', borderRadius: 99,
                    background: S.accent, color: S.bgDeep,
                    border: 'none', fontWeight: 700, fontSize: 12,
                    letterSpacing: 3, textTransform: 'uppercase',
                    cursor: 'pointer', fontFamily: FONTS.body,
                  }}>Voir le catalogue →</button>
                </div>
              )}

              {/* Liste des réservations */}
              {!loading && resas.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {resas.map(resa => {
                    const st = statutInfo(resa.statut);
                    return (
                      <div key={resa.id} style={{
                        display: 'flex', alignItems: 'center', gap: 16,
                        background: card, border: `1px solid ${border}`,
                        borderRadius: 8, padding: bp.isMobile ? '14px' : '18px 22px',
                        flexWrap: bp.isMobile ? 'wrap' : 'nowrap',
                      }}>

                        {/* Vignette couverture manga */}
                        <div style={{
                          width: 44, height: 62, flexShrink: 0,
                          background: S.bgDeep, borderRadius: 4,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          overflow: 'hidden',
                          color: S.accent, fontFamily: FONTS.jpDisplay, fontWeight: 900, fontSize: 18,
                        }}>
                          {resa.manga?.cover_url
                            ? <img
                                src={resa.manga.cover_url} alt=""
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            : '漫'}
                        </div>

                        {/* Infos manga */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontWeight: 700, fontSize: 15,
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                          }}>
                            {resa.manga?.titre || 'Manga inconnu'}
                          </div>
                          <div style={{ fontSize: 12, color: muted, marginTop: 4, lineHeight: 1.5 }}>
                            {resa.manga?.auteur && `${resa.manga.auteur} · `}
                            Réservé le {resa.date_reservation}
                            {' · '}
                            <span style={{ color: '#f87171' }}>Limite : {resa.date_limite}</span>
                          </div>
                        </div>

                        {/* Badge statut */}
                        <div style={{
                          padding: '4px 12px', borderRadius: 99,
                          background: `${st.couleur}1a`, color: st.couleur,
                          fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                          textTransform: 'uppercase', flexShrink: 0,
                          border: `1px solid ${st.couleur}33`,
                        }}>{st.label}</div>

                        {/* Bouton annuler — uniquement pour les réservations en_attente */}
                        {resa.statut === 'en_attente' && (
                          <button
                            onClick={() => annulerResa(resa.id)}
                            disabled={annulant === resa.id}
                            style={{
                              padding: '7px 14px', borderRadius: 6, flexShrink: 0,
                              background: 'transparent',
                              border: '1px solid rgba(248,113,113,.35)',
                              color: '#f87171',
                              fontSize: 11, fontWeight: 700,
                              letterSpacing: 1, textTransform: 'uppercase',
                              cursor: annulant === resa.id ? 'wait' : 'pointer',
                              fontFamily: FONTS.body,
                              opacity: annulant === resa.id ? .5 : 1,
                            }}
                          >
                            {annulant === resa.id ? '…' : 'Annuler'}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── ONGLET PROFIL ── */}
          {onglet === 'profil' && (
            <div>
              {/* Pas d'accents dans FONTS.display */}
              <div style={{ fontFamily: FONTS.display, fontSize: 22, letterSpacing: -.5, marginBottom: 24 }}>
                Informations personnelles
              </div>

              {/* Tableau des informations */}
              <div style={{
                background: card, border: `1px solid ${border}`,
                borderRadius: 8, overflow: 'hidden',
              }}>
                {[
                  ['Prénom', client?.prenom],
                  ['Nom',    client?.nom],
                  ['Email',  client?.email],
                ].map(([label, valeur], i, arr) => (
                  <div key={label} style={{
                    display: 'flex', alignItems: 'center',
                    padding: '18px 24px',
                    borderBottom: i < arr.length - 1 ? `1px solid ${border}` : 'none',
                  }}>
                    <div style={{
                      width: 100, flexShrink: 0,
                      fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase',
                      color: muted, fontWeight: 700,
                    }}>{label}</div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{valeur}</div>
                  </div>
                ))}
              </div>

              {/* Note informative */}
              <div style={{
                marginTop: 14, padding: '14px 18px',
                background: dark ? 'rgba(255,255,255,.03)' : 'rgba(0,0,0,.03)',
                border: `1px solid ${border}`, borderRadius: 8,
                fontSize: 12, color: muted, lineHeight: 1.6,
              }}>
                Pour modifier vos informations ou supprimer votre compte, contactez-nous en boutique
                ou via le{' '}
                <a
                  href="#"
                  onClick={e => { e.preventDefault(); onNav('contact'); }}
                  style={{ color: S.accent, textDecoration: 'none', fontWeight: 700 }}
                >
                  formulaire de contact
                </a>.
              </div>

              {/* Bouton de déconnexion */}
              <button onClick={onDeconnect} style={{
                marginTop: 32,
                padding: '12px 24px', borderRadius: 99,
                background: 'transparent',
                color: '#f87171',
                border: '1px solid rgba(248,113,113,.3)',
                fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                cursor: 'pointer', fontFamily: FONTS.body,
              }}>
                Se deconnecter
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

Object.assign(window, { ClientPage });

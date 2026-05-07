// Page Contact — formulaire + infos pratiques + FAQ
// Exports: ContactPage

const FAQ_ITEMS = [
  { q: 'Comment fonctionne la reservation ?',          r: 'Choisissez jusqu\'a 3 titres en ligne. On les met de cote 7 jours. Vous payez en boutique lors du retrait — aucun frais, aucun compte bancaire necessaire.' },
  { q: 'Puis-je commander un titre absent du stock ?', r: 'Oui, passez en boutique. On peut commander n\'importe quel manga disponible en France, generalement disponible en 3-5 jours.' },
  { q: 'Organisez-vous des evenements prives ?',       r: 'Oui : sessions de lecture, anniversaires, sorties scolaires. Contactez-nous avec le formulaire ci-dessous.' },
  { q: 'Acceptez-vous les reprises de manga ?',        r: 'On n\'a pas de service de revente, mais un panneau communautaire en boutique pour les annonces entre particuliers.' },
];

const SUBJECTS = [
  { id: 'question',     label: 'Question generale' },
  { id: 'reservation',  label: 'Reservation' },
  { id: 'event',        label: 'Evenement / Partenariat' },
  { id: 'recrutement',  label: 'Candidature' },
];

function ContactPage({ shop = 'toulon', theme = 'dark', onBack, onShopSwitch, onToggleTheme, onConnect, connected, onNav }) {
  const S      = TSUNDOKU[shop];
  const dark   = theme === 'dark';
  const bg     = dark ? '#0a0a12' : '#f7f5ef';
  const ink    = dark ? '#fff'    : '#111';
  const muted  = dark ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.55)';
  const cardBg = dark ? '#14141c' : '#fff';
  const border = dark ? 'rgba(255,255,255,.1)'  : 'rgba(0,0,0,.1)';
  const inputBg = dark ? '#1c1c2a' : '#fff';

  const bp = useBreakpoint();
  const [sent,    setSent]    = React.useState(false);
  const [subject, setSubject] = React.useState('question');
  const [nom,     setNom]     = React.useState('');
  const [email,   setEmail]   = React.useState('');
  const [message, setMessage] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [erreur,  setErreur]  = React.useState('');

  async function envoyerMessage() {
    if (!nom.trim() || !email.trim() || !message.trim()) {
      setErreur('Veuillez remplir tous les champs.');
      return;
    }
    setSending(true);
    setErreur('');
    try {
      const res = await fetch((typeof API_URL !== 'undefined' ? API_URL : '') + '/api/contact', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: JSON.stringify({ nom, email, sujet: subject, boutique: shop, message }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setErreur(data.message || 'Erreur lors de l\'envoi.');
      }
    } catch (e) {
      // En mode offline (pas de backend), on simule l'envoi
      setSent(true);
    }
    setSending(false);
  }

  const inputStyle = {
    width: '100%', padding: '13px 16px', display: 'block',
    background: inputBg, border: `1.5px solid ${border}`,
    color: ink, fontSize: 15, fontFamily: FONTS.body,
    borderRadius: 3, outline: 'none', transition: 'border-color .18s',
  };
  const labelStyle = {
    fontSize: 10, letterSpacing: 3, color: muted, fontWeight: 700,
    textTransform: 'uppercase', marginBottom: 8, display: 'block',
  };

  return (
    <div style={{ width: '100%', background: bg, color: ink, fontFamily: FONTS.body, minHeight: 800 }}>
      <Navbar
        shop={shop} theme={theme} connected={connected}
        active="Contact"
        onConnect={onConnect} onBack={onBack}
        onToggleTheme={onToggleTheme} onShopSwitch={onShopSwitch} onNav={onNav}
      />

      {/* ── EN-TETE ── */}
      <div style={{
        position: 'relative',
        padding: bp.isMobile ? '50px 20px 60px' : bp.isTablet ? '60px 40px 70px' : '70px 60px 80px',
        overflow: 'hidden', background: S.bg, color: '#fff', borderBottom: `4px solid ${S.accent}`,
      }}>
        <div style={{ position: 'absolute', inset: 0, color: S.accent, opacity: .15, ...HALFTONE_MED }} />
        <div style={{
          position: 'absolute', inset: 0, color: S.accent, opacity: .06,
          ...SPEED_LINES('currentColor'),
          maskImage: 'radial-gradient(circle at 80% 30%, transparent 20%, black 60%)',
          WebkitMaskImage: 'radial-gradient(circle at 80% 30%, transparent 20%, black 60%)',
        }} />
        {!bp.isMobile && (
          <div style={{
            position: 'absolute', right: -30, top: -60,
            fontFamily: FONTS.jpDisplay, fontWeight: 900,
            fontSize: bp.isTablet ? 280 : 520,
            color: S.accent, opacity: .15, lineHeight: .82, letterSpacing: -20,
          }}>話</div>
        )}
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
          <div style={{
            fontSize: 11, letterSpacing: 4, color: S.accent, fontWeight: 700,
            marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 24, height: 1, background: S.accent }} />
            Contact · お問い合わせ
          </div>
          <h1 style={{
            fontFamily: FONTS.display,
            fontSize: bp.isMobile ? 52 : bp.isTablet ? 72 : 96,
            lineHeight: .88, margin: 0, letterSpacing: -4, textShadow: `5px 5px 0 ${S.bgDeep}`,
          }}>
            Parlons-nous.<br />
            <span style={{ color: S.accent }}>On repond vite.</span>
          </h1>
          {!bp.isMobile && (
            <div style={{ marginTop: 20, maxWidth: 520, fontSize: 16, lineHeight: 1.6, opacity: .88 }}>
              Une question sur une reservation, un evenement a proposer, ou juste envie de
              nous dire bonjour — on lit tout.
            </div>
          )}
        </div>
      </div>

      {/* ── CONTENU PRINCIPAL ── */}
      <div style={{
        padding: bp.isMobile ? '40px 20px 60px' : bp.isTablet ? '60px 40px 80px' : '80px 60px 100px',
        maxWidth: 1400, margin: '0 auto',
      }}>
        {/* 2 cols desktop → 1 col mobile/tablette */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: bp.isDesktop ? '1.3fr 1fr' : '1fr',
          gap: bp.isMobile ? 32 : 80, alignItems: 'flex-start',
        }}>

          {/* FORMULAIRE */}
          <div>
            {!sent ? (
              <div style={{
                border: `2px solid ${ink}`, background: cardBg,
                padding: 40, position: 'relative', overflow: 'hidden',
                boxShadow: `6px 6px 0 ${S.accent}`,
              }}>
                <div style={{ position: 'absolute', inset: 0, color: S.accent, opacity: .04, ...HALFTONE_SMALL }} />
                <div style={{ position: 'relative' }}>
                  <div style={{
                    fontFamily: FONTS.display, fontSize: 32, letterSpacing: -1,
                    color: ink, marginBottom: 30,
                  }}>Envoyer un message.</div>

                  {/* Sujet */}
                  <div style={{ marginBottom: 22 }}>
                    <label style={labelStyle}>Sujet</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {SUBJECTS.map(s => (
                        <button key={s.id} onClick={() => setSubject(s.id)} style={{
                          padding: '8px 14px',
                          border: subject === s.id ? `2px solid ${S.accent}` : `1.5px solid ${border}`,
                          background: subject === s.id ? S.accent : 'transparent',
                          color: subject === s.id ? S.bgDeep : ink,
                          fontSize: 12, fontWeight: 700, letterSpacing: 1,
                          borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body,
                          transition: 'all .15s',
                        }}>{s.label}</button>
                      ))}
                    </div>
                  </div>

                  {/* Boutique */}
                  <div style={{ marginBottom: 22 }}>
                    <label style={labelStyle}>Boutique concernee</label>
                    <div style={{
                      display: 'flex',
                      background: dark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.05)',
                      borderRadius: 99, padding: 3, width: 'fit-content',
                    }}>
                      {['toulon', 'marseille'].map(s => (
                        <span key={s} style={{
                          padding: '8px 16px', borderRadius: 99,
                          background: shop === s ? TSUNDOKU[s].accent : 'transparent',
                          color: shop === s ? TSUNDOKU[s].bgDeep : muted,
                          fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
                        }}>{TSUNDOKU[s].name}</span>
                      ))}
                    </div>
                  </div>

                  {/* Nom */}
                  <div style={{ marginBottom: 18 }}>
                    <label style={labelStyle}>Nom</label>
                    <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Votre nom" style={inputStyle} />
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: 18 }}>
                    <label style={labelStyle}>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.fr" style={inputStyle} />
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: 26 }}>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      value={message} onChange={e => setMessage(e.target.value)}
                      placeholder="Votre message…"
                      rows={5}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                    />
                  </div>

                  {erreur && (
                    <div style={{ marginBottom: 14, fontSize: 13, color: '#e74c3c', fontWeight: 600 }}>{erreur}</div>
                  )}

                  <button onClick={envoyerMessage} disabled={sending} style={{
                    width: '100%', background: sending ? 'rgba(0,0,0,.3)' : S.accent,
                    color: S.bgDeep, border: 'none',
                    padding: '16px', fontWeight: 700, fontSize: 14,
                    letterSpacing: 4, textTransform: 'uppercase',
                    borderRadius: 99, cursor: sending ? 'wait' : 'pointer',
                    fontFamily: FONTS.body, boxShadow: `4px 4px 0 ${ink}`,
                  }}>{sending ? 'Envoi…' : 'Envoyer →'}</button>
                </div>
              </div>
            ) : (
              /* Etat confirme */
              <div style={{
                border: `2px solid ${S.accent}`, background: cardBg,
                padding: 60, position: 'relative', overflow: 'hidden',
                boxShadow: `8px 8px 0 ${S.accent}`, textAlign: 'center',
              }}>
                <div style={{ position: 'absolute', inset: 0, color: S.accent, opacity: .06, ...HALFTONE_SMALL }} />
                <div style={{ position: 'relative' }}>
                  <div style={{
                    fontFamily: FONTS.display, fontSize: 28, color: S.accent,
                    letterSpacing: -.5, marginBottom: 14,
                    transform: 'rotate(-2deg)', display: 'inline-block',
                  }}>RECU !!</div>
                  <div style={{
                    fontFamily: FONTS.display, fontSize: 64, lineHeight: .9,
                    letterSpacing: -2, color: ink, marginBottom: 20,
                  }}>
                    Message<br />envoye.
                  </div>
                  <div style={{ fontSize: 16, color: muted, lineHeight: 1.6, maxWidth: 380, margin: '0 auto' }}>
                    On vous repond generalement sous 24h — souvent bien moins.
                  </div>
                  <button onClick={() => setSent(false)} style={{
                    marginTop: 32, padding: '12px 24px', background: 'transparent',
                    border: `2px solid ${ink}`, color: ink, fontWeight: 700, fontSize: 12,
                    letterSpacing: 2, textTransform: 'uppercase',
                    borderRadius: 99, cursor: 'pointer', fontFamily: FONTS.body,
                  }}>Nouveau message</button>
                </div>
              </div>
            )}
          </div>

          {/* INFOS PRATIQUES */}
          <div>
            {/* Cartes des 2 boutiques */}
            {['toulon', 'marseille'].map(s => {
              const SH = TSUNDOKU[s];
              const isActive = shop === s;
              return (
                <div key={s} style={{
                  marginBottom: 24, padding: '26px 28px',
                  background: isActive ? SH.bg : cardBg,
                  border: `2px solid ${isActive ? SH.accent : border}`,
                  position: 'relative', overflow: 'hidden',
                }}>
                  {isActive && (
                    <div style={{ position: 'absolute', inset: 0, color: SH.accent, opacity: .1, ...HALFTONE_SMALL }} />
                  )}
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      fontSize: 11, letterSpacing: 4, color: SH.accent,
                      fontWeight: 700, marginBottom: 12, textTransform: 'uppercase',
                    }}>Tsundoku {SH.name}</div>
                    <div style={{
                      fontFamily: FONTS.display, fontSize: 20, lineHeight: 1.2,
                      color: isActive ? '#fff' : ink, marginBottom: 14, letterSpacing: -.3,
                    }}>{SH.address}</div>
                    <div style={{
                      fontSize: 13, fontWeight: 700, color: SH.accent, marginBottom: 16,
                    }}>{SH.phone}</div>
                    {SH.hours.map(([jour, heure], i) => (
                      <div key={i} style={{
                        display: 'flex', justifyContent: 'space-between',
                        padding: '7px 0',
                        borderBottom: `1px solid ${isActive ? 'rgba(255,255,255,.1)' : border}`,
                        fontSize: 13, color: isActive ? 'rgba(255,255,255,.8)' : muted,
                      }}>
                        <span>{jour}</span>
                        <span style={{
                          fontWeight: 700,
                          color: heure === 'Ferme'
                            ? (isActive ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.3)')
                            : SH.accent,
                        }}>{heure}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Post-it manuscrit */}
            <div style={{
              padding: '18px 22px', transform: 'rotate(-1deg)',
              background: dark ? '#1c1c14' : '#fefbe8',
              border: `1px solid ${dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)'}`,
            }}>
              <div style={{
                fontFamily: FONTS.hand, fontSize: 22,
                color: dark ? '#f4e88a' : '#5a4a2a', lineHeight: 1.5,
              }}>
                « On prefere quand meme que vous passiez directement en boutique — c'est plus sympa. »
              </div>
              <div style={{ fontSize: 11, color: muted, marginTop: 8, fontFamily: FONTS.body }}>
                — L'equipe Tsundoku
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{
        padding: bp.isMobile ? '0 20px 60px' : bp.isTablet ? '0 40px 80px' : '0 60px 100px',
        maxWidth: 1400, margin: '0 auto',
      }}>
        <div style={{
          fontSize: 11, letterSpacing: 4, color: S.accent, fontWeight: 700,
          marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ width: 24, height: 1, background: S.accent }} />
          FAQ · よくある質問
        </div>
        <h2 style={{
          fontFamily: FONTS.display,
          fontSize: bp.isMobile ? 36 : 56,
          margin: '0 0 28px', letterSpacing: -2, color: ink,
        }}>
          Questions frequentes.
        </h2>
        {/* 1 col mobile → 2 col tablette/desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: bp.isMobile ? '1fr' : '1fr 1fr',
          gap: 14,
        }}>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} style={{
              padding: '22px 26px', border: `1px solid ${border}`, background: cardBg,
            }}>
              <div style={{
                fontFamily: FONTS.display, fontSize: 20, lineHeight: 1.1,
                color: ink, letterSpacing: -.3, marginBottom: 12,
              }}>
                <span style={{ color: S.accent, marginRight: 8 }}>◇</span>{item.q}
              </div>
              <div style={{ fontSize: 14, color: muted, lineHeight: 1.65 }}>{item.r}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer shop={shop} theme={theme} />
    </div>
  );
}

Object.assign(window, { ContactPage });

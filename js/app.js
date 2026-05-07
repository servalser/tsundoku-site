// TSUNDOKU TOULON - APP.JS
// Navigation et gestion des sections

const state = {
    currentSection: 'accueil',
    isAuthenticated: false
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Tsundoku Toulon chargé');
    initNavigation();
    initMobileMenu();
    initAuth();
    showSection('accueil');
});

function initNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const section = e.target.dataset.section;
            if (section) {
                showSection(section);
                updateActiveLinks(section);
            }
        });
    });
    
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const section = e.target.dataset.section;
            if (section) {
                showSection(section);
                updateActiveLinks(section);
                closeMobileMenu();
            }
        });
    });
}

function updateActiveLinks(section) {
    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === section) {
            link.classList.add('active');
        }
    });
}

function initMobileMenu() {
    const burger = document.getElementById('burgerMenu');
    if (burger) {
        burger.addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.toggle('show');
        });
    }
}

function closeMobileMenu() {
    document.getElementById('mobileMenu').classList.remove('show');
}

function initAuth() {
    const authBtn = document.getElementById('authBtn');
    if (authBtn) {
        authBtn.addEventListener('click', () => openModal('modalAuth'));
    }
}

function openModal(id) {
    document.getElementById(id).classList.add('show');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('show');
}

function showLoader() {
    document.getElementById('loader').classList.add('show');
}

function hideLoader() {
    document.getElementById('loader').classList.remove('show');
}

function showSection(name) {
    const content = document.getElementById('mainContent');
    showLoader();
    
    setTimeout(() => {
        switch(name) {
            case 'accueil':
                content.innerHTML = renderAccueil();
                break;
            case 'sorties':
                content.innerHTML = renderSorties();
                break;
            case 'selection':
                content.innerHTML = renderSelection();
                break;
            case 'articles':
                content.innerHTML = renderArticles();
                break;
            case 'avis':
                content.innerHTML = renderAvis();
                break;
            case 'quiz':
                content.innerHTML = renderQuiz();
                break;
            default:
                content.innerHTML = '<div class="section"><h2>Page introuvable</h2></div>';
        }
        hideLoader();
        window.scrollTo(0, 0);
    }, 200);
}

function renderAccueil() {
    return `
        <section class="hero-section">
            <div class="hero-content">
                <h1 class="hero-title">TSUNDOKU TOULON</h1>
                <p class="hero-subtitle">Votre librairie manga indépendante</p>
                <div class="hero-cta">
                    <button class="btn-primary" onclick="showSection('sorties')">Découvrir les sorties</button>
                    <button class="btn-secondary" onclick="showSection('selection')">Notre sélection</button>
                </div>
                <div class="hero-features">
                    <div class="hero-feature"><span class="hero-feature-icon">📚</span><span>Sélection pointue</span></div>
                    <div class="hero-feature"><span class="hero-feature-icon">🎯</span><span>Conseils personnalisés</span></div>
                    <div class="hero-feature"><span class="hero-feature-icon">⚡</span><span>Réservations rapides</span></div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="section-title">
                <h2>Pourquoi Tsundoku Toulon ?</h2>
                <p>Chez Tsundoku Toulon, nous sommes passionnés par le manga</p>
                <div class="underline"></div>
            </div>
            <div class="grid grid-3">
                <div class="card">
                    <div class="card-header"><h3 class="card-title">📖 Passion</h3></div>
                    <div class="card-body"><p>Notre équipe de fans vous conseille et vous fait découvrir des pépites.</p></div>
                </div>
                <div class="card">
                    <div class="card-header"><h3 class="card-title">🎯 Expertise</h3></div>
                    <div class="card-body"><p>Des recommandations personnalisées selon vos goûts.</p></div>
                </div>
                <div class="card">
                    <div class="card-header"><h3 class="card-title">⚡ Rapidité</h3></div>
                    <div class="card-body"><p>Réservez en ligne et récupérez rapidement.</p></div>
                </div>
            </div>
        </section>
        <section class="section horaires-section">
            <div class="section-title"><h2>Nos Horaires</h2><div class="underline"></div></div>
            <div class="horaires-grid">
                <div class="horaires-card">
                    <h3 class="horaires-title">📅 Horaires</h3>
                    <div class="horaires-list">
                        <div class="horaires-item"><span class="horaires-day">Lundi</span><span class="horaires-time">14h-19h</span></div>
                        <div class="horaires-item"><span class="horaires-day">Mardi-Samedi</span><span class="horaires-time">10h-19h</span></div>
                        <div class="horaires-item"><span class="horaires-day">Dimanche</span><span class="horaires-time closed">Fermé</span></div>
                    </div>
                </div>
                <div class="horaires-card">
                    <h3 class="horaires-title">📍 Contact</h3>
                    <div class="horaires-list">
                        <div class="horaires-item"><span class="horaires-day">Adresse</span><span class="horaires-time">Toulon</span></div>
                        <div class="horaires-item"><span class="horaires-day">Tel</span><span class="horaires-time">04 XX XX XX XX</span></div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderSorties() {
    const mangas = [
        {titre: 'One Piece Vol. 105', auteur: 'Oda', date: '15 Mai 2026'},
        {titre: 'Demon Slayer Vol. 24', auteur: 'Gotouge', date: '1 Juin 2026'},
        {titre: 'My Hero Academia Vol. 38', auteur: 'Horikoshi', date: '20 Mai 2026'},
        {titre: 'Jujutsu Kaisen Vol. 25', auteur: 'Akutami', date: '10 Juin 2026'}
    ];
    
    return `
        <section class="section">
            <div class="section-title"><h2>📅 Sorties à venir</h2><div class="underline"></div></div>
            <div class="sorties-grid">
                ${mangas.map(m => `
                    <div class="sortie-card">
                        <div class="sortie-cover" style="background: linear-gradient(135deg, #FF4081, #0047FF); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">📚</div>
                        <div class="sortie-info">
                            <h3 class="sortie-title">${m.titre}</h3>
                            <p class="sortie-author">${m.auteur}</p>
                            <div class="sortie-meta">
                                <span class="sortie-date">${m.date}</span>
                                <span class="sortie-badge">Nouveauté</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

function renderSelection() {
    return `
        <section class="section">
            <div class="section-title"><h2>💖 Notre sélection</h2><div class="underline"></div></div>
            <div class="selection-grid">
                <div class="selection-card">
                    <div class="selection-header">
                        <div class="selection-cover" style="background: linear-gradient(135deg, #FF4081, #0047FF);"></div>
                        <div class="selection-info">
                            <h3 class="selection-title">Berserk</h3>
                            <p class="selection-author">Kentaro Miura</p>
                            <p class="selection-reviewer">Par Marie</p>
                        </div>
                    </div>
                    <div class="selection-body"><p>Un chef-d'œuvre absolu du dark fantasy.</p></div>
                    <div class="selection-footer"><div class="selection-rating">⭐⭐⭐⭐⭐</div></div>
                </div>
            </div>
        </section>
    `;
}

function renderArticles() {
    return `
        <section class="section">
            <div class="section-title"><h2>📰 Articles</h2><div class="underline"></div></div>
            <div class="articles-grid">
                <div class="article-card">
                    <div class="article-image" style="background: linear-gradient(135deg, #FF4081, #0047FF); height: 200px;"></div>
                    <div class="article-content">
                        <h3 class="article-title">Les mangas les plus attendus de 2026</h3>
                        <p class="article-excerpt">Découvrez notre sélection...</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderAvis() {
    return `
        <section class="section">
            <div class="section-title"><h2>⭐ Avis</h2><div class="underline"></div></div>
            <div class="avis-grid">
                <div class="avis-card">
                    <div class="avis-header">
                        <h3 class="avis-shop">Tsundoku Toulon</h3>
                        <div class="avis-rating">⭐⭐⭐⭐⭐</div>
                    </div>
                    <div class="avis-body"><p>Excellente boutique !</p></div>
                </div>
            </div>
        </section>
    `;
}

function renderQuiz() {
    return `
        <section class="section">
            <div class="quiz-container">
                <div class="quiz-header">
                    <h2 class="quiz-title">🎮 Quiz Manga</h2>
                    <p>Testez vos connaissances !</p>
                </div>
                <div class="card"><div class="card-body" style="text-align: center; padding: 3rem;">
                    <h3>Quiz à venir...</h3>
                    <button class="btn-primary" onclick="showSection('accueil')">Retour</button>
                </div></div>
            </div>
        </section>
    `;
}
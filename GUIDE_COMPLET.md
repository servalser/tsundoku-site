# 📚 GUIDE COMPLET - TSUNDOKU TOULON

## 🎯 Table des matières

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Utilisation du site](#utilisation-site)
4. [Panel Admin](#panel-admin)
5. [Maintenance](#maintenance)
6. [FAQ](#faq)

---

## 📦 INSTALLATION

### Prérequis
- **XAMPP** (Apache + PHP + MySQL)
- Navigateur moderne (Chrome, Firefox, Edge)
- Éditeur de code (VS Code, Sublime Text)

### Étape 1 : Installation XAMPP
1. Télécharger XAMPP : https://www.apachefriends.org/
2. Installer XAMPP dans `C:\xampp\`
3. Lancer **XAMPP Control Panel**
4. Démarrer **Apache** et **MySQL**

### Étape 2 : Déploiement du projet
1. Extraire `tsundoku-toulon-final.zip`
2. Copier le dossier dans `C:\xampp\htdocs\`
3. Renommer si besoin : `tsundoku-toulon`

### Étape 3 : Création de la base de données
1. Ouvrir http://localhost/phpmyadmin
2. Cliquer sur **"Nouvelle base de données"**
3. Nom : `tsundoku_toulon`
4. Interclassement : `utf8mb4_unicode_ci`
5. Cliquer sur **"Créer"**

### Étape 4 : Import des tables
1. Sélectionner la base `tsundoku_toulon`
2. Onglet **"Importer"**
3. Choisir le fichier `database/schema.sql`
4. Cliquer sur **"Exécuter"**
5. Répéter avec `database/data.sql` (données démo)

### Étape 5 : Configuration
1. Ouvrir `database/connect.php`
2. Vérifier les identifiants :
```php
$host = 'localhost';
$dbname = 'tsundoku_toulon';
$username = 'root';
$password = ''; // Vide par défaut sur XAMPP
```

### Étape 6 : Accès au site
- **Frontend** : http://localhost/tsundoku-toulon
- **Admin** : http://localhost/tsundoku-toulon/admin

---

## ⚙️ CONFIGURATION

### Modifier les informations du site

#### 1. Coordonnées (js/config.js)
```javascript
const CONFIG = {
    siteName: 'Tsundoku Toulon',
    address: '123 Avenue de la République, 83000 Toulon',
    phone: '04 XX XX XX XX',
    email: 'contact@tsundoku-toulon.fr',
    gps: {
        lat: 43.1242,
        lng: 5.9280
    }
};
```

#### 2. Horaires (js/config.js)
```javascript
horaires: {
    lundi: { ouvert: true, heures: '14h-19h' },
    mardi: { ouvert: true, heures: '10h-19h' },
    // ...
}
```

#### 3. Google Maps (js/sections/accueil.js)
Remplacer l'URL de l'iframe :
```javascript
const mapUrl = 'https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE';
```

### Créer un compte admin

1. Ouvrir phpMyAdmin
2. Sélectionner la table `users`
3. Cliquer sur **"Insérer"**
4. Remplir :
   - `email`: votre@email.com
   - `nom`: Votre Nom
   - `prenom`: Votre Prénom
   - `mdpasse`: (utiliser `password_hash()` en PHP)
5. Cliquer sur **"Exécuter"**

**OU** utiliser le script SQL :
```sql
INSERT INTO users (email, nom, prenom, mdpasse) 
VALUES (
    'admin@tsundoku.fr',
    'Admin',
    'Tsundoku',
    '$2y$10$...' -- Hash du mot de passe
);
```

Pour générer le hash, créer un fichier `hash.php` :
```php
<?php
echo password_hash('votre_mot_de_passe', PASSWORD_DEFAULT);
?>
```

---

## 🖥️ UTILISATION DU SITE

### Navigation

#### Menu principal
- **Accueil** : Page d'accueil avec présentation
- **Sorties** : Mangas à paraître prochainement
- **Sélection** : Coups de cœur de l'équipe
- **Articles** : Blog / actualités manga
- **Avis** : Avis sur les boutiques partenaires
- **Quiz** : Quiz manga interactifs

### Fonctionnalités utilisateurs

#### 1. Découvrir les sorties
- Consulter les mangas à venir
- Voir les dates de sortie
- Badges "Nouveauté", "Bientôt", etc.

#### 2. Lire les articles
- Blog avec actualités manga
- Reviews et recommandations
- Événements boutique

#### 3. Participer aux quiz
- Répondre aux questions
- Voir son score
- Classement (si activé)

#### 4. Réserver un manga
- Formulaire de réservation
- Notification par email (si configuré)

---

## 🔐 PANEL ADMIN

### Connexion

1. Aller sur http://localhost/tsundoku-toulon/admin
2. Cliquer sur **"Connexion"** (en haut à droite)
3. Entrer vos identifiants
4. Valider

### Dashboard

Une fois connecté, vous accédez au tableau de bord avec :
- **Statistiques** : Nombre de sorties, articles, quiz
- **Actions rapides** : Boutons d'accès direct
- **Aperçu** : Derniers éléments ajoutés

### Gestion des Sorties Manga

#### Ajouter une sortie
1. Aller dans **Admin > Sorties**
2. Cliquer sur **"Ajouter une sortie"**
3. Remplir le formulaire :
   - **Titre** : Nom du manga
   - **Auteur** : Nom de l'auteur
   - **Date de sortie** : JJ/MM/AAAA
   - **Image** : Cover du manga (upload)
   - **Description** : Synopsis (optionnel)
4. Cliquer sur **"Enregistrer"**

#### Modifier une sortie
1. Dans la liste, cliquer sur **✏️ Modifier**
2. Modifier les champs
3. Cliquer sur **"Mettre à jour"**

#### Supprimer une sortie
1. Dans la liste, cliquer sur **🗑️ Supprimer**
2. Confirmer la suppression

### Gestion des Articles

#### Créer un article
1. Aller dans **Admin > Articles**
2. Cliquer sur **"Nouvel article"**
3. Remplir :
   - **Titre** : Titre accrocheur
   - **Contenu** : Texte complet (Markdown supporté)
   - **Image** : Image mise en avant
   - **Catégorie** : News, Review, Event, etc.
   - **Publié** : Oui/Non
4. Cliquer sur **"Publier"**

#### Formater le contenu

Le contenu supporte le **Markdown** :
```markdown
# Titre H1
## Titre H2

**Texte en gras**
*Texte en italique*

- Liste à puces
- Item 2

[Lien](https://example.com)

![Image](url-image.jpg)
```

#### Gérer les articles
- **Brouillon** : Non publié (visible admin uniquement)
- **Publié** : Visible par tous
- **Archivé** : Masqué mais conservé

### Gestion des Quiz

#### Créer un quiz
1. Aller dans **Admin > Quiz**
2. Cliquer sur **"Créer un quiz"**
3. Remplir :
   - **Titre** : Ex: "Quiz One Piece"
   - **Description** : Présentation du quiz
   - **Actif** : Oui/Non

#### Ajouter des questions
1. Dans le quiz créé, cliquer sur **"Ajouter une question"**
2. Remplir :
   - **Question** : Texte de la question
   - **Réponse A** : Première réponse
   - **Réponse B** : Deuxième réponse
   - **Réponse C** : Troisième réponse
   - **Réponse D** : Quatrième réponse
   - **Bonne réponse** : A, B, C ou D
3. Répéter pour 5-10 questions

#### Activer/Désactiver un quiz
- Basculer le bouton **"Actif"**
- Un seul quiz peut être actif à la fois

#### Voir les résultats
1. Aller dans **Admin > Quiz > [Nom du quiz]**
2. Onglet **"Résultats"**
3. Voir :
   - Nombre de participants
   - Score moyen
   - Meilleurs scores

### Gestion de la Sélection

#### Ajouter un coup de cœur
1. Aller dans **Admin > Sélection**
2. Cliquer sur **"Ajouter"**
3. Remplir :
   - **Manga** : Titre
   - **Auteur** : Nom auteur
   - **Reviewer** : Nom du membre de l'équipe
   - **Note** : /5 étoiles
   - **Commentaire** : Avis personnel
   - **Cover** : Image du manga
4. Cliquer sur **"Enregistrer"**

### Upload d'images

#### Formats acceptés
- **PNG** : Recommandé pour logos/badges
- **JPG/JPEG** : Recommandé pour photos/covers
- **WEBP** : Recommandé pour optimisation

#### Tailles recommandées
- **Cover manga** : 300x430px (ratio 7:10)
- **Image article** : 800x450px (ratio 16:9)
- **Image héro** : 1920x600px

#### Procédure
1. Cliquer sur **"Choisir un fichier"**
2. Sélectionner l'image
3. L'upload se fait automatiquement
4. L'aperçu s'affiche

#### Optimisation
Pour de meilleures performances :
1. Compresser les images : https://tinypng.com
2. Taille max : 500 KB par image
3. Format WEBP si possible

---

## 🛠️ MAINTENANCE

### Sauvegardes

#### Sauvegarder la base de données
1. Ouvrir phpMyAdmin
2. Sélectionner `tsundoku_toulon`
3. Onglet **"Exporter"**
4. Méthode : **Rapide**
5. Format : **SQL**
6. Cliquer sur **"Exécuter"**
7. Sauvegarder le fichier `.sql` (avec date)

Exemple : `tsundoku_backup_2026-04-13.sql`

#### Sauvegarder les fichiers
Copier le dossier entier :
```
C:\xampp\htdocs\tsundoku-toulon\
```
Vers un disque externe ou cloud.

#### Fréquence recommandée
- **Base de données** : 1x/semaine
- **Fichiers** : 1x/mois

### Mises à jour

#### Vérifier les mises à jour
Consulter le fichier `CHANGELOG.md` pour les nouvelles versions.

#### Appliquer une mise à jour
1. Sauvegarder BDD + fichiers
2. Extraire la nouvelle version
3. Remplacer les fichiers (sauf `config.php` et `/img`)
4. Exécuter les scripts SQL fournis (si nécessaire)

### Résolution de problèmes

#### Le site ne s'affiche pas
✅ **Solutions** :
1. Vérifier qu'Apache est démarré (XAMPP)
2. Vérifier l'URL : `http://localhost/tsundoku-toulon`
3. Vider le cache navigateur (Ctrl + F5)

#### Erreur "500 Internal Server Error"
✅ **Solutions** :
1. Vérifier les logs Apache : `C:\xampp\apache\logs\error.log`
2. Vérifier la syntaxe PHP (pas d'erreurs)
3. Vérifier les permissions fichiers

#### Connexion base de données échoue
✅ **Solutions** :
1. Vérifier que MySQL est démarré (XAMPP)
2. Vérifier `database/connect.php` :
   - Host correct
   - Nom BDD correct
   - User/password corrects
3. Tester la connexion depuis phpMyAdmin

#### Les images ne s'affichent pas
✅ **Solutions** :
1. Vérifier le chemin : `img/mangas/covers/`
2. Vérifier les permissions dossier
3. Vérifier le format (PNG, JPG, WEBP)
4. Vérifier la taille max PHP : `upload_max_filesize` dans `php.ini`

#### CSS ne se charge pas
✅ **Solutions** :
1. Vider le cache navigateur
2. Vérifier le chemin dans `index.html` :
   ```html
   <link rel="stylesheet" href="css/main.css">
   ```
3. Vérifier que les fichiers CSS existent
4. Inspecter la console navigateur (F12)

### Optimisation

#### Performances
1. **Activer la mise en cache** (dans `api/index.php`)
2. **Compresser les images** (TinyPNG)
3. **Minifier CSS/JS** (pour production)

#### Référencement (SEO)
1. Remplir les balises `<meta>` dans `index.html`
2. Ajouter un fichier `sitemap.xml`
3. Créer un fichier `robots.txt`

---

## ❓ FAQ

### Questions générales

**Q: Puis-je changer les couleurs du site ?**  
R: Oui, modifier les variables CSS dans `css/main.css` :
```css
:root {
    --rose-principal: #FF4081; /* Votre couleur */
    --bleu-principal: #0047FF; /* Votre couleur */
}
```

**Q: Comment ajouter une nouvelle section ?**  
R: 
1. Créer `js/sections/ma-section.js`
2. Ajouter le bouton dans la navbar (`index.html`)
3. Ajouter le cas dans `app.js`

**Q: Puis-je utiliser ce site en production ?**  
R: Oui, mais pensez à :
- Changer les mots de passe admin
- Configurer un vrai serveur (pas XAMPP)
- Activer HTTPS
- Configurer les emails

**Q: Le site est-il responsive ?**  
R: Oui, il s'adapte automatiquement aux mobiles et tablettes.

**Q: Puis-je traduire le site en anglais ?**  
R: Oui, modifier tous les textes dans `index.html` et les fichiers JS.

### Questions techniques

**Q: Comment activer l'envoi d'emails ?**  
R: Configurer SMTP dans `api/mail.php` (nécessite un service mail).

**Q: Comment ajouter un paiement en ligne ?**  
R: Intégrer une API comme Stripe ou PayPal (développement nécessaire).

**Q: Puis-je ajouter un système de compte utilisateur ?**  
R: Oui, mais cela nécessite du développement supplémentaire :
- Table `users_public`
- Système d'inscription/connexion
- Gestion des sessions

**Q: Comment sauvegarder automatiquement ?**  
R: Utiliser un cron job (Linux) ou une tâche planifiée (Windows).

---

## 📞 SUPPORT

### Ressources

- **Documentation PHP** : https://www.php.net/docs.php
- **Documentation MySQL** : https://dev.mysql.com/doc/
- **Bootstrap** : https://getbootstrap.com/docs/
- **Stack Overflow** : https://stackoverflow.com/

### Contact

Pour toute question non couverte par ce guide :
- 📧 Email : support@tsundoku-toulon.fr
- 💬 Forum : (à venir)

---

## 📄 ANNEXES

### Structure des fichiers

```
tsundoku-toulon/
├── index.html              # Page principale
├── css/
│   ├── main.css           # Styles de base
│   ├── components.css     # Composants
│   └── pages.css          # Sections
├── js/
│   ├── config.js          # Configuration
│   ├── api.js             # Appels API
│   ├── auth.js            # Authentification
│   ├── ui.js              # Interface
│   ├── app.js             # Orchestrateur
│   └── sections/          # Sections du site
│       ├── accueil.js
│       ├── sorties.js
│       ├── articles.js
│       ├── selection.js
│       ├── avis.js
│       └── quiz.js
├── api/
│   └── index.php          # API REST
├── database/
│   ├── connect.php        # Connexion BDD
│   ├── schema.sql         # Structure tables
│   └── data.sql           # Données démo
├── admin/
│   └── index.php          # Panel admin
└── img/                   # Images
    ├── logo/
    ├── mangas/covers/
    └── articles/
```

### Schéma de la base de données

```sql
-- Users (Admin)
users (id, email, nom, prenom, mdpasse)

-- Sorties manga
sorties (id, titre, auteur, date_sortie, image, description)

-- Articles blog
articles (id, titre, contenu, image, date_publication, publie)

-- Sélection équipe
selection_equipe (id, titre_manga, auteur, reviewer, note, commentaire, image)

-- Quiz
quiz (id, titre, description, actif)
quiz_questions (id, id_quiz, question, reponse_a, reponse_b, reponse_c, reponse_d, bonne_reponse)
quiz_scores (id, id_quiz, nom_utilisateur, score, date)

-- Avis boutiques
avis_boutiques (id, nom_boutique, adresse, note_globale)
avis_details (id, id_boutique, auteur, commentaire, note, date)

-- Réservations
reservations (id, nom, email, titre_manga, date_reservation, statut)
```

---

**Dernière mise à jour** : 13 avril 2026  
**Version** : 1.0.0  
**Auteur** : Tsundoku Toulon

---

*Ce guide est fourni "tel quel" sans garantie. Pour toute modification avancée, il est recommandé de consulter un développeur web.*

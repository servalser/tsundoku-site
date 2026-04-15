-- ============================================
-- TSUNDOKU TOULON - BASE DE DONNÉES
-- ============================================

DROP DATABASE IF EXISTS tsundoku_toulon;
CREATE DATABASE tsundoku_toulon CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tsundoku_toulon;

-- ============================================
-- TABLE USERS (ADMIN)
-- Compte par défaut: admin@tsundoku.fr / admin123
-- ============================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    mdpasse VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Hash du mot de passe 'admin123'
INSERT INTO users (email, nom, prenom, mdpasse, role) VALUES
('admin@tsundoku.fr', 'Admin', 'Tsundoku', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- ============================================
-- TABLE SORTIES (Mangas à venir)
-- ============================================
CREATE TABLE sorties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(200) NOT NULL,
    auteur VARCHAR(100),
    date_sortie DATE,
    image VARCHAR(255),
    description TEXT,
    prix DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================
-- TABLE ARTICLES (Blog)
-- ============================================
CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(200) NOT NULL,
    contenu TEXT NOT NULL,
    image VARCHAR(255),
    auteur VARCHAR(50),
    date_publication DATE DEFAULT (CURRENT_DATE),
    publie BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================
-- TABLE SELECTION (Coups de cœur)
-- ============================================
CREATE TABLE selection_equipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre_manga VARCHAR(200) NOT NULL,
    auteur VARCHAR(100),
    reviewer VARCHAR(50) NOT NULL,
    note INT CHECK (note BETWEEN 1 AND 5),
    commentaire TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================
-- TABLE QUIZ
-- ============================================
CREATE TABLE quiz (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(200) NOT NULL,
    description TEXT,
    actif BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE quiz_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_quiz INT NOT NULL,
    question TEXT NOT NULL,
    reponse_a VARCHAR(200) NOT NULL,
    reponse_b VARCHAR(200) NOT NULL,
    reponse_c VARCHAR(200) NOT NULL,
    reponse_d VARCHAR(200) NOT NULL,
    bonne_reponse CHAR(1) CHECK (bonne_reponse IN ('A','B','C','D')),
    FOREIGN KEY (id_quiz) REFERENCES quiz(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE quiz_scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_quiz INT NOT NULL,
    nom_utilisateur VARCHAR(50),
    score INT,
    date_completion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_quiz) REFERENCES quiz(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- TABLE AVIS
-- ============================================
CREATE TABLE avis_boutiques (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_boutique VARCHAR(100) NOT NULL,
    note_globale DECIMAL(2,1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE avis_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_boutique INT NOT NULL,
    auteur VARCHAR(50) NOT NULL,
    commentaire TEXT NOT NULL,
    note INT CHECK (note BETWEEN 1 AND 5),
    date_avis DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (id_boutique) REFERENCES avis_boutiques(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- AFFICHAGE
-- ============================================
SELECT '✅ Base de données créée !' as message;
SELECT '👤 Compte admin: tsundokuadmin / LogPrivéTln8313' as credentials;
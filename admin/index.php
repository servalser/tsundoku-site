<?php
session_start();

// Vérifier si l'utilisateur est connecté
if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'admin') {
    header('Location: ../index.html');
    exit;
}

require_once '../database/connect.php';

// Récupérer les stats
$stats = [];
try {
    $stats['sorties'] = $pdo->query("SELECT COUNT(*) FROM sorties")->fetchColumn();
    $stats['articles'] = $pdo->query("SELECT COUNT(*) FROM articles")->fetchColumn();
    $stats['selection'] = $pdo->query("SELECT COUNT(*) FROM selection_equipe")->fetchColumn();
    $stats['quiz'] = $pdo->query("SELECT COUNT(*) FROM quiz")->fetchColumn();
} catch(PDOException $e) {
    $stats = ['sorties' => 0, 'articles' => 0, 'selection' => 0, 'quiz' => 0];
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Tsundoku Toulon</title>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Zen+Kaku+Gothic+New:wght@300;400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/components.css">
    <link rel="stylesheet" href="../css/pages.css">
</head>
<body>
    <nav id="navbar">
        <div class="nav-container">
            <div class="logo">
                <span class="logo-text">ADMIN TSUNDOKU</span>
                <span class="logo-subtitle">Toulon</span>
            </div>
            <div class="nav-auth">
                <span style="color: var(--creme); margin-right: 1rem;">
                    👤 <?php echo htmlspecialchars($_SESSION['user_email']); ?>
                </span>
                <button class="btn-secondary" onclick="logout()">Déconnexion</button>
                <button class="btn-ghost" onclick="window.location='../'">Voir le site</button>
            </div>
        </div>
    </nav>

    <main id="mainContent">
        <section class="section">
            <div class="section-title">
                <h2>📊 Tableau de bord</h2>
                <p>Bienvenue <?php echo htmlspecialchars($_SESSION['user_email']); ?></p>
                <div class="underline"></div>
            </div>

            <!-- Stats -->
            <div class="grid grid-4" style="margin-bottom: 3rem;">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">📚 Sorties</h3>
                    </div>
                    <div class="card-body" style="text-align: center;">
                        <h1 style="font-size: 48px; background: var(--gradient-principal); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                            <?php echo $stats['sorties']; ?>
                        </h1>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">📰 Articles</h3>
                    </div>
                    <div class="card-body" style="text-align: center;">
                        <h1 style="font-size: 48px; background: var(--gradient-principal); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                            <?php echo $stats['articles']; ?>
                        </h1>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">💖 Sélection</h3>
                    </div>
                    <div class="card-body" style="text-align: center;">
                        <h1 style="font-size: 48px; background: var(--gradient-principal); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                            <?php echo $stats['selection']; ?>
                        </h1>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🎮 Quiz</h3>
                    </div>
                    <div class="card-body" style="text-align: center;">
                        <h1 style="font-size: 48px; background: var(--gradient-principal); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                            <?php echo $stats['quiz']; ?>
                        </h1>
                    </div>
                </div>
            </div>

            <!-- Actions rapides -->
            <div class="section-title">
                <h3>🚀 Actions rapides</h3>
            </div>
            
            <div class="grid grid-3">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">📚 Gérer les sorties</h3>
                    </div>
                    <div class="card-body">
                        <p>Ajoutez, modifiez ou supprimez les mangas à venir.</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn-primary btn-sm" onclick="alert('Fonctionnalité en développement')">Accéder</button>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">📝 Gérer les articles</h3>
                    </div>
                    <div class="card-body">
                        <p>Créez et publiez des articles sur le blog.</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn-primary btn-sm" onclick="alert('Fonctionnalité en développement')">Accéder</button>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🎮 Gérer les quiz</h3>
                    </div>
                    <div class="card-body">
                        <p>Créez des quiz interactifs pour vos visiteurs.</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn-primary btn-sm" onclick="alert('Fonctionnalité en développement')">Accéder</button>
                    </div>
                </div>
            </div>

            <!-- Guide -->
            <div class="alert alert-info" style="margin-top: 3rem;">
                <span class="alert-icon">ℹ️</span>
                <div>
                    <p><strong>Comment ajouter du contenu ?</strong></p>
                    <p>Utilisez phpMyAdmin pour ajouter des données aux tables : sorties, articles, selection_equipe, quiz.</p>
                    <p>Consultez le fichier <strong>GUIDE_COMPLET.md</strong> pour les instructions détaillées.</p>
                </div>
            </div>
        </section>
    </main>

    <script>
        async function logout() {
            try {
                await fetch('../api/index.php?path=logout', { method: 'POST' });
                window.location.href = '../index.html';
            } catch(error) {
                alert('Erreur lors de la déconnexion');
            }
        }
    </script>
</body>
</html>
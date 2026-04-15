<?php
// ============================================
// API REST TSUNDOKU TOULON
// ============================================

session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

require_once '../database/connect.php';

$method = $_SERVER['REQUEST_METHOD'];
$path = isset($_GET['path']) ? $_GET['path'] : '';

// ============================================
// ROUTES
// ============================================

// GET /sorties - Récupérer toutes les sorties
if ($path === 'sorties' && $method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM sorties ORDER BY date_sortie DESC");
        $sorties = $stmt->fetchAll();
        echo json_encode(['success' => true, 'data' => $sorties]);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}

// GET /articles - Récupérer tous les articles publiés
elseif ($path === 'articles' && $method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM articles WHERE publie = 1 ORDER BY date_publication DESC");
        $articles = $stmt->fetchAll();
        echo json_encode(['success' => true, 'data' => $articles]);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}

// GET /selection - Récupérer la sélection de l'équipe
elseif ($path === 'selection' && $method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM selection_equipe ORDER BY created_at DESC");
        $selection = $stmt->fetchAll();
        echo json_encode(['success' => true, 'data' => $selection]);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}

// GET /quiz - Récupérer le quiz actif
elseif ($path === 'quiz' && $method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM quiz WHERE actif = 1 LIMIT 1");
        $quiz = $stmt->fetch();
        
        if ($quiz) {
            $stmt_questions = $pdo->prepare("SELECT * FROM quiz_questions WHERE id_quiz = ?");
            $stmt_questions->execute([$quiz['id']]);
            $quiz['questions'] = $stmt_questions->fetchAll();
        }
        
        echo json_encode(['success' => true, 'data' => $quiz]);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}

// GET /avis - Récupérer tous les avis
elseif ($path === 'avis' && $method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM avis_boutiques ORDER BY created_at DESC");
        $boutiques = $stmt->fetchAll();
        
        foreach ($boutiques as &$boutique) {
            $stmt_details = $pdo->prepare("SELECT * FROM avis_details WHERE id_boutique = ? ORDER BY date_avis DESC");
            $stmt_details->execute([$boutique['id']]);
            $boutique['avis'] = $stmt_details->fetchAll();
        }
        
        echo json_encode(['success' => true, 'data' => $boutiques]);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}

// POST /login - Connexion admin
elseif ($path === 'login' && $method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['mdpasse'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_role'] = $user['role'];
            
            echo json_encode([
                'success' => true,
                'message' => 'Connexion réussie',
                'user' => [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'nom' => $user['nom'],
                    'prenom' => $user['prenom'],
                    'role' => $user['role']
                ]
            ]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Email ou mot de passe incorrect']);
        }
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}

// GET /check-auth - Vérifier si l'utilisateur est connecté
elseif ($path === 'check-auth' && $method === 'GET') {
    if (isset($_SESSION['user_id'])) {
        echo json_encode([
            'success' => true,
            'authenticated' => true,
            'user' => [
                'id' => $_SESSION['user_id'],
                'email' => $_SESSION['user_email'],
                'role' => $_SESSION['user_role']
            ]
        ]);
    } else {
        echo json_encode(['success' => true, 'authenticated' => false]);
    }
}

// POST /logout - Déconnexion
elseif ($path === 'logout' && $method === 'POST') {
    session_destroy();
    echo json_encode(['success' => true, 'message' => 'Déconnexion réussie']);
}

// Route non trouvée
else {
    echo json_encode(['success' => false, 'error' => 'Route non trouvée']);
}
?>
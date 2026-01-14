<?php
require_once("config.php");

// Gérer le cookie visiteur
if (!isset($_COOKIE['panier_id'])) {
    $cookie_id = bin2hex(random_bytes(16));
    setcookie('panier_id', $cookie_id, time() + (15 * 24 * 60 * 60));
} else {
    $cookie_id = $_COOKIE['panier_id'];
}

// Récupérer les produits
$produits = $pdo->query("SELECT * FROM produits")->fetchAll();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Catalogue</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Catalogue des produits</h1>
    <div class="catalogue">
        <?php foreach ($produits as $p): ?>
            <div class="produit">
                <img src="<?= htmlspecialchars($p['image']) ?>" alt="<?= htmlspecialchars($p['nom']) ?>">
                <h3><?= htmlspecialchars($p['nom']) ?></h3>
                <p><?= $p['prix'] ?> €</p>
                <form method="post" action="ajouter.php">
                    <input type="hidden" name="id_produit" value="<?= $p['id_produit'] ?>">
                    <button type="submit">Ajouter au panier</button>
                </form>
            </div>
        <?php endforeach; ?>
    </div>
    <div class="container">
    <a href="panier.php" class="btn-panier"> Voir mon panier</a>
    </div>
</body>
</html>

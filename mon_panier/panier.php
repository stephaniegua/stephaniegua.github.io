<?php
require_once("config.php");

$cookie_id = $_COOKIE['panier_id'] ?? null;
$total = 0;

if ($cookie_id) {
    $stmt = $pdo->prepare("
        SELECT produits.nom, produits.prix, produits.image, panier.quantite, panier.id_produit
        FROM panier
        JOIN produits ON panier.id_produit = produits.id_produit
        WHERE panier.cookie_id = ?
    ");
    $stmt->execute([$cookie_id]);
    $items = $stmt->fetchAll();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mon panier</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Mon panier</h1>
    <?php if (!empty($items)): ?>
        <?php foreach ($items as $item): ?>
            <div class="panier-item">
    <img src="<?= htmlspecialchars($item['image']) ?>" alt="<?= htmlspecialchars($item['nom']) ?>">
    <div class="details">
        <h4><?= htmlspecialchars($item['nom']) ?></h4>
        <p>Quantité : <?= $item['quantite'] ?></p>
         <form action="supprimer.php" method="post">
             <input type="hidden" name="id_produit" value="<?= $item['id_produit'] ?>">
             <button type="submit">Supprimer</button>
        </form>
        <p>Prix unitaire : <?= number_format($item['prix'], 2, ',', ' ') ?> €</p>
        <p>Total : <?= number_format($item['prix'] * $item['quantite'], 2, ',', ' ') ?> €</p>
    </div>
</div>
 <?php $total += $item['prix'] * $item['quantite']; ?>
        <?php endforeach; ?>
        <p><strong>Total général : <?= number_format($total, 2, ',', ' ') ?> €</strong></p>
<?php else: ?>
        <p style="font-style: italic; color: #888;">Votre panier est vide pour le moment.</p>
    <?php endif; ?>
    <div class="container">
    <a href="index.php" class="btn-panier"> Retour au catalogue</a>
    </div>
</body>
</html>

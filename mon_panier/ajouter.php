<?php
require_once("config.php");

$cookie_id = $_COOKIE['panier_id'] ?? null;
$id_produit = $_POST['id_produit'] ?? null;

if ($cookie_id && $id_produit) {
    $stmt = $pdo->prepare("SELECT * FROM panier WHERE cookie_id = ? AND id_produit = ?");
    $stmt->execute([$cookie_id, $id_produit]);
    $item = $stmt->fetch();

    if ($item) {
        $update = $pdo->prepare("UPDATE panier SET quantite = quantite + 1 WHERE id_panier = ?");
        $update->execute([$item['id_panier']]);
    } else {
        $insert = $pdo->prepare("INSERT INTO panier (cookie_id, id_produit, quantite, date_ajout) VALUES (?, ?, 1, NOW())");
        $insert->execute([$cookie_id, $id_produit]);
    }
}

header("Location: index.php");
exit;

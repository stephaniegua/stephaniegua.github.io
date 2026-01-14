<?php
require_once("config.php");

$cookie_id = $_COOKIE['panier_id'] ?? null;
$id_produit = $_POST['id_produit'] ?? null;

if ($cookie_id && $id_produit) {
    // Vérifie si le produit est dans le panier
    $stmt = $pdo->prepare("SELECT * FROM panier WHERE cookie_id = ? AND id_produit = ?");
    $stmt->execute([$cookie_id, $id_produit]);
    $item = $stmt->fetch();

    if ($item) {
        if ($item['quantite'] > 1) {
            // Réduit la quantité de 1
            $update = $pdo->prepare("UPDATE panier SET quantite = quantite - 1 WHERE id_panier = ?");
            $update->execute([$item['id_panier']]);
        } else {
            // Supprime complètement le produit du panier
            $delete = $pdo->prepare("DELETE FROM panier WHERE id_panier = ?");
            $delete->execute([$item['id_panier']]);
        }
    }
}

header("Location: panier.php");
exit;

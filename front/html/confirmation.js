// Confirmation de la commande a partir du stockage local
//On récupère la confirmation de commande
let confirmationCommande = localStorage.getItem("confirmationCommande");
//On la transforme en JSON pour l'exploiter
confirmationCommande = JSON.parse(confirmationCommande);
console.log("OrderId : " + confirmationCommande.orderId);
//On récupère l'élément HTML d'id orderId pour y insérer le numéro de confirmation de commande
let OrderId = document.getElementById("orderId");
OrderId.innerText = confirmationCommande.orderId;
//Une fois la confirmation de commande afficher on vide le panier en le supprimant.
localStorage.removeItem("panier");

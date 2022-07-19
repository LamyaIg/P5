// Confirmation de la commande a partir du stockage local
//On récupère la confirmation de commande
let order = new URLSearchParams(document.location.search);
let orderId = order.get("orderId");

function displayOrderId() {
  console.log("test", orderId);
  let orderToDisplay = document.getElementById("orderId");
  console.log(orderToDisplay);
  orderToDisplay.textContent = orderId;
  //Une fois la confirmation de commande afficher on vide le panier en le supprimant.
  localStorage.removeItem("panier");
}

displayOrderId();

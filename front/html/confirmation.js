// Confirmation de la commande a partir du stockage local
//On récupère la confirmation de commande
let order = new URLSearchParams(document.location.search);
let orderId = order.get("orderId");

function OrderId() {
  let order = document.getElementById("orderId");
  order.textContent = orderId;
}

OrderId();

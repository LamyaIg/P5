// utilisation de URLSearchParams pour recuperer les id produits

let params = new URLSearchParams(document.location.search);
let idParams = params.get("id");

// Permet de communiqué avec le serveur et de trouvé son id

const getProduct = () =>
  fetch(`http://localhost:3000/api/products/${idParams}`)
    .then((res) => res.json())
    .then((data) => data)
    .catch(function (err) {
      console.log("error", err);
    });
function displayProduct(product) {
  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src=${product.imageUrl} alt=${product.altTxt}>`;
  document.getElementById("title").textContent = `${product.name}`;
  document.getElementById("price").textContent = `${product.price}`;
  document.getElementById("description").textContent = `${product.description}`;
  product.colors.forEach((couleur, index) => {
    let option = document.createElement("option");
    let select = document.getElementById("colors");
    option.value = couleur;
    option.innerText = couleur;
    select.appendChild(option);
  });
  let minQuantite = document.getElementById("quantity");
  minQuantite.value = 1;
}

//Gestion de la commande
function eventListener() {
  let bouton = document.getElementById("addToCart");
  bouton.addEventListener("click", function (event) {
    event.preventDefault();
    let id = idParams;
    //console.log("Bouton cliqué");
    let couleurChoisie = document.getElementById("colors").value;
    let quantite = parseInt(document.getElementById("quantity").value);
    let choix = {
      id: id,
      color: couleurChoisie,
      quantity: quantite,
    };
    if (couleurChoisie && quantite > 0) {
      if (window.confirm("souhaitez-vous ajouter ce produit au panier ?")) {
        addToBasket(choix);
      }
    } else {
      return window.alert("veuillez choisir une couleur!");
    }
  });

  function setStorage(panier) {
    localStorage.setItem("panier", JSON.stringify(panier));
  }
  //On ajouter un choix à la liste d'éléments du panier
  //On récupère le panier existant
  function getStorage() {
    let panier = localStorage.getItem("panier");
    //Si le panier est vide
    if (panier == null) {
      //On crée un panier qui est une liste d'éléments
      return [];
    }
    //Si le panier n'est pas vide
    else {
      //On transforme le panier en JSON pour pouvoir le manipuler
      return JSON.parse(panier);
    }
  }

  function addToBasket(choix) {
    let panier = getStorage();
    for (let i in panier) {
      const productInBasket = panier[i];
      if (
        productInBasket.id === choix.id &&
        productInBasket.color === choix.color
      ) {
        productInBasket.quantity = choix.quantity + productInBasket.quantity;
        setStorage(panier);
        return;
      }
    }

    panier.push(choix);
    setStorage(panier);
    return;
  }
}
async function main() {
  const product = await getProduct();
  displayProduct(product);
  eventListener();
}
main();

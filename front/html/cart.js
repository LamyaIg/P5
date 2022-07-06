function getProducts() {
  return fetch(`http://localhost:3000/api/products`)
    .then((res) => res.json())
    .then((data) => data)
    .catch(function (err) {
      console.log(error);
    });
}

function getBasket() {
  let basket = localStorage.getItem("panier");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

function displayProduct(products, basketToShow) {
  let article = document.getElementById("cart__items");
  let childElement = document.createElement("article");
  childElement.classList.add("cart__item");
  childElement.dataset.id = basketToShow.id;
  childElement.dataset.color = basketToShow.color;

  childElement.innerHTML = `<div class="cart__item__img">
    <img src=${products.imageUrl} alt=${products.altTxt}>
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${products.name}</h2>
      <p>${basketToShow.color}</p>
      <p>${products.price}€</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${basketToShow.quantity}>
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>`;

  article.appendChild(childElement);
}

async function allProducts() {
  const products = await getProducts();
  for (let basketToShow of getBasket()) {
    const product = products.filter((p) => p._id === basketToShow.id);
    displayProduct(product[0], basketToShow);
  }
  return;
}

function getAllArticles() {
  let totalArticles = 0;
  let panier = getBasket();
  for (let i in panier) {
    const allArticles = panier[i].quantity;
    totalArticles += allArticles;
  }
  return totalArticles;
}

const total = async () => {
  const totalArticlesToBasket = document.getElementById("totalQuantity");
  totalArticlesToBasket.textContent = getAllArticles();
  const totalPriceToBasket = document.getElementById("totalPrice");
  totalPriceToBasket.textContent = await getAllPrices();
};

function getAllPrices() {
  let totalPrice = 0;
  let panier = getBasket();
  for (let i in panier) {
    const getAllPrices = panier[i].price;
    totalPrice += getAllPrices;
  }
  return totalPrice;
}

async function getAllPrices() {
  let totalPrice = 0;
  const panier = getBasket();
  const allProducts = await getProducts();

  for (let j in panier) {
    for (let i in allProducts) {
      const price = allProducts[i].price;
      const id = allProducts[i]._id;

      if (panier[j].id === id) {
        totalPrice += panier[j].quantity * price;
      }
    }
  }
  return totalPrice;
}

function setStorage(panier) {
  localStorage.setItem("panier", JSON.stringify(panier));
}

function listenChangeQuantity() {
  const itemQuantity = document.getElementsByName("itemQuantity");
  for (let quantity of itemQuantity) {
    quantity.addEventListener("change", function (event) {
      const findParent = event.target.closest("article");
      const dataId = findParent.dataset.id;
      const dataColor = findParent.dataset.color;
      const keepQuantities = parseInt(event.target.value);
      changeQuantity(dataId, dataColor, keepQuantities);
      console.log(dataId, dataColor, keepQuantities);
    });
  }
}
function changeQuantity(id, color, quantity) {
  const panier = getBasket();
  for (let i in panier) {
    if (panier[i].id === id && panier[i].color === color) {
      panier[i].quantity = quantity;
      setStorage(panier);
      location.reload();
    }
  }
}

function listenSupprimer() {
  const itemSupprimer = document.querySelectorAll(".deleteItem");
  for (let supprimer of itemSupprimer) {
    supprimer.addEventListener("click", function (event) {
      const findParent = event.target.closest("article");
      const dataId = findParent.dataset.id;
      const dataColor = findParent.dataset.color;
      console.log(dataId, dataColor);
      supprimerElement(dataId, dataColor);
    });
  }
}

function supprimerElement(id, color) {
  const panier = getBasket();
  for (let i in panier) {
    if (panier[i].id === id && panier[i].color === color) {
      panier.splice(i, 1);
      setStorage(panier);
    }
  }
}

/*function boutonCommander() {
  const itemCommander = document.getElementById("order");
  for (let commander of itemCommander) {
    boutonCommander.addEventListener("click", function (event) {
      //Se déclenche lorsqu'on clique sur le bouton commander
      //Récupérer chacune des valeurs du formulaire
      //Vérifier pour chaque valeur qu'il y a une information, sinon afficher un message d'erreur
      event.preventDefault();
      let erreur = false;
    });
  }
}
*/

function formulaire() {
  // gestion du nom
  const regexLastName = /(^.{1,}[a-zA-ZÀ-ÿ]+$)/;
  let lastName = document.getElementById("lastName");
  lastName.addEventListener("input", function (event) {
    let lastNameTarget = event.target.value;
    let isValid = regexLastName.test(lastNameTarget);
    let errorMsgLastName = document.getElementById("lastNameErrorMsg");
    if (isValid === false) {
      errorMsgLastName.innerText =
        "Merci d'indiquer un nom de plus de 3 caractères";
      //alert("Vous devez entrer au minimum 3 lettres pour votre nom.");
      errorMsgLastName.style.display = "block";
    }
  });

  // gestion du prenom
  const regexFirstName = /(^.{1,}[a-zA-ZÀ-ÿ]+$)/;
  let firstName = document.getElementById("firstName");
  firstName.addEventListener("input", function (event) {
    let firstNameTarget = event.target.value;
    let isValid = regexFirstName.test(firstNameTarget);
    let errorMsgFirstName = document.getElementById("firstNameErrorMsg");
    if (isValid === false) {
      errorMsgFirstName.innerText =
        "Merci d'indiquer un prenom de plus de 3 caractères";
      //alert("Vous devez entrer au minimum 3 lettres pour votre prenom.");
      errorMsgFirstName.style.display = "block";
    }
  });

  //Gestion de l'adresse
  const regexaddress = /(^[a-zA-Z -]{3,})/;
  let address = document.getElementById("address");
  address.addEventListener("input", function (event) {
    let addressTarget = event.target.value;
    let isValid = regexaddress.test(addressTarget);
    let errorMsgAddress = document.getElementById("addressErrorMsg");
    if (isValid === false) {
      errorMsgAddress.innerText =
        "Merci d'indiquer une adresse de plus de 3 caractères";
      //alert("Vous devez entrer au minimum 3 lettres pour votre adresse.");
      errorMsgAddress.style.display = "block";
    }
  });

  const regexcity = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  let city = document.getElementById("city");
  city.addEventListener("input", function (event) {
    let cityTarget = event.target.value;
    let isValid = regexcity.test(cityTarget);
    let errorMsgCity = document.getElementById("cityErrorMsg");
    if (isValid === false) {
      errorMsgCity.innerText =
        "Merci d'indiquer une ville de plus de 3 caractères";
      //alert("Vous devez entrer au minimum 3 lettres pour votre ville.");
      errorMsgCity.style.display = "block";
    }
  });

  const regexemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let email = document.getElementById("email");
  email.addEventListener("input", function (event) {
    let emailTarget = event.target.value;
    let isValid = regexemail.test(emailTarget);
    let errorMsgEmail = document.getElementById("emailErrorMsg");
    if (isValid === false) {
      errorMsgEmail.innerText =
        "Merci d'indiquer un mail de plus de 3 caractères";
      //alert("Vous devez entrer au minimum 3 lettres pour votre mail.");
      errorMsgEmail.style.display = "block";
    }
  });
}

/*if(erreur==true) {
  alert("Il y a une erreur dans vôtre formulaire, tous les champs doivent être rempli avec au minimum 3 carractères.");
  
}
if (!erreur) {
  let listeIdCanape = [];
  panier.forEach((choix, index) => {
    listeIdCanape.push(choix._id);
  });

  let message = {
    contact: {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    },
    products: listeIdCanape,
  };
  console.log("Contenu de la variable message : " + JSON.stringify(message));
  localStorage.removeItem("confirmationCommande");
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, /",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (confirmationCommande) {
      console.log(
        "Confirmation de commande : " + JSON.stringify(confirmationCommande)
      );
      localStorage.setItem(
        "confirmationCommande",
        JSON.stringify(confirmationCommande)
      );
      window.location.href = "confirmation.html";
    })
    .catch(function (error) {
      console.log("Erreur : " + error);
    });
}
*/
async function main() {
  await allProducts();
  await total();
  listenChangeQuantity();
  listenSupprimer();
  formulaire();
}
main();
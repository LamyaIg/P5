function getProducts() {
  return fetch(`http://localhost:3000/api/products`)
    .then((res) => res.json())
    .then((data) => data)
    .catch(function (err) {
      console.log(error);
    });
}

function getBasket() {
  let panier = localStorage.getItem("panier");
  if (panier == null) {
    return [];
  } else {
    return JSON.parse(panier);
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
  let panier = getBasket();
  for (let basketToShow of panier) {
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

let valid = {
  lastName: false,
  firstName: false,
  address: false,
  city: false,
  email: false,
};

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
      valid.lastName = false;
    } else {
      valid.lastName = true;
      errorMsgLastName.style.display = "none";
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
      valid.firstName = false;
    } else {
      valid.firstName = true;
      errorMsgFirstName.style.display = "none";
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
      valid.address = false;
    } else {
      valid.address = true;
      errorMsgAddress.style.display = "none";
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
      valid.city = false;
    } else {
      valid.city = true;
      errorMsgCity.style.display = "none";
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
      valid.email = false;
    } else {
      valid.email = true;
      errorMsgEmail.style.display = "none";
    }
  });
}

function validation(contact) {
  let panier = getBasket();
  let listIdCanap = [];
  if (panier.length <= 0) {
    window.alert(
      "Veuillez sélectionner un produit avant de poursuivre votre commande."
    );
  } else {
    for (let i in panier) {
      for (let j = 0; j < panier[i].quantity; j++) {
        listIdCanap.push(panier[i].id);
      }
    }
  }
}

function inputElement() {
  const dataToSend = {};

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application / json",
      "Content-Type": "application / json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then((res) => res.json())
    .then((data) => {
      location.href = `./confirmation.html?orderId=${data.orderId}`;
    });

  const order = document.getElementById("order");
  order.addEventListener("click", function (event) {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;

    let contact = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    };

    if (firstName && lastName && address && city && email) {
      event.preventDefault();
      if (
        valid.firstName &&
        valid.lastName &&
        valid.address &&
        valid.city &&
        valid.email
      ) {
        validation(contact);
      }
    }
  });
}

async function main() {
  await allProducts();
  await total();
  listenChangeQuantity();
  listenSupprimer();
  formulaire();
  inputElement();
}
main();

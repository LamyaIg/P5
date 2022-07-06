// Permet de communiqué avec le serveur
const getProducts = () =>
  fetch(`http://localhost:3000/api/products`)
    .then((res) => res.json())
    .then((data) => data)
    .catch(function (err) {
      console.log(err);
    });
function listeCanapes(products) {
  //console.log(listeCanapes[0].name);
  let section = document.getElementById("items");
  products.forEach((product, index) => {
    let a = document.createElement("a");
    a.innerHTML =
      ' \
            <article>\
            <img src=" ' +
      product.imageUrl +
      ' " alt=" ' +
      product.altTxt +
      ' ">\
            <h3 class="productName">' +
      product.name +
      '</h3>\
            <p class="productDescription">' +
      product.description +
      "</p>\
          </article>\
            ";
    a.href = `./product.html?id=${product._id}`;
    section.appendChild(a);
  });
}
async function main() {
  const products = await getProducts();
  listeCanapes(products);
}
main();

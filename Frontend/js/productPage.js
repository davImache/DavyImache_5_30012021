// Récupérer l'id des produits et initialisation des variables
const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get("id");
const urlAPI = "http://localhost:3000/api/cameras/" + id;
var productInfo;


// Création d'une fonction pour faire appel à l'API et retourner les données au format JSON 
async function getData (url) {
  let reponse = await fetch(url);
  return await reponse.json();
};

// Récupérer les données de l'API et ajout du produit sur la page html
async function addProduct() {
  productInfo = await getData(urlAPI);
  //Ajouter les informations des produits dans le html
  let html = `<h2>Appareils : ${productInfo.name}</h2>
          <figure>
            <img src="${productInfo.imageUrl}">
              <figcaption>
                <p>Prix : ${productInfo.price / 100}€</p>
                <p><span class="details">Détails :</span> ${
                  productInfo.description
                }</p>
              </figcaption>
          </figure>
          <div class = "optionLenses">
              <label for="optionLenses">Choix des lentilles:</label>
              <select id="optionLenses">
              ${addOptionLense()}   
              </select>
          </div>
          <button onclick="addToCart()">Ajouter au panier</button>`;
          document.querySelector(".product").innerHTML = html;
};
addProduct();


// Récupérer les données pour le choix de la lentille
function addOptionLense() {

  let html="";
  for (let i = 0; i < productInfo.lenses.length; i++) { 
    html +=`<option>${productInfo.lenses[i]}</option>`
  }
  return html;
}

 // Ajout du produit au panier
function addToCart() {
    let panier = localStorage.getItem("cart");
    if (panier === null) 
    panier = {};
    else panier = JSON.parse(panier);

    if (panier[productInfo._id] === undefined) {
      panier[productInfo._id] = {
        name: productInfo.name,
        qty: 1,
        price: productInfo.price,
      };
    } else panier[productInfo._id].qty++;
    localStorage.setItem("cart", JSON.stringify(panier));
    alert("Ajouter au panier ! ")
    console.log(panier)
}



  


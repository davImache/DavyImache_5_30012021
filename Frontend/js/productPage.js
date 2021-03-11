//1 Récuperer l'id des produits et initialisation des variables
const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get("id");
const urlAPI = "http://localhost:3000/api/cameras/" + id;
var productInfo;


//2 Faire appelle à l'API et retourner la réponse au format JSON 
async function getData (url) {
  let reponse = await fetch(url);
  return await reponse.json();
};


//3 Récuper les données de l'API 
async function addProduct() {
  productInfo = await getData(urlAPI);
  //4 Ajout du produit sur la page
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
          <label for="optionLenses">Choix des lentilles:</label>
                <select id="optionLenses">
                ${addOptionLense()}   
                </select> 
          <button onclick="addToCart()">Ajouter au panier</button>`;
          document.querySelector(".product").innerHTML = html;
};
addProduct();


//6 Initialisation des variables pour les lentilles
const lenses = searchParams.get("lenses");
const optionLenses = "http://localhost:3000/api/cameras/" + lenses;
var selectLenses; 

//7 Récupérer les données pour le choix de la lentille
function addOptionLense() {
  console.log(productInfo.lenses);
  let html="";
  for (let i = 0; i < productInfo.lenses.length; i++) { 
    html +=`<option>${productInfo.lenses[i]}</option>`
  }
  return html;
}

 //8 Ajout du produit au panier
  function addToCart() {
    let panier = localStorage.getItem("cart");
    if (panier === null) panier = {};
    else panier = JSON.parse(panier);

    if (panier[productInfo._id] === undefined) {
      panier[productInfo._id] = {
        name: productInfo.name,
        qty: 1,
        price: productInfo.price,
      };
    } else panier[productInfo._id].qty++;
    localStorage.setItem("cart", JSON.stringify(panier));
  }


  


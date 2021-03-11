async function getProducts() {
    try {
      const response = await fetch("http://localhost:3000/api/cameras");
      return await response.json();
    }catch (error) {
      alert(error);
    } 
}
getProducts();

main();

async function main() {
  const products = await getProducts();
  for (let i = 0; i < products.length; i++) {
    displayProducts(products[i]);
  }

  function displayProducts(product) {
    document.getElementsByClassName("products")[0].innerHTML += `
    <a href="./product.html?id=${product._id}">
        <figure>
            <img src="${product.imageUrl}">
            <figcaption>
                <p>Type : ${product.name}</p>
                <p>Prix : ${product.price / 100}€</p>
                <p><span class="details">Détails :</span> ${
                  product.description
                }</p>
            </figcaption>
        </figure>
    </a>
           
    `;
  }
}

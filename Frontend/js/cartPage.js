//1 On récupère les données
const data = JSON.parse(localStorage.getItem("cart"));
let total;

//2 Pour chaque entrée du tableau je crée une ligne avec les informations
function renderPage() {
  let html = "";
  total = 0;
  for (const [key, value] of Object.entries(data)) {
    html += `
    <tr>
      <td>${value.name}</td>
      <td>${value.qty} <button onclick="remove('${key}')">retirer</button></td>
      <td>${(value.price * value.qty) / 100}€</td>
    </tr>
    `;
    total += (value.price * value.qty) / 100;
  }

  //3 J'affiche les nouvelles lignes
  document.querySelector("tbody").innerHTML = html;
}

//4 Additions des prix et afficher le total
// function finalCart() {
// let final;
// data.forEach(function() {

//   });
// }
function remove(idProduct) {
  console.log("remove", idProduct, data[idProduct]);
  delete(data[idProduct]);
  localStorage.setItem("cart", JSON.stringify(data));
  renderPage();
}

renderPage();

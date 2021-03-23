// On récupère les données
const data = JSON.parse(localStorage.getItem("cart"));
let total;

// Pour chaque entrée du tableau je crée une ligne avec les informations sur les produits
function renderPage() {
  total = 0;
  let html = "";
  for (const [key, value] of Object.entries(data)) {
    html += `
      <tbody>
          <tr>
            <td>${value.name}</td>
            <td>${
              value.qty
            } <button class="btnRemove" onclick="remove('${key}')">retirer</button></td>
            <td>${(value.price * value.qty) / 100}€</td>
          </tr>
      </tbody>
      `;
    total += (value.price * value.qty) / 100;
  }
  //Afficher "panier vide" s'il ne comporte aucun produits, sinon on affiche les produits ajouter + le formulaire
  if (data === null || Object.entries(data).length === 0) {
    const textEmptyCart = document.querySelector(".section_information");
    textEmptyCart.innerHTML =
      "<h2>Votre panier est vide !</h2> <a href='./index.html'><button class='btnHome'>Revenir à l'accueil</button</a></td>";
    textEmptyCart.style.textAlign = "center";
    textEmptyCart.style.display = "block";
  } else {
    document.querySelector("tbody").innerHTML = html;
    totalPrice = document.querySelector(".total").textContent = "Total : " + total + ".00€";
  }
}
renderPage();

// Enlever un produit du panier
function remove(idProduct) {
      delete data[idProduct];
      localStorage.setItem("cart", JSON.stringify(data));
      renderPage();
}


/*****************************Vérification des champs formulaire***********************************/

if (total > 0) {
  // Initialistion des variables global
  let form = document.querySelector("#form");

  
  //Ecouter la modification de l'input nom
  form.lastName.addEventListener("change", function () {
    validlastName();
  });

  //Ecouter la modification de l'email
  form.email.addEventListener("change", function () {
    validEmail();
  });

  //Ecouter la modification de l'input prénom
  form.firstName.addEventListener("change", function () {
    validFirstName();
  });

  //Ecouter la modification de l'input adresse
  form.adress.addEventListener("change", function () {
    validAdress();
  });

  //Ecouter la modification de l'input ville
  form.city.addEventListener("submit", function () {
    validCity();
  });

  document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    if (
      validlastName(form.name) &&
      validFirstName(form.firstName) &&
      validEmail(form.email) &&
      validAdress(form.adress) &&
      validCity(form.adress)
    ) {
      sendData();
    }
  });
}

function validlastName() {
    //Creation de la regexp pour validation du nom
    let checklastName = /^[a-zA-ZéèêàçîïÉÈÎÏ]{2,}([-'\s][a-zA-ZéèêàçîïÉÈÎÏ]{2,})?/;
    var inputlastName = form.lastName;
    let small = inputlastName.nextElementSibling;
    //Test de l'expression regulière
    if (checklastName.test(inputlastName.value)) {
      small.innerHTML = "Nom valide";
      small.classList.remove("text-warning");
      small.classList.add("text-sucess");
      return true;
    } else {
      small.innerHTML = "Nom invalide";
      small.classList.remove("text-sucess");
      small.classList.add("text-warning");
      return false;
    }
}

//------------------Vérification de l'input Prénom-------------------/

function validFirstName() {
    //Creation de la regexp pour validation du prénom
    let checkFirstName = /^[a-zA-ZéèêàçîïÉÈÎÏ]{2,}([-'\s][a-zA-ZéèêàçîïÉÈÎÏ]{2,})?/;
    var inputFirstName = form.firstName;
    let small = inputFirstName.nextElementSibling;
    //Test de l'expression regulière
    if (checkFirstName.test(inputFirstName.value)) {
      small.innerHTML = "Prénon valide";
      small.classList.remove("text-warning");
      small.classList.add("text-sucess");
      return true;
    } else {
      small.innerHTML = "Prénom invalide";
      small.classList.remove("text-sucess");
      small.classList.add("text-warning");
      return false;
    }
}

//------------------Vérification de l'input Email-------------------/

function validEmail() {
    //Creation de la regexp pour validation email
    let checkEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}/;
    var inputMail = form.email;
    let testEmail = checkEmail.test(inputMail.value);
    let small = inputMail.nextElementSibling;
    //Test de l'expression regulière
    if (testEmail) {
      small.innerHTML = "Adresse mail valide";
      small.classList.remove("text-warning");
      small.classList.add("text-sucess");
      return true;
    } else {
      small.innerHTML = "Adresse mail non valide";
      small.classList.remove("text-sucess");
      small.classList.add("text-warning");
      return false;
    }
}

//------------------Vérification de l'input Adresse-------------------/
function validAdress() {
    //Creation de la regexp pour validation de l'adresse
    let checkAdress = /^[0-9]{0,10}[-'\s]*[a-zA-Zàâäéèêëïîôöùûüç]{2,}/;
    var inputAdress = form.adress;
    let small = inputAdress.nextElementSibling;
    //Test de l'expression regulière
    if (checkAdress.test(inputAdress.value)) {
      small.innerHTML = "Adresse valide";
      small.classList.remove("text-warning");
      small.classList.add("text-sucess");
      return true;
    } else {
      small.innerHTML = "Adresse non valide";
      small.classList.remove("text-sucess");
      small.classList.add("text-warning");
      return false;
    }
}

//------------------Vérification de l'input Ville-------------------/

function validCity() {
    //Creation de la regexp pour validation de la ville
    let checkCity = /^[1-9]{1}[0-9]{4}/;
    var inputCity = form.city;
    let small = inputCity.nextElementSibling;
    //Test de l'expression regulière
    if (checkCity.test(inputCity.value)) {
      small.innerHTML = "Ville accepté";
      small.classList.remove("text-warning");
      small.classList.add("text-sucess");
      return true;
    } else {
      small.innerHTML = "Ville incorrect";
      small.classList.remove("text-sucess");
      small.classList.add("text-warning");
      return false;
    }
}
//------------------Ecoute de la soumission du formulaire----------------/


//Création de la fonction pour la requête POST + envoi du formulaire
function sendData() {
    //Parcourir le tableau des produits
    const cart = JSON.parse(localStorage.getItem("cart"));
    const products = [];
    for (const [key, values] of Object.entries(data)){
      for (let i = 0; i < values.qty; i++) {
        products.push(key);
      }
    }


    //Création de l'objet contact + Ajout du tableau des produits
    const formContact = {
      contact: {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        email: document.querySelector("#email").value,
        address: document.querySelector("#adress").value,
        city: document.querySelector("#city").value,
      },
      products: products,
    };

    //Création des paramètres pour la requête POST
    const typeOfRequest = {
      method: "POST",
      body: JSON.stringify(formContact),
      headers: { "Content-Type": "application/json" },
    };
    
    //Lancer la requête POST
      fetch("http://localhost:3000/api/cameras/order", typeOfRequest)
      //Retour de la réponse en JSON
      .then(function(response){
        return response.json()
      })
      //Récupérer le json et l'afficher sur la page de confirmation
      .then(function(json){
        window.location.href = `../html/confirm.html?price=${total + ",00 €"}&id=${json.orderId}`;
      })
      .catch(function(error){
        alert(error);
      })
}


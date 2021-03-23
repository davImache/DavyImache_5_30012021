(function confirm(){
    //Récupérer les paramètres pour le prix et l'id
    const params = new URLSearchParams(window.location.search);

    //Afficher la prix de la commande
    const priceOrder = document.getElementById("priceOrder");
    priceOrder.textContent += params.get('price');

    //Afficher le numéro de la commande
    const numberOrder = document.getElementById("orderNumber");
    numberOrder.textContent += params.get("id");
})()
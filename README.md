                  Projet 5 : Construisez un site e-commerce (Projet d'OpenClassRooms)
                                               

Architecture générale :
                                                               
-L’application web sera composée de 4 pages

-une page de vue sous forme de liste, montrant tous les articles disponibles
à la vente ;

-une page “produit”, qui affiche de manière dynamique l'élément
sélectionné par l'utilisateur et lui permet de personnaliser le produit et de
l'ajouter à son panier ;

-une page “panier” contenant un résumé des produits dans le panier, le prix
total et un formulaire permettant de passer une commande. Les données
du formulaire doivent être correctes et bien formatées avant d'être
renvoyées au back-end. Par exemple, pas de texte dans les champs date ;

-une page de confirmation de commande, remerciant l'utilisateur pour sa
commande, et indiquant le prix total et l'identifiant de commande envoyé
par le serveur.



Technologies utilisées :
                                                                                  
-HTML, CSS, JavaScript.
-Faire appel à une API.



Informations complémentaires :                                                              
                                     
-Pour le MVP, la personnalisation du produit ne sera pas fonctionnelle : la page
contenant un seul article aura un menu déroulant permettant à l'utilisateur de choisir
une option de personnalisation, mais celle-ci ne sera ni envoyée au serveur
ni reflétée dans la réponse du serveur.

-Concernant l’API, des promesses devront être utilisées pour éviter les rappels.
Les inputs des utilisateurs doivent être validés avant l’envoi à l’API.

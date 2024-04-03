# Automatisation de test pour le site Eco bliss
## Contexte : 
Eco Bliss Bath sort sa première version de site en ligne de vente de produits de beauté écoresponsables dont le produit principal est un savon solide.

## Objectif : 
L’objectif est de mettre en place des tests automatisés permettant de valider les appels APIs, les fonctionnalités de base du site ainsi que les fonctionnalités avancées. Ainsi l’objectif est de vérifier que les fonctions répondent aux exigences fonctionnelles

## Prérequis 
Installation de : 
- cypress
- docker
- npm 

## Installation 
- Cloner le dépôt : git clone https://github.com/hleysegui/P10.git 
- Lancer docker avec la commande : docker-compose up 
Puis accéder au site via l'url : [text](http://localhost:8080/#/)
- Lancer la commande : npx cypress open pour ouvrir cypress
    - Cliquer sur E2E 
    - Sélectionner votre navigateur
Le navigateur va s'ouvrir avec l'ensemble des tests éffectués. lancer le test de votre choix et visualiser le résultat du test

## Documentation API 
Accéder à la documentation de l'api via l'url : [text](http://localhost:8081/api/doc)

## Test réalisés 

Smoke tests : 
- vérifiez la présence des champs et boutons de connexion 
- vérifiez la présence des boutons d’ajout au panier quand vous êtes connecté 
- vérifiez la présence du champ de disponibilité du produit

Test API : 
GET
- Requête sur l’accès au panier d’un utilisateur avant connexion pour vérifier que je reçois une erreur. 
http://localhost:8081/orders qui renvoie 2 types d’erreurs 401 si l’utilisateur essaye d’accéder au panier en n’étant pas connecté. Et 403 si l’utilisateur connecté essaye d’accéder au panier mais qu’il ne dispose pas des droits suffisants pour y accéder.

- Requête sur la liste des produits contenus dans un panier, accessible une fois connecté
http://localhost:8081/orders qui renvoie la liste des produits contenus dans le panier

- Requête d’une fiche produit spécifique en fonction de l’id du produit
http://localhost:8081/products/{id} doit retourner la fiche du produit, l’id du produit doit être spécifier et renvoie un status 200

POST
- Requête sur la connexion d’un utilisateur existant en base de données 
http://localhost:8081/login doit retourner un status 200. Les données suivantes peuvent être utilisés pour la réussite du test : 
username : “test2@test.fr”
password: “testtest”

- Requête sur la connexion d’un utilisateur n’existant pas en base de données
http://localhost:8081/login doit retourner une erreur 401. Les données de votre choix peuvent être utilisé pour la réalisation du test 

- Ajouter un produit disponible au panier
http://localhost:8081/orders/add doit retourner un status 201 si le produit à bien été ajouter au panier. 

- Ajouter un produit en rupture de stock 
http://localhost:8081/orders/add doit retourner une erreur 403 car il n’est possible d’accéder à la ressources. Le produit étant en rupture de stock 

- Ajouter un avis 
http://localhost:8081/reviews doit retourner une réponse 201 si l’avis à bien été ajouter en base de données

Test fonction : 

- Connexion
- Pannier (Ajout de prdouit, verififcation des stocks, limite)

## Résultat des tests 
Sur l'ensemble des tests 7 anomalies ont été détecté 
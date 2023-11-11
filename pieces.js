import { ajoutListenersAvis, ajoutListenerEnvoyerAvis } from "./avis.js";

// Récupération des pièces éventuellement stockées dans le localStorage
let pieces = window.localStorage.getItem("pieces");

if (pieces === null) {
  // Récupération des pièces depuis le fichier JSON
  const reponse = await fetch("http://localhost:8081/pieces/");
   pieces = await reponse.json();

  // Transformation des pièces en JSON
  const valeurPieces = JSON.stringify(pieces);
  // Stockage des informations dans le localStorage
  window.localStorage.setItem("pieces", valeurPieces);
} else {
  pieces = JSON.parse(pieces);
}


//appel de la function
ajoutListenerEnvoyerAvis();

// Sélectionnez la section une seule fois
const sectionFiches = document.querySelector(".fiches");

//function qui génère toute la page web
function genererPieces(pieces) {
  for (let i = 0; i < pieces.length; i++) {
    const article = pieces[i];
    // Créez un template JavaScript
    const template = document.createElement("template");
    template.innerHTML = `
    <article class="produit">
      <img src="${article.image}">
      <h2>${article.nom}</h2>
      <p class="prix">Prix: ${article.prix} €</p>
      <p class="categorie">${article.categorie ?? "(aucune catégorie)"}</p>
      <p class="description">${
        article.description ?? "Pas de description pour le moment."
      }</p>
      <p class="disponibilite">${
        article.disponibilite ? "En stock" : "Rupture de stock"
      }</p>

      <button class="afficher-avis" data-id="${
        article.id
      }">Afficher les avis</button>


    </article>`;

    // Cloner le contenu du template
    const clone = document.importNode(template.content, true);

    // Ajoutez le contenu cloné au DOM
    sectionFiches.appendChild(clone);
  } // Ajout de la fonction ajoutListenersAvis

  ajoutListenersAvis();
}

genererPieces(pieces);

const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
     });
     document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

//Correction Exercice
const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
     });
     document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
});

const boutonNoDescription = document.querySelector(".btn-nodesc");

boutonNoDescription.addEventListener("click", function () {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
});

const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1);
    }
}
console.log(noms)
//Création de l'en-tête

const pElement = document.createElement('p')
pElement.innerText = "Pièces abordables";
//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement);
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
    .appendChild(pElement)
    .appendChild(abordablesElements);

const nomsDisponibles = pieces.map(piece => piece.nom)
const prixDisponibles = pieces.map(piece => piece.prix)

for(let i = pieces.length -1 ; i >= 0; i--){
    if(pieces[i].disponibilite === false){
        nomsDisponibles.splice(i,1);
        prixDisponibles.splice(i,1);
    }
}

const disponiblesElement = document.createElement('ul');

for(let i=0 ; i < nomsDisponibles.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`
    disponiblesElement.appendChild(nomElement);
}

const pElementDisponible = document.createElement('p')
pElementDisponible.innerText = "Pièces disponibles:";
document.querySelector('.disponibles').appendChild(pElementDisponible).appendChild(disponiblesElement)

const inputPrixMax = document.querySelector('#prix-max')
inputPrixMax.addEventListener('input', function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);  
})

// Ajout du listener pour mettre à jour des données du localStorage
const boutonMettreAJour = document.querySelector(".btn-maj");
boutonMettreAJour.addEventListener("click", function () {
   window.localStorage.removeItem("pieces");
});
import { ajoutListenersAvis, ajoutListenerEnvoyerAvis } from "./avis.js";

// Récupération des pièces éventuellement stockées dans le localStorage
const pieces = window.localStorage.getItem("pieces");

if (pieces === null) {
  // Récupération des pièces depuis le fichier JSON
  const reponse = await fetch("http://localhost:8081/pieces/");
  const pieces = await reponse.json();

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

// Premier affichage de la page
genererPieces(pieces);

// ///////////////////////Produit Abordable///////////////////////////


//Ajout du listerner pour trier les pièces par ordre de prix croissant
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
  const piecesOrdonnees = Array.from(pieces);
  piecesOrdonnees.sort(function (a, b) {
    return a.prix - b.prix;
  });
  // Effacement de l'écran et regénération de la page
  sectionFiches.innerHTML = "";
  genererPieces(piecesOrdonnees);
});

//Ajout du listerner pour bouton filter pieces non abordoble
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
  const piecesFiltrees = pieces.filter(function (piece) {
    return piece.prix <= 35;
  });

  sectionFiches.innerHTML = "";
  genererPieces(piecesFiltrees);
});

//pièce ordonné
const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
  const piecesOrdonnees = Array.from(pieces);
  piecesOrdonnees.sort(function (a, b) {
    return b.prix - a.prix;
  });
  sectionFiches.innerHTML = "";
  genererPieces(piecesOrdonnees);
});

//bouton filter no description
const btnNoDescription = document.querySelector(".btn-nodesc");
btnNoDescription.addEventListener("click", function () {
  const noDesc = pieces.filter(function (el) {
    return !el.description;
  });
  sectionFiches.innerHTML = "";
  genererPieces(noDesc);
});

const inputPrixMax = document.querySelector("#prix-max");
inputPrixMax.addEventListener("input", function () {
  const piecesFiltrees = pieces.filter(function (piece) {
    return piece.prix <= inputPrixMax.value;
  });
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrees);
});

// Ajout du listener pour mettre à jour des données du localStorage
const boutonMettreAJour = document.querySelector(".btn-maj");
boutonMettreAJour.addEventListener("click", function () {
   window.localStorage.removeItem("pieces");
});
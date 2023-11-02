// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

// Sélectionnez la section une seule fois
const sectionFiches = document.querySelector(".fiches");

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
    </article>`;

  // Cloner le contenu du template
  const clone = document.importNode(template.content, true);

  // Ajoutez le contenu cloné au DOM
  sectionFiches.appendChild(clone);
}

//bouton trier
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
  pieces.sort(function (a, b) {
    return a.prix - b.prix;
  });
  console.log(pieces);
});

//bouton filter pieces non abordoble
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
  const piecesFiltrees = pieces.filter(function (piece) {
    return piece.prix <= 35;
  });
  console.log(piecesFiltrees);
});

//pièce ordonné
const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
  const piecesOrdonnees = Array.from(pieces);
  piecesOrdonnees.sort(function (a, b) {
    return b.prix - a.prix;
  });
  console.log(piecesOrdonnees);
});

//bouton filter no description
const btnNoDescription = document.querySelector(".btn-nodesc");
btnNoDescription.addEventListener("click", function () {
  const noDesc = pieces.filter(function (el) {
    return !el.description;
  });
  console.log(piecesFiltrees);
});

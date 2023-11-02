// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

const article = pieces[0];

// Utilisation de templates JavaScript
const template = document.createElement('template');
template.innerHTML = `
  <img src="${article.image}">
  <h2>${article.nom}</h2>
  <p>Prix: ${article.prix} €</p>
  <p>${article.categorie ?? "(aucune catégorie)"}</p>
  <p>${article.description ?? "(aucune description)"}</p>
  <p>${article.disponibilite=true ? "En stock" : "Rupture de stock"} <p/>`;

// Sélectionnez la section une seule fois
const sectionFiches = document.querySelector(".fiches");

// Ajoutez le contenu du template au DOM
sectionFiches.appendChild(template.content);

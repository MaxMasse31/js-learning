export function ajoutListenersAvis() {
  const piecesElements = document.querySelectorAll(".fiches article button");

  for (let i = 0; i < piecesElements.length; i++) {
    piecesElements[i].addEventListener("click", async function (event) {
      const id = event.target.dataset.id;

    //   on stock la réponse de l'API dans une constante 
     const response= await fetch(`http://localhost:8081/pieces/${id}/avis`);
    });
  }
}

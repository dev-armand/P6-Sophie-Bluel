

// Function to check if the user is logged in
function isConnected() {
  return sessionStorage.getItem('userId') !== null;
}

document.addEventListener('DOMContentLoaded', () => {
  if (isConnected()) {
    // Add the HTML content (mode édition - publier les changements)
    const header = document.querySelector("header");
    const htmlContent = `
      <div class="edition">
        <img src="./assets/icons/Vector.png" alt="vector modification">
        <p>Mode édition</p>
        <button class="edition-btn">publier les changements</button>
      </div>
    `;
    header.insertAdjacentHTML("afterbegin", htmlContent);

    // Add the class "header" to the header element
    header.classList.add("header");

    // Remove the "projects-filtres" div
    const projectsFiltres = document.querySelector(".projects-filtres");
    if (projectsFiltres) {
      projectsFiltres.remove();
    }

    // Remove h2 (Mes Projet)
    const mesProjetsH2 = document.querySelector(".mes-projets-title");
    if (mesProjetsH2){
      mesProjetsH2.remove();
    }

    // Add the HTML content (modifier) after "introduction"
    const introduction = document.querySelector("#introduction");
    if (introduction) {
      const modifierContent = `
        <div class="modifier">
          <img class="modifier-vector" src="./assets/icons/Vector.png" alt="vector modification">
          <button class="modifier-btn modifier-btn1">modifier</button>
        </div>
      `;
      introduction.insertAdjacentHTML("afterend", modifierContent);
    }

    // Add the HTML content (Mes Projets - modifier) after "portfolio"
    const portfolio = document.querySelector("#portfolio");
    if (portfolio) {
      const projectsModifierContent = `
        <div class="projects-modifier">
          <h2>Mes Projets</h2>
          <div class="modifier modifier2">
            <img class="modifier-vector" src="./assets/icons/Vector.png" alt="vector modification">
            <button class="modifier-btn modifier-btn2" onclick="openModal()">modifier</button>
          </div>
        </div>
      `;
      portfolio.insertAdjacentHTML("afterbegin", projectsModifierContent);
    }

    // Add the HTML content (Modal) after "portfolio"
    if (portfolio) {
      const modalContent = `<div id="modal" class="modal" >
      <div class="galerie-photo-box">
        
      <div class="galerie-photo">
        <img class="galerie-photo-vector vectorx" src="./assets/icons/xmark.png" alt="X">
        <h2>Galerie photo</h2>
        <div class="galerie-photo-container">
          <figure class="galerie-photo-fig">
            <img class="galerie-photo-img" src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
            <figcaption>éditer</figcaption>
            <img class="galerie-photo-vector vector1" src="./assets/icons/Group 10.png" alt="icone poubelle">
            <img class="galerie-photo-vector vector2" src="./assets/icons/Move.png" alt="icone mouvement">
          </figure>
          <figure class="galerie-photo-fig">
            <img class="galerie-photo-img" src="assets/images/appartement-paris-v.png" alt="Appartement Paris V">
            <figcaption>éditer</figcaption>
            <img class="galerie-photo-vector vector1" src="./assets/icons/Group 10.png" alt="icone poubelle">
          </figure>
          <figure class="galerie-photo-fig">
            <img class="galerie-photo-img" src="assets/images/restaurant-sushisen-londres.png" alt="Restaurant Sushisen - Londres">
            <figcaption>éditer</figcaption>
            <img class="galerie-photo-vector vector1" src="./assets/icons/Group 10.png" alt="icone poubelle">
          </figure>
          <figure class="galerie-photo-fig">
            <img class="galerie-photo-img" src="assets/images/la-balisiere.png" alt="Villa “La Balisiere” - Port Louis">
            <figcaption>éditer</figcaption>
            <img class="galerie-photo-vector vector1" src="./assets/icons/Group 10.png" alt="icone poubelle">
          </figure>
          <figure class="galerie-photo-fig">
            <img class="galerie-photo-img" src="assets/images/structures-thermopolis.png" alt="Structures Thermopolis">
            <figcaption>éditer</figcaption>
            <img class="galerie-photo-vector vector1" src="./assets/icons/Group 10.png" alt="icone poubelle">
          </figure>
          <figure class="galerie-photo-fig">
            <img class="galerie-photo-img" src="assets/images/appartement-paris-x.png" alt="Appartement Paris X">
            <figcaption>éditer</figcaption>
            <img class="galerie-photo-vector vector1" src="./assets/icons/Group 10.png" alt="icone poubelle">
          </figure>
          <figure class="galerie-photo-fig">
            <img class="galerie-photo-img" src="assets/images/le-coteau-cassis.png" alt="Pavillon “Le coteau” - Cassis">
            <figcaption>éditer</figcaption>
            <img class="galerie-photo-vector vector1" src="./assets/icons/Group 10.png" alt="icone poubelle">
          </figure>
          <figure class="galerie-photo-fig">
            <img class="galerie-photo-img" src="assets/images/villa-ferneze.png" alt="Villa Ferneze - Isola d’Elba">
            <figcaption>éditer</figcaption>
            <img class="galerie-photo-vector vector1" src="./assets/icons/Group 10.png" alt="icone poubelle">
          </figure>
          <figure class="galerie-photo-fig">
            <img class="galerie-photo-img" src="assets/images/appartement-paris-xviii.png" alt="Appartement Paris XVIII">
            <figcaption>éditer</figcaption>
            <img class="galerie-photo-vector vector1" src="./assets/icons/Group 10.png" alt="icone poubelle">
          </figure>
          <figure class="galerie-photo-fig">
            <img class="galerie-photo-img" src="assets/images/bar-lullaby-paris.png" alt="Bar “Lullaby” - Paris">
            <figcaption>éditer</figcaption>
            <img class="galerie-photo-vector vector1" src="./assets/icons/Group 10.png" alt="icone poubelle">
          </figure>
          <figure class="galerie-photo-fig">
            <img class="galerie-photo-img" src="assets/images/hotel-first-arte-new-delhi.png" alt="Hotel First Arte - New Delhi">
            <figcaption>éditer</figcaption>
            <img class="galerie-photo-vector vector1" src="./assets/icons/Group 10.png" alt="icone poubelle">
          </figure>
        </div>
        <img class="line-img" src="./assets/icons/Line 1.png" alt="image d'une ligne">
        <form class="add-picture" action="#">
          <input class="connecter add-picture-btn" type="submit" value="Ajouter une photo">
          <input class="delete" type="text" value="Supprimer la galerie">
        </form>
      </div>
      </div>
  
    </div>`;
    portfolio.insertAdjacentHTML("afterend", modalContent);
    }
  }
});




function updateMenu() {
  const menu = document.querySelector("#menu");
  const loginLink = menu.querySelector("#loginLink");
  const logoutLink = menu.querySelector("#logoutLink");

  if (isConnected()) {
    // User is logged in, show the "logout" link and hide the "login" link
    loginLink.classList.add("non-visible");
    logoutLink.classList.remove("non-visible");
  } else {
    // User is not logged in, show the "login" link and hide the "logout" link
    loginLink.classList.remove("non-visible");
    logoutLink.classList.add("non-visible");
  }
}

// Call the function when the page loads 
updateMenu();

// Logout function
function logout() {
  // Clear the userId from sessionStorage
  sessionStorage.removeItem("userId");

  // Redirect the user to the index page after logout
  window.location.href = "index.html";
}

// Add an event listener to the logout link
const logoutLink = document.querySelector("#logoutLink");
logoutLink.addEventListener("click", logout);
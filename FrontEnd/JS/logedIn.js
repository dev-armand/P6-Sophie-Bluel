// Function to check if the user connected
function isConnected(){
  if (sessionStorage.getItem('token')){
    return true;
  } 
  return false;
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
          <h2 id="projets">Mes Projets</h2>
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
      <div class="galerie-photo galerie-photo1">
        <img class="galerie-photo-vector close" src="./assets/icons/xmark.png" alt="X">
        <h2>Galerie photo</h2>
        <div class="galerie-photo-container">
        </div>
        <img class="line-img" src="./assets/icons/Line 1.png" alt="image d'une ligne">
        <form class="add-picture" action="#">
          <input class="connecter add-picture-btn" type="submit" value="Ajouter une photo">
          <input class="delete" type="button" value="Supprimer la galerie">
        </form>
      </div>
      <div  class="galerie-photo galerie-photo2 display-none">
        <img class="galerie-photo-vector close" src="./assets/icons/xmark.png" alt="icone image">
        <img class="galerie-photo-vector vector-left-arrow" src="./assets/icons/arrow-left.png" alt="arrow icon">
        <h2>Ajout photo</h2>
        
        <div class="ajouter-photos">
        <label for="getFile">
          <div id="image-container" class="image-container">
            <img class="selected-img" id="selectedImage" src="./assets/icons/picture-svgrepo-com1.png" alt="X">
          </div>
        </label>
        <button class="ajouter-photo-btn remove" onclick="document.getElementById('getFile').click()">+Ajouter photo</button>
        <input type="file" id="getFile" style="display:none;" accept="image/*" onchange="handleImageSelect(event)">
        <p class="text">jpg.png: 4mo max </p>
        </div>
        <div class="titre">
          <h3>Titre</h3>
          <input class="titre-placeholder" type="text" placeholder="">
        </div>
        <div  class="categorie">
          <h3>Catégorie</h3>
          <select class="categorie-placeholder" id="categorySelect">
            <option>
            </option>
          </select>
        </div>
        <img class="line-img" src="./assets/icons/Line 1.png" alt="image d'une ligne">
        <form class="validate-picture" >
        <button class="valider-picture-btn" type="button">Valider</button>
        </form>
      </div>
      </div>
    </div>`;
    portfolio.insertAdjacentHTML("afterend", modalContent);
    }
  }
});

// function to show login or logout depending on the status
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
  // Clear the token from sessionStorage
  sessionStorage.removeItem("token");

  // Redirect the user to the index page after logout
  window.location.href = "index.html";
}

// Add an event listener to the logout link
const logoutLink = document.querySelector("#logoutLink");
logoutLink.addEventListener("click", logout);
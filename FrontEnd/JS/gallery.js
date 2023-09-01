document.addEventListener("DOMContentLoaded", () => {
  fetchImagesAndUpdateGallery();
});

//**************************************************** */ Function to fetch all images from the API and update the gallery images
 async function fetchImagesAndUpdateGallery() {
  const apiUrl = `${urlApi}/works`;
  const galleryImagesContainer = document.querySelector(".gallery");

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const imageUrls = data.map(item => item.imageUrl);
    const category = data.map(item => item.category);
    const title = data.map(item => item.title);
    console.log('add images to the gallery', category);
    
    // Create figure elements with images and add them to the gallery container
    imageUrls.forEach((imageUrl, index) => {
      const figureElement = document.createElement("figure");
      figureElement.dataset.img = (index + 1).toString();
      figureElement.classList.add("all");
      if (data[index].categoryId === 1) {
        figureElement.classList.add("objets");
      } else if (data[index].categoryId === 2) {
        figureElement.classList.add("appartements");
      } else if (data[index].categoryId === 3) {
        figureElement.classList.add("hotels-restaurants");
      } 
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;

      const figcaptionElement = document.createElement("figcaption");
      figcaptionElement.textContent = title[index];
      
      figureElement.appendChild(imgElement);
      figureElement.appendChild(figcaptionElement);
      galleryImagesContainer.appendChild(figureElement);
    });

      console.log("Images updated in the gallery.");
    } catch (error) {
      console.error('Error fetching images:', error);
  }
}

//**************************************************** */  Management of "Mes Projets" for the gallery

// Function to show/hide figures based on their class
function showFiguresByClass(className) {
  const figures = document.querySelectorAll(".gallery figure");
  figures.forEach(figure => {
    if (className === "all" || figure.classList.contains(className)) {
      figure.style.display = "block";
    } else {
      figure.style.display = "none";
    }
  });
}

// Event listener for the filter buttons ("Tous","Objets", "Appartements", "Hôtels & Restaurants")
document.querySelector(".projects-filtres").addEventListener("click", event => {
  const target = event.target;
  if (target.classList.contains("projects-btn")) {
    const filterClass = target.dataset.filter;
    showFiguresByClass(filterClass);
  }
});


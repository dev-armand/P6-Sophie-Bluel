const urlApi = "http://localhost:5678/api";
const body = document.body;

// Function to show the modal
function openModal() {
  modal = document.querySelector("#modal"); 
  modal.classList.add("visible");
  body.classList.add("overflow-hidden"); 
}

// Function to close the modal
function closeModalHandler() {
  modal.classList.remove("visible");
  body.classList.remove("overflow-hidden");
}

// Attach event listener to close the modal
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('close')) {
    closeModalHandler();
  }
});

// Attach event listener to acces the 2nd page or go back to the 1st page
document.addEventListener('DOMContentLoaded', function() {
  const galeriePhoto2 = document.querySelector('.galerie-photo2');
  const addPicture = document.querySelector('.add-picture-btn');
  const leftArrow = document.querySelector('.vector-left-arrow');
  // Access second page of the modal
  addPicture.onclick = function() {
    galeriePhoto2.classList.remove('display-none');
  };
  // Go back to the first page of the modal
  leftArrow.onclick = function() {
    galeriePhoto2.classList.add('display-none');
  };
  // Load token from session storage
  const token = sessionStorage.getItem("token");
  fetchImagesAndUpdateModal(token);
});

//**************************************************** */ Function to fetch images from the API and update the modal images
async function fetchImagesAndUpdateModal(token) {
  console.log("Received token in fetchImagesAndUpdateModal", token);
  const apiUrl = `${urlApi}/works`;
  const modalImagesContainer = document.querySelector(".galerie-photo-container");

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const imageUrls = data.map(item => item.imageUrl);
    const ids = data.map(item => item.id);
    const category = data.map(item => item.category);
    console.log('add imaged to the modal', category);
    
    // Create figure elements with images and add them to the modal container
    imageUrls.forEach((imageUrl, index) => {
      const figureElement = document.createElement("figure");
      figureElement.classList.add("galerie-photo-fig");
      figureElement.dataset.img = (index + 1).toString();

      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      imgElement.classList.add("galerie-photo-img");

      const figcaptionElement = document.createElement("figcaption");
      figcaptionElement.textContent = "éditer";

      const binIconElement = document.createElement("img");
      binIconElement.src = "./assets/icons/Group 10.png";
      binIconElement.alt = "icone poubelle";
      binIconElement.classList.add("galerie-photo-vector", "binIcon");

      // Add the img, figcaption, and binIcon elements to the figure element
      figureElement.appendChild(imgElement);
      figureElement.appendChild(figcaptionElement);
      figureElement.appendChild(binIconElement);

      // Add the figure element to the modal container
      modalImagesContainer.appendChild(figureElement);
    });

      console.log("Images updated in the modal.");
    } catch (error) {
      console.error('Error fetching images:', error);
  }

    // Function to get image IDs from URL
  async function getImageIdFromImageUrl() {
    const apiUrl = `${urlApi}/works`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const imageIds = data.map(item => item.imageId);
      return imageIds;
    } catch (error) {
      console.error('Error:', error);
      return []; 
    }
    }

  //******************************************** */ Delete images in the modal
  const binIconElements = document.querySelectorAll(".galerie-photo-vector.binIcon");
  binIconElements.forEach(binIconElement => {
    binIconElement.addEventListener("click", async () => {
      const figureElement = binIconElement.closest(".galerie-photo-fig");
      if (figureElement) {
        const imgElement = figureElement.querySelector(".galerie-photo-img");
        const dataImgValue = figureElement.dataset.img;
  
        if (token) {
          try {
            const apiUrl = `${urlApi}/works/${getImageIdFromImageUrl(imgElement.src)}`;
            const response = await fetch(apiUrl, {
              method: "DELETE",
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
  
            if (!response.ok) {
              throw new Error('Failed to delete image');
            }
  
            // Remove all elements with the same data-img value
            const elementsWithSameDataImg = document.querySelectorAll(`[data-img="${dataImgValue}"]`);
            elementsWithSameDataImg.forEach(element => {
              element.remove();
            });
  
            console.log(`All elements with data-img="${dataImgValue}" deleted.`);
          } catch (error) {
            console.error('Error deleting image:', error);
          }
        } else {
          console.error("Image ID not found.");
        }
      } else {
        console.error("Parent figure element not found.");
      }
    });
  });

  //******************************************** */ Delete all images with "supprimer la galerie"
  const deleteButton = document.querySelector(".delete");
  deleteButton.addEventListener("click", async () => {
    const figureElements = document.querySelectorAll('figure');
    const deletedDataImgValues = [];

    // Get the gallery container
    const galleryContainer = document.querySelector('.gallery');

    if (figureElements.length > 0) {
      if (token) {
        try {
          // Loop through each figure element
          for (const figureElement of figureElements) {
            // Check if the figure element has the data-img attribute
            const dataImgValue = figureElement.dataset.img;
            if (!dataImgValue) {
              console.log("Skipping figure element without data-img attribute.");
              continue;
            }

            const imgElement = figureElement.querySelector(".galerie-photo-img");
            if (!imgElement) {
              continue;
            }

            const apiUrl = `${urlApi}/works/${getImageIdFromImageUrl(imgElement.src)}`;
            const response = await fetch(apiUrl, {
              method: "DELETE",
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });

            if (!response.ok) {
              throw new Error('Failed to delete image');
            }

            // Add the data-img value to the list of deleted values
            deletedDataImgValues.push(dataImgValue);

            // Remove the current figure element from the modal
            figureElement.remove();

            console.log(`Element with data-img="${dataImgValue}" deleted.`);
          }

          // Remove all figure elements from the gallery container
          const galleryFigureElements = galleryContainer.querySelectorAll('figure');
          galleryFigureElements.forEach((figureElement) => {
            figureElement.remove();
          });

          console.log("All elements with data-img deleted from the modal and the gallery.");
        } catch (error) {
          console.error('Error deleting image:', error);
        }
      } else {
        console.error("Image ID not found.");
      }
    } else {
      console.error("No figure elements found.");
    }
  });
}

// Function to show the selected image file
function handleImageSelect(event) {
  const selectedImage = document.getElementById('selectedImage');
  const file = event.target.files[0]; // Get the selected file;
  const textElement = document.querySelector('.text');
  const addButton = document.querySelector('.ajouter-photo-btn');

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      selectedImage.src = e.target.result; // Set the chosen image as the src of the <img> element
      textElement.style.display = 'none'; 
      addButton.style.display = 'none'; 

      // resize the image
      selectedImage.classList.add('selected-img2');
    };

    reader.readAsDataURL(file); // Read the selected file as data URL
  }
}

//*************************************************** Function to fetch category options from the API: "Objes, Appartements, Hôtels & Restaurant"
document.addEventListener('DOMContentLoaded', addOption);
async function addOption() {
    // Fetch the data from the API
    const apiUrl = `${urlApi}/works`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
    
      // Get the select element
      const categorySelect = document.getElementById('categorySelect');
  
      // Create an array to store unique category names
      const uniqueCategories = [];
  
      // Iterate through the data and collect unique category names
      data.forEach(item => {
        const categoryName = item.category.name;
        if (!uniqueCategories.includes(categoryName)) {
          uniqueCategories.push(categoryName);
        } 
      });

      // Add the unique category names as options in the select element
      uniqueCategories.forEach(categoryName => {
        const option = document.createElement('option');
        option.value = categoryName;
        option.textContent = categoryName;
        categorySelect.appendChild(option);
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
}

//*************************************************** */  Add event listener to: Change button color, add img to the modal and gallery, reset modal to normal
document.addEventListener('DOMContentLoaded', function() {
  const selectedImage = document.getElementById('selectedImage');
  const titreInput = document.querySelector('.titre-placeholder');
  const categorieInput = document.querySelector('.categorie-placeholder');

   //*************************************************** */ Function to change color of the button "Valider"
   function checkFormFields() {
    const validerBtn = document.querySelector('.valider-picture-btn');
  if (selectedImage.src && titreInput.value.trim() !== "" && categorieInput.value !== "") {
      validerBtn.classList.add('green-color');
  } else {
      validerBtn.classList.remove('green-color');
  }
  }
    
  // Add event listeners for input changes
  selectedImage.addEventListener('load', checkFormFields);
  titreInput.addEventListener('input', checkFormFields);
  categorieInput.addEventListener('change', checkFormFields);
  
  //*************************************************** */ Function to add the new image to the gallery
  async function createNewGalleryItem(token) {
    console.log("Received token in createNewGalleryItem:", token);
    
    const selectedImageFile = document.getElementById('getFile').files[0];
    const titreInput = document.querySelector('.titre-placeholder');
    const categorieInput = document.querySelector('.categorie-placeholder');
    const gallery = document.querySelector('.gallery');

    const formData = new FormData();

    formData.append("title", titreInput.value);
    formData.append("image", selectedImageFile); // Append the image file, not the HTML element
    formData.append("category", categorieInput.value);

    console.log(formData.get('title'));
    console.log(formData.get('category'));
    console.log(formData.get('image'));

    console.log("Received token for Authorization:", token);
    try {
      const response = await fetch(`${urlApi}/works`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      
      if (response.ok) {
        const responseData = await response.json();
        console.log("responseData", responseData);

        // Create new elements and append them to the gallery
        const newFigure = document.createElement('figure');
        const newImage = document.createElement('img');
        const newFigCaption = document.createElement('figcaption');

        newFigure.className = categorieInput.value;
        newImage.src = URL.createObjectURL(selectedImageFile);
        newFigCaption.textContent = titreInput.value;

        newFigure.appendChild(newImage);
        newFigure.appendChild(newFigCaption);
        gallery.appendChild(newFigure);

        closeModalHandler();

        // Add the image to the modal
        addImageToModal(newImage);

      } else {
        console.error('Failed to add the image to the server.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  //*************************************************** */ function to add the new image to the modal
  function addImageToModal(src) {
    const modalImagesContainer = document.querySelector('.galerie-photo-container'); // Update the selector accordingly
    let imageIndex = [figureElement.dataset.img.length -1];
    const figureElement = document.createElement("figure");
    figureElement.classList.add("galerie-photo-fig");
    figureElement.dataset.img = (imageIndex + 1).toString();

    const imgElement = document.createElement("img");
    imgElement.classList.add("galerie-photo-img");

    // Set the src of the imgElement to the passed src
    imgElement.src = src;

    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.textContent = "éditer";

    const binIconElement = document.createElement("img");
    binIconElement.src = "./assets/icons/Group 10.png";
    binIconElement.alt = "icone poubelle";
    binIconElement.classList.add("galerie-photo-vector", "binIcon");

    // Add the img, figcaption, and binIcon elements to the figure element
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);
    figureElement.appendChild(binIconElement);

    // Add the figure element to the modal container
    modalImagesContainer.appendChild(figureElement);
    
    imageIndex++; // Increment the index for the next image
  }

  // *************************************************** */ Reset the modal to normal
  const validerBtn = document.querySelector('.valider-picture-btn');
  const textElement = document.querySelector('.text');
  const addButton = document.querySelector('.ajouter-photo-btn');

  // Store the original source of the placeholder image
  const originalImageSrc = './assets/icons/picture-svgrepo-com1.png';
  const originalImageClass = 'selected-img';

  validerBtn.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent form submission

      // Attach click event to the "Valider" button
      if (!selectedImage.src || !titreInput.value.trim() || !categorieInput.value) {
        alert('Merci de remplire les champs vides.');
      } else {
        createNewGalleryItem();
      }
      const galeriePhoto2 = document.querySelector('.galerie-photo2');
      galeriePhoto2.classList.add('display-none');

      // Reset the selectedImage source to the original placeholder image
      selectedImage.src = originalImageSrc;
      selectedImage.className = originalImageClass;

      // Clear other inputs and reset button color
      titreInput.value = "";
      categorieInput.value = "";
      validerBtn.classList.remove('green-color');

      // Show the "ajouter photos" div back to normal
      textElement.style.display = 'block'; 
      addButton.style.display = 'block';
  });
});
const objets = document.querySelector(".objets");
const appartements = document.querySelector(".appartements");
const hotelRestaurant = document.querySelector(".hotel-restaurants");

// Function to show images
function showFiguresByClass(className) {
  const figures = document.querySelectorAll(".gallery figure");
  figures.forEach(figure => {
    if (figure.classList.contains(className)) {
      figure.style.display = "block";
    } else {
      figure.style.display = "none";
    }
  });
}

// Event listeners for the buttons
document.querySelector(".projects-filtres").addEventListener("click", event => {
  const target = event.target;
  if (target.classList.contains("projects-btn")) {
    const filterClass = target.dataset.filter;
    if (filterClass === "all") {
      figures.forEach(figure => {
        figure.style.display = originalDisplay[figure.src];
      });
    } else {
      showFiguresByClass(filterClass);
    }
  }
});

// Button "Tous"
const figures = document.querySelectorAll(".gallery figure");
const originalDisplay = {};
figures.forEach(figure => {
  originalDisplay[figure.src] = figure.style.display;
});

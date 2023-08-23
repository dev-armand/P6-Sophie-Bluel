// ************************ Management of "Mes Projets" for the gallery

// Event listener for the filter buttons ("Tous","Objets", "Appartements", "Hôtels & Restaurants")
document.querySelector(".projects-filtres").addEventListener("click", event => {
  const target = event.target;
  if (target.classList.contains("projects-btn")) {
    const filterClass = target.dataset.filter;
    showFiguresByClass(filterClass);
  }
});

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
const modal = document.querySelector("#modal");
const openModal = document.querySelector(".modifier-btn2");
const closeModal = document.querySelector(".vectorx");

openModal.addEventListener('click', () => {
  modal.showModal();
  openModal.classList.add('galerie-photo');
});

closeModal.addEventListener('click', () => {
  modal.close();
  openModal.classList.remove('galerie-photo');
});




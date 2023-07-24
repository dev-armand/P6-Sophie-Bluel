const modal = document.querySelector("#modal");
const closeModal = document.querySelector(".vectorx");


function openModal() {
  modal.classList.add("visible");
}

closeModal.addEventListener('click',() => {
  modal.classList.remove("visible");
});


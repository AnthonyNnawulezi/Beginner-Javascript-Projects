const openModalButton = document.querySelector(".open-modal-button");
const closeModalButtons = document.querySelectorAll(".close-modal-button");
const modal = document.querySelector(".custom-modal");

function openModal() {
  modal.showModal();
}

function closeModal() {
  modal.close();
}

openModalButton.addEventListener("click", openModal);

closeModalButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

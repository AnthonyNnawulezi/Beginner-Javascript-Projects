const openModalButton = document.querySelector(".open-modal-button");
const closeModalButtons = document.querySelectorAll(".close-modal-button");
const modal = document.querySelector(".custom-modal");
const modalBackdrop = document.querySelector(".modal-backdrop");

function openModal() {
  modal.classList.add("active");
  modal.hidden = false;
  modalBackdrop.hidden = false;
}

function closeModal() {
  modal.classList.remove("active");
  modal.hidden = true;
  modalBackdrop.hidden = true;
}

openModalButton.addEventListener("click", openModal);

closeModalButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

modalBackdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

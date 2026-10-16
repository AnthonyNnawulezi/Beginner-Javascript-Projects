const openModalButton = document.querySelector(".open-modal-button");
const closeModalButtons = document.querySelectorAll(".close-modal-button");
const modal = document.querySelector(".custom-modal");
// const modalBackdrop = document.querySelector(".modal-backdrop");

function openModal() {
  modal.showModal();
}

function closeModal() {
  modal.close();
}

// modalBackdrop.addEventListener("click", closeModal); not needed since it is provided by dialog
openModalButton.addEventListener("click", openModal);

closeModalButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

modal.addEventListener("click", (event) => {
  if (event.target !== modal) return;

  const bounds = modal.getBoundingClientRect();

  const clickedOutside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;

  if (clickedOutside) {
    closeModal();
  }
});

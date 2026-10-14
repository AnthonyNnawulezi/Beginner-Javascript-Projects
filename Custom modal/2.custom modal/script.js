const openModalButton = document.querySelector(".open-modal-button");
const closeModalButtons = document.querySelectorAll(".close-modal-button");
const modal = document.querySelector(".custom-modal");

openModalButton.addEventListener("click", () => {
  modal.classList.add("active");
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.remove("active");
  });
});

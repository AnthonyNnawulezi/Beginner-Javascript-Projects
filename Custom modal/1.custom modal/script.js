const openModal = document.querySelector(".open-modal");
const closeModal = document.getElementById("close-modal");
const closebutton = document.getElementById("close");
const container = document.querySelector(".container");

openModal.addEventListener("click", () => {
  container.style.display = "block";
});

closeModal.addEventListener("click", () => {
  container.style.display = "none";
});
closebutton.addEventListener("click", () => {
  container.style.display = "none";
});

window.addEventListener("click", (event) => {
  console.log(event.target);
  if (event.target === container) {
    container.style.display = "none";
  }
});

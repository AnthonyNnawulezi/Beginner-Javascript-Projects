const openModal = document.querySelector(".open-modal");
const container = document.querySelector(".container");
const closeModal = document.querySelector(".close-modal");
const closeBtn = document.querySelector(".close-btn");

openModal.addEventListener("click", () => {
  container.style.display = "block";
});
closeModal.addEventListener("click", () => {
  container.style.display = "none";
});
closeBtn.addEventListener("click", () => {
  container.style.display = "none";
});
window.addEventListener("click", (e) => {
  //   container.style.display = "none";
  console.log(e.target);
});

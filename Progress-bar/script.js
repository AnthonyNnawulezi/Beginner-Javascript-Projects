const nextButton = document.querySelector(".previous");
const previousButton = document.querySelector(".next");
const icons = document.querySelectorAll(".icon-wrapper");

let currentStep = 1;

nextButton.addEventListener("click", () => {
  if (currentStep < icons.length) {
    currentStep++;
  }
  updateUI();
});

previousButton.addEventListener("click", () => {
  if (currentStep > 1) {
    currentStep--;
  }
  updateUI();
});

function updateUI() {
  icons.forEach((icon, i) => {
    if (i < currentStep) {
      icon.classList.toggle("active", i < currentStep);
    }
  });
}

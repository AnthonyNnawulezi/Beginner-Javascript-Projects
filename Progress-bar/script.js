const nextButton = document.querySelector(".next");
const previousButton = document.querySelector(".previous");
const icons = document.querySelectorAll(".icon-wrapper");
const progressBar = document.querySelector(".progress-bar");

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
      icon.classList.add("active");
    } else {
      icon.classList.remove("active");
    }

    const widthPercentage = (currentStep / icons.length) * 100;

    progressBar.style.width = `${widthPercentage}%`;
  });
}

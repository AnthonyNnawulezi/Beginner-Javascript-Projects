const progress = document.querySelector(".progress");
const previousButton = document.querySelector(".previous-button");
const nextButton = document.querySelector(".next-button");
const iconsWrapper = document.querySelectorAll(".icon-wrapper");

let currentSelected = 1;

nextButton.addEventListener("click", () => {
  if (currentSelected < iconsWrapper.length) {
    currentSelected++;
  }
  updateStep();
});

previousButton.addEventListener("click", () => {
  if (currentSelected > 1) {
    currentSelected--;
  }
  updateStep();
});

function updateStep() {
  iconsWrapper.forEach((icon, index) => {
    if (index < currentSelected) {
      icon.classList.add("active");
    } else {
      icon.classList.remove("active");
    }
  });

  progress.style.width =
    ((currentSelected - 1) / (iconsWrapper.length - 1)) * 100 + "%";

  if (currentSelected === 1) {
    previousButton.disabled = true;
  } else if (currentSelected === iconsWrapper.length) {
    nextButton.disabled = true;
  } else {
    previousButton.disabled = false;
    nextButton.disabled = false;
  }
}

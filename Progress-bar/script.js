const nextButton = document.querySelector(".next");
const previousButton = document.querySelector(".previous");
const steps = document.querySelectorAll(".icon-wrapper");
const progressBar = document.querySelector(".progress-bar");

// let currentStep = 1;

// nextButton.addEventListener("click", () => {
//   if (currentStep < steps.length) {
//     currentStep++;
//   }
//   updateUI();
// });

// previousButton.addEventListener("click", () => {
//   if (currentStep > 1) {
//     currentStep--;
//   }
//   updateUI();
// });

// function updateUI() {
//   steps.forEach((icon, i) => {
//     if (i < currentStep) {
//       icon.classList.add("active");
//     } else {
//       icon.classList.remove("active");
//     }
//   });
//   const widthPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

//   progressBar.style.width = `${widthPercentage}%`;
//   console.log(`Width set to: ${widthPercentage}%`);
// }

//optimised

// 2. Guard against missing elements
if (!progressBar || !previousButton || !nextButton || steps.length === 0) {
  console.warn("Steps not found – aborting.");
} else {
  // 3. State
  let currentStep = 1;
  const TOTAL_STEPS = steps.length;

  // Initialize the UI on page load to ensure proper button states
  updateUI();

  // 4. Event listeners
  previousButton.addEventListener("click", handlePreviousStep);
  nextButton.addEventListener("click", handleNextStep);

  function handleNextStep() {
    if (currentStep < steps.length) {
      currentStep++;
      updateUI();
    }
  }

  function handlePreviousStep() {
    if (currentStep > 1) {
      currentStep--;
      updateUI();
    }
  }

  // 5. UI update function
  function updateUI() {
    updateSteps();
    updateProgressBar();
    updateButtons();
  }

  function updateSteps() {
    steps.forEach((icon, index) => {
      icon.classList.toggle("active", index < currentStep);
    });
  }

  // Update progress bar width
  function updateProgressBar() {
    const progressPercent = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;
    progressBar.style.width = `${progressPercent}%`;
  }

  // Update button states
  function updateButtons() {
    previousButton.disabled = currentStep === 1;
    nextButton.disabled = currentStep === steps.length;
  }
  updateUI();
}

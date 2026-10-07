const toggleContainer = document.querySelector(".color-change-container");
const changeButton = document.querySelector(".change-button");
const dataThemes = ["dark", "blue", "navy", "gray", "zinc"];
let currentSelectedTheme = 0;

changeButton.addEventListener("click", () => {
  currentSelectedTheme = (currentSelectedTheme + 1) % dataThemes.length;
  document.body.setAttribute("data-theme", dataThemes[currentSelectedTheme]);
  //   if (toggleContainer.getAttribute(dataThemes)) {
  //     toggleContainer.classList.toggle("data-theme", dataThemes[0]);
  //   }
  //   if (changeButton.getAttribute(dataThemes)) {
  // }
  //   changeButton.setAttribute("data-theme", dataThemes[currentSelectedTheme]);
});

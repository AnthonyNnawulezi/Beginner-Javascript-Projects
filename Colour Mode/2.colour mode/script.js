const toggleContainer = document.querySelector(".color-change-container");
const changeButton = document.querySelector(".change-button");
const themes = ["light", "dark", "blue", "navy", "gray", "zinc"];
let currentThemeIndex = 0;

changeButton.addEventListener("click", () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  //   document.body.setAttribute("data-theme", themes[currentThemeIndex]);
  document.body.dataset.theme = themes[currentThemeIndex];
});

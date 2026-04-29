const toggleBtn = document.querySelector(".toggle-btn");
const body = document.body;
const themes = ["dark", "light", "blue", "brown", "grey"];

let currentTheme = localStorage.getItem("theme") || themes[0];

// body.setAttribute("data-theme", currentTheme);

// toggleBtn.addEventListener("click", () => {
//   currentIndex = themes.indexOf(currentTheme);
//   currentTheme = themes[(currentIndex + 1) % themes.length];
//   body.setAttribute("data-theme", currentTheme);
//   localStorage.setItem("theme", currentTheme);
// });

body.dataset.theme = currentTheme;

toggleBtn.addEventListener("click", () => {
  const currentIndex = themes.indexOf(currentTheme);
  currentTheme = themes[(currentIndex + 1) % themes.length];
  body.dataset.theme = currentTheme;
  localStorage.setItem("theme", currentTheme);
});

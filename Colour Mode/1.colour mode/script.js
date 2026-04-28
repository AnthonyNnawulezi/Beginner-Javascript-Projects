const toggleButton = document.getElementById("toggle");
const body = document.body;

// toggleButton.addEventListener("click", () => {
//   if (body.classList.contains("light-mode")) {
//     body.classList.remove("light-mode");
//     body.classList.add("dark-mode");
//     toggleButton.classList.add("dark");
//     toggleButton.classList.remove("light");
//   } else {
//     body.classList.remove("dark-mode");
//     body.classList.add("light-mode");
//     toggleButton.classList.add("light");
//     toggleButton.classList.remove("dark");
//   }
// }); this is old code not supported for scaling, now we will use data attributes to toggle themes

const themes = ["dark", "blue"];
let currentThemeIndex = 0;

// Initialize default theme
body.setAttribute("data-theme", themes[currentThemeIndex]);

toggleButton.addEventListener("click", () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;

  body.setAttribute("data-theme", themes[currentThemeIndex]);
});

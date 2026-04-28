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

const themes = ["dark", "blue", "green", "purple"];
let currentTheme = localStorage.getItem("theme") || themes[0];

body.setAttribute("data-theme", currentTheme);

toggleButton.addEventListener("click", () => {
  const currentIndex = themes.indexOf(currentTheme);

  currentTheme = themes[(currentIndex + 1) % themes.length];

  body.setAttribute("data-theme", currentTheme);

  localStorage.setItem("theme", currentTheme);
});

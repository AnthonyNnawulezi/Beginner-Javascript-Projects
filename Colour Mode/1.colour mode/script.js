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
// });

toggleButton.addEventListener("click", () => {
  if (body.getAttribute("data-theme") === "dark") {
    body.setAttribute("data-theme", "blue");
  } else {
    body.setAttribute("data-theme", "dark");
  }
});

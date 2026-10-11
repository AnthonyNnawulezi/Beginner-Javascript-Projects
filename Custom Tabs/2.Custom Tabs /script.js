const tabs = document.querySelector(".tabs");
const contents = document.querySelectorAll(".content");
const tabButtons = document.querySelectorAll(".tab");

tabs.addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");

  contents.forEach((content) => {
    content.classList.remove("active");
    if (content.id === tab.dataset.id) {
      tabButtons.forEach((tabButton) => {
        tabButton.classList.remove("active");
        tab.classList.toggle("active", true);
        content.classList.toggle("active", true);
      });
    }
  });
});

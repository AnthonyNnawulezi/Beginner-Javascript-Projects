const tabs = document.querySelectorAll(".tabs");
const contents = document.querySelectorAll(".content");
const container = document.querySelector(".container");

container.addEventListener("click", (event) => {
  const clickedTab = event.target.closest(".tabs");
  if (!clickedTab) return;

  const currentTabId = clickedTab.dataset.id;
  if (!currentTabId) return;

  const targetContent = document.getElementById(currentTabId);
  if (!targetContent) return;

  [...tabs, ...contents].forEach((element) => {
    element.classList.remove("active");
  });

  clickedTab.classList.add("active");
  targetContent.classList.add("active");
});

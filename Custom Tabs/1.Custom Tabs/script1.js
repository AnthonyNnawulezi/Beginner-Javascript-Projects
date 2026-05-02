const container = document.querySelector(".container");
const contents = document.querySelectorAll(".content");
const tabs = document.querySelectorAll(".tab-button");

if (!container) {
  throw new Error(
    "Tab container not found. Ensure an element with class 'container' exists.",
  );
}

container.addEventListener("click", (event) => {
  const clickedTab = event.target.closest(".tab-button");
  if (!clickedTab) return;

  const currentTabId = clickedTab.dataset.id;
  if (!currentId) return;

  const targetContent = document.getElementById(currentTabId);
  if (!targetContent) return;
});

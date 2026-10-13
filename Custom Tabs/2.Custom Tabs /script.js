const tabs = document.querySelector(".tabs-list");
const contents = document.querySelectorAll(".content-panel");
const tabButtons = document.querySelectorAll(".tab-button");

tabs.addEventListener("click", (e) => {
  const tab = e.target.closest(".tab-button");
  if (!tab) return; // Ignore clicks between tabs

  // Deactivate all tabs and hide all content
  tabButtons.forEach((button) => {
    button.classList.remove("active");
    button.setAttribute("aria-selected", "false");
  });

  // Activate the clicked tab
  tab.classList.add("active");
  tab.setAttribute("aria-selected", "true");

  //   contents.forEach((content) => {
  //     content.classList.remove("active");
  //   });

  //   // Show its matching content
  //   contents.forEach((content) => {
  //     if (content.id === tab.dataset.id) {
  //       content.classList.add("active");
  //     }
  //   });

  //or
  contents.forEach((content) => {
    content.classList.toggle("active", content.id === tab.dataset.id);
  });
});

const tabsContainer = document.querySelector(".tabs");
const allTabs = document.querySelectorAll(".tab");
const allContents = document.querySelectorAll(".content");

tabsContainer.addEventListener("click", (event) => {
  const clickedTab = event.target.closest(".tab");
  if (!clickedTab) return;

  const targetId = clickedTab.dataset.id;

  allTabs.forEach((tab) => {
    tab.classList.remove("active");
    tab.setAttribute("aria-selected", "false");
  });

  allContents.forEach((content) => {
    content.classList.remove("active");
  });

  clickedTab.classList.add("active");
  clickedTab.setAttribute("aria-selected", "true");

  const matchingContent = document.getElementById(targetId);
  if (matchingContent) {
    matchingContent.classList.add("active");
  }
});

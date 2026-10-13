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

// 1. Find the elements we need on the page
const tabList = document.querySelector(".tab-list"); // the row that holds all tabs
const tabs = document.querySelectorAll(".tab"); // all the tab buttons
const tabPanels = document.querySelectorAll(".tab-panel"); // all the content sections

// 2. Show one tab as selected and show only its panel
function showTab(selectedTab) {
  // Each tab's aria-controls says which panel it opens (e.g. "services")
  const selectedPanelId = selectedTab.getAttribute("aria-controls");

  // Mark only the selected tab as selected
  tabs.forEach((tab) => {
    const isSelected = tab === selectedTab; // true for one tab, false for the rest
    tab.setAttribute("aria-selected", isSelected);
  });

  // Hide every panel except the one that matches
  tabPanels.forEach((panel) => {
    panel.hidden = panel.id !== selectedPanelId; // true = hidden, false = visible
  });
}

// 3. Listen for clicks anywhere in the tab row
tabList.addEventListener("click", (event) => {
  // Find the tab that was clicked (or null if the click was between tabs)
  const clickedTab = event.target.closest(".tab");

  // If the click wasn't on a tab, stop here. This prevents the crash.
  if (!clickedTab) return;

  showTab(clickedTab);
});

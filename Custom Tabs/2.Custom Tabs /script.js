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

const tabsList = document.querySelector(".tabs-list");
const allTabButtons = document.querySelectorAll(".tab-button");
const allContentPanels = document.querySelectorAll(".content-panel");

function handleTabClick(event) {
  // Find closest tab button that was clicked
  const clickedTabButton = event.target.closest(".tab-button");

  // Guard Clause: Fixes Null pointer bug if user clicks background container gaps
  if (!clickedTabButton) return;

  const targetPanelId = clickedTabButton.dataset.id;

  // Step 1: Reset active state on all buttons and panels
  allTabButtons.forEach((button) => {
    button.classList.remove("active");
    button.setAttribute("aria-selected", "false");
  });

  allContentPanels.forEach((panel) => {
    panel.classList.remove("active");
  });

  // Step 2: Activate clicked tab button
  clickedTabButton.classList.add("active");
  clickedTabButton.setAttribute("aria-selected", "true");

  // Step 3: Activate corresponding content panel
  const matchingPanel = document.getElementById(targetPanelId);
  if (matchingPanel) {
    matchingPanel.classList.add("active");
  }
}

// Event Delegation
tabsList.addEventListener("click", handleTabClick);

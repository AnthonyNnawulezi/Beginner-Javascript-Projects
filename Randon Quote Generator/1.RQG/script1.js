const wrapper = document.querySelector(".wrapper");
const button = document.querySelector(".refresh-button");
const loader = document.querySelector(".loader");

if (!wrapper || !button || !loader) {
  console.error("Required DOM elements are missing. Check your HTML.");
  return;
}

function toggleLoader(show) {
  loader.classList.toggle("hidden", !show);
  wrapper.classList.toggle("hidden", show);
}

//or
function toggleLoader(show) {
  loader.style.display = show ? "block" : "none";
  wrapper.style.display = show ? "none" : "block";
}

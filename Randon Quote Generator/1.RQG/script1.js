const wrapper = document.querySelector(".wrapper");
const button = document.querySelector(".refresh-button");
const loader = document.querySelector(".loader");

if (!wrapper || !button || !loader) {
  console.error("Required DOM elements are missing. Check your HTML.");
  return;
}

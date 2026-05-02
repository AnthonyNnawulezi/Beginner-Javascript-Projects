const container = document.querySelector(".container");

if (!container) {
  throw new Error(
    "Tab container not found. Ensure an element with class 'container' exists.",
  );
}

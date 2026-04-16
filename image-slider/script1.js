const slider = document.querySelector(".slider");
const dotsContainer = document.querySelector(".dots-container");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

async function fetchImages() {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=5&limit=10",
    );

    if (!response.ok) throw new Error("Failed to fetch images");

    const images = await response.json();

    if (Array.isArray(images) && images.length > 0) {
      renderImages(images);
    } else {
      slider.innerHTML = `<p class="slider-error">No images found.</p>`;
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

function renderImages(images) {
  slider.innerHTML = images
    .map(
      (image) => `
      <div class="slide">
        <img src="${image.download_url}" alt="${image.author || "Image"}">
      </div>
    `,
    )
    .join("");

  dotsContainer.innerHTML = images
    .map(
      (_, i) => `
      <span class="dot ${i === 0 ? "active" : ""}" data-slide="${i}"></span>
    `,
    )
    .join("");

  slides = document.querySelectorAll(".slide");
  dots = document.querySelectorAll(".dot");
}

function initImageSlider() {
  if (!btnPrev || !btnNext || !slider || !dotsContainer) {
    console.error("Slider: required DOM elements are missing.");
    return;
  }
}

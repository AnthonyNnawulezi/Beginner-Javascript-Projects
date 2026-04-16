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
      showImages(images);
    } else {
      slider.innerHTML = `<p class="slider-error">No images found.</p>`;
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

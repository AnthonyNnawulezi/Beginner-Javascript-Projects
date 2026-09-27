const slideViewport = document.querySelector(".slide-viewport");
const dotContainer = document.querySelector(".dot-container");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

const SLIDES_PER_PAGE = 100;
const PAGE_NUMBER = 1;
const API_URL = `https://picsum.photos/v2/list?page=${PAGE_NUMBER}&limit=${SLIDES_PER_PAGE}`;

let slides = [];
let currentSlideIndex = 0;

async function fetchSlides() {
  setStatusMessage("Loading images…");

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    slides = await response.json();

    if (slides.length === 0) {
      setStatusMessage("No images were found.");
      return;
    }

    renderSlides(slides);
    createPaginationDots(slides.length, currentSlideIndex);
  } catch (error) {
    console.error(error);
    setStatusMessage(
      "Sorry, the images couldn't be loaded. Please try again later.",
    );
  }
}

function setStatusMessage(message) {
  slideViewport.innerHTML = `<p class="slide-status">${message}</p>`;
}

function escapeHtml(value) {
  const container = document.createElement("div");
  container.textContent = value;
  return container.innerHTML;
}

function renderSlides(images) {
  slideViewport.innerHTML = images
    .map(
      (image, index) =>
        `<img class="slide" alt="${escapeHtml(image.author)}" data-index="${index}" src="${image.download_url}" />`,
    )
    .join("");

  goToSlide(0);
}

function createPaginationDots(total, currentSlideIndex) {
  let visibleIndexes;

  if (total <= 7) {
    //for small collections show all slides
    visibleIndexes = Array.from({ length: total }, (_, i) => i);
  }
  if (currentSlideIndex >= 0 && currentSlideIndex < total - 1) {
    return [
      0,
      "...",
      currentSlideIndex - 1,
      currentSlideIndex,
      currentSlideIndex + 1,
      total - 1,
    ];
  }
  if (currentSlideIndex >= 0 && currentSlideIndex > total - 4) {
    return [0, "...", total - 4, total - 3, total - 2, total - 1];
  }

  const sortedDots = [...paginationDots].sort((a, b) => a - b);

  dotContainer.innerHTML = sortedDots
    .map(
      (dot, index) =>
        `<button class="dot" type="button" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>`,
    )
    .join("");

  // console.log(paginationDots);
  return sortedDots;
}

function goToSlide(index) {
  if (slides.length === 0) return;

  currentSlideIndex = (index + slides.length) % slides.length;

  slideViewport.querySelectorAll(".slide").forEach((slide, i) => {
    // Update image positions based on the current index
    slide.style.transform = `translateX(${100 * (i - currentSlideIndex)}%)`;
  });

  dotContainer.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlideIndex);
  });
}

prevButton.addEventListener("click", () => goToSlide(currentSlideIndex - 1));
nextButton.addEventListener("click", () => goToSlide(currentSlideIndex + 1));

//take to slide on clicking dot
dotContainer.addEventListener("click", (event) => {
  const dot = event.target.closest(".dot");
  if (!dot) return;
  goToSlide(Number(dot.dataset.index));
});

fetchSlides();

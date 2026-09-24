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

  dotContainer.innerHTML = images
    .map(
      (_, index) =>
        `<button class="dot" type="button" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>`,
    )
    .join("");

  goToSlide(0);
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

function renderDots() {
  const totalSlides = slides.length;

  if (totalSlides === 0) {
    dotContainer.innerHTML = "";
    return;
  }

  const visibleIndexes = new Set();

  // Always show the first slide
  visibleIndexes.add(0);

  // Show current slide and slides around it
  for (
    let index = currentSlideIndex - 1;
    index <= currentSlideIndex + 1;
    index++
  ) {
    if (index >= 0 && index < totalSlides) {
      visibleIndexes.add(index);
    }
  }

  // Always show the last slide
  visibleIndexes.add(totalSlides - 1);

  const sortedIndexes = [...visibleIndexes].sort((a, b) => a - b);

  let dotsHtml = "";
  let previousIndex = -1;

  sortedIndexes.forEach((index) => {
    if (previousIndex !== -1 && index - previousIndex > 1) {
      dotsHtml += `<span class="dot-ellipsis">...</span>`;
    }

    dotsHtml += `
      <button
        class="dot ${index === currentSlideIndex ? "active" : ""}"
        type="button"
        data-index="${index}"
        aria-label="Go to slide ${index + 1}"
      ></button>
    `;

    previousIndex = index;
  });

  dotContainer.innerHTML = dotsHtml;
}

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

// 1. Add the Pagination Algorithm Helper Function
function getPaginationRange(current, total) {
  // If we have 7 or fewer slides, just show all dots without ellipses
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i);
  }

  // State 1: We are near the beginning (e.g., [0, 1, 2, 3, 4, '...', 20])
  if (current <= 3) {
    return [0, 1, 2, 3, 4, "...", total - 1];
  }

  // State 2: We are near the end (e.g., [0, '...', 16, 17, 18, 19, 20])
  if (current >= total - 4) {
    return [0, "...", total - 5, total - 4, total - 3, total - 2, total - 1];
  }

  // State 3: We are in the middle (e.g., [0, '...', 9, 10, 11, '...', 20])
  return [0, "...", current - 1, current, current + 1, "...", total - 1];
}

// 2. Modify renderMarkup (Remove dot generation from here)
function renderMarkup(data) {
  // Only render the images here, because images don't change
  const imageMarkup = data
    .map(
      (item, index) => `
    <img class="slide" alt="Image by ${item.author}" src="${item.download_url}" data-index="${index}" />
  `,
    )
    .join("");

  sliderTrack.innerHTML = imageMarkup;
  slideElements = document.querySelectorAll(".slide");
}

// 3. Modify updateUI (Dynamically generate dots here)
function updateUI() {
  // Update image transforms (same as before)
  slideElements.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currentIndex)}%)`;
  });

  // Calculate which dots and ellipses to show
  const paginationRange = getPaginationRange(
    currentIndex,
    slideElements.length,
  );

  // Generate the HTML for the dots and inject it
  dotContainer.innerHTML = paginationRange
    .map((item) => {
      if (item === "...") {
        return `<div class="dot-ellipsis">...</div>`;
      }
      // If it's a number, render a clickable dot
      const isActive = item === currentIndex ? "active" : "";
      return `<div class="dot ${isActive}" data-index="${item}"></div>`;
    })
    .join("");
}

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

const slideTrack = document.querySelector(".slide-track");
const dotContainer = document.querySelector(".dot-container");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");

const IMAGES_PER_PAGE = 24;
const PAGE_NUMBER = 1;
const MAX_VISIBLE_DOTS = 7;

let slides = [];
let currentIndex = 0;

async function fetchSlides() {
  setStatusMessage("Loading images…");

  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${PAGE_NUMBER}&limit=${IMAGES_PER_PAGE}`,
    );

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
  slideTrack.innerHTML = `<p class="slide-status">${message}</p>`;
}

function escapeHtml(value) {
  const container = document.createElement("div");
  container.textContent = value;
  return container.innerHTML;
}

function renderSlides(images) {
  slideTrack.innerHTML = images
    .map(
      (image, index) =>
        `<img class="slide" alt="${escapeHtml(image.author)}" data-index="${index}" src="${image.download_url}" />`,
    )
    .join("");

  goToSlide(0);
}

function goToSlide(index) {
  if (slides.length === 0) return;

  currentIndex = (index + slides.length) % slides.length;

  slideTrack.querySelectorAll(".slide").forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentIndex)}%)`;
  });

  renderDots(slides.length, currentIndex);
}

function getVisibleDotIndexes(total, active) {
  if (total <= MAX_VISIBLE_DOTS) {
    return Array.from({ length: total }, (_, i) => i);
  }

  const indexes = new Set([
    0,
    total - 1,
    active,
    Math.max(active - 1, 0),
    Math.min(active + 1, total - 1),
  ]);

  return [...indexes].sort((a, b) => a - b);
}

function renderDots(total, active) {
  const visibleIndexes = getVisibleDotIndexes(total, active);

  dotContainer.innerHTML = visibleIndexes
    .map((index, i) => {
      const previousIndex = visibleIndexes[i - 1];
      const showEllipsis =
        previousIndex !== undefined && index - previousIndex > 1;
      const ellipsis = showEllipsis
        ? `<span class="dot-ellipsis" aria-hidden="true">…</span>`
        : "";

      return `${ellipsis}<button class="dot ${index === active ? "active" : ""}" type="button" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>`;
    })
    .join("");
}

prevButton.addEventListener("click", () => goToSlide(currentIndex - 1));
nextButton.addEventListener("click", () => goToSlide(currentIndex + 1));

dotContainer.addEventListener("click", (event) => {
  const dot = event.target.closest(".dot");
  if (!dot) return;
  goToSlide(Number(dot.dataset.index));
});

fetchSlides();

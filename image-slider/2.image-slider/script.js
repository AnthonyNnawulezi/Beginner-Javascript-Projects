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

function getDotTokens(totalSlides, activeIndex, maxVisible = MAX_VISIBLE_DOTS) {
  if (totalSlides <= maxVisible) {
    return Array.from({ length: totalSlides }, (_, index) => index);
  }

  const tokens = [];
  const neighbors = 1;

  const start = Math.max(1, activeIndex - neighbors);
  const end = Math.min(totalSlides - 2, activeIndex + neighbors);

  tokens.push(0);

  if (start > 1) {
    tokens.push("ellipsis");
  }

  for (let index = start; index <= end; index++) {
    tokens.push(index);
  }

  if (end < totalSlides - 2) {
    tokens.push("ellipsis");
  }

  tokens.push(totalSlides - 1);

  return tokens;
}

function renderDots() {
  const tokens = getDotTokens(slides.length, currentSlideIndex);

  dotContainer.innerHTML = tokens
    .map((token) => {
      if (token === "ellipsis") {
        return `<span class="dot-ellipsis" aria-hidden="true">…</span>`;
      }

      const isActive = token === currentSlideIndex;

      return `
        <button
          class="dot ${isActive ? "active" : ""}"
          type="button"
          role="tab"
          aria-label="Go to slide ${token + 1}"
          aria-selected="${isActive}"
          data-index="${token}"
        ></button>
      `;
    })
    .join("");

  dotElements = [...dotContainer.querySelectorAll(".dot")];
}

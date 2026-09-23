// const slideViewport = document.querySelector(".slide-viewport");
// const dotContainer = document.querySelector(".dot-container");
// const prevButton = document.querySelector(".prev-button");
// const nextButton = document.querySelector(".next-button");

// const SLIDES_PER_PAGE = 10;
// const PAGE_NUMBER = 1;
// const API_URL = `https://picsum.photos/v2/list?page=${PAGE_NUMBER}&limit=${SLIDES_PER_PAGE}`;

// let slides = [];
// let currentSlideIndex = 0;

// async function fetchSlides() {
//   setStatusMessage("Loading images…");

//   try {
//     const response = await fetch(API_URL);

//     if (!response.ok) {
//       throw new Error(`Request failed with status ${response.status}`);
//     }

//     slides = await response.json();

//     if (slides.length === 0) {
//       setStatusMessage("No images were found.");
//       return;
//     }

//     renderSlides(slides);
//   } catch (error) {
//     console.error(error);
//     setStatusMessage(
//       "Sorry, the images couldn't be loaded. Please try again later.",
//     );
//   }
// }

// function setStatusMessage(message) {
//   slideViewport.innerHTML = `<p class="slide-status">${message}</p>`;
// }

// function escapeHtml(value) {
//   const container = document.createElement("div");
//   container.textContent = value;
//   return container.innerHTML;
// }

// function renderSlides(images) {
//   slideViewport.innerHTML = images
//     .map(
//       (image, index) =>
//         `<img class="slide" alt="${escapeHtml(image.author)}" data-index="${index}" src="${image.download_url}" />`,
//     )
//     .join("");

//   dotContainer.innerHTML = images
//     .map(
//       (_, index) =>
//         `<button class="dot" type="button" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>`,
//     )
//     .join("");

//   goToSlide(0);
// }

// function goToSlide(index) {
//   if (slides.length === 0) return;

//   currentSlideIndex = (index + slides.length) % slides.length;

//   slideViewport.querySelectorAll(".slide").forEach((slide, i) => {
//     // Update image positions based on the current index
//     slide.style.transform = `translateX(${100 * (i - currentSlideIndex)}%)`;
//   });

//   dotContainer.querySelectorAll(".dot").forEach((dot, i) => {
//     dot.classList.toggle("active", i === currentSlideIndex);
//   });
// }

// prevButton.addEventListener("click", () => goToSlide(currentSlideIndex - 1));
// nextButton.addEventListener("click", () => goToSlide(currentSlideIndex + 1));

// //take to slide on clicking dot
// dotContainer.addEventListener("click", (event) => {
//   const dot = event.target.closest(".dot");
//   if (!dot) return;
//   goToSlide(Number(dot.dataset.index));
// });

// fetchSlides();

const slideViewport = document.querySelector(".slide-viewport");
const dotContainer = document.querySelector(".dot-container");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

const SLIDES_PER_PAGE = 10;
const PAGE_NUMBER = 1;
const API_URL = `https://picsum.photos/v2/list?page=${PAGE_NUMBER}&limit=${SLIDES_PER_PAGE}`;

let slides = [];
let slideElements = [];
let dotElements = [];
let currentSlideIndex = 0;

function escapeHtmlAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function fetchImages() {
  slideViewport.setAttribute("aria-busy", "true");

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const imageData = await response.json();
    renderSlider(imageData);
  } catch (error) {
    console.error("Failed to load images:", error);
    slideViewport.innerHTML = `
      <p class="error-message">Unable to load images. Please try again later.</p>
    `;
  } finally {
    slideViewport.setAttribute("aria-busy", "false");
  }
}

function renderSlider(imageData) {
  slides = imageData;

  if (!slides.length) {
    slideViewport.innerHTML = `
      <p class="error-message">No images found.</p>
    `;
    return;
  }

  slideViewport.innerHTML = slides
    .map(
      (slide, index) => `
        <img
          class="slide"
          src="${escapeHtmlAttribute(slide.download_url)}"
          alt="${escapeHtmlAttribute(`Photo by ${slide.author || "unknown author"}`)}"
          data-index="${index}"
          loading="${index === 0 ? "eager" : "lazy"}"
        />
      `,
    )
    .join("");

  dotContainer.innerHTML = slides
    .map(
      (_, index) => `
        <button
          class="dot ${index === 0 ? "active" : ""}"
          type="button"
          role="tab"
          aria-label="Go to slide ${index + 1}"
          aria-selected="${index === 0 ? "true" : "false"}"
          data-index="${index}"
        ></button>
      `,
    )
    .join("");

  slideElements = [...slideViewport.querySelectorAll(".slide")];
  dotElements = [...dotContainer.querySelectorAll(".dot")];

  currentSlideIndex = 0;
  updateSlider();
}

function updateSlider() {
  slideElements.forEach((slideElement, index) => {
    slideElement.style.transform = `translateX(${
      100 * (index - currentSlideIndex)
    }%)`;
  });

  dotElements.forEach((dotElement, index) => {
    const isActive = index === currentSlideIndex;
    dotElement.classList.toggle("active", isActive);
    dotElement.setAttribute("aria-selected", String(isActive));
  });
}

function goToSlide(index) {
  if (!slides.length) return;

  currentSlideIndex = (index + slides.length) % slides.length;
  updateSlider();
}

function showNextSlide() {
  goToSlide(currentSlideIndex + 1);
}

function showPreviousSlide() {
  goToSlide(currentSlideIndex - 1);
}

prevButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

dotContainer.addEventListener("click", (event) => {
  const dot = event.target.closest(".dot");
  if (!dot) return;

  const slideIndex = Number(dot.dataset.index);
  goToSlide(slideIndex);
});

fetchImages();

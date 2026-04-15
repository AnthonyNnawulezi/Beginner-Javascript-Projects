const slider = document.querySelector(".slider");
const dotsContainer = document.querySelector(".dots-container");

async function fetchImages() {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=5&limit=10",
    );
    const result = await response.json();
    if (result?.length > 0) showImages(result);
    // console.log(result);
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

function showImages(images) {
  slider.innerHTML = images
    .map(
      (image) => `
    <div class="slide"><img src="${image.download_url}" alt="${image.author}" loading="lazy"></div>
`,
    )
    .join("");

  dotsContainer.innerHTML = images
    .map(
      (image, index) => `
      <span class="dot ${index === 0 ? "active" : ""}" data-slide="${index}"></span>
    `,
    )
    .join("");

  initImageSlider();
}

function initImageSlider() {
  const btnPrev = document.querySelector(".btn-prev");
  const btnNext = document.querySelector(".btn-next");
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");

  function activeSlide(slide) {
    document
      .querySelectorAll(".dot")
      .forEach((s) => s.classList.remove("active"));
    document
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add("active");
  }

  function changeSlide(currentSlide) {
    slides.forEach(
      (slide, index) =>
        (slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`),
    );
  }
  changeSlide(currentSlide);

  btnNext.addEventListener("click", () => {
    currentSlide++;
    if (slides.length - 1 < currentSlide) currentSlide = 0;
    changeSlide(currentSlide);
    activeSlide(currentSlide);
  });

  btnPrev.addEventListener("click", () => {
    currentSlide--;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    changeSlide(currentSlide);
    activeSlide(currentSlide);
  });

  // Dots navigation
  dotsContainer.addEventListener("click", (e) => {
    // console.log(e.target.classList, e.target.dataset);
    if (e.target.classList.contains("dot")) {
      currentSlide = e.target.dataset.slide;
      changeSlide(currentSlide);
      activeSlide(currentSlide);
    }
  });
}

fetchImages();

/**
 * Best Practices Applied:
 * 1. Used 'use strict' and encapsulated state.
 * 2. Caching DOM elements to avoid repeated lookups.
 * 3. Event Delegation for dots.
 * 4. Fixed variable shadowing and syntax errors.
 */

const slider = document.querySelector(".slider");
const dotsContainer = document.querySelector(".dots-container");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let state = {
  currentSlide: 0,
  slides: [],
  dots: [],
};

async function fetchImages() {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=5&limit=10",
    );
    if (!response.ok) throw new Error("Network response was not ok");

    const result = await response.json();
    if (result?.length > 0) renderSlider(result);
  } catch (error) {
    console.error("Error fetching images:", error);
    slider.innerHTML = `<p class="error">Failed to load images.</p>`;
  }
}

function renderSlider(images) {
  // Generate HTML with correct template literals
  slider.innerHTML = images
    .map(
      (img) => `
    <div class="slide">
      <img src="${img.download_url}" alt="${img.author}" loading="lazy">
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

  // Cache elements and initialize
  state.slides = document.querySelectorAll(".slide");
  state.dots = document.querySelectorAll(".dot");
  setupListeners();
  moveSlide(0);
}

function moveSlide(index) {
  state.currentSlide = index;

  // Update Slide Positions
  state.slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - index)}%)`;
  });

  // Update Dots
  state.dots.forEach((dot) => dot.classList.remove("active"));
  state.dots[index].classList.add("active");
}

function setupListeners() {
  // Remove existing listeners if any (Clean up)
  btnNext.onclick = () => {
    let next = (state.currentSlide + 1) % state.slides.length;
    moveSlide(next);
  };

  btnPrev.onclick = () => {
    let prev =
      (state.currentSlide - 1 + state.slides.length) % state.slides.length;
    moveSlide(prev);
  };

  dotsContainer.onclick = (e) => {
    if (e.target.classList.contains("dot")) {
      const slideIndex = parseInt(e.target.dataset.slide, 10);
      moveSlide(slideIndex);
    }
  };
}

fetchImages();

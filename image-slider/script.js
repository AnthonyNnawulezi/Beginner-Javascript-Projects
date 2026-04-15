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

const slider = document.querySelector(".slider");
const dotsContainer = document.querySelector(".dots-container");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

async function fetchImages() {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=5&limit=10",
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.status}`);
    }

    const result = await response.json();

    if (result?.length > 0) {
      showImages(result);
    } else {
      slider.innerHTML = `<p class="slider-error">No images found.</p>`;
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    slider.innerHTML = `<p class="slider-error">Failed to load images. Please try again.</p>`;
  }
}

function showImages(images) {
  slider.innerHTML = images
    .map(
      (_, index) =>
        `<div class="slide">
          <img
            src="${images[index].download_url}"
            alt="${images[index].author}"
            width="800"
            height="600"
            loading="lazy"
          >
        </div>`,
    )
    .join("");

  dotsContainer.innerHTML = images
    .map(
      (_, index) =>
        `<span
          class="dot ${index === 0 ? "active" : ""}"
          data-slide="${index}"
          aria-label="Go to slide ${index + 1}"
        ></span>`,
    )
    .join("");

  initImageSlider();
}

function initImageSlider() {
  if (!btnPrev || !btnNext || !slider || !dotsContainer) {
    console.error("Slider: required DOM elements are missing.");
    return;
  }

  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;

  function goToSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - index)}%)`;
    });

    dots.forEach((d) => d.classList.remove("active"));
    const activeDot = dots[index];
    if (activeDot) activeDot.classList.add("active");
  }

  // Clone buttons to remove any previously stacked listeners
  btnNext.replaceWith(btnNext.cloneNode(true));
  btnPrev.replaceWith(btnPrev.cloneNode(true));

  const freshNext = document.querySelector(".btn-next");
  const freshPrev = document.querySelector(".btn-prev");

  freshNext.addEventListener("click", () => {
    currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    goToSlide(currentSlide);
  });

  freshPrev.addEventListener("click", () => {
    currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(currentSlide);
  });

  dotsContainer.addEventListener("click", (e) => {
    const dot = e.target.closest(".dot");
    if (!dot) return;
    currentSlide = Number(dot.dataset.slide);
    goToSlide(currentSlide);
  });

  goToSlide(currentSlide);
}

fetchImages();

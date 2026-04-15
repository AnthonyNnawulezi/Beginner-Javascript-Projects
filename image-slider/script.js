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

async function fetchImages() {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=5&limit=10",
    );
    const images = await response.json();

    if (Array.isArray(images) && images.length > 0) {
      renderImages(images);
      initSlider();
    }
  } catch (err) {
    console.error("Failed to fetch images:", err);
  }
}

function renderImages(images) {
  slider.innerHTML = images
    .map(
      (img) => `
      <div class="slide">
        <img src="${img.download_url}" alt="${img.author}">
      </div>`,
    )
    .join("");

  dotsContainer.innerHTML = images
    .map(
      (_, i) => `
      <span class="dot ${i === 0 ? "active" : ""}" data-slide="${i}"></span>`,
    )
    .join("");
}

function initSlider() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const btnPrev = document.querySelector(".btn-prev");
  const btnNext = document.querySelector(".btn-next");

  let current = 0;

  const updateDots = (i) => {
    dots.forEach((d) => d.classList.remove("active"));
    const dot = document.querySelector(`.dot[data-slide="${i}"]`);
    if (dot) dot.classList.add("active");
  };

  const goToSlide = (i) => {
    slides.forEach(
      (slide, idx) =>
        (slide.style.transform = `translateX(${100 * (idx - i)}%)`),
    );
  };

  goToSlide(0);

  btnNext.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    goToSlide(current);
    updateDots(current);
  });

  btnPrev.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    goToSlide(current);
    updateDots(current);
  });

  dotsContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("dot")) return;
    const i = Number(e.target.dataset.slide);
    current = i;
    goToSlide(i);
    updateDots(i);
  });
}

fetchImages();

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

  // On clicking dots
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

const slideImage = document.querySelector(".slide-image");
const slideContainer = document.querySelector(".slider-container");
const dotContainer = document.querySelector(".dot-container");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");
const dots = document.querySelectorAll(".dot");

let errors = "";
let currentIndex = 0;

const LIMIT = 10;
const PAGE = 1;

async function fetchImages() {
  //   slideImage.textContent = "Loading images...";

  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${PAGE}&limit=${LIMIT}`,
    );
    if (!response.ok)
      throw new Error(`Request failed with status ${response.status}`);

    const slideImages = await response.json();

    renderSlide(slideImages);

    console.log(slideImages);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading = false;
  }
}

function renderSlide(slides) {
  const images = slides
    .map(
      (slide, index) => `
      <img class="slide" alt=${slide.author} data-index="${index}" src=${slide.download_url} />
    `,
    )
    .join("");

  slideImage.innerHTML += images;

  changeImage(slides, currentIndex);
  goTo(slides, currentIndex);
}

function changeImage(images, activeIndex) {
  const dotMarkup = images
    .map(
      (slide, index) => `
      <div class="dot ${index === 0 ? "active" : ""}" data-index="${index}"></div>
    `,
    )
    .join("");

  dotContainer.innerHTML += dotMarkup;

  const dotElements = dotContainer.querySelectorAll(".dot");

  dotElements.forEach((dot, i) => {
    dot.classList.toggle("active", i === activeIndex);
  });

  images.forEach(
    (image, index) =>
      (image.style.transform = `translateX(${100 * (index - activeIndex)}%)`),
  );
}

function goTo(slides) {
  if (currentIndex === 0) {
    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      const dots = document.querySelectorAll(".dot");
      dots.forEach((dot, index) => dot.classList.remove("active"));
      dots[currentIndex].classList.add("active");
    });
  }
  if (currentIndex < slides.length) {
    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      const dots = document.querySelectorAll(".dot");
      dots.forEach((dot, index) => dot.classList.remove("active"));
      dots[currentIndex].classList.add("active");
    });
  }
}

fetchImages();

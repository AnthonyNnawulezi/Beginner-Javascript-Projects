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

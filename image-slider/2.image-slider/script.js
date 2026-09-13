const slideImage = document.querySelector(".slide-image");
const slideContainer = document.querySelector(".slider-container");
const dotContainer = document.querySelector(".dot-container");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");
const dots = document.querySelectorAll(".dot");

let setLoading = false;
let errors = "";
let currentIndex = 0;

const LIMIT = 10;
const PAGE = 1;

async function fetchImages() {
  setLoading = true;

  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${PAGE}&limit=${LIMIT}`,
    );
    if (!response.ok) throw new Error("Error fetching Slide Images");

    const slideImages = await response.json();

    slideContainer.addEventListener("click", renderSlide(slideImages));

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
      (slide) => `
      <img class="slide" alt=${slide.author} data-${slide} src=${slide.download_url} />
    `,
    )
    .join("");

  slideImage.innerHTML += images;
  slideIndex = images.dataset;

  changeImage(slides, slideIndex);
}

function changeImage(images, i) {
  const dots = images
    .map(
      (slide, index) => `
      <div class="dot" data-${index}></div>
    `,
    )
    .join("");

  dotContainer.innerHTML += dots;

  if (i.id === index) {
    dots.dataset.id = i.id;
    matchingId = dots.dataset.id;
  }

  goTo(slides, matchingId);
}

function goTo(slides, matchingId) {
  if (currentIndex > 0) {
    nextButton.addEventListener("click", () => {
      currentIndex++;
      document.querySelectorAll(".dot").classList().remove("active");
      slides.map((_, i) => i.classList.add("active"));
    });
  }
  if (currentIndex < slides.length - 1) {
    prevButton.addEventListener("click", () => {
      currentIndex--;
      document.querySelectorAll(".dot").classList().remove("active");
      slides.map((_, i) => i.classList.add("active"));
    });
  }
}

fetchImages();

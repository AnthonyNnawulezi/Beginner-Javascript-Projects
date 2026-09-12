const slideImage = document.querySelector(".slide-image");
const slideContainer = document.querySelector(".slider-container");
const dotContainer = document.querySelector(".dot-container");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");

let setLoading = false;
let errors = "";

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
      <img class="slide" alt=${slide.author} src=${slide.download_url} />
    `,
    )
    .join("");

  slideImage.innerHTML += images;

  changeImage();
  goTo();
}

function changeImage(slides) {
  const dots = slides
    .map(
      (_, index) => `
      <div class="dot"></div>
    `,
    )
    .join("");

  dotContainer.innerHTML += dots;
}

fetchImages();

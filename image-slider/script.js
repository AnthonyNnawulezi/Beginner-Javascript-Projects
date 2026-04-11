const slider = document.querySelector(".slider");
const dotsContainer = document.querySelector(".dots-container");
const slides = document.querySelectorAll(".slide");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

async function fetchImages() {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=5&limit=5",
      {
        method: "GET",
      },
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
    <div class="slide"><img src="${image.download_url}" alt="${image.author}"></div>
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
}

fetchImages();

let currentSlide = 0;

function handleImageSlider() {
  function activeSlide(slide) {}
  function changeSlide(slides) {}

  btnNext.addEventListener("click", () => {
    currentSlide++;
    if (slides.length - 1 < currentSlide) currentSlide = 0;
  });
}

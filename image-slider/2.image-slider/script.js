const slides = document.querySelector(".slider");
const dots = document.querySelector(".dot-container");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

async function fetchImages() {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=2&limit=10",
    );
    const images = await response.json();
    console.log(images);

    if (!images) {
      slides.innerHTML = '<p class="error">Error fetching Images</p>';
    } else {
      renderImages(images);
      initSlider(images);
    }
  } catch (error) {
    console.log(error, "Error fetching images");
  }
}

function renderImages(images) {
  slides.innerHTML = images
    .map(
      (image) => `
    <div class='slider-container'><img src=${image.download_url} alt='${image.author}'/></div>
    `,
    )
    .join("");
  dots.innerHTML = images.map((image) => `<span class="dots"></span>`).join("");
}

function initSlider(images) {
  const slides = document.querySelector(".slider-container");
  const dots = document.querySelector(".dots");
  let currentSlide = 0;
  function goToSlide(currentSlide) {}
  goToSlide(0);
  btnNext.addEventListener("click", {});
  btnPrev.addEventListener("click", {});
  btnNext.addEventListener("click", {});
}

fetchImages();

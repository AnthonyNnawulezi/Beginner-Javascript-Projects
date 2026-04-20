const slides = document.querySelector(".slider");
const dotContainer = document.querySelector(".dot-container");
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
  dotContainer.innerHTML = images
    .map((image, i) => `<span class="dots ${i === 0 ? "active" : ""}"></span>`)
    .join("");
}

function initSlider(images) {
  const slides = document.querySelectorAll(".slider-container");
  const dots = document.querySelectorAll(".dots");
  let currentSlide = 0;

  function goToSlide(currentSlide) {
    slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`),
    );

    dots.forEach((dot) => {
      dot.classList.remove("active");
    });
    dots[currentSlide].classList.add("active");
  }

  goToSlide(0);
  btnNext.addEventListener("click", () => {
    if (currentSlide === slides.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
  });

  btnPrev.addEventListener("click", () => {
    if (currentSlide <= 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
  });

  dotContainer.addEventListener("click", (e) => {
    index = e.target;
    dots.forEach((dot, i) => {
      if (dot === index) {
        index = i;
      }
    });
    goToSlide(index);
  });
}

fetchImages();

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

  dotsContainer.addEventListener("click", (e) => {
    // console.log(e.target.classList, e.target.dataset);
    if (e.target.classList.contains("dot")) {
      const currentSlide = e.target.dataset.slide;
      changeSlide(currentSlide);
      activeSlide(currentSlide);
    }
  });
}

fetchImages();

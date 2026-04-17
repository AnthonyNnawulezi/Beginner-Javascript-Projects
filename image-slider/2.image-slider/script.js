const slides = document.querySelector(".slider");
const dots = document.querySelector(".dot-container");

async function fetchImages() {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=2&limit=100",
    );
    const images = await response.json();
    console.log(images);

    if (!images) {
      slides.innerHTML = '<p class="error">Error fetching Images</p>';
    } else {
      renderImages(images);
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
  dots.innerHTML = images.map((image) => '<span class="dots"></span>').join("");
}

fetchImages();

const loadMoreButton = document.querySelector(".load-more");
const container = document.querySelector(".container");

const IMAGES_PER_LOAD = 5;
let currentIndex = 1;

function loadImages() {
  const fragment = document.createDocumentFragment();

  for (let i = currentIndex; i < currentIndex + IMAGES_PER_LOAD; i++) {
    const img = document.createElement("img");
    img.src = `https://picsum.photos/200/300?random=${i}`;
    img.alt = `Random image ${i}`;
    imageElement.loading = "lazy";
    fragment.appendChild(img);
  }

  imageContainer.appendChild(fragment);
  currentIndex += IMAGES_PER_LOAD;
}

fetchRandomImage();

loadMoreButton.addEventListener("click", () => {
  fetchRandomImage(count + 4);
});

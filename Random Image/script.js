const loadMoreButton = document.querySelector(".load-more");
const container = document.querySelector(".container");

let count = 1;

function fetchRandomImage() {
  for (let i = 1; i <= count + 4; i++) {
    const imageEl = document.createElement("img");
    imageEl.src = `https://picsum.photos/200/300?random=${i}`;
    container.appendChild(imageEl);
  }
}

fetchRandomImage();

loadMoreButton.addEventListener("click", () => {
  fetchRandomImage(count + 4);
});

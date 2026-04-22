const productsContainer = document.querySelector(".products-container");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let currentPage = 0;
const LIMIT = 10;
let isLoading = false;

async function fetchProducts(page) {
  if (isFetching) return;
  isFetching = true;
  loadMoreBtn.textContent = "Loading...";
  loadMoreBtn.disabled = true;
}

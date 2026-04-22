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

  try {
    const skip = page * LIMIT;
    const response = await fetch(
      `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`,
    );

    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();

    if (data?.products?.length) {
      displayProducts(data.products);
    } else {
      loadMoreBtn.textContent = "No more products";
      loadMoreBtn.disabled = true;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    loadMoreBtn.textContent = "Error loading products";
    loadMoreBtn.disabled = true;
  } finally {
    isFetching = false;
    loadMoreBtn.textContent = "Load More";
    loadMoreBtn.disabled = false;
  }
}

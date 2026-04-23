const productsContainer = document.querySelector(".products-container");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let currentPage = 0;
const LIMIT = 10;
let isLoading = false;

async function fetchProducts(page) {
  isLoading = true;
  loadMoreBtn.textContent = "Load More Products...";
  loadMoreBtn.disabled = false;

  try {
    const skip = page * LIMIT;
    const response = await fetch(
      `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`,
    );

    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    // console.log(data);

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
    isLoading = false;
  }
}

function displayProducts(products) {
  products.forEach(({ title, thumbnail, description, price }) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
    <img 
      class="product-thumbnail" 
      src="${thumbnail}" 
      alt="${title}"
      loading="lazy"
    />
    <p class="product-title">${title}</p>
    <p class="product-description">${description}</p>
    <p class="product-price">Price: $${price.toFixed(2)}</p>
  `;
    productsContainer.appendChild(productCard);
  });
}

fetchProducts(currentPage);

loadMoreBtn.addEventListener("click", () => {
  currentPage += 1;
  fetchProducts(currentPage);
});

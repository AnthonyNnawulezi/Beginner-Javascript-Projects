const productList = document.querySelector(".load-more-container");
const loadMoreButton = document.querySelector(".load-more-button");

const PRODUCTS_PER_REQUEST = 10;
let SKIP = 10;

async function fetchProducts() {
  loadMoreButton.disabled = true;
  loadMoreButton.textContent = "Loading...";

  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${PRODUCTS_PER_REQUEST}&skip=${SKIP === 0 ? 0 : SKIP * 10}`,
    );

    if (!response.ok)
      throw new Error(`Error fetching Products, ${response.status}`);

    const data = await response.json();
    console.log(data, data.products);

    const products = data.products ?? [];

    if (products.length === 0) {
      loadMoreButton.innerHTML = `<span>No products found</span>`;
    }

    renderProducts(products);
  } catch (error) {
    console.error(error);
  }
}

function renderProducts(products) {
  products.map((product) => {
    const productContainer = document.createElement("div");
    const productTitle = document.createElement("h3");
    const productPrice = document.createElement("span");
    const productDescription = document.createElement("p");
    const productImage = document.createElement("img");
    const productCategory = document.createElement("span");

    productTitle.textContent = product.title;
    productPrice.textContent = product.price;
    productDescription.textContent = product.description;
    productImage.src = product.images[0];
    productCategory.textContent = product.category;

    productTitle.classList.add("product-title");
    productPrice.classList.add("product-price");
    productDescription.classList.add("product-description");
    productImage.classList.add("product-image");
    productCategory.classList.add("product-category");
    productContainer.classList.add("product-container");

    productContainer.append(
      productImage,
      productTitle,
      productDescription,
      productPrice,
      productCategory,
    );

    productList.appendChild(productContainer);
  });

  if (products.length === 100) {
    loadMoreButton.disabled = true;
  }
}

loadMoreButton.addEventListener("click", (e) => {
  fetchProducts();
  SKIP += 1;
});

fetchProducts();

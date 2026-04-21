const productsContainer = document.querySelector(".products-container");
const loadMoreBtn = document.getElementById("loadMoreBtn");
let currentPage = 0;

async function fetchProducts(getCurrentPage) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${getCurrentPage === 0 ? 0 : getCurrentPage * 10}`,
    );
    const data = await response.json();

    if (data && data.products) displayProducts(data.products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayProducts(products) {
  console.log(products);
  products.forEach((product) => {
    const productCard = document.createElement("div");
    const productTitle = document.createElement("p");
    const productThumbnail = document.createElement("img");
    const productDescription = document.createElement("p");
    const productPrice = document.createElement("p");

    productThumbnail.src = product.thumbnail;
    productTitle.textContent = product.title;
    productPrice.textContent = `Price: $${product.price}`;
    productDescription.textContent = product.description;

    productTitle.classList.add("product-title");
    productThumbnail.classList.add("product-thumbnail");
    productDescription.classList.add("product-description");
    productPrice.classList.add("product-price");
    productCard.classList.add("product-card");

    productCard.appendChild(productThumbnail);
    productCard.appendChild(productTitle);
    productCard.appendChild(productPrice);
    productCard.appendChild(productDescription);

    productsContainer.appendChild(productCard);
  });
}

fetchProducts(currentPage);

if (productsContainer.children.length === 0) {
  loadMoreBtn.setAttribute("disabled", "true");
}

console.log(productsContainer.children.length);

loadMoreBtn.addEventListener("click", () => {
  fetchProducts(currentPage++);
});

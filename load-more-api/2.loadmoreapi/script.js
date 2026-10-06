const productList = document.querySelector(".products-container");
const loadMoreButton = document.querySelector(".load-more-button");

const PRODUCTS_PER_REQUEST = 10;
let productsLoaded = 10;
let totalProducts = 0;

async function fetchProducts() {
  loadMoreButton.disabled = true;
  loadMoreButton.textContent = "Loading...";

  try {
    const url = `https://dummyjson.com/products?limit=${PRODUCTS_PER_REQUEST}&skip=${productsLoaded}`;

    const response = await fetch(url);

    if (!response.ok)
      throw new Error(`Error fetching Products, ${response.status}`);

    const data = await response.json();
    const products = data.products ?? [];

    console.log(data, data.products);

    totalProducts = data.total ?? 0;
    renderProducts(products);

    productsLoaded += products.length;

    const allProductsLoaded =
      products.length === 0 || productsLoaded >= data.total;

    if (allProductsLoaded) {
      loadMoreButton.textContent = "No more products";
    } else {
      loadMoreButton.textContent = "Load more";
      loadMoreButton.disabled = false;
    }
  } catch (error) {
    console.error(error);
    loadMoreButton.textContent = "Try again";
    loadMoreButton.disabled = false;
  }
}

function renderProducts(products) {
  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    const productCard = document.createElement("article");
    const productTitle = document.createElement("h3");
    const productPrice = document.createElement("span");
    const productDescription = document.createElement("p");
    const productImage = document.createElement("img");
    const productCategory = document.createElement("span");

    productTitle.textContent = product.title;
    productPrice.textContent = `$${product.price.toFixed(2)}`;
    productDescription.textContent = product.description;
    productImage.src = product.images?.[0] ?? product.thumbnail ?? "";
    productImage.alt = product.title;
    productImage.loading = "lazy";
    productCategory.textContent = "Category: " + product.category ?? "";

    productTitle.classList.add("product-title");
    productPrice.classList.add("product-price");
    productDescription.classList.add("product-description");
    productImage.classList.add("product-image");
    productCategory.classList.add("product-category");
    productCard.classList.add("product-card");

    productCard.append(
      productImage,
      productTitle,
      productDescription,
      productPrice,
      productCategory,
    );

    fragment.appendChild(productCard);
  });

  productList.appendChild(fragment);
}

loadMoreButton.addEventListener("click", fetchProducts);

fetchProducts();

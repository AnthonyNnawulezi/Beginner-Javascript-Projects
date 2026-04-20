const productsContainer = document.querySelector(".products-container");
const loadMoreBtn = document.getElementById("loadMoreBtn");

async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    // console.log(data);
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

    productTitle.textContent = product.title;
    productThumbnail.src = product.thumbnail;
    productDescription.textContent = product.description;
    productPrice.textContent = `Price: $${product.price}`;

    productTitle.classList.add("product-title");
    productThumbnail.classList.add("product-thumbnail");
    productDescription.classList.add("product-description");
    productPrice.classList.add("product-price");
    productCard.classList.add("product-card");

    productCard.appendChild(productTitle);
    productCard.appendChild(productThumbnail);
    productCard.appendChild(productDescription);
    productCard.appendChild(productPrice);

    productsContainer.appendChild(productCard);
  });
}

fetchProducts();

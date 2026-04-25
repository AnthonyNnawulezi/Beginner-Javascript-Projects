const container = document.querySelector(".container");
const loadMoreBtn = document.getElementById("loadMore");

let currentPage = 0;
const LIMIT = 10;
const skip = currentPage * 10;

async function fetchProducts(currentPage) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`,
    );

    if (!response.ok) throw new Error("Error fetching products");

    const data = await response.json();

    if (data?.products?.length) {
      displayProducts(data.products);
    } else {
      ("<p>No Products to display</p>;");
    }
    console.log(data);
  } catch (error) {
    console.log(error, "Error fetching products");
  }
}

function displayProducts(products) {
  products.forEach(({ thumbnail, price, title, description }) => {
    const productCard = document.createElement("div");
    productCard.classList.add("productCard");
    productCard.innerHTML = `
    <img src="${thumbnail}" class='thumbnail' loading='lazy' alt='${title}'/>
    <p class='title'>${title}</p>
    <p class='price'>${price}</p>
    <h3 class='description'>${description}</h3>
    `;
    container.appendChild(productCard);
  });
}

fetchProducts();

loadMoreBtn.addEventListener("click", () => {
  currentPage += 1;
  fetchProducts(currentPage);
});

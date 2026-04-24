const container = document.getElementsByClassName(".container");
const loadMoreBtn = document.getElementById("loadMore");

let currentPage = 0;
const skip = currentPage * 10;

async function fetchProducts() {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${currentPage}&skip=${skip}`,
    );

    if (!response) throw new Error("Error fetching products");

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
  container.innerHTML = products.map(
    ({ thumbnail, price, title, description }) => `
    const productCard = document.createElement('div');
    productCard.classList.add('.productCard');
    <p class='thumbnail'>${thumbnail}</>
    <p class='price'>${price}</>
    <h3 class='description'>${description}</h3>
    `,
  );
}

fetchProducts();

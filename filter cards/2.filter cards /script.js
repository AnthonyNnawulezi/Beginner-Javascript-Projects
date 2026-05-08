const CATEGORIES = ["All", "Men", "Women", "Kids"];
const PRODUCTS = [
  { category: "Men", label: "men1" },
  { category: "Men", label: "men2" },
  { category: "Men", label: "men3" },
  { category: "Men", label: "men4" },
  { category: "Men", label: "men5" },
  { category: "Men", label: "men6" },
  { category: "Men", label: "men7" },
  { category: "Women", label: "women1" },
  { category: "Women", label: "women2" },
  { category: "Women", label: "women3" },
  { category: "Women", label: "women4" },
  { category: "Women", label: "women5" },
  { category: "Women", label: "women6" },
  { category: "Women", label: "women7" },
  { category: "Kids", label: "kids1" },
  { category: "Kids", label: "kids2" },
  { category: "Kids", label: "kids3" },
  { category: "Kids", label: "kids4" },
  { category: "Kids", label: "kids5" },
  { category: "Kids", label: "kids6" },
  { category: "Kids", label: "kids7" },
];

const buttonContainer = document.querySelector(".button-container");
const productContainer = document.querySelector(".products-container");

function renderCategories() {
  CATEGORIES.forEach((category) => {
    const button = document.createElement("button");
    button.classList.add("category");
    button.dataset.category = category.toLowerCase();
    button.textContent = category;
    buttonContainer.appendChild(button);
  });
}
function renderProducts() {
  PRODUCTS.forEach((product) => {
    const content = document.createElement("div");
    content.classList.add("product");
    content.dataset.product = product.category.toLowerCase();
    content.textContent = product.label;
    productContainer.appendChild(content);
  });
}

function filterProducts(selectedCategory) {
  const products = document.querySelectorAll(".product");
  const showAll = selectedCategory === "all";

  products.forEach((product) => {
    const category = product.dataset.product;
    const isMatch = category === selectedCategory;
    if (showAll || isMatch) {
      product.classList.remove("hide");
    } else {
      product.classList.add("hide");
    }
  });
}

function activateFilter() {
  const filterButton = document.querySelectorAll(".category");

  filterButton.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.category;
      filterButton.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      filterProducts(selectedCategory);
    });
  });
}

renderCategories();
renderProducts();
activateFilter();

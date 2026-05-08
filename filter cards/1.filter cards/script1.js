const CATEGORIES = ["All", "Men", "Women", "Kids"];

const PRODUCTS = [
  { category: "Men", label: "Men Shirt 1" },
  { category: "Men", label: "Men Shirt 2" },
  { category: "Men", label: "Men Shirt 3" },
  { category: "Men", label: "Men Shirt 4" },
  { category: "Men", label: "Men Shirt 5" },
  { category: "Men", label: "Men Shirt 6" },
  { category: "Men", label: "Men Shirt 7" },
  { category: "Women", label: "Women Shirt 1" },
  { category: "Women", label: "Women Shirt 2" },
  { category: "Women", label: "Women Shirt 3" },
  { category: "Women", label: "Women Shirt 4" },
  { category: "Women", label: "Women Shirt 5" },
  { category: "Women", label: "Women Shirt 6" },
  { category: "Women", label: "Women Shirt 7" },
  { category: "Kids", label: "Kids Shirt 1" },
  { category: "Kids", label: "Kids Shirt 2" },
  { category: "Kids", label: "Kids Shirt 3" },
  { category: "Kids", label: "Kids Shirt 4" },
  { category: "Kids", label: "Kids Shirt 5" },
  { category: "Kids", label: "Kids Shirt 6" },
  { category: "Kids", label: "Kids Shirt 7" },
];

const buttonContainer = document.querySelector(".button-container");
const contentContainer = document.querySelector(".content");

if (!buttonContainer || !contentContainer) {
  throw new Error("Missing DOM Elements not found.");
}

function renderCategories() {
  CATEGORIES.forEach((category) => {
    const button = document.createElement("button");
    button.classList.add("filter-button");
    button.dataset.category = category.toLowerCase();
    button.textContent = category;
    buttonContainer.appendChild(button);
  });
}

function renderProducts() {
  PRODUCTS.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("card");
    productCard.dataset.category = product.category.toLowerCase();
    productCard.textContent = product.label;
    contentContainer.appendChild(productCard);
  });
}

function filterProducts(selectedCategory) {
  const productCards = document.querySelectorAll(".card");
  const showAll = selectedCategory === "all";

  productCards.forEach((card) => {
    const category = card.dataset.category;
    const isMatch = category === selectedCategory;

    if (isMatch || showAll) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}

function activateFilter() {
  const filterButtons = document.querySelectorAll(".filter-button");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.category;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      filterProducts(selectedCategory);
    });
  });
}

function init() {
  renderCategories();
  renderProducts();
  activateFilter();
}

init();

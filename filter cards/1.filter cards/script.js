const categories = ["All", "Men", "Women", "Kids"];
const contentWrapper = document.querySelector(".content");
const contents = [
  {
    id: "Men",
    label: "Men Shirt 1",
  },
  {
    id: "Men",
    label: "Men Shirt 2",
  },
  {
    id: "Men",
    label: "Men Shirt 3",
  },
  {
    id: "Men",
    label: "Men Shirt 4",
  },
  {
    id: "Men",
    label: "Men Shirt 5",
  },
  {
    id: "Women",
    label: "Women Shirt 1",
  },
  {
    id: "Women",
    label: "Women Shirt 2",
  },
  {
    id: "Women",
    label: "Women Shirt 3",
  },
  {
    id: "Women",
    label: "Women Shirt 4",
  },
  {
    id: "Women",
    label: "Women Shirt 5",
  },
  {
    id: "Kids",
    label: "Kids Shirt 1",
  },
  {
    id: "Kids",
    label: "Kids Shirt 2",
  },
  {
    id: "Kids",
    label: "Kids Shirt 3",
  },
  {
    id: "Kids",
    label: "Kids Shirt 4",
  },
  {
    id: "Kids",
    label: "Kids Shirt 5",
  },
];

const container = document.querySelector(".container");

function createCategory() {
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.innerText = category;
    button.classList.add("filter-button");
    button.setAttribute("data-filter", category);
    container.appendChild(button);
  });
}

function createContent() {
  contents.forEach((content) => {
    const item = document.createElement("div");
    item.classList.add("card", content.id);
    item.textContent = content.label;
    contentWrapper.appendChild(item);
  });
}

createCategory();
createContent();

const allFilter = document.querySelectorAll(".filter-button");
const allCards = document.querySelectorAll(".filter-button");

function filterByCategory(currentCategory, allCards) {
  allCards.forEach((card) => {
    const showCards = currentCategory.toLowerCase() === "all";
    const itemsFiltered = !item.classList.containes(currentCategory);

    if (itemsFiltered && !showCards) {
      item.classList.add("hide");
    } else {
      item.classList.remove("hide");
    }
  });
}

allFilter.forEach((button) => {
  button.addEventListener("click", () => {
    const currentCategory = button.dataset.filter;

    console.log(currentCategory);

    filterByCategory(currentCategory, allCards);
  });
});

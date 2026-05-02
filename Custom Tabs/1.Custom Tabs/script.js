const container = document.querySelector(".container");
const contents = document.querySelectorAll(".content");
const tabs = document.querySelectorAll(".tab-button");

container.addEventListener("click", (event) => {
  console.log(event.target.dataset);
  const currentId = event.target.dataset.id;

  if (currentId) {
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    event.target.classList.add("active");

    contents.forEach((content) => {
      content.classList.remove("active");
    });
    const currentEl = document.getElementById(currentId);
    currentEl.classList.add("active");
  }
});

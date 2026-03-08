const accordionElement = document.querySelector(".accordion");

async function getComments() {
  try {
    const response = await fetch("https://dummyjson.com/comments");
    const data = await response.json();
    console.log(data);
    return data.comments; // Just return the array
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return [];
  }
}

getComments();

async function createAccordion() {
  comments = await getComments();
  accordionElement.innerHTML = comments
    .map(
      (comment) => `
      <div class="accordion-wrapper">
   <div class="accordion-header">
   <h3>${comment.user.fullName}</h3>
    <i class="fa-solid fa-arrow-up"></i>
   </div>
   <div class="accordion-content">${comment.body}</div>
  </div>
  `,
    )
    .join("");

  document.querySelectorAll(".accordion-header").forEach((item) => {
    item.addEventListener("click", () => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      } else {
        document
          .querySelectorAll(".active")
          .forEach((e) => e.classList.remove("active"));
        item.classList.add("active");
      }
    });
  });
}

createAccordion();

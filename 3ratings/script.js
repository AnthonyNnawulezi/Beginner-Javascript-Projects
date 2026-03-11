const stars = document.querySelectorAll(".fa-star-o");
const ratingValue = document.getElementById("rating-value");
let selectedRating = -1;

stars.forEach((star, index) => {
  star.dataset.rating = index + 1;
  star.addEventListener("mouseover", mouseOver);
  star.addEventListener("click", onClick);
  star.addEventListener("mouseleave", mouseLeave);
});

function mouseOver(event) {
  const currRating = event.currentTarget.dataset.rating;
  if (!currRating) return;
  else updateRating(currRating);
}

function updateRating(rating) {
  for (let i = 0; i < stars.length; i++) {
    if (i < rating) {
      stars[i].classList.replace("fa-star-o", "fa-star");
    } else {
      stars[i].classList.replace("fa-star", "fa-star-o");
    }
  }
}

function onClick(event) {
  const currRating = event.currentTarget.dataset.rating;
  selectedRating = currRating;
  updateRating(currRating);
  ratingValue.textContent = `You rated this ${currRating} out of 5`;
}

function mouseLeave() {
  updateRating(selectedRating);
}

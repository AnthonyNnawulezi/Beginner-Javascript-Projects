const stars = document.querySelectorAll(".fa-star-o");
const ratingValue = document.getElementById("rating-value");

let selectedRating = 0;

stars.forEach((star, index) => {
  star.dataset.rating = index + 1;
  star.addEventListener("mouseover", mouseOver);
  star.addEventListener("click", onClick);
  star.addEventListener("mouseleave", mouseLeave);
});

function mouseOver(e) {
  const currStar = Number(e.currentTarget.dataset.rating);
  updateUI(currStar);
}

function onClick(e) {
  const clicked = Number(e.currentTarget.dataset.rating);
  selectedRating = clicked === selectedRating ? 0 : clicked;
  updateUI(selectedRating);
  ratingValue.innerText = selectedRating
    ? `Your rating: ${selectedRating}`
    : "Your rating: 0";
}

function mouseLeave() {
  updateUI(selectedRating);
}

function updateUI(rating) {
  for (let i = 0; i < stars.length; i++) {
    if (i < rating) {
      stars[i].classList.add("fa-star");
    } else {
      stars[i].classList.remove("fa-star");
    }
  }
}

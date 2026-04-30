const wrapper = document.querySelector(".wrapper");
const button = document.querySelector(".refresh-button");
const loader = document.querySelector(".loader");

function toggleLoader(show) {
  if (show) {
    loader.style.display = "block";
    wrapper.style.display = "none";
  } else {
    loader.style.display = "none";
    wrapper.style.display = "block";
  }
}

function generateQuote() {
  toggleLoader(true);
  fetch("http://api.quotable.io/quotes/random")
    .then((response) => response.json())
    .then((result) => {
      toggleLoader(false);
      showQuote(result[0]);
    })
    .catch(() => {
      wrapper.innerHTML = "An error occurred while fetching the quote.";
      toggleLoader(false);
    });
}

function showQuote(quote) {
  wrapper.innerHTML = `
  <div class="quotes">
            <p class="quote">${quote.author}</p>
            <p class="quote">${quote.content}</p>
            <p class="quote">${quote.dateAdded}</p>
            <p class="quote">${quote.dateModified}</p>
            <p class="quote">${quote.tags?.[0] || "No tag"}</p>
            </div>
        `;
}

button.addEventListener("click", generateQuote);
generateQuote();

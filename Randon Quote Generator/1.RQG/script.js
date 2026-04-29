const wrapper = document.querySelector(".wrapper");

function generateQuote() {
  fetch("http://api.quotable.io/quotes/random")
    .then((response) => response.json())
    .then((result) => showQuote(result))
    .catch(() => {
      wrapper.innerHTML = "An error occurred while fetching the quote.";
    });
}

function showQuote(quotes) {
  wrapper.innerHTML = `
  <div class="quote">
            <p class="quote">${quotes.author}</p>
            <p class="quote">${quotes.content}</p>
            <p class="quote">${quotes.dateAdded}</p>
            <p class="quote">${quotes.dateModified}</p>
            <p class="quote">${quotes.tags[0]}</p>
            </div>
        `;
}

generateQuote();

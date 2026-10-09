const rqgContainer = document.querySelector(".rqg-container");
const refreshButton = document.querySelector(".refresh-button");
const loader = document.querySelector(".loader");
const quoteContainer = document.querySelector(".quote-container");
let loading = false;

async function fetchQuotes() {
  try {
    loading = true;
    loader.textContent = "Loading... Please wait!";
    const response = await fetch("https://dummyjson.com/quotes/random");

    if (!response.ok) throw new Error("Failed to fetch quotes", Error);

    const data = await response.json();

    const quotes = data ?? "";

    displayQuotes(quotes);
  } catch (error) {
    ("<p>Error loading quotes, {error}</p>");
  } finally {
    loading = false;
  }
}

function displayQuotes({ author, id, quote }) {
  quoteContainer.innerHTML = `
<div class="quote-wrapper">
<p>Author: ${author}</p>
<span>Author ID: ${id}</span>
<p>Quote: ${quote}</p>
</div>
`;
}

refreshButton.addEventListener("click", fetchQuotes);

fetchQuotes();

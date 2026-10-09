const refreshButton = document.querySelector(".refresh-button");
const loader = document.querySelector(".loading-message");
const quoteContainer = document.querySelector(".quote-container");
const errorMessage = document.querySelector(".error-message");
let isLoading = false;

const QUOTE_API_URL = "https://dummyjson.com/quotes/random";

async function loadRandomQuote() {
  if (isLoading) return;

  isLoading = true;
  refreshButton.disabled = true;
  //   loader.hidden = false;
  loader.style.display = "block";
  quoteContainer.textContent = "";

  try {
    isLoading = true;
    loader.textContent = "Loading... Please wait!";
    const response = await fetch(QUOTE_API_URL);

    if (!response.ok)
      throw new Error(`Failed to fetch quote. Status: ${response.status}`);

    const data = await response.json();

    displayQuotes(quotes);
  } catch (error) {
    errorMessage.textContent =
      "Sorry, we couldn't load a quote. Please try again.";
    errorMessage.hidden = false;
    // quoteContainer.textContent = `Error loading quote: ${error.message}`;
  } finally {
    isLoading = false;
    refreshButton.disabled = false;
    loader.hidden = true;
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

refreshButton.addEventListener("click", loadRandomQuote);

loadRandomQuote();

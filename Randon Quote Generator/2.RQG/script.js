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
  loader.hidden = false;
  //   loader.style.display = "block";
  //   loader.textContent = "Loading... Please wait!";

  try {
    const response = await fetch(QUOTE_API_URL);

    if (!response.ok)
      throw new Error(`Failed to fetch quote. Status: ${response.status}`);

    const quote = await response.json();

    displayQuote(quote);
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

function displayQuote({ author, id, quote }) {
  //  quoteContainer.innerHTML = "";
  //   quoteContainer.replaceChildren();

  const quoteWrapper = document.createElement("blockquote");
  const quoteAuthor = document.createElement("p");

  quoteWrapper.classList.add("quote-text");
  quoteAuthor.classList.add("quote-author");

  quoteWrapper.textContent = `“${quote}”`;
  quoteAuthor.textContent = `— ${author}`;

  quoteContainer.replaceChildren(quoteWrapper, quoteAuthor);
}

refreshButton.addEventListener("click", loadRandomQuote);

loadRandomQuote();

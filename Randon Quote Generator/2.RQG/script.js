const refreshBtn = document.querySelector(".refresh-button");
const quotesWrapper = document.querySelector(".quotes-wrapper");
const loader = document.querySelector(".loader");

// function toggleLoader(show) {
//   loader.classList.toggle("hidden", !show);
//   quotesWrapper.classList.toggle("hidden", show);
// }
function toggleLoader(show) {
  loader.style.display = show ? "block" : "none";
  quotesWrapper.style.display = show ? "none" : "block";
}

async function generateQuote() {
  try {
    toggleLoader(true);
    const response = await fetch("http://api.quotable.io/quotes/random");

    if (!response.ok) {
      console.error("Error", response.status, response.statusText);
    }

    const result = await response.json();
    // console.log(result);
    showQuote(result[0]);
  } catch (error) {
    (error, "Error fetching data");
  } finally {
    toggleLoader(false);
  }
}

function showQuote(data) {
  console.log(data);

  const {
    author = "",
    authorSlug = "",
    content = "No content",
    dateAdded = "",
    tags = [],
  } = data;

  quotesWrapper.innerHTML = `
<p>Author: ${author}</p>
<p>Slug: ${authorSlug}</p>
<p>Content: ${content}</p>
<p>Date Added: ${dateAdded.slice(0, 10)}</p>
<p>Tags: ${tags[0]}</p>
`;
}

function init() {
  if (!refreshBtn || !quotesWrapper) {
    ("Refer back to missing DOM elements");
  }

  refreshBtn.addEventListener("click", generateQuote);

  generateQuote();
}

init();

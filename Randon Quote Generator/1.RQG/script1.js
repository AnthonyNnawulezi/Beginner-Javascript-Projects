const wrapper = document.querySelector(".wrapper");
const button = document.querySelector(".refresh-button");
const loader = document.querySelector(".loader");

if (!wrapper || !button || !loader) {
  console.error("Required DOM elements are missing. Check your HTML.");
  return;
}

function toggleLoader(show) {
  loader.classList.toggle("hidden", !show);
  wrapper.classList.toggle("hidden", show);
}

//or
// function toggleLoader(show) {
//   loader.style.display = show ? "block" : "none";
//   wrapper.style.display = show ? "none" : "block";
// }

function showQuote(quote) {
  const {
    author = "Unknown",
    content = "No content available",
    dateAdded = "",
    dateModified = "",
    tags = [],
  } = quote;

  wrapper.innerHTML = `
    <div class="quotes">
      <p class="quote"><strong>Author:</strong> ${author}</p>
      <p class="quote"><strong>Quote:</strong> ${content}</p>
      <p class="quote"><strong>Added:</strong> ${dateAdded.slice(0, 10)}</p>
      <p class="quote"><strong>Modified:</strong> ${dateModified.slice(0, 10)}</p>
      <p class="quote"><strong>Tag:</strong> ${tags[0] || "None"}</p>
    </div>
  `;
}

async function generateQuote() {
  try {
    toggleLoader(true);
    wrapper.innerHTML = "";

    const response = await fetch("http://api.quotable.io/quotes/random");

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    // 16. Guard against empty or malformed array responses
    if (!Array.isArray(result) || result.length === 0) {
      throw new Error("API returned an empty result.");
    }
  } catch (error) {}
}

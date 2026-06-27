const scrollProgress = document.querySelector(".track-bar");
const postContainer = document.querySelector(".post-container");

async function fetchPosts() {
  try {
    const response = await fetch("https://dummyjson.com/posts");

    if (!response.ok) {
      throw new Error(`HTTP error — status: ${response.status}`);
    }

    const { posts = [] } = await response.json();

    renderPosts(posts);
  } catch (error) {
    console.error(error);
    postContainer.innerHTML = `<p class="error">Failed to load posts: ${error.message}</p>`;
  }
}

function renderPosts(posts) {
  const postsHTML = posts
    .map(({ title, body, tags = [] }) => {
      const tagsHTML = tags.length
        ? `<div class="tags">${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>`
        : "";

      return `
        <article class="post">
          <h3></h3>
          <p></p>
          <div class="tags">${tagsHTML}</div>
        </article>
      `;
    })
    .join("");

  postContainer.insertAdjacentHTML("beforeend", postsHTML);
  //    postContainer.innerHTML = postsHTML;

  const postElements = postContainer.querySelectorAll(".post");
  posts.forEach(({ title, body }, index) => {
    postElements[index].querySelector("h3").textContent = title;
    postElements[index].querySelector("p").textContent = body;
  });
}

fetchPosts();

window.onscroll = function () {
  handleScroll();
};

function handleScroll() {
  const scrolledFromTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const percentageScrolled = (scrolledFromTop / height) * 100;
  scrollProgress.style.width = `${percentageScrolled}%`;
}

const trackBar = document.querySelector(".track-bar");
const postContainer = document.querySelector(".post-container");

async function fetchPosts() {
  try {
    const response = await fetch("https://dummyjson.com/posts");
    const posts = await response.json();
    initPosts(posts.posts ?? []);
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}

function initPosts(posts) {
  const post = posts
    .map(
      ({ title, body, tags = [] }) =>
        `
<div>
        <h3>${title}</h3>
        <p>${body}</p>
        ${tags.map((tag) => `<p>${tag}</p>`).join("")}
    </div>
        `,
    )
    .join("");

  postContainer.innerHTML += post;
}

fetchPosts();

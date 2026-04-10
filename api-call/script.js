const postsContainer = document.querySelector(".posts-container");

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((posts) => {
    showPosts(posts);
  })
  .catch((error) => console.error("Error fetching posts:", error));

function showPosts(posts) {
  postsContainer.innerHTML = posts
    .map(
      (post) => `
 <div class="post">
   <h3>${post.title}</h3>
   <p>${post.body}</p>
    </div>
 `,
    )
    .join("");
}

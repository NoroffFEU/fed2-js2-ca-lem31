import "./css/style.css";

import router from "./js/router/index.js";

await router(window.location.pathname);

export function populateEditForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (postId) {
    // Fetch the post data from your data source using the postId
    fetch(`/api/posts/${postId}`)
      .then((response) => response.json())
      .then((post) => {
        // Populate the form fields with the post data
        document.querySelector("title").value = post.title;
        document.querySelector("body").value = post.body;
        // Add more fields as necessary
      })
      .catch((error) => console.error("Error fetching post:", error));
  }
}

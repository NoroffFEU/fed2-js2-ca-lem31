import { authGuard } from "../../utilities/authGuard";

import { createEditFormHTML } from "../../ui/post/update.js";
import { API_KEY } from "../../api/constants.js";

authGuard();

// Add this new file to handle the edit post page logic
async function initEditPostPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  console.log("Post ID:", postId);

  if (!postId) {
    console.error("No post ID found in URL");
    return;
  }

  try {
    console.log(`Fetching post with ID: ${postId}`);
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts/${postId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const post = await response.json();
    console.log("Post data:", post);

    localStorage.setItem("clickedPost", JSON.stringify(post));

    createEditFormHTML(post);
  } catch (error) {
    console.error("Error fetching post data:", error);
  }
}

initEditPostPage();

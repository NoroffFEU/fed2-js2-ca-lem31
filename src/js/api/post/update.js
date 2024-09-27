import { API_KEY } from "../constants";

export async function populateEditForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (postId) {
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/social/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "X-Noroff-API-Key": API_KEY,
          },
        }
      );
      const post = await response.json();

      document.querySelector("#title").value = post.data.title;
      document.querySelector("#body").value = post.data.body;
      document.querySelector("#tags").value = post.data.tags.join(", ");
      document.querySelector("#media").value = post.data.media.url;
      document.querySelector("#alt").value = post.data.media.alt;
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }
}

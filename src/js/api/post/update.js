import { headers } from "../headers.js";

/**
 *
 * Fetches the post data from the API and then
 * populates the edit form with the post data.
 *
 * @async
 * @function populateEditForm
 * @returns {Promise<void>} A promise that resolves
 * when the form is populated with the post data or
 * rejects the request if an error occurs.
 * @throws Will throw an error if the fetch request fails.
 *
 * @example
 * // Example of how to call the populateEditForm function
 * import { populateEditForm }
 * from "./path/to/api/post/update.js";
 *
 * populateEditForm();
 */

export async function populateEditForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (postId) {
    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/social/posts/${postId}`,
        {
          headers: headers(),
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

/**
 * Gets post ID from URL and updates the post using the
 * form data.
 *
 * @function updatePost
 * @returns {void}
 * @example
 * // Example of how to call the updatePost function
 *
 * import { updatePost } from "./path/to/api/post/update.js";
 *
 * updatePost();
 */
export function updatePost() {
  document
    .querySelector("#update-post-button")
    .addEventListener("click", async (event) => {
      event.preventDefault();

      const postId = new URLSearchParams(window.location.search).get("id");
      const title = document.querySelector("#title").value;
      const body = document.querySelector("#body").value;
      const tags = document
        .querySelector("#tags")
        .value.split(",")
        .map((tag) => tag.trim());
      const mediaUrl = document.querySelector("#media").value;
      const mediaAlt = document.querySelector("#alt").value;

      const updatedPost = {
        title,
        body,
        tags,
        media: {
          url: mediaUrl,
          alt: mediaAlt,
        },
      };

      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/social/posts/${postId}`,
          {
            method: "PUT",
            headers: headers(),
            body: JSON.stringify(updatedPost),
          }
        );

        if (response.ok) {
          alert("Post updated successfully!");
          window.location.href = `/profile/`;
        } else {
          const errorData = await response.json();
          console.error("Error updating post:", errorData);
          alert("Failed to update post. Please try again.");
        }
      } catch (error) {
        console.error("Error updating post:", error);
        alert("An error occurred while updating the post. Please try again.");
      }
    });
}

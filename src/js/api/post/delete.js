import { GET_POST_API } from "../constants";
import { handleError } from "./create.js";
import { headers } from "../headers.js";

/**
 * Removes a post from the API by sending a DELETE request to
 * the GET_POST_API endpoint with the post ID as a parameter.
 *
 * @async
 * @function removePostFromAPI
 * @param {string} postId
 *
 * @returns {Promise<void>} A promise that resolves
 * when the post is deleted or rejects the request if
 * an error occurs.
 *
 * @throws Will throw an error if the fetch request fails.
 *
 *
 * @example
 * // Example of how to call the removePostFromAPI function
 * import { removePostFromAPI }
 * from "./path/to/api/post/delete.js";
 *
 * const POST_ID = "123";
 * removePostFromAPI(POST_ID);
 *
 */

export async function removePostFromAPI(postId) {
  try {
    const RESPONSE = await fetch(`${GET_POST_API}${postId}`, {
      method: "DELETE",
      headers: headers(),
    });

    if (RESPONSE.ok) {
      alert("Post deleted successfully");
      window.location.href = "/profile/";
    } else {
      const ERROR_DATA = await RESPONSE.json();
      throw new Error(ERROR_DATA.message || "Failed to delete post");
    }
  } catch (error) {
    handleError(error);
  }
}

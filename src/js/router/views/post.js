import { getSinglePost } from "../../api/post/read.js";

/**
 * This function retrieves a post ID from the URL and calls the getSinglePost function.
 * @function retrievePostID
 * @returns {void}
 * @example
 * retrievePostID();
 *
 */
export function retrievePostID() {
  const PARAMS = new URLSearchParams(window.location.search);
  const POST_ID = PARAMS.get("id");

  if (POST_ID !== null) {
    getSinglePost(POST_ID);
  } else {
    console.error("No post ID found in URL");
  }
}

retrievePostID();

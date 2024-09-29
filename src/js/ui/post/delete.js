import { removePostFromAPI } from "../../api/post/delete";

/**
 * This function sets the POST_ID constant and calls
 * the removePostFromAPI function.
 *
 * @param {Event} event - The click event.
 *
 * @returns {void}
 *
 * @example
 * document.addEventListener("click", deletePost);
 *
 */
export function deletePost(event) {
  const POST_ID = event.target.dataset.id;
  removePostFromAPI(POST_ID);
}

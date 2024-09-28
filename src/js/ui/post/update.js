/**
 * This function sets the POST_ID constant by getting the closest
 * parent element with the class of "my-post" and then displays the post ID
 * in the URL on the edit page.
 *
 * @function displayPostIDInURLOnEditPage
 *
 * @param {Event} event - The click event.
 *
 * @returns {void}
 *
 * @example
 *
 * const VIEW_POST_BUTTON = document.getElementById("view-post");
 * VIEW_POST_BUTTON.addEventListener("click", displayPostIDInURLOnEditPage);
 *
 *
 */

export function displayPostIDInURLOnEditPage(event) {
  const POST_ID = event.target.closest(".my-post").dataset.id;
  window.location.href = `/post/edit/?id=${POST_ID} `;
}

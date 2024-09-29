import { getCreatePostDataAndSendToAPI } from "../../api/post/create";

/**
 * This function retrieves the create post form from the document,
 * and adds an event listener to it.
 * The event listener listens for the create post form submission event
 * and then calls the getCreatePostDataAndSendToAPI function.
 *
 * @function onCreatePost
 *
 * @returns {void}
 *
 * @example
 * onCreatePost();
 *
 */

export function onCreatePost() {
  const CREATE_POST_FORM = document.getElementById("create-form");
  if (CREATE_POST_FORM) {
    CREATE_POST_FORM.addEventListener("submit", (event) =>
      getCreatePostDataAndSendToAPI(event)
    );
  }
}

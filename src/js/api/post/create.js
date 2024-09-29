import { CREATE_POST_API } from "../constants.js";
import { ERROR_MESSAGE } from "../constants.js";
import { headers } from "../headers.js";
import { CREATE_POST_FORM } from "../constants.js";

/**
 * Fetches the post data from the create post form
 * and sends it to the API to create a new post.
 *
 * @async
 * @function getCreatePostDataAndSendToAPI
 * @param {*} event
 *
 * @returns {Promise<void>} A promise that resolves when
 * the post is created or the request is rejected
 * if an error occurs.
 *
 * @throws Will throw an error if the fetch request fails.
 *
 * @example
 * // Example of how to call the getCreatePostDataAndSendToAPI
 * function
 * import { getCreatePostDataAndSendToAPI }
 * from "./path/to/api/post/create.js";
 *
 * const CREATE_POST_FORM = document.getElementById("create-post-form");
 *
 * CREATE_POST_FORM.addEventListener("submit",
 * getCreatePostDataAndSendToAPI);
 */

export async function getCreatePostDataAndSendToAPI(event) {
  event.preventDefault();
  try {
    const CREATE_POST_REQUEST_BODY = createRequestBody(CREATE_POST_FORM);
    await sendRequestToAPI(CREATE_POST_REQUEST_BODY);
  } catch (error) {
    handleError(error);
  }
}

/**
 * Creates a request body object using the form data from the
 * create post form.
 *
 * @function createRequestBody
 * @param {*} CREATE_POST_FORM
 * @returns  {Object} A request body object
 *
 * @example
 * // Example of how to call the createRequestBody function
 * import { createRequestBody } from "./path/to/api/post/create.js";
 *
 * const CREATE_POST_FORM = document.getElementById("create-post-form");
 *
 * const REQUEST_BODY = createRequestBody(CREATE_POST_FORM);
 */

function createRequestBody(CREATE_POST_FORM) {
  const FORM_OBJECT = new FormData(CREATE_POST_FORM);
  const FORM_DATA = Object.fromEntries(FORM_OBJECT);
  const TAGS_ARRAY = FORM_DATA.tags.split(",").map((tag) => tag.trim());
  const media = FORM_DATA.media
    ? { url: FORM_DATA.media, alt: FORM_DATA.alt }
    : null;
  return {
    title: FORM_DATA.title,
    body: FORM_DATA.body,
    tags: TAGS_ARRAY,
    media: media,
  };
}

/**
 * @async
 * @function sendRequestToAPI
 * @param {*} CREATE_POST_REQUEST_BODY
 *
 * @returns {Promise<void>} A promise that resolves when
 * the post is created or the request is rejected
 *  if an error occurs.
 *
 * @throws Will throw an error if the fetch request fails.
 *
 * @example
 *
 * // Example of how to call the sendRequestToAPI function
 * import { sendRequestToAPI }
 * from "./path/to/api/post/create.js";
 *
 * const CREATE_POST_REQUEST_BODY = {
 *  title: "My post",
 * body: "This is my post",
 * tags: ["tag1", "tag2"],
 * media: {
 * url: "https://example.com/image.jpg",
 * alt: "Image description",
 * }
 *
 * sendRequestToAPI(CREATE_POST_REQUEST_BODY);
 */

async function sendRequestToAPI(CREATE_POST_REQUEST_BODY) {
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  if (!ACCESS_TOKEN) {
    throw new Error("No access token found. Please log in.");
  }
  try {
    const RESPONSE = await fetch(CREATE_POST_API, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(CREATE_POST_REQUEST_BODY),
    });

    if (!RESPONSE.ok) {
      throw new Error("Failed to create post");
    }

    const DATA = await RESPONSE.json();
    alert("Post created successfully");
    window.location.href = "/profile/";
    return DATA;
  } catch (error) {
    handleError(error);
  }
}

export function handleError(error) {
  console.error("Error:", error);
  if (ERROR_MESSAGE) {
    ERROR_MESSAGE.textContent = `Error: ${
      error.message || "Something went wrong"
    }`;
  } else {
    alert(`Error: ${error.message || "Something went wrong"}`);
  }
}

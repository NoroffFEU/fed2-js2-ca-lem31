import { headers } from "../headers";

/**
 * Fetches an individual post from the API, using the
 * POST_ID parameter and displays it on the post page.
 * @async
 * @function getSinglePost
 * @param {string} POST_ID
 *
 * @returns {Promise<void>} A promise that resolves when
 * the individual post is fetched and displayed
 * else rejects if an error occurs.
 *
 * @throws Will throw an error if the fetch request fails.
 *
 * @example
 * //Example of how to call the getSinglePost function
 * import { getSinglePost } from "./path/to/api/post/read.js";
 *
 * const PARAMS = new URLSearchParams(window.location.search);
 * const POST_ID = PARAMS.get("id");
 * getSinglePost(POST_ID);
 *
 * // OR
 *
 * import { getSinglePost } from "./path/to/api/post/read.js";
 *
 * const POST_ID = "123";
 *
 * getSinglePost(POST_ID);
 *
 */
export async function getSinglePost(POST_ID) {
  try {
    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    if (!ACCESS_TOKEN) {
      throw new Error("No access token found. Please log in.");
    }

    const RESPONSE = await fetch(
      `https://v2.api.noroff.dev/social/posts/${POST_ID}`,
      {
        method: "GET",
        headers: headers(),
      }
    );

    if (!RESPONSE.ok) {
      console.error("HTTP error response:", RESPONSE);
      throw new Error(`HTTP error! status: ${RESPONSE.status || "unknown"}`);
    }

    const DATA = await RESPONSE.json();

    const POST = JSON.stringify(DATA);

    displaySinglePost(POST);
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

/**
 * Displays an individual post on the post page by parsing
 * the post data and dynamically creating the
 * necessary HTML elements.
 *
 * @function displaySinglePost
 * @param {string} post
 *
 * @returns {void} Displays the individual post on the page
 *
 * @example
 * //Example of how to call the displaySinglePost function
 *
 *
 * const DATA = await RESPONSE.json();
 * const POST = JSON.stringify(DATA);
 *
 * displaySinglePost(POST);
 *
 * // OR
 *
 * const POST = {
 * title: "My post",
 * body: "This is my post",
 * tags: ["tag1", "tag2"],
 * media: {
 * url: "https://example.com/image.jpg",
 * alt: "Image description",
 * }
 * }
 *
 * displaySinglePost(POST);
 */

function displaySinglePost(post) {
  const CONTAINER_WRAPPER = document.getElementById("post-container-wrapper");

  if (!CONTAINER_WRAPPER) {
    console.error("Post container wrapper element not found");
    return;
  }
  const POST_CONTAINER = document.createElement("div");
  POST_CONTAINER.className = "post-container";

  if (!POST_CONTAINER) {
    console.error("Post container element not found");
    return;
  }

  POST_CONTAINER.innerHTML = "";
  post = JSON.parse(post);
  const POST_TITLE = document.createElement("h2");
  const POST_BODY = document.createElement("p");
  const POST_TAGS = document.createElement("p");
  const POST_IMAGE = document.createElement("img");

  POST_IMAGE.className = "post-image";

  POST_TITLE.textContent = post.data.title || "No title available";
  POST_BODY.textContent = post.data.body || "No content available";
  POST_TAGS.textContent = Array.isArray(post.data.tags)
    ? post.data.tags.join(", ")
    : "No tags available";
  if (post.data.media && post.data.media.url) {
    POST_IMAGE.src = post.data.media.url;
  } else {
    POST_IMAGE.alt = "No image available";
  }

  POST_CONTAINER.appendChild(POST_TITLE);
  POST_CONTAINER.appendChild(POST_BODY);
  POST_CONTAINER.appendChild(POST_TAGS);
  POST_CONTAINER.appendChild(POST_IMAGE);

  CONTAINER_WRAPPER.appendChild(POST_CONTAINER);
}

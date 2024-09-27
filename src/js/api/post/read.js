import { API_KEY } from "../constants";
import { ACCESS_TOKEN } from "../constants";

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
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "X-Noroff-API-Key": API_KEY,
        },
      }
    );

    if (!RESPONSE.ok) {
      console.error("HTTP error response:", RESPONSE);
      throw new Error(`HTTP error! status: ${RESPONSE.status || "unknown"}`);
    }

    const DATA = await RESPONSE.json();
    console.log(DATA);

    const POST = JSON.stringify(DATA);
    console.log(POST);

    displaySinglePost(POST);
  } catch (error) {
    console.error("Error fetching post:", error);
  }
}

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

  console.log(post);

  CONTAINER_WRAPPER.appendChild(POST_CONTAINER);
}

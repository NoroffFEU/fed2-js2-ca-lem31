import { authGuard } from "../../utilities/authGuard.js";
import { displayPostIDInURLOnEditPage } from "../../ui/post/update.js";
import { logout } from "../../ui/global/logout.js";
import { deletePost } from "../../ui/post/delete.js";
import { headers } from "../../api/headers.js";

authGuard();
logout();

// Create all posts elements class/function

/**
 * Creates the html elements for all posts on the home page.
 * @class CreateAllPostElements
 * @param {object} post - The post object from the API.
 * @param {HTMLElement} container - The container to append the 
 * post elements to.
 * @returns {HTMLElement} The container with the post elements.
 * 
 * @example
 * async function fetchPosts() {
 * const response = await fetch("https://v2.api.noroff.dev/social/posts");
 * const data = await response.json();
 * const posts = data.data;
 * const postsContainer = document.getElementById("posts-container");
 * posts.forEach(post => {
 * new CreateAllPostElements(post, postsContainer);
 * }
 * 
 
 */

export class CreateAllPostElements {
  constructor(post, container) {
    const INDIVIDUAL_POST_CONTAINER = document.createElement("div");
    INDIVIDUAL_POST_CONTAINER.classList.add("individual-post-box");

    const POST_TITLE = document.createElement("h2");
    const POST_BODY = document.createElement("p");
    const POST_TAGS = document.createElement("p");
    const POST_IMAGE = document.createElement("img");

    POST_IMAGE.classList.add("post-image");

    const VIEW_POST_BUTTON = document.createElement("button");
    VIEW_POST_BUTTON.textContent = "View post";

    POST_TITLE.textContent = post.title || "No title available";
    POST_BODY.textContent = post.body || "No content available";
    POST_TAGS.textContent = post.tags
      ? post.tags.join(", ")
      : "No tags available";
    if (post.media?.url) {
      POST_IMAGE.src = post.media.url;
    } else {
      POST_IMAGE.alt = "No image available";
    }

    INDIVIDUAL_POST_CONTAINER.appendChild(POST_TITLE);
    INDIVIDUAL_POST_CONTAINER.appendChild(POST_BODY);
    INDIVIDUAL_POST_CONTAINER.appendChild(POST_TAGS);
    INDIVIDUAL_POST_CONTAINER.appendChild(POST_IMAGE);
    INDIVIDUAL_POST_CONTAINER.appendChild(VIEW_POST_BUTTON);

    container.appendChild(INDIVIDUAL_POST_CONTAINER);

    POST_IMAGE.addEventListener("click", () => {
      window.location.href = `/post/?id=${post.id}`;
    });

    VIEW_POST_BUTTON.addEventListener("click", () => {
      window.location.href = `/post/?id=${post.id}`;
    });

    return INDIVIDUAL_POST_CONTAINER;
  }
}

/**
 * Creates the html elements for the posts on the my posts page.
 * @class CreateMyPostsElements
 * @param {object} post - The post object from the API.
 * @param {HTMLElement} container - The container to append the
 * post elements to.
 * @returns {HTMLElement} The container with the post elements.
 *
 * @example
 * async function fetchPosts() {
 * const response = await fetch("https://v2.api.noroff.dev/social/posts");
 * const data = await response.json();
 * const posts = data.data;
 * const postsContainer = document.getElementById("posts-container");
 * posts.forEach(post => {
 * new CreateMyPostsElements(post, postsContainer);
 * }
 */

export class CreateMyPostsElements extends CreateAllPostElements {
  constructor(post, container) {
    const INDIVIDUAL_POST_CONTAINER = super(post, container);

    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const POST_CONTAINER = document.createElement("div");

    INDIVIDUAL_POST_CONTAINER.classList.add("my-post");

    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";

    INDIVIDUAL_POST_CONTAINER.dataset.id = post.id;

    editButton.addEventListener("click", (event) => {
      displayPostIDInURLOnEditPage(event);
    });
    deleteButton.dataset.id = post.id;
    editButton.classList.add("edit-button");

    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", deletePost);

    POST_CONTAINER.appendChild(editButton);
    POST_CONTAINER.appendChild(deleteButton);
    INDIVIDUAL_POST_CONTAINER.appendChild(POST_CONTAINER);

    return INDIVIDUAL_POST_CONTAINER;
  }
}

/**
 * Fetches all posts with the tag "MEYERAPP" from the API
 * and displays the latest 12 posts
 * on the home page by slicing the data array.
 * @function getAllPosts
 * @returns {void}
 *
 * @throws {Error} No access token found. Please log in.
 * @throws {Error} HTTP error! status: ${RESPONSE.status || "unknown"}
 *
 * @example
 * //Example of how to call the function
 * getAllPosts();
 */

export async function getAllPosts() {
  try {
    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    if (!ACCESS_TOKEN) {
      throw new Error("No access token found. Please log in.");
    }

    const RESPONSE = await fetch(
      "https://v2.api.noroff.dev/social/posts?_tag=MEYERAPP",
      {
        method: "GET",
        headers: headers(),
      }
    );

    if (!RESPONSE.ok) {
      console.error("HTTP error response:", RESPONSE);
      throw new Error(`HTTP error! status: ${RESPONSE.status || "unknown"}`);
    }

    const data = await RESPONSE.json();
    const posts = data.data
      .sort((a, b) => new Date(b.created) - new Date(a.created))
      .slice(0, 12);

    localStorage.setItem("posts", JSON.stringify(data.data));

    const POSTS_CONTAINER = document.getElementById("posts-container");
    if (POSTS_CONTAINER) {
      POSTS_CONTAINER.innerHTML = "";
      posts.forEach((post) => {
        try {
          new CreateAllPostElements(post, POSTS_CONTAINER);
        } catch (error) {
          console.error("Error creating post elements:", error, post);
        }
      });
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

getAllPosts();

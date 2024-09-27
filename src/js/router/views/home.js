import { authGuard } from "../../utilities/authGuard.js";
import { API_KEY } from "../../api/constants.js";
import { displayPostIDInURLOnEditPage } from "../../ui/post/update.js";
import { logout } from "../../ui/global/logout.js";
import { deletePost } from "../../ui/post/delete.js";
import { GET_POST_API } from "../../api/constants.js";

authGuard();
logout();

// Create all posts elements class/function
export class CreateAllPostElements {
  constructor(post, container) {
    const INDIVIDUAL_POST_CONTAINER = document.createElement("div");

    const POST_TITLE = document.createElement("h2");
    const POST_BODY = document.createElement("p");
    const POST_TAGS = document.createElement("p");
    const POST_IMAGE = document.createElement("img");

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

    container.appendChild(INDIVIDUAL_POST_CONTAINER);

    POST_IMAGE.addEventListener("click", () => {
      window.location.href = `/post/?id=${post.id}`;
    });

    return INDIVIDUAL_POST_CONTAINER;
  }
}

//Create my posts elements class/function

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
//GET POSTS FUNCTION

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

    const data = await RESPONSE.json();
    console.log("Fetched data:", data);
    const posts = data.data.slice(-12);

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

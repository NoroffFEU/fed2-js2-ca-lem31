import { authGuard } from "../../utilities/authGuard.js";
import { API_KEY } from "../../api/constants.js";
import { displayPostIDInURLOnEditPage } from "../../ui/post/update.js";
import { logout } from "../../ui/global/logout.js";
import { deletePost } from "../../ui/post/delete.js";

authGuard();
logout();

// Create all posts elements class/function
export class CreateAllPostElements {
  constructor(post) {
    const POSTS_CONTAINER = document.getElementById("posts-container");

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

    POSTS_CONTAINER.appendChild(INDIVIDUAL_POST_CONTAINER);

    POST_IMAGE.addEventListener("click", () => {
      window.location.href = `post.html?id=${post.id}`;
    });

    return INDIVIDUAL_POST_CONTAINER;
  }
}

//Create my posts elements class/function

export class CreateMyPostsElements extends CreateAllPostElements {
  constructor(post) {
    const INDIVIDUAL_POST_CONTAINER = super(post);

    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const POST_CONTAINER = document.createElement("div");

    INDIVIDUAL_POST_CONTAINER.classList.add("my-post");

    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";

    INDIVIDUAL_POST_CONTAINER.dataset.id = post.id;

    editButton.addEventListener("click", (event) => {
      // const POST_ID = event.target.closest(".my-post").dataset.id;
      // window.location.href = `/post/edit/?id=${POST_ID}`;

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

// Get Posts function
export async function getPosts(
  apiEndpoint,
  filterTag = null,
  showRecent = false,
  myPosts = false
) {
  try {
    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    if (!ACCESS_TOKEN) {
      throw new Error("No access token found. Please log in.");
    }

    const RESPONSE = await fetch(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });
    const posts = await RESPONSE.json();
    console.log(posts);

    const allUsersPosts = posts.data || [];

    let filteredPosts = allUsersPosts;

    localStorage.setItem("posts", JSON.stringify(filteredPosts));

    if (filterTag) {
      filteredPosts = filteredPosts.filter((post) =>
        post.tags.includes(filterTag)
      );
    }

    if (showRecent) {
      filteredPosts = filteredPosts.slice(0, 12);
    }

    filteredPosts.forEach((post) => {
      if (myPosts) {
        new CreateMyPostsElements(post);
      } else {
        new CreateAllPostElements(post);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

localStorage.getItem("accessToken");
console.log("Access Token:", localStorage.getItem("accessToken"));

getPosts("https://v2.api.noroff.dev/social/posts", "MEYERAPP", false, true);

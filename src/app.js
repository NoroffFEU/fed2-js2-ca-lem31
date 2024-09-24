// import "./css/style.css";

import router from "./js/router/index.js";

await router(window.location.pathname);

import { API_KEY } from "./js/api/constants.js";

//Create all posts elements class/function
export class CreateAllPostElements {
  constructor(post) {
    const POSTS_CONTAINER = document.getElementById("my-profile-posts");

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

    const EDIT_BUTTON = document.createElement("button");
    const DELETE_BUTTON = document.createElement("button");
    const POST_CONTAINER = document.createElement("div");

    EDIT_BUTTON.textContent = "Edit";
    DELETE_BUTTON.textContent = "Delete";

    EDIT_BUTTON.dataset.id = post.id;
    DELETE_BUTTON.dataset.id = post.id;

    EDIT_BUTTON.classList.add("edit-button");
    DELETE_BUTTON.classList.add("delete-button");

    EDIT_BUTTON.addEventListener("click", () => displayEditForm(post));
    DELETE_BUTTON.addEventListener("click", () =>
      getSpecifiedFormDataAndSendToAPI(
        new Event("submit"),
        null,
        "delete",
        post.id
      )
    );

    POST_CONTAINER.appendChild(EDIT_BUTTON);
    POST_CONTAINER.appendChild(DELETE_BUTTON);
    INDIVIDUAL_POST_CONTAINER.appendChild(POST_CONTAINER);

    return INDIVIDUAL_POST_CONTAINER;
  }
}

//Get Posts function

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
    const POSTS = await RESPONSE.json();
    console.log(POSTS);

    const ALL_USERS_POSTS = POSTS.data || [];

    let filteredPosts = ALL_USERS_POSTS;

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

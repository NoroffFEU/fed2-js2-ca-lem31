import { authGuard } from "../../utilities/authGuard.js";
import { USER_POSTS_API } from "../../api/constants.js";
import { CreateMyPostsElements } from "./home.js";
import { headers } from "../../api/headers.js";

//MY POSTS CONSTANTS AND FUNCTIONS

authGuard();

export async function getUserPosts() {
  try {
    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    if (!ACCESS_TOKEN) {
      throw new Error("No access token found. Please log in.");
    }

    const RESPONSE = await fetch(USER_POSTS_API, {
      method: "GET",
      headers: headers(),
    });

    if (!RESPONSE.ok) {
      console.error("HTTP error response:", RESPONSE);
      throw new Error(`HTTP error! status: ${RESPONSE.status || "unknown"}`);
    }

    const data = await RESPONSE.json();
    console.log("Fetched data:", data);

    const posts = data.data;

    localStorage.setItem("posts", JSON.stringify(posts));

    const POSTS_CONTAINER = document.getElementById("my-posts-container");
    if (POSTS_CONTAINER) {
      POSTS_CONTAINER.innerHTML = ""; // Clear the container
      posts.forEach((post) => {
        try {
          new CreateMyPostsElements(post, POSTS_CONTAINER);
        } catch (error) {
          console.error("Error creating post elements:", error, post);
        }
      });
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

getUserPosts();

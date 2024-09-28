import { headers } from "../headers.js";
import { API_PROFILE } from "../constants.js";

export async function getUserProfile() {
  try {
    const USER = JSON.parse(localStorage.getItem("user"));
    const NAME = USER ? USER.name : null;
    if (!NAME) {
      throw new Error("User name not found in local storage.");
    }
    const RESPONSE = await fetch(`${API_PROFILE}${NAME}`, {
      method: "GET",
      headers: headers(),
    });

    if (!RESPONSE.ok) {
      console.error("HTTP error response:", RESPONSE);
      throw new Error(`HTTP error! status: ${RESPONSE.status || "unknown"}`);
    }

    const data = await RESPONSE.json();

    const PROFILE = data.data || {};

    displayUserProfile(PROFILE);

    console.log("Fetched data:", data);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function displayUserProfile(PROFILE) {
  const USER_PROFILE = document.getElementById("my-profile");
  const USER_NAME = document.createElement("h2");
  const USER_EMAIL = document.createElement("p");
  const BIO = document.createElement("p");
  const BANNER = document.createElement("img");
  const AVATAR = document.createElement("img");
  const NUMBER_OF_POSTS = document.createElement("p");
  const NUMBER_OF_FOLLOWERS = document.createElement("p");
  const NUMBER_FOLLOWING = document.createElement("p");

  USER_PROFILE.appendChild(USER_NAME);
  USER_PROFILE.appendChild(USER_EMAIL);
  USER_PROFILE.appendChild(BIO);
  USER_PROFILE.appendChild(BANNER);
  USER_PROFILE.appendChild(AVATAR);
  USER_PROFILE.appendChild(NUMBER_OF_POSTS);
  USER_PROFILE.appendChild(NUMBER_OF_FOLLOWERS);
  USER_PROFILE.appendChild(NUMBER_FOLLOWING);

  USER_NAME.innerHTML = PROFILE.name || "N/A";
  USER_EMAIL.innerHTML = PROFILE.email || "N/A";
  BIO.innerHTML = PROFILE.bio || "N/A";
  BANNER.src =
    PROFILE.banner && PROFILE.banner.url
      ? PROFILE.banner.url
      : "../../../ui/images/default-banner.jpg";

  AVATAR.src =
    PROFILE.avatar && PROFILE.avatar.url
      ? PROFILE.avatar.url
      : "../../../ui/images/default-avatar.jpg";
  NUMBER_OF_POSTS.innerHTML = PROFILE.posts ? PROFILE.posts.length : 0;
  NUMBER_OF_FOLLOWERS.innerHTML = PROFILE.followers
    ? PROFILE.followers.length
    : 0;
  NUMBER_FOLLOWING.innerHTML = PROFILE.following ? PROFILE.following.length : 0;
}

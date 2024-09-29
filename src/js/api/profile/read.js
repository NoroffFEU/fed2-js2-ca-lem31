import { headers } from "../headers.js";
import { API_PROFILE } from "../constants.js";

/**
 * Fetches the user profile from the API
 * and displays it on the page.
 *
 * @async
 * @function getUserProfile
 * @returns {Promise<void>} A promise that resolves when the
 * user profile is fetched and displayed on the page
 * or rejects the request if an error occurs.
 * @throws Will throw an error if the fetch request fails.
 *
 *
 * @example
 * // Example of how to call the getUserProfile function
 * import { getUserProfile }
 * from "./path/to/api/profile/read.js";
 *
 * getUserProfile();
 */
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
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

/**
 * Displays the user profile on the page by dynamically creating
 * the necessary HTML elements and setting the innerHTML to the
 * user profile data from the API.
 *
 * @function displayUserProfile
 * @param {object} PROFILE The user profile data from the API
 *
 * @returns {void}
 *
 * @example
 * // Example of how to call the displayUserProfile function
 * import { displayUserProfile }
 * from "./path/to/api/profile/read.js";
 *
 * const data = await RESPONSE.json();
 * const PROFILE = data.data || {};
 *
 * //OR
 *
 * const PROFILE = {
 * name: "John Doe",
 * email: "JohnDoe@stud.noroff.no",
 * bio: "I am a student at Noroff",
 * banner: {
 * url: "path/to/banner.jpg"
 * },
 * avatar: {
 * url: "path/to/avatar.jpg"
 * };
 *
 * displayUserProfile(PROFILE);
 */

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

  BANNER.classList.add("profile-banner");
  AVATAR.classList.add("profile-avatar");

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

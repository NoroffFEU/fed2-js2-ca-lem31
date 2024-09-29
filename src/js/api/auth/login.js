import { API_AUTH_LOGIN } from "../constants.js";
import { LOGIN_FORM } from "../constants.js";
import { ERROR_MESSAGE } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Fetches data from the login form and sends it to the
 * API to login a user.
 *
 * @async
 * @function login
 * @param {*} event
 *
 * @returns {Promise<void>} A promise that resolves when
 * the user is logged in or rejects if an error occurs.
 *
 * @throws Will throw an error if the fetch request fails.
 *
 * @example
 * // Example of how to call the login function
 * import { login } from "./path/to/api/auth/login.js";
 *
 * const LOGIN_FORM = document.getElementById("login-form");
 *
 * LOGIN_FORM.addEventListener("submit", login);
 *
 * // OR
 *
 * const LOGIN_BUTTON = document.getElementById("login-button");
 * LOGIN_BUTTON.addEventListener("click", login);
 */

export async function login(event) {
  event.preventDefault();

  const LOG_FORM = new FormData(LOGIN_FORM);
  const LOGIN_DATA = Object.fromEntries(LOG_FORM);

  try {
    const RESPONSE = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(LOGIN_DATA),
    });

    const USER_DATA = await RESPONSE.json();
    const INFO = USER_DATA.data;

    if (INFO) {
      localStorage.setItem("accessToken", INFO.accessToken);
      localStorage.setItem("user", JSON.stringify(INFO));
      window.location.href = "/profile/";

      if (INFO.error) {
        ERROR_MESSAGE.innerHTML =
          "Invalid email or password, please try again.";
      } else {
        ERROR_MESSAGE.innerHTML = "You have successfully logged in!";
      }
    } else {
      ERROR_MESSAGE.innerHTML =
        "Incorrect Username or password, please try again.";
    }
  } catch (error) {
    console.error("Error:", error);
    ERROR_MESSAGE.innerHTML = "An error occurred, please try again.";
  }
}

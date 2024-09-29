import { removeTokenFromStorage } from "../auth/logout.js";

/**
 * This function adds an event Listener to the logout button
 * and calls the removeTokenFromStorage function.
 * @function logout
 * @returns {void}
 * @example
 * logout();
 */
export function logout() {
  const LOGOUT_BUTTON = document.getElementById("logout-button");

  LOGOUT_BUTTON.addEventListener("click", removeTokenFromStorage);
}

import { onLogin } from "../../ui/auth/login";
import { LOGIN_FORM } from "../../api/constants.js";

/**
 * Listens for the login form submission event and calls the onLogin function.
 * @function listenForLoginFormSubmission
 * @returns {void}
 * @example
 * listenForLoginFormSubmission();
 */
function listenForLoginFormSubmission() {
  LOGIN_FORM.addEventListener("submit", onLogin);
}

listenForLoginFormSubmission();

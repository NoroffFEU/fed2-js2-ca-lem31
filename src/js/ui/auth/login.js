import { login } from "../../api/auth/login.js";

/**
 * This function is called when the login form is submitted.
 * It prevents the default form submission and calls the login function.
 * @param {Event} event - The submit event.
 * @returns {Promise<void>}
 * @example
 * LOGIN_FORM.addEventListener("submit", onLogin);
 *
 */
export async function onLogin(event) {
  event.preventDefault();
  await login(event);
}

/**
 * This function checks for an access token in local storage.
 * If the access token is not found, an alert is displayed and
 * the user is redirected to the login page.
 *
 * @function authGuard
 *
 * @example
 * // Example of how to call the function
 *
 * authGuard();
 */

export function authGuard() {
  if (!localStorage.accessToken) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
}

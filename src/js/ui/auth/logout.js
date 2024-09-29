/**
 * This function removes the user token from local storage
 * and redirects the user to the login page.
 * @function removeTokenFromStorage
 * @returns {void}
 * @example
 * removeTokenFromStorage();
 */

export function removeTokenFromStorage() {
  localStorage.removeItem("accessToken");

  window.location.href = "/auth/login/";
}

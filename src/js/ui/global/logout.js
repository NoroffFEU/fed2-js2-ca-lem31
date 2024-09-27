import { removeTokenFromStorage } from "../auth/logout.js";

export function logout() {
  const LOGOUT_BUTTON = document.getElementById("logout-button");

  LOGOUT_BUTTON.addEventListener("click", removeTokenFromStorage);
}

import { login } from "../../api/auth/login.js";
import { LOGIN_FORM } from "../../api/constants.js";

export async function onLogin(event) {
  event.preventDefault();
  await login(event);
  LOGIN_FORM.addEventListener("submit", login);
}

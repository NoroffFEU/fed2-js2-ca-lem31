import { login } from "../../api/auth/login.js";

export async function onLogin(event) {
  event.preventDefault();
  await login(event);
}

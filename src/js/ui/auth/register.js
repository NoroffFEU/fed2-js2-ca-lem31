import { register } from "../../api/auth/register.js";
import { REG_FORM } from "../../api/constants.js";

export async function onRegister(event) {
  register(event);
  REG_FORM.addEventListener("submit", register);
}

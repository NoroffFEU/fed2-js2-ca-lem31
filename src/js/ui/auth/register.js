import { register } from "../../api/auth/register.js";
import { REG_FORM } from "../../api/constants.js";

/**
 * This function is called when the register form is submitted.
 * It prevents the default form submission and calls the register function.
 *
 * @param {Event} event - The submit event.
 *
 * @returns {Promise<void>}
 *
 * @example
 *
 * REG_FORM.addEventListener("submit", onRegister);
 */

export async function onRegister(event) {
  register(event);
  REG_FORM.addEventListener("submit", register);
}

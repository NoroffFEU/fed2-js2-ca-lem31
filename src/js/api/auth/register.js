import { API_AUTH_REGISTER } from "../constants.js";

import { REG_FORM } from "../constants.js";

import { ERROR_MESSAGE } from "../constants.js";

import { headers } from "../headers.js";

/**
 * Fetches data from the registration form
 * and sends it to the API to register a new user.
 *
 * @async
 * @function register
 * @param {*} event
 *
 * @returns {Promise<void>} A promise that resolves when
 * the user is registered or rejects if an error occurs.
 *
 * @throws Will throw an error if the fetch request fails.
 *
 * @example
 * // Example of how to call the register function
 * import { register } from "./path/to/api/auth/register.js";
 *
 * const REG_FORM = document.getElementById("register-form");
 *
 * REG_FORM.addEventListener("submit", register);
 *
 * // OR
 *
 * const REGISTER_BUTTON = document.getElementById("register-button");
 * REGISTER_BUTTON.addEventListener("click", register);
 *
 *
 *
 */

export async function register(event) {
  event.preventDefault();

  const REG_FORM_OBJECT = new FormData(REG_FORM);
  const REG_FORM_DATA = Object.fromEntries(REG_FORM_OBJECT);

  const REQUEST_BODY_REG = {
    name: REG_FORM_DATA.name,
    email: REG_FORM_DATA.email,
    password: REG_FORM_DATA.password,
  };

  try {
    const RESPONSE = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(REQUEST_BODY_REG),
    });

    if (RESPONSE.ok) {
      alert("Registration successful");
      window.location.href = "/auth/login/";
      ERROR_MESSAGE.textContent = "";
    } else if (RESPONSE.status === 400) {
      ERROR_MESSAGE.textContent = "Error: User already exists";
    } else if (RESPONSE.status === 409) {
      ERROR_MESSAGE.textContent = "Error: User already exists";
    } else {
      ERROR_MESSAGE.textContent = "Error: Something went wrong";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

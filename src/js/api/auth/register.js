import { API_AUTH_REGISTER } from "../constants.js";

import { REG_FORM } from "../constants.js";

import { ERROR_MESSAGE } from "../constants.js";

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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(REQUEST_BODY_REG),
    });
    const DATA = await RESPONSE.json();

    console.log("Full RESPONSE DATA:", DATA);

    if (RESPONSE.ok) {
      alert("Registration successful");
      console.log(DATA);
      window.location.href = "../../auth/login/index.html";
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

import { REG_FORM } from "./constants";

import { ERROR_MESSAGE } from "./constants";

import { REG_FORM_OBJECT } from "./constants";

import { REG_FORM_DATA } from "./constants";

import { REQUEST_BODY_REG } from "./constants";

import { RESPONSE_REG } from "./constants";

import { REG_DATA } from "../constants.mjs";

export async function register(event) {
  event.preventDefault();

  REG_FORM_OBJECT;
  REG_FORM_DATA;

  REQUEST_BODY_REG;

  try {
    RESPONSE_REG;

    REG_DATA;

    if (RESPONSE_REG.ok) {
      alert("Registration successful");
      console.log(REG_DATA);
      window.location.href = ".../login.html";
      ERROR_MESSAGE.textContent = "";
    } else if (RESPONSE_REG.status === 400) {
      ERROR_MESSAGE.textContent = "Error: User already exists";
    } else if (RESPONSE_REG.status === 409) {
      ERROR_MESSAGE.textContent = "Error: User already exists";
    } else {
      ERROR_MESSAGE.textContent = "Error: Something went wrong";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

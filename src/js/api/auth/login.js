import { LOGIN_API } from "./constants.js";
import { LOGIN_FORM } from "../constants";
import { ERROR_MESSAGE } from "../constants";

export async function login(event) {
  event.preventDefault();
  const LOG_FORM = new FormData(LOGIN_FORM);
  const LOGIN_DATA = Object.fromEntries(LOG_FORM);

  try {
    const RESPONSE = await fetch(LOGIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(LOGIN_DATA),
    });

    const USER_DATA = await RESPONSE.json();
    const INFO = USER_DATA.data;

    if (INFO) {
      localStorage.setItem("token", INFO.accessToken);
      window.location.href = "./profile/index.html";

      console.log("Full Response Data:", INFO);
      if (INFO.error) {
        ERROR_MESSAGE.innerHTML =
          "Invalid email or password, please try again.";
      } else {
        ERROR_MESSAGE.innerHTML = "You have successfully logged in!";
      }
    } else {
      ERROR_MESSAGE.innerHTML = "Login failed, please try again.";
    }
  } catch (error) {
    console.error("Error:", error);
    ERROR_MESSAGE.innerHTML = "An error occurred, please try again.";
  }
}

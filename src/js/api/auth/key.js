import { headers } from "../headers";
import { API_KEY_NAME } from "../constants";
import { API_KEY_ENDPOINT } from "../constants";

export async function getAPIKey() {
  try {
    const RESPONSE = await fetch(API_KEY_ENDPOINT, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(API_KEY_NAME),
    });

    if (RESPONSE.ok) {
      const DATA = await RESPONSE.json();
      console.log("API Key DATA:", DATA);
      localStorage.setItem("apiKey", DATA.key);
      console.log("API Key:", DATA.key);
    } else {
      const ERROR_MESSAGE = await RESPONSE.text();
      console.log("Error:", RESPONSE.status, ERROR_MESSAGE);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

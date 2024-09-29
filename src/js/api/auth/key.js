import { headers } from "../headers";
import { API_KEY_NAME } from "../constants";
import { API_KEY_ENDPOINT } from "../constants";

/**
 * Fetches the API Key using the API_KEY_ENDPOINT and stores it in localStorage.
 *
 * This function sends a POST request to the API_KEY_ENDPOINT with the required headers and body.
 * If the request is successful the response JSON is then parsed in order to get the API key
 * and the key is stored in localStorage.
 * If the request fails it then logs the error status and message.
 *
 * @async
 * @function getAPIKey
 * @returns {Promise<void>} A promise that resolves when
 * the API key is fetched and stored in localStorage or rejects
 * if an error occurs.
 * @throws Will throw an error if the fetch request fails.
 *
 * @example
 * // Example of how to call the getAPIKey function
 * import { getAPIKey } from "./path/to/api/auth/key.js";
 *
 * getAPIKey();
 */

export async function getAPIKey() {
  try {
    const RESPONSE = await fetch(API_KEY_ENDPOINT, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(API_KEY_NAME),
    });

    if (RESPONSE.ok) {
      const DATA = await RESPONSE.json();
      localStorage.setItem("apiKey", DATA.key);
    } else {
      const ERROR_MESSAGE = await RESPONSE.text();
      console.error("Error:", RESPONSE.status, ERROR_MESSAGE);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

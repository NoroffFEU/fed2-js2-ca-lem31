export const apiKeyAPI = "https://v2.api.noroff.dev/auth/create-api-key";

export const apiKey = "25afc7c1-31c2-43ed-9dac-bbb6249bb706";

const apiKeyName = { name: "my cool api key" };

export async function getAPIKey() {
  try {
    const RESPONSE = await fetch(apiKeyAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(apiKeyName),
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

getAPIKey();

//ACCESS TOKEN constants

const getAuthToken = localStorage.getItem("accessToken");

export const authToken = getAuthToken;

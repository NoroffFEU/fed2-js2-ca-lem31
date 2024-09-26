import { API_KEY } from "../constants";
import { ERROR_MESSAGE } from "../constants";
import { UPDATE_POST_API } from "../constants";

export async function getUpdatePostDataAndSendToAPI(event) {
  event.preventDefault();
  try {
    const EDIT_FORM = document.getElementById("edit-form");
    const UPDATE_POST_REQUEST_BODY = createRequestBody(EDIT_FORM);
    const RESPONSE = await sendRequestToAPI(UPDATE_POST_REQUEST_BODY);
    handleResponse(RESPONSE);
  } catch (error) {
    handleError(error);
  }
}

function createRequestBody(EDIT_FORM) {
  const FORM_OBJECT = new FormData(EDIT_FORM);
  const FORM_DATA = Object.fromEntries(FORM_OBJECT);
  const TAGS_ARRAY = FORM_DATA.tags.split(",").map((tag) => tag.trim());
  return {
    title: FORM_DATA.title,
    body: FORM_DATA.body,
    tags: TAGS_ARRAY,
    media: {
      url: FORM_DATA.media,
      alt: FORM_DATA.alt,
    },
  };
}
function handleResponse(RESPONSE) {
  if (RESPONSE.ok) {
  } else {
    throw new Error("Failed to update post");
  }
}
async function sendRequestToAPI(UPDATE_POST_REQUEST_BODY) {
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  if (!ACCESS_TOKEN) {
    throw new Error("No access token found. Please log in.");
  }
  try {
    const RESPONSE = await fetch(UPDATE_POST_API(localStorage.getItem("id")), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(UPDATE_POST_REQUEST_BODY),
    });

    alert("Post successfully updated!");
    window.location.href = "myPosts.html";

    const DATA = await RESPONSE.json();
    return DATA;
  } catch (error) {
    handleError(error);
  }
}
function handleError(error) {
  console.error("Error:", error);
  const ERROR_MESSAGE = document.getElementById("error-message");
  if (ERROR_MESSAGE) {
    ERROR_MESSAGE.textContent = `Error: ${
      error.message || "Something went wrong"
    }`;
  } else {
    alert(`Error: ${error.message || "Something went wrong"}`);
  }
}

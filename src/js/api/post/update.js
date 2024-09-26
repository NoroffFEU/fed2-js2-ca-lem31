import { API_KEY } from "../constants";
import { ERROR_MESSAGE } from "../constants";
import { UPDATE_POST_API } from "../constants";

export async function getUpdatePostDataAndSendToAPI(event) {
  event.preventDefault();
  try {
    const EDIT_FORM = document.getElementById("edit-form");
    const UPDATE_POST_REQUEST_BODY = createRequestBody(EDIT_FORM);

    const post = JSON.parse(localStorage.getItem("clickedPost"));
    if (!post || !post.id) {
      throw new Error("Post ID not found in localStorage.");
    }
    const RESPONSE = await sendRequestToAPI(UPDATE_POST_REQUEST_BODY);
    handleResponse(RESPONSE);
  } catch (error) {
    handleError(error);
    throw error;
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
  const post = JSON.parse(localStorage.getItem("clickedPost")) || {};
  if (!post || !post.id) {
    throw new Error("Post ID not found in localStorage.");
  }

  try {
    const RESPONSE = await fetch(UPDATE_POST_API(post), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(UPDATE_POST_REQUEST_BODY),
    });

    alert("Post successfully updated!");
    window.location.href = "/profile/";

    const DATA = await RESPONSE.json();
    return DATA;
  } catch (error) {
    handleError(error);
  }
}
function handleError(error) {
  console.error("Error:", error);
  if (ERROR_MESSAGE) {
    ERROR_MESSAGE.textContent = `Error: ${
      error.message || "Something went wrong"
    }`;
  } else {
    alert(`Error: ${error.message || "Something went wrong"}`);
  }
}

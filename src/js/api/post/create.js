import { API_KEY } from "../constants";
import { CREATE_POST_API } from "../constants.js";

const CREATE_POST_FORM = document.getElementById("create-form");

export async function getCreatePostDataAndSendToAPI(event) {
  event.preventDefault();
  try {
    const CREATE_POST_REQUEST_BODY = createRequestBody(CREATE_POST_FORM);
    const RESPONSE = await sendRequestToAPI(CREATE_POST_REQUEST_BODY);
    handleResponse(RESPONSE);
  } catch (error) {
    handleError(error);
  }
}

function createRequestBody(CREATE_POST_FORM) {
  const FORM_OBJECT = new FormData(CREATE_POST_FORM);
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

async function sendRequestToAPI(CREATE_POST_REQUEST_BODY) {
  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  if (!ACCESS_TOKEN) {
    throw new Error("No access token found. Please log in.");
  }
  try {
    const RESPONSE = await fetch(CREATE_POST_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(CREATE_POST_REQUEST_BODY),
    });

    if (!RESPONSE.ok) {
      throw new Error("Failed to create post");
    }

    const DATA = await RESPONSE.json();
    alert("Post created successfully");
    window.location.href = "/profile/";
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

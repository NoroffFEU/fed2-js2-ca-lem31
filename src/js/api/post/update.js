import { API_KEY } from "../constants";

//Error Message constant
const ERROR_MESSAGE =
  document.getElementById("error-message") || document.createElement("p");

const createPostAPI = "https://v2.api.noroff.dev/social/posts";

// Function for getting the form data and sending it to the API

export async function getSpecifiedFormDataAndSendToAPI(
  event,
  formElement,
  operation = "create",
  POST_ID = null
) {
  event.preventDefault();
  try {
    const REQUEST_BODY =
      operation !== "delete" ? createRequestBody(formElement) : null;
    console.log(REQUEST_BODY);
    const RESPONSE = await sendRequestToAPI(REQUEST_BODY, operation, POST_ID);
    handleRESPONSE(RESPONSE, operation);
  } catch (error) {
    handleError(error);
  }
}

function createRequestBody(formElement) {
  const formObject = new FormData(formElement);
  const formDATA = Object.fromEntries(formObject);
  const tagsArray = formDATA.tags.split(",").map((tag) => tag.trim());
  return {
    title: formDATA.title,
    body: formDATA.body,
    tags: tagsArray,
    media: {
      url: formDATA.media,
      alt: formDATA.alt,
    },
  };
}

async function sendRequestToAPI(REQUEST_BODY, operation, POST_ID) {
  let url, method;

  switch (operation) {
    case "create":
      url = createPostAPI;
      method = "POST";
      break;
    case "update":
      updatePostAPI = `https://v2.api.noroff.dev/social/posts/${POST_ID}`;
      url = updatePostAPI;
      method = "PUT";
      break;
    case "delete":
      deletePostAPI = `https://v2.api.noroff.dev/social/posts/${POST_ID}`;
      url = deletePostAPI;
      method = "DELETE";
      break;

    default:
      throw new Error("Invalid operation");
  }

  const ACCESS_TOKEN = localStorage.getItem("accessToken");
  if (!ACCESS_TOKEN) {
    throw new Error("No access token found. Please log in.");
  }

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "X-Noroff-API-Key": API_KEY,
    },
  };

  if (REQUEST_BODY) {
    options.body = JSON.stringify(REQUEST_BODY);
  }

  const RESPONSE = await fetch(url, options);

  if (!RESPONSE.ok) {
    throw new Error(`HTTP error! status: ${RESPONSE.status}`);
  }

  if (RESPONSE.status === 204) {
    return {};
  }
  return RESPONSE.json();
}

function handleRESPONSE(DATA, operation) {
  console.log("Full RESPONSE DATA:", DATA);
  alert(`Post ${operation} processed successfully`);
  window.location.href = "myPosts.html";
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

//Function for displaying the edit form for a specific post

export function displayEditForm(post) {
  const formWrapper = document.getElementById("form-wrapper");
  const form = document.createElement("form");
  form.id = "edit-form";

  const titleInput = document.createElement("input");
  const titleLabel = document.createElement("label");
  titleLabel.id = "title-label";
  form.appendChild(titleLabel);
  titleInput.type = "text";
  titleInput.value = post.title;
  titleInput.name = "title";
  form.appendChild(titleInput);

  const bodyInput = document.createElement("textarea");
  const bodyLabel = document.createElement("label");
  bodyLabel.id = "body-label";
  bodyInput.value = post.body;
  bodyInput.name = "body";
  form.appendChild(bodyInput);

  const tagsInput = document.createElement("input");
  const tagsLabel = document.createElement("label");
  tagsLabel.id = "tags-label";
  tagsInput.type = "text";
  tagsInput.value = post.tags;
  tagsInput.name = "tags";
  form.appendChild(tagsInput);

  const mediaInput = document.createElement("input");
  const mediaLabel = document.createElement("label");
  mediaLabel.id = "media-label";
  mediaInput.type = "url";
  mediaInput.value = post.media ? post.media.url : "";
  mediaInput.name = "media";
  form.appendChild(mediaInput);

  const altInput = document.createElement("input");
  const altLabel = document.createElement("label");
  altLabel.id = "alt-label";
  altInput.type = "text";
  altInput.value = post.media ? post.media.alt : "";
  altInput.name = "alt";
  form.appendChild(altInput);

  titleLabel.setAttribute("for", "title");
  bodyLabel.setAttribute("for", "body");
  tagsLabel.setAttribute("for", "tags");
  mediaLabel.setAttribute("for", "media");
  altLabel.setAttribute("for", "alt");

  form.action = `https://v2.api.noroff.dev/social/posts/${post.id}`;
  form.method = "PUT";

  // Prevent the form from displaying more than once
  if (document.getElementById("edit-form")) {
    return;
  }
  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.textContent = "Save";
  form.appendChild(saveButton);

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";
  form.appendChild(cancelButton);

  cancelButton.addEventListener("click", () => {
    form.style.display = "none";
  });

  const ERROR_MESSAGE = document.createElement("p");
  ERROR_MESSAGE.id = "error-message";
  form.appendChild(ERROR_MESSAGE);

  formWrapper.appendChild(form);
  formWrapper.style.display = "flex";
  formWrapper.style.flexDirection = "column";
  formWrapper.style.alignItems = "center";
  form.style.display = "flex";
  form.style.flexDirection = "column";

  localStorage.setItem("id", post.id);

  form.addEventListener("submit", (event) =>
    getSpecifiedFormDataAndSendToAPI(event, form, "update", post.id)
  );
}

let updatePostAPI;
let deletePostAPI;

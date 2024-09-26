const createPostAPI = "https://v2.api.noroff.dev/social/posts";
import { getSpecifiedFormDataAndSendToAPI } from "./update";

function createPost() {
  const createPostForm = document.getElementById("create-form");
  if (createPostForm) {
    createPostForm.addEventListener("submit", (event) =>
      getSpecifiedFormDataAndSendToAPI(event, createPostForm, "create")
    );
  }
}

createPost();

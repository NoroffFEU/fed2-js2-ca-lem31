import { getSpecifiedFormDataAndSendToAPI } from "../../api/post/update";

function createPost() {
  const createPostForm = document.getElementById("create-form");
  if (createPostForm) {
    createPostForm.addEventListener("submit", (event) =>
      getSpecifiedFormDataAndSendToAPI(event, createPostForm, "create")
    );
  }
}

export async function onCreatePost(event) {
  createPost(event);
}

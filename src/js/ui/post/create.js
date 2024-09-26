import { getCreatePostDataAndSendToAPI } from "../../api/post/create";

export function onCreatePost() {
  const CREATE_POST_FORM = document.getElementById("create-form");
  if (CREATE_POST_FORM) {
    CREATE_POST_FORM.addEventListener("submit", (event) =>
      getCreatePostDataAndSendToAPI(event)
    );
  }
}

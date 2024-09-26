import { getUpdatePostDataAndSendToAPI } from "../../api/post/update";

export function createEditFormHTML(post) {
  const formWrapper = document.getElementById("form-wrapper");
  const form = document.createElement("form");
  form.id = "edit-form";
  form.className = "edit-form-class";

  const titleLabel = document.createElement("label");
  titleLabel.id = "title-label";
  titleLabel.textContent = "Title:";
  titleLabel.setAttribute("for", "title");
  form.appendChild(titleLabel);

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.value = post.data.title || "";
  titleInput.name = "title";
  form.appendChild(titleInput);

  const bodyLabel = document.createElement("label");
  bodyLabel.id = "body-label";
  bodyLabel.textContent = "Body:";
  bodyLabel.setAttribute("for", "body");
  form.appendChild(bodyLabel);

  const bodyInput = document.createElement("textarea");
  bodyInput.value = post.data.body || "";
  bodyInput.name = "body";
  form.appendChild(bodyInput);

  const tagsLabel = document.createElement("label");
  tagsLabel.id = "tags-label";
  tagsLabel.textContent = "Tags:";
  tagsLabel.setAttribute("for", "tags");
  form.appendChild(tagsLabel);

  const tagsInput = document.createElement("input");
  tagsInput.type = "text";
  tagsInput.value = post.data.tags || "";
  tagsInput.name = "tags";
  form.appendChild(tagsInput);

  const mediaLabel = document.createElement("label");
  mediaLabel.id = "media-label";
  mediaLabel.textContent = "Media URL:";
  mediaLabel.setAttribute("for", "media");
  form.appendChild(mediaLabel);

  const mediaInput = document.createElement("input");
  mediaInput.type = "url";
  mediaInput.value = post.data.media.url ? post.data.media.url : "";
  mediaInput.name = "media";
  form.appendChild(mediaInput);

  const altLabel = document.createElement("label");
  altLabel.id = "alt-label";
  altLabel.textContent = "Alt Text:";
  altLabel.setAttribute("for", "alt");
  form.appendChild(altLabel);

  const altInput = document.createElement("input");
  altInput.type = "text";
  altInput.value = post.data.media.alt ? post.data.media.alt : "";
  altInput.name = "alt";
  form.appendChild(altInput);

  // form.action = `https://v2.api.noroff.dev/social/posts/${post.id}`;
  // form.method = "PUT";

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

  form.addEventListener("submit", (event) => {
    const id = localStorage.getItem("clickedPost").data.id;
    event.preventDefault();
    getUpdatePostDataAndSendToAPI(event, id);
  });

  return form;
}

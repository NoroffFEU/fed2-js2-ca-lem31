import { removePostFromAPI } from "../../api/post/delete";

export function deletePost(event) {
  const POST_ID = event.target.dataset.id;
  removePostFromAPI(POST_ID);
}

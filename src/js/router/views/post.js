// import { retrievePostID } from "../../api/post/read.js";
import { API_KEY } from "../../api/constants.js";
import { getSinglePost } from "../../api/post/read.js";

export function retrievePostID() {
  const PARAMS = new URLSearchParams(window.location.search);
  const POST_ID = PARAMS.get("id");
  console.log(POST_ID);

  if (POST_ID !== null) {
    getSinglePost(POST_ID);
  } else {
    console.error("No post ID found in URL");
  }
}

retrievePostID();

import { GET_POST_API } from "../constants";
import { handleError } from "./create.js";
import { headers } from "../headers.js";

export async function removePostFromAPI(postId) {
  try {
    const RESPONSE = await fetch(`${GET_POST_API}${postId}`, {
      method: "DELETE",
      headers: headers(),
    });

    if (RESPONSE.ok) {
      alert("Post deleted successfully");
      window.location.href = "/profile/";
    } else {
      const ERROR_DATA = await RESPONSE.json();
      throw new Error(ERROR_DATA.message || "Failed to delete post");
    }
  } catch (error) {
    handleError(error);
  }
}

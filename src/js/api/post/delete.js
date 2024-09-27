import { ACCESS_TOKEN } from "../constants";
import { GET_POST_API } from "../constants";
import { API_KEY } from "../constants";
import { handleError } from "./create.js";

export async function removePostFromAPI(postId) {
  try {
    const RESPONSE = await fetch(`${GET_POST_API}${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "X-Noroff-API-Key": API_KEY,
      },
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

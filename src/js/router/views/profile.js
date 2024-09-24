import { authGuard } from "../../utilities/authGuard";
import { getPosts } from "../../app.js";
import { USER_POSTS_API } from "../../api/constants.js";

authGuard();

//MY POSTS CONSTANTS AND FUNCTIONS

getPosts(USER_POSTS_API, null, false, true);

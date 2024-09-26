import { authGuard } from "../../utilities/authGuard.js";
import { USER_POSTS_API } from "../../api/constants.js";
import { getPosts } from "./home.js";

//MY POSTS CONSTANTS AND FUNCTIONS

authGuard();
getPosts(USER_POSTS_API, null, false, true);

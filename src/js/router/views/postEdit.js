import { authGuard } from "../../utilities/authGuard.js";
import { populateEditForm } from "../../api/post/update.js";
import { updatePost } from "../../api/post/update.js";

authGuard();

populateEditForm();

updatePost();

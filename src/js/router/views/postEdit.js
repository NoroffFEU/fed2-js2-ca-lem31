import { authGuard } from "../../utilities/authGuard";

import { createEditFormHTML } from "../../ui/post/update.js";
import { API_KEY } from "../../api/constants.js";

authGuard();

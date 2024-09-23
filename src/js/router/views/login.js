import { onLogin } from "../../ui/auth/login";
import { LOGIN_FORM } from "../../api/constants.js";

LOGIN_FORM.addEventListener("submit", onLogin);

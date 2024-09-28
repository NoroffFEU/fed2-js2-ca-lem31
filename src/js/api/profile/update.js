import {
  UPDATE_PROFILE_BUTTON,
  PROFILE_FORM,
  CANCEL_BUTTON,
} from "../constants.js";

export function closeUpdateProfileForm() {
  if (PROFILE_FORM && PROFILE_FORM.style.display === "block") {
    PROFILE_FORM.style.display = "none";
  }
}

export function displayUpdateProfileForm() {
  if (PROFILE_FORM && PROFILE_FORM.style.display === "none") {
    PROFILE_FORM.style.display = "block";
  }
}

UPDATE_PROFILE_BUTTON.addEventListener("click", displayUpdateProfileForm);
CANCEL_BUTTON.addEventListener("click", closeUpdateProfileForm);

import {
  UPDATE_PROFILE_BUTTON,
  PROFILE_FORM,
  CANCEL_BUTTON,
} from "../constants.js";

/**
 * Closes the update profile form, if it is open and displayed on the page.
 *
 * @function closeUpdateProfileForm
 * @returns {void}
 *
 * @example
 *
 * const cancelBtn = document.getElementById("cancel");
 * cancelBtn.addEventListener("click", closeUpdateProfileForm);
 */

export function closeUpdateProfileForm() {
  if (PROFILE_FORM && PROFILE_FORM.style.display === "block") {
    PROFILE_FORM.style.display = "none";
  }
}

/**
 * Displays the update profile form if it is hidden and not displayed
 * on the page.
 *
 * @function displayUpdateProfileForm
 * @returns {void}
 *
 * @example
 *
 * const updateBtn = document.getElementById("update");
 * updateBtn.addEventListener("click", displayUpdateProfileForm);
 */

export function displayUpdateProfileForm() {
  if (PROFILE_FORM && PROFILE_FORM.style.display === "none") {
    PROFILE_FORM.style.display = "block";
  }
}

UPDATE_PROFILE_BUTTON.addEventListener("click", displayUpdateProfileForm);
CANCEL_BUTTON.addEventListener("click", closeUpdateProfileForm);
PROFILE_FORM.style.display = "none";

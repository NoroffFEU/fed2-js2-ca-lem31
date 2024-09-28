const UPDATE_PROFILE_BUTTON = document.getElementById("update-profile-button");
const PROFILE_FORM = document.getElementById("Update-Profile");
const CANCEL_BUTTON = document.getElementById("cancel-button");
PROFILE_FORM.style.display = "none";

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

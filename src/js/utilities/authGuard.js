//ACCESS TOKEN constants

//ACCESS TOKEN constants

export function authGuard() {
  if (!localStorage.accessToken) {
    alert("You must be logged in to view this page");
    window.location.href = "/auth/login/";
  }
}

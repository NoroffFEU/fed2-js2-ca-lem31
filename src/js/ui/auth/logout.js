export function removeTokenFromStorage() {
  // Clear user session or token
  localStorage.removeItem("accessToken");
  // Redirect to login page
  window.location.href = "/auth/login/";
}

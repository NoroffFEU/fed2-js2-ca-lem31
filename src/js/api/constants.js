// Use Postman, or JavaScript to get your API key
// In Workflow we will learn how to secure this information
export const API_KEY = "25afc7c1-31c2-43ed-9dac-bbb6249bb706";

export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = "https://v2.api.noroff.dev/auth/login";

export const API_AUTH_REGISTER = `https://v2.api.noroff.dev/auth/register`;

export const CREATE_POST_API = "https://v2.api.noroff.dev/social/posts";

export const GET_POST_API = "https://v2.api.noroff.dev/social/posts/";

const USER_NAME = JSON.parse(localStorage.getItem("user")) || {};

const NAME = USER_NAME.name || "defaultName";

export const API_SOCIAL = `${API_BASE}/social`;
export const USER_POSTS_API = `https://v2.api.noroff.dev/social/profiles/${NAME}/posts`;

export const ACCESS_TOKEN = localStorage.getItem("accessToken");

// export const API_SOCIAL_PROFILES = `;

export const ERROR_MESSAGE = document.getElementById("error-message");

//REGISTRATION PAGE CONSTANTS

export const REG_FORM = document.getElementById("register-form");

//LOGIN PAGE CONSTANTS

export const LOGIN_FORM = document.getElementById("login-form");

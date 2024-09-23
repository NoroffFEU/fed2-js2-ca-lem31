// Use Postman, or JavaScript to get your API key
// In Workflow we will learn how to secure this information
export const API_KEY = "replace-with-your-key";

export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `https://v2.api.noroff.dev/auth/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_SOCIAL = `${API_BASE}/social`;

export const API_SOCIAL_POSTS = `${API_SOCIAL}/posts`;

export const API_SOCIAL_PROFILES = `${API_SOCIAL}/profiles`;

//REGISTRATION PAGE CONSTANTS

export const REG_FORM = document.getElementById("register-form");
export const REG_FORM_OBJECT = new FormData(REG_FORM);
export const REG_FORM_DATA = Object.fromEntries(REG_FORM_OBJECT);
export const REQUEST_BODY_REG = {
  name: REG_FORM_DATA.name,
  email: REG_FORM_DATA.email,
  password: REG_FORM_DATA.password,
};
export const ERROR_MESSAGE = document.getElementById("error-message");

export const RESPONSE_REG = await fetch(API_AUTH_REGISTER, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(REQUEST_BODY_REG),
});

export const REG_DATA = await RESPONSE_REG.json();

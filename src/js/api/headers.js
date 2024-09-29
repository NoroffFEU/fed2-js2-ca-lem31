import { ACCESS_TOKEN, API_KEY } from "./constants.js";

/**
 * Appends headers to the fetch request. If the const ACCESS_TOKEN is set
 * and available, it will append the Authorization header with the token.
 * If the const API_KEY is set and available, it will append the
 * X-Noroff-API-Key header with the API key.
 * The Content-Type header is always appended with the value "application/json".
 *
 * @function headers
 *
 * @returns {Headers} Headers object with the Content-Type header and
 * Authorization and X-Noroff-API-Key header if available.
 *
 * @example
 *
 * function fetchPosts() {
 *  fetch("https://v2.api.noroff.dev/social/posts", {
 *   method: "GET",
 *  headers: headers()
 * })
 *
 */

export function headers() {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");

  if (ACCESS_TOKEN) {
    headers.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
  }

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  return headers;
}

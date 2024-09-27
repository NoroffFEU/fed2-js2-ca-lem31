export function displayPostIDInURLOnEditPage(event) {
  const POST_ID = event.target.closest(".my-post").dataset.id;
  window.location.href = `/post/edit/?id=${POST_ID} `;
}

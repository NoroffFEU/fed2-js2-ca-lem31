export function displayPostIDInURLOnEditPage(event) {
  const POST_ID = event.target.closest(".my-post").dataset.id;
  window.location.href = `/post/edit/?id=${POST_ID} `;
}

// async function populateEditForm() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const postId = urlParams.get("id");

//   if (postId) {
//     try {
//       const response = await fetch(`https://api.example.com/posts/${postId}`);
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const post = await response.json();

//       const editForm = document.getElementById("edit-post-form");
//       if (editForm) {
//         editForm.querySelector('input[name="title"]').value = post.title;
//         editForm.querySelector('textarea[name="content"]').value = post.content;
//         // Populate other form fields as necessary
//       }
//     } catch (error) {
//       console.error(
//         "There has been a problem with your fetch operation:",
//         error
//       );
//     }
//   }
// }

// document.addEventListener("DOMContentLoaded", populateEditForm);

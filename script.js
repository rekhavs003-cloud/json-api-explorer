// Get HTML elements
const fetchButton = document.getElementById("fetchButton");
const postList = document.getElementById("postList");
const error = document.getElementById("error");
const loading = document.getElementById("loading");
const postForm = document.getElementById("postForm");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");

const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");

// ===============================
// Fetch Posts
// ===============================

fetchButton.addEventListener("click", async function () {

    fetchButton.addEventListener("click", async function () {

    error.textContent = "";
    postList.innerHTML = "";
    loading.textContent = "Loading...";

    try {

        const response = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!response.ok) {
            throw new Error("Could not fetch posts.");
        }

        const posts = await response.json();
        loading.textContent = "";

        posts.forEach(function (post) {

            postList.innerHTML += `
                <div>
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <hr>
                </div>
            `;

        });

    } catch (err) {

    loading.textContent = "";
    error.textContent = err.message;

}
});

// ===============================
// Submit New Post
// ===============================

postForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    formError.textContent = "";
    formSuccess.textContent = "";

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (title === "" || body === "") {

        formError.textContent = "Please fill in all fields.";

        return;
    }

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title: title,
                    body: body
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to create post.");
        }

        const data = await response.json();

        formSuccess.textContent =
            "Post created successfully! ID: " + data.id;

        postForm.reset();

    } catch (err) {

        formError.textContent = err.message;

    }

});
document.querySelector(".editPost").onsubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`/api/posts/${POST_ID}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: document.querySelector(".postTitle input").value,
        content: document.querySelector(".postContent textarea").value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    location.href = "/dashboard";
  } catch (err) {
    document.querySelector(".error").innerHTML = err.message;
    console.log(err.message);
  }
};

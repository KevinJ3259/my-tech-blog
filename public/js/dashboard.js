document.querySelector("#newBlogPostBtn").onclick = async () => {
  try {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: document.querySelector("#newPostTitle").value,
        content: document.querySelector("#newBlogPost").value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    location.reload();
  } catch (err) {
    console.log(err);
  }
};

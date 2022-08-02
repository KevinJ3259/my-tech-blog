document.querySelector(".commentBtn").onclick = async () => {
  try {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: document.querySelector(".commentInput").value,
        post_id: POST_ID,
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

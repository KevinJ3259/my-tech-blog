document.querySelector("#logout").onclick = async () => {
  try {
    const response = await fetch("api/users/logout", {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    location.href = "/";
  } catch (err) {
    console.log(err.message);
  }
};

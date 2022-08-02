document.querySelector(".signup-form").onsubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("api/users/signup", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: document.querySelector("#user-name-signup").value,
        password: document.querySelector("#password-signup").value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    location.href = "/";
  } catch (err) {
    document.querySelector(".signup-form .error").innerHTML = err.message;
    console.log(err.message);
  }
};

document.querySelector(".login-form").onsubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("api/users/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: document.querySelector("#user-name-login").value,
        password: document.querySelector("#password-login").value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    location.href = "/";
  } catch (err) {
    document.querySelector(".login-form .error").innerHTML = err.message;
    console.log(err.message);
  }
};

// js/login.js

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailOrPhone = document.getElementById("emailOrPhone").value.trim();
  const password = document.getElementById("password").value;

  if (!emailOrPhone || !password) {
    alert("Please enter your email/phone and password.");
    return;
  }

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailOrPhone, password })
    });

    const data = await res.json();

    if (res.ok) {
      // Store JWT and user info in localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));

      alert(`Welcome, ${data.user.username}!`);
      window.location.href = "index.html"; // Redirect to home page
    } else {
      alert(data.message || "Login failed!");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong during login.");
  }
});

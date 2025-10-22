// js/signup.js

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;

  if (!password || (!email && !phone)) {
    alert("Please enter a password and either email or phone number.");
    return;
  }

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, phone, password })
    });

    const data = await res.json();

    if (res.ok) {
      // Store JWT and user info in localStorage (for demo)
      localStorage.setItem("authToken", data.token || "demo-token");
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));

      alert("Signup successful!");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Signup failed!");
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("Something went wrong during signup.");
  }
});

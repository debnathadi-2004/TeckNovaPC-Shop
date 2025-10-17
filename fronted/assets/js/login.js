document.querySelector("#loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login successful! ✅");
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } else {
      alert(data.message || "Invalid login details.");
    }
  } catch (err) {
    alert("Error connecting to server.");
  }
});

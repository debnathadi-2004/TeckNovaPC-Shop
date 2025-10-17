document.querySelector("#signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    alert(data.message || "Signup successful!");
    if (res.ok) window.location.href = "login.html";
  } catch (err) {
    alert("Error connecting to server.");
  }
});

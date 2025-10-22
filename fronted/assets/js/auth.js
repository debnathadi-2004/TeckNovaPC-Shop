// Display logged-in user
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const userDisplay = document.getElementById("userDisplay");
  const authLinks = document.getElementById("authLinks");

  if (user) {
    userDisplay.textContent = `👋 Welcome, ${user.name}`;
    authLinks.style.display = "inline"; // show logout link
    authLinks.querySelector('a[href="login.html"]').style.display = "none"; // hide login
  } else {
    userDisplay.textContent = "";
    authLinks.style.display = "inline"; // show login link
    authLinks.querySelector('a[onclick]').style.display = "none"; // hide logout
  }
});

// Logout function
function logout() {
  localStorage.removeItem("loggedInUser");
  alert("You have been logged out!");
  window.location.href = "index.html";
}

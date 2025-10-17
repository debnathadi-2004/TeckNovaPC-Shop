// To be added on protected pages like product.html
const token = localStorage.getItem("token");
if (!token) {
  alert("Please login to continue.");
  window.location.href = "login.html";
}

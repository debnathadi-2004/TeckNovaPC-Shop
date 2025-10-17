const API="http://localhost:5000/api/auth";

function saveAuth(token,user){
  localStorage.setItem("token",token);
  localStorage.setItem("user",JSON.stringify(user));
}

async function login(event){
  event.preventDefault();
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  const res=await fetch(`${API}/login`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email,password})
  });
  const data=await res.json();
  if(!res.ok)return alert(data.message);
  saveAuth(data.token,data.user);
  alert("Welcome "+data.user.name);
  window.location="index.html";
}

async function signup(event){
  event.preventDefault();
  const name=document.getElementById("name").value;
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  const res=await fetch(`${API}/register`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name,email,password})
  });
  const data=await res.json();
  if(!res.ok)return alert(data.message);
  saveAuth(data.token,data.user);
  alert("Account created!");
  window.location="index.html";
}

document.addEventListener("DOMContentLoaded",()=>{
  const loginForm=document.getElementById("loginForm");
  if(loginForm)loginForm.addEventListener("submit",login);
  const signupForm=document.getElementById("signupForm");
  if(signupForm)signupForm.addEventListener("submit",signup);
});

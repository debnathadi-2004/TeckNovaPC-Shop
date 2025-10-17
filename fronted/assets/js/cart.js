let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems=document.getElementById("cart-items");
const cartTotal=document.getElementById("cart-total");

function showCart(){
  cartItems.innerHTML="";
  let total=0;
  cart.forEach((item,index)=>{
    total+=parseInt(item.price.replace(/[^\d]/g,""));
    const div=document.createElement("div");
    div.className="cart-item";
    div.innerHTML=`<img src="${item.img}" alt="${item.name}">
    <h4>${item.name}</h4>
    <p>${item.price}</p>
    <button onclick="removeItem(${index})">Remove</button>`;
    cartItems.appendChild(div);
  });
  cartTotal.innerText="Total: ৳"+total.toLocaleString();
}

function removeItem(index){
  cart.splice(index,1);
  localStorage.setItem("cart",JSON.stringify(cart));
  showCart();
}

showCart();

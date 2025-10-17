const featuredProducts = [
  {name:"Gaming Laptop RTX 4060", price:"৳145,000", img:"assets/images/products/laptop1.jpg"},
  {name:"Ryzen 7 Desktop PC", price:"৳95,000", img:"assets/images/products/desktop1.jpg"},
  {name:"Mechanical Keyboard", price:"৳3,200", img:"assets/images/products/keyboard1.jpg"},
  {name:"Gaming Mouse", price:"৳2,000", img:"assets/images/products/mouse1.jpg"}
];

const container = document.getElementById("featured-products");
featuredProducts.forEach(p=>{
  const card=document.createElement("div");
  card.className="product-card";
  card.innerHTML=`<img src="${p.img}" alt="${p.name}">
  <h3>${p.name}</h3><p class="price">${p.price}</p>
  <a href="product-details.html" class="btn">View</a>`;
  container.appendChild(card);
});

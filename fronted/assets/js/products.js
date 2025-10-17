const list = document.getElementById("product-list");
const cat = document.getElementById("category");
const search = document.getElementById("search");

let products = [];

fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    display(products);
  });

function display(arr) {
  list.innerHTML = "";
  arr.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">৳${parseInt(p.price).toLocaleString()}</p>
      <a href="product-details.html?id=${p.id}" class="btn">View</a>
    `;
    list.appendChild(card);
  });
}

// Filter
cat.addEventListener("change", () => {
  const c = cat.value;
  display(c === "all" ? products : products.filter(p => p.category === c));
});
search.addEventListener("input", () => {
  const q = search.value.toLowerCase();
  display(products.filter(p => p.name.toLowerCase().includes(q)));
});

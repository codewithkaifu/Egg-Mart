/*********************************
 DOM READY
*********************************/
document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  setupCartUI();
  setupAddToCartButtons();
});

/*********************************
 🌙 DARK MODE – FULL BODY
*********************************/
function setupThemeToggle() {
  const toggleBtn = document.getElementById("themeToggle");

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    toggleBtn.textContent =
      document.body.classList.contains("dark") ? "☀️" : "🌙";
  });
}

/*********************************
 🛒 CART STATE
*********************************/
let cart = [];

/*********************************
 CREATE CART UI (JS se)
*********************************/
function setupCartUI() {
  const cartBox = document.createElement("div");
  cartBox.id = "cartBox";

  cartBox.innerHTML = `
    <h3>🛒 Cart</h3>
    <div id="cartItems"></div>
    <hr>
    <p><strong>Total Items:</strong> <span id="totalItems">0</span></p>
    <p><strong>Total Price:</strong> ₹<span id="totalPrice">0</span></p>
  `;

  cartBox.style.position = "fixed";
  cartBox.style.bottom = "20px";
  cartBox.style.right = "20px";
  cartBox.style.width = "260px";
  cartBox.style.background = "#fff";
  cartBox.style.padding = "15px";
  cartBox.style.borderRadius = "12px";
  cartBox.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
  cartBox.style.zIndex = "999";

  document.body.appendChild(cartBox);
}

/*********************************
 ADD TO CART BUTTONS
*********************************/
function setupAddToCartButtons() {
  const buttons = document.querySelectorAll(".product-card button");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".product-card");
      const name = card.querySelector("h3").innerText;
      const priceText = card.querySelector(".price").innerText;
      const price = Number(priceText.replace(/[^0-9]/g, ""));

      addToCart(name, price);
    });
  });
}

/*********************************
 ADD ITEM TO CART
*********************************/
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  renderCart();
}

/*********************************
 RENDER CART
*********************************/
function renderCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  const totalItemsSpan = document.getElementById("totalItems");
  const totalPriceSpan = document.getElementById("totalPrice");

  cartItemsDiv.innerHTML = "";

  let totalQty = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalQty += item.qty;
    totalPrice += item.qty * item.price;

    const div = document.createElement("div");
    div.style.marginBottom = "8px";
    div.innerHTML = `
      ${item.name}<br>
      ${item.qty} × ₹${item.price}
    `;
    cartItemsDiv.appendChild(div);
  });

  totalItemsSpan.innerText = totalQty;
  totalPriceSpan.innerText = totalPrice;
}

/*********************************
 👑 ADMIN – ADD NEW ITEM
*********************************/
function addNewItem() {
  const name = document.getElementById("newItemName").value.trim();
  const price = Number(document.getElementById("newItemPrice").value);

  if (!name || price <= 0) {
    alert("Enter valid item name and price");
    return;
  }

  const grid = document.querySelector(".shop-grid");

  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img src="https://via.placeholder.com/300x220?text=Eggs" />
    <h3>${name}</h3>
    <p class="price">₹${price} / egg</p>
    <button class="primary-btn">Add to Cart</button>
  `;

  grid.appendChild(card);

  card.querySelector("button").addEventListener("click", () => {
    addToCart(name, price);
  });

  document.getElementById("newItemName").value = "";
  document.getElementById("newItemPrice").value = "";

  alert("Item added successfully");
}

/*********************************
 👑 ADMIN – UPDATE PRICE
*********************************/
function updateItemPrice() {
  const name = document.getElementById("updateItemName").value.trim().toLowerCase();
  const newPrice = Number(document.getElementById("updateItemPrice").value);

  if (!name || newPrice <= 0) {
    alert("Enter valid item and price");
    return;
  }

  const cards = document.querySelectorAll(".product-card");
  let found = false;

  cards.forEach(card => {
    const title = card.querySelector("h3").innerText.toLowerCase();

    if (title === name) {
      card.querySelector(".price").innerText = `₹${newPrice} / egg`;

      const btn = card.querySelector("button");
      btn.onclick = null;
      btn.addEventListener("click", () => {
        addToCart(card.querySelector("h3").innerText, newPrice);
      });

      found = true;
    }
  });

  alert(found ? "Price updated successfully" : "Item not found");
}

import products from './products.js';

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-container");
  const navSearch = document.getElementById("navSearch");
  const buttons = document.querySelectorAll(".filter-buttons button");

  function displayProducts(list) {
    container.innerHTML = list.length ? list.map(p => `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button>Add to Cart</button>
      </div>
    `).join('') : "<p>No products found.</p>";
  }

  displayProducts(products);

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.category;
      displayProducts(cat === "All" ? products : products.filter(p => p.category === cat));
    });
  });

  navSearch?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const value = navSearch.value.toLowerCase();
      displayProducts(products.filter(p => p.name.toLowerCase().includes(value)));
      window.scrollTo({ top: document.querySelector(".product-section").offsetTop - 80, behavior: "smooth" });
    }
  });

  // ✅ Hero Slider (Fixed)
  const heroImages = document.querySelectorAll(".hero-image");
  const leftBtn = document.querySelector(".arrow.left");
  const rightBtn = document.querySelector(".arrow.right");

  let currentIndex = 0;

  function showSlide(index) {
    heroImages.forEach((img, i) => {
      img.style.display = i === index ? "block" : "none";
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % heroImages.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + heroImages.length) % heroImages.length;
    showSlide(currentIndex);
  }

  if (leftBtn && rightBtn && heroImages.length) {
    leftBtn.addEventListener("click", prevSlide);
    rightBtn.addEventListener("click", nextSlide);
    showSlide(currentIndex);
    setInterval(nextSlide, 6000);
  }

  // ✅ Login Modal Safe Code
  const loginBtn = document.getElementById("loginBtn");
  const loginModal = document.getElementById("loginModal");
  const closeModal = document.getElementById("closeModal");

  loginBtn?.addEventListener("click", () => loginModal.style.display = "block");
  closeModal?.addEventListener("click", () => loginModal.style.display = "none");
  window.addEventListener("click", e => {
    if (e.target === loginModal) loginModal.style.display = "none";
  });
});
let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-container");
  const navSearch = document.getElementById("navSearch");
  const buttons = document.querySelectorAll(".filter-buttons button");
  const cartToggle = document.getElementById("cart-toggle");
  const cartSidebar = document.getElementById("cart-sidebar");
  const closeCart = document.getElementById("close-cart");
  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const clearCartBtn = document.getElementById("clear-cart");
  const cartCount = document.getElementById("cart-toggle");

  function updateCartCount() {
    cartCount.innerText = `Cart (${cart.length})`;
  }

  function renderCart() {
    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
        <span>${item.name}</span>
        <span>₹${item.price}</span>
      `;
      cartItemsList.appendChild(li);
      total += item.price;
    });

    cartTotal.textContent = total;
    updateCartCount();
  }

  function displayProducts(list) {
    container.innerHTML = list.length ? list.map(p => `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button class="add-to-cart" data-id="${p.id}">Add to Cart</button>
      </div>
    `).join('') : "<p>No products found.</p>";

    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const product = products.find(p => p.id == id);
        if (product) {
          cart.push(product);
          renderCart();
        }
      });
    });
  }

  displayProducts(products);

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.category;
      displayProducts(cat === "All" ? products : products.filter(p => p.category === cat));
    });
  });

  navSearch?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const value = navSearch.value.toLowerCase();
      displayProducts(products.filter(p => p.name.toLowerCase().includes(value)));
      window.scrollTo({ top: document.querySelector(".product-section").offsetTop - 80, behavior: "smooth" });
    }
  });

  cartToggle.addEventListener("click", (e) => {
    e.preventDefault();
    cartSidebar.classList.add("open");
  });

  closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("open");
  });

  clearCartBtn.addEventListener("click", () => {
    cart = [];
    renderCart();
  });

  window.addEventListener("click", (e) => {
    if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
      cartSidebar.classList.remove("open");
    }
  });

  // Initial render
  renderCart();
  const buyNowBtn = document.getElementById("buy-now");

buyNowBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Add some items first.");
    return;
  }

  // Save cart to localStorage to access on checkout page
  localStorage.setItem("cart", JSON.stringify(cart));

  // Redirect to checkout.html
  window.location.href = "checkout.html";
});

});

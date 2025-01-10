document.addEventListener("DOMContentLoaded", function () {
  console.log("Script is called");

  const cartTableHeader = document.createElement("div");
  cartTableHeader.classList.add("cart-table-header");
  cartTableHeader.innerHTML = `
    <div class="cart-header-item"></div>
    <div class="cart-header-item">Product</div>
    <div class="cart-header-item">Price</div>
    <div class="cart-header-item">Quantity</div>
    <div class="cart-header-item">Subtotal</div>
    <div class="cart-header-item"></div>
`;

  const products = [
    {
      id: 1,
      name: "Product Name 1",
      price: 250000,
      imageUrl: "assert/CartItem.png", // Corrected image path
    }
  ];

  function populateCart() {
    const cartTable = document.querySelector(".cart-table");
    const subtotalElement = document.getElementById("subtotalAmount");
    const totalElement = document.getElementById("totalAmount");

    if (!cartTable) {
      console.error("Cart table not found.");
      return;
    }

    cartTable.innerHTML = ""; // Clear previous items
    cartTable.appendChild(cartTableHeader);
    if (products.length > 0) {
      let total = 0;
      products.forEach((product) => {
        const cartItemRow = document.createElement("div");
        cartItemRow.classList.add("cart-item-row");
        const price = product.price;

        cartItemRow.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${product.imageUrl}" alt="${
          product.name
        }" class="product-image" />
                    </div>
                    <div class="cart-item-name">${product.name}</div>
                    <div class="cart-item-price">Rs.${price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <input type="number" value="1" min="1" max="99" class="quantity-input" />
                    </div>
                    <div class="cart-item-subtotal">Rs.${price.toFixed(2)}</div>
                    <div class="cart-item-bin">
                        <span class="bin-icon">&#128465;</span>
                    </div>
                `;
        cartTable.appendChild(cartItemRow);

        // Update total for cart
        total += price;
      });

      // Update Subtotal and Total
      subtotalElement.textContent = `Rs.${total.toFixed(2)}`;
      totalElement.textContent = `Rs.${total.toFixed(2)}`;
    } else {
      console.warn("No products available to populate the cart.");
    }

    addEventListeners();
  }

  function addEventListeners() {
    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("input", function () {
        updateCartItem(this); // Update cart item on quantity change
      });
    });

    document.querySelectorAll(".bin-icon").forEach((binIcon) => {
      binIcon.addEventListener("click", function () {
        const cartItemRow = this.closest(".cart-item-row");
        cartItemRow.remove(); // Remove the entire row
        updateTotal(); // Update totals after item removal
      });
    });
  }

  function updateCartItem(inputElement) {
    const cartItemRow = inputElement.closest(".cart-item-row");
    const priceElement = cartItemRow.querySelector(".cart-item-price");
    const price = parseFloat(priceElement.textContent.replace("Rs.", ""));
    const quantity = parseInt(inputElement.value);

    const subtotalElement = cartItemRow.querySelector(".cart-item-subtotal");
    const subtotal = price * quantity;
    subtotalElement.textContent = `Rs.${subtotal.toFixed(2)}`;

    updateTotal(); // Recalculate totals after quantity change
  }

  function updateTotal() {
    const cartRows = document.querySelectorAll(".cart-item-row");
    let total = 0;

    cartRows.forEach((row) => {
      const subtotalElement = row.querySelector(".cart-item-subtotal");
      console.log(subtotalElement.textContent)
      total += parseFloat(subtotalElement.textContent.replace("Rs.", ""));
    });

    const subtotalElement = document.getElementById("subtotalAmount");
    const totalElement = document.getElementById("totalAmount");
    subtotalElement.textContent = `Rs.${total.toFixed(2)}`;
    totalElement.textContent = `Rs.${total.toFixed(2)}`;
  }

  populateCart(); // Initialize the cart with products
});

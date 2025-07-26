import { updateCart } from './dom.js';

const cart = {};

export function getCart() {
  return cart;
}

export function getCartTotalItems() {
  return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
}

export function handleCartEvents() {
  window.addEventListener("click", (e) => {
    const addButton = e.target.closest(".add");
    const removeButton = e.target.closest(".remove-btn");
    const incrementBtn = e.target.closest(".increment");
    const decrementBtn = e.target.closest(".decrement");

    if (addButton) {
      const { name, category, price } = addButton.dataset;
      cartAdd(category, name, parseFloat(price), addButton);
    }

    if (removeButton) {
      const name = removeButton.dataset.name;
      removeFromCart(name, cart);
    }

    if (incrementBtn || decrementBtn) {
      const container = e.target.closest(".add");
      const input = container.querySelector("input");
      const name = container.dataset.name;

      if (!cart[name]) return;

      if (incrementBtn) {
        cart[name].quantity++;
      }

      if (decrementBtn) {
        cart[name].quantity--;
        if (cart[name].quantity <= 0) {
          delete cart[name];
          container.innerHTML = `
            <img src="assets/images/icon-add-to-cart.svg" alt="Add to cart">
            <p class="font-semibold rose-900 whitespace-nowrap">Add to Cart</p>
          `;
          container.style = "";
        }
      }

      input.value = cart[name]?.quantity || 1;
      updateCart(cart);
    }
  });
}

function cartAdd(category, name, price, button) {
  if (!cart[name]) {
    button.style.padding = "0";
    button.style.borderColor = "#c73a0fff";

    button.innerHTML = `
      <div class="flex items-center justify-between h-full w-full bg-[#c73a0fff] px-8 py-2 text-white rounded-full px-4 py-1 gap-4">
        <button type="button" class="cursor-pointer decrement text-xl font-bold">−</button>
        <input type="number" class="no-spinner w-8 text-center bg-transparent outline-none" value="1" min="1" />
        <button type="button" class="cursor-pointer increment text-xl font-bold">+</button>
      </div>
    `;

    cart[name] = { name, price, category, quantity: 1 };
  }

  updateCart(cart);
}

function removeFromCart(name, cart) {
  if (cart[name]) {
    cart[name].quantity--;

    if (cart[name].quantity <= 0) {
      delete cart[name];

      const addButton = document.querySelector(`.add[data-name="${name}"]`);
      if (addButton) {
        addButton.innerHTML = `
          <img src="assets/images/icon-add-to-cart.svg" alt="Add to cart">
          <p class="font-semibold rose-900 whitespace-nowrap">Add to Cart</p>
        `;
        addButton.style = "";
      }
    } else {
      const addButton = document.querySelector(`.add[data-name="${name}"]`);
      if (addButton) {
        const input = addButton.querySelector("input.no-spinner");
        if (input) {
          input.value = cart[name].quantity;
        }
      }
    }

    updateCart(cart);
  }
}

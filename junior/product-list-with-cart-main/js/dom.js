import { formatPrice } from './format.js';

export function updateCart(cart) {
  const cartQuantity = document.querySelector("#cartQuantity");
  const cartContainer = document.querySelector("#cart");
  const emptyCart = document.querySelector("#emptyCart");
  const confirmContainer = document.querySelector("#confirmContainer");
  const total = document.querySelector("#total");

  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartQuantity.textContent = totalItems;

  if (totalItems > 0) {
    cartContainer.style.display = "block";
    emptyCart.style.display = "none";
    confirmContainer.style.display = "flex";

    cartContainer.innerHTML = "";

    Object.values(cart).forEach(product => {
      cartContainer.innerHTML += `
        <div class="cart-item flex justify-between items-center border-b text-sm py-4">
          <div class="flex flex-col gap-y-1">
            <p class="font-semibold rose-900">${product.name}</p>
            <div>
              <span class="font-semibold f-red mr-3">${product.quantity}x</span>
              <span class="rose-400 mr-1">@ ${formatPrice(product.price)}</span>
              <span class="rose-400 font-semibold">${formatPrice(product.price * product.quantity)}</span>
            </div>
          </div>
          <button data-name="${product.name}" class="remove-btn rounded-full border border-[#ad8985ff] transition hover:border-[#260f08ff] p-[2px] cursor-pointer">
            <img src="assets/images/icon-remove-item.svg" alt="Remove item">
          </button>
        </div>
      `;
    });

    total.textContent = formatPrice(totalPrice);
  } else {
    emptyCart.style.display = "flex";
    confirmContainer.style.display = "none";
    cartContainer.style.display = "none";
  }
}

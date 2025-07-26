import { getCartTotalItems, getCart } from './cart.js';

export function setupConfirmButton() {
  const confirmBtn = document.querySelector("#confirmOrderBtn");
  const modal = document.querySelector("#orderModal");
  const closeModalBtn = document.querySelector("#closeModalBtn");

  if (!confirmBtn || !modal || !closeModalBtn) return;

  confirmBtn.addEventListener("click", () => {
    const totalItems = getCartTotalItems();

    if (totalItems > 0) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    } else {
      alert("Your cart is empty!");
    }
  });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });


  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  });
}

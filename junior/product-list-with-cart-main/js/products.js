import { formatPrice } from './format.js';

export function loadProducts() {
  const list = document.querySelector("#listing");

  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((product) => {
        const card = `
          <div class="flex flex-col gap-8 card">
            <div class="relative w-66">
              <img class="rounded-xl w-full object-cover" src="${product.image.desktop}" alt="${product.name}">
              <button data-category="${product.category}" data-name="${product.name}" data-price="${product.price}" type="button" class="absolute add bg-white cursor-pointer px-8 py-2 border border-[#260f08ff] left-1/2 -translate-1/2 rounded-full flex justify-center gap-2">
                <img src="assets/images/icon-add-to-cart.svg" alt="Add to cart">
                <p class="font-semibold rose-900 whitespace-nowrap">Add to Cart</p>
              </button>
            </div>
            <div>
              <p class="rose-500">${product.category}</p>
              <h3 class="rose-900 font-semibold">${product.name}</h3>
              <h2 class="f-red font-semibold">${formatPrice(product.price)}</h2>
            </div>
          </div>
        `;
        list.innerHTML += card;
      });
    });
}

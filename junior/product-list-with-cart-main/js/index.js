import { loadProducts } from './products.js';
import { handleCartEvents } from './cart.js';
import { setupConfirmButton } from './confirm.js';

loadProducts();
handleCartEvents();
setupConfirmButton();

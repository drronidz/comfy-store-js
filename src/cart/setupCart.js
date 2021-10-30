// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';

// set items
const cartItemCountDOM = getElement('.cart-item-count')
const cartItemsDOM = getElement('.cart-items')
const cartTotalDOM = getElement('.cart-total')

let cart = getStorageItem('cart')

export const addToCart = (id) => {
  let item = cart.find((cartItem) => cartItem.id === id)
  if (!item) {
    let product = findProduct(id)
    // Add item to the Cart
    product = {...product, amount : 1}
    cart = [...cart, product]
    // Add item to the DOM
    addToCartDOM(product)
    console.log(cart)
  }
  else {
    // Update values
  }
  // Add one to the item count
  displayCartItemCount()
  // Display cart totals
  displayCartTotal()
  // Set cart in local storage
  setStorageItem('cart', cart)
  // More stuff coming up
  openCart()
};

function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return total += cartItem.amount
  },0)
}

function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return total += cartItem.price * cartItem.amount
  }, 0)
  cartTotalDOM.textContent = `Total : ${formatPrice(total)}`
}

const init = () => {
  console.log(cart)
}

init()

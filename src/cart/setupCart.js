// import
import {formatPrice, getElement, getStorageItem, setStorageItem,} from '../utils.js';
import {openCart} from './toggleCart.js';
import {findProduct} from '../store.js';
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
    const amount = increaseAmount(id)
    const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')]
    console.log(items)
    const newAmount = items.find((value) => {
      console.log(value.dataset.id)
      return value.dataset.id === id
    })
    newAmount.textContent = amount
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
  cartItemCountDOM.textContent = cart.reduce((total, cartItem) => {
    return total += cartItem.amount
  }, 0)
}

function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return total += cartItem.price * cartItem.amount
  }, 0)
  cartTotalDOM.textContent = `Total : ${formatPrice(total)}`
}

function displayCartItemsDOM() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem)
  })
}

function increaseAmount(id) {
  let newAmount
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1
      cartItem = {...cartItem, amount: newAmount}
    }
    return cartItem;
  })
  return newAmount
}

function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;

}

function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id)
}

function setupCartFunctionality() {
  cartItemsDOM.addEventListener('click', function (event) {
    const element = event.target
    const parent = event.target.parentElement
    const id = event.target.dataset.id
    const parentID = event.target.parentElement.dataset.id


    // Remove Item
    if (element.classList.contains('cart-item-remove-btn')) {
      removeItem(id)
      parent.parentElement.remove()
    }
    // increase Item amount
    if (parent.classList.contains('cart-item-increase-btn')) {
      console.log(parent)
      parent.nextElementSibling.textContent = increaseAmount(parentID)
    }
    // decrease Item amount
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentID)
      if (newAmount === 0) {
        removeItem(parentID)
        parent.parentElement.parentElement.remove()
      }
      else {
        parent.previousElementSibling.textContent = newAmount
      }
    }
    displayCartItemCount()
    displayCartTotal()
    setStorageItem('cart', cart)
  })
}

const init = () => {
  // Display amount of cart items
  displayCartItemCount()
  // Display total
  displayCartTotal()
  // Add all cart items to the DOM
  displayCartItemsDOM()
  // Setup cart functionality
  setupCartFunctionality()

}

init()

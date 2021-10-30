import { getElement } from '../utils.js';

const cartOverlay = getElement('.cart-overlay')
const closeCartBtn = getElement('.cart-close')
const toggleCartBtn = getElement('.toggle-cart')


toggleCartBtn.addEventListener('click', () => {
    cartOverlay.classList.toggle('show')
})

closeCartBtn.addEventListener('click', () => {
    cartOverlay.classList.toggle('show')
})

export const openCart = () => {
    cartOverlay.classList.toggle('show')
};

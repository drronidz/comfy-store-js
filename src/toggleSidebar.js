import { getElement } from './utils.js';

const toggleNav = getElement('.toggle-nav')
const sidebarOverlay = getElement('.sidebar-overlay')
const closeBtn = getElement('.sidebar-close')

toggleNav.addEventListener('click', () => {
    // Show the sidebar (Responsive view)
    sidebarOverlay.classList.toggle('show')
})

closeBtn.addEventListener('click', () => {
    // Hide the sidebar (Responsive view)
    sidebarOverlay.classList.toggle('show')
})



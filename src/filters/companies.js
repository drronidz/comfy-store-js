import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupCompanies = (store) => {
    console.log(store)
    let companies = ['all',... new Set(store.map((product) => {
        return product.company
    }))]

    const companiesElement = getElement('.companies')
    companiesElement.innerHTML = companies.map((company) => {
        return `<button class="company-btn">${company}</button>`
    }).join('')

    companiesElement.addEventListener('click', function (event) {
        const element = event.target
        if (element.classList.contains('company-btn')) {
            let newStore = []
            if (element.textContent === 'all') {
                newStore = [...store]
            } else {
                newStore = store.filter((product) => {
                    return product.company === event.target.textContent
                })
            }

            if (newStore.length < 1) {
                const productsContainer = getElement('.products-container')
                productsContainer.innerHTML = `
                            <h3 class="filter-error"> Sorry, no products matched your search !</h3>`
            }
            display(newStore, getElement('.products-container'))
        }
    })
};

export default setupCompanies;

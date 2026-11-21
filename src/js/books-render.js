import { getTopBooks, getBooksByCategory } from './books-api.js';

export const refs = {
  categoriesList: document.querySelector('.categories-list'),
  booksList: document.querySelector('.books-list'),
  booksLoadMore: document.querySelector('.books-more-btn')
}

export const renderCategories = () => {
// потім
};

function bookTemplate({ _id: id,  title }) {
  return `
  <li class="books-item" data-id="${id}">
    <p class="books-item-title">${title}</p>
 </li>`;
}

function booksTemplate(books) {
  return books.map(bookTemplate).join('');
}

export function renderBooks(books) {
  refs.booksList.innerHTML = booksTemplate(books);
}

// export function renderClear() {
//   refs.booksList.innerHTML = ``;
// }

export function loadMoreBooks(books) {
  refs.booksList.insertAdjacentHTML('beforeend', booksTemplate(books));
}

export function toggleLoadMore(isVisible) {
  refs.booksLoadMore.classList.toggle('is-hidden', !isVisible);
}
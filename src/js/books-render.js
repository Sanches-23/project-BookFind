export const refs = {
  categoriesList: document.querySelector('.categories-list'),
  booksList: document.querySelector('.books-list'),
  booksLoadMore: document.querySelector('.books-more-btn'),
  booksShown: document.querySelector('.books-count-current'),
  booksTotal: document.querySelector('.books-count-total'),
}

function categoryTemplate(name) {
  return `
  <li class="categories-item">
    <button class="categories-btn" type="button" data-category="${name}">
      ${name}
    </button>
  </li>`;
}

export function renderCategories(names) {
  refs.categoriesList.innerHTML = names.map(categoryTemplate).join('');
}

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

export function loadMoreBooks(books) {
  refs.booksList.insertAdjacentHTML('beforeend', booksTemplate(books));
}

export function toggleLoadMore(isVisible) {
  refs.booksLoadMore.classList.toggle('is-hidden', !isVisible);
}

export function updateCounter(shown, total) {
  refs.booksShown.textContent = shown;
  refs.booksTotal.textContent = total;
}
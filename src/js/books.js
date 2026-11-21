import { getTopBooks, getBooksByCategory, getCategories } from './books-api.js';
import { loadMoreBooks, refs, renderBooks, renderCategories, toggleLoadMore, updateCounter } from './books-render.js';
import { BOOKS_PER_LOAD, BOOKS_PER_PAGE, DESKTOP_QUERY } from './constants.js';
import iziToast from 'izitoast';

const ALL_CATEGORIES = 'All categories';
let currentBooks = [];
let shownCount = 0;

function getBooksLimit() {
  return window.matchMedia(DESKTOP_QUERY).matches
    ? BOOKS_PER_PAGE.DESKTOP
    : BOOKS_PER_PAGE.MOBILE;
}

async function getAllBooks() {
  const topBooks = await getTopBooks();
  const allBooks = [];
  for (const category of topBooks) {
    for (const book of category.books) {
      allBooks.push(book);
    }
  }
  return allBooks;
}

function showBooks(books) {
  currentBooks = books;
  shownCount = Math.min(getBooksLimit(), currentBooks.length);
  renderBooks(currentBooks.slice(0, shownCount));
  updateBooksInfo();
}

function showMoreBooks() {
  const nextBooks = currentBooks.slice(shownCount, shownCount + BOOKS_PER_LOAD);
  loadMoreBooks(nextBooks);
  shownCount += nextBooks.length;
  updateBooksInfo();
}

function updateBooksInfo() {
  toggleLoadMore(shownCount < currentBooks.length);
  updateCounter(shownCount, currentBooks.length);
}

export async function categoryHandler(e) {
  const targetButton = e.target.closest('.categories-btn');
  if (!targetButton) return;
  const category = e.target.textContent.trim();
  try {
    if (category === ALL_CATEGORIES) {
      const data = await getAllBooks();
      showBooks(data);
    } else {
      const data = await getBooksByCategory(category);
      showBooks(data);
    }
  } catch {
    iziToast.error({
      message: 'Failed to load books. Please try again later.',
      position: 'topRight',
    });
  }
}

async function initBooks() {
  refs.booksLoadMore.addEventListener('click', showMoreBooks);
  refs.categoriesList.addEventListener('click', categoryHandler);
  try {
    const [categories, books] = await Promise.all([
      getCategories(),
      getAllBooks(),
    ]);
    const categoryNames = categories.map(category => category.list_name);
    renderCategories([ALL_CATEGORIES, ...categoryNames]);
    showBooks(books);
  } catch {
    iziToast.error({
      message: 'Failed to load books. Please try again later.',
      position: 'topRight',
    });
  }
}

initBooks();
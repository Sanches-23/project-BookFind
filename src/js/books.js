import { getTopBooks, getBooksByCategory, getCategories } from './books-api.js';
import { loadMoreBooks, refs, renderBooks, renderCategories, toggleLoadMore } from './books-render.js';
import { BOOKS_PER_LOAD, BOOKS_PER_PAGE, DESKTOP_QUERY } from './constants.js';
import iziToast from 'izitoast';

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
  updateLoadMore();
}

function showMoreBooks() {
  const nextBooks = currentBooks.slice(shownCount, shownCount + BOOKS_PER_LOAD);
  loadMoreBooks(nextBooks);
  shownCount += nextBooks.length;
  updateLoadMore();
}

function updateLoadMore() {
  toggleLoadMore(shownCount < currentBooks.length);
}

async function initBooks() {
  refs.booksLoadMore.addEventListener('click', showMoreBooks);
  // refs.categoriesList.addEventListener('click', categoryHandler);
  try {

    const books = await getAllBooks();
    console.log(books.length);
    showBooks(books);

    // const [books, categories] = await Promise.all([
      // getCategories(),
      // getTopBooks(),
    // ]);
    // renderCategories(categories);
    // showBooks(books);
    console.log(books);
  } catch {
    iziToast.error({
      message: 'Failed to load books. Please try again later.',
      position: 'topRight',
    });
  }
}

initBooks();

// категорії пізніше доробим
// export async function categoryHandler(e) {
//   const targetButton = e.target.closest('.categories-btn');
//   if (targetButton) {
//     // console.log(e.target.textContent);
//     const category = e.target.textContent;
//     const data = await getBooksByCategory(category);
//     renderClear();
//     renderBooks(data.products);
//     if (targetButton.textContent === 'All categories') {
//       const data = await getTopBooks();
//       renderBooks(data.products);
//       // console.log(data.products);
//     }
//   }
// }
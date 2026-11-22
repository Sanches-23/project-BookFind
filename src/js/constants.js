// глобальні змінні типу юрл, к-сть книжок на сторінку і тд
export const API_BASE_URL = 'https://books-backend.p.goit.global';
export const ENDPOINTS = {
  TOP_BOOKS: '/books/top-books',
  CATEGORIES: '/books/category-list',
  CATEGORY: '/books/category/',
  BOOKS: '/books/'
};

export const DESKTOP_QUERY = '(min-width: 1440px)';

export const BOOKS_PER_LOAD = 4;
export const BOOKS_PER_PAGE = {
  MOBILE: 10,
  DESKTOP: 24,
};
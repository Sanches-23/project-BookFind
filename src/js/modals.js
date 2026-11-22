import Accordion from 'accordion-js';
import 'accordion-js/accordion.min.css';
import iziToast from 'izitoast';
import { getBookById } from './books-api.js';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;
const DEFAULT_DESCRIPTION = 'No description available for this book.';

const modalBackdrop = document.querySelector('#book-modal');
const modalCloseBtn = modalBackdrop?.querySelector('.book-modal-close');
const modalImg = modalBackdrop?.querySelector('.book-modal-img');
const modalTitle = modalBackdrop?.querySelector('.book-modal-title');
const modalAuthor = modalBackdrop?.querySelector('.book-modal-author');
const modalPrice = modalBackdrop?.querySelector('.book-modal-price');
const modalForm = modalBackdrop?.querySelector('.book-modal-form');
const qtyInput = modalBackdrop?.querySelector('.book-modal-qty-input');
const decrementBtn = modalBackdrop?.querySelector('[data-action="decrement"]');
const incrementBtn = modalBackdrop?.querySelector('[data-action="increment"]');
const addToCartBtn = modalBackdrop?.querySelector('[data-action="add-to-cart"]');
const detailsText = modalBackdrop?.querySelector('[data-accordion-details]');
const accordionContainer = modalBackdrop?.querySelector('.book-modal-accordion');
const booksList = document.querySelector('.books-list');

let currentBook = null;
let bookAccordion = null;

function formatPrice(price) {
  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    return '$0';
  }
  return Number.isInteger(numericPrice)
    ? `$${numericPrice}`
    : `$${numericPrice.toFixed(2)}`;
}

function getSafeQuantity() {
  const parsed = Number.parseInt(qtyInput?.value ?? '1', 10);
  if (!Number.isFinite(parsed) || parsed < MIN_QUANTITY) {
    return MIN_QUANTITY;
  }
  return Math.min(parsed, MAX_QUANTITY);
}

function setQuantity(value) {
  const clamped = Math.max(MIN_QUANTITY, Math.min(value, MAX_QUANTITY));
  if (qtyInput) {
    qtyInput.value = String(clamped);
  }
}

function populateBookModal(book) {
  currentBook = book;

  if (modalImg) {
    modalImg.src = book.book_image || '';
    modalImg.alt = book.title || 'Book cover';
  }

  if (modalTitle) {
    modalTitle.textContent = book.title || 'Untitled';
  }

  if (modalAuthor) {
    modalAuthor.textContent = book.author || 'Unknown author';
  }

  if (modalPrice) {
    modalPrice.textContent = formatPrice(book.price);
  }

  if (detailsText) {
    detailsText.textContent = book.description?.trim() || DEFAULT_DESCRIPTION;
  }

  setQuantity(MIN_QUANTITY);
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    closeBookModal();
  }
}

export async function openBookModal(bookId) {
  if (!modalBackdrop || !bookId) return;

  try {
    const book = await getBookById(bookId);
    populateBookModal(book);

    modalBackdrop.classList.remove('is-hidden');
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', handleEscapeKey);

    if (bookAccordion) {
      bookAccordion.closeAll();
      bookAccordion.open(0);
    }
  } catch {
    iziToast.error({
      message: 'Failed to load book details. Please try again later.',
      position: 'topRight',
    });
  }
}

export function closeBookModal() {
  if (!modalBackdrop || modalBackdrop.classList.contains('is-hidden')) return;

  modalBackdrop.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', handleEscapeKey);
}

if (accordionContainer) {
  bookAccordion = new Accordion(accordionContainer, {
    duration: 250,
    showMultiple: true,
  });
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeBookModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', event => {
    if (event.target === modalBackdrop) {
      closeBookModal();
    }
  });
}

if (decrementBtn) {
  decrementBtn.addEventListener('click', () => {
    setQuantity(getSafeQuantity() - 1);
  });
}

if (incrementBtn) {
  incrementBtn.addEventListener('click', () => {
    setQuantity(getSafeQuantity() + 1);
  });
}

if (qtyInput) {
  qtyInput.addEventListener('change', () => {
    setQuantity(getSafeQuantity());
  });
}

if (addToCartBtn) {
  addToCartBtn.addEventListener('click', () => {
    const quantity = getSafeQuantity();
    const title = currentBook?.title || 'Book';
    iziToast.info({
      message: `Added to cart: ${quantity} × "${title}"`,
      position: 'topRight',
    });
  });
}

if (modalForm) {
  modalForm.addEventListener('submit', event => {
    event.preventDefault();
    iziToast.success({
      message: 'Дякуємо за покупку',
      position: 'topRight',
    });
    closeBookModal();
  });
}

if (booksList) {
  booksList.addEventListener('click', event => {
    const bookItem = event.target.closest('.books-item[data-id]');
    if (!bookItem) return;

    const hasLearnMoreButton = Boolean(bookItem.querySelector('button'));
    if (hasLearnMoreButton && !event.target.closest('button')) {
      return;
    }

    const { id } = bookItem.dataset;
    if (id) {
      openBookModal(id);
    }
  });
}

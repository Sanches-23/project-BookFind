import Accordion from 'accordion-js';
import 'accordion-js/accordion.min.css';
import iziToast from 'izitoast';
import { getBookById } from './books-api.js';

/* ===================== Contact Modal ===================== */
const contactBackdrop = document.querySelector('#contact-modal');
const contactCloseBtn = contactBackdrop?.querySelector('.modal-close');
const contactEventTitle = contactBackdrop?.querySelector('.contact-modal-event');

function openContactModal(eventTitle) {
  if (!contactBackdrop) return;
  if (eventTitle && contactEventTitle) {
    contactEventTitle.textContent = eventTitle;
  }

  contactBackdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeContactModal() {
  if (!contactBackdrop) return;
  contactBackdrop.classList.add('is-hidden');
  document.body.style.overflow = '';
}

if (contactCloseBtn) {
  contactCloseBtn.addEventListener('click', closeContactModal);
}

if (contactBackdrop) {
  contactBackdrop.addEventListener('click', event => {
    if (event.target === contactBackdrop) {
      closeContactModal();
    }
  });
}

document.addEventListener('keydown', event => {
  if (!contactBackdrop) return;
  const isOpen = !contactBackdrop.classList.contains('is-hidden');

  if (event.key === 'Escape' && isOpen) {
    closeContactModal();
  }
});

/* ===================== Book Modal ===================== */
const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;
const DEFAULT_DESCRIPTION = 'No description available for this book.';
const PLACEHOLDER_IMG =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

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
  return `$${Math.round(numericPrice)}`;
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
    modalImg.src = book.book_image || PLACEHOLDER_IMG;
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

function handleBookModalEscape(event) {
  if (event.key === 'Escape') {
    closeBookModal();
  }
}

async function openBookModal(bookId) {
  if (!modalBackdrop || !bookId) return;

  try {
    const book = await getBookById(bookId);
    populateBookModal(book);

    modalBackdrop.classList.remove('is-hidden');
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', handleBookModalEscape);

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

function closeBookModal() {
  if (!modalBackdrop || modalBackdrop.classList.contains('is-hidden')) return;

  modalBackdrop.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', handleBookModalEscape);
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
    const learnMoreBtn = event.target.closest('.books-item-btn[data-id]');
    if (!learnMoreBtn) return;

    const { id } = learnMoreBtn.dataset;
    if (id) {
      openBookModal(id);
    }
  });
}

export { openContactModal, closeContactModal, openBookModal, closeBookModal };

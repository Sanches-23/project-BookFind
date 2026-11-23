const contactBackdrop = document.querySelector('#contact-modal');
const contactCloseBtn = contactBackdrop.querySelector('.modal-close');
const contactEventTitle = contactBackdrop.querySelector('.contact-modal-event');

function openContactModal(eventTitle) {
  if (eventTitle) {
    contactEventTitle.textContent = eventTitle;
  }

  contactBackdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

function closeContactModal() {
  contactBackdrop.classList.add('is-hidden');
  document.body.style.overflow = '';
}

contactCloseBtn.addEventListener('click', closeContactModal);

contactBackdrop.addEventListener('click', event => {
  if (event.target === contactBackdrop) {
    closeContactModal();
  }
});

document.addEventListener('keydown', event => {
  const isOpen = !contactBackdrop.classList.contains('is-hidden');

  if (event.key === 'Escape' && isOpen) {
    closeContactModal();
  }
});

export { openContactModal, closeContactModal };

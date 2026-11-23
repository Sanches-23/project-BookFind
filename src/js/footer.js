import iziToast from 'izitoast';

const footerForm = document.querySelector('.footer-form');

footerForm.addEventListener('submit', onFooterFormSubmit);

function onFooterFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const email = form.elements.email.value.trim();

  if (!email) {
    return;
  }

  iziToast.success({
    message: 'Thank you for subscribing!',
    position: 'topRight',
  });

  form.reset();
}
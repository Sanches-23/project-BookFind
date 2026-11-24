const scrollUpBtn = document.querySelector('.scroll-up-btn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollUpBtn.classList.add('is-visible');
  } else {
    scrollUpBtn.classList.remove('is-visible');
  }
});

scrollUpBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
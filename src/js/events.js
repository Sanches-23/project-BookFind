import Swiper from 'swiper';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import { openContactModal } from './modals.js';

const DESKTOP_QUERY = '(min-width: 1440px)';

function initEvents() {
  const section = document.querySelector('.events');
  if (!section) return;

  const sliderEl = section.querySelector('.events-slider');
  const eventsList = section.querySelector('.events-list');
  let swiper = null;

  function createSlider() {
    if (swiper) return;

    swiper = new Swiper(sliderEl, {
      modules: [Navigation, Pagination, A11y],
      slidesPerView: 1,
      spaceBetween: 16,
      speed: 500,
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 24 },
      },
      navigation: {
        prevEl: section.querySelector('.events-slider-btn--prev'),
        nextEl: section.querySelector('.events-slider-btn--next'),
      },
      pagination: {
        el: section.querySelector('.events-pagination'),
        clickable: true,
        bulletClass: 'events-bullet',
        bulletActiveClass: 'events-bullet--active',
      },
      a11y: {
        prevSlideMessage: 'Previous event',
        nextSlideMessage: 'Next event',
        paginationBulletMessage: 'Go to event {{index}}',
      },
    });
  }

  function destroySlider() {
    if (!swiper) return;

    swiper.destroy(true, true);
    swiper = null;
  }

  function syncSlider(mq) {
    if (mq.matches) {
      destroySlider();
    } else {
      createSlider();
    }
  }

  const desktopMq = window.matchMedia(DESKTOP_QUERY);
  syncSlider(desktopMq);
  desktopMq.addEventListener('change', syncSlider);

  // Register -> модалка з назвою події
  eventsList.addEventListener('click', event => {
    const btn = event.target.closest('.events-card-btn');
    if (!btn) return;

    const title = btn
      .closest('.events-card')
      .querySelector('.events-card-title')
      .textContent.trim();

    openContactModal(title);
  });
}

initEvents();
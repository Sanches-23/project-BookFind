import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

new Swiper('.feedback-swiper', {
  modules: [Navigation, Pagination, Keyboard, A11y],
  slidesPerView: 1,
  spaceBetween: 16,
  grabCursor: true,
  keyboard: { enabled: true, onlyInViewport: true },
  pagination: { el: '.feedback-pagination', clickable: true },
  navigation: {
    nextEl: '.feedback-next',
    prevEl: '.feedback-prev',
    disabledClass: 'is-disabled',
  },
  breakpoints: {
    768: { slidesPerView: 2, spaceBetween: 24 },
    1158: { slidesPerView: 3, spaceBetween: 24 },
  },
});
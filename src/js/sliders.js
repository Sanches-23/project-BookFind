import Swiper from 'swiper';
import { Navigation, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';

const heroSliderEl = document.querySelector('.hero-slider');
const heroPrevBtn = document.querySelector('.hero-slider-btn--prev');
const heroNextBtn = document.querySelector('.hero-slider-btn--next');

function syncHeroNavState(swiperInstance) {
  if (heroPrevBtn) {
    heroPrevBtn.disabled = swiperInstance.isBeginning;
    heroPrevBtn.setAttribute('aria-disabled', String(swiperInstance.isBeginning));
  }
  if (heroNextBtn) {
    heroNextBtn.disabled = swiperInstance.isEnd;
    heroNextBtn.setAttribute('aria-disabled', String(swiperInstance.isEnd));
  }
}

if (heroSliderEl) {
  new Swiper(heroSliderEl, {
    modules: [Navigation, Keyboard, A11y],
    slidesPerView: 1,
    spaceBetween: 24,
    speed: 500,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    navigation: {
      prevEl: heroPrevBtn,
      nextEl: heroNextBtn,
    },
    a11y: {
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
    },
    on: {
      init: syncHeroNavState,
      slideChange: syncHeroNavState,
      reachBeginning: syncHeroNavState,
      reachEnd: syncHeroNavState,
      fromEdge: syncHeroNavState,
    },
  });
}

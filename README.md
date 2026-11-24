# Booksy

A single-page bookstore website built by a team as a GoIT group project.

**Live demo:** <https://sanches-23.github.io/project-BookFind/>

## About

Booksy helps readers discover books and stay in touch with the bookstore community:

- browse bestsellers by category, loaded from a books API
- open a book card to see details, choose quantity, add to cart or buy now
- learn about upcoming events and register for them
- find the store location and contacts
- subscribe to the newsletter

## Tech stack

- HTML5, CSS3, JavaScript (ES modules)
- [Vite](https://vitejs.dev/) — build tool
- [Swiper](https://swiperjs.com/swiper-api) — sliders
- [Axios](https://www.npmjs.com/package/axios) — API requests
- [iziToast](https://www.npmjs.com/package/izitoast) — notifications
- [Accordion JS](https://github.com/michu2k/Accordion) — accordion in the book modal
- [modern-normalize](https://cdnjs.com/libraries/modern-normalize)

Books data: `https://books-backend-v2.b.goit.study/api-docs/`

## Getting started

Requirements: Node.js LTS.

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build into /dist
npm run preview  # preview the production build at http://localhost:4173
```

## Deployment

The site is deployed to GitHub Pages automatically by GitHub Actions on every push to `main`.

## Project structure

```
src/
├── index.html      # page assembled from partials
├── partials/       # one HTML file per section
├── css/            # base, utils, components, sections
├── js/             # one module per feature + API
└── images/         # images and SVG sprite
```

## Team

- **Oleksandr Pasichnyk** — Team Lead: project setup and structure, Books section
  (markup, category filter, styles)
- **Max Didyk** — Scrum Master, Feedbacks section
- **Evhen** — Header and mobile menu
- **Sway-Nick** — Hero section, Book Modal
- **Pavlo** — Events section
- **Andrii Pankiv** — Article section, Books API, SVG sprite and content images
- **Viktoriia Kozlovska** — Location section, Contact Modal
- **Alina Honcharuk** — Footer

## Additional features (optional)

- **?** Loader for API requests
- **?** Scroll-to-top button
- **?** Shopping list with pagination

## Design

[Figma mockup](https://www.figma.com/design/Q8qeSuzKR9tcbh1Ez9jOX4/Booksy?node-id=5999-10563&p=f&t=W9EYcAmdBSFimYpT-0)
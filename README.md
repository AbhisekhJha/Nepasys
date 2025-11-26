# Nepasys Product Catalog

A clean React + Vite storefront that lists products from the DummyJSON API. It ships with search, category filtering, infinite scrolling, sorting, theming, and a lightweight cart to satisfy the assignment requirements quickly.

https://github.com/your-user/your-repo (replace with your repo URL)  
Live demo or video: _add a link once deployed_

## Features

- Product feed hydrated from `https://dummyjson.com/products` with graceful loading states and retry support.
- Search bar, category dropdown, and optional sorting (price / rating) to slice the catalog.
- Infinite scrolling powered by the Intersection Observer API.
- Responsive grid + modern UI with light/dark theme toggle.
- Simple “add to cart” panel with quantity controls and live totals.

## Tech Stack

- React 19 with functional components and hooks
- Vite 7 (React SWC plugin)
- Tailwind CSS 3 for modern, responsive styling with dark mode support
- DummyJSON public API for data

## Getting Started

> **Node requirement**: Vite 7 expects Node 20.19+ (or 22.12+). The project will build on Node 18.x with warnings, but upgrading is recommended.

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# run a production build
npm run build

# preview the production build locally
npm run preview
```

Open http://localhost:5173 to view the site in development.

## Project Structure

```
src/
├─ components/
│  ├─ CartPanel.jsx
│  ├─ CategoryFilter.jsx
│  ├─ ErrorState.jsx
│  ├─ LoadingState.jsx
│  ├─ ProductCard.jsx
│  ├─ ProductGrid.jsx
│  ├─ SearchBar.jsx
│  ├─ SortSelect.jsx
│  └─ ThemeToggle.jsx
├─ hooks/
│  └─ useProducts.js
├─ App.jsx
├─ index.css
└─ main.jsx
```

## API Notes

- `GET https://dummyjson.com/products?limit={pageSize}&skip={offset}` powers the infinite scroll.
- `GET https://dummyjson.com/products/categories` seeds the category dropdown (slug-normalized).

## Deployment

Any static host (Vercel, Netlify, GitHub Pages, etc.) can serve the production build in `dist`. Run `npm run build`, push to GitHub, and wire up your preferred hosting provider. Add the resulting live URL back to this README when ready.

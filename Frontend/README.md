# Routine Labz — Updated Frontend

This package is the cleaned and updated version of the uploaded Routine Labz frontend.

## What was checked

- Existing JSX and TSX source files were reviewed.
- Missing third-party runtime imports were removed from the source so the project only needs React and React DOM at runtime.
- The existing product/cart/order API structure was preserved with native `fetch` services.
- Old Monster Musclez references were removed from the frontend source.
- Existing Routine Labz product assets were retained.
- Added dedicated pages:
  - `/about`
  - `/lab`
  - `/standard`
  - `/verify`
  - `/cart`
  - `/checkout`
  - `/order-success`
  - `/product/<id>`
- Added the new About / Lab / Routine Standard sections to the homepage.
- Kept the existing Product Film, Products, Distributor, Contact and Field Reports areas.
- No retail-price or commission blocks were added to the brand sections.

## Start

Extract the ZIP, open the project folder in Git Bash / terminal and run:

```bash
npm install
npm run dev
```

Then open the localhost URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Backend

The frontend uses these environment variables when provided:

```text
VITE_API_URL=/api
VITE_VERIFY_API_URL=http://localhost:8080
```

Create a `.env` file only if your backend is not available at the defaults.

Example:

```text
VITE_API_URL=http://localhost:8080/api
VITE_VERIFY_API_URL=http://localhost:8080
```

## Important for deployment

The app uses browser paths such as `/about`, `/lab`, `/standard`, `/verify`, `/cart` and `/product/1`. Your production Nginx configuration should send unknown frontend routes to `index.html` (SPA fallback) so direct page refreshes work.

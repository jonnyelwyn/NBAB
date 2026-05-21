# Next Best Audio Book

A lean static site for discovering trending audiobooks on Audible.

**Live:** https://nextbestaudiobook.com  
**Repo:** https://github.com/jonnyelwyn/NBAB

---

## Deploy to GitHub Pages

1. Push this repo to `main`
2. Go to **Settings → Pages**
3. Source: `Deploy from a branch` → Branch `main`, folder `/ (root)`
4. GitHub will publish to `https://jonnyelwyn.github.io/NBAB`
5. Point your domain (`nextbestaudiobook.com`) to GitHub Pages via your DNS:
   - Add a `CNAME` file in the repo root containing `nextbestaudiobook.com`
   - In your domain registrar, set A records to GitHub Pages IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Or set a `CNAME` DNS record pointing `www` → `jonnyelwyn.github.io`

---

## Update books

Edit `books.js`. Each object in the `books` array:

```js
{
  id: 16,                                   // unique number
  title: 'Book Title',
  author: 'Author Name',
  narrator: 'Narrator Name',
  coverImage: 'https://...',                // right-click cover on Audible → Copy Image Address
  duration: '12 hrs 30 mins',
  rating: 4.7,
  reviewCount: '45,000',
  review: '2–3 sentence review.',
  badges: ['Trending', 'Bestseller'],       // drives the tag filter buttons automatically
  audibleUrl: 'https://www.audible.co.uk/pd/...',
  amazonUrl:  'https://www.amazon.co.uk/dp/...'
}
```

Tag buttons are generated automatically from all unique badge values — no code changes needed.

---

## Change the offer copy

In `books.js`:

```js
const AUDIBLE_OFFER = 'Start your free 30-day Audible trial';
```

---

## Change your affiliate tag

In `books.js`:

```js
const AFFILIATE_TAG = 'nextbestaudiobook-21';
```

The tag is appended to every outbound Audible and Amazon link automatically.

---

## Change the default featured book

In `books.js`:

```js
const DEFAULT_INDEX = 0;  // 0 = first book in the array
```

---

## Switch to grid-first layout

In `index.html`, move the `<section class="grid-section">` block above the `<section class="coverflow-section">` block, and remove the `hidden` attribute from `#bookGrid`.

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure and meta |
| `style.css`  | All styles — update `:root` variables to retheme |
| `books.js`   | Book data + affiliate tag + offer copy |
| `main.js`    | Carousel, spin, tag filters, CTAs |

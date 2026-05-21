/* ============================================================
   NEXT BEST AUDIO BOOK — main.js
   Carousel, spin, tag filters, book details, CTAs
   ============================================================ */

let currentIndex = DEFAULT_INDEX;
let isSpinning   = false;
let activeTag    = null;

// ---- Boot ----
document.addEventListener('DOMContentLoaded', () => {
  buildCarousel();
  buildTagNav();
  buildGrid();
  renderCarousel();
  renderBookDetails();
  renderCTA();

  document.getElementById('prevBtn').addEventListener('click', () => navigate(-1));
  document.getElementById('nextBtn').addEventListener('click', () => navigate(1));
  document.getElementById('spinBtn').addEventListener('click', spin);
  document.getElementById('gridToggle').addEventListener('click', toggleGrid);

  // Touch swipe on carousel
  const stage = document.getElementById('coverflowStage');
  let touchX = 0;
  stage.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 45) navigate(dx > 0 ? -1 : 1);
  }, { passive: true });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft')  { e.preventDefault(); navigate(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); navigate(1);  }
    if (e.key === ' ')          { e.preventDefault(); spin();        }
  });

  // Inject JSON-LD ItemList for crawlers
  injectItemListSchema();
});

// ---- Build carousel DOM ----
function buildCarousel() {
  const track = document.getElementById('coverflowTrack');
  track.innerHTML = '';
  books.forEach((book, i) => {
    const item = document.createElement('div');
    item.className    = 'cover-item';
    item.dataset.index = i;
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', book.title);

    const img    = document.createElement('img');
    img.src      = book.coverImage;
    img.alt      = `${book.title} by ${book.author}`;
    img.loading  = i === DEFAULT_INDEX ? 'eager' : 'lazy';
    img.width    = 200;
    img.height   = 300;

    item.appendChild(img);
    item.addEventListener('click',   () => { if (!isSpinning) goTo(i); });
    item.addEventListener('keydown', e  => { if (e.key === 'Enter' && !isSpinning) goTo(i); });
    track.appendChild(item);
  });
}

// ---- Render cover positions ----
// transitionMs: explicit duration in ms; omit for default (420ms)
function renderCarousel(transitionMs) {
  const dur   = typeof transitionMs === 'number' ? transitionMs : 420;
  const ease  = `transform ${dur}ms cubic-bezier(0.25,0.46,0.45,0.94), filter ${dur}ms ease, opacity ${dur}ms ease`;
  const count = books.length;

  document.querySelectorAll('.cover-item').forEach(item => {
    const i      = parseInt(item.dataset.index, 10);
    let offset   = i - currentIndex;

    // Wrap to shortest path around the ring
    if (offset >  count / 2) offset -= count;
    if (offset < -count / 2) offset += count;

    const abs = Math.abs(offset);

    if (abs > 4) {
      item.style.opacity        = '0';
      item.style.pointerEvents  = 'none';
      return;
    }

    item.style.opacity       = '1';
    item.style.pointerEvents = abs === 0 ? 'none' : 'auto';
    item.style.transition    = ease;

    if (offset === 0) {
      item.style.transform  = 'translateX(0px) rotateY(0deg) scale(1) translateZ(0px)';
      item.style.zIndex     = '10';
      item.style.filter     = 'brightness(1)';
    } else {
      const sign  = offset < 0 ? -1 : 1;
      const xPos  = sign * (128 + (abs - 1) * 82);
      const rot   = sign * -65;
      const scale = Math.max(0.52, 0.86 - (abs - 1) * 0.13);
      const bri   = Math.max(0.22, 0.62 - (abs - 1) * 0.16);
      const zPos  = -(abs * 80);

      item.style.transform  = `translateX(${xPos}px) rotateY(${rot}deg) scale(${scale}) translateZ(${zPos}px)`;
      item.style.zIndex     = String(10 - abs);
      item.style.filter     = `brightness(${bri})`;
    }
  });
}

// ---- Navigation ----
function navigate(dir) {
  if (isSpinning) return;
  goTo((currentIndex + dir + books.length) % books.length);
}

function goTo(index, instant = false) {
  currentIndex = index;
  renderCarousel(instant ? 0 : 420);
  if (!instant) {
    renderBookDetails();
    renderCTA();
  }
}

// ---- Spin ----
// Slowdown is a fixed 4-step sequence with known delays — predictable, smooth
const SLOWDOWN_MS = [130, 210, 320, 430];

function spin() {
  if (isSpinning) return;
  isSpinning = true;

  const btn    = document.getElementById('spinBtn');
  btn.classList.add('spinning');
  btn.disabled = true;

  const target    = pickTarget();
  const toTarget  = (target - currentIndex + books.length) % books.length;
  const extraLaps = 1 + Math.floor(Math.random() * 2);

  // Fast steps bring us to exactly SLOWDOWN_MS.length steps before target
  let fastSteps = extraLaps * books.length + toTarget - SLOWDOWN_MS.length;
  // Ensure at least half a lap of visible fast spin
  if (fastSteps < Math.ceil(books.length / 2)) fastSteps += books.length;

  let step     = 0;
  let fastDelay = 42;

  // Phase 1: fast snap through books
  function fastTick() {
    currentIndex = (currentIndex + 1) % books.length;
    step++;
    renderCarousel(50);

    if (step < fastSteps) {
      fastDelay = Math.min(fastDelay + 0.6, 56);
      setTimeout(fastTick, fastDelay);
    } else {
      slowTick(0); // hand off to slowdown phase
    }
  }

  // Phase 2: fixed slowdown sequence — each step has a known delay so
  // transition duration can match it exactly, eliminating freeze frames
  function slowTick(i) {
    currentIndex = (currentIndex + 1) % books.length;
    const delay  = SLOWDOWN_MS[i];
    const isLast = i === SLOWDOWN_MS.length - 1;
    renderCarousel(Math.round(delay * 0.9));

    if (!isLast) {
      setTimeout(() => slowTick(i + 1), delay);
    } else {
      setTimeout(() => {
        renderBookDetails();
        renderCTA();
        isSpinning   = false;
        btn.classList.remove('spinning');
        btn.disabled = false;
      }, delay + 80);
    }
  }

  fastTick();
}

function pickTarget() {
  if (activeTag) {
    const pool = books
      .map((b, i) => ({ b, i }))
      .filter(({ b, i }) => i !== currentIndex && b.badges.includes(activeTag));
    if (pool.length > 0) {
      return pool[Math.floor(Math.random() * pool.length)].i;
    }
  }
  return randomExcluding(currentIndex, books.length);
}

function randomExcluding(exclude, max) {
  let n;
  do { n = Math.floor(Math.random() * max); } while (n === exclude);
  return n;
}

// ---- Tag Nav ----
function buildTagNav() {
  const nav  = document.getElementById('tagNav');
  const tags = [...new Set(books.flatMap(b => b.badges))].sort();

  tags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'tag-btn';
    btn.textContent = tag;
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', () => onTagClick(tag, btn));
    nav.appendChild(btn);
  });
}

function onTagClick(tag, btn) {
  if (isSpinning) return;

  const allBtns = document.querySelectorAll('.tag-btn');

  if (activeTag === tag) {
    // Deselect — clear filter
    activeTag = null;
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
    return;
  }

  activeTag = tag;
  allBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
  spin(); // spin to a book matching this tag
}

// ---- Book Details ----
function renderBookDetails() {
  const book  = books[currentIndex];
  const panel = document.getElementById('bookDetails');

  panel.innerHTML = `
    <h2 class="book-title">
      ${esc(book.title)}
      ${book.subtitle ? `<span class="book-subtitle">${esc(book.subtitle)}</span>` : ''}
    </h2>
    <p class="book-author">by ${esc(book.author)}</p>
    <div class="book-meta" aria-label="Book stats">
      <span><span class="stars" aria-label="${book.rating} out of 5 stars">${renderStars(book.rating)}</span> ${book.rating}</span>
      <span>${esc(book.reviewCount)} reviews</span>
      <span>&#128336; ${esc(book.duration)}</span>
    </div>
    <p class="book-narrator">Narrated by ${esc(book.narrator)}</p>
    <p class="book-review">${esc(book.review)}</p>
    <div class="badges" aria-label="Tags">
      ${book.badges.map(b => `<span class="badge">${esc(b)}</span>`).join('')}
    </div>
  `;
}

function renderStars(rating) {
  const rounded = Math.round(rating);
  return '★'.repeat(rounded) + '☆'.repeat(5 - rounded);
}

// ---- CTA ----
function renderCTA() {
  const book    = books[currentIndex];
  const audible = affiliateUrl(book.audibleUrl);
  const amazon  = affiliateUrl(book.amazonUrl);
  const zone    = document.getElementById('ctaZone');

  zone.innerHTML = `
    <a href="${audible}" class="cta-primary" target="_blank" rel="noopener sponsored"
       aria-label="Listen to ${esc(book.title)} on Audible">
      Listen Now on Audible
    </a>
    <a href="${audible}" class="cta-secondary" target="_blank" rel="noopener sponsored">
      ${esc(AUDIBLE_OFFER)}
    </a>
    <a href="${amazon}" class="cta-amazon" target="_blank" rel="noopener sponsored">
      View on Amazon ↗
    </a>
    <p class="offer-note">No commitment &mdash; cancel anytime.</p>
  `;
}

function affiliateUrl(base) {
  if (!base) return '#';
  const sep = base.includes('?') ? '&' : '?';
  return `${base}${sep}tag=${AFFILIATE_TAG}`;
}

// ---- Grid ----
function buildGrid() {
  const grid = document.getElementById('bookGrid');
  grid.innerHTML = '';
  books.forEach((book, i) => {
    const div = document.createElement('div');
    div.className = 'grid-book';
    div.setAttribute('tabindex', '0');
    div.setAttribute('role', 'button');
    div.setAttribute('aria-label', `Select ${book.title}`);
    div.innerHTML = `
      <img src="${esc(book.coverImage)}" alt="${esc(book.title)} by ${esc(book.author)}" loading="lazy" width="120" height="180">
      <p class="grid-book-title">${esc(book.title)}</p>
    `;
    div.addEventListener('click', () => {
      goTo(i);
      document.querySelector('.coverflow-section').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    div.addEventListener('keydown', e => { if (e.key === 'Enter') div.click(); });
    grid.appendChild(div);
  });
}

function toggleGrid() {
  const grid   = document.getElementById('bookGrid');
  const btn    = document.getElementById('gridToggle');
  const hidden = grid.hasAttribute('hidden');
  if (hidden) {
    grid.removeAttribute('hidden');
    btn.textContent = 'Hide books ↑';
    btn.setAttribute('aria-expanded', 'true');
  } else {
    grid.setAttribute('hidden', '');
    btn.textContent = 'Reveal all books ↓';
    btn.setAttribute('aria-expanded', 'false');
  }
}

// ---- JSON-LD ItemList (injected after load for crawlers) ----
function injectItemListSchema() {
  const list = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Next Best Audio Book — Featured Audiobooks',
    url: 'https://nextbestaudiobook.com',
    numberOfItems: books.length,
    itemListElement: books.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Book',
        name: b.title,
        author: { '@type': 'Person', name: b.author },
        url: b.audibleUrl
      }
    }))
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(list);
  document.head.appendChild(script);
}

// ---- Util ----
function esc(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}

/* ============================================================
   NEXT BEST AUDIO BOOK — books.js

   ★ AFFILIATE TAG  → update AFFILIATE_TAG below
   ★ OFFER COPY     → update AUDIBLE_OFFER below
   ★ DEFAULT BOOK   → update DEFAULT_INDEX (0 = first in array)
   ★ ADD A BOOK     → add object to the books array
   ★ REMOVE A BOOK  → delete the object
   ★ COVER IMAGES   → visit the Audible page, right-click cover → Copy Image Address
   ============================================================ */

const AFFILIATE_TAG  = 'nextbestaudio-21';           // ← your Amazon Associates tag
const GENIUS_LINK    = 'https://geni.us/nbab-audible'; // ← free trial geo-routed link
const AUDIBLE_OFFER  = 'Start your free 30-day Audible trial'; // ← update with current offer
const DEFAULT_INDEX  = 0;                            // ← which book shows first

const books = [
  {
    id: 1,
    title: 'Fourth Wing',
    subtitle: 'Empyrean, Book 1',
    author: 'Rebecca Yarros',
    narrator: 'Rebecca Soler & Teddy Hamilton',
    coverImage: 'https://m.media-amazon.com/images/I/A1KEOf-coBL._SL500_.jpg',
    duration: '22 hrs 2 mins',
    rating: 4.8,
    reviewCount: '504,987',
    review: 'A breakout fantasy epic that took social media by storm — dragon riders, forbidden romance, and brutal military academia collide in one genuinely thrilling package. Rebecca Soler\'s narration is exceptional, and the pacing keeps you hooked through every twist.',
    badges: ['Trending', 'Bestseller', 'Fan Favourite'],
    audibleUrl: 'https://www.audible.co.uk/pd/Fourth-Wing-Audiobook/B0BXM2FJVD',
    amazonUrl:  'https://www.amazon.com/Fourth-Wing-Empyrean-Book-1/dp/B0BVDJ293G'
  },
  {
    id: 2,
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    narrator: 'Ray Porter',
    coverImage: 'https://m.media-amazon.com/images/I/81Nzlrfud+L._SL500_.jpg',
    duration: '16 hrs 10 mins',
    rating: 4.7,
    reviewCount: '241,734',
    review: 'Now a major motion picture starring Ryan Gosling. A lone astronaut wakes with no memory on a mission to save Earth — what unfolds is funny, heartbreaking, and scientifically dazzling. Ray Porter\'s narration is some of the finest you\'ll find anywhere.',
    badges: ['Bestseller', 'Critic\'s Pick', 'Film Adaptation'],
    audibleUrl: 'https://www.audible.co.uk/pd/Project-Hail-Mary-Audiobook/B08G9PRS1K',
    amazonUrl:  'https://www.amazon.com/Project-Hail-Mary/dp/B08GB58KD5'
  },
  {
    id: 3,
    title: 'Atomic Habits',
    subtitle: 'The life-changing million-copy #1 bestseller',
    author: 'James Clear',
    narrator: 'James Clear',
    coverImage: 'https://m.media-amazon.com/images/I/81iss3ldpLL._SL500_.jpg',
    duration: '5 hrs 35 mins',
    rating: 4.8,
    reviewCount: '148,111',
    review: 'The most practical book on behaviour change ever written. Clear\'s systems-over-goals framework is genuinely useful, and hearing it in the author\'s own voice adds real conviction. Short enough to finish on a long walk.',
    badges: ['Bestseller', 'Non-fiction'],
    audibleUrl: 'https://www.audible.co.uk/pd/Atomic-Habits-Audiobook/B01N5ESSKW',
    amazonUrl:  'https://www.amazon.com/Atomic-Habits-James-Clear-audiobook/dp/B07J1PMF1H'
  },
  {
    id: 4,
    title: 'Harry Potter & the Philosopher\'s Stone',
    subtitle: 'Full Cast BBC Edition',
    author: 'J.K. Rowling',
    narrator: 'Full Cast',
    coverImage: 'https://m.media-amazon.com/images/I/51YVgooSJuL._SL500_.jpg',
    duration: '8 hrs 41 mins',
    rating: 4.8,
    reviewCount: '156,233',
    review: 'An entirely new production with hundreds of unique voices and Dolby Atmos sound design — Hugh Laurie as Dumbledore, Riz Ahmed as Snape, Matthew Macfadyen as Voldemort, and Cush Jumbo narrating. The immersive audio makes Quidditch and Hogwarts feel genuinely cinematic. Wear headphones.',
    badges: ['Full Cast', 'Classic', 'Fan Favourite'],
    audibleUrl: 'https://www.audible.co.uk/pd/Harry-Potter-and-the-Philosophers-Stone-Audiobook/B017V4IWVG',
    amazonUrl:  'https://www.amazon.com/Harry-Potter-Philosophers-Stone-Full-Cast/dp/B0F14SX2V2'
  },
  {
    id: 5,
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    narrator: 'Full Cast (BBC Radio)',
    coverImage: 'https://placehold.co/300x450/1565C0/ffffff?text=Hitchhiker%27s+Guide',
    duration: '3 hrs 37 mins',
    rating: 4.8,
    reviewCount: '42,110',
    review: 'The original BBC Radio 4 dramatisation remains the definitive version — Adams\' surreal, perfectly-timed comedy sounds best when heard rather than read. The cast, sound design, and sheer absurdity are impeccable.',
    badges: ['Full Cast', 'Classic', 'Comedy'],
    audibleUrl: 'https://www.audible.co.uk/pd/The-Hitchhikers-Guide-to-the-Galaxy-Audiobook/B004EXKW2A',
    amazonUrl:  'https://www.amazon.co.uk/dp/0330508539'
  },
  {
    id: 6,
    title: 'Lessons in Chemistry',
    subtitle: 'The modern classic multi-million-copy bestseller',
    author: 'Bonnie Garmus',
    narrator: 'Miranda Raison',
    coverImage: 'https://m.media-amazon.com/images/I/51-RGNyz08L._SL500_.jpg',
    duration: '11 hrs 56 mins',
    rating: 4.6,
    reviewCount: '313,945',
    review: 'A chemist-turned-TV-cooking-host in 1960s California — funnier, sharper, and more emotionally gutting than the premise suggests. Raison\'s narration gives the protagonist a steely warmth that makes this adaptation distinctly her own.',
    badges: ['Trending', 'TV Adaptation', 'Bestseller'],
    audibleUrl: 'https://www.audible.co.uk/pd/Lessons-in-Chemistry-Audiobook/B09FBCXMVN',
    amazonUrl:  'https://www.amazon.com/Audible-Lessons-in-Chemistry/dp/B09BVX1BT8'
  },
  {
    id: 7,
    title: 'Iron Flame',
    subtitle: 'Empyrean, Book 2',
    author: 'Rebecca Yarros',
    narrator: 'Rebecca Soler & Teddy Hamilton',
    coverImage: 'https://m.media-amazon.com/images/I/A19tBquzlPL._SL500_.jpg',
    duration: '28 hrs 16 mins',
    rating: 4.7,
    reviewCount: '417,844',
    review: 'The follow-up to Fourth Wing is bigger, darker, and longer — in the best possible way. The dual narration has settled into something genuinely special, and the political intrigue adds real texture to the dragon-riding action.',
    badges: ['Trending', 'Series', 'Fantasy'],
    audibleUrl: 'https://www.audible.co.uk/pd/Iron-Flame-Audiobook/B0CJ5D9MDT',
    amazonUrl:  'https://www.amazon.com/Iron-Flame-Empyrean-Book-2/dp/B0C9V75P93'
  },
  {
    id: 8,
    title: 'Tomorrow, and Tomorrow, and Tomorrow',
    author: 'Gabrielle Zevin',
    narrator: 'Jennifer Kim & Julian Cihi',
    coverImage: 'https://m.media-amazon.com/images/I/81wdWQiZG5L._SL500_.jpg',
    duration: '13 hrs 52 mins',
    rating: 4.4,
    reviewCount: '132,448',
    review: 'A novel about friendship, creativity, and video game design that manages to be one of the most emotionally intelligent books in years. Kim\'s narration captures both the intellectual excitement and the quiet grief with remarkable precision.',
    badges: ['Critic\'s Pick', 'Bestseller'],
    audibleUrl: 'https://www.audible.co.uk/pd/Tomorrow-and-Tomorrow-and-Tomorrow-Audiobook/B09Z6KPHRJ',
    amazonUrl:  'https://www.amazon.com/Tomorrow-and/dp/B09LHXNDSP'
  },
  {
    id: 9,
    title: 'The Thursday Murder Club',
    subtitle: 'Book 1 of 5: Thursday Murder Club Mysteries',
    author: 'Richard Osman',
    narrator: 'Lesley Manville & Marian Keyes',
    coverImage: 'https://m.media-amazon.com/images/I/71BSZeMNc-L._SL500_.jpg',
    duration: '12 hrs 25 mins',
    rating: 4.3,
    reviewCount: '181,963',
    review: 'Soon to be a major Netflix film. Four retirement-home residents who solve cold cases together stumble into a very live murder. Warm, funny, and genuinely clever — Lesley Manville\'s narration is pitch-perfect, and there\'s an exclusive conversation with Richard Osman and Marian Keyes at the end.',
    badges: ['Bestseller', 'Film Adaptation', 'Comedy'],
    audibleUrl: 'https://www.audible.co.uk/pd/The-Thursday-Murder-Club-Audiobook/B089FRTJPR',
    amazonUrl:  'https://www.amazon.com/The-Thursday-Murder-Club/dp/B07V5WPCSK'
  },
  {
    id: 10,
    title: 'James',
    subtitle: 'Winner of the 2025 Pulitzer Prize for Fiction',
    author: 'Percival Everett',
    narrator: 'Dominic Hoffman',
    coverImage: 'https://m.media-amazon.com/images/I/81pEI63-5qL._SL500_.jpg',
    duration: '7 hrs 49 mins',
    rating: 4.6,
    reviewCount: '101,659',
    review: 'Winner of the 2025 Pulitzer Prize, the National Book Award, and the British Book Awards Fiction Book of the Year. A retelling of Huckleberry Finn from Jim\'s perspective — devastating, necessary, and ferociously funny. Hoffman\'s narration is The Guardian\'s Audiobook of the Week.',
    badges: ['Award Winner', 'Trending'],
    audibleUrl: 'https://www.audible.co.uk/pd/James-Audiobook/B0CW1D1LBT',
    amazonUrl:  'https://www.amazon.com/Audible-James/dp/B0CFYMW6G8'
  },
  {
    id: 11,
    title: 'Intermezzo',
    author: 'Sally Rooney',
    narrator: 'Paul Nugent & Aoife McMahon',
    coverImage: 'https://placehold.co/300x450/00695C/ffffff?text=Intermezzo',
    duration: '13 hrs 24 mins',
    rating: 4.4,
    reviewCount: '31,204',
    review: 'Rooney\'s most ambitious novel — two brothers grieving their father, both in complicated love affairs. Richer and more structurally inventive than her earlier work, and the dual narration gives each character a properly distinct inner life.',
    badges: ['Trending', 'Bestseller'],
    audibleUrl: 'https://www.audible.co.uk/pd/Intermezzo-Audiobook/B0D6KLXN9T',
    amazonUrl:  'https://www.amazon.co.uk/dp/0571365450'
  },
  {
    id: 12,
    title: 'A Little Life',
    author: 'Hanya Yanagihara',
    narrator: 'David Pittu',
    coverImage: 'https://placehold.co/300x450/263238/ffffff?text=A+Little+Life',
    duration: '32 hrs 47 mins',
    rating: 4.8,
    reviewCount: '54,109',
    review: 'One of the most emotionally affecting novels of the century — four friends in New York, and the long shadow of one man\'s childhood trauma. Pittu\'s narration is extraordinary, holding you through what is genuinely the most demanding listen on this list.',
    badges: ['Critic\'s Pick'],
    audibleUrl: 'https://www.audible.co.uk/pd/A-Little-Life-Audiobook/B012JTQWPC',
    amazonUrl:  'https://www.amazon.co.uk/dp/1447294157'
  },
  {
    id: 13,
    title: 'The Covenant of Water',
    author: 'Abraham Verghese',
    narrator: 'Soneela Nankani',
    coverImage: 'https://placehold.co/300x450/01579B/ffffff?text=Covenant+of+Water',
    duration: '24 hrs 2 mins',
    rating: 4.8,
    reviewCount: '37,829',
    review: 'A multigenerational family saga set in South India across 77 years — vast, humane, and rich with medical and cultural detail. Nankani\'s narration is extraordinary: warm, precisely inflected, and perfectly suited to the novel\'s sweep.',
    badges: ['Bestseller'],
    audibleUrl: 'https://www.audible.co.uk/pd/The-Covenant-of-Water-Audiobook/B0BYWZCT5P',
    amazonUrl:  'https://www.amazon.co.uk/dp/0802161960'
  },
  {
    id: 14,
    title: 'Demon Copperhead',
    author: 'Barbara Kingsolver',
    narrator: 'Charlie Thurston',
    coverImage: 'https://placehold.co/300x450/4A148C/ffffff?text=Demon+Copperhead',
    duration: '19 hrs 35 mins',
    rating: 4.7,
    reviewCount: '41,607',
    review: 'A Pulitzer Prize winner that retells David Copperfield in the opioid-ravaged Appalachian Mountains. Thurston\'s narration is one of the best performances in recent memory — raw, funny, and heartbreaking in equal measure.',
    badges: ['Award Winner', 'Critic\'s Pick', 'Bestseller'],
    audibleUrl: 'https://www.audible.co.uk/pd/Demon-Copperhead-Audiobook/B0B35CQPYH',
    amazonUrl:  'https://www.amazon.co.uk/dp/0571372392'
  },
  {
    id: 15,
    title: 'The Women',
    author: 'Kristin Hannah',
    narrator: 'Julia Whelan',
    coverImage: 'https://placehold.co/300x450/b71c1c/ffffff?text=The+Women',
    duration: '18 hrs 13 mins',
    rating: 4.8,
    reviewCount: '68,441',
    review: 'Vietnam War nurses who came home to no welcome, no recognition, no support. Hannah writes with great emotional intelligence, and Whelan — one of the finest audiobook narrators working today — gives this one absolutely everything she has.',
    badges: ['Trending', 'Bestseller', 'Historical Fiction'],
    audibleUrl: 'https://www.audible.co.uk/pd/The-Women-Audiobook/B0CJ22BFMR',
    amazonUrl:  'https://www.amazon.co.uk/dp/1250178630'
  }
];

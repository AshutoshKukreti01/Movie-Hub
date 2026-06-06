/*
  MovieHub - Movie Ticket Booking System
  Built by: Ashutosh Kukreti

  Frontend project built using HTML, CSS and JavaScript.

  Features:
  - Movie search and filtering
  - Seat booking
  - Booking summary
  - LocalStorage support
*/
// ─── MOVIE DATA ──────────────────────────────────────────────────────────────
// I'm storing movie details as an array of objects.
// Each movie has id, title, genre, rating, duration, year, price, poster, backdrop, desc, and badge info.

const MOVIES = [
  {
    id: 1,
    title: "Interstellar",
    genre: ["Sci-Fi", "Adventure"],
    rating: 8.7,
    duration: "2h 49m",
    year: 2014,
    price: { standard: 280, premium: 420 },
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&q=80",
    desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    badge: "trending",
    badgeLabel: "🔥 Trending"
  },
  {
    id: 2,
    title: "Dune: Part Two",
    genre: ["Sci-Fi", "Action"],
    rating: 8.5,
    duration: "2h 46m",
    year: 2024,
    price: { standard: 350, premium: 500 },
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1600&q=80",
    desc: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    badge: "new",
    badgeLabel: "✨ New"
  },
  {
    id: 3,
    title: "Oppenheimer",
    genre: ["Drama", "History"],
    rating: 8.4,
    duration: "3h 0m",
    year: 2023,
    price: { standard: 300, premium: 460 },
    poster: "https://images.unsplash.com/photo-1562813733-b31f71025d54?w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1600&q=80",
    desc: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    badge: "trending",
    badgeLabel: "🔥 Trending"
  },
  {
    id: 4,
    title: "The Dark Knight",
    genre: ["Action", "Thriller"],
    rating: 9.0,
    duration: "2h 32m",
    year: 2008,
    price: { standard: 260, premium: 390 },
    poster: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
    desc: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    badge: null,
    badgeLabel: null
  },
  {
    id: 5,
    title: "Inception",
    genre: ["Sci-Fi", "Thriller"],
    rating: 8.8,
    duration: "2h 28m",
    year: 2010,
    price: { standard: 260, premium: 400 },
    poster: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1601513445506-2ab0d4fb4229?w=1600&q=80",
    desc: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
    badge: null,
    badgeLabel: null
  },
  {
    id: 6,
    title: "Parasite",
    genre: ["Thriller", "Drama"],
    rating: 8.6,
    duration: "2h 12m",
    year: 2019,
    price: { standard: 240, premium: 360 },
    poster: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1600&q=80",
    desc: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    badge: "new",
    badgeLabel: "🏆 Award Winner"
  },
  {
    id: 7,
    title: "Avatar: The Way of Water",
    genre: ["Action", "Adventure"],
    rating: 7.8,
    duration: "3h 12m",
    year: 2022,
    price: { standard: 380, premium: 560 },
    poster: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&q=80",
    desc: "Jake Sully lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns, Jake must work with Neytiri.",
    badge: "trending",
    badgeLabel: "🔥 Trending"
  },
  {
    id: 8,
    title: "The Shawshank Redemption",
    genre: ["Drama"],
    rating: 9.3,
    duration: "2h 22m",
    year: 1994,
    price: { standard: 220, premium: 340 },
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1600&q=80",
    desc: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    badge: null,
    badgeLabel: null
  },
  {
    id: 9,
    title: "Poor Things",
    genre: ["Drama", "Fantasy"],
    rating: 8.0,
    duration: "2h 21m",
    year: 2023,
    price: { standard: 290, premium: 430 },
    poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=1600&q=80",
    desc: "The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by a brilliant and unorthodox scientist.",
    badge: "new",
    badgeLabel: "✨ New"
  },
  {
    id: 10,
    title: "Top Gun: Maverick",
    genre: ["Action", "Drama"],
    rating: 8.3,
    duration: "2h 11m",
    year: 2022,
    price: { standard: 300, premium: 450 },
    poster: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1600&q=80",
    desc: "After 30+ years of service, Pete 'Maverick' Mitchell is where he belongs, pushing the envelope as a courageous test pilot.",
    badge: "trending",
    badgeLabel: "🔥 Trending"
  },
  {
    id: 11,
    title: "Everything Everywhere",
    genre: ["Sci-Fi", "Comedy"],
    rating: 8.0,
    duration: "2h 19m",
    year: 2022,
    price: { standard: 260, premium: 400 },
    poster: "https://images.unsplash.com/photo-1604076913837-52ab5629fde9?w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1600&q=80",
    desc: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what's important to her by connecting with the lives she could have led.",
    badge: "new",
    badgeLabel: "🏆 Award Winner"
  },
  {
    id: 12,
    title: "Killers of the Flower Moon",
    genre: ["Crime", "Drama"],
    rating: 7.7,
    duration: "3h 26m",
    year: 2023,
    price: { standard: 320, premium: 480 },
    poster: "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?w=400&q=80",
    backdrop: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&q=80",
    desc: "Members of the Osage Nation are murdered under mysterious circumstances in the 1920s, sparking a major FBI investigation.",
    badge: null,
    badgeLabel: null
  }
];


// ─── SEAT LAYOUT ──────────────────────────────────────────────────────────────
// Rows A-E are standard seats, F-G are premium (cost more).
// The 'booked' array holds seat numbers that are already taken.

const SEAT_CONFIG = {
  rows: [
    { label: "A", seats: 10, type: "standard", booked: [2, 5, 8] },
    { label: "B", seats: 10, type: "standard", booked: [1, 4, 7, 9] },
    { label: "C", seats: 10, type: "standard", booked: [3, 6] },
    { label: "D", seats: 10, type: "standard", booked: [2, 10] },
    { label: "E", seats: 10, type: "standard", booked: [5, 6, 7] },
    { label: "F", seats: 8,  type: "premium",  booked: [2, 6] },
    { label: "G", seats: 8,  type: "premium",  booked: [1, 7, 8] }
  ]
};


// ─── APP STATE ────────────────────────────────────────────────────────────────
// Keeping track of what the user has selected so far

const state = {
  selectedMovie: null,
  selectedSeats: [],       // each item: { id: "A-3", isPremium: false }
  selectedTime: "10:30 AM",
  currentFilter: "All",
  searchQuery: "",
  filteredMovies: [...MOVIES]
};


// ─── DOM SHORTCUTS ────────────────────────────────────────────────────────────
// Just a small helper so I don't have to type document.getElementById every time

const $ = id => document.getElementById(id);

const navbar          = $("navbar");
const hamburger       = $("hamburger");
const navLinks        = $("navLinks");
const heroTitle       = $("heroTitle");
const heroDesc        = $("heroDesc");
const heroBgImg       = $("heroBgImg");
const heroBookBtn     = $("heroBookBtn");
const heroThumbsEl    = $("heroThumbnails");
const searchInput     = $("searchInput");
const searchClear     = $("searchClear");
const genreFiltersEl  = $("genreFilters");
const moviesGrid      = $("moviesGrid");
const noResults       = $("noResults");
const seatGrid        = $("seatGrid");
const showTimes       = $("showTimes");
const bookingBadge    = $("bookingBadge");
const panelMovie      = $("panelMovie");
const panelDate       = $("panelDate");
const panelTime       = $("panelTime");
const panelSeats      = $("panelSeats");
const panelTotal      = $("panelTotal");
const seatBreakdown   = $("seatBreakdown");
const bookingMovieName = $("bookingMovieName");
const confirmBtn      = $("confirmBookingBtn");
const bookingModal    = $("bookingModal");
const modalClose      = $("modalClose");
const modalSummary    = $("modalSummary");
const modalTotal      = $("modalTotal");
const submitBtn       = $("submitBookingBtn");
const successModal    = $("successModal");
const closeSuccessBtn = $("closeSuccessBtn");
const ticketCard      = $("ticketCard");
const successMsg      = $("successMsg");
const myBookingsBtn   = $("myBookingsBtn");
const myBookingsModal = $("myBookingsModal");
const closeMyBookings = $("closeMyBookings");
const bookingsList    = $("bookingsList");
const toast           = $("toast");


// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────

// Show a small toast message at the bottom of the screen
function showToast(msg, type = "info", duration = 3000) {
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.className = "toast";
  }, duration);
}

// Format today's date nicely for the booking summary
function formatDate() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "short", year: "numeric"
  });
}

// Generate a random booking reference like "MH3K9F2A"
function generateRef() {
  return "MH" + Date.now().toString(36).toUpperCase().slice(-6);
}

function scrollTo(el) {
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}


// ─── NAVBAR ───────────────────────────────────────────────────────────────────

// Add a background to the navbar once user scrolls down a bit
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 80);
});

// Hamburger menu toggle for mobile
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});


// ─── HERO SECTION ─────────────────────────────────────────────────────────────
// The hero shows a featured movie. The small thumbnails on the right
// let you switch which movie is featured.

const HERO_MOVIES = [0, 1, 2, 3]; // indices from MOVIES array

function buildHeroThumbs() {
  heroThumbsEl.innerHTML = "";
  HERO_MOVIES.forEach((idx, i) => {
    const m = MOVIES[idx];
    const div = document.createElement("div");
    div.className = "hero-thumb" + (i === 0 ? " active" : "");
    div.innerHTML = `<img src="${m.poster}" alt="${m.title}" loading="lazy" />`;
    div.addEventListener("click", () => switchHeroMovie(idx, div));
    heroThumbsEl.appendChild(div);
  });
}

function switchHeroMovie(movieIdx, thumbEl) {
  const m = MOVIES[movieIdx];

  // Fade out image, swap content, fade back in
  heroBgImg.style.opacity = "0";
  setTimeout(() => {
    heroBgImg.src = m.backdrop;
    heroTitle.textContent = m.title.toUpperCase();
    heroDesc.textContent = m.desc;
    heroBookBtn.dataset.movie = m.title;
    heroBgImg.style.opacity = "1";
  }, 400);

  heroThumbsEl.querySelectorAll(".hero-thumb").forEach(t => t.classList.remove("active"));
  if (thumbEl) thumbEl.classList.add("active");
}

heroBookBtn.addEventListener("click", () => {
  const title = heroBookBtn.dataset.movie;
  const movie = MOVIES.find(m => m.title === title) || MOVIES[0];
  selectMovie(movie);
  scrollTo(document.getElementById("booking"));
});

// Trailer button is just a demo — shows a toast
$("heroTrailerBtn").addEventListener("click", () => {
  showToast("🎬 Trailer feature coming soon!", "info");
});


// ─── GENRE FILTERS ────────────────────────────────────────────────────────────

function buildGenreFilters() {
  // Collect all unique genres from the movies list
  const genres = ["All", ...new Set(MOVIES.flatMap(m => m.genre))].sort((a, b) =>
    a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)
  );

  genreFiltersEl.innerHTML = genres.map(g =>
    `<button class="genre-btn${g === "All" ? " active" : ""}" data-genre="${g}">${g}</button>`
  ).join("");

  genreFiltersEl.querySelectorAll(".genre-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      genreFiltersEl.querySelectorAll(".genre-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentFilter = btn.dataset.genre;
      applyFilters();
    });
  });
}


// ─── SEARCH ───────────────────────────────────────────────────────────────────

searchInput.addEventListener("input", () => {
  state.searchQuery = searchInput.value.trim().toLowerCase();
  searchClear.classList.toggle("visible", state.searchQuery.length > 0);
  applyFilters();
});

searchClear.addEventListener("click", () => clearSearch());

function clearSearch() {
  searchInput.value = "";
  state.searchQuery = "";
  searchClear.classList.remove("visible");
  state.currentFilter = "All";
  genreFiltersEl.querySelectorAll(".genre-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.genre === "All")
  );
  applyFilters();
}

// Expose to HTML (used by the "Clear Filters" button in no-results section)
window.clearSearch = clearSearch;

function applyFilters() {
  let result = [...MOVIES];

  if (state.currentFilter !== "All") {
    result = result.filter(m => m.genre.includes(state.currentFilter));
  }

  if (state.searchQuery) {
    result = result.filter(m =>
      m.title.toLowerCase().includes(state.searchQuery) ||
      m.genre.some(g => g.toLowerCase().includes(state.searchQuery)) ||
      m.year.toString().includes(state.searchQuery)
    );
  }

  state.filteredMovies = result;
  renderMovies();
}


// ─── MOVIE CARDS ──────────────────────────────────────────────────────────────

function renderMovies() {
  if (state.filteredMovies.length === 0) {
    moviesGrid.style.display = "none";
    noResults.style.display = "block";
    return;
  }

  moviesGrid.style.display = "grid";
  noResults.style.display = "none";

  moviesGrid.innerHTML = state.filteredMovies.map((m, i) => `
    <div class="movie-card" data-id="${m.id}"
         style="animation-delay:${i * 0.06}s"
         tabindex="0" role="button" aria-label="Book ${m.title}">
      <div class="card-poster">
        <img class="card-img" src="${m.poster}" alt="${m.title}" loading="lazy" />
        <div class="card-overlay">
          <div class="card-badge-row">
            ${m.badge === "new"      ? `<span class="card-badge badge-new">${m.badgeLabel}</span>` : ""}
            ${m.badge === "trending" ? `<span class="card-badge badge-trending">${m.badgeLabel}</span>` : ""}
            <span class="card-badge badge-genre">${m.genre[0]}</span>
          </div>
          <button class="card-book-btn" data-id="${m.id}">🎟 Book Now</button>
        </div>
        <div class="card-rating">⭐ ${m.rating}</div>
      </div>
      <div class="card-info">
        <h3 class="card-title">${m.title}</h3>
        <div class="card-meta">
          <span>⏱ ${m.duration}</span>
          <span class="meta-sep">·</span>
          <span>📅 ${m.year}</span>
        </div>
      </div>
    </div>
  `).join("");

  // Attach click events to each card
  moviesGrid.querySelectorAll(".movie-card").forEach(card => {
    const id = parseInt(card.dataset.id);
    const movie = MOVIES.find(m => m.id === id);
    const bookBtn = card.querySelector(".card-book-btn");

    card.addEventListener("click", () => handleMovieSelect(movie));
    card.addEventListener("keydown", e => { if (e.key === "Enter") handleMovieSelect(movie); });

    // Stop the book button click from also triggering the card click
    bookBtn.addEventListener("click", e => {
      e.stopPropagation();
      handleMovieSelect(movie);
    });
  });
}

function handleMovieSelect(movie) {
  selectMovie(movie);
  scrollTo(document.getElementById("booking"));
  showToast(`🎬 ${movie.title} selected — pick your seats!`, "success");
}


// ─── MOVIE SELECTION ──────────────────────────────────────────────────────────

function selectMovie(movie) {
  state.selectedMovie = movie;
  state.selectedSeats = [];

  bookingMovieName.textContent = `Booking seats for: ${movie.title}`;
  bookingBadge.textContent = movie.title;
  panelMovie.textContent = movie.title;
  panelDate.textContent = formatDate();

  buildSeatGrid();
  updatePanel();
}


// ─── SEAT GRID ────────────────────────────────────────────────────────────────

function buildSeatGrid() {
  seatGrid.innerHTML = "";

  SEAT_CONFIG.rows.forEach(row => {
    const rowEl = document.createElement("div");
    rowEl.className = "seat-row";

    const label = document.createElement("div");
    label.className = "row-label";
    label.textContent = row.label;
    rowEl.appendChild(label);

    const leftGroup  = document.createElement("div");
    leftGroup.className = "seats-group";
    const rightGroup = document.createElement("div");
    rightGroup.className = "seats-group";

    const mid = Math.ceil(row.seats / 2);

    for (let s = 1; s <= row.seats; s++) {
      const seat = buildSeat(row, s);
      if (s <= mid) leftGroup.appendChild(seat);
      else rightGroup.appendChild(seat);
    }

    const aisle = document.createElement("div");
    aisle.className = "aisle";

    rowEl.appendChild(leftGroup);
    rowEl.appendChild(aisle);
    rowEl.appendChild(rightGroup);

    seatGrid.appendChild(rowEl);
  });
}

function buildSeat(row, seatNum) {
  const seatId   = `${row.label}-${seatNum}`;
  const isBooked = row.booked.includes(seatNum);
  const isPremium = row.type === "premium";

  const seat = document.createElement("div");
  seat.className = `seat ${isPremium ? "premium " : ""}${isBooked ? "booked" : "available"}`;
  seat.dataset.id   = seatId;
  seat.dataset.type = row.type;
  seat.title = isBooked
    ? `Seat ${seatId} — Already Booked`
    : `Seat ${seatId} — ${isPremium ? "Premium" : "Standard"} · Rs.${
        isPremium
          ? (state.selectedMovie?.price?.premium || 400)
          : (state.selectedMovie?.price?.standard || 280)
      }`;

  if (!isBooked) {
    seat.addEventListener("click", () => toggleSeat(seatId, isPremium, seat));
  }

  return seat;
}

function toggleSeat(seatId, isPremium, seatEl) {
  if (!state.selectedMovie) {
    showToast("Please select a movie first!", "error");
    return;
  }

  const idx = state.selectedSeats.findIndex(s => s.id === seatId);

  if (idx > -1) {
    // Deselect this seat
    state.selectedSeats.splice(idx, 1);
    seatEl.classList.remove("selected");
    seatEl.classList.add("available");
  } else {
    if (state.selectedSeats.length >= 8) {
      showToast("You can only book up to 8 seats at a time.", "error");
      return;
    }
    state.selectedSeats.push({ id: seatId, isPremium });
    seatEl.classList.remove("available");
    seatEl.classList.add("selected");
  }

  updatePanel();
}


// ─── BOOKING PANEL ────────────────────────────────────────────────────────────
// Updates the summary on the right whenever seats are selected/deselected

function updatePanel() {
  const movie = state.selectedMovie;
  const seats = state.selectedSeats;

  if (!movie || seats.length === 0) {
    panelSeats.textContent = "None selected";
    panelTotal.textContent = "Rs.0";
    seatBreakdown.innerHTML = "";
    confirmBtn.disabled = true;
    modalTotal.textContent = "0";
    return;
  }

  panelSeats.textContent = seats.map(s => s.id).join(", ");

  const stdSeats  = seats.filter(s => !s.isPremium);
  const premSeats = seats.filter(s => s.isPremium);

  let breakdown = "";
  if (stdSeats.length > 0) {
    breakdown += `<div class="breakdown-row">
      <span>Standard x ${stdSeats.length}</span>
      <span>Rs.${stdSeats.length * movie.price.standard}</span>
    </div>`;
  }
  if (premSeats.length > 0) {
    breakdown += `<div class="breakdown-row">
      <span>Premium x ${premSeats.length}</span>
      <span>Rs.${premSeats.length * movie.price.premium}</span>
    </div>`;
  }
  seatBreakdown.innerHTML = breakdown;

  const total = stdSeats.length * movie.price.standard + premSeats.length * movie.price.premium;
  panelTotal.textContent  = `Rs.${total}`;
  modalTotal.textContent  = total;
  modalSummary.textContent = `${seats.length} seat${seats.length > 1 ? "s" : ""} · Rs.${total} · ${movie.title}`;

  confirmBtn.disabled = false;
}


// ─── SHOW TIME SELECTOR ───────────────────────────────────────────────────────

showTimes.querySelectorAll(".time-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    showTimes.querySelectorAll(".time-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.selectedTime = btn.dataset.time;
    panelTime.textContent = state.selectedTime;
  });
});


// ─── CONFIRM BOOKING ──────────────────────────────────────────────────────────

confirmBtn.addEventListener("click", () => {
  if (!state.selectedMovie || state.selectedSeats.length === 0) return;
  openModal(bookingModal);
});


// ─── FORM VALIDATION ──────────────────────────────────────────────────────────

submitBtn.addEventListener("click", () => {
  if (!validateForm()) return;
  processBooking();
});

function validateForm() {
  let valid = true;

  const name  = $("userName").value.trim();
  const email = $("userEmail").value.trim();
  const phone = $("userPhone").value.trim();

  // Check name
  if (!name || name.length < 2) {
    showFieldError("nameError", "Please enter your full name.");
    $("userName").classList.add("error");
    valid = false;
  } else {
    clearFieldError("nameError");
    $("userName").classList.remove("error");
  }

  // Basic email check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showFieldError("emailError", "Enter a valid email address.");
    $("userEmail").classList.add("error");
    valid = false;
  } else {
    clearFieldError("emailError");
    $("userEmail").classList.remove("error");
  }

  // Phone — just checking it's a reasonable length
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,15}$/;
  if (!phone || !phoneRegex.test(phone)) {
    showFieldError("phoneError", "Enter a valid phone number.");
    $("userPhone").classList.add("error");
    valid = false;
  } else {
    clearFieldError("phoneError");
    $("userPhone").classList.remove("error");
  }

  return valid;
}

function showFieldError(id, msg) {
  const el = $(id);
  if (el) el.textContent = msg;
}

function clearFieldError(id) {
  const el = $(id);
  if (el) el.textContent = "";
}

function processBooking() {
  const movie = state.selectedMovie;
  const seats = state.selectedSeats;
  const total = calcTotal();
  const ref   = generateRef();

  const name  = $("userName").value.trim();
  const email = $("userEmail").value.trim();
  const phone = $("userPhone").value.trim();

  const booking = {
    ref,
    movie:  movie.title,
    seats:  seats.map(s => s.id),
    time:   state.selectedTime,
    date:   formatDate(),
    total,
    name,
    email,
    phone,
    createdAt: new Date().toISOString()
  };

  // Save to LocalStorage
  saveBooking(booking);

  // Mark booked seats in the UI
  seats.forEach(s => {
    const seatEl = seatGrid.querySelector(`[data-id="${s.id}"]`);
    if (seatEl) {
      seatEl.classList.remove("selected", "available");
      seatEl.classList.add("booked");
    }
  });

  // Reset selected seats
  state.selectedSeats = [];
  updatePanel();

  closeModal(bookingModal);
  showSuccessModal(booking);
}

function calcTotal() {
  if (!state.selectedMovie) return 0;
  const movie = state.selectedMovie;
  return state.selectedSeats.reduce((sum, s) => {
    return sum + (s.isPremium ? movie.price.premium : movie.price.standard);
  }, 0);
}


// ─── SUCCESS MODAL ────────────────────────────────────────────────────────────

function showSuccessModal(booking) {
  successMsg.textContent = `${booking.seats.length} ticket${booking.seats.length > 1 ? "s" : ""} confirmed for ${booking.movie}`;

  ticketCard.innerHTML = `
    <div class="ticket-row"><span class="ticket-label">👤 Name</span><span class="ticket-val">${booking.name}</span></div>
    <div class="ticket-row"><span class="ticket-label">🎬 Movie</span><span class="ticket-val">${booking.movie}</span></div>
    <div class="ticket-row"><span class="ticket-label">📅 Date</span><span class="ticket-val">${booking.date}</span></div>
    <div class="ticket-row"><span class="ticket-label">⏱ Show</span><span class="ticket-val">${booking.time}</span></div>
    <div class="ticket-row"><span class="ticket-label">💺 Seats</span><span class="ticket-val">${booking.seats.join(", ")}</span></div>
    <div class="ticket-row"><span class="ticket-label">💰 Total</span><span class="ticket-val">Rs.${booking.total}</span></div>
    <div class="ticket-id">${booking.ref}</div>
  `;

  openModal(successModal);
  launchConfetti();
}

closeSuccessBtn.addEventListener("click", () => closeModal(successModal));

// Download ticket as a simple text file
$("downloadTicketBtn").addEventListener("click", () => {
  const content = ticketCard.innerText;
  const blob = new Blob([content], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "moviehub-ticket.txt";
  a.click();
  showToast("🎟 Ticket saved!", "success");
});


// ─── MY BOOKINGS MODAL ────────────────────────────────────────────────────────

myBookingsBtn.addEventListener("click", () => {
  renderBookingsList();
  openModal(myBookingsModal);
});

closeMyBookings.addEventListener("click", () => closeModal(myBookingsModal));

function renderBookingsList() {
  const bookings = getBookings();

  if (bookings.length === 0) {
    bookingsList.innerHTML = `<div class="no-bookings">🎟 No bookings yet. Book your first movie!</div>`;
    return;
  }

  // Show most recent first
  bookingsList.innerHTML = bookings
    .slice()
    .reverse()
    .map(b => `
      <div class="booking-entry">
        <div class="booking-entry-title">${b.movie}</div>
        <div class="booking-entry-meta">📅 ${b.date} · ⏱ ${b.time} · 💺 ${b.seats.join(", ")} · Ref: ${b.ref}</div>
        <div class="booking-entry-amount">Rs.${b.total}</div>
      </div>
    `).join("");
}


// ─── LOCALSTORAGE ─────────────────────────────────────────────────────────────
// Saving bookings so they persist after page reload

const LS_KEY = "moviehub_bookings";

function saveBooking(booking) {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(LS_KEY, JSON.stringify(bookings));
}

function getBookings() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch {
    return [];
  }
}


// ─── MODAL HELPERS ────────────────────────────────────────────────────────────

function openModal(modalEl) {
  modalEl.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(modalEl) {
  modalEl.classList.remove("active");
  document.body.style.overflow = "";
}

// Click outside modal to close
[bookingModal, successModal, myBookingsModal].forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal(modal);
  });
});

modalClose.addEventListener("click", () => closeModal(bookingModal));

// Escape key closes any open modal
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    [bookingModal, successModal, myBookingsModal].forEach(closeModal);
  }
});


// ─── CONFETTI ─────────────────────────────────────────────────────────────────
// Simple confetti effect on booking success — no library needed!

function launchConfetti() {
  const container = $("confetti");
  container.innerHTML = "";
  const colors = ["#E63B5A", "#FF8C42", "#FFD700", "#22c55e", "#60a5fa", "#a78bfa"];

  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("div");
    piece.style.cssText = `
      position:absolute;
      width:${Math.random() * 8 + 4}px;
      height:${Math.random() * 8 + 4}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
      left:${Math.random() * 100}%;
      top:-10px;
      opacity:1;
      pointer-events:none;
      animation:confettiFall ${Math.random() * 1.5 + 1}s ${Math.random() * 0.5}s ease-in forwards;
    `;
    container.appendChild(piece);
  }

  // Add the animation keyframes if not already added
  if (!document.getElementById("confettiStyle")) {
    const style = document.createElement("style");
    style.id = "confettiStyle";
    style.textContent = `
      @keyframes confettiFall {
        to { transform: translateY(200px) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}


// ─── SEARCH ICON IN NAVBAR ────────────────────────────────────────────────────

$("searchToggle").addEventListener("click", () => {
  const filterBar = $("filterBar");
  filterBar.scrollIntoView({ behavior: "smooth" });
  setTimeout(() => searchInput.focus(), 600);
});


// ─── CLEAR FORM ERRORS ON INPUT ───────────────────────────────────────────────

["userName", "userEmail", "userPhone"].forEach(id => {
  const el = $(id);
  if (el) {
    el.addEventListener("input", () => {
      el.classList.remove("error");
      const errMap = { userName: "nameError", userEmail: "emailError", userPhone: "phoneError" };
      clearFieldError(errMap[id]);
    });
  }
});


// ─── INIT ─────────────────────────────────────────────────────────────────────
// This runs once the page is fully loaded

function init() {
  buildHeroThumbs();
  buildGenreFilters();
  renderMovies();
  buildSeatGrid();

  panelDate.textContent = formatDate();

  // Dev note: just logging so I know the app started up fine
  console.log("%c🎬 MovieHub Loaded", "font-size:18px;font-weight:bold;color:#E63B5A;");
  console.log("%cCreated By Ashutosh Kukreti | B.Tech CSE, DIT University", "color:#FF8C42;font-size:12px;");
}

document.addEventListener("DOMContentLoaded", init);

/* =============================================================
   IRONFORGE — script.js  (Multi-page version)
   Construction Equipment & Materials E-Commerce
   ============================================================= */

'use strict';

/* ===== PRODUCT DATA ===== */
const products = [
  {
    id: 1, name: 'Heavy Duty Drill Driver', brand: 'DeWalt',
    category: 'power-tools', price: 289, oldPrice: 349, rating: 4.8,
    specs: { Power: '20V MAX', Torque: '820 in-lbs', Chuck: '1/2 in', Weight: '3.6 lbs', Battery: '2x 2.0Ah', Warranty: '3 Years' },
    desc: 'Professional-grade cordless drill driver built for demanding job sites. Features variable speed, LED work light, and ergonomic grip.',
    badge: 'sale', isNew: false, color: '#2C3E50'
  },
  {
    id: 2, name: 'Impact Wrench 1/2"', brand: 'Milwaukee',
    category: 'power-tools', price: 449, oldPrice: null, rating: 4.9,
    specs: { Torque: '700 ft-lbs', 'Max RPM': '2400', Drive: '1/2 in', Weight: '2.1 lbs', Voltage: '18V', IPX: 'IP54' },
    desc: 'The most powerful cordless impact wrench in its class. Ideal for heavy fastening applications on job sites and automotive work.',
    badge: 'new', isNew: true, color: '#8B1A1A'
  },
  {
    id: 3, name: 'Circular Saw 7-1/4"', brand: 'Makita',
    category: 'power-tools', price: 199, oldPrice: 229, rating: 4.6,
    specs: { Blade: '7-1/4 in', 'No-load speed': '5800 RPM', Bevel: '0–56°', Weight: '10.1 lbs', Power: '15A', Cord: '6 ft' },
    desc: 'Precision circular saw for professionals requiring accurate cuts in all types of lumber and engineered wood.',
    badge: 'sale', isNew: false, color: '#1A5276'
  },
  {
    id: 4, name: 'Rotary Hammer SDS+', brand: 'Bosch',
    category: 'power-tools', price: 379, oldPrice: null, rating: 4.7,
    specs: { 'Impact Energy': '3.2 ft-lbs', BPM: '4580', 'Max Drilling': '1-1/8 in', Weight: '5.5 lbs', Modes: '3 Mode', Voltage: 'Corded' },
    desc: 'Three-function rotary hammer with drilling, hammer drilling, and chiseling modes for concrete and masonry work.',
    badge: null, isNew: false, color: '#154360'
  },
  {
    id: 5, name: 'Tape Measure Pro 25ft', brand: 'Stanley',
    category: 'hand-tools', price: 34, oldPrice: null, rating: 4.5,
    specs: { Length: '25 ft / 7.62m', Width: '1 in', Standout: '11 ft', Case: 'Nylon', Hook: 'True Zero', Lock: 'Thumb' },
    desc: 'Professional-grade tape measure with standout technology and high-visibility markings for indoor and outdoor use.',
    badge: null, isNew: false, color: '#784212'
  },
  {
    id: 6, name: 'Spirit Level 48"', brand: 'Stanley',
    category: 'hand-tools', price: 67, oldPrice: null, rating: 4.4,
    specs: { Length: '48 in', Vials: '3', Accuracy: '±0.5mm/m', Material: 'Aluminum', Magnets: 'No', Range: '0–180°' },
    desc: 'Heavy-duty spirit level with machined frames for contractors requiring precision alignment on large projects.',
    badge: null, isNew: false, color: '#1B4F72'
  },
  {
    id: 7, name: 'Safety Helmet Class E', brand: '3M',
    category: 'safety', price: 48, oldPrice: null, rating: 4.6,
    specs: { Standard: 'ANSI Z89.1', Class: 'E', Material: 'HDPE', Weight: '14 oz', Colors: '6 Options', Slots: '4 Point' },
    desc: 'Electrically-insulated hard hat designed for construction workers, offering superior protection and all-day comfort.',
    badge: null, isNew: true, color: '#F5A623'
  },
  {
    id: 8, name: 'Concrete Mixer 9 cu.ft', brand: 'Belle',
    category: 'heavy-machinery', price: 1249, oldPrice: 1499, rating: 4.5,
    specs: { Capacity: '9 cu ft', Motor: '1.5 HP', 'Drum Speed': '28 RPM', Weight: '176 lbs', Power: '120V 60Hz', Warranty: '2 Years' },
    desc: 'Professional electric concrete mixer for continuous mixing operations. Suitable for medium to large construction projects.',
    badge: 'sale', isNew: false, color: '#2C3E50'
  },
  {
    id: 9, name: 'Angle Grinder 4-1/2"', brand: 'Makita',
    category: 'power-tools', price: 129, oldPrice: null, rating: 4.7,
    specs: { Disc: '4-1/2 in', RPM: '11000', Power: '7.5A', Weight: '4.9 lbs', Guard: 'Adjustable', Lock: 'Spindle' },
    desc: 'High-performance angle grinder for cutting, grinding, and polishing metal, concrete, and masonry materials.',
    badge: 'new', isNew: true, color: '#1B6CA8'
  },
  {
    id: 10, name: 'Hydraulic Floor Jack 3T', brand: 'Craftsman',
    category: 'heavy-machinery', price: 189, oldPrice: 220, rating: 4.3,
    specs: { Capacity: '3 Ton', 'Min Height': '3-1/4 in', 'Max Height': '19-5/8 in', Weight: '36 lbs', Type: 'Low Profile', Saddle: 'Rubber' },
    desc: 'Professional hydraulic floor jack with low-profile design for easy positioning under vehicles and machinery.',
    badge: 'sale', isNew: false, color: '#922B21'
  },
  {
    id: 11, name: 'Safety Gloves Cut-5', brand: 'Ansell',
    category: 'safety', price: 28, oldPrice: null, rating: 4.6,
    specs: { Standard: 'EN388 4543', Cut: 'Level 5', Palm: 'Nitrile', Sizes: 'S–XXL', 'Touch Screen': 'Yes', Grip: 'Wet/Dry' },
    desc: 'High cut-resistance gloves for handling sharp materials. Touchscreen compatible palm for use with mobile devices.',
    badge: null, isNew: true, color: '#145A32'
  },
  {
    id: 12, name: 'Portland Cement 50kg', brand: 'Holcim',
    category: 'materials', price: 22, oldPrice: null, rating: 4.2,
    specs: { Type: 'Type I/II', Weight: '50 kg', Strength: '4500 psi', 'Setting Time': '45–375 min', Origin: 'Domestic', Standard: 'ASTM C150' },
    desc: 'High-quality Portland cement for general construction use. Suitable for foundations, slabs, columns, and structural work.',
    badge: null, isNew: false, color: '#808B96'
  }
];

/* ===== STATE ===== */
let cart = JSON.parse(sessionStorage.getItem('ifCart') || '[]');
let currentProduct = null;

/* ===== PERSIST CART ===== */
function persistCart() {
  sessionStorage.setItem('ifCart', JSON.stringify(cart));
}

/* ===== CART FUNCTIONS ===== */
function addToCart(productId, qty = 1) {
  const p = products.find(x => x.id === productId);
  if (!p) return;
  const existing = cart.find(x => x.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...p, qty });
  }
  persistCart();
  updateCartCount();
  showToast(`${p.name} added to cart`, 'success');
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  persistCart();
  updateCartCount();
  renderCart();
}

function updateQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  persistCart();
  renderCart();
}

function updateCartCount() {
  const total = cart.reduce((sum, x) => sum + x.qty, 0);
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = total;
  const cartBtn = document.querySelector('.nav-btn[data-cart]');
  if (cartBtn) cartBtn.setAttribute('aria-label', `Shopping cart, ${total} item${total !== 1 ? 's' : ''}`);
}

function cartTotal() {
  return cart.reduce((sum, x) => sum + x.price * x.qty, 0);
}

/* ===== ACTIVE NAV HIGHLIGHT ===== */
function setActiveNavFromPage() {
  const page = document.body.dataset.page;
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    if (link.dataset.page === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ===== PRODUCT CARD HTML ===== */
function productCard(p) {
  const priceOld = p.oldPrice
    ? `<span class="product-price-old" aria-label="Original price $${p.oldPrice}">$${p.oldPrice}</span>`
    : '';
  const badgeLabel = p.badge === 'new' ? 'New' : p.badge === 'sale' ? 'Sale' : '';
  const badge = p.badge
    ? `<span class="badge ${p.badge}" aria-label="${badgeLabel} item">${badgeLabel}</span>`
    : '';

  return `
  <article class="product-card" role="listitem" aria-label="${p.name} by ${p.brand}">
    <div class="product-img-wrap">
      <div class="product-badges" aria-hidden="true">${badge}</div>
      <div class="product-img-placeholder"
           role="img"
           aria-label="Product image placeholder for ${p.name}"
           style="background:linear-gradient(135deg,${p.color}22,${p.color}44);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
             stroke="${p.color}" stroke-width="1.2" aria-hidden="true" focusable="false">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <span>${p.brand}</span>
      </div>
      <div class="product-action-overlay" aria-hidden="true">
        <button class="overlay-btn"
                onclick="event.stopPropagation();goToProduct(${p.id})"
                tabindex="-1">
          Details
        </button>
        <button class="overlay-btn primary"
                onclick="event.stopPropagation();addToCart(${p.id})"
                tabindex="-1">
          Add to Cart
        </button>
      </div>
    </div>
    <div class="product-info">
      <p class="product-brand">${p.brand}</p>
      <h3 class="product-name">
        <a href="product-detail.html?id=${p.id}"
           style="text-decoration:none;color:inherit;">
          ${p.name}
        </a>
      </h3>
      <div class="product-footer">
        <div>
          <span class="product-price">
            <span class="currency" aria-hidden="true">$</span>${p.price.toLocaleString()}
          </span>
          ${priceOld}
        </div>
        <button class="add-cart-btn"
                onclick="addToCart(${p.id})"
                aria-label="Add ${p.name} to cart">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5" aria-hidden="true" focusable="false">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5"  y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>
    </div>
  </article>`;
}

/* ===== NAVIGATE TO PRODUCT DETAIL ===== */
function goToProduct(id) {
  window.location.href = `product-detail.html?id=${id}`;
}

/* ===== RENDER GRIDS ===== */
function renderHomeGrids() {
  const homeGrid = document.getElementById('homeProductGrid');
  if (homeGrid) homeGrid.innerHTML = products.slice(0, 8).map(productCard).join('');
}

function renderShopGrid(list) {
  const grid = document.getElementById('shopProductGrid');
  const countEl = document.getElementById('shopProductCount');
  if (grid) grid.innerHTML = list.map(productCard).join('');
  if (countEl) countEl.textContent = list.length;
}

/* ===== FILTER & SORT (Shop Page) ===== */
function filterCategory(cat) {
  document.querySelectorAll('.cat-chip').forEach(chip => {
    const isActive = chip.dataset.category === cat;
    chip.classList.toggle('active', isActive);
    chip.setAttribute('aria-pressed', String(isActive));
  });
  const list = cat === 'all' ? products : products.filter(p => p.category === cat);
  renderShopGrid(list);
}

function applyFilters() {
  let list = [...products];

  const checkedCats = [...document.querySelectorAll(
    '.filter-body input[type="checkbox"]:checked'
  )].filter(c => [
    'power-tools', 'hand-tools', 'heavy-machinery',
    'safety', 'materials', 'electrical', 'plumbing'
  ].includes(c.value)).map(c => c.value);

  if (checkedCats.length) list = list.filter(p => checkedCats.includes(p.category));

  const checkedBrands = [...document.querySelectorAll(
    '.filter-body input[type="checkbox"]:checked'
  )].filter(c => ['dewalt', 'makita', 'bosch', 'milwaukee', 'stanley']
    .includes(c.value)).map(c => c.value);

  if (checkedBrands.length) {
    list = list.filter(p => checkedBrands.includes(p.brand.toLowerCase()));
  }

  const pMin = parseFloat(document.getElementById('priceMin').value) || 0;
  const pMax = parseFloat(document.getElementById('priceMax').value) || Infinity;
  list = list.filter(p => p.price >= pMin && p.price <= pMax);

  const sort = document.getElementById('sortSelect').value;
  if (sort === 'price-asc')   list.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  else if (sort === 'name')   list.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);

  renderShopGrid(list);
}

function toggleFilter(header) {
  const body = header.nextElementSibling;
  const icon = header.querySelector('svg');
  const expanded = header.getAttribute('aria-expanded') === 'true';
  header.setAttribute('aria-expanded', String(!expanded));
  body.style.display = expanded ? 'none' : 'block';
  if (icon) icon.style.transform = expanded ? 'rotate(-90deg)' : 'rotate(0deg)';
}

/* ===== SEARCH ===== */
function handleSearch(q) {
  if (!q.trim()) { renderShopGrid(products); return; }
  const query = q.toLowerCase();
  const results = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.brand.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  );
  // If not already on shop page, navigate there
  if (!document.getElementById('shopProductGrid')) {
    sessionStorage.setItem('ifSearch', q);
    window.location.href = 'shop.html';
    return;
  }
  renderShopGrid(results);
}

/* ===== PRODUCT DETAIL PAGE ===== */
function loadProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const p = products.find(x => x.id === id);
  if (!p) {
    document.getElementById('detailInfo').innerHTML = '<p>Product not found.</p>';
    return;
  }
  currentProduct = p;

  // Breadcrumb
  const bc = document.getElementById('breadcrumbProduct');
  if (bc) bc.textContent = p.name;

  // Thumbnails
  const thumbsEl = document.getElementById('detailThumbs');
  if (thumbsEl) {
    thumbsEl.innerHTML = ['View A', 'View B', 'View C'].map((label, i) => `
      <button class="detail-thumb ${i === 0 ? 'active' : ''}"
              onclick="setThumb(this)"
              aria-label="${label} of ${p.name}"
              ${i === 0 ? 'aria-pressed="true"' : 'aria-pressed="false"'}>
        <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;
                    background:${p.color}22;font-family:var(--font-mono);font-size:10px;
                    color:${p.color};" aria-hidden="true">${String.fromCharCode(65 + i)}</div>
      </button>`).join('');
  }

  // Rating stars
  const starsHtml = Array.from({ length: 5 }, (_, i) =>
    `<span class="star${i < Math.floor(p.rating) ? '' : ' empty'}" aria-hidden="true">&#9733;</span>`
  ).join('');
  const saveAmt = p.oldPrice ? Math.round(p.oldPrice - p.price) : null;

  // Info panel
  const infoEl = document.getElementById('detailInfo');
  if (infoEl) {
    infoEl.innerHTML = `
      <div class="detail-brand">
        <span class="tag">${p.category.replace('-', ' ')}</span>
        ${p.brand}
      </div>
      <h1 class="detail-title">${p.name}</h1>
      <div class="detail-rating">
        <div class="stars" role="img" aria-label="Rated ${p.rating} out of 5 stars">${starsHtml}</div>
        <span style="font-family:var(--font-display);font-weight:700;">${p.rating}</span>
        <span class="review-count">/ 24 Reviews</span>
      </div>
      <div class="detail-price-row">
        <span class="detail-price" aria-label="Price: $${p.price.toLocaleString()}">$${p.price.toLocaleString()}</span>
        ${p.oldPrice
          ? `<span class="detail-price-old" aria-label="Was: $${p.oldPrice}">$${p.oldPrice}</span>
             <span class="detail-price-save">Save $${saveAmt}</span>`
          : ''}
      </div>
      <p class="detail-desc">${p.desc}</p>
      <div class="detail-options">
        <p class="option-label" id="variant-label">Variant</p>
        <div class="option-chips" role="group" aria-labelledby="variant-label">
          <button class="option-chip active" aria-pressed="true" onclick="selectChip(this)">Standard</button>
          <button class="option-chip" aria-pressed="false" onclick="selectChip(this)">Pro Kit</button>
          <button class="option-chip" aria-pressed="false" onclick="selectChip(this)">Bundle</button>
        </div>
      </div>
      <div class="detail-qty-row">
        <div class="qty-control" role="group" aria-label="Quantity">
          <button class="qty-btn" onclick="adjustQty(-1)" aria-label="Decrease quantity">−</button>
          <input class="qty-input" type="number" value="1" min="1"
                 id="detailQty" aria-label="Quantity">
          <button class="qty-btn" onclick="adjustQty(1)" aria-label="Increase quantity">+</button>
        </div>
        <button class="detail-add-btn"
                onclick="addToCart(${p.id}, parseInt(document.getElementById('detailQty').value) || 1)"
                aria-label="Add ${p.name} to shopping cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Add to Cart
        </button>
      </div>
      <ul class="detail-meta" aria-label="Product information">
        <li class="detail-meta-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          In stock — Ships within 1–2 business days
        </li>
        <li class="detail-meta-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
            <path d="M1 3h22l-2 9H3L1 3z"/><path d="M12 12v9"/><path d="M8 21h8"/>
          </svg>
          Free shipping on orders over $299
        </li>
        <li class="detail-meta-row warn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
          30-day return policy — no questions asked
        </li>
      </ul>`;
  }

  // Specs table
  const specsEl = document.getElementById('specsTable');
  if (specsEl) {
    specsEl.innerHTML =
      '<thead class="sr-only"><tr><th scope="col">Specification</th><th scope="col">Value</th></tr></thead>' +
      '<tbody>' +
      Object.entries(p.specs).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('') +
      '</tbody>';
  }

  // Long description
  const descEl = document.getElementById('detailLongDesc');
  if (descEl) {
    descEl.innerHTML = `
      <p>${p.desc} Engineered for professional use across all types of construction environments,
         this product delivers consistent performance under demanding conditions.</p>
      <p style="margin-top:16px;">The ${p.brand} ${p.name} has been tested to exceed industry
         standards and comes backed by a manufacturer warranty.</p>
      <p style="margin-top:16px;">Compatible with the full ${p.brand} ecosystem of accessories and
         replacement parts, ensuring long-term value and easy maintenance.</p>`;
  }
}

function selectChip(el) {
  el.closest('.option-chips').querySelectorAll('.option-chip').forEach(c => {
    c.classList.remove('active');
    c.setAttribute('aria-pressed', 'false');
  });
  el.classList.add('active');
  el.setAttribute('aria-pressed', 'true');
}

function setThumb(el) {
  el.closest('.detail-thumbnails').querySelectorAll('.detail-thumb').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-pressed', 'false');
  });
  el.classList.add('active');
  el.setAttribute('aria-pressed', 'true');
}

function adjustQty(delta) {
  const input = document.getElementById('detailQty');
  if (input) input.value = Math.max(1, (parseInt(input.value) || 1) + delta);
}

/* Tabs — ARIA tablist pattern */
function switchTab(btn, tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
    b.setAttribute('tabindex', '-1');
  });
  document.querySelectorAll('.tab-content').forEach(c => {
    c.classList.remove('active');
    c.setAttribute('hidden', '');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
  btn.removeAttribute('tabindex');
  const panel = document.getElementById(tabId);
  if (panel) { panel.classList.add('active'); panel.removeAttribute('hidden'); }
}

/* ===== CART RENDER ===== */
function renderCart() {
  const layout = document.getElementById('cartLayout');
  if (!layout) return;

  if (!cart.length) {
    layout.innerHTML = `
      <div style="grid-column:1/-1;">
        <div class="empty-state" role="status" aria-live="polite">
          <div class="empty-icon" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </div>
          <h2 class="empty-title">Your cart is empty</h2>
          <p class="empty-text">Add some products to get started.</p>
          <a class="btn-primary" href="shop.html" style="margin:0 auto;display:inline-flex;">Browse Products</a>
        </div>
      </div>`;
    return;
  }

  const tax       = cartTotal() * 0.08;
  const shipping  = cartTotal() >= 299 ? 0 : 24.99;
  const grandTotal = cartTotal() + tax + shipping;

  layout.innerHTML = `
    <div>
      <section class="cart-items" aria-label="Cart items">
        <div class="cart-header" role="row" aria-hidden="true">
          <span>Product</span><span>Price</span><span>Quantity</span>
          <span style="text-align:right">Total</span>
        </div>
        ${cart.map(item => `
          <div class="cart-item" role="row" aria-label="${item.name}">
            <div class="cart-item-info">
              <div class="cart-item-img" role="img" aria-label="Product image for ${item.name}">
                <div style="width:100%;height:100%;display:flex;align-items:center;
                            justify-content:center;background:${item.color}22;
                            font-family:var(--font-mono);font-size:9px;color:${item.color};"
                     aria-hidden="true">${item.brand[0]}</div>
              </div>
              <div>
                <p class="cart-item-brand">${item.brand}</p>
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-sku">SKU-${String(item.id).padStart(4, '0')}</p>
              </div>
            </div>
            <span class="cart-item-price" aria-label="Unit price $${item.price.toLocaleString()}">
              $${item.price.toLocaleString()}
            </span>
            <div>
              <div class="cart-qty" role="group" aria-label="Quantity for ${item.name}">
                <button class="cart-qty-btn" onclick="updateQty(${item.id}, -1)"
                        aria-label="Decrease quantity of ${item.name}">−</button>
                <span class="cart-qty-val" aria-live="polite" aria-atomic="true">${item.qty}</span>
                <button class="cart-qty-btn" onclick="updateQty(${item.id}, 1)"
                        aria-label="Increase quantity of ${item.name}">+</button>
              </div>
            </div>
            <div style="display:flex;align-items:center;justify-content:flex-end;gap:8px;">
              <span class="cart-item-total"
                    aria-label="Total for ${item.name}: $${(item.price * item.qty).toLocaleString()}">
                $${(item.price * item.qty).toLocaleString()}
              </span>
              <button class="cart-remove" onclick="removeFromCart(${item.id})"
                      aria-label="Remove ${item.name} from cart">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2.5" aria-hidden="true" focusable="false">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6"  y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>`).join('')}
      </section>

      <section class="checkout-form-section" aria-label="Checkout information">
        <div class="checkout-step">
          <div class="checkout-step-header">
            <span class="step-num" aria-hidden="true">1</span>
            <h2 class="step-title">Shipping Information</h2>
          </div>
          <div class="checkout-step-body">
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label" for="ship-fname">First Name</label>
                <input class="form-input" type="text" id="ship-fname"
                       placeholder="John" autocomplete="given-name">
              </div>
              <div class="form-group">
                <label class="form-label" for="ship-lname">Last Name</label>
                <input class="form-input" type="text" id="ship-lname"
                       placeholder="Smith" autocomplete="family-name">
              </div>
              <div class="form-group full">
                <label class="form-label" for="ship-address">Street Address</label>
                <input class="form-input" type="text" id="ship-address"
                       placeholder="123 Main Street, Suite 400" autocomplete="street-address">
              </div>
              <div class="form-group">
                <label class="form-label" for="ship-city">City</label>
                <input class="form-input" type="text" id="ship-city"
                       placeholder="Portland" autocomplete="address-level2">
              </div>
              <div class="form-group">
                <label class="form-label" for="ship-zip">ZIP Code</label>
                <input class="form-input" type="text" id="ship-zip"
                       placeholder="97201" autocomplete="postal-code">
              </div>
              <div class="form-group">
                <label class="form-label" for="ship-state">State</label>
                <input class="form-input" type="text" id="ship-state"
                       placeholder="OR" autocomplete="address-level1">
              </div>
              <div class="form-group">
                <label class="form-label" for="ship-phone">Phone</label>
                <input class="form-input" type="tel" id="ship-phone"
                       placeholder="+1 (503) 000-0000" autocomplete="tel">
              </div>
            </div>
          </div>
        </div>

        <div class="checkout-step">
          <div class="checkout-step-header">
            <span class="step-num" aria-hidden="true">2</span>
            <h2 class="step-title">Payment Details</h2>
          </div>
          <div class="checkout-step-body">
            <div class="form-grid">
              <div class="form-group full">
                <label class="form-label" for="pay-card">Card Number</label>
                <input class="form-input" type="text" id="pay-card"
                       placeholder="1234 5678 9012 3456" autocomplete="cc-number"
                       inputmode="numeric" maxlength="19">
              </div>
              <div class="form-group">
                <label class="form-label" for="pay-expiry">Expiry</label>
                <input class="form-input" type="text" id="pay-expiry"
                       placeholder="MM / YY" autocomplete="cc-exp" maxlength="7">
              </div>
              <div class="form-group">
                <label class="form-label" for="pay-cvv">CVV</label>
                <input class="form-input" type="text" id="pay-cvv"
                       placeholder="123" autocomplete="cc-csc"
                       inputmode="numeric" maxlength="4">
              </div>
              <div class="form-group full">
                <label class="form-label" for="pay-name">Name on Card</label>
                <input class="form-input" type="text" id="pay-name"
                       placeholder="John Smith" autocomplete="cc-name">
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <aside>
      <section class="order-summary" aria-label="Order summary">
        <h2 class="summary-title">Order Summary</h2>
        ${cart.map(i => `
          <div class="summary-row">
            <span>${i.name} ×${i.qty}</span>
            <span>$${(i.price * i.qty).toLocaleString()}</span>
          </div>`).join('')}
        <div class="summary-row">
          <span>Subtotal</span>
          <span>$${cartTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span>${shipping === 0
            ? '<span style="color:var(--success);font-weight:600;">Free</span>'
            : '$' + shipping.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Tax (8%)</span>
          <span>$${tax.toFixed(2)}</span>
        </div>
        <div class="summary-row total" aria-label="Grand total: $${grandTotal.toFixed(2)}">
          <span>Total</span>
          <span>$${grandTotal.toFixed(2)}</span>
        </div>
        <div class="coupon-row">
          <label class="sr-only" for="couponCode">Coupon code</label>
          <input class="coupon-input" type="text" id="couponCode" placeholder="Coupon code">
          <button class="coupon-btn" onclick="applyCoupon()">Apply</button>
        </div>
        <button class="checkout-btn" onclick="placeOrder()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          Place Order
        </button>
        <p style="text-align:center;margin-top:12px;font-size:12px;
                  color:var(--text-muted);font-family:var(--font-mono);">
          Secure checkout · SSL encrypted
        </p>
      </section>
    </aside>`;
}

/* ===== ORDER PLACEMENT ===== */
function placeOrder() {
  cart = [];
  persistCart();
  updateCartCount();
  showToast('Order placed successfully!', 'success');
  setTimeout(() => { window.location.href = 'index.html'; }, 1200);
}

function applyCoupon() {
  const code = document.getElementById('couponCode');
  if (code && code.value.trim()) showToast('Coupon code applied.', 'info');
}

/* ===== CONTACT FORM ===== */
function submitContact(e) {
  e.preventDefault();
  showToast("Message sent! We'll respond within 24 hours.", 'success');
  e.target.reset();
}

/* ===== TOAST NOTIFICATIONS ===== */
function showToast(msg, type = 'info') {
  const tc = document.getElementById('toastContainer');
  if (!tc) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.setAttribute('role', 'status');
  t.setAttribute('aria-live', 'polite');
  t.innerHTML = `
    <span class="toast-icon" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5" aria-hidden="true" focusable="false">
        ${type === 'success'
          ? '<polyline points="20 6 9 17 4 12"/>'
          : '<circle cx="12" cy="12" r="10"/>'}
      </svg>
    </span>
    <span>${msg}</span>`;
  tc.appendChild(t);
  setTimeout(() => {
    t.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => t.remove(), 300);
  }, 3200);
}

/* ===== MOBILE MENU ===== */
function toggleMobileMenu() {
  const links  = document.querySelector('.nav-links');
  const btn    = document.querySelector('.hamburger');
  if (!links) return;
  const isOpen = links.style.display === 'flex';
  if (isOpen) {
    links.style.display = 'none';
    btn && btn.setAttribute('aria-expanded', 'false');
  } else {
    links.style.cssText = `
      display:flex;flex-direction:column;
      position:fixed;top:64px;left:0;right:0;
      background:var(--surface);
      border-bottom:1px solid var(--border);
      padding:16px 24px;gap:4px;z-index:99;
      box-shadow:var(--shadow-lg);`;
    btn && btn.setAttribute('aria-expanded', 'true');
  }
}

/* ===== LOGIN MODAL ===== */
function openLoginModal() {
  const overlay = document.getElementById('loginOverlay');
  if (!overlay) return;
  overlay.removeAttribute('aria-hidden');
  overlay.classList.add('is-open');
  document.body.classList.add('modal-open');
  setTimeout(() => {
    const firstInput = overlay.querySelector('input');
    if (firstInput) firstInput.focus();
  }, 80);
}

function closeLoginModal() {
  const overlay = document.getElementById('loginOverlay');
  if (!overlay) return;
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  clearLoginForm();
  const loginBtn = document.getElementById('loginNavBtn');
  if (loginBtn) loginBtn.focus();
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('loginOverlay')) closeLoginModal();
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('loginOverlay');
    if (overlay && overlay.classList.contains('is-open')) closeLoginModal();
  }
});

function togglePasswordVisibility() {
  const input = document.getElementById('loginPassword');
  const icon  = document.getElementById('pwEyeIcon');
  const btn   = input.nextElementSibling;
  if (input.type === 'password') {
    input.type = 'text';
    btn.setAttribute('aria-label', 'Hide password');
    icon.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>`;
  } else {
    input.type = 'password';
    btn.setAttribute('aria-label', 'Toggle password visibility');
    icon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>`;
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  clearLoginErrors();
  const email    = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  let   valid    = true;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showLoginError('loginEmailError', 'กรุณากรอก Email ที่ถูกต้อง');
    document.getElementById('loginEmail').classList.add('input-error');
    valid = false;
  }
  if (!password || password.length < 6) {
    showLoginError('loginPasswordError', 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
    document.getElementById('loginPassword').classList.add('input-error');
    valid = false;
  }
  if (!valid) return;
  const btn  = document.getElementById('loginSubmitBtn');
  const text = btn.querySelector('.login-submit-text');
  btn.disabled = true; text.textContent = 'Signing in…';
  setTimeout(() => {
    btn.disabled = false; text.textContent = 'Sign In';
    closeLoginModal();
    updateNavLoginState(email);
    showToast(`Welcome back, ${email.split('@')[0]}! 👷`);
  }, 1200);
}

function showLoginError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function clearLoginErrors() {
  ['loginEmailError', 'loginPasswordError'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
  ['loginEmail', 'loginPassword'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('input-error');
  });
}

function clearLoginForm() {
  const form = document.getElementById('loginForm');
  if (form) form.reset();
  clearLoginErrors();
  const pw = document.getElementById('loginPassword');
  if (pw) pw.type = 'password';
}

function updateNavLoginState(email) {
  const btn = document.getElementById('loginNavBtn');
  if (!btn) return;
  const name = email.split('@')[0];
  btn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
    <span class="login-btn-text">${name}</span>`;
  btn.classList.add('is-logged-in');
  btn.setAttribute('aria-label', `Logged in as ${email}`);
  btn.onclick = () => showToast('You are already signed in.');
}

function handleForgotPassword(e) {
  e.preventDefault();
  closeLoginModal();
  showToast('📧 ลิงก์รีเซ็ตรหัสผ่านจะถูกส่งไปยัง Email ของคุณ');
}

function handleCreateAccount(e) {
  e.preventDefault();
  closeLoginModal();
  showToast('🔧 ฟีเจอร์สมัครสมาชิกกำลังจะมาเร็วๆ นี้!');
}

/* ===== INITIALISE ===== */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  setActiveNavFromPage();

  // Page-specific init
  if (document.getElementById('homeProductGrid'))  renderHomeGrids();
  if (document.getElementById('shopProductGrid'))  {
    renderShopGrid(products);
    // If navigated from search
    const q = sessionStorage.getItem('ifSearch');
    if (q) { sessionStorage.removeItem('ifSearch'); handleSearch(q); }
  }
  if (document.getElementById('cartLayout'))       renderCart();
  if (document.getElementById('detailInfo'))       loadProductDetail();
});

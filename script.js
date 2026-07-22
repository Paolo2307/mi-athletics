// ============================================
// NAV — solid background after scrolling past hero
// ============================================
const nav = document.getElementById('nav');
if (nav && !nav.classList.contains('solid')) {
  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('solid');
    } else {
      nav.classList.remove('solid');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

// ============================================
// SCROLL REVEAL — fade/slide elements into view
// ============================================
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealEls.forEach((el) => io.observe(el));
}

// ============================================
// PRODUCT DATA + MODAL (collection page)
// ============================================
const PRODUCTS = [
  {
    id: 'noir',
    name: 'Mauvaise Influence — Noir',
    material: '100% coton · 220g/m²',
    variants: [
      { key: 'grise', label: 'Écriture Grise', swatch: '#9a9a9a', front: 'assets/products/noir-grise-front.jpg', back: 'assets/products/noir-grise-back.jpg' },
      { key: 'rose',  label: 'Écriture Rose',  swatch: '#f0409c', front: 'assets/products/noir-rose-front.jpg',  back: 'assets/products/noir-rose-back.jpg' },
    ],
  },
  {
    id: 'blanc',
    name: 'Mauvaise Influence — Blanc',
    material: '90% coton / 10% viscose · 220g/m²',
    variants: [
      { key: 'noire', label: 'Écriture Noire', swatch: '#111111', front: 'assets/products/blanc-noire-front.jpg', back: 'assets/products/blanc-noire-back.jpg' },
      { key: 'verte', label: 'Écriture Verte', swatch: '#2e7d4f', front: 'assets/products/blanc-verte-front.jpg', back: 'assets/products/blanc-verte-back.jpg' },
    ],
  },
  {
    id: 'gris',
    name: 'Mauvaise Influence — Gris',
    material: '90% coton / 10% viscose · 220g/m²',
    variants: [
      { key: 'blanche', label: 'Écriture Blanche', swatch: '#f2f2f2', front: 'assets/products/gris-blanche-front.jpg', back: 'assets/products/gris-blanche-back.jpg' },
      { key: 'jaune',   label: 'Écriture Jaune',   swatch: '#e8c93b', front: 'assets/products/gris-jaune-front.jpg',   back: 'assets/products/gris-jaune-back.jpg' },
    ],
  },
];

const garmentGrid = document.getElementById('garmentGrid');

if (garmentGrid) {
  garmentGrid.innerHTML = PRODUCTS.map((p) => `
    <article class="garment-card" data-product="${p.id}" tabindex="0" role="button" aria-label="Voir ${p.name}">
      <div class="garment-photo">
        <img src="${p.variants[0].front}" alt="${p.name}">
      </div>
      <div class="garment-info">
        <h3>${p.name}</h3>
        <p>${p.material}</p>
      </div>
    </article>
  `).join('');

  const modal = document.getElementById('productModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalVariantName = document.getElementById('modalVariantName');
  const modalSwatches = document.getElementById('modalSwatches');
  const modalFlip = document.getElementById('modalFlip');
  const modalFlipLabel = document.getElementById('modalFlipLabel');
  const modalSizes = document.getElementById('modalSizes');
  const sizeHint = document.getElementById('sizeHint');

  let currentProduct = null;
  let currentVariantIndex = 0;
  let showingBack = false;

  function renderModal() {
    const product = currentProduct;
    const variant = product.variants[currentVariantIndex];

    modalTitle.textContent = product.name;
    modalVariantName.textContent = variant.label;
    modalImg.src = showingBack ? variant.back : variant.front;
    modalImg.alt = `${product.name}, ${variant.label}, ${showingBack ? 'dos' : 'face'}`;
    modalFlipLabel.textContent = showingBack ? 'Voir la face' : 'Voir le dos';

    modalSwatches.innerHTML = product.variants.map((v, i) => `
      <button type="button"
        class="swatch ${i === currentVariantIndex ? 'active' : ''}"
        style="--swatch-color:${v.swatch}"
        data-variant-index="${i}"
        aria-label="${v.label}"
        aria-pressed="${i === currentVariantIndex}">
      </button>
    `).join('');
  }

  function openModal(productId) {
    currentProduct = PRODUCTS.find((p) => p.id === productId);
    currentVariantIndex = 0;
    showingBack = false;
    renderModal();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalSizes.querySelectorAll('button').forEach((b) => b.classList.remove('selected'));
    sizeHint.textContent = 'Sélectionne ta taille';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  garmentGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.garment-card');
    if (card) openModal(card.dataset.product);
  });
  garmentGrid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.garment-card');
      if (card) { e.preventDefault(); openModal(card.dataset.product); }
    }
  });

  modal.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  modalFlip.addEventListener('click', () => {
    showingBack = !showingBack;
    renderModal();
  });

  modalSwatches.addEventListener('click', (e) => {
    const btn = e.target.closest('.swatch');
    if (!btn) return;
    currentVariantIndex = parseInt(btn.dataset.variantIndex, 10);
    renderModal();
  });

  modalSizes.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    modalSizes.querySelectorAll('button').forEach((b) => b.classList.remove('selected'));
    btn.classList.add('selected');
    sizeHint.textContent = `Taille sélectionnée : ${btn.dataset.size}`;
  });
}

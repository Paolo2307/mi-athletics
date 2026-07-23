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
    id: 'blanc',
    name: 'Mauvaise Influence — Blanc',
    variants: [
      { key: 'noire', label: 'Écriture Noire', swatch: '#111111', front: 'assets/products/blanc-noire-front.jpg', back: 'assets/products/blanc-noire-back.jpg', material: '100% coton · 220g/m²' },
      { key: 'verte', label: 'Écriture Verte', swatch: '#2e7d4f', front: 'assets/products/blanc-verte-front.jpg', back: 'assets/products/blanc-verte-back.jpg', material: '100% coton · 220g/m²' },
    ],
  },
  {
    id: 'gris',
    name: 'Mauvaise Influence — Gris',
    variants: [
      { key: 'blanche', label: 'Écriture Blanche', swatch: '#f2f2f2', front: 'assets/products/gris-blanche-front.jpg', back: 'assets/products/gris-blanche-back.jpg', material: '90% coton / 10% viscose · 220g/m²' },
      { key: 'jaune',   label: 'Écriture Jaune',   swatch: '#e8c93b', front: 'assets/products/gris-jaune-front.jpg',   back: 'assets/products/gris-jaune-back.jpg',   material: '100% coton · 220g/m²' },
    ],
  },
  {
    id: 'noir',
    name: 'Mauvaise Influence — Noir',
    variants: [
      { key: 'grise', label: 'Écriture Grise', swatch: '#9a9a9a', front: 'assets/products/noir-grise-front.jpg', back: 'assets/products/noir-grise-back.jpg', material: '100% coton · 220g/m²' },
      { key: 'rose',  label: 'Écriture Rose',  swatch: '#f0409c', front: 'assets/products/noir-rose-front.jpg',  back: 'assets/products/noir-rose-back.jpg', material: '100% coton · 220g/m²' },
    ],
  },
];

const garmentGrid = document.getElementById('garmentGrid');

if (garmentGrid) {
  // Flatten into 6 cards: one per color variant, each still linked to its base product
  const cards = [];
  PRODUCTS.forEach((p) => {
    p.variants.forEach((v, vIndex) => {
      cards.push({ product: p, variant: v, variantIndex: vIndex });
    });
  });

  garmentGrid.innerHTML = cards.map((c) => `
    <article class="garment-card" data-product="${c.product.id}" data-variant-index="${c.variantIndex}" tabindex="0" role="button" aria-label="Voir ${c.product.name}, ${c.variant.label}">
      <div class="garment-photo">
        <img src="${c.variant.front}" alt="${c.product.name}, ${c.variant.label}, face" class="photo-front">
        <img src="${c.variant.back}" alt="${c.product.name}, ${c.variant.label}, dos" class="photo-back">
      </div>
      <div class="garment-info">
        <h3>${c.product.name.replace('Mauvaise Influence — ', '')} <span class="variant-tag">${c.variant.label}</span></h3>
        <p>${c.variant.material}</p>
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
  const modalMaterial = document.getElementById('modalMaterial');

  let currentProduct = null;
  let currentVariantIndex = 0;
  let showingBack = false;

  function renderModal() {
    const product = currentProduct;
    const variant = product.variants[currentVariantIndex];

    modalTitle.textContent = product.name;
    modalMaterial.textContent = `${variant.material} · Oversize`;
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

  function openModal(productId, variantIndex) {
    currentProduct = PRODUCTS.find((p) => p.id === productId);
    currentVariantIndex = variantIndex || 0;
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
    if (card) openModal(card.dataset.product, parseInt(card.dataset.variantIndex, 10));
  });
  garmentGrid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.garment-card');
      if (card) { e.preventDefault(); openModal(card.dataset.product, parseInt(card.dataset.variantIndex, 10)); }
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

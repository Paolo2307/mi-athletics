// Solid navbar after scrolling past the hero
const nav = document.getElementById('nav');

function updateNav() {
  if (window.scrollY > 60) {
    nav.classList.add('solid');
  } else {
    nav.classList.remove('solid');
  }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

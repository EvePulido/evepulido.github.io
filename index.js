'use strict';

/**
 * Inicialización de componentes e interactividad del sitio
 */
document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  initNavigation();
  initHeaderScroll();
  initScrollFade();
  initScrollClick();
});

/**
 * Renderizado de iconos Lucide
 */
function initLucideIcons() {
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
}

/**
 * Control de estados de la barra de navegación
 */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => {
        l.classList.remove('active');
        l.removeAttribute('aria-current');
      });

      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    });
  });
}

/**
 * Desvanecimiento del indicador de scroll al desplazarse hacia abajo
 */
function initScrollFade() {
  const scrollIndicator = document.getElementById('scroll-indicator');
  if (!scrollIndicator) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      scrollIndicator.classList.add('faded');
    } else {
      scrollIndicator.classList.remove('faded');
    }
  }, { passive: true });
}

/**
 * Desplazamiento suave al hacer clic en el indicador de scroll
 */
function initScrollClick() {
  const scrollLink = document.querySelector('.scroll-link');
  const targetSection = document.getElementById('work');

  if (!scrollLink || !targetSection) return;

  scrollLink.addEventListener('click', (e) => {
    e.preventDefault();
    targetSection.scrollIntoView({
      behavior: 'smooth'
    });
  });
}

/**
 * Control de scroll y reducción accesible de la barra de navegación
 */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}





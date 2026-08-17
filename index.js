'use strict';

/**
 * Inicialización de componentes e interactividad accesible del sitio (W3C Standard)
 */
document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  initViewSwitcher();
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
 * Control accesible de Vistas SPA (W3C Gold Standard para Navegación Superior)
 * Utiliza enlaces semánticos <a> con aria-current="page" para máxima compatibilidad con Narrador
 */
function initViewSwitcher() {
  const navWork = document.getElementById('nav-work');
  const navAbout = document.getElementById('nav-about');
  const viewWork = document.getElementById('view-work');
  const viewAbout = document.getElementById('view-about');
  const logoLink = document.getElementById('logo-link');

  if (!navWork || !navAbout || !viewWork || !viewAbout) return;

  function activateView(target, options = { updateHash: true, focusHeading: true }) {
    const isAbout = target === 'about';

    // Actualizar estados visuales y de accesibilidad en los enlaces
    if (isAbout) {
      navWork.classList.remove('active');
      navWork.removeAttribute('aria-current');

      navAbout.classList.add('active');
      navAbout.setAttribute('aria-current', 'page');
    } else {
      navAbout.classList.remove('active');
      navAbout.removeAttribute('aria-current');

      navWork.classList.add('active');
      navWork.setAttribute('aria-current', 'page');
    }

    // Ocultar / Mostrar los paneles de vista
    if (isAbout) {
      viewWork.setAttribute('hidden', '');
      viewWork.classList.remove('active');

      viewAbout.removeAttribute('hidden');
      viewAbout.classList.add('active');
    } else {
      viewAbout.setAttribute('hidden', '');
      viewAbout.classList.remove('active');

      viewWork.removeAttribute('hidden');
      viewWork.classList.add('active');
    }

    // Actualizar hash en la URL
    if (options.updateHash) {
      const newHash = isAbout ? '#about' : '#work';
      if (window.location.hash !== newHash) {
        history.pushState(null, '', newHash);
      }
    }

    // Desplazar al inicio suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Transferencia accesible de foco para lectores de pantalla
    if (options.focusHeading) {
      setTimeout(() => {
        const headingToFocus = isAbout
          ? document.getElementById('about-heading')
          : document.getElementById('work-hero-heading');

        if (headingToFocus) {
          headingToFocus.focus();
        }
      }, 150);
    }

    // Re-inicializar iconos Lucide si es necesario
    initLucideIcons();
  }

  // Event Listeners para clics en la navegación
  navWork.addEventListener('click', (e) => {
    e.preventDefault();
    activateView('work');
  });

  navAbout.addEventListener('click', (e) => {
    e.preventDefault();
    activateView('about');
  });

  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      activateView('work');
    });
  }

  // Sincronización con botones del navegador (Atrás / Adelante) y Hash inicial
  function syncFromHash() {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#about') {
      activateView('about', { updateHash: false, focusHeading: false });
    } else {
      activateView('work', { updateHash: false, focusHeading: false });
    }
  }

  window.addEventListener('popstate', syncFromHash);
  syncFromHash();
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

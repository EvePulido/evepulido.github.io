'use strict';

/**
 * ==============================================================================
 * Evelyn Pulido Portfolio — Modular JavaScript Architecture (W3C Standards)
 * ==============================================================================
 * Módulos:
 * 1. IconManager       - Renderizado y acotado de Lucide Icons
 * 2. ThemeManager      - Modo oscuro accesible, persistencia y sincronización OS
 * 3. NavigationManager - Controlador de Vistas SPA con gestión de foco accesible
 * 4. ScrollManager     - Despachador de scroll centralizado mediante rAF
 * 5. MenuManager       - Menú hamburguesa accesible en móvil (disclosure)
 * 6. RevealManager     - Aparición suave de tarjetas e imágenes al hacer scroll
 * ==============================================================================
 */

// Respeta la preferencia del sistema: sin animación de scroll si el usuario reduce el movimiento
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  IconManager.init();
  ThemeManager.init();
  NavigationManager.init();
  ScrollManager.init();
  MenuManager.init();
  RevealManager.init();
});

/**
 * ------------------------------------------------------------------------------
 * 1. IconManager: Control y renderizado optimizado de iconos vectoriales
 * ------------------------------------------------------------------------------
 */
const IconManager = (() => {
  function init(rootElement) {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      if (rootElement) {
        lucide.createIcons({ root: rootElement });
      } else {
        lucide.createIcons();
      }
    }
  }

  return { init };
})();

/**
 * ------------------------------------------------------------------------------
 * 2. ThemeManager: Modo Oscuro con Switch Accesible (W3C APG) y Cero Desincronización
 * ------------------------------------------------------------------------------
 */
const ThemeManager = (() => {
  const switchInput = document.getElementById('theme-toggle-checkbox');

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function syncSwitchState(theme) {
    if (!switchInput) return;
    const isDark = theme === 'dark';

    // role="switch" sobre un checkbox nativo ya expone el estado: no se duplica con aria-checked
    switchInput.checked = isDark;

    const labelTitle = isDark ? 'Switch to light theme' : 'Switch to dark theme';

    const parentLabel = switchInput.closest('.theme-switch');
    if (parentLabel) {
      parentLabel.setAttribute('title', labelTitle);
    }
  }

  function applyTheme(theme, save = true) {
    document.documentElement.setAttribute('data-theme', theme);
    if (save) {
      try {
        localStorage.setItem('theme', theme);
      } catch (e) {
        // Almacenamiento local restringido (modo incógnito o políticas de privacidad)
      }
    }
    syncSwitchState(theme);
  }

  function init() {
    if (!switchInput) return;

    // Sincronizar estado inicial con el tema activo determinado en <head>
    syncSwitchState(getCurrentTheme());

    // Manejar evento de alternancia
    switchInput.addEventListener('change', () => {
      applyTheme(switchInput.checked ? 'dark' : 'light', true);
    });

    // Escuchar cambios reactivos en la preferencia del sistema operativo cuando no hay preferencia guardada
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        try {
          if (!localStorage.getItem('theme')) {
            const systemTheme = e.matches ? 'dark' : 'light';
            applyTheme(systemTheme, false);
          }
        } catch (err) {
          // Sin acceso a localStorage: se conserva el tema actual
        }
      });
    } catch (err) {
      // matchMedia no disponible: el tema solo cambia desde el switch
    }
  }

  return { init };
})();

/**
 * ------------------------------------------------------------------------------
 * 3. NavigationManager: Controlador SPA con Vistas Semánticas y Foco Determinista
 * ------------------------------------------------------------------------------
 */
const NavigationManager = (() => {
  const navWork = document.getElementById('nav-work');
  const navAbout = document.getElementById('nav-about');
  const viewWork = document.getElementById('view-work');
  const viewAbout = document.getElementById('about');
  const logoLink = document.getElementById('logo-link');

  function isAvailable() {
    return Boolean(navWork && navAbout && viewWork && viewAbout);
  }

  function activateView(target, options = { updateHash: true, focusHeading: true }) {
    if (!isAvailable()) return;
    const isAbout = target === 'about';

    // 1. Actualizar estados visuales y semánticos en enlaces de navegación
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

    // 2. Gestionar visibilidad de paneles con el atributo estándar nativo hidden
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

    // 3. Sincronizar hash en la URL sin recargar
    if (options.updateHash) {
      const newHash = isAbout ? '#about' : '#work';
      if (window.location.hash !== newHash) {
        history.pushState(null, '', newHash);
      }
    }

    // 4. Desplazar al inicio suavemente (también en Atrás/Adelante, al cambiar de vista)
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });

    // 5. Transferencia accesible de foco sin retrasos arbitrarios mediante requestAnimationFrame
    if (options.focusHeading) {
      window.requestAnimationFrame(() => {
        const headingToFocus = isAbout
          ? document.getElementById('about-heading')
          : document.getElementById('work-hero-heading');

        if (headingToFocus) {
          headingToFocus.focus();
        }
      });
    }

    // 6. Actualizar iconos en el panel recién expuesto
    IconManager.init(isAbout ? viewAbout : viewWork);
  }

  function syncFromHash() {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#about') {
      activateView('about', { updateHash: false, focusHeading: false });
    } else {
      activateView('work', { updateHash: false, focusHeading: false });
    }
  }

  function init() {
    if (!isAvailable()) return;

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

    window.addEventListener('popstate', syncFromHash);
    syncFromHash();
  }

  return { init };
})();

/**
 * ------------------------------------------------------------------------------
 * 4. ScrollManager: Despachador de Scroll Centralizado con requestAnimationFrame
 * ------------------------------------------------------------------------------
 */
const ScrollManager = (() => {
  const header = document.getElementById('header');
  const scrollIndicator = document.getElementById('scroll-indicator');
  const scrollLink = document.querySelector('.scroll-link');
  const targetSection = document.getElementById('work');

  function initScrollDispatcher() {
    if (!header && !scrollIndicator) return;

    let ticking = false;

    function updateOnScroll() {
      const y = window.scrollY;

      // Header translucent transition
      if (header) {
        if (y > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      // Scroll down indicator fade out
      if (scrollIndicator) {
        if (y > 40) {
          scrollIndicator.classList.add('faded');
        } else {
          scrollIndicator.classList.remove('faded');
        }
      }

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    }, { passive: true });

    // Estado inicial al cargar
    updateOnScroll();
  }

  function initScrollToWork() {
    if (!scrollLink || !targetSection) return;

    scrollLink.addEventListener('click', (e) => {
      e.preventDefault();
      targetSection.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
    });
  }

  function init() {
    initScrollDispatcher();
    initScrollToWork();
  }

  return { init };
})();

/**
 * ------------------------------------------------------------------------------
 * 5. MenuManager: Menú hamburguesa accesible (patrón disclosure) en móvil
 * ------------------------------------------------------------------------------
 */
const MenuManager = (() => {
  const header = document.getElementById('header');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('primary-nav');
  const desktopQuery = window.matchMedia('(min-width: 769px)');

  function isOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  }

  function init() {
    if (!header || !toggle || !menu) return;

    // Solo ahora el CSS convierte el nav en menú desplegable: si el script falla, los enlaces siguen visibles
    document.documentElement.classList.add('js-menu');

    toggle.addEventListener('click', () => setOpen(!isOpen()));

    // Cerrar al elegir un enlace (en index.html la navegación es SPA y no recarga)
    menu.addEventListener('click', (e) => {
      if (e.target.closest('.nav-link')) setOpen(false);
    });

    // Escape cierra y devuelve el foco al botón
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Clic fuera del header o foco que sale del header cierra el menú
    document.addEventListener('click', (e) => {
      if (isOpen() && !header.contains(e.target)) setOpen(false);
    });
    document.addEventListener('focusin', (e) => {
      if (isOpen() && !header.contains(e.target)) setOpen(false);
    });

    // Al pasar a escritorio el menú vuelve a la barra horizontal
    desktopQuery.addEventListener('change', (e) => {
      if (e.matches) setOpen(false);
    });
  }

  return { init };
})();

/**
 * ------------------------------------------------------------------------------
 * 6. RevealManager: Aparición única al entrar en pantalla (IntersectionObserver)
 * ------------------------------------------------------------------------------
 * Solo anima tarjetas e imágenes (no el hero, ni párrafos). Las clases se añaden
 * desde JS: sin JS, con prefers-reduced-motion o sin IntersectionObserver el
 * contenido se muestra directamente. Tras la animación se retira la clase para no
 * pisar los hover de las tarjetas.
 */
const RevealManager = (() => {
  const SELECTOR = '.project-card, .tool-card, .insight-card, .overview-card, .project-img-wrapper';
  const REVEAL_FALLBACK_MS = 900;

  function release(el) {
    el.classList.remove('reveal', 'is-visible');
  }

  function reveal(el) {
    el.classList.add('is-visible');
    el.addEventListener('transitionend', () => release(el), { once: true });
    // Respaldo por si la transición no llega a dispararse (pestaña en segundo plano)
    window.setTimeout(() => release(el), REVEAL_FALLBACK_MS);
  }

  // Descarga y decodifica las imágenes por adelantado para que no se pinten por partes
  // durante la animación. Devuelve una promesa por elemento (con tope de espera).
  const DECODE_TIMEOUT_MS = 2500;
  const ready = new WeakMap();

  function preload(el) {
    const imgs = el.matches('img') ? [el] : Array.from(el.querySelectorAll('img'));
    const jobs = imgs.map((img) => {
      img.loading = 'eager';
      return img.decode ? img.decode().catch(() => {}) : Promise.resolve();
    });
    const all = Promise.all(jobs);
    const timeout = new Promise((resolve) => window.setTimeout(resolve, DECODE_TIMEOUT_MS));
    ready.set(el, Promise.race([all, timeout]));
  }

  function init() {
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const target = entry.target;
        (ready.get(target) || Promise.resolve()).then(() => reveal(target));
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -6% 0px' });

    document.querySelectorAll(SELECTOR).forEach((el) => {
      // Las imágenes dentro de una tarjeta se animan con la tarjeta, no por separado
      if (el.matches('.project-img-wrapper') && el.parentElement.closest('.project-card')) return;

      // Lo que ya está visible al cargar (hero, primera imagen) no se oculta: protege el LCP
      const rect = el.getBoundingClientRect();
      const rendered = rect.width > 0 && rect.height > 0;
      if (rendered && rect.top < window.innerHeight) return;

      el.classList.add('reveal');
      preload(el);
      observer.observe(el);
    });

    // El fondo del footer también se decodifica antes de llegar a él
    const footerImg = document.querySelector('.footer-bg-img');
    if (footerImg) preload(footerImg);
  }

  return { init };
})();

const themeSelector = document.querySelector('.theme-selector');
const btnTheme = document.getElementById('themeToggle');
const themeOptions = document.querySelectorAll('.theme-option');
const body = document.body;

// Abrir/cerrar menú (Solo si existen los elementos en el HTML)
if (btnTheme && themeSelector) {
    btnTheme.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = themeSelector.classList.contains('active');
        themeSelector.classList.toggle('active');
        btnTheme.setAttribute('aria-expanded', !isActive);
    });

    // Cerrar al hacer click afuera
    document.addEventListener('click', (e) => {
        if (!themeSelector.contains(e.target)) {
            themeSelector.classList.remove('active');
            btnTheme.setAttribute('aria-expanded', 'false');
        }
    });
}

// Seleccionar tema
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedTheme = option.getAttribute('data-theme');
        const themeText = option.getAttribute('data-label');
        const themeIcon = document.getElementById('themeIcon');
        const themeTextSpan = document.getElementById('themeText');
        
        // Actualizar clase activa en el menú
        themeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Aplicar atributo al body (los colores se configurarán después)
        if (selectedTheme === 'light') {
            body.removeAttribute('data-theme');
            themeIcon.textContent = 'light_mode';
        } else if (selectedTheme === 'dark') {
            body.setAttribute('data-theme', selectedTheme);
            themeIcon.textContent = 'dark_mode';
        } else {
            body.setAttribute('data-theme', selectedTheme);
            themeIcon.textContent = 'contrast';
        }
        
        // Actualizar solo la palabra del tema
        themeTextSpan.textContent = themeText;
        
        // Cerrar menú
        themeSelector.classList.remove('active');
        btnTheme.setAttribute('aria-expanded', 'false');
    });
});

// Efecto sticky en barra de navegación al hacer scroll y desvanecer indicador
const topNav = document.querySelector('.top-nav');
const heroScroll = document.getElementById('heroScroll');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        topNav.classList.add('scrolled');
    } else {
        topNav.classList.remove('scrolled');
    }
    
    // Desvanecer el indicador de scroll
    if (heroScroll) {
        if (window.scrollY > 50) {
            heroScroll.style.opacity = '0';
            heroScroll.style.pointerEvents = 'none';
        } else {
            heroScroll.style.opacity = '1';
            heroScroll.style.pointerEvents = 'auto';
        }
    }
});

// Inicializar AOS
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
    
    // Recalcular posiciones cuando la ventana termine de cargar (fuentes e imágenes)
    window.addEventListener('load', () => {
        AOS.refresh();
    });
}

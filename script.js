const themeSelector = document.querySelector('.theme-selector');
const btnTheme = document.getElementById('themeToggle');
const themeOptions = document.querySelectorAll('.theme-option');
const body = document.body;

// Abrir/cerrar menú
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

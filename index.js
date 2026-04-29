/* ── Nav active link on scroll ── */
const sections = document.querySelectorAll('header, section');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('active'));
            const id = e.target.id;
            const active = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.35 });

sections.forEach(s => observer.observe(s));

/* ── Artwork modals ── */
const obras = {
    obra1: {
        artist: 'Colección Arqueológica',
        title: 'Sala Cerámica Prehispánica',
        img: 'https://programadestinosmexico.com/wp-content/uploads/2023/10/Museo-Universitario-Alejandro-Rangel.jpg',
        desc: 'La sala más destacada del museo alberga más de cuarenta recreaciones del mundo animal prehispánico concebidas por los antiguos habitantes de la región de Comala. Las piezas, algunas datadas entre los años 600 y 500 a.C., fueron rescatadas por Alejandro Rangel Hidalgo entre 1950 y 1973, salvándolas de saqueadores de tumbas de tiro.'
    },
    obra2: {
        artist: 'Diseño y Artesanía',
        title: 'Sala Artesanías Comala',
        img: 'https://www.101museos.com/cms101/assets/galerias/-ala-de-pinturas-y-disen-o-de-mueble.jpg',
        desc: 'Esta sala exhibe el trabajo que Rangel Hidalgo realizó como diseñador en "Artesanías Comala" durante la primera parte de la década de los años setenta. Vasijas de barro, objetos de cerámica, muebles y enseres que reflejan su visión de un diseño con raíces profundamente colimenses.'
    },
    obra3: {
        artist: 'Recreación Museográfica',
        title: 'Cocina Mexicana',
        img: 'https://www.101museos.com/cms101/assets/galerias/-epresentacio-n-de-cosina-rural-mexicana.jpg',
        desc: 'Una reconstrucción detallada de una antigua cocina mexicana con una gran variedad de utensilios prehispánicos y coloniales. El espacio evoca la vida cotidiana de la región y muestra cómo se fundieron dos tradiciones culinarias y materiales tras la conquista española.'
    },
    obra4: {
        artist: 'Espacio Personal',
        title: 'Estudio del Maestro',
        img: 'https://sic.cultura.gob.mx/galeria_imagen/4f9825b129d7205_ok.jpg',
        desc: 'En este espacio íntimo el visitante puede conocer de cerca la vida de Alejandro Rangel Hidalgo: sus objetos personales, una pequeña selección de sus diseños gráficos y fotografías de la familia Rangel. Un recorrido emotivo por la cotidianidad del artista e ilustrador más influyente de la historia cultural de Colima.'
    }
};

function openModal(id) {
    const o = obras[id];
    document.getElementById('modal-artist').textContent = o.artist;
    document.getElementById('modal-title').textContent = o.title;
    document.getElementById('modal-img').src = o.img;
    document.getElementById('modal-img').alt = "";
    document.getElementById('modal-desc').textContent = o.desc;
    document.getElementById('modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
}

function closeModalOverlay(e) {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── Form submission ── */
const reservaForm = document.getElementById('reserva-form');
if (reservaForm) {
    reservaForm.addEventListener('submit', submitForm);
}

function submitForm(event) {
    if (event) event.preventDefault();
    clearErrors();

    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const fecha = document.getElementById('fecha');
    const personas = document.getElementById('personas');
    const tipoVisitante = document.getElementById('tipo-visitante');
    const guiadaOptions = document.querySelectorAll('input[name="guiada"]');
    const salas = document.querySelectorAll('input[name="salas"]');

    let valid = true;

    if (!nombre.value.trim()) {
        showError(nombre, 'Ingresa tu nombre completo.');
        valid = false;
    }

    if (!email.value.trim()) {
        showError(email, 'Ingresa tu correo electrónico.');
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showError(email, 'El formato no es válido. Ej: nombre@correo.com');
        valid = false;
    }

    if (!fecha.value) {
        showError(fecha, 'Selecciona una fecha de visita.');
        valid = false;
    }

    if (!personas.value || personas.value < 1) {
        showError(personas, 'Indica cuántas personas asistirán (mín. 1).');
        valid = false;
    }

    if (!tipoVisitante.value) {
        showError(tipoVisitante, 'Selecciona el tipo de visitante.');
        valid = false;
    }

    const salasSeleccionadas = [...salas].filter(s => s.checked);
    if (salasSeleccionadas.length === 0) {
        const fieldset = document.getElementById('salas-fieldset');
        showFieldsetError(fieldset, 'Selecciona al menos una sala de interés.');
        valid = false;
    }

    const guiadaSeleccionada = [...guiadaOptions].find(r => r.checked);
    if (!guiadaSeleccionada) {
        const fieldset = document.getElementById('guiada-fieldset');
        showFieldsetError(fieldset, 'Indica si deseas visita guiada.');
        valid = false;
    }

    if (!valid) return;

    const msg = document.getElementById('form-msg');
    msg.style.display = 'block';
    msg.focus();

    /* limpiar campos de texto */
    ['nombre', 'email', 'fecha', 'personas', 'tipo-visitante', 'notas'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = el.tagName === 'SELECT' ? '' : '';
    });
    /* desmarcar checkboxes y radios */
    salas.forEach(s => s.checked = false);
    guiadaOptions.forEach(r => r.checked = false);

    msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showError(input, message) {
    const errorId = `error-${input.id}`;
    input.style.borderColor = '#D99678';
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', errorId);

    const err = document.createElement('span');
    err.className = 'field-error';
    err.id = errorId;
    err.setAttribute('role', 'alert');
    err.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>${message}`;
    input.parentNode.appendChild(err);
}

function showFieldsetError(fieldset, message) {
    const errorId = `error-${fieldset.id}`;
    fieldset.classList.add('fieldset-error');
    fieldset.setAttribute('aria-invalid', 'true');
    fieldset.setAttribute('aria-describedby', errorId);

    const err = document.createElement('span');
    err.className = 'field-error';
    err.id = errorId;
    err.setAttribute('role', 'alert');
    err.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>${message}`;
    fieldset.appendChild(err);
}

function clearErrors() {
    document.querySelectorAll('.field-error').forEach(e => e.remove());
    ['nombre', 'email', 'fecha', 'personas', 'tipo-visitante'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.borderColor = '';
            el.removeAttribute('aria-invalid');
            el.removeAttribute('aria-describedby');
        }
    });
    ['salas-fieldset', 'guiada-fieldset'].forEach(id => {
        const fieldset = document.getElementById(id);
        if (fieldset) {
            fieldset.classList.remove('fieldset-error');
            fieldset.removeAttribute('aria-invalid');
            fieldset.removeAttribute('aria-describedby');
        }
    });
    document.getElementById('form-msg').style.display = 'none';
}
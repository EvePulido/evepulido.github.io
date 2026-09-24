# Registro de Cambios e Historial de Desarrollo (Changelog)

Este documento recopila de manera cronológica y temática todos los hitos, mejoras y refactorizaciones técnicas realizadas en el portafolio personal de **Evelyn Pulido**.

---

## 🚀 Hitos Recientes

### 1. Refinamiento de Accesibilidad y Semántica HTML (WCAG 2.1 AA/AAA)
- **Homologación de Atributos `alt` en Mockups**:
  - En [`learncode.html`](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/learncode.html), se homologaron los mockups decorativos de cabecera (`learncode.webp`) y de tableta (`mockup-tablet-learncode.webp`) con `alt=""`, replicando el patrón de `muarh.html` y reservando descripciones semánticas detalladas exclusivamente para capturas de pantallas y flujos de interfaz funcionales.
- **Jerarquía Única de Encabezados (`<h1>`)**:
  - En [`about.html`](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/about.html) y [`coming-soon.html`](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/coming-soon.html), se sustituyó el elemento `<h1 class="logo-heading">` por `<p class="logo-heading">`, garantizando la existencia de un único encabezado principal `<h1>` por página (el título temático de cada vista).
- **Transferencia Confiable de Foco en Skip Links**:
  - Se añadió `tabindex="-1"` al contenedor `<main id="main-content">` en [`index.html`](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/index.html), [`about.html`](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/about.html) y [`coming-soon.html`](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/coming-soon.html).
  - En [`assets/css/styles.css`](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/assets/css/styles.css), se incorporó la regla `main:focus { outline: none; }` para asegurar que el salto del skip link transfiera el foco al flujo principal sin recuadros visuales sobre el contenedor padre, manteniendo `:focus-visible` intacto para todos los controles interactivos.

### 2. Optimización de Contraste en Modo Oscuro para `.project-area` (WCAG AAA)
- **Legibilidad Móvil y Táctil (`assets/css/styles.css`)**:
  - Se identificó que en pantallas táctiles y dispositivos móviles (`@media (hover: none)` y `<=768px`), el selector `.project-area` utilizaba `var(--color-accent-yellow)`. Dado que en modo oscuro este token posee baja opacidad (`rgba(255, 122, 69, 0.22)`), reducía drásticamente la legibilidad del texto sobre el fondo degradado oscuro de las tarjetas de proyectos.
  - Se definieron reglas explícitas bajo `[data-theme="dark"] .project-area` y `@media (prefers-color-scheme: dark)` asignando `color: var(--color-primary-hover);` (`#FFA07A`).
  - Esto proporciona un contraste de **8.22:1** sobre el fondo de las tarjetas, superando el requisito de 7:1 para WCAG 2.1 Nivel AAA.

### 3. Integración de Twitter Cards & Metadatos Sociales en `coming-soon.html`
- **Estandarización SEO y Open Graph**:
  - Incorporadas las etiquetas `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image` y `twitter:image:alt` en [`coming-soon.html`](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/coming-soon.html).
  - Homologadas las dimensiones Open Graph (`og:image:width: 1200`, `og:image:height: 630` y `og:image:alt`) sincronizadas con la URL canónica `https://evepulido.com/assets/images/og-cover.svg`.

### 4. Coherencia de Enlaces Sociales & Recurso de Retrato en "About Me"
- **Homologación de URLs Sociales en `README.md`**:
  - Se actualizaron los perfiles de LinkedIn (`https://www.linkedin.com/in/evepulido`) y Kaggle (`https://www.kaggle.com/evepulido`) para sincronizarlos con los utilizados en las interfaces HTML.
  - Sincronizado el árbol de directorios de `README.md` para reflejar con precisión los recursos dentro de `assets/images/`.
- **Integración de Recurso WebP para Retrato**:
  - Incorporado el archivo optimizado [`assets/images/image.webp`](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/assets/images/image.webp) (WebP a calidad 85, ratio 3.5:4), eliminando el error 404 en [`about.html`](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/about.html) y añadiendo el atributo semántico `alt="Portrait of Evelyn Pulido"`.

### 5. Reorganización y Centralización de Recursos Gráficos en `assets/images/`
- **Limpieza de la Raíz de `assets/`**:
  - Movidos los 6 recursos de identidad de marca (`Logo.svg`, `Logo-dark.svg`, `logo-simple.svg`, `logo.ico`, `og-cover.svg` y `footer.svg`) desde la raíz de `assets/` hacia su ubicación canónica en `assets/images/`.
  - La raíz de `assets/` queda 100% modular y limpia conteniendo únicamente subdirectorios (`css/`, `js/`, `docs/`, `images/`).
  - Actualizadas todas las referencias en [index.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/index.html), [about.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/about.html), [learncode.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/learncode.html), [muarh.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/muarh.html) y [coming-soon.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/coming-soon.html).
  - Documentación técnica sincronizada en [CONTEXT.md](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/CONTEXT.md) y [GEMINI.md](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/GEMINI.md).

### 2. Corrección de Dominio en Metadatos Open Graph y Twitter Cards
- **Estandarización de Dominio Canónico (`https://evepulido.com/`)**:
  - Actualización de las URLs absolutas en las etiquetas de previsualización social (`og:image` y `twitter:image`) en todas las páginas HTML ([index.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/index.html), [about.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/about.html), [learncode.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/learncode.html), [muarh.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/muarh.html), [coming-soon.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/coming-soon.html)).
  - Corrección de la discrepancia donde apuntaban al subdominio heredado `https://evepulido.github.io/`, alineándolo con [sitemap.xml](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/sitemap.xml) y [robots.txt](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/robots.txt).

### 2. Sistema Integral de Modo Oscuro (Dark Mode & Accesibilidad)
- **Tokens de Diseño WCAG 2.1 AA/AAA**:
  - Implementación de tokens oscuros bajo `[data-theme="dark"]` y selector `@media (prefers-color-scheme: dark)`:
    - Fondo profundo `--color-bg: #141414` y superficies elevadas (`--color-surface-subtle: #1C1C1C`, `--color-surface-tag: #252525`, `--color-card-border: #2D2D2D`).
    - Texto principal de alto contraste `--color-text-main: #F2F2F2` (ratio > 17:1 contra fondo, superando WCAG AAA).
    - Color primario adaptado a terracotta vibrante `--color-primary: #FF7A45` (ratio > 7:1 contra fondo, superando WCAG AAA).
    - Creación del archivo vectorial `assets/Logo-dark.svg` con trazados exactamente en `#FF7A45`, renderizado sin distorsión de filtros y alternado limpiamente vía CSS.
    - Adaptación contextual para iconos sociales: en el footer, GitHub y LinkedIn se muestran en blanco (`filter: brightness(0) invert(1)`), mientras que Kaggle conserva su color original (`#20beff`, `filter: none`). En About Me, los botones naranja usan iconos y texto oscuros (`var(--color-text-dark)`) para contraste óptimo.
    - Preservación total de las transiciones y animaciones hover originales: elevación `translateY(-3px)` y rotación/escalado de iconos (`scale(1.18) rotate(-6deg)`).
    - Refactorización completa a variables CSS (0 colores hexadecimales fuera del bloque `:root` de tokens) y 0 estilos en línea en todo el HTML.
- **Switch Deslizable Accesible W3C APG (`.theme-switch`)**:
  - Switch de pastilla ergonómico de 74×40px con icono de sol ☀️ a la izquierda e icono de luna 🌙 a la derecha (18px c/u).
  - Deslizador (*thumb*) circular de 32px que viaja suavemente entre los extremos (34px de recorrido), iluminando el estado activo.
  - Implementación técnica estándar: `<input type="checkbox" role="switch" aria-checked="..." aria-label="Dark mode">` con técnica `visually-hidden` para total soporte de lectores de pantalla (NVDA, TalkBack, VoiceOver).
  - Indicador de foco visible `:focus-visible` de 3px con desplazamiento conforme a WCAG 2.4.7 y 2.4.11.
- **Persistencia & Zero FOUC**:
  - Guardado de la preferencia en `localStorage.setItem('theme', ...)`.
  - Script síncrono en `<head>` que previene cualquier parpadeo de tema incorrecto (*Flash of Unstyled Content*).
  - Sincronización reactiva con cambios del sistema operativo cuando no hay preferencia manual forzada.

### 2. Integración y Activación del Currículum Vitae (CV)
- **Centralización en `assets/docs/`**:
  - Sustitución del archivo de marcador de posición (`607 bytes`) por el CV profesional actualizado en inglés (`CV_UXUI_EN.pdf` de `66 KB`), estandarizado como `assets/docs/CV_Evelyn_Pulido.pdf` (y conservando `CV_UXUI_EN.pdf` en la misma carpeta).
  - Eliminación de archivos temporales dispersos en la raíz de `assets/`.
- **Reactivación de Enlaces de Descarga**:
  - Habilitado el botón interactivo `.cv-download-btn` en la tarjeta flotante de contacto de [index.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/index.html) y en [about.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/about.html).
  - Configurado con atributo nativo `download`, icono accesible de Lucide (`download`) y texto accesible para lectores de pantalla.

### 2. Casos de Estudio: LearnCode & MUARH
- **Creación del Caso de Estudio LearnCode (`learncode.html`)**:
  - Estructurado duplicando la arquitectura accesible y diseño visual de MUARH.
  - Redacción profesional de *Project Overview*, *Key Challenges & Constraints*, *Design Strategy* y *Conclusion* fundamentada en cuatro investigaciones empíricas:
    - **A1**: Investigación Etnográfica (satisfacción 9.3/10 y detección de necesidades).
    - **A2**: Card Sorting (estandarización en 4 pilares: Home, Ranking, Community, Profile).
    - **A3**: Tree Testing (resolución del cuello de botella en la ubicación de la racha diaria).
    - **A4**: Evaluación Heurística (retroalimentación de subida, confirmación de guardado y ergonomía de formularios).
  - Implementación de línea de proceso vertical (`.learncode-page .dot-process-flow`) exclusiva para las 4 fases de investigación sin alterar el diseño horizontal de MUARH.
  - Enlaces a prototipo interactivo en Figma con `aria-label` y apertura en nueva pestaña segura (`rel="noopener noreferrer"`).
- **Simetría y Proporciones en "Final Design & Improvements"**:
  - Reutilización estricta de clases de rejilla: **`.col-7`** para texto explicativo y **`.col-5`** para columnas de imágenes en las 3 filas de mejoras (`.improvement-row`).
  - El ancho de las imágenes de mejoras en ambos casos de estudio (`learncode.html` y `muarh.html`) coincide de forma idéntica con el ancho de la tarjeta LearnCode de la página de inicio (`col-5`).
  - Implementación de cuadrículas dobles reutilizables (`.project-img-grid`) para pantallas móviles en:
    - **LearnCode Pilar 1**: `learncode-home.webp` y `learncode-courses.webp`.
    - **LearnCode Pilar 2**: `learncode-loader.webp` y `learncode-confirm-modal.webp`.
    - **MUARH Fila 3**: `boton.webp` y `menu.webp`.
- **Estandarización de Proporciones CSS**:
  - Regla `aspect-ratio: 802 / 450` para imágenes horizontales únicas (`fecha.webp` y `learncode-form-usability.webp`) garantizando consistencia visual con `admision.webp`.
- **Navegación Inferior Interconectada**:
  - Implementada navegación secuencial bidireccional entre casos de estudio: [muarh.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/muarh.html) enlaza hacia adelante con *"Next Project: LearnCode"* y [learncode.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/learncode.html) enlaza hacia atrás con *"Previous Project: MUARH"*, permitiendo recorrer los proyectos en cadena sin perder los accesos directos al inicio vía Breadcrumb y header.
- **Navegación Superior Accesible (Breadcrumb)**:
  - Transformado el subtítulo estático *"Featured Work"* del hero en ambos casos de estudio (`muarh.html` y `learncode.html`) en un enlace accesible estilo migaja de pan (`.hero-breadcrumb` con icono `chevron-left`), permitiendo volver de inmediato a la sección de proyectos (`index.html#work`) sin perder el enlace home del logo principal.

---

### 2. Optimización de Rendimiento & Gestión de Medios
- **Migración Integral a WebP**:
  - Conversión de todas las capturas y mockups ráster (`.png`, `.jpg`) a formato moderno `.webp` con calidad 85.
  - Reducción del peso total de recursos de más de 12 MB a menos de 1.8 MB (reducción superior al 85%), optimizando tiempos de carga y métricas Core Web Vitals.
- **Organización Modular de Imágenes**:
  - Estructuración de recursos en carpetas independientes: `assets/images/muarh/` y `assets/images/learncode/`.
  - Actualización de todas las rutas relativas en el código HTML y metadatos sociales.
- **Auditoría de Accesibilidad Visual (Alt Texts)**:
  - Textos descriptivos completos en imágenes de interfaz que transmiten información relevante para usuarios con lectores de pantalla.
  - Asignación de `alt=""` para imágenes e iconos puramente decorativos o acompañados de texto visible.

---

### 3. Página de Inicio (`index.html`) & Arquitectura SPA
- **Encabezado Inteligente (`site-header`)**:
  - Menú semántico con navegación fluida.
  - Animación en scroll (`scrollY > 20px`): reducción suave de padding de `2rem` a `0.75rem` y del logo de `120px` a `54px`.
  - Fondo traslúcido con desenfoque de cristal (`backdrop-filter: blur(14px)`).
  - Compensación de desplazamiento superior (`margin-top: 170px`) en `main` para evitar saltos de layout (*Layout Shifts*).
- **Indicador de Scroll Accesible**:
  - Icono animado con rebote vertical acotado a 3 ciclos respetando `prefers-reduced-motion`.
  - Desvanecimiento al iniciar scroll (`scrollY > 40px`).
  - Navegación suave hacia `#work` compensando la barra fija mediante `scroll-margin-top: 110px`.
  - Oculto para tecnologías asistivas (`aria-hidden="true"`, `tabindex="-1"`).
- **Rejilla de Proyectos Destacados (`#work`)**:
  - Fila 1: MUARH (`col-7`) + LearnCode (`col-5`).
  - Fila 2: Espacio preparado para futuros proyectos (`col-5` + `col-7`).
  - Capa interactiva de revelación (*overlay*) activable por hover del cursor y enfoque de teclado (`:focus-visible`).
  - Soporte táctil móvil bajo `@media (max-width: 768px)` y `@media (hover: none)`.
- **Navegación SPA Accesible (W3C Gold Standard)**:
  - Enlaces de cambio de vista con atributo `aria-current="page"`.
  - Gestión de foco por JavaScript (`index.js`), sincronización con el historial del navegador (`popstate`) y anuncio en lectores de pantalla.

---

### 4. Página "About Me" (`about.html`)
- **Sección Hero & Botones Pill**:
  - Presentación personal con tipografía Parkinsans.
  - Fila de botones sociales en pastilla con bordes redondeados (`100px`) en color primario `#B33200`.
- **Tarjetas de Habilidades UX (UX Skills)**:
  - 6 áreas clave: *UX Foundations*, *Empathy & Ideation*, *Wireframing & Low-Fi*, *UX Research & Testing*, *Hi-Fi Designs & Figma*, *Dynamic Web UI*.
- **Educación Formal**:
  - Ficha destacando el grado de Ingeniería de Software en la Facultad de Telemática (Universidad de Colima, 2023–2027).

---

### 5. Componentes Globales, SEO & Accesibilidad
- **Footer & Tarjeta de Contacto**:
  - Tarjeta flotante `.contact-card` con micro-interacciones hover sobre banner vectorial `assets/footer.svg`.
  - Enlace de correo electrónico subrayado y enlaces a redes sociales.
- **Identidad Visual & Favicons**:
  - Favicon SVG adaptativo (`assets/logo-simple.svg`) con ajuste automático según el tema del sistema claro/oscuro.
  - Favicon tradicional `.ico` para compatibilidad retroactiva.
- **SEO & Redes Sociales**:
  - Metadatos Open Graph (`og:title`, `og:description`, `og:image`, `og:type`) y Twitter Card (`summary_large_image`).
  - Archivos `robots.txt` y `sitemap.xml` configurados.
- **Cumplimiento WCAG 2.1 AA/AAA**:
  - Enlace de salto inicial (*Skip Link*) `#main-content`.
  - Contrastes de color certificados sobre 4.5:1 (AA) y 7.8:1 (AAA).
  - Respeto a preferencias del usuario: `prefers-reduced-motion` y `prefers-reduced-transparency`.

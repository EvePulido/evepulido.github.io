# Registro de Cambios e Historial de Desarrollo (Changelog)

Este documento recopila de manera cronológica y temática todos los hitos, mejoras y refactorizaciones técnicas realizadas en el portafolio personal de **Evelyn Pulido**.

---

## 🚀 Hitos Recientes

### 1. Casos de Estudio: LearnCode & MUARH
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

# Contexto del Proyecto: Portafolio de Evelyn Pulido

Este documento contiene el resumen técnico, decisiones de diseño, estándar de accesibilidad y estado actual del desarrollo del portafolio personal.

---

## 🎨 Sistema de Diseño & Tokens CSS

| Token / Elemento | Valor / Especificación | Uso en el Proyecto |
| :--- | :--- | :--- |
| **Color Principal** | `#B33200` (`--color-primary`) | Enlace activo, títulos de sección (`Featured Work`), foco y acentos |
| **Color Texto Principal** | `#1E1E1E` (`--color-text-main`) | Encabezados principales, body y navegación |
| **Color Texto Secundario** | `#5E5E5E` (`--color-text-secondary`) | Subtítulos del hero, indicador de scroll |
| **Fondo General** | `#FFFFFF` (`--color-bg`) | Fondo principal de la página y header |
| **Color Acento Amarillo** | `#FFEABF` (`--color-accent-yellow`) | Fondo al hacer hover en las chips de tecnologías y sombra de tarjetas |
| **Borde de Tarjetas** | `#CCCCCC` (`--color-card-border`) | Borde fino y definido para tarjetas de tecnologías, contacto y botones |
| **Tipografía Encabezados Principal**| `'Parkinsans', sans-serif` | Frase del Hero (`.hero-title`) |
| **Tipografía Cuerpo, Títulos y Tarjetas**| `'Poppins', sans-serif` | Menú, subtítulos, títulos de sección `<h2>`, títulos de tarjetas y overlays |

---

## 📐 Especificaciones del Layout Grid

- **Sistema de Columnas**: 12 columnas fluidas (`.grid-12`).
- **Margen Exterior (Desktop)**: `80px` (`--grid-margin: 80px`). *Adaptativo a 40px en tablet y 20px en móvil.*
- **Gutter (Separación de Columnas)**: `24px` (`--grid-gutter: 24px`).
- **Clases Grid**: `.container`, `.grid-12`, y clases de amplitud `.col-1` a `.col-12`.

---

## 🏛️ Estructura Semántica y Componentes Construidos

### 1. Barra de Navegación (`site-header`)
- **Jerarquía Semántica**: El logo principal SVG está encapsulado en el **`<h1>`** de la página (`<h1 class="logo-heading">`).
- **Navegación**: Menú accesible `<nav aria-label="Navegación principal">` con la lista de enlaces `Work` y `About me`.
- **Comportamiento Reducido (Fixed + Scroll)**:
  - Posición fija (`position: fixed`).
  - Al hacer scroll (`scrollY > 20px`), el padding se reduce de `2rem` a `0.75rem` y el logo pasa de **`120px` a `54px`** de altura.
  - Fondo traslúcido accesible: `rgba(255, 255, 255, 0.90)` con `backdrop-filter: blur(14px)`.
  - Reserva de espacio en `main` (`margin-top: 170px`) para evitar saltos o parpadeos de layout.

### 2. Sección Principal (Hero)
- **Subtítulo**: *"Software Engineer & UX/UI Designer"* en Poppins `#5E5E5E`.
- **Título**: *"Every experience begins by listening to people and improves through designing, testing, and learning with them."* en Parkinsans `#1E1E1E`.

### 3. Indicador de Scroll
- **Visual**: Texto `SCROLL` en Poppins mayúsculas + icono `arrow-down` de Lucide.
- **Animación**: Rebote vertical sutil de `8px` acotado a 3 ciclos (`@media (prefers-reduced-motion: no-preference)`).
- **Desvanecimiento**: Se oculta al desplazar la página hacia abajo (`scrollY > 40px`).
- **Interactividad**: Al hacer clic, desplaza la pantalla suavemente a la sección `#work` (`Featured Work`) compensando la altura de la barra fija con `scroll-margin-top: 110px`.
- **Accesibilidad**: Totalmente oculto para lectores de pantalla (`aria-hidden="true"`, `tabindex="-1"`).

### 4. Sección Featured Work (`#work`)
- **Título de Sección**: `<h2>` *"Featured Work"* en Parkinsans color `#B33200`.
- **Grid de Proyectos (2 Filas x 2 Columnas)**:
  - **Escritorio / Tablet**:
    - **Fila 1**: Proyecto 1 (**7 columnas**) + Proyecto 2 (**5 columnas**).
    - **Fila 2**: Proyecto 3 (**5 columnas**) + Proyecto 4 (**7 columnas**).
  - **Móvil (<= 768px)**: Apilado uniforme a **1 columna completa** (`grid-column: span 4; width: 100%`) con altura fija igual para todas las tarjetas.
- **Capa Superpuesta (Overlay en Hover/Focus)**:
  - Cubre la tarjeta con el color principal al 90% opacidad (`rgba(179, 50, 0, 0.90)`).
  - Texto interior: Título del proyecto (`<h3>`) y Área (`<p>`), ambos en fuente **Poppins** y color blanco puro **`#FFFFFF`**.
  - Activación por mouse (*hover*) y por navegación de teclado (*focus* / `:focus-visible`).
  - Sombra exterior ultra ligera en amarillo `#FFEABF` (`box-shadow: 0 8px 24px 0px rgba(255, 234, 191, 0.45)`).

---

## ♿ Buenas Prácticas y Accesibilidad (WCAG AA/AAA)

1. **Enlace Skip-Link**: `<a href="#main-content" class="skip-link">` para navegación rápida con teclado.
2. **Landmarks Semánticos**: Uso de `<header>`, `<nav>`, `<main>`, `<section>`, y `<footer>`.
3. **Contrastes de Color**: Todos los textos cumplen y superan el estándar WCAG AA (4.5:1) y AAA (7.8:1 en las tarjetas).
4. **Respeto a Preferencias del Usuario**:
   - `@media (prefers-reduced-motion: reduce)` desactiva animaciones.
   - `@media (prefers-reduced-transparency: reduce)` desactiva efectos de desenfoque traslúcido.
5. **Navegación por Teclado**: Reglas `:focus-visible` bien definidas con anillos de enfoque visibles.

---

## 📋 Próximas Secciones & Tareas Pendientes

- [ ] **Diseño Móvil/Táctil para Tarjetas de Proyectos**: Definir la visualización permanente o alternativa del título y área de los proyectos en dispositivos móviles/táctiles (ya que en móvil no existe el estado *hover* ni navegación por teclado *tab* físico).
- [x] **Sección Tools**: Tarjetas de herramientas ordenadas (`Diseño`, `Frontend`, `Backend`, `Herramientas`) integradas en la sección `#tools`.
- [x] **Favicon Dinámico y Adaptativo**: Configurado `assets/logo-simple.svg` en `index.html` con cambio automático de color (#FFFFFF en modo oscuro del navegador y #1E1E1E en modo claro) mediante `@media (prefers-color-scheme: dark)`.
- [x] **Footer & Contacto (Diseño image.png)**: Tarjeta flotante blanca (`.contact-card`) with title `Contacto` en la tipografía **Parkinsans** (`#B33200`), subtítulo, email subrayado con flecha interactiva, línea divisoria interior, copyright y botones sociales con fondo pastel `#FDE6FF` y micro-animación de ladeo y escalado (`scale(1.18) rotate(-6deg)`) al hacer hover sobre el fondo de gradiente `assets/footer.svg`.
- [x] **Enlaces Oficiales a Redes Sociales**:
  - **LinkedIn**: `https://www.linkedin.com/in/evepulido`
  - **GitHub**: `https://github.com/EvePulido`
  - **Kaggle**: `https://www.kaggle.com/evepulido`
  - Actualizados en todos los botones del hero y footer tanto en [`index.html`](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/index.html) como en [`about.html`](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/about.html).
- [x] **Rediseño Profesional de About Me & UX Skills**:
  - **Presentación Hero con Botones Redondeados (Pill)**: Título en grande *"Hi, I’m Evelyn Pulido"*, descripción fluida y fila de 3 botones de redes sociales estilo pastilla totalmente redondeados (`border-radius: 100px`) en color primario (`var(--color-primary)` = `#B33200`) con sus iconos en **LinkedIn** y **GitHub**, y el botón de **Kaggle** con texto limpio sin icono para mantener uniformidad cromática.
  - **Tarjetas de UX Skills Limpias**: 6 tarjetas profesionales de habilidades (*UX Foundations*, *Empathy & Ideation*, *Wireframing & Low-Fi*, *UX Research & Testing*, *Hi-Fi Designs & Figma*, *Dynamic Web UI*) descritas con lenguaje profesional enfocado en competencias prácticas.
  - **Sección Education**: Tarjeta oficial única destacando la carrera de Ingeniería de Software en la **Facultad de Telemática (Universidad de Colima, 2023 – 2027)** enfocada en desarrollo ágil de software, aplicaciones web y móviles, arquitectura de sistemas y redes de datos (`col-12`).
- [x] **Internacionalización a Inglés y Accesibilidad WCAG AA**: Documento completo unificado en inglés con `<html lang="en">` en [index.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/index.html) y [about.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/about.html), corrección de referencias ARIA (`aria-labelledby="nav-work"` y `aria-labelledby="nav-about"`), etiquetas `aria-label` en enlaces de navegación e imágenes decorativas con `alt=""`.
- [x] **Arquitectura de Vistas Dinámicas SPA Accesible (W3C Gold Standard)**:
  - Implementado el menú con enlaces semánticos `<a>` en [index.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/index.html) (`<a href="#work">` y `<a href="#about">`) con el atributo oficial `aria-current="page"`.
  - Control de accesibilidad en [index.js](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/index.js) (`initViewSwitcher`) con transmisión del foco al encabezado principal (`heading.focus()`), sincronización de URL (`#work` / `#about`), soporte completo para historial del navegador (`popstate`) y respuesta del Narrador como *"Work, enlace, página actual"*.

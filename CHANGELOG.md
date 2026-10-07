# Registro de Cambios e Historial de Desarrollo (Changelog)

Este documento recopila de manera cronológica y temática todos los hitos, mejoras y refactorizaciones técnicas realizadas en el portafolio personal de **Evelyn Pulido**.

---

## 🚀 Hitos Recientes

### 0. Limpieza de Código sin Cambios Visuales (Auditoría)
- **Aparición al hacer scroll (`RevealManager`)**: tarjetas (`.project-card`, `.tool-card`, `.insight-card`, `.overview-card`) e imágenes (`.project-img-wrapper`) hacen fade + desplazamiento de 16px (500ms) una sola vez al entrar en pantalla, con `IntersectionObserver`. Las clases `.reveal`/`.is-visible` las añade el JS, así que sin JS, con `prefers-reduced-motion` o al imprimir el contenido se ve directamente. Lo que ya está visible al cargar (hero, primera imagen) no se oculta, para no retrasar el LCP, y la clase se retira al terminar para no pisar los hover. No se anima texto ni párrafos. Funciona en `index` (también al abrir la vista About), `about` y los 3 case studies.
- **Auditoría de accesibilidad (axe-core 4.10)**: 0 violaciones WCAG 2.0/2.1/2.2 A y AA ni buenas prácticas en las 6 páginas, en claro/oscuro y a 1280/390px, incluidos el menú abierto y la vista About de `index`. Corregido: el contenedor del footer de `index.html` y `about.html` pasó de `<footer>` (que dentro de `<main>` no es landmark y no admite `aria-labelledby`) a `<section>`, y `.about-social-links` recibió `role="group"`.
- **Auditoría de CSS/JS**: sin estilos inline (el placeholder pasó a `.project-card--placeholder` en CSS); eliminadas las referencias a `--shadow-project-card*` (no estaban definidas y resolvían a `none`), `.tool-card.interactive`, `.cv-download-btn.secondary`, `.case-study-tags` y el `!important` de `.view-panel[hidden]`; el grupo de transiciones de tema ya no pisa las transiciones de `.site-header`, `.tool-card` y `.tool-tag`; nueva regla `.case-study-caption` (los pies de foto de `lumi.html` no tenían estilo y se quitó `.text-subtle`); el menú hamburguesa se activa con `.js-menu`, que añade `MenuManager` solo cuando el script corre (si falla, los enlaces siguen visibles); JS sin exports ni fallbacks sin uso. `footer.svg` se mantiene (la conversión a WebP rompió el diseño).
- **Menú hamburguesa en móvil (≤768px)**: en las 6 páginas se añadió un botón `.nav-toggle` (`aria-expanded`, `aria-controls="primary-nav"`, 44×44px) que despliega solo los enlaces Work y About me en un panel bajo el header; el interruptor de tema se queda visible en la barra, junto al botón. El `<nav id="primary-nav">` ahora contiene solo la lista y `.navbar` pasó a ser el `<div>` que agrupa nav, interruptor y botón. `MenuManager` (`index.js`) cierra el panel con Escape (devolviendo el foco al botón), al elegir un enlace, al hacer clic o enfocar fuera del header y al pasar a escritorio. Sin JavaScript (`html.js` ausente) se conserva la barra horizontal. El logo conserva su tamaño por defecto (68px; 54px con scroll) porque ya no compite con el menú. Medido en Chrome headless a 320 y 390px: sin scroll horizontal; en escritorio el botón no se muestra.
- **Currículum actualizado**: `assets/docs/CV_Evelyn_Pulido.pdf` (el que enlazan `index.html` y `about.html`) se reemplazó por la versión nueva del CV (octubre 2026: certificación Google UX Design Professional Certificate y correo actualizado). El correo de contacto de `index.html` y `about.html` (texto, `mailto:` y `aria-label`) pasó a `evelynp.dev@gmail.com` para coincidir con el CV.
- **Imagen para compartir en redes**: `assets/images/og-cover.png` (1200×630, renderizada desde `og-cover.svg`) reemplaza al SVG en `og:image` y `twitter:image` de `index`, `about`, `lumi` y `coming-soon`, porque los rastreadores sociales no renderizan SVG. Es la excepción a la regla de PNG → WebP.
- **Fuentes, semántica y código muerto**:
  - `styles.css`: se quitó el `@import` de Google Fonts (bloqueaba el render); las fuentes se cargan con `<link rel="stylesheet">` en las 6 páginas. Eliminadas las reglas sin uso `.image-placeholder`, `.placeholder-*` y `.theme-toggle-btn`.
  - Casos de estudio: los títulos de la tarjeta de resumen (`Role`, `Project Goal`, `Target Audience`) pasaron de `<h2>` a `<p class="overview-item-title">` para no competir con los títulos de sección; `fetchpriority="high"` en el hero; comentario "14-Section" simplificado.
  - `index.html` y `about.html`: `width`/`height` en tarjetas y retrato; eliminada la tarjeta comentada.
  - `index.js`: `ThemeManager` solo soporta el checkbox `role="switch"` (sin rama de botón ni `aria-checked` manual, también retirado del HTML); `catch` vacíos documentados.
  - Verificado: capturas de las 6 páginas idénticas pixel a pixel antes y después, y el switch de tema funciona.

### 1. Sincronización de Documentación con el Código
- **README, `.agents/` y CHANGELOG alineados con el estado real del repositorio**:
  - Reemplazado "Featured Work / Featured Case Studies" por **Case Studies** en `README.md` y `.agents/context.md`.
  - Actualizados los árboles de archivos (`assets/images/lumi/`, `assets/docs/CV_UXUI_EN.pdf`, `CLAUDE.md`, `.agents/`) y retiradas las referencias a archivos inexistentes (`GEMINI.md`, PNG eliminados, `learncode-streak-navigation.webp`).
  - Añadida la entrada de Lumi (`lumi.html`) en `README.md` y `.agents/context.md`, junto con los datos técnicos recientes (Lucide 1.52.0 con SRI, reglas de `.improvement-row`, modificadores `.project-img--crop*`, atributos `width`/`height`, `alt` de hero decorativo y `prefers-reduced-motion` en JS).
  - Enlaces absolutos `file:///C:/...` reemplazados por rutas relativas y renumerados de forma secuencial los encabezados `### N.` de este archivo.
  - Seguimiento: enlaces de `CONTEXT.md` pasados a rutas relativas; regla de PNG actualizada (se convierten a WebP y se eliminan, no se conservan); puntos de corte de 1024px y 480px documentados en `.agents/claude.md`; correcciones menores a entradas históricas (`lumi-card.webp`, PNG fuente, `GEMINI.md`).

### 2. Estructura de Agentes `.agents/` y Adopción de Nomenclatura "Case Studies"
- **Creación de Carpeta Centralizada `.agents/`**:
  - Se implementó la arquitectura estándar para agentes de IA con [.agents/context.md](.agents/context.md), [.agents/claude.md](.agents/claude.md), [.agents/consistencia-redaccion.md](.agents/consistencia-redaccion.md) y la carpeta de mejoras por proyecto [.agents/mejoras/](.agents/mejoras/).
- **Aplicación de Mejoras Editoriales y Precisión de Datos en MUARH (`muarh.html`)**:
  - Estandarización a **WCAG 2.1 nivel AA** en todo el documento (eliminada la inconsistencia con WCAG 2.2).
  - Redacción en tiempo pasado de las mejoras de código implementadas (*Corrected*, *Added*, *Improved*, *Enabled*, *Updated*, *Increased*) y diferenciación explícita del estado de pruebas con usuarios pendientes.
  - Contextualización de la tasa de finalización del 100% especificando la muestra ($N=3$) y documentando las barreras de interacción observadas durante las pruebas.
  - Atribución de voz personal precisa: *"I"* para el diseño, programación frontend e inspección técnica individual por parte de Evelyn, y *"we"* para las sesiones colaborativas de pruebas con usuarios.
- **Aplicación de Mejoras Editoriales y Métricas en LearnCode (`learncode.html`)**:
  - Aclaración de la puntuación de 9.3/10 asociándola específicamente al estudio de usabilidad inicial con los 10 estudiantes de Ingeniería de Software.
  - Aclaración del resultado de *Tree Testing*: 4 de 6 participantes (40% de éxito directo al primer intento) ubicaron las rachas de estudio.
  - Delimitación del alcance del prototipo interactivo en Figma, especificando interacciones y estados de interfaz simulados.
  - Atribución de voz personal y de equipo: *"we"* para las 4 etapas de investigación de UX realizadas por el equipo de 4 integrantes, e *"I"* para el diseño e iteraciones visuales de alta fidelidad realizadas por Evelyn en Figma.
  - Eliminación de adjetivos promocionales (*invaluable*, *frictionless*) en favor de descripciones objetivas de la arquitectura de información.
- **Filas de mejoras responsivas en los tres casos de estudio (`.improvement-row`)**:
  - En ≤1024px el texto ocupa toda la fila y las imágenes quedan debajo, de a dos lado a lado cuando hay `.project-img-grid` (en ≤480px se apilan) y centradas con máx. 560px cuando es una sola. Las capturas en pareja no se amplían más allá de su tamaño nativo. Aplica a MUARH, LearnCode y Lumi con selectores comunes, sin clases nuevas.
- **Auditoría de código: limpieza de CSS y accesibilidad (MUARH, LearnCode, Lumi)**:
  - CSS: se simplificó `.project-img-grid` (las reglas de altura y centrado que `.improvement-row` anulaba) y se movió el colapso a una columna a un único `@media (max-width: 480px)`. Los selectores por nombre de archivo (`src*=`) se reemplazaron por los modificadores `.project-img--crop`, `--crop-top` y `--crop-bottom`.
  - HTML: `width`/`height` en todas las imágenes de contenido de las tres páginas, para evitar saltos de layout. Los mockups de MUARH y el mockup de tablet de LearnCode pasaron de `alt=""` a texto descriptivo; las imágenes hero se mantienen decorativas (`alt=""`). Se quitó la clase `lumi-page`, que no tenía reglas.
  - JS: `window.scrollTo` y `scrollIntoView` respetan `prefers-reduced-motion`.
  - Dependencias: Lucide pasó de `unpkg.com/lucide@latest` a la versión fija `1.52.0` con integridad SRI (`sha384`) y `crossorigin="anonymous"` en las 6 páginas. Al actualizar la versión hay que recalcular el hash.
- **Publicación del Caso de Estudio Lumi (`lumi.html`)**:
  - Construcción completa del documento HTML5 semántico para el prototipo de control parental Lumi siguiendo las directrices editoriales y la estructura estándar de los casos de estudio (tarjeta de resumen más 6 secciones con los mismos títulos que MUARH y LearnCode).
  - Inclusión de contenedores de imágenes con pies descriptivos en inglés (*captions*) preparados para la posterior incorporación de assets WebP.
  - Incorporación de las capturas de alta fidelidad (Home, Screen time, restricciones, snackbar de deshacer, horarios paso 1/2 y 2/2, estados de error) en WebP calidad 85 dentro de `assets/images/lumi/`, reutilizando `.improvement-row` y `.project-img-grid` sin CSS nuevo; los PNG fuente se eliminaron tras la conversión a WebP.
  - Coherencia de clases de maquetación (`.grid-12`, `.col-7` / `.col-5`, `.improvement-row`, `.overview-card`, `.insight-card`, `.tool-card`) y atribución de voz (*"we"* para pruebas Lofi en pareja, e *"I"* para refinamiento Hifi en Figma).
- **Optimización de Assets Gráficos para Lumi (`assets/images/lumi/`)**:
  - Conversión optimizada de `lumi.jpeg` (11.06 MB) a formato **WebP** (`lumi.webp`, 1.22 MB, reducción del 89.0% en el peso sin pérdida de calidad visual).
  - Vinculación de `assets/images/lumi/lumi.webp` en la portada del Hero de [`lumi.html`](lumi.html) y de `assets/images/lumi/lumi-card.webp` en la tarjeta de proyectos de la página de inicio [`index.html`](index.html). Posteriormente `lumi.webp` se reexportó a 2400×1350 (217 KB).

### 3. Refactorización (Fase 3): Robustez de JavaScript y Arquitectura Modular (`index.js`)
- **Despachador Centralizado de Scroll con `requestAnimationFrame`**:
  - Se unificaron los listeners de scroll (`initHeaderScroll` e `initScrollFade`) en un único controlador optimizado (`ScrollManager`) que previene el *layout thrashing* y sincroniza las transiciones visuales exactamente en el ciclo de repintado del navegador.
- **Gestión de Foco Determinista y Accesible (Eliminación de `setTimeout`)**:
  - Se reemplazó el temporizador arbitrario (`setTimeout(..., 150)`) por `window.requestAnimationFrame`, asegurando que el lector de pantalla reciba el foco inmediatamente después de que el navegador aplique los cambios de visibilidad en el DOM.
- **Renderizado Acotado de Lucide Icons**:
  - Se optimizó `IconManager` para recibir un elemento raíz opcional (`rootElement`), permitiendo que al alternar vistas únicamente se procesen los nodos de la vista recién activada, sin re-escanear todo el árbol del documento.
- **Arquitectura de Módulos Cohesivos**:
  - Reorganización total bajo el patrón de módulos (`IconManager`, `ThemeManager`, `NavigationManager`, `ScrollManager`), mejorando la mantenibilidad, legibilidad y aislamiento de responsabilidades.

### 4. Refactorización (Fase 2): Consolidación y Desduplicación CSS (DRY & CSS Moderno)
- **Consolidación de Sobrescrituras de Modo Oscuro con `:is()` ([`assets/css/styles.css`](assets/css/styles.css))**:
  - Se unificaron más de 70 líneas duplicadas de selectores Dark Mode (`.social-icon`, `.social-btn`, `.about-social-btn`, `.btn-secondary`, `.footer-bg-banner`, `.project-area`) mediante `:is([data-theme="dark"], :root:not([data-theme="light"]))`.
  - Se consolidaron las reglas de visibilidad de logo (`.logo-img-light` y `.logo-img-dark`) en un único bloque unificado.
- **Unificación de Media Queries Táctiles y Móviles**:
  - Se eliminó el bloque completo redundante de `@media (hover: none)` agrupando el overlay permanente de tarjetas de proyectos bajo `@media (max-width: 768px), (hover: none)`, reduciendo 45 líneas repetidas.
- **Estandarización de Selectores de Iconos en Botones**:
  - Se simplificaron las cadenas repetitivas de iconos (`svg`, `[data-lucide]`, `.lucide`, `i`) en variantes `.cv-download-btn` y `.btn-secondary` usando pseudoclases `:is()`.

### 5. Refactorización (Fase 1): Accesibilidad Semántica W3C en Vistas SPA y Normalización de Navegación
- **Eliminación de Conflicto ARIA en View Switcher ([`index.html`](index.html))**:
  - Se eliminaron los atributos `role="tabpanel"` y `aria-labelledby` de `<div id="view-work">` y `<div id="about">`, resolviendo la incompatibilidad con el patrón de navegación W3C (que utiliza enlaces `<a>` con `aria-current="page"` en vez de `role="tab"` dentro de `role="tablist"`).
- **Normalización de Estado Activo en Casos de Estudio**:
  - Se removió `class="active"` del enlace "Work" en [`muarh.html`](muarh.html) y [`learncode.html`](learncode.html), eliminando falsos positivos visuales y de accesibilidad al navegar dentro de proyectos específicos.
- **Homologación de Retrato en Vista SPA**:
  - En [`index.html`](index.html), se configuró `alt="Portrait of Evelyn Pulido"` en el retrato de la sección "About Me", homologándolo con `about.html`.

### 6. Refinamiento de Accesibilidad y Semántica HTML (WCAG 2.1 AA/AAA)
- **Homologación de Atributos `alt` en Mockups**:
  - En [`learncode.html`](learncode.html), se homologaron los mockups decorativos de cabecera (`learncode.webp`) y de tableta (`mockup-tablet-learncode.webp`) con `alt=""`, replicando el patrón de `muarh.html` y reservando descripciones semánticas detalladas exclusivamente para capturas de pantallas y flujos de interfaz funcionales.
- **Jerarquía Única de Encabezados (`<h1>`)**:
  - En [`about.html`](about.html) y [`coming-soon.html`](coming-soon.html), se sustituyó el elemento `<h1 class="logo-heading">` por `<p class="logo-heading">`, garantizando la existencia de un único encabezado principal `<h1>` por página (el título temático de cada vista).
- **Transferencia Confiable de Foco en Skip Links**:
  - Se añadió `tabindex="-1"` al contenedor `<main id="main-content">` en [`index.html`](index.html), [`about.html`](about.html) y [`coming-soon.html`](coming-soon.html).
  - En [`assets/css/styles.css`](assets/css/styles.css), se incorporó la regla `main:focus { outline: none; }` para asegurar que el salto del skip link transfiera el foco al flujo principal sin recuadros visuales sobre el contenedor padre, manteniendo `:focus-visible` intacto para todos los controles interactivos.

### 7. Optimización de Contraste en Modo Oscuro para `.project-area` (WCAG AAA)
- **Legibilidad Móvil y Táctil (`assets/css/styles.css`)**:
  - Se identificó que en pantallas táctiles y dispositivos móviles (`@media (hover: none)` y `<=768px`), el selector `.project-area` utilizaba `var(--color-accent-yellow)`. Dado que en modo oscuro este token posee baja opacidad (`rgba(255, 122, 69, 0.22)`), reducía drásticamente la legibilidad del texto sobre el fondo degradado oscuro de las tarjetas de proyectos.
  - Se definieron reglas explícitas bajo `[data-theme="dark"] .project-area` y `@media (prefers-color-scheme: dark)` asignando `color: var(--color-primary-hover);` (`#FFA07A`).
  - Esto proporciona un contraste de **8.22:1** sobre el fondo de las tarjetas, superando el requisito de 7:1 para WCAG 2.1 Nivel AAA.

### 8. Integración de Twitter Cards & Metadatos Sociales en `coming-soon.html`
- **Estandarización SEO y Open Graph**:
  - Incorporadas las etiquetas `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image` y `twitter:image:alt` en [`coming-soon.html`](coming-soon.html).
  - Homologadas las dimensiones Open Graph (`og:image:width: 1200`, `og:image:height: 630` y `og:image:alt`) sincronizadas con la URL canónica `https://evepulido.com/assets/images/og-cover.svg`.

### 9. Coherencia de Enlaces Sociales & Recurso de Retrato en "About Me"
- **Homologación de URLs Sociales en `README.md`**:
  - Se actualizaron los perfiles de LinkedIn (`https://www.linkedin.com/in/evepulido`) y Kaggle (`https://www.kaggle.com/evepulido`) para sincronizarlos con los utilizados en las interfaces HTML.
  - Sincronizado el árbol de directorios de `README.md` para reflejar con precisión los recursos dentro de `assets/images/`.
- **Integración de Recurso WebP para Retrato**:
  - Incorporado el archivo optimizado [`assets/images/image.webp`](assets/images/image.webp) (WebP a calidad 85, ratio 3.5:4), eliminando el error 404 en [`about.html`](about.html) y añadiendo el atributo semántico `alt="Portrait of Evelyn Pulido"`.

### 10. Reorganización y Centralización de Recursos Gráficos en `assets/images/`
- **Limpieza de la Raíz de `assets/`**:
  - Movidos los 6 recursos de identidad de marca (`Logo.svg`, `Logo-dark.svg`, `logo-simple.svg`, `logo.ico`, `og-cover.svg` y `footer.svg`) desde la raíz de `assets/` hacia su ubicación canónica en `assets/images/`.
  - La raíz de `assets/` queda 100% modular y limpia conteniendo únicamente subdirectorios (`css/`, `js/`, `docs/`, `images/`).
  - Actualizadas todas las referencias en [index.html](index.html), [about.html](about.html), [learncode.html](learncode.html), [muarh.html](muarh.html) y [coming-soon.html](coming-soon.html).
  - Documentación técnica sincronizada en [CONTEXT.md](CONTEXT.md) y `GEMINI.md` (archivo posteriormente eliminado; su función la cubren `CLAUDE.md` y `.agents/`).

### 11. Corrección de Dominio en Metadatos Open Graph y Twitter Cards
- **Estandarización de Dominio Canónico (`https://evepulido.com/`)**:
  - Actualización de las URLs absolutas en las etiquetas de previsualización social (`og:image` y `twitter:image`) en todas las páginas HTML ([index.html](index.html), [about.html](about.html), [learncode.html](learncode.html), [muarh.html](muarh.html), [coming-soon.html](coming-soon.html)).
  - Corrección de la discrepancia donde apuntaban al subdominio heredado `https://evepulido.github.io/`, alineándolo con [sitemap.xml](sitemap.xml) y [robots.txt](robots.txt).

### 12. Sistema Integral de Modo Oscuro (Dark Mode & Accesibilidad)
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

### 13. Integración y Activación del Currículum Vitae (CV)
- **Centralización en `assets/docs/`**:
  - Sustitución del archivo de marcador de posición (`607 bytes`) por el CV profesional actualizado en inglés (`CV_UXUI_EN.pdf` de `66 KB`), estandarizado como `assets/docs/CV_Evelyn_Pulido.pdf` (y conservando `CV_UXUI_EN.pdf` en la misma carpeta).
  - Eliminación de archivos temporales dispersos en la raíz de `assets/`.
- **Reactivación de Enlaces de Descarga**:
  - Habilitado el botón interactivo `.cv-download-btn` en la tarjeta flotante de contacto de [index.html](index.html) y en [about.html](about.html).
  - Configurado con atributo nativo `download`, icono accesible de Lucide (`download`) y texto accesible para lectores de pantalla.

### 14. Casos de Estudio: LearnCode & MUARH
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
  - Implementada navegación secuencial bidireccional entre casos de estudio: [muarh.html](muarh.html) enlaza hacia adelante con *"Next Project: LearnCode"* y [learncode.html](learncode.html) enlaza hacia atrás con *"Previous Project: MUARH"*, permitiendo recorrer los proyectos en cadena sin perder los accesos directos al inicio vía Breadcrumb y header.
- **Navegación Superior Accesible (Breadcrumb)**:
  - Transformado el subtítulo estático *"Featured Work"* del hero en ambos casos de estudio (`muarh.html` y `learncode.html`) en un enlace accesible estilo migaja de pan (`.hero-breadcrumb` con icono `chevron-left`), permitiendo volver de inmediato a la sección de proyectos (`index.html#work`) sin perder el enlace home del logo principal.

---

### 15. Optimización de Rendimiento & Gestión de Medios
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

### 16. Página de Inicio (`index.html`) & Arquitectura SPA
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

### 17. Página "About Me" (`about.html`)
- **Sección Hero & Botones Pill**:
  - Presentación personal con tipografía Parkinsans.
  - Fila de botones sociales en pastilla con bordes redondeados (`100px`) en color primario `#B33200`.
- **Tarjetas de Habilidades UX (UX Skills)**:
  - 6 áreas clave: *UX Foundations*, *Empathy & Ideation*, *Wireframing & Low-Fi*, *UX Research & Testing*, *Hi-Fi Designs & Figma*, *Dynamic Web UI*.
- **Educación Formal**:
  - Ficha destacando el grado de Ingeniería de Software en la Facultad de Telemática (Universidad de Colima, 2023–2027).

---

### 18. Componentes Globales, SEO & Accesibilidad
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

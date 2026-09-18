# Contexto del Proyecto: Portafolio de Evelyn Pulido

Este documento centraliza la arquitectura técnica, el sistema de diseño, los estándares de accesibilidad (WCAG) y el estado activo del desarrollo del portafolio personal.

> - **Instrucciones para el Agente**: [GEMINI.md](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/GEMINI.md) define las reglas operativas, invariantes de código y restricciones técnicas que el asistente de IA sigue de forma automática.
> - **Historial de Cambios**: [CHANGELOG.md](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/CHANGELOG.md) contiene el registro cronológico completo de hitos y refactorizaciones.

---

## 📌 Ficha Técnica

- **Propietaria**: Evelyn Pulido
- **Perfil Profesional**: Software Engineer & UX/UI Designer (Universidad de Colima, 2023–2027)
- **Filosofía**: *"Every experience begins by listening to people and improves through designing, testing, and learning with them."*
- **Stack Tecnológico**: HTML5 Semántico, CSS3 Vanilla (tokens y variables fluidas), JavaScript Vanilla modular (sin frameworks pesados), Lucide Icons.
- **Enfoque Principal**: Accesibilidad Web (W3C / WCAG 2.1 nivel AA/AAA), Diseño Fluido Responsive, UX Research empírico y rendimiento web óptimo.

---

## 📁 Arquitectura & Estructura de Archivos

```text
portafolio2/
├── assets/                          # Recursos estáticos centralizados
│   ├── css/
│   │   └── styles.css               # Hoja de estilos global y tokens fluidos
│   ├── js/
│   │   └── index.js                 # Lógica interactiva y controlador SPA
│   ├── docs/
│   │   └── CV_Evelyn_Pulido.pdf     # Currículum descargable
│   ├── images/                      # Medios optimizados en WebP
│   │   ├── icons/                   # Iconos vectoriales (github, linkedin, kaggle)
│   │   ├── muarh/                   # Recursos del caso de estudio MUARH
│   │   │   ├── admision.webp
│   │   │   ├── boton.webp
│   │   │   ├── fecha.webp
│   │   │   ├── menu.webp
│   │   │   ├── mockup-desktop.webp
│   │   │   ├── mockup-phone.webp
│   │   │   ├── mockup-tablet.webp
│   │   │   └── muarh.webp
│   │   └── learncode/               # Recursos del caso de estudio LearnCode
│   │       ├── learncode.webp
│   │       ├── mockup-tablet-learncode.webp
│   │       ├── learncode-home.webp
│   │       ├── learncode-courses.webp
│   │       ├── learncode-loader.webp
│   │       ├── learncode-confirm-modal.webp
│   │       └── learncode-form-usability.webp
│   ├── Logo.svg                     # Logo principal del encabezado
│   ├── logo-simple.svg              # Favicon SVG adaptativo a temas
│   ├── logo.ico                     # Favicon tradicional
│   ├── og-cover.svg                 # Portada social Open Graph
│   └── footer.svg                   # Banner de fondo decorativo del footer
├── index.html                       # Página de inicio (Hero, Featured Work, Tools, Contacto)
├── about.html                       # Página dedicada "About Me" (Bio, UX Skills, Educación)
├── muarh.html                       # Caso de estudio: Accesibilidad Web (MUARH)
├── learncode.html                   # Caso de estudio: UX Research & Usabilidad (LearnCode)
├── coming-soon.html                 # Plantilla estándar para proyectos en construcción
├── robots.txt                       # Directivas de indexación para buscadores
├── sitemap.xml                      # Mapa del sitio XML con prioridades
├── README.md                        # Presentación principal del repositorio en GitHub
├── GEMINI.md                        # Reglas operativas e invariantes para el agente IA (Estándar Google)
├── CHANGELOG.md                     # Historial cronológico de cambios y refactorizaciones
└── CONTEXT.md                       # Documentación técnica central del proyecto
```

---

## 🎨 Sistema de Diseño & Tokens CSS

| Token | Variable CSS | Valor | Aplicación en el Proyecto |
| :--- | :--- | :--- | :--- |
| **Primario** | `--color-primary` | `#B33200` | Títulos de sección, enlaces activos, foco `:focus-visible` y acentos |
| **Texto Principal** | `--color-text-main` | `#1E1E1E` | Cuerpo de texto, encabezados generales y navegación |
| **Texto Secundario** | `--color-text-secondary`| `#5E5E5E` | Subtítulos del hero, indicador de scroll y metadatos |
| **Fondo General** | `--color-bg` | `#FFFFFF` | Lienzo principal, header y tarjetas |
| **Acento Amarillo** | `--color-accent-yellow` | `#FFEABF` | Fondo en hover de chips de tecnología y sombra de tarjetas |
| **Borde Tarjetas** | `--color-card-border` | `#CCCCCC` | Contornos sutiles para tarjetas de herramientas y contacto |
| **Tipografía Hero** | `--font-heading` | `'Parkinsans', sans-serif` | Frase destacada del Hero y títulos grandes de sección |
| **Tipografía Base** | `--font-body` | `'Poppins', sans-serif` | Menú, párrafos, subtítulos, tarjetas y componentes de interfaz |

---

## 📐 Sistema de Rejilla Fluida (Grid de 12 Columnas)

- **Contenedor Principal**: `.container` con ancho máximo fluido `var(--container-max-width)` (1200px).
- **Márgenes Exteriores**: `--grid-margin` (`80px` en escritorio, `40px` en tablet y `20px` en móvil).
- **Separación entre Columnas (Gutter)**: `--grid-gutter: 24px` fluido con `clamp(1rem, 2vw, 1.5rem)`.
- **Clases de Amplitud**: `.col-1` a `.col-12` basadas en `grid-column: span N`.

### Regla Estándar para Casos de Estudio (`.improvement-row`)
Tanto en [learncode.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/learncode.html) como en [muarh.html](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/muarh.html), las filas de mejoras de la sección *"Final Design & Improvements"* se estructuran de forma idéntica y simétrica:
- **Columna de Texto**: `.col-7` (7 columnas, garantizando legibilidad y espacio amplio para viñetas).
- **Columna de Imágenes**: `.col-5` (5 columnas, idéntico al ancho de la tarjeta LearnCode en la página de inicio).
- **Cuadrícula Doble Móvil**: `.project-img-grid` dentro de `.col-5` para mostrar dos pantallas una al lado de la otra con bordes redondeados (`border-radius: clamp(18px, 2vw, 24px)`).

---

## 📄 Mapa de Páginas & Proyectos

### 1. Inicio (`index.html`)
- **Header Dinámico**: Logo con enlace principal. En scroll (`scrollY > 20px`), el padding se reduce de `2rem` a `0.75rem` y el logo de `120px` a `54px` sobre fondo traslúcido (`blur(14px)`).
- **Hero**: Frase de identidad profesional y botón de acción.
- **Scroll Indicator**: Animación acotada respetuosa con `prefers-reduced-motion` y salto suave a `#work`.
- **Featured Work (`#work`)**:
  - **Fila 1**: MUARH (`.col-7`) + LearnCode (`.col-5`).
  - **Fila 2**: Proyectos futuros en desarrollo (`.col-5` + `.col-7`).
  - Capa overlay al 90% con información del proyecto activable por cursor o foco de teclado.
- **Tools (`#tools`)**: Tarjetas de diseño, frontend, backend y herramientas con chips redondeadas.
- **Footer & Contacto**: Tarjeta flotante `.contact-card` sobre banner `footer.svg` con enlaces a correo y redes.

### 2. About Me (`about.html`)
- **Hero**: Presentación personal con botones redondeados en pastilla (Pill) en color primario.
- **UX Skills**: 6 tarjetas profesionales de competencias UX.
- **Education**: Ficha de Ingeniería de Software en la Universidad de Colima (2023–2027).

### 3. Caso de Estudio: MUARH (`muarh.html`)
- **Tema**: Accesibilidad Web para el Museo Universitario Alejandro Rangel Hidalgo (WCAG 2.1).
- **Estructura**: Overview, Desafíos, Estrategia de Diseño (flujo de 3 pasos), Resultados y Mejoras Finales (`.col-7` / `.col-5`).

### 4. Caso de Estudio: LearnCode (`learncode.html`)
- **Tema**: Plataforma educativa móvil con gamificación, UX Research y diseño de interfaz.
- **Estructura**: Overview, Desafíos, Investigación de 4 Etapas (flujo vertical `.dot-process-flow`), Resultados Empíricos (A1, A2, A3, A4), Prototipo Figma y Mejoras Finales (`.col-7` / `.col-5`).

### 5. Plantilla en Construcción (`coming-soon.html`)
- Página de trabajo en progreso accesible para proyectos futuros de la rejilla.

---

## ♿ Estándares de Accesibilidad & SEO

- **WCAG 2.1 AA / AAA**:
  - Enlace de salto inicial (*Skip Link*) `#main-content`.
  - Contrastes superiores a 4.5:1 (AA) en cuerpo y 7.8:1 (AAA) en tarjetas.
  - Indicadores de enfoque `:focus-visible` prominentes en todos los elementos interactivos.
  - Soporte de preferencias del sistema: `@media (prefers-reduced-motion)` y `@media (prefers-reduced-transparency)`.
  - Textos alternativos descriptivos en imágenes de interfaz; `alt=""` en elementos decorativos.
- **Optimización para Motores de Búsqueda (SEO)**:
  - Metaetiquetas Open Graph y Twitter Cards (`summary_large_image`) configuradas.
  - Archivos de rastreo [robots.txt](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/robots.txt) y [sitemap.xml](file:///C:/Users/evely/OneDrive/Desktop/portafolio2/sitemap.xml).
  - Favicon adaptativo automático según el tema claro/oscuro del navegador.

---

## 📋 Estado Actual & Próximos Pasos (Roadmap)

### Estado Actual:
- [x] Optimización de imágenes a WebP en todo el sitio (>85% de reducción de peso).
- [x] Casos de estudio completos para MUARH y LearnCode con coherencia visual simétrica (`.col-7` texto / `.col-5` imágenes).
- [x] Cuadrícula doble de capturas móviles integrada en el Pilar 1 de LearnCode.
- [x] Auditoría de textos alternativos (`alt`) y buenas prácticas de accesibilidad completada.

### Próximos Pasos Disponibles:
- [ ] Incorporar Proyectos 3 y 4 en la segunda fila de `#work` en la página de inicio.
- [ ] Añadir selector de idioma (inglés / español) si se requiere internacionalización dinámica.
- [ ] Pruebas finales de validación Lighthouse (Performance, Accessibility, Best Practices, SEO).

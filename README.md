# Museo Universitario Alejandro Rangel Hidalgo - Página Web

Este proyecto es una página web de una sola página para el **Museo Universitario Alejandro Rangel Hidalgo**, desarrollada como parte de un trabajo académico para la materia de **Accesibilidad de Contenidos**.

El objetivo principal fue crear una interfaz visualmente atractiva, moderna y, sobre todo, accesible, que permita a todos los usuarios, incluyendo aquellos que utilizan tecnologías de asistencia, explorar las colecciones y planificar su visita al museo.

![imagenes/pagina.png](Pantalla principal)

---

## ✨ Características Principales

*   **Diseño Responsivo:** La página se adapta a diferentes tamaños de pantalla, desde móviles hasta computadoras de escritorio.
*   **Navegación Fija (Sticky):** La barra de navegación principal permanece visible al hacer scroll para un acceso rápido a las diferentes secciones.
*   **Galería Interactiva:** Una sección de "Colecciones" con tarjetas que muestran información al pasar el cursor y abren una ventana modal con detalles al hacer clic.
*   **Tabla de Información:** Una tabla clara y accesible con los precios y horarios de las salas de exhibición.
*   **Formulario de Reserva:** Un formulario funcional para que los usuarios puedan planificar y reservar su visita.

## ♿ Foco en Accesibilidad

Se implementaron diversas técnicas para asegurar que el sitio cumpla con los estándares de accesibilidad web:

*   **Estructura Semántica:** Uso correcto de etiquetas HTML5 (`<header>`, `<nav>`, `<main>`, `<footer>`, `<table>`) para dar un significado claro al contenido.
*   **Jerarquía de Encabezados:** Se corrigió la estructura lógica de encabezados (`h1`, `h2`, `h3`) para permitir una navegación fluida y coherente a través de lectores de pantalla. Esto incluyó el uso de un encabezado `h2` visualmente oculto en el pie de página para anidar correctamente el contenido final.
*   **Navegación por Teclado:** Todos los elementos interactivos (enlaces, botones, tarjetas) son completamente accesibles usando la tecla `Tab` y cuentan con indicadores de foco claros y visibles.
*   **Atributos ARIA:** Se utilizaron atributos como `role="button"` y `aria-label` para mejorar la experiencia de los usuarios de lectores de pantalla, especialmente en componentes interactivos como las tarjetas de la galería, asegurando que cada acción sea anunciada correctamente.
*   **Alternativas para Imágenes:** Se prestó atención a los textos alternativos y a los contextos donde las imágenes son decorativas o informativas.

## 🚀 Tecnologías Utilizadas

*   **HTML5:** Para la estructura y el contenido semántico.
*   **CSS3:** Para el diseño, la maquetación y las animaciones. Se utilizaron características modernas como **Custom Properties (Variables CSS)**, **Flexbox** y **Grid Layout**.
*   **JavaScript:** Para la interactividad, como la funcionalidad de la ventana modal y la validación del formulario.

## 💻 Uso

Para ver el proyecto, simplemente clona este repositorio y abre el archivo `index.html` en tu navegador web de preferencia.

```bash
# Si tienes git, puedes clonarlo así:
git clone https://github.com/EvePulido/evepulido.github.io.git
cd nombre-de-la-carpeta
# Luego, abre el archivo index.html en el navegador.
```

---

**Autora:**

*Evelyn Pulido* 
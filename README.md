# Evelyn Pulido — UX/UI & Software Engineering Portfolio

> *"Every experience begins by listening to people and improves through designing, testing, and learning with them."*

Welcome to the official repository of my personal portfolio. This project showcases my work as a **Software Engineer & UX/UI Designer**, highlighting real-world applications of user-centered design, empirical UX research, front-end architecture, and strict web accessibility standards (WCAG 2.1 AA/AAA).

---

## 🚀 Featured Case Studies

### 1. [Museo Universitario Alejandro Rangel Hidalgo (MUARH)](muarh.html)
* **Focus**: Web Accessibility (W3C / WCAG 2.1 AA/AAA), Inclusive Design & Front-End Engineering.
* **Overview**: A responsive, accessible platform designed to allow visitors to explore the museum's exhibition halls, consult essential visitor information, and book visits online.
* **Highlights**: Rigorous keyboard navigation order, screen reader feedback with live region announcements, high contrast compliance, and live deployment.

### 2. [LearnCode — Educational Platform](learncode.html)
* **Focus**: UX Research, Information Architecture, Gamification & Usability Evaluation.
* **Overview**: A gamified mobile learning ecosystem designed to teach programming through interactive lessons, community exchange, streak tracking, and verifiable certificates.
* **Highlights**: Formulated across 4 empirical research methodologies: Ethnographic User Journeys (A1), Hybrid Card Sorting (A2), Tree Testing (A3), and Nielsen's Heuristic Evaluation (A4).

---

## 🛠️ Core Tech Stack & Architectural Principles

This portfolio is deliberately crafted without heavy third-party UI frameworks (such as Bootstrap, Tailwind, or React) to guarantee maximum performance, semantic clarity, and absolute control over accessibility:

* **Semantic HTML5**: Native landmark elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) ensuring zero barrier for assistive technologies.
* **Vanilla CSS3 & Fluid Design Tokens**:
  - 12-column responsive fluid grid (`.grid-12`, `.col-7`, `.col-5`).
  - Fluid typography and spacing using CSS `clamp()`.
  - Color contrast ratios exceeding 4.5:1 (AA) and 7.8:1 (AAA).
  - Respect for user system preferences: `@media (prefers-reduced-motion)` and `@media (prefers-reduced-transparency)`.
* **Modular Vanilla JavaScript (ES6+)**:
  - Accessible Single Page Application (SPA) view switcher.
  - Programmatic focus transmission (`heading.focus()`) and history synchronization (`popstate`).
  - Dynamic translucent navigation header with scroll detection.
* **Performance & Asset Optimization**:
  - 100% modern WebP raster images (quality 85) achieving over 85% bandwidth reduction.
  - Scalable vector icons via Lucide Icons.

---

## 📂 Project Structure

```text
portafolio2/
├── assets/
│   ├── css/styles.css           # Global fluid design tokens & layout
│   ├── js/index.js              # Accessible DOM & view-switching logic
│   ├── docs/CV_Evelyn_Pulido.pdf# Downloadable resume
│   ├── images/
│   │   ├── icons/               # Vector social icons
│   │   ├── muarh/               # Optimized WebP assets for MUARH case study
│   │   └── learncode/           # Optimized WebP assets for LearnCode case study
│   ├── Logo.svg, logo-simple.svg, footer.svg
├── index.html                   # Homepage (Hero, Featured Work, Tools, Contact)
├── about.html                   # About Me (Bio, UX Skills, Education)
├── muarh.html                   # Case Study: MUARH (Web Accessibility)
├── learncode.html               # Case Study: LearnCode (UX Research & Usability)
├── coming-soon.html             # Accessible placeholder template for upcoming work
├── robots.txt, sitemap.xml      # SEO crawling rules and URL sitemap
├── README.md                    # Primary repository overview (this file)
├── CONTEXT.md                   # In-depth technical architecture documentation
├── CHANGELOG.md                 # Chronological development and refactoring history
└── GEMINI.md                    # Google Agent pair-programming instructions & invariants
```

---

## 📖 Extended Documentation

* **[CONTEXT.md](CONTEXT.md)**: Detailed technical specifications, CSS token tables, fluid grid math, and active project roadmap.
* **[CHANGELOG.md](CHANGELOG.md)**: Full chronological record of development milestones, iterations, and optimizations.
* **[GEMINI.md](GEMINI.md)**: AI agent instructions following Google Antigravity / Gemini CLI best practices for automated pair programming.

---

## 💻 Running the Project Locally

No package managers or build steps required. You can serve the repository using any local HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```

Then open `http://localhost:8000` in your web browser.

---

## 📬 Contact & Connect

* **Author**: Evelyn Pulido
* **Education**: Software Engineering — Facultad de Telemática, Universidad de Colima (2023–2027)
* **LinkedIn**: [linkedin.com/in/evelyn-pulido-mendez](https://www.linkedin.com/in/evelyn-pulido-mendez)
* **GitHub**: [github.com/EvePulido](https://github.com/EvePulido)
* **Kaggle**: [kaggle.com/evelynpulido](https://www.kaggle.com/evelynpulido)

---

&copy; Evelyn Pulido. All rights reserved.

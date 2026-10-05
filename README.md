# Evelyn Pulido — UX/UI & Software Engineering Portfolio

> *"Every experience begins by listening to people and improves through designing, testing, and learning with them."*

Welcome to the official repository of my personal portfolio. This project showcases my work as a **Software Engineer & UX/UI Designer**, highlighting real-world applications of user-centered design, empirical UX research, front-end architecture, and strict web accessibility standards (WCAG 2.1 AA/AAA).

---

## 🚀 Case Studies

### 1. [Museo Universitario Alejandro Rangel Hidalgo (MUARH)](muarh.html)
* **Focus**: Web Accessibility (W3C / WCAG 2.1 AA/AAA), Inclusive Design & Front-End Engineering.
* **Overview**: A responsive, accessible platform designed to allow visitors to explore the museum's exhibition halls, consult essential visitor information, and book visits online.
* **Highlights**: Rigorous keyboard navigation order, screen reader feedback with live region announcements, high contrast compliance, and live deployment.

### 2. [LearnCode — Educational Platform](learncode.html)
* **Focus**: UX Research, Information Architecture, Gamification & Usability Evaluation.
* **Overview**: A gamified mobile learning ecosystem designed to teach programming through interactive lessons, community exchange, streak tracking, and verifiable certificates.
* **Highlights**: Formulated across 4 empirical research methodologies: Ethnographic User Journeys (A1), Hybrid Card Sorting (A2), Tree Testing (A3), and Nielsen's Heuristic Evaluation (A4).

### 3. [Lumi — Parental Control App](lumi.html)
* **Focus**: UX Research (moderated usability testing with parents) & High-Fidelity UI Design.
* **Overview**: A parental control app prototype to manage children's screen time, app restrictions and schedules.
* **Highlights**: Low-fidelity usability sessions with three parents, followed by a high-fidelity Figma design that addresses each observed friction point.

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
  - Scalable vector icons via Lucide Icons (pinned to `1.52.0` via unpkg with SRI `sha384` and `crossorigin="anonymous"`).

---

## 📂 Project Structure

```text
portafolio2/
├── assets/
│   ├── css/styles.css           # Global fluid design tokens & layout
│   ├── js/index.js              # Accessible DOM & view-switching logic
│   ├── docs/                    # Downloadable resumes
│   │   ├── CV_Evelyn_Pulido.pdf
│   │   └── CV_UXUI_EN.pdf
│   └── images/
│       ├── Logo.svg, Logo-dark.svg, logo-simple.svg, logo.ico, og-cover.svg, og-cover.png, footer.svg, image.webp
│       ├── icons/               # Vector social icons
│       ├── muarh/               # Optimized WebP assets for MUARH case study
│       ├── learncode/           # Optimized WebP assets for LearnCode case study
│       └── lumi/                # Optimized WebP assets for Lumi case study
├── index.html                   # Homepage (Hero, Case Studies, Tools, Contact)
├── about.html                   # About Me (Bio, UX Skills, Education)
├── muarh.html                   # Case Study: MUARH (Web Accessibility)
├── learncode.html               # Case Study: LearnCode (UX Research & Usability)
├── lumi.html                    # Case Study: Lumi (Parental Control App UX Research)
├── coming-soon.html             # Accessible placeholder template for upcoming work
├── robots.txt, sitemap.xml      # SEO crawling rules and URL sitemap
├── README.md                    # Primary repository overview (this file)
├── CONTEXT.md                   # Pointer to .agents/context.md
├── CLAUDE.md                    # Pointer to the .agents/ configuration for AI agents
├── CHANGELOG.md                 # Chronological development and refactoring history
└── .agents/                     # Agent rules, technical context, editorial guide, per-case-study notes
    ├── context.md, claude.md, consistencia-redaccion.md
    └── mejoras/                 # muarh-mejoras.md, learncode-mejoras.md, lumi-case-study.md
```

---

## 📖 Extended Documentation

* **[.agents/context.md](.agents/context.md)**: Detailed technical specifications, CSS token tables, fluid grid math, and page map (`CONTEXT.md` points here).
* **[CHANGELOG.md](CHANGELOG.md)**: Full chronological record of development milestones, iterations, and optimizations.
* **[CLAUDE.md](CLAUDE.md)** / **[.agents/claude.md](.agents/claude.md)**: AI agent instructions and invariants for automated pair programming.

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
* **LinkedIn**: [linkedin.com/in/evepulido](https://www.linkedin.com/in/evepulido)
* **GitHub**: [github.com/EvePulido](https://github.com/EvePulido)
* **Kaggle**: [kaggle.com/evepulido](https://www.kaggle.com/evepulido)

---

&copy; Evelyn Pulido. All rights reserved.

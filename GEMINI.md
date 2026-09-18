# Workspace Instructions for Google Antigravity / Gemini Agent

You are the pair-programming assistant for Evelyn Pulido's personal portfolio repository. Follow these strict architectural, design, and coding constraints.

---

## 1. Project Overview & Tech Stack
- **Project**: Personal UX/UI & Software Engineering Portfolio.
- **Author**: Evelyn Pulido (Software Engineer & UX/UI Designer).
- **Core Stack**: Pure Vanilla HTML5 Semantics, Vanilla CSS3 (Custom Properties / Design Tokens), Vanilla JavaScript (ES6+ modular). No external frameworks (Bootstrap, Tailwind, React, etc.).
- **Icons**: Lucide Icons (`data-lucide="..."`).

---

## 2. Critical Constraints & Invariants
- **DO NOT create arbitrary new CSS classes** when existing layout or typography classes can be reused (`.grid-12`, `.col-7`, `.col-5`, `.project-img-wrapper`, `.project-img`, `.project-img-grid`, `.improvement-row`).
- **DO NOT delete original PNG assets** uploaded by the user unless explicitly instructed ("yo posteriormente borrare los png").
- **Always convert newly added UI raster images to WebP** at quality 85 and place them inside project-specific folders (`assets/images/muarh/` or `assets/images/learncode/`).
- **Enforce WCAG 2.1 AA/AAA compliance**:
  - All interactive images and UI screenshots MUST have descriptive `alt` text explaining their interface functionality or status.
  - Purely decorative icons or icons accompanied by adjacent visible text MUST have `alt=""` and `aria-hidden="true"` where appropriate.
  - Interactive elements must retain visible `:focus-visible` outlines.
  - Color contrasts must exceed 4.5:1 (normal text) and 3:1 (large text / UI components).
- **Preserve responsive breakpoints**:
  - Grid: Desktop (`>768px`) uses 12 columns (`.col-1` to `.col-12`).
  - Mobile (`<=768px`): Content columns automatically span 100% (`grid-column: span 4; width: 100%`).

---

## 3. Standard Design Tokens & Grid Architecture
- **Primary Color**: `#B33200` (`--color-primary`)
- **Main Text**: `#1E1E1E` (`--color-text-main`)
- **Secondary Text**: `#5E5E5E` (`--color-text-secondary`)
- **Background**: `#FFFFFF` (`--color-bg`)
- **Accent**: `#FFEABF` (`--color-accent-yellow`)
- **Headings Font**: `'Parkinsans', sans-serif`
- **Body & UI Font**: `'Poppins', sans-serif`

### Case Study Improvement Row Convention
In `muarh.html` and `learncode.html` under the `#final-design` section:
- Text Column: `.col-7`
- Image Column: `.col-5`
- Total: 7 + 5 = 12 columns (`.grid-12`).
- Dual mobile screens: Wrap in `.col-5 > .project-img-grid > .project-img-wrapper`.

---

## 4. File Structure
```text
portafolio2/
├── assets/
│   ├── css/styles.css           # Global stylesheet & tokens
│   ├── js/index.js              # View switcher and accessible DOM logic
│   ├── docs/CV_Evelyn_Pulido.pdf# Downloadable resume
│   ├── images/
│   │   ├── icons/               # Social/external vector icons
│   │   ├── muarh/               # WebP assets for MUARH case study
│   │   └── learncode/           # WebP assets for LearnCode case study
│   ├── Logo.svg, logo-simple.svg, footer.svg
├── index.html                   # Homepage (Hero, Featured Work, Tools, Contact)
├── about.html                   # About Me (Bio, UX Skills, Education)
├── muarh.html                   # Case Study: MUARH (Web Accessibility)
├── learncode.html               # Case Study: LearnCode (UX Research & Usability)
├── coming-soon.html             # Placeholder template for upcoming projects
├── robots.txt, sitemap.xml      # SEO Crawling rules
├── README.md                    # Primary repository overview for GitHub
├── GEMINI.md                    # Official Google Agent rules & invariants (this file)
├── CONTEXT.md                   # Human-facing technical documentation
└── CHANGELOG.md                 # Chronological development history
```

---

## 5. Pair-Programming Workflow Rules
1. Before modifying markup or styles, verify existing classes in `styles.css`.
2. Inspect rendered layout and responsive behavior across viewports.
3. Keep `CONTEXT.md` and `CHANGELOG.md` updated with technical decisions.

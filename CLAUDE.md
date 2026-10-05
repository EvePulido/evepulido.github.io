# Workspace Instructions for AI Coding Assistants

This repository uses a standardized `.agents/` configuration directory for all AI agent instructions, context, editorial standards, and project improvements.

- 🤖 **Agent Rules & Invariants**: [.agents/claude.md](.agents/claude.md)
- 📘 **Technical Context & Architecture**: [.agents/context.md](.agents/context.md)
- ✍️ **Editorial Consistency Guidelines**: [.agents/consistencia-redaccion.md](.agents/consistencia-redaccion.md)
- 📂 **Case Study Improvement Guides**: [.agents/mejoras/](.agents/mejoras/)

---

## Key Invariants Summary

1. **CSS Reusability**: Do not create duplicate CSS classes; reuse `.grid-12`, `.col-7`, `.col-5`, `.improvement-row`, `.project-img-grid`.
2. **WebP Assets**: Convert new UI raster images to WebP (quality 85) in `assets/images/<project>/`. Once converted, delete the source PNG (PNGs are not kept in the repo). Exception: `assets/images/og-cover.png` (1200×630) stays as PNG because social crawlers do not read WebP or SVG.
3. **WCAG 2.1 AA/AAA**: Maintain high contrast (>4.5:1), visible `:focus-visible` outlines, descriptive `alt` for UI screenshots, `alt=""` for decoratives.
4. **Project Naming**: Use **Case Studies** instead of "Featured Work".
5. **Perspective**: "I" for personal contributions, "we" for team testing/research.

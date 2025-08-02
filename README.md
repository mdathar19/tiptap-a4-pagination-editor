# Tiptap A4 Pagination Editor

This project is a prototype editor built using **React** and **Tiptap**, designed specifically for legal document workflows with A4-style page formatting.

## 🧩 Features

- 📄 **A4 Page View**: Visually paginated editor to match A4 paper size.
- ↕️ **Page Breaks**: Supports automatic and manual page breaks based on content height.
- 🧾 **Headers & Footers**: Per-page headers and footers with dynamic page numbers.
- 🖨️ **Print-Ready**: Layout survives printing/export, suitable for legal documentation.

## 🚧 Constraints & Trade-offs

- CSS-based pagination is approximate due to browser rendering limitations.
- Content flow management is handled by monitoring block height (not perfect but acceptable for MVP).
- Using `@react-pdf/renderer` was considered but dropped due to lack of rich text editing.
- Footers are positioned absolutely per-page instead of being editor-aware (limitation of DOM control).

## 🛠️ How I'd Productionise It

- Use virtual DOM splitting for server-rendered PDF exports.
- Build a page-aware layout engine or use canvas/WebGL to avoid browser rendering quirks.
- Add full schema validation for legal templates (e.g., auto-sectioning, clause tracking).
- Optimize for print styles and support auto-saving versions.

## 🧪 Tech Stack

- React 18+
- Tiptap v2 (Editor Framework)
- TailwindCSS (for styling)
- TypeScript

## 🧰 Scripts

```bash
npm install
npm run dev

# AXIOM Project: Master Strategy & Design System (Final v2.1)

## 1. Brand Identity & Persona
- **Brand Identity:** High-end Beauty Tech & Data-driven Skincare.
- **Persona:** Senior Researcher at "AXIOM Laboratory". 
- **Tone & Manner:** Absolute luxury, professional, cold but precise. 
- **Language Policy:** - Use the highest level of Korean honorifics (~합니다, ~로 분석됩니다, ~를 제안합니다).
    - **Forbidden:** Informal tones (~해요, ~군요), emojis, generic icons.

## 2. Design System & Margin Rules (NON-NEGOTIABLE)
- **Margin & Container:** - All main contents MUST be wrapped in `max-w-7xl mx-auto px-6`.
    - NEVER break the horizontal margin.
- **Section Spacing:** Use deep vertical margins (`py-32`, `mb-40`) to maintain a "Gallery" and "Research Report" atmosphere.
- **Typography:**
    - English/Major Titles: `font-serif` (Playfair Display) -> luxury.
    - Korean/Body Text: `font-sans` (Pretendard) -> technical precision.
    - Labels/Data Points: `font-mono` (ui-monospace) -> raw data feel.
    - Leading: `leading-title (1.3)`, `leading-body (1.2)`.

## 3. Harness Engineering & Token Management
- **Efficient Wiring:** Apply 'Harness Engineering' principles. Organize data flow between components like a high-performance wire harness—clean, structured, and no redundant overlaps.
- **Lean Props:** Keep component props lean. Use shared data files (`axiomData.js`, `productsData.js`) as the "Source of Truth" instead of passing massive objects through multiple layers.
- **Token Optimization:** Avoid repeating long logic blocks. If a function or UI pattern is reused, abstract it into a utility or a sub-component. 
- **Code Integrity:** When modifying a file, preserve all existing "wiring" (Prisma DB logic, Auth, 3D Canvas setups) unless explicitly asked to remove.

## 4. Core File Map
- `tailwind.config.js`: Master spec for fonts, leading, and colors.
- `index.js`: Backend logic. Gemini prompt (gemini-1.5-pro) must maintain the "Senior Researcher" persona.
- `src/pages/Analysis.jsx`: Restore the 3D blob and keep demographics (Male/Female ONLY). 
- `src/pages/MySpacePage.jsx`: 3D model config: `scale: 4.8`, `rotation: [0, Math.PI, 0]`.
- `src/data/axiomData.js`: Maps 20 detailed skin types to data-driven solutions.

## 5. Operational Rules for Claude
- **Strict Margins:** If a layout feels cramped, it is WRONG. Add whitespace.
- **No Emojis/Icons:** Use thin lines (#222, #333) and font-mono for hierarchy.
- **Result Page Hierarchy:** Split content into [Official Data Analysis] and [AXIOM AI Prescription] with distinct visual styles.
- **Data Safety:** Never delete Prisma logic or survey submission endpoints during refactoring.
# DESIGN.md — Bashix Engineering Platform Design Direction

## 1. Brand Identity & Product Scope
- **Name:** Bashix (`bashix.id`)
- **Core Offering:** Mission-critical industrial IoT hardware, edge compute nodes, embedded firmware, and distributed telemetry platforms.
- **Personality:** Tangible engineering craftsmanship, calm editorial elegance, monolithic precision. Natural and organic modernism inspired by technical architectural journals.
- **Tone:** Authoritative, direct, grounded, evidence-driven. Zero generic AI marketing hype.

---

## 2. Antislop Dials
- **ENERGY:** 2 (Warm, calm, editorial authority with generous whitespace and intentional focal points)
- **RHYTHM:** 3 (Dynamic section rhythm: expansive hero with pure visual device render, 4-column engineering capabilities, asymmetric systems showcase, comparison matrix, field verification testimonial, 3-step deployment workflow)
- **MOTION:** 2 (Smooth frosted glass hover interactions, modal focus transitions, zero distracting loops)

---

## 3. Color Palette: Organic Earth & Clean Studio (Figma Standards)
- **Background Primary:** `#FAFAF8` (Warm soft natural off-white background)
- **Surface Crisp:** `#FFFFFF` (Clean white cards and tablet UI surfaces)
- **Surface Accent / Sage Light:** `#D4DEC5` (Soft sage for hero backdrop and secondary buttons)
- **Surface Accent / Sage Tint:** `#ECEEE8` (Light neutral for table rows and subtle dividers)
- **Borders:** `#E2E6DC` (Hairline organic slate/sage border)
- **Text Primary:** `#181B15` (Deep warm charcoal / near black)
- **Text Secondary:** `#4A4E44` (Crisp mid-tone natural slate)
- **Text Muted / Accent:** `#55623B` (Earthy olive green labels, section categories, metadata)
- **Primary CTA Buttons:** `#364121` (Deep solid olive green with white text, pill radius)
- **Secondary CTA Buttons:** `#D4DEC5` (Soft sage pill with `#181B15` text)

---

## 4. Typography
- **Headings & Display:** `Newsreader` / Serif (Editorial high-contrast serif with refined authority)
- **Body & UI Text:** `Inter` (Standard for high legibility at 14px to 16px)
- **Metadata, Numbers & Steps:** `JetBrains Mono` (Crisp, proportional technical numerals)

---

## 5. Anti-Slop Implementation
1. **Zero Em Dashes (R-02):** No em dash character (`—`) in any UI text.
2. **Real Technical Specifications (R-17 & R-36):** Operating voltages (9-36V DC), temperature ratings (-40°C to +85°C), galvanic isolation (2.5kV), Dual TSN GbE.
3. **Hero Visual Paradigm:** Dedicated single high-resolution device mockup image under the headline rather than overly complex domestic UI components.
4. **Interactive Verification (R-26):** All buttons and navigation anchors perform real actions (smooth scrolling, technical consultation booking, architectural datasheet modal).
5. **Mobile Reflow (R-03):** 3-tier responsiveness corresponding to Figma's Desktop (`1280+`), Tablet (`800–1279`), and Mobile (`1–799`) frames.
6. **Accessibility & Contrast (R-25 & R-32):** WCAG AA 4.5:1 text contrast, visible `:focus-visible` outlines, and full keyboard operability.

---

## 6. Layout Rhythm & Spacing Refinement
- **Container Sizing:** Standardized across all sections to `max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8` to match Figma's live site bounds (`~1200px`) and prevent excessive horizontal gutters.
- **Vertical Spacing:** Reduced excessive gaps from `py-20..py-36` down to snug `py-10 md:py-16` across sections, matching the live Figma reference layout.
- **Section Margins:** Reduced dead space between section headlines, content grids, and imagery from 64-96px down to 24-48px.
- **Curated Engineering Imagery:**
  - Hero Display: High-resolution telemetry tablet displaying real-time bus metrics and oscilloscope waveforms on sage backing.
  - Big Picture Panorama: Modern advanced robotics and industrial engineering research laboratory.
  - Hardware Sculpture: CNC-machined anodized aluminum edge compute module with passive heatsink fins on architectural travertine pedestal.
  - Testimonial Artifact: Kinetic gimbal gyroscope mechanism symbolizing precision tolerance and physical stability.
  - Infrastructure Banner: Clean offshore energy telemetry and wind array landscape in serene morning mist.


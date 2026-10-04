# DESIGN.md — Bashix Engineering Platform Design Direction

## 1. Brand Identity & Product Scope
- **Name:** Bashix (`bashix.id`)
- **Location:** Jakarta, Indonesia
- **Core Offering:** Turnkey physical industrial IoT hardware, edge compute units, sensor nodes, and custom electronic engineering services.
- **Personality:** Tangible industrial craftsmanship, rugged technical reliability, honest engineering specs.
- **Tone:** Professional, direct, grounded, evidence-driven. Zero generic AI marketing hype.

---

## 2. Antislop Dials
- **ENERGY:** 3 (Clear technical hierarchy, high-contrast typography, distinct functional sections)
- **RHYTHM:** 3 (Varied density: technical spec sheets, interactive hardware schematics, tactile product catalog)
- **MOTION:** 2 (Crisp functional feedback: modal transitions, cart drawer slide, tab switches; no distracting particle storms or full-page glow animations)

---

## 3. Color Palette & Craft Standards
- **Background Primary:** `#090D12` (Cold deep slate)
- **Surface Panels:** `#121822` (Industrial steel card surface)
- **Surface Raised:** `#1A2230` (Interactive card hover & modal surface)
- **Borders:** `#263245` (Tactile 1px structural borders, minimum 3:1 contrast against background)
- **Text Primary:** `#F8FAFC` (13:1 contrast on `#090D12`, exceeds WCAG AA 4.5:1)
- **Text Secondary:** `#94A3B8` (5.2:1 contrast on `#090D12`, exceeds WCAG AA 4.5:1)
- **Accent Technical:** `#0284C7` (Sky blue precision accent for active controls and links)
- **Accent Telemetry / Amber:** `#F59E0B` (Hardware power, GPIO, and warning indicators)
- **Accent Hardware Green:** `#10B981` (In-stock and operational status)

---

## 4. Typography
- **Technical Headings:** `Space Grotesk` (Geometric, clean technical authority)
- **Interface & Body:** `Inter` (Standard for high legibility at 14px to 16px)
- **Hardware Pinouts, SKUs & Code:** `JetBrains Mono` (High-contrast monospace for pin designations and terminal wiring)

---

## 5. Anti-Slop Guidelines (Explicit Revisions)
1. **No Em Dashes (R-02):** Zero em dashes (`—`) in copy. Use periods, colons, or commas.
2. **No Fake Statistics (R-17 & R-36):** Remove invented stats ("99.999% SLA", "10M+ packets", "12,400 units"). Replace with real technical specifications: operating voltages (9-36V DC), temperature ratings (-40°C to +85°C), processor clock speeds, and memory configurations.
3. **No Fake Terminal Window (R-08 & R-10):** Replace the fake typed-out terminal in the hero with an interactive **Hardware Port & Schematic Viewer** (inspect real I/O: Gigabit Ethernet, RS-485 Modbus, CAN-FD, Power terminal).
4. **No Gratuitous Blur Blobs (R-01 & R-07):** Remove full-page neon cyan/violet blur orbs. Use clean, solid, dark industrial slate surfaces.
5. **No Decorative Button Arrows (R-15):** Buttons state clear functional verbs ("View Specifications", "Add to Cart", "Contact Engineering").
6. **No Capsule Eyebrow Badges (R-11):** Remove the capsule badge parked directly above H1.
7. **No Unverified Trust Badges (R-36):** Remove fake compliance badges. Show actual hardware form factors (DIN Rail EN 50022, IP67 sealed, M.2 2280).
8. **Real Navigation (R-24 & R-26):** Every link in the header anchors to a real, rendered section.

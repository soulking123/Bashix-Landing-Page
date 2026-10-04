# DESIGN.md — Bashix Engineering Platform Design Direction

## 1. Brand Identity & Product Scope
- **Name:** Bashix (`bashix.id`)
- **Location:** Jakarta, Indonesia
- **Core Offering:** Turnkey physical industrial IoT hardware, edge compute units, sensor nodes, and custom electronic engineering services.
- **Personality:** Tangible industrial craftsmanship, rugged technical reliability, monolithic engineering scale. Inspired by cinematic industrial engineering (Simon Stålenhag, Denis Villeneuve, Keyence, and Framework).
- **Tone:** Professional, direct, grounded, evidence-driven. Zero generic AI marketing hype.

---

## 2. Antislop Dials
- **ENERGY:** 3 (High-contrast cinematic atmosphere, strong typography, focused composition)
- **RHYTHM:** 3 (Spacious atmospheric hero transitioning into tactile technical specification grids)
- **MOTION:** 2 (Smooth frosted glass hover interactions, copy feedback; no distracting particle storms)

---

## 3. Color Palette: Cinematic Dusk & Industrial Monolith
- **Background Primary:** `#0B0D11` (Deep dusk charcoal carbon)
- **Surface Panels:** `#141820` (Machined titanium dark card surface)
- **Surface Raised / Active:** `#1C222E` (Interactive card hover & active tabs)
- **Borders:** `#27303E` (Crisp structural hairline borders)
- **Border Active:** `#D94826` / `#F59E0B` (Warm dusk amber & forge accents)
- **Text Primary:** `#FFFFFF` (Crisp white over cinematic backdrop)
- **Text Secondary:** `#CBD5E1` (Legible silver slate)
- **Text Muted:** `#78889B` (Technical annotations and metadata)
- **Hero Artwork:** Full-bleed cinematic painting of a heavy industrial telemetry installation on a mountain peak at crimson dusk (`/images/bashix-hero.jpg`).
- **Pricing Currency:** 100% Indonesian Rupiah (IDR / Rp) exclusively. No USD currency toggle.

---

## 4. Typography
- **Headings:** `Space Grotesk` (Geometric, clean technical authority)
- **Interface & Body:** `Inter` (Standard for high legibility at 14px to 16px)
- **Command Pill, SKUs & Pinouts:** `JetBrains Mono` (High-contrast monospace)

---

## 5. Anti-Slop Guidelines (Explicit Revisions)
1. **No Em Dashes (R-02):** Zero em dashes (`—`) in copy.
2. **No Fake Statistics (R-17 & R-36):** Real technical specifications only: operating voltages (9-36V DC), temperature ratings (-40°C to +85°C), processor clock speeds, and memory configurations.
3. **No Fake Terminal Window (R-08 & R-10):** Replaced with a single tactile frosted command pill (`curl -sSL https://bashix.id/init | sh`) directly centered in the cinematic composition.
4. **No Gratuitous Blur Blobs (R-01 & R-07):** Hero is powered by real, evocative, full-bleed artwork rather than empty space with random CSS blur circles.
5. **No Decorative Button Arrows (R-15):** Buttons state clear functional verbs.
6. **No Capsule Eyebrow Badges (R-11):** Clean typography directly over the atmosphere.
7. **Transparent Floating Navigation (R-24):** Clean floating header with `/bashix` wordmark that allows the atmospheric sky to reach the top of the viewport.

---

## 6. Architecture & Showcase Matrix (Booster Robotics + Bambu Lab + DJI)
Inspired directly by the engineering web standards of **Booster Robotics**, **Bambu Lab**, and **DJI**:

| Pillar | Booster Robotics (`booster.tech`) | Bambu Lab (`bambulab.com`) | DJI (`dji.com`) | Bashix Implementation (`bashix.id`) |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Stage** | Flagship carousel with model typography | Full-bleed studio lighting & punchy tagline | Cinematic hero banner with dual action buttons | Full-bleed cinematic hero + flagship model carousel switcher |
| **Action Paradigm** | "Buy Now" (pill) + "Learn More" (frosted) | "Buy now" + "Learn More" | "Buy Now" + "Learn More" | "Order Hardware" (accent) + "Explore Architecture" (frosted pill) |
| **Product Showcase** | Developer robotics units & SDK | Symmetrical 2-column hardware studio cards | High-contrast spec cards & model tabs | 4-Tier physical hardware catalog with custom CNC/die-cast studio renders |
| **Deep Engineering** | Open SDK, Studio, competition platforms | Exploded mechanical architecture | Enterprise field reliability & IP ratings | Interactive schematic I/O inspector (Dual GbE TSN, isolated RS-485, CAN-FD) |
| **Store & Cart** | Store button in header | Direct checkout & modular parts | Retail/Store drawer | Slide-over cart drawer with 100% IDR (`Rp`) pricing & Supabase live sync |
| **Admin Route** | Internal/No visible link | Internal/No visible link | Internal/No visible link | Manual route only (`#admin` or `/admin`) |

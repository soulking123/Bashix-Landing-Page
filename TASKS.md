# Bashix Engineering Project - Implementation Task List

This task list defines the end-to-end execution roadmap for the **Bashix** (`bashix.id`) engineering landing page, physical hardware store, and admin management portal.

---

## Task Summary & Phase Overview

| Issue # | Phase | Title | Key Deliverables |
| :---: | :---: | :--- | :--- |
| **#1** | **Phase 1** | Project Scaffolding, React + Vite, Tailwind CSS v4 & Supabase Service Layer | Vite + React setup, Tailwind v4 `@theme`, `schema.sql`, `db.js` dual-mode service |
| **#2** | **Phase 2** | Sticky Glassmorphic Header & Interactive Particle Constellation Hero | `Navbar.jsx`, `CanvasBg.jsx`, `Hero.jsx`, `MetricsBar.jsx` |
| **#3** | **Phase 3** | Engineering Services & 'The Bashix Engine' Interactive Tech Showcase | `Services.jsx` (4 pillars), `TechShowcase.jsx` (tabbed architecture & mock telemetry stream) |
| **#4** | **Phase 4** | Methodology Pipeline, Impact Case Studies & Interactive Scope Estimator | `Process.jsx`, `CaseStudies.jsx`, `Estimator.jsx` calculator & lead capture modal |
| **#5** | **Phase 5** | Physical Hardware Storefront, Technical Specs Modal & Cart Drawer | `ProductCard.jsx`, `ProductModal.jsx` datasheet, `CartDrawer.jsx` with checkout |
| **#6** | **Phase 6** | Admin Management Portal, Sales Analytics & Full Product CRUD | `AnalyticsView.jsx` (KPIs & charts), `ProductManager.jsx` (CRUD table & modal), `OrdersTable.jsx` |
| **#7** | **Phase 7** | Landing Page CMS Settings, Footer, Responsive Polish & 60fps QA | `SiteSettings.jsx` (live hero/contact CMS), `Footer.jsx`, mobile-to-4K audit, Lighthouse 95+ |

---

## Detailed Task Specifications

### Task 1: [Phase 1] Project Scaffolding, React + Vite, Tailwind CSS v4 & Supabase Service Layer
- **Goal:** Set up foundational repository tooling, styling system, and database abstraction.
- **Scope of Work:**
  - Initialize Vite + React project structure.
  - Install dependencies: `@tailwindcss/vite`, `tailwindcss` (v4), `@supabase/supabase-js`.
  - Configure `vite.config.js` with `@tailwindcss/vite` plugin.
  - Configure `src/index.css` with `@import "tailwindcss";` and `@theme` tokens (`--color-bg-main`, `--color-accent-cyan`, `--font-heading`, etc.).
  - Create `supabase/schema.sql` containing PostgreSQL tables: `products`, `orders`, `order_items`, `leads`, `site_settings`.
  - Create `src/services/supabase.js` and `src/services/db.js` supporting live Supabase calls with automatic fallback to persistent seed storage when `.env` is unconfigured.
  - Create `src/context/StoreContext.jsx` with initial seed hardware data and site configuration.
- **Acceptance Criteria:**
  - `npm run dev` builds and starts with zero errors.
  - Tailwind v4 utility classes and custom theme tokens render as expected.
  - `db.js` returns initial product lists and site settings seamlessly.

---

### Task 2: [Phase 2] Sticky Glassmorphic Header & Interactive Particle Constellation Hero
- **Goal:** Deliver an immediate "WOW" first impression with high-tech visuals and fluid navigation.
- **Scope of Work:**
  - Build `src/components/common/Navbar.jsx`: Floating glassmorphic header (`backdrop-blur-md bg-bg-card/80 border-white/10`), glowing `bashix.id` logo, nav links (*Services*, *Hardware*, *Architecture*, *Case Studies*, *Estimator*), Cart trigger badge, and Admin toggle.
  - Build `src/components/common/CanvasBg.jsx`: High-performance HTML5 canvas rendering an interactive particle node constellation that responds to cursor velocity and maintains 60fps.
  - Build `src/components/landing/Hero.jsx`: High-tech eyebrow announcement pill, punchy headline (*"Hard Engineering. Scaled to Perfection."*), dynamic subtitle from CMS, and dual CTAs (*Order Hardware* & *Consult Engineering Team*).
  - Build `src/components/landing/MetricsBar.jsx`: Viewport-triggered animated counters (99.999% SLA, <5ms P99 Latency, 12,000+ Units Deployed, 10M+ Daily Telemetry Packets) and enterprise partner badge marquee.
- **Acceptance Criteria:**
  - Particle canvas responds to mouse movement without frame drops.
  - Navbar stays pinned with dynamic backdrop blur on scroll.
  - Metrics counters animate cleanly upon entering viewport.

---

### Task 3: [Phase 3] Engineering Services & 'The Bashix Engine' Interactive Tech Showcase
- **Goal:** Establish deep technical authority through interactive architecture visualizations.
- **Scope of Work:**
  - Build `src/components/landing/Services.jsx`: 4 engineering verticals:
    1. *Distributed Systems & Cloud Fabrics*
    2. *AI Platform & Inference Engineering*
    3. *Embedded Systems & IoT Hardware Engineering*
    4. *DevSecOps & SRE Hardening*
    - Interactive cards with specular border highlights on hover and technical capability chips.
  - Build `src/components/landing/TechShowcase.jsx` ("The Bashix Engine"):
    - Tabbed architecture viewer (`[ Distributed Mesh ]`, `[ Neural Inference ]`, `[ Edge Gateway ]`).
    - Live mock telemetry stream with real-time throughput numbers, CPU latency graph, and copyable bashix CLI commands (`bashix init --cluster`).
- **Acceptance Criteria:**
  - Service cards feature smooth hover transitions.
  - Tabs toggle architecture views and telemetry streams seamlessly.
  - Copy button successfully copies CLI snippet to clipboard with feedback toast.

---

### Task 4: [Phase 4] Methodology Pipeline, Impact Case Studies & Interactive Scope Estimator
- **Goal:** Guide prospective enterprise clients through execution methodology and lead capture.
- **Scope of Work:**
  - Build `src/components/landing/Process.jsx`: 4-stage precision engineering lifecycle (*Discovery & Stress Modeling*, *Rapid Prototyping*, *Production Hardening*, *Turnkey Deployment*).
  - Build `src/components/landing/CaseStudies.jsx`: Problem-solution-result cards with real metrics (e.g. 400% throughput gain, sub-10ms edge sync).
  - Build `src/components/landing/Estimator.jsx`: Interactive project scope & budget estimator:
    - Domain selection, throughput/scale tier, and timeline expectation.
    - Instant dynamic estimate output.
    - Consultation request form with validation, submitting directly to the `leads` table via `db.js`.
- **Acceptance Criteria:**
  - Estimator updates calculations dynamically when parameters are changed.
  - Form validates required fields and displays success confirmation upon submission.

---

### Task 5: [Phase 5] Physical Hardware Storefront, Technical Specs Modal & Cart Drawer
- **Goal:** Provide a seamless e-commerce experience for Bashix physical engineering hardware products.
- **Scope of Work:**
  - Build `src/components/shop/ProductCard.jsx`:
    - Display product image, model tag (e.g., `BX-GW-02`), title, dual currency pricing (`IDR` / `USD`), stock status pill (`In Stock`, `Low Stock`, `Pre-Order`), and technical spec chips.
    - "Add to Cart" and "View Datasheet" buttons.
  - Build `src/components/shop/ProductModal.jsx`:
    - Detailed technical datasheet modal with block diagrams, electrical ratings, pinout breakdown, and dimension specs.
  - Build `src/components/shop/CartDrawer.jsx`:
    - Slide-over shopping cart drawer.
    - Item quantity increment/decrement/remove.
    - Subtotal, taxes, shipping calculation, and currency toggle (`IDR` vs `USD`).
    - Simulated checkout flow writing new records into `orders` and `order_items` via `db.js`.
- **Acceptance Criteria:**
  - Adding products updates cart badge in navbar in real time.
  - Cart drawer opens and closes with smooth animation.
  - Completing checkout creates an order record and deducts inventory stock.

---

### Task 6: [Phase 6] Admin Management Portal, Sales Analytics & Full Product CRUD
- **Goal:** Empower administrators with real-time sales visibility, product management, and order tracking.
- **Scope of Work:**
  - Build `src/components/admin/AdminNav.jsx`: Top navigation for admin dashboard with view tabs (*Analytics*, *Products*, *Orders*, *Settings*) and "Back to Site" action.
  - Build `src/components/admin/AnalyticsView.jsx`:
    - KPI cards: Gross Revenue, Total Units Sold, Active Inquiries, Low Stock Alerts.
    - Interactive visual sales chart (weekly/monthly revenue and units shipped).
    - Recent activity feed.
  - Build `src/components/admin/ProductManager.jsx`:
    - Data table of all products with search, category filtering, and status badges.
    - "Show on Landing Page" toggle switch (instantly updates landing page store section).
    - Delete item action with confirmation dialog.
  - Build `src/components/admin/ProductFormModal.jsx`:
    - Modal form for creating and editing hardware products (Name, SKU, Category, Price IDR/USD, Stock, Image URL, Specs bullets, Featured toggle).
  - Build `src/components/admin/OrdersTable.jsx`:
    - List of customer orders with status dropdown (`Received`, `Processing`, `Dispatched`, `Completed`).
- **Acceptance Criteria:**
  - Products created or edited in the admin panel immediately appear/update on the landing page shop.
  - Toggling "Show on Landing Page" dynamically shows/hides the product on the public storefront.
  - Order status updates persist cleanly in `db.js`.

---

### Task 7: [Phase 7] Landing Page CMS Settings, Footer, Responsive Polish & 60fps QA
- **Goal:** Complete no-code site configuration, responsive audits, and performance tuning.
- **Scope of Work:**
  - Build `src/components/admin/SiteSettings.jsx`:
    - Live CMS editor for Hero Headline, Subtitle, Announcement Badge, Contact Email, and WhatsApp hotline.
    - Currency default toggle (`IDR` vs `USD`).
    - Updates saved to `site_settings` via `db.js` and reflected instantly on the landing page.
  - Build `src/components/common/Footer.jsx`:
    - Live operational status indicator (`All Systems Operational` with pulsing green beacon).
    - Quick links, engineering tech stack badges (`Rust`, `Go`, `Kubernetes`, `eBPF`), and legal copyright.
  - Responsive audit across 320px mobile, 768px tablet, 1280px desktop, and 4K ultra-wide.
  - Verify accessibility (WCAG AA), ARIA attributes, semantic HTML5, and Lighthouse 95+ performance.
- **Acceptance Criteria:**
  - Changing hero text in CMS updates public landing page immediately.
  - Site scores 95+ on Lighthouse performance, accessibility, and best practices.
  - Zero horizontal overflow or layout breakage across all responsive breakpoints.

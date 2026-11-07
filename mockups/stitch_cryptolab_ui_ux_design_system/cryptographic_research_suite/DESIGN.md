---
name: Cryptographic Research Suite
colors:
  surface: '#fbf8fc'
  surface-dim: '#dcd9dd'
  surface-bright: '#fbf8fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f6'
  surface-container: '#f0edf1'
  surface-container-high: '#eae7eb'
  surface-container-highest: '#e4e1e5'
  on-surface: '#1b1b1e'
  on-surface-variant: '#564338'
  inverse-surface: '#303033'
  inverse-on-surface: '#f3f0f4'
  outline: '#897267'
  outline-variant: '#ddc1b3'
  surface-tint: '#9b4500'
  primary: '#903f00'
  on-primary: '#ffffff'
  primary-container: '#b45309'
  on-primary-container: '#fff1eb'
  inverse-primary: '#ffb68e'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#006444'
  on-tertiary: '#ffffff'
  tertiary-container: '#007f58'
  on-tertiary-container: '#ccffe3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbca'
  primary-fixed-dim: '#ffb68e'
  on-primary-fixed: '#331200'
  on-primary-fixed-variant: '#763300'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#fbf8fc'
  on-background: '#1b1b1e'
  surface-variant: '#e4e1e5'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: 2.75rem
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: 1.75rem
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Geist
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Geist
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: 0em
  code-lg:
    fontFamily: JetBrains Mono
    fontSize: 0.9375rem
    fontWeight: '500'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.375rem
    letterSpacing: 0em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 1.125rem
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.06em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.625rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.875rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style
This design system defines an academic, precision-engineered environment for cryptographic experimentation, protocol dissection, and theoretical education. Rooted in a high-contrast daylight aesthetic (*Mode Jour*), the interface reflects the discipline of mathematical rigor: pure, deliberate, non-distracting, and structurally immaculate.

The design movement synthesizes **Swiss Technical Minimalism** with **Instrument-Grade Functionalism**:
- **Clarity over ornament:** Decoration is stripped in favor of informational hierarchy, structured micro-grids, and immaculate tabular layouts.
- **Scientific credibility:** Surfaces use warm alabaster and mineral ivory tones to mimic archival academic paper, contrasted sharply with deep carbon and ink-slate typography.
- **Focused visual signals:** Color is never decorative; it acts as an operational readout (validated hashes, malicious payloads, active cipher states, entropy levels).
- **Tactile structure:** Razor-thin slate hairline borders and calibrated component padding communicate physical instrument panels and mathematical proof sheets.

## Colors
The palette is calibrated for high legibility under daylight illumination, avoiding eye fatigue while guaranteeing WCAG AAA compliance for core typographic levels.

### Surface Tiers
- **Canvas Base (`#faf9f5`):** Warm alabaster, grounding the entire viewport.
- **Panel / Surface 1 (`#ffffff`):** Crisp pure chalk for primary workspaces, code inspect panes, and elevated calculation panels.
- **Surface Inset / Subtle (`#f4f3ee`):** Soft ivory for input gutters, inactive panels, and payload inspector backdrops.
- **Surface Muted (`#e7e5df`):** Structural divide planes, code block headers, and secondary control backing.

### Border & Division Tokens
- **Border Subtle (`#e2e0d8`):** Delicate perimeter rules separating adjacent panels.
- **Border Default (`#d1cfc7`):** Hairline demarcations on active interactive boundaries and table row divisions.
- **Border Strong (`#71717a`):** Explicitly focused or targeted cryptographic fields.

### Typographic Inks
- **Text Ink Primary (`#18181b`):** Pure deep charcoal for primary mathematical expressions, headers, and code.
- **Text Ink Secondary (`#27272a`):** Deep ink slate for general explanatory body text.
- **Text Ink Muted (`#52525b`):** Slate for structural metadata, line numbers, entropy indices, and labels.

### Semantic & Operational Accents
- **Primary / Katana Gold (`#b45309`, Accent `#d97706`, Highlight `#eab308`):** Key signature verification, active algorithm state, and primary user focus. Deepened specifically to maintain strong contrast against warm light backgrounds.
- **Secondary / Cyber Slate-Cyan (`#0284c7`, Deep `#0f172a`):** Network hops, protocol telemetry, handshake traces, and transport metadata.
- **Success / Validated Emerald (`#059669`, Pale BG `#ecfdf5`):** Cryptographically matched signatures, valid nonce validations, zero-knowledge proof verification.
- **Danger / Compromised Crimson (`#dc2626`, Pale BG `#fef2f2`):** Intercepted packets, replay attacks, bit rot, tampered HMAC payloads.

## Typography
Typographic rhythm balances technical engineering with editorial clarity.

- **Display & Headings (Space Grotesk):** Provides structured geometric rigor. Headings feel architectural, sharp, and scientific.
- **Prose & Core Interface (Geist):** Delivers clean readability for theoretical explanations, algorithm documentation, and parameter setup.
- **Code, Data & Telemetry (JetBrains Mono):** Mandated for all cryptographic keys, hexadecimal streams, initialization vectors (IVs), cipher matrices, formulas, and micro-labels. Digits remain tabular (`tnum`) across all monospaced renderings to guarantee column alignment in payload dumps.
- **Case Rule:** Micro-labels (`label-md`, `label-sm`) default to uppercase tracking for distinct telemetry status signaling.

## Layout & Spacing
The layout uses a 12-column analytical grid modeled after technical instrument consoles:
- **Desktop (>= 1280px):** 12-column grid with fixed 280px left workbench tree, fluid main computational pane, and 360px collapsible parameter drawer. Margin is `2rem`, gutter is `1.25rem`.
- **Tablet (768px - 1279px):** 8-column layout. The parameter inspector stacks beneath the main calculation viewport. Gutter reduces to `1rem`, margin to `1.5rem`.
- **Mobile (< 768px):** Single-column stacked workflow. Workspace tools shift into a bottom-anchored segmented switchboard. Margin is `1rem`, gutter is `0.75rem`.
- **Vertical Rhythm:** UI elements follow a base 4px spatial cadence (`space-xs: 4px`, `space-sm: 8px`, `space-md: 14px`, `space-lg: 20px`, `space-xl: 32px`). Densities favor high information bandwidth without visual crowding.

## Elevation & Depth
In alignment with academic paper precision and flat scientific tooling, depth is communicated primarily through **tonal stratification and razor borders** rather than diffuse shadows.

- **Level 0 (Canvas):** Tone `#faf9f5`. Completely flat.
- **Level 1 (Panels & Workspaces):** Tone `#ffffff` encased in a 1px border of `#e2e0d8`. Shadows are strictly avoided or kept as a razor offset: `0 1px 2px rgba(24, 24, 27, 0.04)`.
- **Level 2 (Active Modals, Cryptographic Inspect Popovers):** Tone `#ffffff` with a double perimeter (`1px solid #d1cfc7`) and an ambient, low-spread drop shadow: `0 8px 24px -4px rgba(24, 24, 27, 0.06), 0 2px 6px -1px rgba(24, 24, 27, 0.04)`.
- **Level 3 (Overlay Debugger / Telemetry Toasts):** Pure white background with high-contrast accent border (Katana Gold `#b45309` or Crimson `#dc2626`) and crisp shadow: `0 12px 32px -4px rgba(24, 24, 27, 0.08)`.

## Shapes
A dual-geometry framework creates visual clarity:

- **Containers & Control Rectangles (Soft - 0.25rem / 4px):** Lab panels, code blocks, tabular cell groups, and inputs use subtle rounding (`0.25rem` up to `0.5rem` for large dialog frames). This preserves the sharp, rectilinear nature of technical documents.
- **Pill Badges (Fully Rounded / 9999px):** Status chips, cryptographic curve identifiers (e.g., `secp256k1`, `Ed25519`), parity badges, and hash algorithm indicators use full pill rounding. This intentional contrast separates contextual state tags from interactive structural containers.

## Components

### Buttons
- **Primary:** Solid Katana Gold (`#b45309`), text `#ffffff`, font `Geist Medium`, radius `0.25rem`. Hover state transitions to `#d97706`. Focus ring is a 2px offset in `#b45309`.
- **Secondary / Ghost:** Transparent background with 1px border in `#d1cfc7`, text `#18181b`. Hover state shifts background to `#f4f3ee`.
- **Destructive:** Background `#fef2f2`, border `1px solid #fecaca`, text `#dc2626`. Hover state fills `#dc2626` with text `#ffffff`.
- **Icon / Telemetry Actions:** Fixed 32x32px square buttons, border `#e2e0d8`, centered icon with text ink slate.

### Chips & Pill Badges
- **Algorithm & State Badges:** Fully pill-shaped (`rounded-full`), height 22px, padding `0 10px`, font `JetBrains Mono` (`label-sm`).
- **Validated Chip:** Background `#ecfdf5`, border `1px solid #a7f3d0`, text `#059669`. Dot indicator inside (6px diameter `#059669`).
- **Tampered / Alert Chip:** Background `#fef2f2`, border `1px solid #fecaca`, text `#dc2626`.
- **Protocol Chip:** Background `#f4f3ee`, border `1px solid #e2e0d8`, text `#52525b`.

### Input Fields & Key Entry
- **Standard Field:** Background `#ffffff`, border `1px solid #d1cfc7`, text `#18181b`, radius `0.25rem`. Padding: `0.5rem 0.75rem`.
- **Active Focus:** Border shifts to `#b45309` with a subtle outline `0 0 0 2px rgba(180, 83, 9, 0.15)`.
- **Monospaced Payload Area:** Font `JetBrains Mono`, background `#faf9f5`, inset border, right-aligned byte-counter indicator.

### Lists & Data Grids
- **Header:** Background `#f4f3ee`, text `#52525b`, uppercase `label-sm`, bottom border `1px solid #d1cfc7`.
- **Row:** Alternating or clean chalk rows with border-bottom `1px solid #e2e0d8`. Hover state lights up with `#faf9f5`. Tabular numbers enforced.

### Checkboxes & Radios
- **Box/Radio:** 16x16px, border `1.5px solid #d1cfc7`, background `#ffffff`, radius `2px` (checkbox) or `50%` (radio).
- **Checked:** Background `#b45309`, border `#b45309`, crisp white checkmark/dot.

### Cards & Lab Panels
- **Container:** Background `#ffffff`, border `1px solid #e2e0d8`, radius `0.25rem`.
- **Panel Header:** Integrated 40px height bar, background `#faf9f5`, border-bottom `1px solid #e2e0d8`, padding `0 1rem`, housing title (`headline-md` or `label-md`) and payload status indicators.

### Hex / Byte Inspector (Domain-Specific)
- **Grid Layout:** 16-byte fixed column view using `JetBrains Mono` (`code-sm`).
- **Selection Highlights:** Selected byte offset highlights in warm amber `#fef3c7` with text `#b45309`.
- **Tampered Drift:** Corrupted bits highlight in light coral `#fee2e2` with red strikethrough.
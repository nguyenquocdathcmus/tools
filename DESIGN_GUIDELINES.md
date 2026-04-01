# Daxnoria Design Guidelines

## Objective
Create a clean, trustworthy, and fast-feeling developer interface across all Daxnoria screens.

## Design Direction
- Tone: professional, technical, focused.
- Visual style: soft gradients, subtle shadows, clear borders.
- Density: medium. Avoid cramped controls and oversized empty space.
- Interaction: fast feedback with lightweight motion.

## Core Principles
- Consistency first: reuse the same spacing, border radius, and button hierarchy.
- Scanability: sections should be understandable in under 3 seconds.
- Action clarity: primary actions are always obvious.
- Readability: body text uses high-contrast but not pure black.

## Layout Rules
- Use card sections with rounded corners and thin borders.
- Keep vertical rhythm with section spacing in a 12-16-20-24 scale.
- On tool screens, keep this order:
  1. Header
  2. Breadcrumb
  3. Hero intro
  4. Main tool panel
  5. Support sections
  6. Footer

## Typography
- UI font: Plus Jakarta Sans.
- Mono font: JetBrains Mono for code/data fields.
- Heading style: compact, strong weight, minimal line-height.
- Helper labels (eyebrow/badge): uppercase, letter spacing, smaller size.

## Color System
- Base background: very light cool neutral.
- Primary accent: blue family for trust and technical tone.
- Section tinting: very subtle gradient overlays, never heavy saturation.
- Error state: red text on soft red background with border.

## Components
- Buttons:
  - Primary: blue gradient, high contrast text.
  - Secondary: white/light background with border.
  - Hover: small lift + shadow.
- Inputs:
  - Rounded corners, soft borders, clear focus ring.
  - Code textareas use dark code surface.
- Tool cards:
  - Distinct icon or badge.
  - Small metadata labels.
  - Clear CTA affordance.

## Motion
- Keep transitions between 150ms and 220ms.
- Use hover lift only for interactive cards and key buttons.
- Avoid decorative animation loops.

## Responsive Behavior
- Mobile first behavior for controls and cards.
- Collapse multi-column areas to one column under 640px.
- Keep CTA buttons easy to tap and full-width where needed.

## Page Scope
- Home page: custom premium layout already established.
- Non-home pages: must use the same app-shell visual language.

## Content Style
- Keep headings short and direct.
- Avoid marketing-heavy copy blocks.
- Use practical wording for developer workflows and outcomes.

---
name: Tcher
description: tcher-kit mono. One brand mark, black and white chrome, and exactly one job for color, carrying meaning (severity, status, the jump flash). Restraint in chrome, signal in color.

# Source of truth is code, not this file: the `C` constants + `barPaletteForTheme()`
# in skill/scripts/live-browser.js, SEVERITY_COLORS in cli/engine/browser/injected/
# index.mjs, and the live-bar entry in .tcher/design.json. If a value changes there,
# update it here in the same commit.
colors:
  # Brand anchors
  brand-black: "#171717"                      # the mark's tile; on-page annotation ink (C.mark = oklch(20% 0 0))
  brand-white: "oklch(97% 0 0)"               # the accent: active controls, Accept, cycle dots (C.brand)

  # Chrome surfaces (the pill bar and its panels never theme-adapt)
  ink-deep: "oklch(4% 0 0)"                   # bar / picker / panel surface (C.ink)
  chat-surface: "oklch(20% 0 0)"              # input chips on the bar
  toggle-active: "oklch(27% 0 0)"             # graphite chip behind the selected toggle

  # Chrome text
  text: "oklch(92% 0 0)"                      # primary on dark chrome
  text-dim: "oklch(63% 0 0)"                  # secondary, placeholders
  ash: "oklch(55% 0 0)"                       # muted
  hairline: "oklch(92% 0 0 / 0.13)"           # container borders, dividers
  white: "oklch(99% 0 0)"
  hover-lift: "oklch(100% 0 0)"               # pure white on hover (C.brandHov)

  # States (grayscale; lightness carries the signal)
  processing-gray: "oklch(75% 0 0)"           # steer/processing pulse (was verdigris)
  processing-pale: "oklch(88% 0 0)"
  agent-dot: "oklch(96% 0 0)"                 # "agent not polling" badge on the mark
  mark-disconnected: "oklch(56% 0 0 / 0.78)"

  # Light surfaces (UX-check banner + findings popover, design panel)
  panel-surface: "oklch(98.5% 0 0 / 0.97)"
  panel-tile: "oklch(100% 0 0)"
  panel-ink: "oklch(15% 0 0)"
  panel-dim: "oklch(45% 0 0)"
  panel-hairline: "oklch(88% 0 0)"

  # The ONLY hues in the system: meaning, never decoration
  severity-critical: "oklch(56.1% 0.213 21.07)"   # red; ink on it: oklch(98% 0.01 21.07)
  severity-major: "oklch(74.86% 0.129 61.02)"     # orange; ink: oklch(16% 0.03 61.02)
  severity-minor: "oklch(88.88% 0.147 90.7)"      # yellow; ink: oklch(18% 0.04 90.7)
  severity-advisory: "oklch(88% 0.045 90.7)"      # muted yellow; ink: oklch(25% 0.01 90.7)
  jump-flash: "oklch(74.79% 0.137 239.13)"        # sky blue: click-to-jump highlight, contrast against every tier

typography:
  # The overlay is injected into arbitrary host pages: system stacks only,
  # never webfonts (no FOUT on the user's page, no CSP fetches).
  ui:
    fontFamily: "system-ui, -apple-system, sans-serif"
    sizes: "11px badges/labels · 11.5-12px controls · 12.5-13px body · 16px panel titles"
    weights: "500 controls · 600-650 emphasis/badges · 700 titles"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    usedFor: "finding details, counts, numbered markers"

iconography:
  set: "Remix Icon (Apache-2.0), embedded as inline fill='currentColor' SVG paths; attribution in NOTICE.md"
  sizes: "20px action-picker chips · 14px bar toggles · 13px inline button icons"
  brandMark: "brand.svg at repo root: #171717 rounded tile + white Tcher glyph, 18px in the bar, agent-status dot bottom-right"

shape:
  radius: "6px buttons · 7-8px inputs/bar · 10-12px cards/popovers · 999px badges"
  shadows:
    chrome: "0 16px 36px -12px oklch(0% 0 0 / 0.6)"
    popover: "0 18px 48px oklch(0% 0 0 / 0.16)"

motion:
  ease: "cubic-bezier(0.22, 1, 0.36, 1)  # ease-out-quint, all chrome transitions"
  reveal: "0.4s cubic-bezier(0.16, 1, 0.3, 1)  # banner slide, overlay reveal"
  rule: "every animation has a prefers-reduced-motion fallback"
---

# Design System: Tcher

Tcher's own chrome is **tcher-kit mono**: a black-and-white instrument panel that
never competes with the page it inspects. The brand mark is the only logo-shaped
thing; color appears only when it means something.

## 1. Overview

Two registers of surface share one identity:

- **Dark chrome** (pill bar, action picker, configure bar, params panel): deep
  black `ink-deep`, white accent, gray states. It never theme-adapts to the host
  page; the picker is product chrome, not page chrome.
- **Light panels** (UX-check banner, findings popover, DESIGN.md panel): near-white
  neutral tiles with hairline borders, so detail reads like a document.

Color carries meaning exclusively: the four severity tiers, the sky-blue jump
flash, the amber-free grayscale states. If a color is decorative, it is wrong.

## 2. The mark

`brand.svg`: a `#171717` rounded tile with the white Tcher glyph. In the bar it
renders at 18px via `brandMarkSvg()` and doubles as the agent-connection
indicator (white corner dot + dimmed glyph when no agent is polling).

## 3. On-page marks

Anything Tcher draws on the user's page (selection outline, annotation strokes,
comment pins, insert lines) leads with **brand-black ink plus a white halo**, so
it reads on light and dark pages alike. UX-check outlines are the exception:
they wear their severity color, and the click-to-jump flash is always
`jump-flash` blue so it stands out against every tier.

## 4. Components

| Component | Notes |
|---|---|
| Global pill bar | ink-deep, hairline border, brand mark left; toggles: Select, Detect UX, DESIGN.md, Type Here (steer), Exit |
| Action picker | 4-column chip grid, 20px Remix icons, white-on-graphite selected state |
| Configure bar | Idea/action pill + "Describe what you need." input (min 400px) + Variations ×2 + Enter (send icon) |
| Variant cycler | white active dot, dim arrived dots, ring for pending |
| UX-check banner | light strip, one severity badge per tier, View details chevron button |
| Findings popover | left-docked card, tiers stacked vertically, white tiles, click row = close + jump + blue flash |
| Toast | dark pill above the bar, single line up to 680px |
| Design panel | right-docked, shadow DOM, neutral light palette, mono accents |

## 5. Dos

- Do keep live picker chrome on tcher-kit mono regardless of host page theme.
- Do reserve hue for meaning: severity tiers, jump flash, status.
- Do use system font stacks only inside injected UI.
- Do give every on-page mark a white halo over brand-black ink.
- Do size icons from the Remix fill set and route new ones through NOTICE.md attribution.

## 6. Don'ts

- Don't theme-adapt the picker to the host page.
- Don't add gradients, glows, or a second accent hue to chrome.
- Don't load webfonts from the overlay.
- Don't put the `tcher-overlay` class on interactive UI (it is for finding outlines; it kills pointer events and parks opacity at 0).
- Don't reintroduce voice input; the regression suite asserts it stays out.

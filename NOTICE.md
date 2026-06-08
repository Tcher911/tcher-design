# Notice

Tcher
Portions copyright 2025-2026 Paul Bakaus, Apache License 2.0

## Anthropic frontend-design Skill

The `tcher` skill in this project builds on Anthropic's original frontend-design skill.

**Original work:** https://github.com/anthropics/skills/tree/main/skills/frontend-design
**Original license:** Apache License 2.0
**Copyright:** 2025 Anthropic, PBC

This project extends the original with:
- 7 domain-specific reference files (typography, color-and-contrast, spatial-design, motion-design, interaction-design, responsive-design, ux-writing)
- 27 commands
- Expanded patterns and anti-patterns

## Remix Icon

The live-mode overlay UI (`skill/scripts/live-vocabulary.mjs` and `skill/scripts/live-browser.js`) embeds SVG path data from the Remix Icon set.

**Original work:** https://github.com/Remix-Design/RemixIcon
**Original license:** Apache License 2.0
**Copyright:** Remix Design Studio

## Laws of UX

The UX rule set (the `ux` category in `cli/engine/registry/antipatterns.mjs`, the audit command's UX dimension) operationalizes principles catalogued by Jon Yablonski's Laws of UX. Only the principle names are referenced; all rule descriptions and check logic are original to this project.

**Original work:** https://lawsofux.com/
**Author:** Jon Yablonski

## Typecraft Guide Skill

The `typography.md` reference in this project incorporates a set of tactical additions merged in from ehmo's `typecraft-guide-skill` at the author's request: dark-mode weight/tracking compensation, `font-display: optional` vs `swap`, preload-critical-weight-only guidance, variable fonts for 3+ weights, `clamp()` max-to-min ratio bound, responsive measure/container coupling, `text-wrap: balance` / `pretty`, `font-optical-sizing: auto`, ALL-CAPS tracking quantification, and the paragraph-rhythm rule (space OR indent, never both).

**Original work:** https://github.com/ehmo/typecraft-guide-skill
**Original license:** see upstream repo
**Author:** ehmo

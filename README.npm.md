# Tcher

A design skill for AI coding agents, plus a scanner that catches the patterns that make AI-generated UI look AI-generated. 27 commands across Claude Code, Cursor, Gemini, Codex, and 60+ other agents. 59 detection rules that run with no model and no network.

## Install the skill

```bash
npx skills add Tcher911/tcher-design --copy
```

Open your agent and type `/tcher init`. It interviews you once, writes `PRODUCT.md` and `DESIGN.md`, and every other command reads those first so the design stays on-brief. Pass `--copy` so the skill lands in your agent's own folder; the default symlink mode routes through `.agents/` and skips agents like Claude Code that read their own directory.

Want to pick which tools get it, or use the `detect` scanner below? Use the tcher CLI instead:

```bash
npx tcher-designs skills install                       # detect your agent, then confirm
npx tcher-designs skills install --providers=claude,cursor
npx tcher-designs skills update
```

## Scan for anti-patterns

`detect` reads HTML, CSS, JSX, TSX, Vue, and Svelte and flags 59 specific patterns: AI tells, real craft problems, and a usability set built on Jon Yablonski's [Laws of UX](https://lawsofux.com/). It runs locally. Nothing leaves your machine.

```bash
npx tcher-designs detect src/                 # a file, a folder, or a URL
npx tcher-designs detect --json src/          # for CI
npx tcher-designs detect --mode=ux src/       # only the usability rules
npx tcher-designs detect https://example.com  # live page (needs puppeteer)
```

Exit code is `0` when clean, `2` when it finds something, so it drops straight into a CI gate. Every finding carries a severity tier: critical, major, minor, or advisory.

## What it flags

The 59 rules split three ways. **Design (45)** is the AI-and-template tells: side-tab accent borders, gradient text on headings, purple-on-dark palettes, Inter everywhere, flat type hierarchy, nested cards, everything centered. **Craft** overlaps here: sub-12px body text, cramped leading, WCAG contrast failures, and three Thai-typography faults most linters miss (tight Thai line-height, positive tracking on Thai runs, Thai text under 14px). **UX (14)** is the usability layer: sub-24px tap targets (Fitts), nav choice overload (Hick), links that read as plain text (Similarity), form walls (Miller), inputs without labels, killed focus outlines, missing viewport meta. JSON output names the law behind each UX hit.

## Requirements

- Node 24+
- `puppeteer`, only if you scan a URL

## License

Apache 2.0. Source and full command list at [github.com/Tcher911/tcher-design](https://github.com/Tcher911/tcher-design).

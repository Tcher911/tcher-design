# Tcher CLI

Detect UI anti-patterns, design quality issues, and UX problems from the command line. Scans HTML, CSS, JSX, TSX, Vue, and Svelte files for 56 specific patterns: AI-generated UI tells, design craft problems, and a usability rule set built on Laws of UX principles. Every rule carries a severity tier (critical / major / minor / advisory); the live-mode overlay color-codes findings by tier.

## Quick Start

```bash
# Install skills into your AI harness (Claude, Cursor, Gemini, etc.)
npx tcher-designs skills install

# Update skills to the latest version
npx tcher-designs skills update

# Link skills from a Git submodule checkout
npx tcher-designs skills link --source=.tcher --providers=claude,cursor

# List all available commands
npx tcher-designs skills help

# Scan files or directories for anti-patterns
npx tcher-designs detect src/

# Scan a live URL (requires Puppeteer)
npx tcher-designs detect https://example.com

# JSON output for CI/tooling
npx tcher-designs detect --json src/

# Only the UX/usability rule set
npx tcher-designs detect --mode=ux src/
```

## What It Detects

**AI Slop Tells**: patterns that scream "AI generated this":
- Side-tab accent borders, gradient text on headings
- Purple/violet gradients and cyan-on-dark palettes
- Dark mode with glowing accents, border + border-radius clashes

**Typography Issues**: overused fonts (Inter, Roboto), flat type hierarchy, single font families

**Color & Contrast**: WCAG AA violations, gray text on colored backgrounds, pure black/white

**Layout & Composition**: nested cards, monotonous spacing, everything-centered layouts

**Motion**: bounce/elastic easing, layout property transitions

**Quality**: tiny body text, cramped padding, long line lengths, small touch targets

**UX (Laws of UX)**: sub-24px tap targets (Fitts's Law), nav choice overload (Hick's Law), links indistinguishable from prose (Law of Similarity), ungrouped form walls (Miller's Law), missing autocomplete (Postel's Law), plus inputs without labels, icon buttons without names, missing alt, killed focus outlines, missing viewport meta. Rule names follow Jon Yablonski's [lawsofux.com](https://lawsofux.com/); JSON output carries the law per finding.

56 detections in total. See the full list at [tcher-designs.vercel.app](https://tcher-designs.vercel.app/).

## Exit Codes

- `0`: no issues found
- `2`: anti-patterns detected

## Options

```
tcher-designs detect [options] [file-or-dir-or-url...]

  --json         Output findings as JSON
  --mode=<set>   all (default), design, or ux
  --gpt          Also report GPT-specific provider tells
  --gemini       Also report Gemini-specific provider tells
  --help         Show help
```

## Requirements

- Node.js 24+
- `puppeteer` (optional, only needed for URL scanning)

## Part of Tcher

This CLI is part of [Tcher](https://tcher-designs.vercel.app/), a cross-provider design skill pack for AI-powered development tools. The full suite includes 24 commands for Claude, Cursor, Gemini, Codex, and more.

## License

[Apache 2.0](https://github.com/Tcher911/tcher-design/blob/main/LICENSE)

# Tcher CLI

Detect UI anti-patterns and design quality issues from the command line. Scans HTML, CSS, JSX, TSX, Vue, and Svelte files for 27 specific patterns including AI-generated UI tells, accessibility violations, and general design quality problems.

## Quick Start

```bash
# Install skills into your AI harness (Claude, Cursor, Gemini, etc.)
npx tcher skills install

# Update skills to the latest version
npx tcher skills update

# Link skills from a Git submodule checkout
npx tcher skills link --source=.tcher --providers=claude,cursor

# List all available commands
npx tcher skills help

# Scan files or directories for anti-patterns
npx tcher detect src/

# Scan a live URL (requires Puppeteer)
npx tcher detect https://example.com

# JSON output for CI/tooling
npx tcher detect --json src/

# Regex-only mode (faster, no jsdom)
npx tcher detect --fast src/
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

25 detections in total. See the full list at [tcher.style](https://tcher.style).

## Exit Codes

- `0`: no issues found
- `2`: anti-patterns detected

## Options

```
tcher detect [options] [file-or-dir-or-url...]

  --fast    Regex-only mode (skip jsdom, faster but less accurate)
  --json    Output findings as JSON
  --help    Show help
```

## Requirements

- Node.js 24+
- `jsdom` (included as dependency, used for HTML scanning)
- `puppeteer` (optional, only needed for URL scanning)

## Part of Tcher

This CLI is part of [Tcher](https://tcher.style), a cross-provider design skill pack for AI-powered development tools. The full suite includes 22 steering commands for Claude, Cursor, Gemini, Codex, and more.

## License

[Apache 2.0](https://github.com/Tcher911/tcher-design/blob/main/LICENSE)

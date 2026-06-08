# tcher-design

A skill you install into the AI coding tool you already use. **27 commands**, a 59-rule scanner, and knowledge most design guidance skips: Thai typography that sets correctly, and the UX Thai and SEA users actually use.

```bash
npx tcher-designs skills install
```

---

## Features

### Thai typography (`/tcher thai`)

Thai stacks vowels and tone marks above and below each consonant, so Latin line-height of 1.4 to 1.5 lets the marks on one line crash into the line above. This command sets line-height to 1.6 and up, cuts the letter-spacing that breaks Thai syllables, and picks real Thai faces (Anuphan, IBM Plex Sans Thai, Sarabun) instead of letting Inter fall through to a random system font. It also pairs Thai with English so a mixed line stops looking lumpy. Three of these faults also run automatically in the scanner.

### SEA and Thai UX (`/tcher sea`)

A checkout that only takes credit cards loses most of Thailand. This leads with PromptPay QR and cash-on-delivery, adds the proof SEA buyers check for (a real phone number, reviews, a DBD badge), and keeps the dense, information-rich layout Shopee and Lazada users expect instead of airy whitespace. Thumb-zone first. LINE if it fits the brand, not because a checklist asked for it.

### Detect UX: 59 rules, no AI (`detect`)

Press one button in the browser, or run `npx tcher-designs detect`, and the engine walks the live DOM with computed styles and flags problems in about a second. **Design (45)** catches AI template tells and craft faults, from violet gradient text to cramped Thai leading. **UX (14)** catches usability, most of it operationalizing a named principle from Jon Yablonski's [Laws of UX](https://lawsofux.com/): tap targets under 24px (Fitts's Law), navs past eight links (Hick's Law), prose links with no visual cue (Law of Similarity). Findings are color-coded by severity and cite their law inline.

### Flows: can the user finish the task? (`/tcher flows`)

Audit grades one screen. This reads your routes, pages, components, and state, then follows a whole task (checkout, sign-up, upload) across screens to find where it breaks: dead ends with no way out, a confirmation page with no next step, missing loading or error or empty states, orphan routes nothing links to, forms that submit into silence. It reports a completion-rate risk per flow and names the one fix to make first.

---

## Commands

Each command reads `PRODUCT.md` and `DESIGN.md` first (run `/tcher init` once), then does one job. Type `/tcher` with no argument and it recommends the best next one for your project's state.

**Start a project**

| Command | What it does |
|---|---|
| `/tcher init` | One-time setup. Interviews you, writes `PRODUCT.md` (strategy) and `DESIGN.md` (the visual system) that every other command reads. |
| `/tcher document` | The reverse of init: generate `DESIGN.md` from code you already shipped. |
| `/tcher extract` | Pull repeated patterns, components, and tokens into a real design system. |
| `/tcher shape` | Plan the UX and UI before any code. Ends in a brief you confirm. |
| `/tcher idea` | Float a few genuinely different directions from one short prompt, trade-offs stated out loud. |
| `/tcher craft` | Shape, build, and visually iterate a feature end to end. |

**Review what you have**

| Command | What it does |
|---|---|
| `/tcher critique` | UX review of one surface: hierarchy, clarity, cognitive load, scored. |
| `/tcher audit` | Technical pass: accessibility, performance, responsive behavior, anti-patterns, rated P0 to P3. |
| `/tcher flows` | Trace task journeys through the code. Dead ends, missing states, orphan pages, broken flows. |

**Sharpen one axis at a time**

| Command | What it does |
|---|---|
| `/tcher typo` | Replace invisible default fonts; build a type scale with real weight contrast. |
| `/tcher palette` | Add strategic color, different hue families, not three tints of one. |
| `/tcher layout` | Fix spacing rhythm, grids, and visual hierarchy. |
| `/tcher animate` | Add purposeful motion, with a reduced-motion path that is not an afterthought. |
| `/tcher motion` | Add personality: micro-interactions and the occasional earned surprise. |
| `/tcher extreme` | Push past convention: shaders, spring physics, scroll-driven reveals. |

**Dial the intensity**

| Command | What it does |
|---|---|
| `/tcher brave` | Amplify a timid, flat design. Each variant bets on a different dimension. |
| `/tcher calm` | Pull back an overstimulating one without losing the craft. |
| `/tcher trim` | Strip to essence. Remove what does not earn its place. |
| `/tcher refine` | The last five percent: alignment, spacing, consistency, before you ship. |

**Make it production-real**

| Command | What it does |
|---|---|
| `/tcher harden` | Errors, i18n, text overflow, empty data, the cases a demo never hits. |
| `/tcher onboard` | First-run flows, empty states, and the path to the first win. |
| `/tcher clarify` | Rewrite unclear labels, error messages, and microcopy. |
| `/tcher responsive` | Adapt across devices and contexts, with tap targets that survive a thumb. |
| `/tcher optimize` | Diagnose and fix UI performance: load, render, bundle. |

**Localize for Thai and SEA**

| Command | What it does |
|---|---|
| `/tcher thai` | Thai typography: leading for stacked marks, real Thai font pairing, mixed Thai and English. |
| `/tcher sea` | SEA and Thai UX: trust signals, PromptPay and COD, information density, mobile-first. |

**Iterate in the browser**

| Command | What it does |
|---|---|
| `/tcher live` | Pick an element on the page, get real variants, accept one, and it writes back to source. |

Want a command as its own shortcut? `/tcher pin audit` makes `/audit` call `/tcher audit` directly; `/tcher unpin` removes it.

---

## Live mode

`/tcher live` opens a helper on port `8400` and injects a picker into your running dev server (Vite, Next.js, SvelteKit, Astro, Nuxt, or a static file). Click an element, pick a focused action or type a direction in plain language ("less SaaS"), and the agent hot-swaps two to four real variants into the page over HMR. Toggle between them on the actual element, tune any sliders a variant exposes, then accept. Accepting writes the winner back to real source and cleans up every temporary artifact. Discard reverts. The same pill bar carries the Detect UX button, so you scan and redesign in one loop.

---

## CLI

The scanner is also a plain command for CI and pre-commit. No API key, and no browser for static files.

```bash
npx tcher-designs detect src/                # scan a directory
npx tcher-designs detect index.html          # a file
npx tcher-designs detect https://example.com # a live URL
npx tcher-designs detect --json .            # machine-readable
npx tcher-designs detect --mode=ux src/      # only the usability set
npx tcher-designs detect --gpt --gemini .    # include provider-specific tells
```

The deterministic engine covers what a DOM walk can measure. The judgment half of the Laws of UX (Peak-End, Tesler's, Flow, mental models) lives in `/tcher audit`, which scores a dedicated UX dimension across all 30 laws.

---

## Reference files

Seven files point the AI at the right axes instead of one generic "good design" blob:

| Reference | Covers |
|---|---|
| typography | Type systems, font pairing, modular scales, OpenType |
| color-and-contrast | OKLCH, tinted neutrals, dark mode, contrast ratios |
| spatial-design | Spacing systems, grids, visual hierarchy |
| motion-design | Easing curves, staggering, reduced motion |
| interaction-design | Forms, focus states, loading patterns |
| responsive-design | Mobile-first, fluid type, container queries |
| ux-writing | Button labels, error messages, empty states |

---

## Install

```bash
npx tcher-designs skills install          # install into your harness
npx tcher-designs skills install --force  # reinstall over an existing copy
npx tcher-designs skills update           # update to the latest
```

Or copy a prebuilt directory from `dist/`:

| Tool | Command |
|---|---|
| Claude Code (project) | `cp -r dist/claude-code/.claude your-project/` |
| Claude Code (global) | `cp -r dist/claude-code/.claude/* ~/.claude/` |
| Cursor | `cp -r dist/cursor/.cursor your-project/` |
| Gemini CLI | `cp -r dist/gemini/.gemini your-project/` |
| Codex CLI | `cp -r dist/agents/.agents your-project/` |
| GitHub Copilot | `cp -r dist/github/.github your-project/` |
| Trae | `cp -r dist/trae/.trae/skills/* ~/.trae/skills/` |
| Rovo Dev | `cp -r dist/rovo-dev/.rovodev your-project/` |

Works in Claude Code · Cursor · Gemini CLI · Codex CLI · VS Code Copilot · OpenCode · Kiro · Trae · Rovo Dev · Qoder · Pi

---

## License

Apache 2.0. See [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md). Built by [Tcher](https://tcher-designs.vercel.app/).

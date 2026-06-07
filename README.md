# tcher-design

1 skill, 24 commands, and curated anti-patterns for exceptional frontend design.

> **Quick start:** `npx tcher-designs skills install`

---

## Why tcher-design?

Every LLM learned from the same generic templates. Without guidance, you get the same predictable output: Inter font, purple gradients, cards nested in cards, gray text on colored backgrounds.

tcher-design fights that bias with:

- **An expanded skill** with 7 domain-specific reference files
- **24 commands** to audit, critique, refine, trim, animate, and more
- **Curated anti-patterns** that explicitly tell the AI what NOT to do

---

## Installation

**Option 1: npx (Recommended)**

```bash
npx tcher-designs skills install
```

**Option 2: Copy from repository**

| Tool | Command |
|------|---------|
| Claude Code (project) | `cp -r dist/claude-code/.claude your-project/` |
| Claude Code (global) | `cp -r dist/claude-code/.claude/* ~/.claude/` |
| Cursor | `cp -r dist/cursor/.cursor your-project/` |
| Gemini CLI | `cp -r dist/gemini/.gemini your-project/` |
| Codex CLI | `cp -r dist/agents/.agents your-project/` |
| GitHub Copilot | `cp -r dist/github/.github your-project/` |
| Trae | `cp -r dist/trae/.trae/skills/* ~/.trae/skills/` |
| Rovo Dev | `cp -r dist/rovo-dev/.rovodev your-project/` |

---

## The Skill: /tcher

7 domain-specific reference files that guide the AI to think along the right axes:

| Reference | Covers |
|-----------|--------|
| typography | Type systems, font pairing, modular scales, OpenType |
| color-and-contrast | OKLCH, tinted neutrals, dark mode, accessibility |
| spatial-design | Spacing systems, grids, visual hierarchy |
| motion-design | Easing curves, staggering, reduced motion |
| interaction-design | Forms, focus states, loading patterns |
| responsive-design | Mobile-first, fluid design, container queries |
| ux-writing | Button labels, error messages, empty states |

---

## 24 Commands

### Setup & Planning

| Command | What it does |
|---------|-------------|
| `/tcher init` | One-time setup: reads the project, writes `PRODUCT.md` and `DESIGN.md` |
| `/tcher document` | Generate `DESIGN.md` from existing code (if you skipped init) |
| `/tcher extract` | Pull reusable components and tokens into the design system |
| `/tcher shape` | Plan UX/UI before writing code |
| `/tcher idea` | Explore distinct design directions from a short brief |
| `/tcher craft` | Full shape → build → iterate flow in one go |

### Review & Audit

| Command | What it does |
|---------|-------------|
| `/tcher critique` | UX design review: hierarchy, clarity, emotional resonance |
| `/tcher audit` | Technical quality checks: a11y, performance, responsive |

### Refine & Polish

| Command | What it does |
|---------|-------------|
| `/tcher refine` | Final pass: design system alignment and shipping readiness |
| `/tcher trim` | Strip to essence, remove everything unnecessary |
| `/tcher brave` | Amplify designs that are too timid |
| `/tcher calm` | Tone down designs that are too loud |
| `/tcher harden` | Error handling, i18n, text overflow, edge cases |

### Visual Styling

| Command | What it does |
|---------|-------------|
| `/tcher palette` | Introduce strategic color: different hue families, not just tints |
| `/tcher typo` | Fix font choices, hierarchy, sizing |
| `/tcher layout` | Fix layout, spacing, visual rhythm |
| `/tcher animate` | Add purposeful motion |
| `/tcher motion` | Add moments of joy: micro-interactions, personality, easter eggs |
| `/tcher extreme` | Add technically extraordinary effects |

### UX & Content

| Command | What it does |
|---------|-------------|
| `/tcher clarify` | Improve unclear UX copy |
| `/tcher onboard` | First-run flows, empty states, activation paths |

### Adaptation & Performance

| Command | What it does |
|---------|-------------|
| `/tcher responsive` | Adapt for different devices or contexts |
| `/tcher optimize` | Performance improvements |

### Live Mode

| Command | What it does |
|---------|-------------|
| `/tcher live` | Visual variant mode: iterate on elements in the browser in real time |

**Usage examples**

```
/tcher audit blog           # Audit blog hub + post pages
/tcher critique landing     # UX design review
/tcher refine settings      # Final pass before shipping
/tcher harden checkout      # Add error handling + edge cases
/tcher redo this hero section
```

**Shortcut:** `/tcher pin <command>` creates a standalone alias, e.g. `pin audit` → `/audit`

---

## Live Mode: `/tcher live`

Select an element in the browser → AI generates variants → preview them live → accept and the change is written back to real source code.

### Prerequisites

- `/tcher init` has been run (variants will align with `PRODUCT.md` / `DESIGN.md`)
- A dev server with HMR is running: Vite, Next.js, SvelteKit, Astro, Nuxt, Bun, or a static HTML file

### Flow

**1. Start**
```
/tcher live
```
Opens a helper server on port `8400` and injects a picker script into your entry file. On first run it will ask you to create a `config.json` and offer a dev-only CSP patch if needed (safe, guarded by `NODE_ENV === "development"`).

**2. Open your dev server**
Navigate to your own dev server URL, e.g. `localhost:5173`.
⚠️ Not port `8400`; that's the helper only.
You'll see a dark pill bar at the bottom of the screen with a Select button.

**3. Select an element**
Click any element you want to change (hero, card, button, section). An outline and context bar will appear.

| Input | Effect |
|-------|--------|
| Command chip | Choose a focused action: brave, motion, layout, typo, etc. |
| Idea field | Natural language direction, e.g. "more playful", "less SaaS" |
| Comment pin | Pin position matters: a pin near the title comments on the title, not the whole block |
| Stroke drawing | Circle = emphasize · Arrow = direction/move · Cross = remove |

> If at least one annotation is present, the system sends a screenshot with your markings to the agent before generating.

**4. Press Enter**
The AI generates 2–4 genuinely different variants and hot-swaps them into the page via HMR. Toggle between `1/2` `2/2` on the real element in the real page. Some variants include sliders (density, color amount, etc.) you can tune without regenerating.

**5. Decide**
- **Accept** → variant is written back to source code, all temporary code is cleaned up
- **Discard** → reverts to the original
- Type a refinement and hit Go again to iterate further

**6. Exit**
Press exit on the pill; the injected script is removed cleanly.

> **Tip:** Select a small enough element that you can hold the whole thing in your head (one card, one hero). You'll get sharper variants than if you select the entire page. Don't queue other tasks while a generation is in progress.

### Controls

| Control | Description |
|---------|-------------|
| "Describe what you need." | Free prompt that steers all variants, e.g. "feel like a newspaper front page" |
| Variations ×2 / ×3 / ×4 | Number of variants per run. Click to cycle (default ×2). More = more options, longer wait. |
| Enter | Send the task to the agent |
| Type Here (on the pill bar) | Page-level direction without selecting an element; type what needs to change and press Enter |
| Detect UX | Run the 56-rule design + UX check on the current page (see below) |

### 12 Live Mode Actions

Each action loads its own reference file (`reference/brave.md`, etc.) to ensure variants differ along the right axis. Idea uses the project's core design laws and brand register instead.

| Action | What it does | Use when |
|--------|-------------|----------|
| **Idea** | No locked direction: agent explores genuinely different archetypes | You want to see the full possibility space, or you already have a prompt |
| **Brave** | Make it more daring: each variant pushes a different dimension (scale / color / structure) | The design feels timid, flat, or lacks a focal point |
| **Calm** | Reduce visual noise: each variant pulls back a different thing (color / decoration / spacing) | The design feels cluttered or overly loud |
| **Trim** | Cut what's unnecessary: visual noise / redundant content / over-nested structure | The element feels bloated |
| **Refine** | Refine the details: spacing rhythm / hierarchy / micro details like corner radius, focus states | The structure is solid, needs a final pass |
| **Typo** | Typography only: each variant uses a different font pair and scale ratio | You want to change personality through type |
| **Palette** | Rethink the entire color set: different hue families, not just three shades of the same color | You want a completely different color world |
| **Layout** | Restructure the arrangement: stacked / side-by-side / grid / asymmetric | The current layout isn't working |
| **Responsive** | Adjust for a different context: mobile-first / tablet / desktop / print-low-data | You need a version for another screen or environment |
| **Animate** | Add motion: cascade stagger / clip wipe / scale-focus / morph / parallax | You want life, not the same fade three ways |
| **Motion** | Add personality: micro-interaction / typographic surprise / illustrated accent / easter egg | The design is correct but boring |
| **Extreme** | Break conventions entirely: each variant challenges a different rule (scale / structure / motion / input model) | You want something technically extraordinary |

---

## UX Check: Detect UX

Press **Detect UX** on the pill bar to scan the live page with **56 deterministic rules**. No AI call, no network: the engine walks the real DOM with computed styles and flags problems in about a second.

The rules split into two sets, and the findings popover has a tab for each:

- **Design (42)**: AI-template tells and craft problems. Purple gradient text, side-tab borders, icon-tile stacks, low contrast, cramped padding, marketing buzzwords.
- **UX (14)**: usability checks, several operationalizing principles from Jon Yablonski's [Laws of UX](https://lawsofux.com/). Tap targets under 24px (Fitts's Law), navs past 8 choices (Hick's Law), prose links with no visual cue (Law of Similarity), forms past 7 ungrouped fields (Miller's Law), autofillable fields without `autocomplete` (Postel's Law), multi-thousand-pixel images in small slots (Doherty Threshold), plus inputs without labels, icon buttons without names, missing `alt`, killed focus outlines, and a missing viewport meta.

Findings are color-coded by severity:

| Tier | Color | Means | Examples |
|------|-------|-------|----------|
| critical | red | Breaks readability or usability; fix first | Low contrast, tiny body text, broken images, inputs without labels, 16px tap targets, killed focus outlines |
| major | orange | Clearly hurts quality, or screams template | Purple gradient text, side-tab borders, nested cards, undistinguishable links, oversized image payloads |
| minor | yellow | Stylistic tells worth a look | Overused fonts, em-dash overuse, marketing buzzwords, nav choice overload, ungrouped form walls |
| advisory | muted yellow | Heads-up; sometimes a deliberate choice | Emoji as UI ornament, repeated section kickers, unlinked header logos, missing autocomplete |

How it reads on the page:

1. Every flagged element gets an outline and a label in its tier color; hover shows the detail (exact contrast ratio, offending colors, sizes).
2. A banner at the top sums the page up with one status badge per tier, e.g. `UX check: 9 critical · 6 major · 2 minor · 6 advisory`.
3. **View details** opens a left-docked popover with **All / Design / UX** tabs, findings grouped by tier inside each. UX findings cite their law inline ("Fitts's Law · 16×16px"). Click a finding to jump to its element; the outline flashes blue for a second so you can't miss it.

The deterministic rules cover what a DOM walk can measure. The judgment half of the Laws of UX (Peak-End, Tesler's, Flow, mental models) lives in `/tcher audit`, which scores a dedicated UX dimension across all 30 laws.

The same rule engine powers `npx tcher-designs detect` for CI; `--mode=design` or `--mode=ux` scopes the scan to one set. Two differences from the overlay: browser-only checks (broken images, real overflow, crowded tap targets, image payloads) run in the overlay only, and provider-specific tells need `--gpt` / `--gemini` flags on the CLI but always run in the overlay.

---

## CLI

**Skills management**

```bash
npx tcher-designs skills install          # Install
npx tcher-designs skills install --force  # Reinstall over existing
npx tcher-designs skills help             # List all commands
npx tcher-designs skills check            # Check for updates
npx tcher-designs skills update           # Update to latest version
```

**Detect anti-patterns** (no AI required)

```bash
npx tcher-designs detect src/
npx tcher-designs detect index.html
npx tcher-designs detect https://example.com
npx tcher-designs detect --json .
npx tcher-designs detect --mode=ux src/     # only the UX/usability rule set
npx tcher-designs detect --gpt --gemini .   # include provider-specific tells
```

---

## Anti-Patterns

Explicit guidance baked into the skill telling the AI what to avoid:

- Don't use overused fonts: Arial, Inter, system defaults
- Don't use gray text on colored backgrounds
- Don't use pure black or pure gray; always tint
- Don't wrap everything in cards or nest cards inside cards
- Don't use bounce or elastic easing; it feels dated

The Detect UX engine enforces 56 machine-checkable rules (42 design, 14 UX; see **UX Check** above), so the guidance is verified, not just suggested.

---

## Supported Tools

Claude Code · Cursor · Gemini CLI · Codex CLI · VS Code Copilot · OpenCode · Kiro · Trae · Rovo Dev · Qoder · Pi

---

## License

Apache 2.0. See [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md). Created by [Tcher](https://tcher-designs.vercel.app/)

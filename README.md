# tcher-design

**English** · [ไทย](README.th.md)

A skill you install into your AI coding tool. 27 commands, a 59-rule scanner, and an understanding of Thai typography and UX.

```bash
npx skills add Tcher911/tcher-design --copy
```

Then open your AI tool and type `/tcher init`. (Use `--copy` so the skill lands in your agent's own folder, e.g. `.claude/`. Without it, `npx skills` symlinks through `.agents/` and Claude Code never sees it.)

---

## Features

### Thai typography (`/tcher thai`)

Typography that actually supports Thai: line-height, letter-spacing, and Thai-with-English font pairing.

### SEA and Thai UX (`/tcher sea`)

UI tuned for Thai and SEA users: payment, trust signals, layout density, and mobile-first.

### Detect UX: 59 rules, no AI (`detect`)

Scan the live DOM on a real page. **Design (45)** catches AI and template tells, **UX (14)** catches usability grounded in [Laws of UX](https://lawsofux.com/). Runs in Live mode or as `npx tcher-designs detect`.

### Flows: can the user finish the task? (`/tcher flows`)

Trace a task across screens in the codebase to find dead ends, missing states, orphan routes, and forms that submit into silence, then name what to fix first.

---

## 27 Commands

Every command reads `PRODUCT.md` and `DESIGN.md` first (run `/tcher init` once). Type `/tcher` with no argument and it recommends the next command for your project's state.

**Start a project**

| Command | What it does |
|---|---|
| `/tcher init` | First-time setup. Interviews you, then writes `PRODUCT.md` and `DESIGN.md` that every command reads first. |
| `/tcher document` | Generate `DESIGN.md` from code you already have (when a design exists already). |
| `/tcher extract` | Pull repeated patterns, components, and tokens into a real design system. |
| `/tcher shape` | Plan UX and UI before writing code. |
| `/tcher idea` | Explore design directions from a short brief. |
| `/tcher craft` | Shape, build, and iterate a feature end to end. |

**Review what you have**

| Command | What it does |
|---|---|
| `/tcher critique` | UX review of one surface: hierarchy, clarity, cognitive load, scored. |
| `/tcher audit` | Technical pass: a11y, performance, responsive, anti-patterns. |
| `/tcher flows` | Trace tasks in the code to find dead ends, missing states, orphan pages, broken flows. |

**Sharpen one axis**

| Command | What it does |
|---|---|
| `/tcher typo` | Fix fonts and the type scale. |
| `/tcher palette` | Change the color system. |
| `/tcher layout` | Fix spacing, grids, visual hierarchy. |
| `/tcher animate` | Add purposeful motion, with a reduced-motion path. |
| `/tcher motion` | Add micro-interactions and personality. |
| `/tcher extreme` | Past convention: shaders, spring physics, scroll-driven reveals. |

**Dial the intensity**

| Command | What it does |
|---|---|
| `/tcher brave` | Make a timid design bolder. |
| `/tcher calm` | Tone down a design that is too loud. |
| `/tcher trim` | Cut to only what is needed. |
| `/tcher refine` | Final pass before ship. |

**Make it production-ready**

| Command | What it does |
|---|---|
| `/tcher harden` | Error states, i18n, edge cases, text overflow. |
| `/tcher onboard` | First-run flows, empty states, the path to the first win. |
| `/tcher clarify` | Rewrite labels, error messages, and microcopy so they stop confusing people. |
| `/tcher responsive` | Adapt across devices and contexts, with tap targets that work. |
| `/tcher optimize` | Fix UI performance: load, render, bundle. |

**Localize for Thai and SEA**

| Command | What it does |
|---|---|
| `/tcher thai` | Tune typography to support Thai. |
| `/tcher sea` | Adapt UX for Thai and SEA users. |

**Iterate in the browser**

| Command | What it does |
|---|---|
| `/tcher live` | Pick an element on the page to redesign, with live Hot Swap. |

Want a command as its own shortcut? `/tcher pin audit` makes `/audit` call `/tcher audit`; `/tcher unpin` removes it.

---

## Live Mode

`/tcher live` opens a helper on port 8400 and injects a picker into your running dev server (Vite, Next.js, SvelteKit, Astro, Nuxt, or a static file). Click an element, type a direction like "less SaaS", and the agent hot-swaps variants into the page over HMR. Tune any sliders, then accept; it writes the winner back to source and cleans up. Discard reverts. The same pill bar carries the Detect UX button.

---

## Reference Files

Files that point the AI at the right axes, not one generic "good design" blob:

| Reference | Covers |
|---|---|
| typography | type systems, font pairing, modular scales |
| color-and-contrast | OKLCH, tinted neutrals, dark mode, contrast ratios |
| spatial-design | spacing systems, grids, visual hierarchy |
| motion-design | easing curves, staggering, reduced motion |
| interaction-design | forms, focus states, loading patterns |
| responsive-design | mobile-first, fluid type, container queries |
| ux-writing | button labels, error messages, empty states |

---

## Install

The simplest path is the Vercel skills CLI. Pass `--copy` so the skill lands in your agent's own folder; the default symlink mode routes everything through `.agents/` and skips agents like Claude Code that read their own directory:

```bash
npx skills add Tcher911/tcher-design --copy
```

Or use the tcher CLI, which always writes each agent's own folder, adds `detect`, and lets you target specific tools:

```bash
npx tcher-designs skills install                      # auto-detect your tool, then confirm
npx tcher-designs skills install --providers=claude,cursor
npx tcher-designs skills update                       # update to the latest
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

Apache 2.0. See [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md). Built by [Tcher](https://github.com/Tcher911/tcher-design).

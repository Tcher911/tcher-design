# Repository Guidelines

## Skill bootstrap: skip the post-update-cleanup step

If you load the Tcher skill from `.agents/skills/tcher/SKILL.md` (or any sibling harness directory under this repo), it begins with a `<post-update-cleanup>` block that runs `scripts/cleanup-deprecated.mjs` and then self-deletes. **Do not run it here, and do not delete the block.** This repo is the source of truth for the skill; cleanup-deprecated assumes a consumer project and would touch legitimate source files. The block is regenerated from `skill/SKILL.src.md` on every `bun run build`, so any deletion churns back. Skip it silently and proceed with the task.

## Project Structure & Module Organization

Two shipped components plus tooling:

- `skill/` is the source of truth for the single `tcher` skill (24 commands): `SKILL.src.md`, one `reference/<command>.md` per command plus domain references, runtime `scripts/` (context, pin, the live-* suite, `live-vocabulary.mjs`), and canonical subagent prompts in `agents/`.
- `cli/` is the npm package `tcher-designs`: `bin/` (entry + `skills` subcommands) and `engine/` (detection registry, rules, static/regex engines, the injected browser overlay).
- `scripts/` holds the build orchestrator (`build.js`, with count and prose validators), `build-browser-detector.js`, and the provider transformer factory in `scripts/lib/transformers/`.
- Harness output dirs (`.claude/`, `.cursor/`, `.agents/`, and 9 siblings) plus `plugin/` are **generated but intentionally committed**; refresh them with `bun run build`, never hand-edit. `dist/` is generated output. Tests and fixtures live in `tests/`.
- The old website (`site/`) and Chrome extension (`extension/`) were deleted; do not recreate them or their build steps.

## Build, Test, and Development Commands

- `bun run build` - compile all providers, sync harness dirs + `plugin/`, run count/prose validators.
- `bun run rebuild` - clean and rebuild from scratch.
- `bun run build:browser` - regenerate `cli/engine/detect-antipatterns-browser.js` after engine changes.
- `bun run test` - full default suite (Bun unit tests + Node jsdom fixture tests).
- `bun run test:live-e2e` - opt-in live-mode E2E (~2 min; needs `npx playwright install chromium` once).
- `bun run test:skill-behavior` - opt-in LLM-backed Setup-flow checks (~5 min; claude-sonnet-4-6 / gpt-5.5 / gemini-3.1-flash-lite, roughly $0.50-1.50 per run, needs `.env` keys).

Run `bun run build` after changing anything in `skill/`, transformer code, or user-facing counts. Always use `node` (not `bun`) for the detect CLI and the jsdom fixture suite; Bun's jsdom is slow enough to hang.

## Sandbox gotchas for Codex agents

Some repo workflows need to run outside the sandbox in the desktop app:

- GitHub SSH operations that depend on the 1Password SSH agent, such as `gh pr checkout`, may fail in the sandbox with `sign_and_send_pubkey` or no 1Password approval prompt. Rerun them outside the sandbox instead of falling back to unrelated workarounds.
- `bun run build` rewrites committed harness directories such as `.agents/skills/`. In the sandbox, Bun can hit filesystem errors while removing/recreating those trees (for example `EFAULT` on `.agents/skills`). Rerun the build outside the sandbox before treating it as a real build failure.
- Puppeteer/headless-Chrome tests, especially `node --test tests/detect-antipatterns-browser.test.mjs` and the browser portion of `bun run test`, can hang in the sandbox while launching Chrome. Run them outside the sandbox for authoritative results.
- The jsdom fixture suite is intentionally run with Node, not Bun: use `node --test tests/detect-antipatterns-fixtures.test.mjs` or the `bun run test` script. A direct `bun test tests/detect-antipatterns-fixtures.test.mjs` can time out and is not the supported signal.

## Coding Style & Naming Conventions

Use ESM, semicolons, and the existing two-space indentation style. Prefer small, single-purpose modules over large abstractions. Keep filenames descriptive and lowercase with hyphens where needed; skill entrypoints stay as `SKILL.md`, helper scripts use `.js` or `.mjs`. In source frontmatter, use clear kebab-case names and concise descriptions. There is no dedicated formatter or linter configured here, so match surrounding code closely. Before touching README copy, read `STYLE.md`; the build's prose validator enforces its denylist (em dashes included).

## Testing Guidelines

Tests use Bun's test runner plus Node's built-in `--test`. Name tests `*.test.js` or `*.test.mjs` and place new fixtures near the behavior they cover, usually under `tests/fixtures/`. Prefer targeted test runs while iterating, then finish with `bun run test`. If you change generated outputs or provider transforms, verify both source parsing and at least one affected provider path in `dist/`.

For changes to `skill/scripts/live-*.{mjs,js}`, also run `bun run test:live-e2e` (kept out of the default suite because it does real `npm install` per fixture and boots framework dev servers). Scope to one fixture with `TCHER_E2E_ONLY=<fixture-name>` while iterating; pass `TCHER_E2E_DEBUG=1` for page-DOM and dev-server-log dumps on failure. Schema and authoring guide for new fixtures live in `tests/framework-fixtures/README.md`.

Set `TCHER_E2E_AGENT=llm` to swap the deterministic fake agent for an API-backed one (`tests/live-e2e/agents/llm-agent.mjs`). Claude Haiku 4.5 is the primary path whenever `ANTHROPIC_API_KEY` is set. DeepSeek V4 Flash is the secondary cheap fallback when only `DEEPSEEK_API_KEY` is set, and can be forced with `TCHER_E2E_LLM_PROVIDER=deepseek` or `bun run test:live-e2e -- --llm-provider=deepseek`; override either model via `TCHER_E2E_LLM_MODEL` or `--llm-model=<model>`. Tests skip cleanly when the selected provider key is unset. This path hits the API; use it for verification, not CI.

For changes to `skill/SKILL.src.md`'s Setup section, `skill/scripts/context.mjs`, or any Setup-touching reference file (`init.md`, `document.md`, `brand.md`, `product.md`, sub-command refs), also run `bun run test:skill-behavior`. The suite spawns real LLMs (claude-sonnet-4-6, gpt-5.5, gemini-3.1-flash-lite, all three, every run) with the source SKILL.md inlined as system prompt and a workspace-scoped tool set, then asserts on the tool-call trace. Provider keys live in repo-root `.env`; missing keys skip cleanly. Scope to one provider with `TCHER_SKILL_BEHAVIOR_MODELS=<id>`; add `TCHER_SKILL_BEHAVIOR_VERBOSE=1` to dump per-scenario traces. Baseline and per-scenario assertions live in `tests/skill-behavior/README.md`.

## Anti-pattern detection rules

The engine is modular; `cli/engine/detect-antipatterns.mjs` is just the public facade:

| Where | What lives there |
|---|---|
| `cli/engine/registry/antipatterns.mjs` | `ANTIPATTERNS` (id, category, **severity**, name, description) + `SEVERITY_OVERRIDES` + default loop |
| `cli/engine/rules/checks.mjs` | Pure `checkXxx(opts)` functions + shared/browser/jsdom adapters |
| `cli/engine/engines/static-html/detect-html.mjs` | jsdom-style engine: `STATIC_ELEMENT_RULES` + `runPageCheck` passes |
| `cli/engine/engines/regex/detect-text.mjs` | Source-text passes for non-HTML files |
| `cli/engine/browser/injected/index.mjs` | Browser overlay: element loop, page passes, severity colors, banner + findings popover |
| `cli/engine/detect-antipatterns-browser.js` | GENERATED by `bun run build:browser`; never hand-edit |

Severity tiers drive the overlay colors: `critical` (red), `major` (orange), `minor` (yellow), `advisory` (muted yellow). Defaults: quality rules are major, slop rules are minor; exceptions live in `SEVERITY_OVERRIDES`, and per-entry `severity:` values are never overwritten. The browser bundle generator extracts the registry by regex (array + overrides + loop); a new top-level registry construct must be added to the extractor too or the overlay silently misses it.

TDD order is non-negotiable:

1. Add a fixture at `tests/fixtures/antipatterns/{rule-id}.html` with two columns (should-flag / should-pass), each case identified by a unique heading. ≥4 flag cases and ≥5 false-positive shapes. **Use explicit pixel dimensions in CSS**; jsdom does no layout.
2. Add a failing test in `tests/detect-antipatterns-fixtures.test.mjs` using the snippet-substring pattern (regex `/"([^"]+)"/` against `SHOULD_FLAG` / `SHOULD_PASS` lists). Watch it fail first.
3. Add the rule entry to `ANTIPATTERNS` (`id`, `category` = `slop` or `quality`, `severity` when the category default is wrong, `name`, `description`, optional `skillSection` / `skillGuideline`).
4. Implement a pure `checkXxx(opts)` in `rules/checks.mjs` returning `[{ id, snippet }]`; no DOM access inside.
5. Wire adapters into **both** engines: a `STATIC_ELEMENT_RULES` entry (or `runPageCheck` pass) in `detect-html.mjs`, and a call in the element loop (or page pass) in `browser/injected/index.mjs`. textContent-based checks can share one adapter. Browser-only checks (image load state, real overflow) skip the static side on purpose; say so in a comment. Attach findings to the most specific element so the overlay can outline it and the popover row becomes click-to-jump.
6. Verify in real Chromium: a Playwright probe against a served page (`addScriptTag` the helper's `/detect.js?v=<ts>`, read `.tcher-label` texts, screenshot) is the fastest loop. The two adapter paths can disagree; the fixture test alone is not proof.

Conventions: wrap the identifying heading text in straight double quotes inside snippets so the fixture test can extract it. jsdom helpers `resolveBackground()`, `resolveGradientStops()`, and `parseGradientColors()` exist because `background:` shorthand isn't decomposed and computed colors aren't normalized in jsdom. Reference rules to copy from (all in `rules/checks.mjs`): `side-tab`, `low-contrast`, `icon-tile-stack`, `checkPageTextDOM` (page-text pass), `checkElementBrokenImageDOM` (browser-only).

## Live overlay conventions

- Theme is **tcher-kit mono** (black/white): palette in the `C` constants + `barPaletteForTheme()` in `skill/scripts/live-browser.js`; brand mark from `brand.svg`. On-page marks use brand-black ink + a white halo. Color is reserved for meaning (severity tiers, the sky-blue jump flash, status).
- Live action ids are protocol: each `value` in `skill/scripts/live-vocabulary.mjs` must match its `reference/<value>.md` filename (`value: 'tcher'`, label "Idea", is the deliberate exception). The `freeformPrompt` event field is internal API.
- Renaming a command also means appending the OLD name to `DEPRECATED_NAMES` in `skill/scripts/cleanup-deprecated.mjs`; never rewrite existing old names in that list (it identifies directories to delete on user machines).
- The helper serves `/live.js` and `/detect.js` fresh per request with `Cache-Control: no-store`; keep it that way. Vocabulary changes still need a helper restart.
- DOM traps: never nest a `position: fixed` panel inside the transformed banner (mount on `document.body`), and never put the `tcher-overlay` class on interactive UI (it pauses a reveal animation at opacity 0 and disables pointer events).
- Voice input was removed by product decision; the regression suite asserts no `SpeechRecognition` code ships.

## Commit & Pull Request Guidelines

Recent history favors short, imperative subjects such as `Fix: ...`, `Add ...`, `Improve ...`, or `Bump ...`. Keep commits focused and explain the user-facing impact when it is not obvious. PRs should summarize what changed, list validation performed, and call out regenerated artifacts (harness dirs, `plugin/`, `dist/`). Include a screenshot or Playwright probe output for visible overlay changes, and mention affected providers when transform behavior changes.

## Releases

Tags are per-component because the two components ship independently: `skill-v` (`.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json`) and `cli-v` (`package.json`). Flow: bump the relevant manifest, commit, push, then `bun run release:<skill|cli>` (preview with `node scripts/release.mjs <component> --dry-run`). The script refuses on a dirty tree, an unpushed HEAD, an existing tag, or (for skill) a `bun run build` that produces uncommitted changes. Release notes are a plain `<Label> <version>` header; enrich afterwards with `gh release edit <tag> --notes-file <md>`. Skill releases attach `dist/universal.zip`; the CLI ships to npm via a separate `npm publish` (the package is `tcher-designs`; never publish over the unrelated `tcher` package).

## Contributor Notes

Do not edit generated provider files directly unless you are intentionally patching generated output as part of a build-system change. Prefer fixing the root source in `skill/`, `scripts/`, or `cli/`, then regenerate artifacts.

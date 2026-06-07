# Known issue (hardened): Svelte live bar stuck at `0/0`

Original report: 2026-05-30 (upstream handoff). Hardened: 2026-06-07.
Status: **all known entry paths are now guarded and regression-tested.** Keep this doc until the opt-in Svelte E2E is modernized (see "Remaining work").

---

## Symptom (historical)

After running a live action on a Svelte component, the floating bar showed the CYCLING layout with the counter at `0/0`, every control disabled, and no variant mounted. The bar persisted across reloads.

`0/0` = `visibleVariant=0 / arrivedVariants=0`. Root cause family: Svelte component injection holds a single runtime mount target (no `[data-tcher-variant]` children), so several paths could enter CYCLING while nothing was actually mounted.

## Guards now in place (all in `skill/scripts/live-browser.js`)

1. **Render gate.** `showBar('cycling')` and `updateBarContent('cycling')` both pass through `ensureCyclingRenderable()`; with `arrivedVariants === 0` they refuse to render and call `recoverEmptyCycling()` instead. Empty CYCLING is unrepresentable at the render layer regardless of which upstream path misfires.
2. **Recovery.** `recoverEmptyCycling()` aborts Svelte component sessions via `abortSvelteComponentInjection()` (restores the original element, clears the session, toast, back to PICKING) and falls back to `cleanup()` for non-Svelte sessions.
3. **Orphan wrapper drop.** `resumeSession()` removes a `svelte-component` wrapper whose session does not match the in-memory mount (page reload unmounts every compiled variant), instead of resuming it into an empty bar.
4. **Resume abort (added 2026-06-07).** When the in-memory session DOES match but `mountedVariant` is 0 (initial mount failed or was torn down, e.g. an agent-authored compile error followed by an HMR-triggered resume), `resumeSession()` previously returned "handled" while doing nothing, stranding the bar forever. It now calls `abortSvelteComponentInjection()`.
5. **Params sidecar + abort-on-failure** (earlier fixes): variant params load from `params.json` (Svelte parses `{` in attributes), and `injectSvelteComponentsFromManifest` aborts when the picked element is missing or the first mount throws.

Regression coverage: `tests/live-browser-regression.test.mjs` ("empty variant cycling is unrepresentable") asserts all four guards and that the old silent-return path cannot come back.

## If it ever reproduces again

1. Confirm the served `live.js` is fresh: the helper reads `skill/scripts/live-browser.js` per request, but the tab caches per page load. Reload the page; check the loaded script for `recoverEmptyCycling`.
2. Capture the console during generation: look for `[tcher] Failed to mount Svelte variant N` and `[tcher] Refusing to render empty variant cycling state: <reason>`. The reason string names the entry path.
3. Read the agent-authored `src/lib/tcher/<id>/vN.svelte`; an invalid component means the `live.md` authoring contract needs tightening, not the browser.
4. Reset a stuck page: clear `tcher-live*` localStorage keys, remove `.tcher/live/sessions/*` and stale `src/lib/tcher/<id>/` dirs, restart the helper.

## Repro environment

The original repro lived in the upstream developer's `~/tcher-live-svelte` (not in this machine/repo): a SvelteKit app with a stateful expense row, where generating variants must not reset component state or render raw `{expressions}`. To rebuild one: any SvelteKit app + a component holding client state, then run the live flow against that element.

## Remaining work

The opt-in Svelte live E2E (`tests/live-e2e.test.mjs`, see `sourceShadowTargetFor` and the "source-shadow preview handled" assertions) still models the OLD source-shadow preview for `.svelte` fixtures rather than component injection. The default-suite fixtures pass, but the opt-in suite should be migrated to the component-injection model before trusting it as the safety net for this feature.

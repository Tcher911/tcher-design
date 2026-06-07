/**
 * Command category data shared by the build transformers.
 *
 * This file used to also build the data model for the website's sub-page
 * generators; that was removed along with the website. What remains is the
 * hand-curated category map and ordering used by transformers/factory.js.
 */

/**
 * Hand-curated category map for user-invocable skills.
 * Validated in factory.js: the build fails if any user-invocable skill is
 * missing from this map.
 */
export const SKILL_CATEGORIES = {
  // CREATE - build something new
  tcher: 'create',
  craft: 'create',
  shape: 'create',
  // EVALUATE - review and assess
  critique: 'evaluate',
  audit: 'evaluate',
  // REFINE - improve existing design
  typeset: 'refine',
  layout: 'refine',
  colorize: 'refine',
  animate: 'refine',
  delight: 'refine',
  bolder: 'refine',
  quieter: 'refine',
  overdrive: 'refine',
  // SIMPLIFY - reduce and clarify
  distill: 'simplify',
  clarify: 'simplify',
  adapt: 'simplify',
  // HARDEN - production-ready
  polish: 'harden',
  optimize: 'harden',
  harden: 'harden',
  onboard: 'harden',
  // SYSTEM - setup and tooling
  init: 'system',
  document: 'system',
  extract: 'system',
  live: 'system',
};

export const CATEGORY_ORDER = ['create', 'evaluate', 'refine', 'simplify', 'harden', 'system'];

export const CATEGORY_LABELS = {
  create: 'Create',
  evaluate: 'Evaluate',
  refine: 'Refine',
  simplify: 'Simplify',
  harden: 'Harden',
  system: 'System',
};

export const CATEGORY_DESCRIPTIONS = {
  create: 'Build something new, from a blank page to a working feature.',
  evaluate: 'Review what you have. Score it, critique it, find what to fix.',
  refine: 'Improve one dimension at a time: type, layout, color, motion.',
  simplify: 'Strip complexity. Remove what does not earn its place.',
  harden: 'Make it production-ready. Edge cases, performance, polish.',
  system: 'Setup and tooling. Design system work, extraction, organization.',
};

# Implementation Plan

## Current Project State

This is a small static p5.js double-pendulum visualization. The app runs directly from `index.html`, loads vendored browser dependencies from `libraries/`, and keeps all project logic in `sketch.js` and `pendulum.js`. There is no package manifest, build step, automated test setup, formatting configuration, or deployment documentation beyond the live demo link in `README.md`.

Recent local additions include `AGENTS.md` and `.gitignore`. The current `.gitignore` ignores `AGENTS.md` and `docs/`, which conflicts with keeping contributor and planning documentation in version control.

## Strengths

- The project has a simple, approachable structure.
- The visualization is immediately runnable in a browser without setup.
- Core behavior is easy to locate: pendulum rendering in `pendulum.js`, sketch lifecycle and controls in `sketch.js`.
- Dependencies are vendored, so the demo is not blocked by package installation.
- The current UI already exposes meaningful controls for rod length, mass, gravity, trace visibility, randomized starts, and reset.

## Gaps to Portfolio-Ready Quality

- `README.md` is too minimal for a portfolio viewer or contributor.
- No documented local development or demo verification workflow.
- No automated checks for formatting, regressions, or basic browser loading.
- Physics, rendering, state management, and UI wiring are tightly coupled in `sketch.js`.
- There are unused or inconsistent state fields, such as unused coordinate globals and `acceleration` versus `acc`.
- `index.html` uses Windows-style script paths and minimal metadata.
- The UI is functional but visually sparse and not presented as a polished portfolio project.
- Error handling is implicit; missing libraries or canvas/runtime failures are not surfaced.
- Deployment expectations are not documented.

## Prioritized Improvements

### High Priority

- Fix repository hygiene so documentation files can be tracked.
- Expand `README.md` with project purpose, screenshot/demo, controls, local run instructions, and implementation notes.
- Clean obvious code quality issues without changing behavior.
- Improve `index.html` portability, metadata, and loading order clarity.
- Add a lightweight manual QA checklist.

### Medium Priority

- Separate physics calculation, simulation state, and rendering/UI responsibilities.
- Add basic automated checks with a minimal JavaScript toolchain.
- Add browser smoke tests for page load, canvas creation, and control availability.
- Improve resize handling and reset behavior.
- Polish the visual presentation and controls for a portfolio viewer.

### Low Priority

- Add optional presets or scenario examples.
- Add performance instrumentation or FPS display.
- Add project screenshots or short demo media.
- Add GitHub Pages deployment documentation or workflow validation.

## `/goal` Execution Steps

### `/goal` 1: Fix Repository Hygiene

**Objective:**
Make documentation and contributor guidance trackable while keeping generated and local-only files ignored.

**Likely files/areas:**
`.gitignore`, `AGENTS.md`, `docs/`

**Tasks:**

* Remove ignore rules that hide `AGENTS.md` and `docs/`.
* Keep ignores for OS files, editor folders, logs, dependencies, and generated output.
* Verify `git status --short` shows intended documentation files.

**Acceptance criteria:**

* `AGENTS.md` and `docs/implementation-plan.md` are visible to Git.
* `.gitignore` still excludes local noise such as `node_modules/`, logs, and env files.

### `/goal` 2: Improve README for Portfolio Viewers

**Objective:**
Turn the README into a useful project landing page.

**Likely files/areas:**
`README.md`

**Tasks:**

* Add a concise project description and what the demo demonstrates.
* Document controls and expected interactions.
* Add local run instructions for direct browser use and `python -m http.server 8000`.
* Add a short technology section for p5.js and ControlKit.
* Keep the live demo link prominent.

**Acceptance criteria:**

* A new visitor can understand, run, and evaluate the project from the README alone.
* README includes demo, setup, controls, and project structure notes.

### `/goal` 3: Clean HTML Entry Point

**Objective:**
Make the static entry point portable, valid, and more polished.

**Likely files/areas:**
`index.html`

**Tasks:**

* Replace backslash script paths with forward slashes.
* Add viewport metadata.
* Add a small fallback message for users without JavaScript.
* Keep dependency loading order intact.

**Acceptance criteria:**

* The app still loads in a browser.
* Script paths work consistently on local servers and GitHub Pages.
* Page metadata is appropriate for desktop and mobile browsers.

### `/goal` 4: Remove Obvious Code Smells

**Objective:**
Improve readability without changing simulation behavior.

**Likely files/areas:**
`sketch.js`, `pendulum.js`

**Tasks:**

* Remove unused globals such as `x1`, `y1`, `x2`, and `y2`.
* Align acceleration naming between `Pendulum` and `sketch.js`.
* Add braces around single-line conditionals.
* Normalize spacing around operators and object literals.

**Acceptance criteria:**

* The sketch behaves the same before and after cleanup.
* Source is easier to read and has no obvious unused variables.

### `/goal` 5: Document Manual QA Workflow

**Objective:**
Create a repeatable verification checklist for visual and physics changes.

**Likely files/areas:**
`docs/qa-checklist.md`, `README.md`

**Tasks:**

* Add checks for page load, canvas fill, animation, sliders, checkboxes, reset, and browser console errors.
* Link the checklist from the README.
* Include desktop and mobile viewport checks.

**Acceptance criteria:**

* Contributors have a clear manual test path.
* The checklist covers the current interactive surface.

### `/goal` 6: Add Lightweight Tooling

**Objective:**
Introduce minimal project commands for consistency and future tests.

**Likely files/areas:**
`package.json`, optional formatter or lint config

**Tasks:**

* Add a minimal `package.json`.
* Add commands for formatting or linting if the selected tool is lightweight.
* Avoid adding a bundler unless needed.

**Acceptance criteria:**

* `npm` scripts are documented in README.
* Tooling does not change how the static app is served.

### `/goal` 7: Add Browser Smoke Test

**Objective:**
Catch basic runtime regressions automatically.

**Likely files/areas:**
`tests/`, `package.json`, `index.html`, source files

**Tasks:**

* Add a simple browser smoke test using a lightweight runner.
* Verify the page loads without console errors.
* Verify a canvas is created.
* Verify the ControlKit panel appears.

**Acceptance criteria:**

* A single documented command runs the smoke test.
* The test fails on missing scripts or basic startup errors.

### `/goal` 8: Separate Simulation Responsibilities

**Objective:**
Make the code easier to explain and evolve.

**Likely files/areas:**
`sketch.js`, `pendulum.js`, possibly new source files

**Tasks:**

* Extract acceleration calculation into a named function.
* Keep drawing methods separate from physics updates.
* Keep UI callback logic small and explicit.
* Preserve current visual behavior.

**Acceptance criteria:**

* The main `draw()` flow is shorter and easier to scan.
* Physics calculation can be reviewed independently.
* Existing controls and reset behavior still work.

### `/goal` 9: Improve Resize and Reset Robustness

**Objective:**
Handle common browser interactions more gracefully.

**Likely files/areas:**
`sketch.js`, `pendulum.js`

**Tasks:**

* Add or improve `windowResized()` behavior.
* Recreate the trace buffer when canvas dimensions change.
* Ensure reset clears stale trace state and preserves selected settings.

**Acceptance criteria:**

* Resizing the browser does not distort or break the canvas.
* Reset behavior is predictable after slider and checkbox changes.

### `/goal` 10: Polish UI and Visual Presentation

**Objective:**
Make the demo feel intentional and portfolio-ready without overbuilding it.

**Likely files/areas:**
`index.html`, `sketch.js`, optional CSS file

**Tasks:**

* Add a restrained title or overlay that does not obstruct the simulation.
* Improve contrast, spacing, and control labeling.
* Consider a small pause/resume or clear-trace control if it fits the existing UI.

**Acceptance criteria:**

* The first screen clearly communicates the project.
* Controls remain usable and the animation stays the focus.
* No text or UI overlaps at common desktop and mobile widths.

### `/goal` 11: Add Error Handling and Fallbacks

**Objective:**
Make startup failures easier to understand.

**Likely files/areas:**
`index.html`, `sketch.js`

**Tasks:**

* Add a visible fallback for disabled JavaScript.
* Add a small runtime guard or console message if expected libraries are unavailable.
* Keep failure handling simple and browser-native.

**Acceptance criteria:**

* Missing dependencies produce a useful signal instead of a blank page only.
* Normal successful startup remains unchanged.

### `/goal` 12: Document Deployment and Demo Maintenance

**Objective:**
Make it clear how the live demo is published and verified.

**Likely files/areas:**
`README.md`, `docs/deployment.md`

**Tasks:**

* Document the current GitHub Pages demo URL.
* Add steps to verify a deployed demo after changes.
* Note that the project is static and requires no build output.

**Acceptance criteria:**

* A maintainer can update and verify the live demo from documentation.
* Deployment docs match the actual static project structure.

### `/goal` 13: Final Portfolio Presentation Pass

**Objective:**
Package the project as a polished portfolio entry.

**Likely files/areas:**
`README.md`, `docs/`, screenshots or media assets

**Tasks:**

* Add final screenshots or a short demo GIF if appropriate.
* Add a concise "What I learned" or implementation highlights section.
* Verify README, docs, local run, tests, and live demo links.

**Acceptance criteria:**

* The repository reads as maintained and understandable.
* A portfolio reviewer can see the outcome, run it, and understand the technical work quickly.

# Repository Guidelines

## Project Structure & Module Organization

This repository is a static p5.js double-pendulum visualization. The app is loaded directly from `index.html`.

- `sketch.js` contains the p5 lifecycle (`setup`, `draw`), physics calculations, drawing buffer, and ControlKit UI wiring.
- `pendulum.js` defines the `Pendulum` class used by the sketch.
- `libraries/` stores vendored browser dependencies: `p5.js` and `controlKit.min.js`.
- `README.md` contains the project summary and live demo link.

There is no build output directory, package manifest, or automated test folder in the current project.

## Build, Test, and Development Commands

No dependency install or build step is required. Open `index.html` in a browser to run the sketch.

Useful local commands:

- `python -m http.server 8000` serves the repository at `http://localhost:8000/` if a browser blocks direct file loading.
- `git status --short` checks the working tree before and after edits.
- `git log --oneline -5` reviews recent commit style.

When changing rendering or physics, validate manually in the browser: the canvas should fill the window, the pendulum should animate, sliders should update length/mass/gravity, reset should restart the trace, and checkboxes should toggle their behavior.

## Coding Style & Naming Conventions

Use plain browser JavaScript compatible with the included p5.js runtime. Keep the existing 4-space indentation style. Prefer descriptive camelCase names for variables and functions, as in `createControlKit`, `showLines`, and `randomAngle`. Class names use PascalCase, as in `Pendulum`.

Keep physics state changes easy to follow. Avoid introducing a framework, bundler, or package manager unless the project explicitly needs one. If you add external libraries, place them under `libraries/` and document why they are needed.

## Testing Guidelines

There is no automated test framework configured. For now, use focused manual testing in a browser. Check console output for JavaScript errors after every change. For physics changes, test several slider values and reset states because small equation edits can produce unstable or frozen motion.

If automated tests are introduced later, keep them lightweight and document the exact command here.

## Commit & Pull Request Guidelines

The current history uses short, simple messages such as `v1.0` and `updating readme`. Keep new commit messages concise and descriptive, for example `fix reset trace handling` or `document local run workflow`.

Pull requests should include a short description, the files changed, and the manual browser checks performed. Include a screenshot or screen recording when the visual output changes.

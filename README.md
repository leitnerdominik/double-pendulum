# Double Pendulum

An interactive browser visualization of a double pendulum built with p5.js. The demo shows chaotic pendulum motion, draws the trailing path of the second mass, and lets you adjust simulation parameters while it runs.

![double pendulum](https://user-images.githubusercontent.com/15259978/40798706-fc652c4e-650b-11e8-937e-da5cd85aee43.png)

## Live Demo

[Open the double pendulum demo](https://leitnerdominik.github.io/double-pendulum/)

## What You Can Control

- `rod-1` and `rod-2`: adjust the lengths of the first and second pendulum arms.
- `mass-1` and `mass-2`: adjust each pendulum mass.
- `gravity`: increase or decrease the acceleration applied to the simulation.
- `show lines`: toggle the trail drawn by the second pendulum.
- `random start`: use random starting angles on the next reset.
- `reset`: restart the simulation and clear the trail.

Expected behavior: the canvas fills the browser window, the pendulum animates continuously, and control changes take effect immediately unless noted above.

## Run Locally

No install or build step is required. This is a static browser project.

Open `index.html` directly in a browser, or serve the project from the repository root:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000/`.

If you prefer the npm script wrapper:

```sh
npm start
```

This runs the same local static server command.

## Project Commands

```sh
npm run check
```

Checks `pendulum.js` and `sketch.js` for JavaScript syntax errors with Node.

```sh
npm run lint
npm test
```

Both currently run the same syntax check. They are intentionally lightweight placeholders for future linting or automated tests.

## Project Structure

```text
index.html              Browser entry point
sketch.js               p5.js setup, draw loop, physics, and UI wiring
pendulum.js             Pendulum class for position updates and rendering
libraries/              Vendored p5.js and ControlKit dependencies
docs/                   Project planning and maintenance notes
AGENTS.md               Contributor guide for future agents and maintainers
```

## Technology

- [p5.js](https://p5js.org/) powers the canvas, animation loop, drawing primitives, and vector math.
- ControlKit provides the on-screen sliders, checkboxes, and reset button.
- The project intentionally stays static: no framework, bundler, package manager, or backend is required.

## Development Notes

After changes, verify the page in a browser and check the console for errors. Test animation startup, slider changes, trace toggling, random starts, reset behavior, and window resizing.

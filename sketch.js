let pendulum1;
let pendulum2;

let prevPos;

let gravity = 1;

let buffer;
let center;

let controlKit;
let data;

function setup() {
    if (!canStartSketch()) {
        if (typeof noLoop === 'function') {
            noLoop();
        }

        return;
    }

    createCanvas(windowWidth, windowHeight);

    center = createVector(width / 2, height / 2);

    init();

    data = {
        sliderLen1: {
            value: pendulum1.len,
            range: [10, 200]
        },
        sliderLen2: {
            value: pendulum2.len,
            range: [10, 200]
        },
        sliderMass1: {
            value: pendulum1.mass,
            range: [5, 100]
        },
        sliderMass2: {
            value: pendulum2.mass,
            range: [5, 100]
        },
        gravity: {
            value: gravity,
            range: [1, 20]
        },
        showLines: true,
        randomAngle: false,
        paused: false
    };

    createControlKit();
}

function canStartSketch() {
    const missing = [];

    if (typeof createCanvas !== 'function' || typeof createVector !== 'function') {
        missing.push('p5.js');
    }

    if (typeof ControlKit !== 'function') {
        missing.push('ControlKit');
    }

    if (typeof Pendulum !== 'function') {
        missing.push('pendulum.js');
    }

    if (typeof calculateAccelerations !== 'function') {
        missing.push('physics.js');
    }

    if (missing.length === 0) {
        return true;
    }

    showStartupError(`The demo could not start because ${missing.join(', ')} did not load.`);
    return false;
}

function showStartupError(message) {
    console.error(message);

    const target = document.getElementById('startup-error');

    if (target) {
        target.textContent = message;
        target.classList.add('is-visible');
    }
}

function draw() {
    background(0);
    imageMode(CORNER);

    drawTrailBuffer();
    if (!data.paused) {
        updateAccelerations();
    }

    updatePendulumPositions();
    drawPendulums();

    if (!data.paused) {
        advancePendulums();
        drawCurrentTrail();
    }
}

function drawTrailBuffer() {
    if (data.showLines) {
        image(buffer, 0, 0, width, height);
    }
}

function updateAccelerations() {
    const accelerations = calculateAccelerations(pendulum1, pendulum2, gravity);

    pendulum1.acc = accelerations.first;
    pendulum2.acc = accelerations.second;
}

function updatePendulumPositions() {
    pendulum2.linePos = pendulum1.pos;

    translate(center.x, center.y);
    pendulum1.update();
    pendulum2.update(pendulum1.pos);
}

function drawPendulums() {
    pendulum1.show();
    pendulum2.show();
}

function advancePendulums() {
    pendulum1.vel += pendulum1.acc;
    pendulum2.vel += pendulum2.acc;

    pendulum1.angle += pendulum1.vel;
    pendulum2.angle += pendulum2.vel;
}

function drawCurrentTrail() {
    buffer.stroke(255, 255, 255, 70);

    if (prevPos.x !== -1) {
        buffer.line(prevPos.x, prevPos.y, pendulum2.pos.x, pendulum2.pos.y);
    }

    prevPos.x = pendulum2.pos.x;
    prevPos.y = pendulum2.pos.y;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    center = createVector(width / 2, height / 2);
    resetTrailBuffer();
}

function init() {
    if (data) {
        pendulum1 = new Pendulum(data.randomAngle);
        pendulum2 = new Pendulum(data.randomAngle);
        applySelectedSettings();
    } else {
        pendulum1 = new Pendulum();
        pendulum2 = new Pendulum();
    }

    resetTrailBuffer();
}

function applySelectedSettings() {
    pendulum1.len = data.sliderLen1.value;
    pendulum2.len = data.sliderLen2.value;
    pendulum1.mass = data.sliderMass1.value;
    pendulum2.mass = data.sliderMass2.value;
    gravity = data.gravity.value;
}

function resetTrailBuffer() {
    prevPos = createVector(-1, -1);

    buffer = createGraphics(width, height);
    buffer.background(0);
    buffer.translate(center.x, center.y);
}

function togglePaused() {
    data.paused = !data.paused;
}

let createControlKit = () => {
    if (typeof ControlKit !== 'function') {
        showStartupError('The controls could not start because ControlKit did not load.');
        return;
    }

    controlKit = new ControlKit();

    controlKit
        .addPanel({
            fixed: true,
            width: 250
        })
        .addSlider(data.sliderLen1, 'value', 'range', {
            dp: 0,
            label: 'rod 1 length',
            onChange: () => {
                pendulum1.len = data.sliderLen1.value;
            }
        })
        .addSlider(data.sliderLen2, 'value', 'range', {
            dp: 0,
            label: 'rod 2 length',
            onChange: () => {
                pendulum2.len = data.sliderLen2.value;
            }
        })
        .addSlider(data.sliderMass1, 'value', 'range', {
            dp: 0,
            label: 'mass 1',
            onChange: () => {
                pendulum1.mass = data.sliderMass1.value;
            }
        })
        .addSlider(data.sliderMass2, 'value', 'range', {
            dp: 0,
            label: 'mass 2',
            onChange: () => {
                pendulum2.mass = data.sliderMass2.value;
            }
        })
        .addSlider(data.gravity, 'value', 'range', {
            dp: 0,
            label: 'gravity',
            onChange: () => {
                gravity = data.gravity.value;
            }
        })
        .addCheckbox(data, 'showLines', {
            label: 'show trace',
            onChange: () => {
                return !data.showLines;
            }
        })
        .addCheckbox(data, 'randomAngle', {
            label: 'random start',
            onChange: () => {
                return !data.randomAngle;
            }
        })
        .addButton('reset', init)
        .addButton('pause / resume', togglePaused)
        .addButton('clear trace', resetTrailBuffer);
};

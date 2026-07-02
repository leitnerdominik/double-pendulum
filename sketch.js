let pendulum1;
let pendulum2;

let numP1_1,
    numP1_2;
let numP2_1,
    numP2_2;

let prevPos;

let gravity = 1;

let buffer;
let center;

let controlKit;
let data;

function setup() {
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
        randomAngle: false
    };

    createControlKit();
}

function draw() {
    background(0);
    imageMode(CORNER);

    if (data.showLines) {
        image(buffer, 0, 0, width, height);
    }

    numP1_1 = -gravity * (2 * pendulum1.mass + pendulum2.mass) * sin(pendulum1.angle) -
               pendulum2.mass * gravity * sin(pendulum1.angle - 2 * pendulum2.angle) -
               2 * sin(pendulum1.angle - pendulum2.angle) * pendulum2.mass *
               (Math.pow(pendulum2.vel, 2) * pendulum2.len +
                Math.pow(pendulum1.vel, 2) * pendulum1.len *
                cos(pendulum1.angle - pendulum2.angle));
    numP1_2 = pendulum1.len * (2 * pendulum1.mass + pendulum2.mass -
              pendulum2.mass * cos(2 * pendulum1.angle - 2 * pendulum2.angle));

    pendulum1.acc = numP1_1 / numP1_2;

    numP2_1 = 2 * sin(pendulum1.angle - pendulum2.angle) *
              (Math.pow(pendulum1.vel, 2) * pendulum1.len * (pendulum1.mass + pendulum2.mass) +
               gravity * (pendulum1.mass + pendulum2.mass) * cos(pendulum1.angle) +
               Math.pow(pendulum2.vel, 2) * pendulum2.len * pendulum2.mass *
               cos(pendulum1.angle - pendulum2.angle));
    numP2_2 = pendulum2.len * (2 * pendulum1.mass + pendulum2.mass - pendulum2.mass *
               cos(2 * pendulum1.angle - 2 * pendulum2.angle));

    pendulum2.acc = numP2_1 / numP2_2;

    pendulum2.linePos = pendulum1.pos;

    translate(center.x, center.y);
    pendulum1.update();
    pendulum2.update(pendulum1.pos);

    pendulum1.show();
    pendulum2.show();

    pendulum1.vel += pendulum1.acc;
    pendulum2.vel += pendulum2.acc;

    pendulum1.angle += pendulum1.vel;
    pendulum2.angle += pendulum2.vel;

    buffer.stroke(255, 255, 255, 70);

    if (prevPos.x !== -1) {
        buffer.line(prevPos.x, prevPos.y, pendulum2.pos.x, pendulum2.pos.y);
    }

    prevPos.x = pendulum2.pos.x;
    prevPos.y = pendulum2.pos.y;
}

function init() {
    if (data) {
        pendulum1 = new Pendulum(data.randomAngle);
        pendulum2 = new Pendulum(data.randomAngle);
    } else {
        pendulum1 = new Pendulum();
        pendulum2 = new Pendulum();
    }

    prevPos = createVector(-1, -1);

    buffer = createGraphics(width, height);
    buffer.background(0);
    buffer.translate(center.x, center.y);
}

let createControlKit = () => {
    controlKit = new ControlKit();

    controlKit
        .addPanel({
            fixed: true,
            width: 250
        })
        .addSlider(data.sliderLen1, 'value', 'range', {
            dp: 0,
            label: 'rod-1',
            onChange: () => {
                pendulum1.len = data.sliderLen1.value;
            }
        })
        .addSlider(data.sliderLen2, 'value', 'range', {
            dp: 0,
            label: 'rod-2',
            onChange: () => {
                pendulum2.len = data.sliderLen2.value;
            }
        })
        .addSlider(data.sliderMass1, 'value', 'range', {
            dp: 0,
            label: 'mass-1',
            onChange: () => {
                pendulum1.mass = data.sliderMass1.value;
            }
        })
        .addSlider(data.sliderMass2, 'value', 'range', {
            dp: 0,
            label: 'mass-2',
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
            label: 'show lines',
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
        .addButton('reset', init);
};

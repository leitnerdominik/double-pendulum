class Pendulum {
    constructor(randomAngle) {
        this.len = 125;
        this.angle = randomAngle ? random(TWO_PI) : PI / 2;
        this.mass = 30;
        this.vel = 0;
        this.acc = 0;

        this.linePos = createVector(0, 0);

        this.update();
    }

    update(prevPen) {
        if (prevPen) {
            this.pos = createVector(prevPen.x + this.len * sin(this.angle), prevPen.y + this.len * cos(this.angle));
        } else {
            this.pos = createVector(this.len * sin(this.angle), this.len * cos(this.angle));
        }
    }

    show() {
        fill(255);
        strokeWeight(2);
        stroke(255);
        line(this.linePos.x, this.linePos.y, this.pos.x, this.pos.y);
        ellipse(this.pos.x, this.pos.y, this.mass);
    }
}

import Body from "../core/Body";
import DNA from "../core/DNA";
import Vector from "../core/Vector";
import globalState from "../configs/state";

export default class Rocket extends Body {
    constructor(dna) {
        const size = { width: 8, height: 14 };
        const position = new Vector(
            globalState.screen.width / 2 - size.width / 2,
            globalState.screen.height - size.height
        );
        super(position, size, "#fff");

        this.dna = dna || new DNA();
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.hitType = null;
        this.fitness = 0;
    }

    _applyForce(force) {
        this.acceleration.add(force);
    }

    _checkCollision() {
        this._checkBarrierHit();
        this._checkWallHit();
        this._checkTargetHit();
    }

    _checkBarrierHit() {
        globalState.barriers.forEach(barrier => {
            if (
                this.position.x > barrier.position.x &&
                this.position.x < barrier.position.x + barrier.size.width &&
                this.position.y < barrier.position.y + barrier.size.height &&
                this.position.y > barrier.position.y
            ) {
                this.hitType = "BARRIER";
            }
        });
    }

    _checkTargetHit() {
        if (
            this.position.x > globalState.target.position.x &&
            this.position.x < globalState.target.position.x + globalState.target.size.width &&
            this.position.y < globalState.target.position.y + globalState.target.size.height &&
            this.position.y > globalState.target.position.y
        ) {
            this.hitType = "TARGET";
        }
    }

    _checkWallHit() {
        if (
            this.position.x < 0 ||
            this.position.x > globalState.screen.width ||
            this.position.y < 0 ||
            this.position.y + this.size.width > globalState.screen.height
        ) {
            this.hitType = "WALL";
        }
    }

    _isBarrierHitSide() {
        let isBarrierHitSide = false;

        globalState.barriers.forEach(barrier => {
            if (
                this.position.x > barrier.position.x &&
                this.position.x < barrier.position.x + barrier.size.width &&
                this.position.y < barrier.position.y + barrier.size.height &&
                this.position.y > barrier.position.y
            ) {
                if (
                    this.position.x > barrier.position.x + 10 &&
                    this.position.x < this.position.x + barrier.size.width - 10
                ) {
                    isBarrierHitSide = false;
                } else {
                    isBarrierHitSide = true;
                }
            }
        });

        return isBarrierHitSide;
    }

    _move() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.multiplyBy(0);
    }

    _show() {
        Body.canvas.ctx.save();
        Body.canvas.ctx.translate(this.position.x, this.position.y);
        Body.canvas.ctx.rotate((this.velocity.getAngle() + 90) * Math.PI / 180);

        Body.canvas.ctx.beginPath();
        Body.canvas.ctx.moveTo(0, 0);
        Body.canvas.ctx.lineTo(-this.size.width / 2, this.size.height);
        Body.canvas.ctx.lineTo(this.size.width / 2, this.size.height);
        Body.canvas.ctx.closePath();

        Body.canvas.ctx.lineWidth = 1;
        Body.canvas.ctx.strokeStyle = this.color;
        Body.canvas.ctx.stroke();
        Body.canvas.ctx.restore();
    }

    _update() {
        if (!this.hitType) {
            this._applyForce(this.dna.genes[globalState.frame].acceleration);
            this._move();
            this._checkCollision();
        }
    }

    calculateFitness(maxDistance) {
        this.fitness = (maxDistance - this.getDistance()) / maxDistance * 100 + 1;

        if (this.hitType === "TARGET") {
            this.fitness *= 5;
        }

        if (this.hitType === "BARRIER") {
            if (!this._isBarrierHitSide()) {
                this.fitness /= 2;
            }
        }

        if (this.hitType === "WALL" && this.position.y > globalState.screen.height / 3) {
            this.fitness /= 1.1;
        }
    }

    draw() {
        this._update();
        this._show();
    }

    getDistance() {
        return this.position.distance(globalState.target.position);
    }
}

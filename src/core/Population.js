import Rocket from "../core/Rocket";

export default class Population {
    constructor(size) {
        this.pool = [];
        this.size = size;
        this.rockets = this._getRockets();
    }

    _calculateFitness(maxDistance) {
        this.rockets.forEach(rocket => {
            rocket.calculateFitness(maxDistance);
        });
    }

    _fillPool() {
        this.pool = [];

        this.rockets.forEach(rocket => {
            for (let i = 0; i < rocket.fitness; i++) {
                this.pool.push(rocket);
            }
        });
    }

    _getMaxDistance() {
        let maxDistance = 0;

        this.rockets.forEach(rocket => {
            if (rocket.getDistance() > maxDistance) {
                maxDistance = rocket.getDistance();
            }
        });

        return maxDistance;
    }

    _getRandomParent() {
        const randomIndex = Math.floor(Math.random() * this.pool.length);
        return this.pool[randomIndex];
    }

    _getRockets() {
        const rockets = [];

        for (let i = 0; i < this.size; i++) {
            rockets.push(new Rocket());
        }

        return rockets;
    }

    _selection() {
        const nextGeneration = [];

        this.rockets.forEach(rocket => {
            const parentA = this._getRandomParent().dna;
            const parentB = this._getRandomParent().dna;
            const childDna = parentA.getChild(parentB);

            nextGeneration.push(new Rocket(childDna));
        });

        this.rockets = nextGeneration;
    }

    breed() {
        const maxDistance = this._getMaxDistance();

        this._calculateFitness(maxDistance);
        this._fillPool();
        this._selection();
    }

    draw() {
        this.rockets.forEach(rocket => {
            rocket.draw();
        });
    }
}

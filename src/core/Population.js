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
        const fittestRating = this._getFittestRating();
        this.pool = [];

        this.rockets.forEach(rocket => {
            if (rocket.fitness / fittestRating > 0.2) {
                if (rocket.fitness / fittestRating > 0.98) {
                    rocket.fitness *= 10;
                }

                for (let i = 0; i < rocket.fitness; i++) {
                    this.pool.push(rocket);
                }
            }
        });
    }

    _getFittestRating() {
        let fittestRating = 0;

        this.rockets.forEach(rocket => {
            if (rocket.fitness > fittestRating) {
                fittestRating = rocket.fitness;
            }
        });

        return fittestRating;
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

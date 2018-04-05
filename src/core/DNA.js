import Vector from "../core/Vector";
import globalState from "../configs/state";

export default class DNA {
    constructor(genes) {
        this.genes = genes || this._getRandomGenes();
    }

    _getRandomGene() {
        const acceleration = new Vector();
        acceleration.multiplyBy(1.5);

        return { acceleration };
    }

    _getRandomGenes() {
        const genes = [];

        for (let i = 0; i < globalState.maxFrames; i++) {
            genes.push(this._getRandomGene());
        }

        return genes;
    }

    _isMutated() {
        return Math.random() < 0.05;
    }

    getChild(partner) {
        const genes = [];
        const midPoint = Math.floor(Math.random() * this.genes.length);

        for (let i = 0; i < globalState.maxFrames; i++) {
            if (this._isMutated()) {
                genes.push(this._getRandomGene());
            } else {
                if (i < midPoint) {
                    genes.push(this.genes[i]);
                } else {
                    genes.push(partner.genes[i]);
                }
            }
        }

        return new DNA(genes);
    }
}

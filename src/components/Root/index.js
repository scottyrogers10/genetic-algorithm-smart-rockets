import React, { Component } from "react";
import Body from "../../core/Body";
import Population from "../../core/Population";
import globalState from "../../configs/state";
import styles from "./styles";

class Root extends Component {
    constructor() {
        super();

        this.population = new Population(globalState.rocketCount);

        this.state = {
            generationCount: 0
        };
    }

    _draw() {
        Body.canvas.ctx.clearRect(0, 0, globalState.screen.width, globalState.screen.height);
        this._drawTarget(globalState.target);
        this._drawBarriers(globalState.barriers);
        this._drawPopulation(this.population);
    }

    _drawBarriers(barriers) {
        barriers.forEach(barrier => {
            barrier.draw();
        });
    }

    _drawPopulation(population) {
        population.draw();
    }

    _drawTarget(target) {
        target.draw();
    }

    _init() {
        this._setCanvas();
        this._run();
    }

    _run() {
        const loop = () => {
            requestAnimationFrame(loop);
            if (globalState.frame < globalState.maxFrames) {
                this._draw();
                globalState.frame++;
            } else {
                this.population.breed();
                globalState.frame = 0;
                this.setState(prevState => {
                    return {
                        generationCount: prevState.generationCount + 1
                    };
                });
            }
        };

        loop();
    }

    _setCanvas() {
        const elem = document.getElementById("canvas");
        const ctx = elem.getContext("2d");
        Body.canvas = { elem, ctx };
    }

    componentDidMount() {
        this._init();
    }

    render() {
        return (
            <div style={{ ...styles.container, ...this.props.style }}>
                <div style={styles.canvasContainer}>
                    <canvas
                        id={"canvas"}
                        style={styles.canvas}
                        height={globalState.screen.height}
                        width={globalState.screen.width}
                    />
                </div>
                <div style={styles.statContainer}>
                    <div>{`Generation: ${this.state.generationCount}`}</div>
                </div>
            </div>
        );
    }
}

export default Root;

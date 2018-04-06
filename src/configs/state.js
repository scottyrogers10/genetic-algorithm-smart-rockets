import Barrier from "../core/Barrier";
import Target from "../core/Target";

let frame = 0;

const screen = {
    width: 600,
    height: 600
};

const maxFrames = 100;
const rocketCount = 100;

const target = new Target({ x: screen.width / 2 - 25, y: 50 }, { width: 50, height: 25 }, "#ffc107");
const barriers = [
    new Barrier({ x: screen.width / 2 - 150, y: screen.height / 2 - 50 }, { width: 300, height: 25 }, "#c62828")
];

export default {
    frame,
    screen,
    maxFrames,
    rocketCount,
    target,
    barriers
};

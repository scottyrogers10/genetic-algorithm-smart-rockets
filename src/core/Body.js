let _canvas = {
    elem: null,
    ctx: null
};

export default class Body {
    constructor(position, size, color) {
        this.position = position;
        this.size = size;
        this.color = color;
    }

    static get canvas() {
        return _canvas;
    }

    static set canvas(val) {
        _canvas = val;
    }

    draw() {
        Body.canvas.ctx.fillStyle = this.color;
        Body.canvas.ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
}

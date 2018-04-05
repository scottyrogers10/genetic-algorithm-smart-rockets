export default class Vector {
    constructor(x, y) {
        const randomAngle = Math.random() * (Math.PI * 2);

        this.x = x !== undefined ? x : this._getRandomX(randomAngle);
        this.y = y !== undefined ? y : this._getRandomY(randomAngle);
    }

    _getRandomX(angle) {
        return Math.cos(angle);
    }

    _getRandomY(angle) {
        return Math.sin(angle);
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    getAngle() {
        const angle = Math.atan2(this.y, this.x);
        const degrees = 180 * angle / Math.PI;

        return (360 + Math.round(degrees)) % 360;
    }

    getMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    distance(vector) {
        return Math.hypot(vector.x - this.x, vector.y - this.y);
    }

    multiplyBy(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }

    normalize() {
        const magnitude = this.getMagnitude();
        this.x = this.x / magnitude;
        this.y = this.y / magnitude;
    }
}

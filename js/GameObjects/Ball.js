export default class Ball {
    constructor( posX, posY, startAngle, endAngle, radius ) {
        this._posX = posX;
        this._posY = posY;
        this._startAngle = startAngle;
        this._endAngle = endAngle;
        this._radius = radius;
    }

    get posX() {
        return this._posX;
    }

    set posX( x ) {
        this._posX = x;
    }

    get posY() {
        return this._posY;
    }

    set posY( y ) {
        this._posY = y;
    }

    get startAngle() {
        return this._startAngle;
    }

    set startAngle( sa ) {
        this._startAngle = sa;
    }

    get endAngle() {
        return this._endAngle;
    }

    set endAngle( ea ) {
        this._endAngle = ea;
    }

    get radius() {
        return this._radius;
    }

    set radius( r ) {
        this._radius = r;
    }

}
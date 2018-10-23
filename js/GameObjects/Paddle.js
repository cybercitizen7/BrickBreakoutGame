export default class Paddle {
    constructor( pHeight, pWidth, pX, speed ) {
        this._pHeight = pHeight;
        this._pWidth = pWidth;
        this._pX = pX;
        this._speed = speed;
    }

    get height() {
        return this._pHeight;
    }

    get width() {
        return this._pWidth;
    }

    set width( w ) {
        this._pWidth = w;
    }

    get posX() {
        return this._pX;
    }

    set posX( x ) {
        this._pX = x;
    }

    get speed() {
        return this._speed;
    }

    set speed( s ) {
        this._speed = s;
    }
}
export default class Brick {
    constructor( bWidth, bHeight, posX, posY, visible ) {
        this._bWidth = bWidth;
        this._bHeight = bHeight;
        this._posX = posX;
        this._posY = posY;
        this._visible = visible;
    }

    get visible() {
        return this._visible;
    }

    get width() {
        return this._bWidth;
    }

    get height() {
        return this._bHeight;
    }

    get posX() {
        return this._posX;
    }

    get posY() {
        return this._posY;
    }

    set posX( x ) {
        this._posX = x;
    }

    set posY( y ) {
        this._posY = y;
    }
    
    destroyBrick() {
        this._visible = 0;
    }
 }
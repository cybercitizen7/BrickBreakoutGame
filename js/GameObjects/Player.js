export default class Player {
    constructor( score, lives ) {
        this._score = score;
        this._lives = lives;
    }

    get lives() {
        return this._lives;
    }
    
    get score() {
        return this._score;   
    }

    addScore( v ) {
        this._score += v;
    }

    takeOneLife() {
        this._lives--;
    }
}
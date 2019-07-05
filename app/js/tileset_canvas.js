const Tileset = require('./tileset');

class TilesetCanvas {

    /**
     * 
     * @param {Tileset} tileset 
     */
    constructor(tileset) {
        this._tileset = tileset;

        /** @type {HTMLCanvasElement} */
        this._canvas = document.getElementById("tilesetCanvas");

        /** @type {CanvasRenderingContext2D} */
        this._canvas_ctx = this._canvas.getContext("2d");

        /** @type {Number} */
        this._CANVAS_WIDTH = 1024;
        /** @type {Number} */
        this._CANVAS_HEIGHT = 1024;

        this._canvas.width = this._CANVAS_WIDTH;
        this._canvas.height = this._CANVAS_HEIGHT;

        this._tileset.addEventListener('onPixelChange', (ev) => {
            this.drawAll();
        }, false);

        this.drawAll();
    }

    get xStep() {
        return Math.round(this._canvas.width / this._tileset.pixelWidth);
    }

    get yStep() {
        return Math.round(this._canvas.height / this._tileset.pixelHeight);
    }

    drawAll() {
        this.clear();
        this.drawTileset();
    }

    clear() {
        const ctx = this._canvas_ctx;
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    drawTileset() {
        const ctx = this._canvas_ctx;
        const xStep = this.xStep;
        const yStep = this.yStep;

        for(let y = 0; y < this._tileset.pixelHeight; ++y) {
            for(let x = 0; x < this._tileset.pixelWidth; ++x) {
                const startX = x * xStep;
                const startY = y * yStep;

                const color = this._tileset.pixels[y][x];

                ctx.fillStyle = color.RGB;
                ctx.fillRect(startX, startY, xStep, yStep);
            }
        }
    }
}

module.exports = TilesetCanvas;
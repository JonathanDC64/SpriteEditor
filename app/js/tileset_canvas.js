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

        this._canvas.onclick = (ev) => {
            this.mouseHandler(ev);
        };

        this._tileset.addEventListener('onPixelChange', (ev) => {
            this.drawAll();
        }, false);

        this._tileset.addEventListener('onTilesetDimensionChangeEvent', (ev) => {
            this.adjustAspectRatio();
        }, false);

        this.adjustAspectRatio();
        this.drawAll();
    }

    adjustAspectRatio() {
        const aspectRatio = this._tileset.aspectRatio;
        this._canvas.width = aspectRatio * this._canvas.height;
    }

    mousePosition(ev) {
        const rect = this._canvas.getBoundingClientRect();
        return {
            x: ev.clientX - rect.left,
            y: ev.clientY - rect.top
        };
    }

    /**
     * 
     * @param {MouseEvent} ev 
     */
    mouseHandler(ev) {
        const mousePos = this.mousePosition(ev);
        console.log(`MouseX = ${mousePos.x}, MouseY = ${mousePos.y}`);
        const tileLocation = this.getTileLocation(mousePos.x, mousePos.y);
        this._tileset.selectedTileLocationX = tileLocation.tileX;
        this._tileset.selectedTileLocationY = tileLocation.tileY;
        this.drawAll();
    }

    getTileLocation(mouseX, mouseY) {
        const rect = this._canvas.getBoundingClientRect();

        const xProportion = mouseX / rect.width;
        const yProportion = mouseY / rect.height;

        const tileLocation = {
            tileX: Math.floor(xProportion * this._tileset.numXTiles),
            tileY: Math.floor(yProportion * this._tileset.numYTiles)
        };

        return tileLocation;
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
        this.drawSelectedTile();
    }

    clear() {
        const ctx = this._canvas_ctx;
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    drawSelectedTile() {
        const ctx = this._canvas_ctx;
        const xStep = this.xStep;
        const yStep = this.yStep;
        ctx.strokeStyle = '#FF0000';

        const tileLocation = this._tileset.selectedTileLocation;

        const width = this._tileset.tileWidth * xStep;
        const height = this._tileset.tileHeight * yStep;

        const x = tileLocation.x * width;
        const y = tileLocation.y * height;


        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 10;
        ctx.strokeRect(x, y, width, height);

    }

    drawTileset() {
        const ctx = this._canvas_ctx;
        const xStep = this.xStep;
        const yStep = this.yStep;

        for (let y = 0; y < this._tileset.pixelHeight; ++y) {
            for (let x = 0; x < this._tileset.pixelWidth; ++x) {
                const startX = x * xStep;
                const startY = y * yStep;

                const color = this._tileset.pixels[y][x];

                ctx.fillStyle = color.RGBA;
                ctx.fillRect(startX, startY, xStep, yStep);
            }
        }
    }
}

module.exports = TilesetCanvas;
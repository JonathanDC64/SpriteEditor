const Tileset = require("./tileset");
const ColorPicker = require("./color_picker");
const Color = require('./color');

class TileCanvas {

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     * @param {HTMLInputElement} zoomSlider 
     * @param {Tileset} tileset
     * @param {ColorPicker} colorPicker
     */
    constructor(canvas, zoomSlider, tileset, colorPicker) {
        this._canvas = canvas;
        this._canvas_ctx = this._canvas.getContext('2d');
        this._zoomSlider = zoomSlider;
        this._tileset = tileset;
        this._colorPicker = colorPicker;
        this._selectedTileLocation = {x: 0, y: 0};
        this._isDrawingPixel = false;

        /** @type {Number} */
        this._CANVAS_WIDTH = 512;
        /** @type {Number} */
        this._CANVAS_HEIGHT = 512;

        this._canvas.width = this._CANVAS_WIDTH;
        this._canvas.height = this._CANVAS_HEIGHT;

        this._zoomSlider.oninput = (ev) => {
            this.zoom();
        };

        this._canvas.onmousedown = (ev) => {
            this._isDrawingPixel = true;
            this.mouseHandler(ev);
        };

        // We use window for cases when cursor is not touching canvas
        window.onmouseup = (ev) => {
            this._isDrawingPixel = false;
        };
        
        this._canvas.onmousemove = (ev) => {
            if(this._isDrawingPixel) {
                this.mouseHandler(ev);
            }
        };

        this._canvas.on

        this.zoom();
        this.drawAll();
    }

    get xStep() {
        return Math.round(this._canvas.width / this._tileset.tileWidth);
    }

    get yStep() {
        return Math.round(this._canvas.height / this._tileset.tileHeight);
    }

    /**
     * 
     * @param {MouseEvent} ev 
     */
    mouseHandler(ev) {
        const mousePos = this.mousePosition(ev);
        console.log(`MouseX = ${mousePos.x}, MouseY = ${mousePos.y}`);
        const tileLocation = this.getTilePixelLocation(mousePos.x, mousePos.y);
        this.setPixel(tileLocation.tileX, tileLocation.tileY);
        this.drawAll();
    }

    mousePosition(ev) {
        const rect = this._canvas.getBoundingClientRect();
        return {
            x: ev.clientX - rect.left,
            y: ev.clientY - rect.top
        };
    }

    getTilePixelLocation(mouseX, mouseY) {
        const rect = this._canvas.getBoundingClientRect();

        const xProportion = mouseX / rect.width;
        const yProportion = mouseY / rect.height;

        const tilePixelLocation = {
            tileX: Math.floor(xProportion * this._tileset.tileWidth),
            tileY: Math.floor(yProportion * this._tileset.tileHeight)
        };
        return tilePixelLocation;
    }

    setPixel(x, y) {
        const tileX = this._selectedTileLocation.x;
        const tileY = this._selectedTileLocation.y;
        const color = Color.fromRGB(this._colorPicker.selectedColor);
        this._tileset.setTileData(tileX, tileY, x, y, color);

        console.log(`Set pixel on tile [${tileX},${tileY}] on pixel [${x},${y}] with color ${color.RGB}`);
    }

    zoom() {
        this._canvas.style.setProperty('height', `${this._zoomSlider.value}%`, 'important'); 
    }

    drawAll() {
        this.draw();
        this.drawGrid();
    }

    draw() {
        const tileset = this._tileset;
        const yStep = this.yStep;
        const xStep = this.xStep;

        const tileX = this._selectedTileLocation.x;
        const tileY = this._selectedTileLocation.y;

        const tile = tileset.getTileData(tileX, tileY);

        const ctx = this._canvas_ctx;

        for(let y = 0; y < tileset.pixelHeight; y++) {
            for(let x = 0; x < tileset.pixelWidth; x++) {
                const color = tile[y][x];
                const RGB = color.RGB;

                ctx.fillStyle = RGB;
                ctx.fillRect(x * xStep, y * yStep, xStep, yStep);
            }
        }
    }

    drawGrid() {
        const ctx = this._canvas_ctx;
        const yStep = this.yStep;
        const xStep = this.xStep;
        
        for(let y = yStep; y < this._canvas.height ; y += yStep) {
            ctx.strokeStyle = 'rgb(0,0,0)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this._canvas.width, y);
            ctx.closePath();
            ctx.stroke();
        }

        for(let x = xStep; x < this._canvas.width; x += xStep) {
            ctx.strokeStyle = 'rgb(0,0,0)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this._canvas.height);
            ctx.closePath();
            ctx.stroke();
        }
    }
}

module.exports = TileCanvas;
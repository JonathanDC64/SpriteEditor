const Tileset = require("./tileset");
const ColorPicker = require("./color_picker");
const Color = require('./color');

class TileCanvas {

    /**
     * 
     * @param {Tileset} tileset
     * @param {ColorPicker} colorPicker
     */
    constructor(tileset, colorPicker) {
        this._canvas = document.getElementById('tileCanvas');
        this._canvas_ctx = this._canvas.getContext('2d');
        this._zoomSlider = document.getElementById('tileCanvasZoom');
        this._gridButton = document.getElementById('gridButton');
        this._clearButton = document.getElementById('clearButton');
        this._tileset = tileset;
        this._colorPicker = colorPicker;
        this._selectedTileLocation = { x: 0, y: 0 };
        this._isDrawingPixel = false;
        this.showGrid = true;

        /** @type {Number} */
        this._CANVAS_WIDTH = 1024;
        /** @type {Number} */
        this._CANVAS_HEIGHT = 1024;

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
            if (this._isDrawingPixel) {
                this.mouseHandler(ev);
            }
        };

        this._gridButton.onclick = (ev) => {
            this.showGrid = !this.showGrid;
            this.drawAll();
        };

        this._clearButton.onclick = (ev) => {
            this.clearTile();
        };

        this._tileset.addEventListener('onTileDimensionChangeEvent', (ev) => {
            this.drawAll();
        }, false);

        this._tileset.addEventListener('onPixelChange', (ev) => {
            this.drawAll();
        }, false);

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

    set showGrid(val) {
        this._showGrid = val;
        if (val) {
            this._gridButton.classList.remove('btn-light');
            this._gridButton.classList.add('btn-primary');
        }
        else {
            this._gridButton.classList.remove('btn-primary');
            this._gridButton.classList.add('btn-light');
        }
    }

    get showGrid() {
        return this._showGrid;
    }

    zoom() {
        this._canvas.style.setProperty('width', `${this._zoomSlider.value}%`, 'important');
    }

    drawAll() {
        this.clearCanvas();
        this.drawTile();
        if (this.showGrid) {
            this.drawGrid();
        }
    }

    clearCanvas() {
        const ctx = this._canvas_ctx;
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    clearTile() {
        const tileX = this._selectedTileLocation.x;
        const tileY = this._selectedTileLocation.y;

        for (let y = 0; y < this._tileset.tileWidth; ++y) {
            for (let x = 0; x < this._tileset.tileHeight; ++x) {
                this._tileset.setTileData(tileX, tileY, x, y, Color.fromRGB('#FFFFFF'))
            }
        }
    }

    drawTile() {
        const tileset = this._tileset;
        const yStep = this.yStep;
        const xStep = this.xStep;

        const tileX = this._selectedTileLocation.x;
        const tileY = this._selectedTileLocation.y;

        const tile = tileset.getTileData(tileX, tileY);

        const ctx = this._canvas_ctx;

        for (let y = 0; y < tileset.tileHeight; y++) {
            for (let x = 0; x < tileset.tileWidth; x++) {
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

        for (let y = yStep; y < this._canvas.height; y += yStep) {
            ctx.strokeStyle = 'rgb(0,0,0)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this._canvas.width, y);
            ctx.closePath();
            ctx.stroke();
        }

        for (let x = xStep; x < this._canvas.width; x += xStep) {
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
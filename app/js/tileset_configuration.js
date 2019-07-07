const Tileset = require("./tileset");

class UpDownInput extends EventTarget {
    /**
     * 
     * @param {HTMLElement} parent 
     */
    constructor(parent) {
        super();
        this._plusButton = parent.querySelector('.plus');
        this._minusButton = parent.querySelector('.minus');
        this._inputBox = parent.querySelector('.inputBox');

        this._plusClickedEvent = new Event('onPlusClicked');
        this._minusClickedEvent = new Event('onMinusClicked');

        this._plusButton.onclick = (ev) => {
            this.inc();
            this.dispatchEvent(this._plusClickedEvent);
        };

        this._minusButton.onclick = (ev) => {
            this.dec();
            this.dispatchEvent(this._minusClickedEvent);
        };
    }

    inc() {
        this.value = this.value + 1;
    }

    dec() {
        this.value = this.value - 1;
    }

    get value() {
        return Number(this._inputBox.value);
    }

    set value(val) {
        this._inputBox.value = val;
    }
}

class TilesetConfiguration {

    /**
     * 
     * @param {Tileset} tileset 
     */
    constructor(tileset) {
        this._tileset = tileset;

        /** @type {HTMLInputElement} */
        this._tileWidthTextBox = document.getElementById("tileWidth");

        /** @type {HTMLInputElement} */
        this._tileHeightTextBox = document.getElementById("tileHeight");

        /** @type {HTMLInputElement} */
        this._numXTilesTextBox = document.getElementById("numXTiles");

        /** @type {HTMLInputElement} */
        this._numYTilesTextBox = document.getElementById("numYTiles");

        /** @type {HTMLButtonElement} */
        this._saveTilesetButton = document.getElementById("saveTileset");

        /** @type {HTMLInputElement} */
        this._selectTilesetInput = document.getElementById("selectTileset");

        this._saveTilesetButton.onclick = (ev) => {
            this.savePNG();
        };

        this._tileWidthTextBox.oninput = (ev) => {
            this.updateTileWidth();
        };

        this._tileHeightTextBox.oninput = (ev) => {
            this.updateTileHeight();
        };

        this._saveTilesetButton.on
        

        this._columnsInput = new UpDownInput(document.getElementById("columnsInput"));
        this._rowsInput = new UpDownInput(document.getElementById("rowsInput"));
        
        this._columnsInput.addEventListener('onPlusClicked', (ev) => {
            this._tileset.addColumn();
        }, false);

        this._rowsInput.addEventListener('onPlusClicked', (ev) => {
            this._tileset.addRow();
        }, false);

        this._columnsInput.addEventListener('onMinusClicked', (ev) => {
            this._tileset.removeColumn();
        }, false);

        this._rowsInput.addEventListener('onMinusClicked', (ev) => {
            this._tileset.removeRow();
        }, false);

        this.updateTileWidth();
        this.updateTileHeight();
    }

    updateTileWidth() {
        this._tileset.tileWidth = parseInt(this._tileWidthTextBox.value);

        // Sync the values incase setter failed
        this._tileWidthTextBox.value = this._tileset.tileWidth.toString();
    }

    updateTileHeight() {
        this._tileset.tileHeight = parseInt(this._tileHeightTextBox.value);

        // Sync the values incase setter failed
        this._tileHeightTextBox.value = this._tileset.tileHeight.toString();
    }

    savePNG() {
        // Simple hack to convert pixel data to PNG file
        // Without having to reimplement PNG spec or use library

        const canvas = document.createElement('canvas');
        canvas.width = this._tileset.pixelWidth;
        canvas.height = this._tileset.pixelHeight;

        const ctx = canvas.getContext('2d');

        for (let y = 0; y < this._tileset.pixelHeight; ++y) {
            for (let x = 0; x < this._tileset.pixelWidth; ++x) {
                const color = this._tileset.pixels[y][x];
                ctx.fillStyle = color.RGBA;
                ctx.fillRect(x, y, 1, 1);
            }
        }

        const img = canvas.toDataURL('image/png');
        const link = document.createElement('a');

        link.download = 'tileset.png';
        link.href = img;
        link.click();

        link.remove();
        canvas.remove();
    }
}

module.exports = TilesetConfiguration;
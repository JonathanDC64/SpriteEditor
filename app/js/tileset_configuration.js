const Tileset = require("./tileset");

class TilesetConfiguration {

    /**
     * 
     * @param {Tileset} tileset 
     */
    constructor(tileset) {
        this._tileset = tileset;

        this._tileWidthTextBox = document.getElementById("tileWidth");
        this._tileHeightTextBox = document.getElementById("tileHeight");

        this._numXTilesTextBox = document.getElementById("numXTiles");
        this._numYTilesTextBox = document.getElementById("numYTiles");

        this._saveTilesetButton = document.getElementById("saveTileset");

        this._saveTilesetButton.onclick = (ev) => {
            this.savePNG();
        };
    }

    savePNG() {
        // Simple hack to convert pixel data to PNG file
        // Without having to reimplement PNG spec or use library

        const canvas = document.createElement('canvas');
        canvas.width = this._tileset.pixelWidth;
        canvas.height = this._tileset.pixelHeight;

        const ctx = canvas.getContext('2d');

        for(let y = 0; y < this._tileset.pixelHeight; ++y) {
            for(let x = 0; x < this._tileset.pixelWidth; ++x) {
                const color = this._tileset.pixels[y][x];
                ctx.fillStyle = color.RGB;
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
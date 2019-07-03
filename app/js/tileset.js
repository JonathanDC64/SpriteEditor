const Color = require('./color');

/**
 * @class Tileset
 * @classdesc Tileset image data
 * @property {Number} tileWidth
 * @property {Number} tileHeight
 * @property {Number} numXTiles
 * @property {Number} numYTiles
 * @property {Array.<Array.<Color>>} pixels
 */
class Tileset {

    /**
     * 
     * @param {Number} tileWidth 
     * @param {Number} tileHeight 
     * @param {Number} numXTiles 
     * @param {Number} numYTiles 
     */
    constructor(tileWidth, tileHeight, numXTiles = 1, numYTiles = 1) {
        /** @type {Number} */
        this._tileWidth = tileWidth;

        /** @type {Number} */
        this._tileHeight = tileHeight;

        /** @type {Number} */
        this._numXTiles = numXTiles;

        /** @type {Number} */
        this._numYTiles = numYTiles;

        /** @type {Array.<Array.<Color>>} */
        this._pixels = new Array();
        
        for (let y = 0; y < this.pixelHeight; ++y)
        {
            this._pixels.push(new Array());
            for (let x = 0; x < this.pixelWidth; ++x)
            {
                this._pixels[y].push(new Color(255, 255, 255));
            }
        }
    }

    /**
     * Gets the tile pixel data at position X and Y (not pixels)
     * @param {Number} tileX 
     * @param {Number} tileY
     * @returns {Array.<Array.<Color>>}
     */
    getTileData(tileX, tileY) {
        const tileData = new Array();

        const startY = tileY * this.tileHeight;
        const endY = startY + this.tileHeight;

        const startX = tileX * this.tileWidth;
        const endX = startX + this.tileWidth;

        for(let y = startY; y < endY; ++y) {
            tileData.push(new Array());
            for(let x = startX; x < endX; ++x) {
                tileData[y][x] = this.pixels[y][x];
            }
        }

        return tileData;
    }

    /**
     * Change the color of a pixel for a single tile
     * @param {Number} tileX 
     * @param {Number} tileY 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Color} color 
     */
    setTileData(tileX, tileY, x, y, color) {
        const startY = tileY * this.tileHeight;
        const startX = tileX * this.tileWidth;
        
        this.pixels[startY + y][startX + x] = color;
    }

    /**
     * @returns {Number}
     */
    get tileWidth() {
        return this._tileWidth;
    }

    /**
     * @returns {Number}
     */
    get tileHeight() {
        return this._tileHeight;
    }

    /** 
     * Get the total width of the image for all tiles
     * @return {Number} Width of the tileset
     */
    get pixelWidth() {
        return this._tileWidth * this._numXTiles;
    }

    /** 
     * Get the total height of the image for all tiles
     * @return {Number} Width of the tileset
     */
    get pixelHeight() {
        return this._tileWidth * this._numYTiles;
    }

    /** @returns {Array.<Array.<Color>>} */
    get pixels() {
        return this._pixels;
    }
}

module.exports = Tileset;
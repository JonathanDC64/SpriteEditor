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
class Tileset extends EventTarget {

    /**
     * 
     * @param {Number} tileWidth 
     * @param {Number} tileHeight 
     * @param {Number} pixelWidth 
     * @param {Number} pixelHeight 
     */
    constructor(tileWidth, tileHeight, pixelWidth = tileWidth, pixelHeight = tileHeight) {
        super();

        /** @type {Number} */
        this._tileWidth = tileWidth;

        /** @type {Number} */
        this._tileHeight = tileHeight;

        /** @type {Number} */
        this._pixelWidth = pixelWidth;

        /** @type {Number} */
        this._pixelHeight = pixelHeight;

        /** @type {Array.<Array.<Color>>} */
        this._pixels = new Array();

        this.onTileDimensionChangeEvent = new Event('onTileDimensionChangeEvent');
        
        this.onTilesetDimensionChangeEvent = new Event('onTilesetDimensionChangeEvent');
        
        this.onPixelChangeEvent = new Event('onPixelChange');

        this.resize(this.pixelWidth, this.pixelHeight);
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

        for (let y = startY; y < endY; ++y) {
            tileData.push(new Array());
            for (let x = startX; x < endX; ++x) {
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
        this.dispatchEvent(this.onPixelChangeEvent);
    }

    /**
     * 
     * @param {Number} pixelWidth 
     * @param {Number} pixelHeight 
     */
    resize(pixelWidth, pixelHeight) {
        /** @type {Array.<Array.<Color>>} */
        const pixelsCopy = Object.assign(this._pixels);
        this._pixelWidth = pixelWidth;
        this._pixelHeight = pixelHeight;
        this._pixels = new Array();
        for (let y = 0; y < this.pixelHeight; ++y) {
            this._pixels.push(new Array());
            for (let x = 0; x < this.pixelWidth; ++x) {
                if (pixelsCopy[y] && pixelsCopy[y][x]) {
                    const color = pixelsCopy[y][x];
                    this._pixels[y].push(color);
                }
                else {
                    this._pixels[y].push(new Color(255, 255, 255));
                }
            }
        }
        this.dispatchEvent(this.onTilesetDimensionChangeEvent);
        this.dispatchEvent(this.onPixelChangeEvent);
    }

    addColumn() {
        this.resize(this.pixelWidth + this.tileWidth, this.pixelHeight);
    }

    addRow() {
        this.resize(this.pixelWidth, this.pixelHeight + this.tileHeight);
    }

    get numXTiles() {
        return this.pixelWidth / this.tileWidth;
    }

    get numYTiles() {
        return this.pixelHeight / this.tileHeight;
    }

    /**
     * @returns {Number}
     */
    get tileWidth() {
        return this._tileWidth;
    }

    /**
     * @param {Number} val
     */
    set tileWidth(val) {
        if (val <= this.pixelWidth) {
            this._tileWidth = val;
            this.dispatchEvent(this.onTileDimensionChangeEvent);
        }
    }

    /**
     * @returns {Number}
     */
    get tileHeight() {
        return this._tileHeight;
    }

    /**
     * @param {Number} val
     */
    set tileHeight(val) {
        if (val <= this.pixelHeight) {
            this._tileHeight = val;
            this.dispatchEvent(this.onTileDimensionChangeEvent);
        }
    }

    /** 
     * Get the total width of the image for all tiles
     * @return {Number} Width of the tileset
     */
    get pixelWidth() {
        return this._pixelWidth;
    }

    /** 
     * Get the total height of the image for all tiles
     * @return {Number} Width of the tileset
     */
    get pixelHeight() {
        return this._pixelHeight;
    }

    /** @returns {Array.<Array.<Color>>} */
    get pixels() {
        return this._pixels;
    }

    /** @type {Number} */
    get aspectRatio() {
        return this.pixelWidth / this.pixelHeight;
    }
}

module.exports = Tileset;
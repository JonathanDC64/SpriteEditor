
/** A single color unit (RGBA) */
class Color {
    /**
     * Create a single color object
     * @param {Number} red [0-255]
     * @param {Number} green [0-255]
     * @param {Number} blue [0-255]
     * @param {Number} alpha [0-255]
     */
    constructor(red, green, blue, alpha = 255) {
        /** @type {Number} */
        this._red = red;

        /** @type {Number} */
        this._green = green;

        /** @type {Number} */
        this._blue = blue;

        /** @type {Number} */
        this._alpha = alpha;
    }

    /**
     * 
     * @param {String} hex 
     */
    static fromRGB(hex) {
        hex = hex.replace('#', '');
        const r = parseInt(`0x${hex.substring(0, 2)}`)
        const g = parseInt(`0x${hex.substring(2, 4)}`);
        const b = parseInt(`0x${hex.substring(4, 6)}`);

        return new Color(r, g, b);
    }

    get RGB() {
        const redHex = this.red.toString(16).padStart(2, '0');
        const greenHex = this.green.toString(16).padStart(2, '0');
        const blueHex = this.blue.toString(16).padStart(2, '0');
        return `#${redHex}${greenHex}${blueHex}`;
    }

    get RGBA() {   
        //const alphaHex = this.alpha.toString(16);
        //return `#${this.RGB.replace('#', '')}${alphaHex}`;
        return `rgba(${this.red},${this.green},${this.blue},${this.alpha / 255})`;
    }


    get red() {
        return this._red;
    }

    set red(val) {
        this._red = this._validateColor(val);
    }

    get green() {
        return this._green;
    }

    set green(val) {
        this._green = this._validateColor(val);
    }

    get blue() {
        return this._blue;
    }

    set blue(val) {
        this._blue = this._validateColor(val);
    }

    get alpha() {
        return this._alpha;
    }

    set alpha(val) {
        this._alpha = this._validateColor(val);
    }

    /**
     * Guarantees a color value is between 0 and 255
     * @param {Number} color
     * @returns {Number} Clamped color value
     */
    _validateColor(color) {
        return this._clamp(color, 0, 255);
    }

    /**
     * Guarantees a value is within a certain bounds
     * @param {Number} value 
     * @param {Number} min 
     * @param {Number} max 
     * @returns {Number} Clamped value between min and max
     */
    _clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
}

module.exports = Color;
const TileCanvas = require('./tile_canvas');
const Tileset = require('./tileset');
const ColorPicker = require('./color_picker');
const TilesetConfiguration = require('./tileset_configuration');

class SpriteEditor {
    constructor() {
        console.log('Sprite Editor Window Loaded');

        console.log(`Current directory: ${__dirname}`);
    
        /** @type {Tileset} */
        this.tileset = new Tileset(16,16);
        console.log('Tileset data initialized');
    
        /** @type {HTMLCanvasElement} */
        this.tilesetCanvas = document.getElementById('tilesetCanvas');
        console.log('Tileset Canvas Initialized');
    
    
        const colorPickerTemplate = document.getElementById('colorPicker');
        const colorPickerContainer = document.getElementById('colorPickerContainer');
        /** @type {ColorPicker} */
        this.colorPicker = new ColorPicker(colorPickerTemplate, colorPickerContainer);

        /** @type {HTMLCanvasElement} */
        const tileCanvas = document.getElementById('tileCanvas');
        const tileCanvasZoomSlider = document.getElementById('tileCanvasZoom');
        this.tileCanvas = new TileCanvas(tileCanvas, tileCanvasZoomSlider, this.tileset, this.colorPicker);
        console.log('Tile Canvas Initialized');

        this.tilesetConfiguration = new TilesetConfiguration(this.tileset);
        console.log('Tileset Configurator Initialized');
        
        console.log('Initialization Done');
    }
}

module.exports = SpriteEditor;
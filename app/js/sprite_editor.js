const TileCanvas = require('./tile_canvas');
const TilesetCanvas = require('./tileset_canvas');
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
    
        /** @type {ColorPicker} */
        this.colorPicker = new ColorPicker();

        /** @type {TilesetCanvas} */
        this.tilesetCanvas = new TilesetCanvas(this.tileset);
        console.log('Tileset Canvas Initialized');

        /** @type {TileCanvas} */
        this.tileCanvas = new TileCanvas(this.tileset, this.colorPicker, this.tilesetCanvas);
        console.log('Tile Canvas Initialized');

        this.tilesetConfiguration = new TilesetConfiguration(this.tileset);
        console.log('Tileset Configurator Initialized');
        
        console.log('Initialization Done');
    }
}

module.exports = SpriteEditor;
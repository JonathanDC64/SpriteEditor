
class ColorPicker {

    /**
     * 
     */
    constructor() {
        this._baseTemplate = document.getElementById('colorPicker');
        this._baseContainer = document.getElementById('colorPickerContainer');
        this._primaryColors = [
            '#0000FF', '#FF0000', '#FFFF00', '#FF6600',
            '#00FF00', '#6600FF', '#000000', '#FFFFFF',
            '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF',
            '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF',
        ];
        this._selectedColorIndex = 0;

        for(let i = 0; i <this._primaryColors.length; ++i) {
            const copy = this._createColorBox();

            /** @type {HTMLInputElement} */
            const colorInput = copy.querySelector(".colorInput");

            /** @type {HTMLButtonElement} */
            const colorButton = copy.querySelector(".colorButton");
            
            colorInput.id = `colorInput${i}`;
            colorButton.id = `colorButton${i}`;
            
            colorInput.value = this._primaryColors[i];

            colorButton.onclick = (ev) => {
                this._setSelectedColor(i);
                console.log(`Selected color = ${this.selectedColor}`);
            };

            this._baseContainer.appendChild(copy);
        }

        this._setSelectedColor(0);
    }

    get selectedColor() {
        return document.getElementById(`colorInput${this._selectedColorIndex}`).value;
    }

    _setSelectedColor(index) {
        if(index >= 0 && index < this._primaryColors.length) {
            this._selectedColorIndex = index;
            document.querySelectorAll(".colorButton").forEach((value, key, parent) => {
                if(value.id == `colorButton${index}`) {
                    value.classList.add("btn-primary");
                    value.classList.remove("btn-light");
                }
                else {
                    value.classList.remove("btn-primary");
                    value.classList.add("btn-light");
                }
            });
        }
        else {
            throw new Error(`Color index not in range [${0}-${this._primaryColors.length}]`);
        }
    }

    _createColorBox() {
        return document.importNode(this._baseTemplate.content, true);
    }
}

module.exports = ColorPicker;
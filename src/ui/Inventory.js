export default class Inventory {
    constructor(scene) {
        this.scene = scene;

        this.ingredients = [
            [],
            [],
            [],
            [],
            []
            // [name, icon, popup text (optional)]
        ]

        this.shownIcons = [];

        this.selectedIndex = 0; // Index of selected

        this.MAX_INGREDIENTS = 5;
    }

    /**
     * Adds the ingredient to the inventory in any free available slot.
     * @param {String} ingredient Name of the ingredient.
     * @param {String} icon Name of the reference to the ingredient icon.
     */
    addIngredient(ingredient, icon) {
        let isInventoryFull = true;
        // Add the ingredient to the first free spot 
        for (let i = 0; i < this.ingredients.length; i++) {
            
            if (this.ingredients[i].length == 0){
                let ingredientArray = [ingredient, icon];
                this.ingredients[i] = ingredientArray;
                this.displayInventory();
                isInventoryFull = false;
                break;
            }
            
        }

        if (isInventoryFull) {
            this.scene.scene.get('Hotbar').showMessage("Inventory Full!!", "error");
        }
    }

    /**
     * Removes the ingredient at the given index.
     * @param {number} index Index of the ingredient to be removed.
     */
    removeIngredient(index) {
        // Destroy popup if ever
        if (this.ingredients[index][2] != null ) { this.ingredients[index][2].destroy(); }
        this.ingredients[index] = [];
        this.displayInventory();
    }

    /**
     * Deletes and redisplays all the ingredients on the hotbar.
     */
    displayInventory() {
        // Destroy all icons
        this.shownIcons.forEach(icon => { icon.destroy(); });

        let xAxis = 57;
        this.ingredients.forEach(ingredientArray => {
             // Display the image of the ingredient
            let iconName = ingredientArray[1];
            let iconImage = this.scene.add.image(xAxis, 460, iconName).setOrigin(0, 0).setScale(2).setDepth(2);

            // Keep track of the showing icons
            this.shownIcons.push(iconImage);

            xAxis += 147;
        });

    }

    /**
     * Displays the name of the ingredient at the given index at the top left corner.
     * @param {number} i Index of the popup's ingredient.
     */
    displayPopup(i){
        // Get the name of the ingredient of the given index and create its text
        let name = this.ingredients[i][0];

        let xAxis = 5;
        let yAxis = 5;
        this.ingredients[i].push( this.scene.add.text(xAxis, yAxis, name, { fontSize: '10px', color: '#000', fontFamily: 'daydream' }));
    }

    /**
     * Destroys the text object of the ingredient.
     * @param {number} i Index of the popup's ingredient.
     */
    destroyPopup(i){
        if(this.ingredients[i][2] != null){
            this.ingredients[i][2].destroy();
            this.ingredients[i].pop();
        }
        
    }

    /**
     * Moves the selection bar to the left, if possible.
     */
    increaseSelection() {
        if (this.selectedIndex < this.MAX_INGREDIENTS - 1) {
            this.selectedIndex += 1;
            this.displayInventory();
        }
    }

    /**
     * Moves the selection bar to the right, is possible.
     */
    decreaseSelection() {
        if (this.selectedIndex > 0) {
            this.selectedIndex -= 1;
            this.displayInventory();
        }
    }

    /**
     * Returns the index of the selected ingredient in the inventory.
     * @returns {number} Index of the selected ingredient.
     */
    getSelectedIndex() { return this.selectedIndex; }

    /**
     * Returns the name of the selected ingredient.
     * @returns {String} The name of the selected ingredient
     */
    getSelectedIngredient() { return this.ingredients[this.selectedIndex][0]; }

    /**
     * Sets the index of the selection bar to this slot, whether empty or not.
     * @param {number} i Index to be selected. 
     */
    setSelectedIndex(i) { this.selectedIndex = i; }

    /**
     * Returns all the ingredients.
     * @returns {Array} A nested array of the ingredients.
     */
    getInventory(){ return this.ingredients; }

    /**
     * Checks if the inventory contains the given ingredient.
     * @param {String} ingredient The name of the ingredient to find.
     * @returns {number} The index of the search ingredient. Returns -1 if it doesn't exist.
     */
    containsIngredient(ingredient){
        this.ingredients.forEach((ingredientArray, i) => {
            if (ingredientArray[0] == ingredient) { return i; }
        });

        return -1;
    }

    /**
     * Checks if an inventory slot is empty at the given index.
     * @param {integer} index The index of the inventory slot to be checked.
     * @returns {boolean} True if it's empty, false if not.
     */
    isEmptyAt(index){
        if (this.ingredients[index].length != 0) { return false; }
        else { return true; }
    }
}
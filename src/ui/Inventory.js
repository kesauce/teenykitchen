export default class Inventory {
    constructor(scene) {
        this.scene = scene;

        //this.ingredients = {};

        this.ingredients = [
            [],
            [],
            [],
            [],
            []
            // [name, icon, popup text (optional)]
        ]

        this.shownIcons = [];

        this.selectedIngredient = 0; // Index of selected

        this.MAX_INGREDIENTS = 5;
    }

    addIngredient(ingredient, icon) {
        // If replacing another ingredient, ensure to destroy the popup if ever
        if (this.ingredients[this.selectedIngredient][2] != null ) { this.ingredients[this.selectedIngredient][2].destroy(); }
        let ingredientArray = [ingredient, icon];
        this.ingredients[this.selectedIngredient] = ingredientArray;
        this.displayInventory();

    }

    removeIngredient(ingredient, n) {
        // Check if ingredient exist and amount to decrease is less than amount you have
        if (ingredient in this.ingredients) {
            
            // Decrease amount by that much
            if (n < this.ingredients[ingredients].amount) {
                this.ingredients.ingredient.amount -= 1;
            }

            // Completely delete the ingredient
            else if (n === this.ingredients[ingredients].amount) {
                delete this.ingredients.ingredient;
            }

            // Error: trying to remove an amount larger than inventory
            else { console.error("Error removing ingredient: amount is larger than current stock"); }
        }
        // Error: ingredient doesn't exist in inventory
        else { console.error("Error removing ingredient: ingredient doesn't exist in inventory"); }

    }

    displayInventory() {
        // Destroy all icons
        this.shownIcons.forEach(icon => { icon.destroy(); });

        let xAxis = 57;
        this.ingredients.forEach(ingredientArray => {
             // Display the image of the ingredient
            let iconName = ingredientArray[1];
            let iconImage = this.scene.add.image(xAxis, 460, iconName).setOrigin(0, 0).setScale(2);

            // Keep track of the showing icons
            this.shownIcons.push(iconImage);

            xAxis += 147;
        });

    }

    displayPopup(i){
        // Get the name of the ingredient of the given index and create its text
        let name = this.ingredients[i][0];

        let xAxis = 5;
        let yAxis = 5;
        this.ingredients[i].push( this.scene.add.text(xAxis, yAxis, name, { fontSize: '10px', color: '#000', fontFamily: 'daydream' }));
    }

    destroyPopup(i){
        if(this.ingredients[i][2] != null){
            this.ingredients[i][2].destroy();
            this.ingredients[i].pop();
        }
        
    }

    increaseSelection() {
        if (this.selectedIngredient < this.MAX_INGREDIENTS - 1) {
            this.selectedIngredient += 1;
            this.displayInventory();
        }
    }

    decreaseSelection() {
        if (this.selectedIngredient > 0) {
            this.selectedIngredient -= 1;
            this.displayInventory();
        }
    }

    getSelected() { return this.selectedIngredient; }

    setSelected(i) { this.selectedIngredient = i; }

    containsIngredient(ingredient){
        this.ingredients.forEach((ingredientArray, i) => {
            if (ingredientArray[0] == ingredient) { return i; }
        });

        return -1;
    }

    isEmptyAt(index){
        if (this.ingredients[index].length != 0) { return false; }
        else { return true; }
    }
}
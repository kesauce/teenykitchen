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
            // [name, icon, amount]
        ]

        this.shownIcons = [];

        this.selectedIngredient = 0; // Index of selected

        this.MAX_INGREDIENTS = 5;
    }

    addIngredient(ingredient, icon) {
        let index = this.containsIngredient(ingredient);

        // Check if ingredient already exists, if so then increment the amount
        if (index != -1){ 
            this.ingredients[index][2] += 1;
        }

        // Only add when ingredient is less than max
        else if (this.isEmptyAt(this.selectedIngredient)) {
            let ingredientArray = [ingredient, icon, 1];
            this.ingredients[this.selectedIngredient] = ingredientArray;
            this.displayInventory();
        }

        // Error: inventory is full
        else { console.error("Error adding ingredient: inventory is full"); }

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
        this.ingredients.forEach((ingredientArray, i) => {
            if (i == index && ingredientArray != []) { return false; }
        });

        return true;
    }
}
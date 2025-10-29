export default class Inventory {
    constructor(scene) {
        this.scene = scene;

        this.ingredients = {};

        this.shownIcons = [];

        this.selectedIngredient = 0; // Index of selected

        this.MAX_INGREDIENTS = 5;
    }

    addIngredient(ingredient, n, i) {
        // Only add when ingredient is less than max
        if (Object.keys(this.ingredients).length < this.MAX_INGREDIENTS) {
            this.ingredients[ingredient] = { amount: n, icon: i};
        }

        // Error: inventory is full
        else { console.error("Error adding ingredient: inventory is full"); }

    }

    removeIngredient(ingredient, n) {
        // Check if ingredient exist and amount to decrease is less than amount you have
        if (ingredient in this.ingredients) {
            let ingredientIndex = this.ingredientsHeld.indexOf(ingredient);

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

        
        Object.keys(this.ingredients).forEach(key => {
             // Display the image of the ingredient
            let iconName = this.ingredients[key].icon;
            let iconImage = this.scene.add.image(57, 460, iconName).setOrigin(0, 0).setScale(2);

            // Keep track of the showing icons
            this.shownIcons.push(iconImage);
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

    printIngredients() {
        console.log(this.ingredientsHeld);
        console.log(this.ingredientsAmount);
        console.log(this.ingredientsIcon);
    }
}
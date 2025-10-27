export default class Inventory {
    constructor(scene) {
        this.scene = scene;

        this.ingredientsHeld = [];
        this.ingredientsAmount = [];
        this.ingredientsIcon = [];

        this.shownIcons = [];

        this.selectedIngredient = 0; // Index of selected

        this.MAX_INGREDIENTS = 6;
    }

    addIngredient(ingredient, amount, icon){
        // Only add when ingredient is less than max
        if (this.ingredientsHeld.length < 6){
            this.ingredientsHeld.push(ingredient);
            this.ingredientsAmount.push(amount);
            this.ingredientsIcon.push(icon);
        }

        // Error: inventory is full
        else {
            console.error("Error adding ingredient: inventory is full");
        }

    }

    removeIngredient(ingredient, amount){
        // Check if ingredient exist and amount to decrease is less than amount you have
        if (this.ingredientsHeld.includes(ingredient)){
            let ingredientIndex = this.ingredientsHeld.indexOf(ingredient);

            // Decrease amount by that much
            if (amount < this.ingredientsAmount[ingredientIndex]){
                this.ingredientsAmount[ingredientIndex] -= amount
            }

            // Completely delete the ingredient
            else if (amount = this.ingredientsAmount[ingredientIndex]){
                this.ingredientsHeld.splice(ingredientIndex, 1);
                this.ingredientsAmount.splice(ingredientIndex, 1);
                this.ingredientsIcon.splice(ingredientIndex, 1);
            }

            // Error: trying to remove an amount larger than inventory
            else{
                console.log("Error removing ingredient: amount is larger than current stock")
            }
        }
        // Error: ingredient doesn't exist in inventory
        else{
            console.log("Error removing ingredient: ingredient doesn't exist in inventory");
        }
    
    }

    displayInventory(){
        // Destroy all icons
        this.shownIcons.forEach(icon => {
            icon.destroy();
        });
        
        // Display all the ingredients on the hotbar
        for (let index = 0; index < this.ingredientsHeld.length; index++) {
            // Display the image of the ingredient
            let iconName = this.ingredientsIcon[index];
            let iconImage = this.scene.add.image(57, 460, iconName).setOrigin(0, 0).setScale(2);

            // Keep track of the showing icons
            this.shownIcons.push(iconImage);
            
        }

        // Display the select bar
    }

    printIngredients(){
        console.log(this.ingredientsHeld);
        console.log(this.ingredientsAmount);
        console.log(this.ingredientsIcon);
    }
}
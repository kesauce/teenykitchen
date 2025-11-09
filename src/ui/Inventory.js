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

        this.selectedIngredient = 0; // Index of selected

        this.MAX_INGREDIENTS = 5;
    }

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

    removeIngredient(index) {
        // Destroy popup if ever
        if (this.ingredients[index][2] != null ) { this.ingredients[index][2].destroy(); }
        this.ingredients[index] = [];
        this.displayInventory();
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

    getInventory(){ return this.ingredients; }

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
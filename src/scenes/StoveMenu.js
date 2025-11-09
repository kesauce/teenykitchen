import Recipes from '../classes/Recipes.js'

export default class StoveMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'StoveMenu', active: false });

        this.stove;
        this.inventory;
        this.recipes;
        this.selectedIndex;     // Stores the index of the currently selected
        this.select;            // Stores the select image

        this.ingredientZones;   
        this.questionText;      // Stores the text of "???"
        this.ingredients;       // [name, icon name, image]
    }

    create(){
        this.selectedIndex = 0;
        this.ingredientZones = [];
        this.questionText = [];
        this.ingredients = [
            // [name, icon, image, popup?]
        ];

        // Access global fridge object
        this.stove = this.registry.get('stove');
        this.inventory = this.registry.get('inventory');
        
        this.recipes = new Recipes();

        // Listen for hotbar click events
        this.game.events.on('hotbarClicked', this.onHotbarClicked, this);

        this.initialiseStoveMenu();        
    }

    initialiseStoveMenu(){
        const sizes = this.registry.get('sizes');

        const menuX = 30;
        const menuY = 30;
        const menuWidth = sizes.width - 60;
        const menuHeight = sizes.height - 120;

        // Add background and cancel button
        this.add.rectangle(menuX, menuY, menuWidth, menuHeight, 0xfadde1).setOrigin(0, 0).setInteractive();
        this.add.image(menuWidth + 10, menuY - 15, "cancel").setOrigin(0);

        // Makes the cancel button clickable
        let cancelZone = this.add.zone(menuWidth + 10, menuY - 15, 42, 42).setOrigin(0, 0).setInteractive({ useHandCursor: true });

        // If cancel is clicked then close the scene
        cancelZone.on('pointerdown', () => {
            this.stove.close();
        });

        // Add the label
        this.add.text(40, 40, 'Stove', {
            fontFamily: 'daydream',
            fontSize: '25px',
            color: '#000000',
            padding: { top: 4, bottom: 6 }
        });

        

        // Add the 3 ingredient zone locations
        let zoneX = menuX + 50;
        let zoneY = menuY + 70;
        let zoneWidth = 118;
        let zoneHeight = 70;
        let zoneGap = 120;

        // Add the frying pan and select image
        this.anims.createFromAseprite('pan');
        let pan = this.add.sprite(menuWidth/2 - 30, menuHeight/2, "pan").setOrigin(0, 0).setScale(4);
        pan.play({ key: 'moving_pan', repeat: -1 });
        this.select = this.add.image(zoneX, zoneY, 'select').setOrigin(0, 0);

        let panZone = this.add.zone(menuWidth/2 - 30, menuHeight/2, 130, 130).setOrigin(0, 0).setInteractive({ useHandCursor: true });
        panZone.on('pointerdown', () => {
            if (this.ingredients.length == 3){
                this.cook();
            }
            else {this.scene.get("Hotbar").showMessage("Not enough ingredients!!")}
        });

        for (let i = 0; i < 3; i++) {
            let zone = this.add.zone(zoneX, zoneY, zoneWidth, zoneHeight).setOrigin(0, 0);
            let text = this.add.text(zoneX + 25, zoneY + 16, "???",{
                fontFamily: 'daydream',
                fontSize: '25px',
                color: '#999999',
                padding: { top: 4, bottom: 6 }
            });
            this.questionText.push(text);

            // If zones were hovered then show popup
            // zone.on('pointerover', () => {
            //     this.add.text(5, 5, this.ingredients[i], { fontSize: '10px', color: '#000', fontFamily: 'daydream' });
            // });

            this.ingredientZones.push(zone);
            
            zoneX += zoneWidth + zoneGap;
        }

    }

    onHotbarClicked(zoneIndex){
        // Only add if stove has < 3 ingredients
        if (this.ingredients.length < 3 && !this.inventory.isEmptyAt(zoneIndex)){
            // Grab the ingredient of the clicked zone, remove it from inventory, and add to the stove
            let ingredientArray = this.inventory.getInventory()[zoneIndex];
            this.inventory.removeIngredient(zoneIndex);
            this.ingredients[zoneIndex] = [ingredientArray[0], ingredientArray[1]]; // Only add the name and icon of ingredient

            // Make ??? invisible and move over the select image
            this.questionText[this.selectedIndex].setVisible(false);
            this.updateSelection();

            this.updateStoveMenu();
        }
    }

    updateStoveMenu(){
        let ingX = 110;
        let ingY = 100;
        let gap = 238;

        console.log(this.ingredients);

        // Display all the stove ingredients
        this.ingredients.forEach((ingredient, i) => {
            // Destroy and redraw all the images
            if (ingredient[2] != null){
                ingredient[2].destroy();
                ingredient.pop();
            }
            ingredient.push(this.add.image(ingX, ingY, ingredient[1]).setOrigin(0, 0).setScale(2));
            this.ingredients[i] = ingredient;
            ingX += gap;
        });
    }

    updateSelection(){
        if (this.selectedIndex < 3){
            this.selectedIndex++;
            this.select.setX(80 + this.selectedIndex * 238);
        }
    }

    cook(){
        // Check if there's a recipe for the ingredients
        let recipe = {};
        let ingredientNames = [];

        this.ingredients.forEach(ing => {
            ingredientNames.push(ing[0]);
        });

        if (this.recipes.findRecipe(ingredientNames, "Stove") != null){
            recipe = this.recipes.findRecipe(ingredientNames, "Stove");
            this.inventory.addIngredient(recipe.meal, recipe.mealIcon);
        }

        // Add rocks to the inventory
        else {
            this.inventory.addIngredient("Rocks", "rocks");
        }

        // Destroy all the ingredient images
        
        this.ingredients.forEach((ingredient, i) => {
            console.log(ingredient[2]);
            // Destroy all the images
            if (ingredient[2] != null){
                ingredient[2].destroy();
            }
        });
        this.ingredients = [];
        this.updateStoveMenu();
    }
}
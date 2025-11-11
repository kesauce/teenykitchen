import Recipes from '../classes/Recipes.js'

/**
 * @typedef {Object} CounterMeasurements
 * @property {number} menuX - X position of the menu.
 * @property {number} menuY - Y position of the menu.
 * @property {number} menuWidth - Width of the menu.
 * @property {number} menuHeight - Height of the menu.
 * @property {number} zoneX - X position of the first, leftmost ingredient zone.
 * @property {number} zoneT - Y position of the first, leftmost ingredient zone.
 * @property {number} zoneWidth - Width of each ingredient zone.
 * @property {number} zoneHeight - Height of each ingredient zone.
 * @property {number} zoneGap - Gap between each ingredient zone
 */

export default class CounterMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'CounterMenu', active: false });

        this.counter;
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

        this.counter = this.registry.get('counter');
        this.inventory = this.registry.get('inventory');
        this.recipes = new Recipes();

        this.game.events.on('hotbarClicked', this.onHotbarClicked, this);
        this.initialiseCounterMenu();        
    }

    initialiseCounterMenu(){
        const sizes = this.registry.get('sizes');

        const measurements = {
            menuX: 30,
            menuY: 30,
            menuWidth: sizes.width - 60,
            menuHeight: sizes.height - 120,
            zoneX: 80,
            zoneY: 100,
            zoneWidth: 118,
            zoneHeight: 70,
            zoneGap: 120

        }

        this.createBackgroundAndCancel(measurements);
        this.createBowl(measurements);
        this.createZones(measurements);

    }

    /**
     * Transfers the ingredient from the inventory to the counter if there are enough spaces on the counter.
     * @param {number} zoneIndex 
     */
    onHotbarClicked(zoneIndex){
        if (this.scene.isActive() && this.ingredients.length < 3 && !this.inventory.isEmptyAt(zoneIndex)){
            let ingredientArray = this.inventory.getInventory()[zoneIndex];
            this.inventory.removeIngredient(zoneIndex);
            this.ingredients[this.selectedIndex] = [ingredientArray[0], ingredientArray[1]]; // Only add the name and icon of ingredient

            this.questionText[this.selectedIndex].setVisible(false);
            this.updateSelection();
            this.updateCounterMenu();
        }
    }

    /**
     * Reset all the ingredient images and redisplays them.
     */
    updateCounterMenu(){
        let ingX = 110;
        let ingY = 100;
        let gap = 238;

        this.ingredients.forEach((ingredient, i) => {
            if (ingredient[2] != null){
                ingredient[2].destroy();
                ingredient.pop();
            }
            ingredient.push(this.add.image(ingX, ingY, ingredient[1]).setOrigin(0, 0).setScale(2));
            this.ingredients[i] = ingredient;
            ingX += gap;
        });
    }

    /**
     * Increases the select image location.
     */
    updateSelection(){
        if (this.selectedIndex < 3){
            this.selectedIndex++;
            this.select.setX(80 + this.selectedIndex * 238);
        }
    }

    /**
     * Checks if a recipe exists with the current ingredients on the counter. If it exists, then get the meal name
     * and add the meal to your inventory. If it doesn't, add rocks to the inventory. Display an popup message for
     * either outcomes and resets the scene.
     */
    cook(){
        let recipe = {};
        let ingredientNames = [];

        this.ingredients.forEach(ing => {
            ingredientNames.push(ing[0]);
        });

        if (this.recipes.findRecipe(ingredientNames, "Counter") != null){
            recipe = this.recipes.findRecipe(ingredientNames, "Counter");
            this.inventory.addIngredient(recipe.meal, recipe.mealIcon);

            this.scene.get("Hotbar").showMessage(recipe.meal + "!!", "achievement")
        }
        else {
            this.inventory.addIngredient("Rocks", "rocks");
            this.scene.get("Hotbar").showMessage("Rocks...?", "achievement");
        }

        this.restartCounterMenu();
    }

    /**
     * Initialises the background, select image, cancel button, and label for the counter menu.
     * @param {CounterMeasurements} measurements 
     */
    createBackgroundAndCancel(measurements){
        this.add.rectangle(measurements.menuX, measurements.menuY, measurements.menuWidth, measurements.menuHeight, 0xfadde1).setOrigin(0, 0).setInteractive();
        
        this.select = this.add.image(measurements.zoneX, measurements.zoneY, 'select').setOrigin(0, 0);

        this.add.image(measurements.menuWidth + 10, measurements.menuY - 15, "cancel").setOrigin(0);
        let cancelZone = this.add.zone(measurements.menuWidth + 10, measurements.menuY - 15, 42, 42).setOrigin(0, 0).setInteractive({ useHandCursor: true });

        cancelZone.on('pointerdown', () => {
            if (this.selectedIndex > -1){
                this.ingredients.forEach(ingredient => {
                    this.inventory.addIngredient(ingredient[0], ingredient[1]);
                });
            }
            this.restartCounterMenu();
            this.counter.close();
        });

        this.add.text(40, 40, 'Counter', {
            fontFamily: 'daydream',
            fontSize: '25px',
            color: '#000000',
            padding: { top: 4, bottom: 6 }
        });
    }

    /**
     * Intialises the bowl animation and its zone.
     * @param {CounterMeasurements} measurements 
     */
    createBowl(measurements){
        if (!this.anims.exists('moving_bowl')) { this.anims.createFromAseprite('bowl'); }

        let pan = this.add.sprite(measurements.menuWidth/2 - 30, measurements.menuHeight/2, "bowl").setOrigin(0, 0).setScale(4);
        pan.play({ key: 'moving_bowl', repeat: -1 });

        let panZone = this.add.zone(measurements.menuWidth/2 - 30, measurements.menuHeight/2, 130, 130).setOrigin(0, 0).setInteractive({ useHandCursor: true });
        panZone.on('pointerdown', () => {
            if (this.ingredients.length == 3){
                this.cook();
            }
            else {this.scene.get("Hotbar").showMessage("Not enough ingredients!!", "error")}
        });
    }

    /**
     * Initialises the zones each of the ingredient zones.
     * @param {CounterMeasurements} measurements 
     */
    createZones(measurements){
        let zoneX = measurements.zoneX;

        for (let i = 0; i < 3; i++) {
            let zone = this.add.zone(zoneX, measurements.zoneY, measurements.zoneWidth, measurements.zoneHeight).setOrigin(0, 0);
            let text = this.add.text(zoneX + 25, measurements.zoneY + 16, "???",{
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
            
            zoneX += measurements.zoneWidth + measurements.zoneGap;
        }
    }

    /**
     * Re-initialises the ingredients array and select image.
     */
    restartCounterMenu(){
        this.ingredients.forEach(ingredient => {
            if (ingredient[2] != null){ ingredient[2].destroy(); }
        });

        this.ingredients = [[],[],[]];
        this.updateCounterMenu();
        this.scene.restart();
    }
}
import Fridge from '../classes/Fridge.js';
import Stove from '../classes/Stove.js';
import Oven from '../classes/Oven.js';
import Sink from '../classes/Sink.js';
import Inventory from '../ui/Inventory.js';

export default class FridgeMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'FridgeMenu', active: false });

        this.ingredients = [
            ['Milk', 'milk_bottle'],
            ['Egg', 'egg'],
            ['Apple', 'red_apple'],
            ['Banana', 'banana'],
            ['Butter', 'butter'],
            ['Flour', 'flour'],
            ['Sugar', 'sugar'],
            ['Coffee', 'coffee'],
            ['Cocoa Powder', 'cocoa'],
            ['Yogurt', 'yogurt'],
            ['Potato', 'potato'],
            ['Fish', 'fish'],
            ['Strawberry', 'strawberry'],
            ['Grape', 'grape']
        ];
        
        this.fridge;
        this.inventory;
    }

    preload() {
    }

    create() {
        // Access global fridge object
        this.fridge = this.registry.get('fridge');
        this.inventory = this.registry.get('inventory');

        this.initialiseFridgeMenu();
        this.displayIngredients();

        //test to add ingredient
        this.inventory.addIngredient('Milk', 1, 'milk_bottle');
        this.inventory.printIngredients();
        this.inventory.displayInventory();


    }

    initialiseFridgeMenu(){
        const sizes = this.registry.get('sizes');

        // Add background and cancel button
        this.add.rectangle(30, 30, (sizes.width) - 60, (sizes.height) - 120, 0xfadde1).setOrigin(0).setInteractive();
        this.add.image(sizes.width - 54, 12, "cancel").setOrigin(0);

        // Makes the cancel button clickable
        let cancelZone = this.add.zone(sizes.width - 54, 12, 42, 42).setOrigin(0).setInteractive({ useHandCursor: true });

        // If cancel is clicked then close the scene
        cancelZone.on('pointerdown', () => {
            this.fridge.close();
        });

        // Add the label
        this.add.text(40, 40, 'Fridge', {
            fontFamily: 'daydream',
            fontSize: '25px',
            color: '#000000'
        });
    }

    displayIngredients() {
        const sizes = this.registry.get('sizes');
        
        // Create a scrollable container and populate it with ingredients
        let yAxis = 50;
        let xAxis = 10;
        let ingredientContainer = this.add.container(40, 50);
        this.ingredients.forEach((item, i) => {
            let icon = this.add.image(xAxis, yAxis - 15, item[1]).setOrigin(0, 0).setScale(1.5);
            let text = this.add.text(xAxis + 60, yAxis, item[0], { fontSize: '16px', color: '#000', fontFamily: 'daydream' });
            ingredientContainer.add(text);
            ingredientContainer.add(icon);

            yAxis += 60;
        });

        // Create a mask to prevent out of bound ingredients
        const maskShape = this.make.graphics(); maskShape.fillRect(40, 80, sizes.width - 60, sizes.height - 180); // (x, y, width, height) 
        const mask = maskShape.createGeometryMask();
        ingredientContainer.setMask(mask);

        // Create scroll zone overlay that moves the ingredient container up and down
        const scrollZone = this.add.zone(30, 50, sizes.width - 60, sizes.height - 120).setInteractive().setOrigin(0);
        scrollZone.on('wheel', (pointer, dx, dy, dz) => {
            const scrollSpeed = 0.25;
            ingredientContainer.y -= dy * scrollSpeed;

            // Create bounds to prevent overscrolling
            let maxY = 50;
            let minY = sizes.height - 150 - ingredientContainer.getBounds().height;

            if (ingredientContainer.y > maxY) ingredientContainer.y = maxY;
            if (ingredientContainer.y < minY) ingredientContainer.y = minY;

        });


    }

}
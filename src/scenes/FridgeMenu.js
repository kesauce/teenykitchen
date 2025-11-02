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
        this.ingredientsContainer;
        this.ingredientSelectImage;
    }

    preload() {
    }

    create() {
        // Access global fridge object
        this.fridge = this.registry.get('fridge');
        this.inventory = this.registry.get('inventory');

        this.initialiseFridgeMenu();
        this.displayIngredients();

        // Store the keys for using keyboard
        // this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        // this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        // this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    }


    initialiseFridgeMenu(){
        const sizes = this.registry.get('sizes');

        const menuX = 30;
        const menuY = 30;
        const menuWidth = sizes.width - 60;
        const menuHeight = sizes.height - 120;

        // Add background and cancel button
        this.add.rectangle(menuX, menuY, menuWidth, menuHeight, 0xfadde1).setOrigin(0).setInteractive();
        this.add.image(menuWidth + 10, menuY - 15, "cancel").setOrigin(0).setDepth;

        // Makes the cancel button clickable
        let cancelZone = this.add.zone(sizes.width - 54, 12, 42, 42).setOrigin(0).setInteractive({ useHandCursor: true }).setDepth(10);

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

        const containerX = 40;
        const containerY = 50;
        const maskX = 40;
        const maskY = 80;
        const visibleWidth = sizes.width - 60;
        const visibleHeight = sizes.height - 180;
        const ingredientGap = 60;

        // Create a scrollable container and populate it with ingredients
        let yAxis = 50;
        let xAxis = 10;
        this.ingredientsContainer = this.add.container(containerX, containerY).setDepth(0);

        // Display the name and icon of each ingredient and create a zone of it
        this.ingredients.forEach((ingredientArray) => {
            let icon = this.add.image(xAxis, yAxis - 15, ingredientArray[1]).setOrigin(0, 0).setScale(1.5);
            let text = this.add.text(xAxis + 60, yAxis, ingredientArray[0], { fontSize: '16px', color: '#000', fontFamily: 'daydream' });
            this.ingredientsContainer.add(text);
            this.ingredientsContainer.add(icon);

            yAxis += ingredientGap;
        });

        // Create a mask to prevent out of bound ingredients
        const maskShape = this.make.graphics(); maskShape.fillRect(maskX, maskY, visibleWidth, visibleHeight);
        const mask = maskShape.createGeometryMask();
        this.ingredientsContainer.setMask(mask);

        this.ingredientSelectImage = this.add.image(containerX, 0, "ingredient_select").setOrigin(0, 0).setVisible(false);

        // Create scroll zone overlay that moves the ingredient container up and down
        const scrollZone = this.add.zone(maskX, maskY, visibleWidth, visibleHeight).setInteractive().setOrigin(0, 0).setDepth(0);
        scrollZone.on('wheel', (pointer, dx, dy, dz) => {
            this.ingredientSelectImage.setVisible(false);
            
            const scrollSpeed = 0.56;
            this.ingredientsContainer.y -= dy * scrollSpeed;

            // Create bounds to prevent overscrolling
            let maxY = 50;
            let minY = sizes.height - 150 - this.ingredientsContainer.getBounds().height;

            if (this.ingredientsContainer.y > maxY) this.ingredientsContainer.y = maxY;
            if (this.ingredientsContainer.y < minY) this.ingredientsContainer.y = minY;

        });

        let previousIndex;

        // Check if any of the specific ingredient zones have been hovered on
        scrollZone.on('pointermove', (pointer) => {
            // Turn the mouse pointer coordinate relative to the container and find out which ingredient index that corresponds to
            const localY = pointer.y - this.ingredientsContainer.y - maskY;
            const index = Math.ceil(localY / ingredientGap);

            // Don't redraw if you're still on the same index
            if (previousIndex == index){ return; }

            // Don't select an ingredient that's out of bounds
            if (pointer.y < maskY || pointer.y > maskY + visibleHeight - 15) { return; }

            // Change the hovered ingredient to add a select image
            if (index >= 0 && index < this.ingredients.length) {
                let yPos = index * ingredientGap + this.ingredientsContainer.y + 25; 

                if (this.ingredientSelectImage) { this.ingredientSelectImage.setVisible(false); }

                this.ingredientSelectImage.y = yPos;
                this.ingredientSelectImage.setVisible(true);
                previousIndex = index;
            }
        });

        // If mouse goes out of scroll zone then reset the image and selection index
        scrollZone.on('pointerout', () => {
            this.ingredientSelectImage.setVisible(false);
            previousIndex = null;
        });

        scrollZone.on('pointerdown', (pointer) => {
            // Turn the mouse pointer coordinate relative to the container and figure out which ingredient index that corresponds to
            const localY = pointer.y - this.ingredientsContainer.y - maskY;
            const index = Math.ceil(localY / ingredientGap);

            // Add the clicked ingredient to the inventory
            if (index >= 0 && index < this.ingredients.length) {           
                this.inventory.addIngredient(this.ingredients[index][0], this.ingredients[index][1]);
            }
        });
    }



}
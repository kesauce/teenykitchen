import './style.css';
import Phaser from 'phaser';
import Fridge from './fridge.js';
import Stove from './stove.js';
import Oven from './oven.js';
import Sink from './sink.js';
import Inventory from './inventory.js';

// Creating constant variables
const sizes = {
	width: 768,
	height: 540
}


// Setting up game scene
class Kitchen extends Phaser.Scene {
	constructor() {
		super({ key: "Kitchen" });

		this.fridge;
		this.stove;
		this.oven;
		this.sink;
		this.inventory;

	}

	preload() {
		// Preload kitchen items
		this.load.image("bg", "/assets/kitchen/bg.png");
		this.load.image("openfridge", "/assets/kitchen/openfridge.png");
		this.load.image("stoveon", "/assets/kitchen/stoveon.png");
		this.load.image("ovenon", "/assets/kitchen/ovenon.png");
		this.load.image("sinkon", "/assets/kitchen/sinkon.png");

		// Preload ingredients
		this.load.image("milk_bottle", "/assets/ingredients/milk_bottle.png");
		this.load.image("egg", "/assets/ingredients/egg_white.png");
		this.load.image("banana", "/assets/ingredients/banana.png");
		this.load.image("butter", "/assets/ingredients/butter.png");
		this.load.image("red_apple", "/assets/ingredients/red_apple.png");
		this.load.image("flour", "/assets/ingredients/flour.png");
		this.load.image("sugar", "/assets/ingredients/sugar.png");
		this.load.image("coffee", "/assets/ingredients/coffee_bag.png");
		this.load.image("cocoa", "/assets/ingredients/hot_cocoa_mix.png");
		this.load.image("yogurt", "/assets/ingredients/plain_yogurt.png");
		this.load.image("potato", "/assets/ingredients/potato.png");
		this.load.image("fish", "/assets/ingredients/fish.png");
		this.load.image("strawberry", "/assets/ingredients/strawberry.png");
		this.load.image("grape", "/assets/ingredients/red_grape.png");

		// Preload UI
		this.load.image("cancel", "/assets/ui/cancel.png");
		this.load.image("hotbar", "/assets/ui/hotbar.png");
		this.load.image("select", "/assets/ui/select.png");
	}

	create() {

		this.createKitchen();
		this.createUI();

		// Ensuring objects can be globally accessed
		this.registry.set('fridge', this.fridge);
		this.registry.set('stove', this.stove);
		this.registry.set('oven', this.oven);
		this.registry.set('sink', this.sink);
		this.registry.set('inventory', this.inventory);


	}


	// ---------- ***** ---------- //


	createKitchen() {
		// Add the kitchen background
		let bg = this.add.image(0, 0, "bg").setOrigin(0, 0);

		bg.setScale(
			this.cameras.main.width / bg.width,
			this.cameras.main.height / bg.height
		);

		this.fridge = new Fridge(this);
		this.stove = new Stove(this);
		this.oven = new Oven(this);
		this.sink = new Sink(this);
		this.inventory = new Inventory(this);
	}

	createUI() {
		// Adding the hotbar and the select icon to the screen
		this.add.image(15, sizes.height - 82, "hotbar").setOrigin(0, 0);
		
		this.inventory.displayInventory();
		this.scene.launch('Hotbar');
		this.scene.bringToTop('Hotbar');

	}
}

class FridgeMenu extends Phaser.Scene {
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

class Hotbar extends Phaser.Scene {
	constructor(){
		super({ key: 'Hotbar' });
	}

	create(){
		// Store the selected icon for destroying
		this.selectedIcon;

		// Grab the inventory class
		this.inventory = this.registry.get('inventory');

		// Store the keys for changing inventory
		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

		// Store the zones for each inventory slot
		this.hotbarZones = [];
		for (let index = 0; index < 5; index++) {
			let xZoneAxis =  30 + (index * 146);
			let zone = this.add.zone(xZoneAxis, 458, 118, 70).setOrigin(0).setInteractive({ useHandCursor: true });
			this.hotbarZones.push(zone);
			
		}

		this.inventory.displayInventory();
		this.updateHotbar();
		
	}

	update(){
		// Check if W or D is clicked (A go left, D go right)
		if (Phaser.Input.Keyboard.JustDown(this.keyA)) {
			this.inventory.decreaseSelection();
			this.updateHotbar();
		}

		if (Phaser.Input.Keyboard.JustDown(this.keyD)) {
			this.inventory.increaseSelection();
			this.updateHotbar();
		}

		// If any of the zones were clicked
		this.hotbarZones.forEach(zone => {
			zone.on('pointerdown', () => {
				let zoneIndex = this.hotbarZones.indexOf(zone);
				this.inventory.setSelected(zoneIndex);
				this.updateHotbar();
			});
		});

		
	}

	updateHotbar(){
		// Destroy the previous select bar
		if (this.selectedIcon) this.selectedIcon.destroy();

		// Display the new select bar
        let selectionOffset = 30 + (this.inventory.getSelected() * 146)
        this.selectedIcon = this.add.image(selectionOffset, 458, "select").setOrigin(0, 0);
        this.tweens.add({
            targets: this.selectedIcon,
            alpha: 0,              // Fades out
            duration: 500,
            yoyo: true,            // Go back to alpha = 1
            repeat: -1             // Repeat forever
        });
	}
}

// Setting up the game
const config = {
	type: Phaser.WEBGL,
	width: sizes.width,
	height: sizes.height,
	canvas: gameCanvas,
	pixelArt: true,   // keeps crisp edges

	scene: [Kitchen, FridgeMenu, Hotbar]

}

// Running the game
const game = new Phaser.Game(config)

import './style.css';
import Phaser from 'phaser';
import Fridge from './fridge.js';
import Stove from './stove.js';
import Oven from './oven.js';
import Sink from './sink.js';

// Creating constant variables
const sizes = {
  width: 256,
  height: 180
}

const speedDown = 300

// Setting up game scene
class Kitchen extends Phaser.Scene{
  constructor(){
    super("scene-game")

    this.fridge;
    this.stove;
    this.oven;
    this.sink;
    
  }

  preload(){
    // Preload kitchen items
    this.load.image("bg", "/assets/kitchen/bg.png");
    this.load.image("openfridge", "/assets/kitchen/openfridge.png");
    this.load.image("stoveon", "/assets/kitchen/stoveon.png");
    this.load.image("ovenon", "/assets/kitchen/ovenon.png");
    this.load.image("sinkon", "/assets/kitchen/sinkon.png");

    // Preload ingredients
    this.load.image("milk_bottle", "/assets/ingredients/milk_bottle.png");
    this.load.image("egg_white", "/assets/ingredients/egg_white.png");

    // Preload UI
    this.load.image("cancel", "/assets/ui/cancel.png")
  }

  create(){

    //this.IntialiseIngredients();
    this.CreateKitchen();

    
  }

  update(){

  }

  // ---------- ***** ---------- //
  

  CreateKitchen(){
    // Add the kitchen background
    this.add.image(0, 0, "bg").setOrigin(0, 0);

    this.fridge = new Fridge(this);
    this.stove = new Stove(this);
    this.oven = new Oven(this);
    this.sink = new Sink(this);
  }
}

class FridgeMenu extends Phaser.Scene{
  constructor() {
    super({ key: 'FridgeMenu', active: false });
    
    this.items = [
      { image: 'milk_bottle', name: 'Milk' },
      { image: 'egg_white', name: 'Egg' },
    ];
  }

  preload(){
    // Load game font
    this.load.bitmapFont('monogram', 'assets/fonts/monogram-bitmap.png', 'assets/fonts/monogram-bitmap.json')
  }

  create() {
    // Add background and cancel button
    this.add.rectangle(10, 10, (this.game.config.width) - 20, (this.game.config.height) - 20, 0xfadde1).setOrigin(0);
    this.add.image(this.game.config.width - 19, 5, "cancel").setOrigin(0);

    // Makes the cancel button clickable
    let cancelZone = this.add.zone(this.game.config.width - 19, 5, 14, 14).setOrigin(0).setInteractive({ useHandCursor: true });

    // If cancel is clicked then close the scene
    cancelZone.on('pointerdown', () => {
      this.scene.stop('FridgeMenu')
      this.scene.resume('Kitchen')
    });

    // Add the label
    this.add.bitmapText(10, 10, 'monogram', 'hello', 100)
    
    
    // Starting position for the list
    let startX = 30;
    let startY = 30;
    let spacingY = 40; // space between rows

    // Display the ingredients
    // this.items.forEach((item, index) => {
    //   let y = startY + index * spacingY;

    //   // Image
    //   let icon = this.add.image(startX, y, item.image).setOrigin(0, 0);
    //   icon.setDisplaySize(32, 32);

    //   // Text
    // });
  }

}

// Setting up the game
const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  pixelArt: true,   // keeps crisp edges
  scale: {
    mode: Phaser.Scale.NONE, // or Phaser.Scale.NONE
    zoom: 3              // <-- upscale by 3
  },

  scene: [Kitchen, FridgeMenu]
}

// Running the game
const game = new Phaser.Game(config)

import './style.css';
import Phaser from 'phaser';
import Fridge from './fridge.js';
import Stove from './stove.js';
import Oven from './oven.js';
import Sink from './sink.js';

// Creating constant variables
const sizes = {
  width: 768,
  height: 540
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
    let bg = this.add.image(0, 0, "bg").setOrigin(0, 0);
    
    bg.setScale(
      this.cameras.main.width / bg.width,
      this.cameras.main.height / bg.height
    );

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
  }

  create() {
    // Add background and cancel button
    this.add.rectangle(30, 30, (this.game.config.width) - 60, (this.game.config.height) - 60, 0xfadde1).setOrigin(0);
    this.add.image(this.game.config.width - 54, 12, "cancel").setOrigin(0);

    // Makes the cancel button clickable
    let cancelZone = this.add.zone(this.game.config.width - 54, 12, 42, 42).setOrigin(0).setInteractive({ useHandCursor: true });

    // If cancel is clicked then close the scene
    cancelZone.on('pointerdown', () => {
      this.scene.stop('FridgeMenu')
      this.scene.resume('Kitchen')
    });

    // Add the label
    this.add.text(30, 30, 'Fridge', {
      fontFamily: 'daydream', 
      fontSize: '32px',
      color: '#000000'
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

  scene: [Kitchen, FridgeMenu]
}

// Running the game
const game = new Phaser.Game(config)

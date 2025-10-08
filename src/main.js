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
    super({ key: "Kitchen" });

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
    this.load.image("banana", "/assets/ingredients/banana.png");
    this.load.image("butter", "/assets/ingredients/butter.png");
    this.load.image("red_apple", "/assets/ingredients/red_apple.png");
    this.load.image("flour", "/assets/ingredients/flour.png");

    // Preload UI
    this.load.image("cancel", "/assets/ui/cancel.png")
  }

  create(){

    //this.IntialiseIngredients();
    this.CreateKitchen();

    // Ensuring my objects can be globally accessed
    this.registry.set('fridge', this.fridge);
    this.registry.set('stove', this.stove);
    this.registry.set('oven', this.oven);
    this.registry.set('sink', this.sink);
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
    
    this.ingredients = [
      ['Milk', 'milk_bottle'],
      ['Egg', 'egg_white'],
      ['Apple', 'red_apple'],
      ['Banana', 'banana'],
      ['Butter', 'butter'],
      ['Flour', 'flour']
    ];
  }

  preload(){
  }

  create() {
    // Access global fridge object
    const fridge = this.registry.get('fridge');
    
    // Add background and cancel button
    this.add.rectangle(30, 30, (this.game.config.width) - 60, (this.game.config.height) - 60, 0xfadde1).setOrigin(0);
    this.add.image(this.game.config.width - 54, 12, "cancel").setOrigin(0);

    // Makes the cancel button clickable
    let cancelZone = this.add.zone(this.game.config.width - 54, 12, 42, 42).setOrigin(0).setInteractive({ useHandCursor: true });

    // If cancel is clicked then close the scene
    cancelZone.on('pointerdown', () => {
      fridge.close();
    });

    // Add the label
    this.add.text(40, 40, 'Fridge', {
      fontFamily: 'daydream', 
      fontSize: '25px',
      color: '#000000'
    });

    // Create a scrollable container and populate it with ingredients
    console.log(this.ingredients);
    let yAxis = 40;
    let ingredientContainer = this.add.container(40, 50);
    this.ingredients.forEach((item) => {
      let icon = this.add.image(10, yAxis - 15, item[1]).setOrigin(0, 0).setScale(1.5);
      let text = this.add.text(70, yAxis, item[0], { fontSize: '16px', color: '#000', fontFamily: 'daydream' });
      ingredientContainer.add(text);
      ingredientContainer.add(icon);

      yAxis += 60;
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

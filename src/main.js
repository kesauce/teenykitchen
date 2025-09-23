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
    this.load.image("bg", "/assets/kitchen/bg.png");
    this.load.image("openfridge", "/assets/kitchen/openfridge.png");
    this.load.image("stoveon", "/assets/kitchen/stoveon.png");
    this.load.image("ovenon", "/assets/kitchen/ovenon.png");
    this.load.image("sinkon", "/assets/kitchen/sinkon.png")
  }

  create(){
    // ---------- ***** ---------- //

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


// Setting up the game
const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  physics:{
    default: "arcade",
    arcade:{
      gravity:{y: speedDown},
      debug: true
    }
  },

  pixelArt: true,   // keeps crisp edges
  scale: {
    mode: Phaser.Scale.NONE, // or Phaser.Scale.NONE
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 3              // <-- upscale by 3
  },

  scene: [Kitchen]
}

// Running the game
const game = new Phaser.Game(config)

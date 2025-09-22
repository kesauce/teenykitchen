import './style.css'
import Phaser from 'phaser'

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
  }

  preload(){
    this.load.image("bg", "/assets/kitchen/bg.png")
    this.load.image("openfridge", "/assets/kitchen/openfridge.png")
    this.load.image("stoveon", "/assets/kitchen/stoveon.png")
  }

  create(){
    // Add the kitchen background
    this.add.image(0, 0, "bg").setOrigin(0, 0);

    // ---------- ***** ---------- //

    // Sets the clickable fridge
    let fridgeZone = this.add.zone(155, 13, 32, 58);
    fridgeZone.setOrigin(0);
    fridgeZone.setInteractive({ useHandCursor: true }); // Uses a hand cursor
    let openFridgeImage;
    let isFridgeOpen = false;

    fridgeZone.on('pointerdown', () => {
      console.log("Fridge clicked!");
      if (!isFridgeOpen){
        openFridgeImage = this.add.image(146, 8, "openfridge").setOrigin(0, 0);
        isFridgeOpen = true;
      }
      else{
        openFridgeImage.destroy();
        isFridgeOpen = false;
      }
    });

    // ---------- ***** ---------- //

    // Sets the clickable stove
    let stoveZone = this.add.zone(90, 31, 30, 14);
    stoveZone.setOrigin(0);
    stoveZone.setInteractive({ useHandCursor: true }); // Uses a hand cursor
    let stoveOnImage;
    let isStoveOn = false;

    stoveZone.on('pointerdown', () => {
      console.log("Stove clicked!");
      if (!isStoveOn){
        stoveOnImage = this.add.image(89, 31, "stoveon").setOrigin(0, 0);
        isStoveOn = true;
      }
      else{
        stoveOnImage.destroy();
        isStoveOn = false;
      }
    });

  }

  update(){

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

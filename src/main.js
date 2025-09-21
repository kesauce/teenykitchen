import './style.css'
import Phaser from 'phaser'

// Creating constant variables
const sizes = {
  width: 256,
  height: 180
}

const speedDown = 300

// Setting up game scene
class GameScene extends Phaser.Scene{
  constructor(){
    super("scene-game")
  }

  preload(){
    this.load.image("bg", "/assets/kitchen/bg.png")
  }

  create(){
    this.add.image(0, 0, "bg").setOrigin(0, 0)
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

  scene: [GameScene]
}

// Running the game
const game = new Phaser.Game(config)

import './style.css';
import Phaser from 'phaser';
import Kitchen from './scenes/Kitchen.js'
import FridgeMenu from './scenes/FridgeMenu.js';
import Hotbar from './scenes/Hotbar.js'

// Creating constant variables
const sizes = {
	width: 768,
	height: 540
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
game.registry.set('sizes', {
	width: 768,
	height: 540
});

import './style.css';
import Phaser from 'phaser';
import Kitchen from './scenes/Kitchen.js'
import FridgeMenu from './scenes/FridgeMenu.js';
import Hotbar from './scenes/Hotbar.js';
import StoveMenu from './scenes/StoveMenu.js';
import CounterMenu from './scenes/CounterMenu.js';
import OvenMenu from './scenes/OvenMenu.js';

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

	scene: [Kitchen, FridgeMenu, Hotbar, StoveMenu, CounterMenu, OvenMenu]

}

// Running the game
const game = new Phaser.Game(config)
game.registry.set('sizes', {
	width: 768,
	height: 540
});
game.registry.set('ingredients', [
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
]);

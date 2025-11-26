import Recipes from '../classes/Recipes.js'

/**
 * @typedef {Object} NovaMeasurements
 * @property {number} menuX - X position of the menu.
 * @property {number} menuY - Y position of the menu.
 * @property {number} menuWidth - Width of the menu.
 * @property {number} menuHeight - Height of the menu.
 * @property {number} zoneX - X position of the first, leftmost ingredient zone.
 * @property {number} zoneT - Y position of the first, leftmost ingredient zone.
 * @property {number} zoneWidth - Width of each ingredient zone.
 * @property {number} zoneHeight - Height of each ingredient zone.
 * @property {number} zoneGap - Gap between each ingredient zone
 */

export default class NovaMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'NovaMenu', active: false });

        this.nova;
        this.inventory;
    }

    create(){
        this.initialiseNovaMenu();        
    }

    initialiseNovaMenu(){
        const sizes = this.registry.get('sizes');

        const measurements = {
            menuX: 30,
            menuY: 30,
            menuWidth: sizes.width - 60,
            menuHeight: sizes.height - 120,
            zoneX: 80,
            zoneY: 100,
            zoneWidth: 118,
            zoneHeight: 70,
            zoneGap: 120

        }

        this.createBackgroundAndCancel(measurements);

    }

    /**
     * Initialises the background, select image, cancel button, and label for the nova menu.
     * @param {NovaMeasurements} measurements 
     */
    createBackgroundAndCancel(measurements){
        this.add.rectangle(measurements.menuX, measurements.menuY, measurements.menuWidth, measurements.menuHeight, 0xfadde1).setOrigin(0, 0).setInteractive();

        this.add.image(measurements.menuWidth + 10, measurements.menuY - 15, "cancel").setOrigin(0);
        let cancelZone = this.add.zone(measurements.menuWidth + 10, measurements.menuY - 15, 42, 42).setOrigin(0, 0).setInteractive({ useHandCursor: true });

        cancelZone.on('pointerdown', () => {
            this.scene.stop("NovaMenu");
        });

        this.add.text(40, 40, 'Nova', {
            fontFamily: 'daydream',
            fontSize: '25px',
            color: '#000000',
            padding: { top: 4, bottom: 6 }
        });
    }
}
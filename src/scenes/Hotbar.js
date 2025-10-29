import Fridge from '../classes/Fridge.js';
import Stove from '../classes/Stove.js';
import Oven from '../classes/Oven.js';
import Sink from '../classes/Sink.js';
import Inventory from '../ui/Inventory.js';

export default class Hotbar extends Phaser.Scene {
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
            let zone = this.add.zone(xZoneAxis, 458, 118, 70).setOrigin(0, 0).setInteractive({ useHandCursor: true }).setDepth(10);
            this.hotbarZones.push(zone);
            
        }

        // If any of the zones were clicked
        this.hotbarZones.forEach(zone => {
            zone.on('pointerdown', () => {
                let zoneIndex = this.hotbarZones.indexOf(zone);
                this.inventory.setSelected(zoneIndex);
                this.updateHotbar();
            });
        });

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
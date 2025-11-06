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
        // Disable the browser's right-click context menu
        this.input.mouse.disableContextMenu();

        // Store the selected icon for destroying
        this.selectedIcon;

        // Grab the inventory class
        this.inventory = this.registry.get('inventory');

        // Store the keys for changing inventory
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Store the zones for each inventory slot
        this.hotbarZones = [];
        for (let index = 0; index < 5; index++) {
            let xZoneAxis =  30 + (index * 146);
            let zone = this.add.zone(xZoneAxis, 458, 118, 70).setOrigin(0, 0).setInteractive({ useHandCursor: true }).setDepth(10);
            this.hotbarZones.push(zone);
            
        }

        this.hotbarZones.forEach(zone => {
            let zoneIndex = this.hotbarZones.indexOf(zone);

            // If any of the zones were clicked
            zone.on('pointerdown', (pointer) => {
                // If it was a right click then remove object
                if (pointer.rightButtonDown()){ 
                    this.inventory.removeIngredient(zoneIndex); 
                }
                else{
                    this.inventory.setSelected(zoneIndex);
                }
                
                // Emit a global event
                this.game.events.emit('hotbarClicked', zoneIndex);
                this.updateHotbar();
            });

            // If any of the zones were hovered, then show a popup
            zone.on('pointerover', () => {
                if (!this.inventory.isEmptyAt(zoneIndex)){ this.inventory.displayPopup(zoneIndex); }
            });

            // Destroy the popup when hovered out
            zone.on('pointerout', () => {
                this.inventory.destroyPopup(zoneIndex); 
            })
        });

        this.inventory.displayInventory();
        this.updateHotbar();
        
    }

    update(){
        // Check if A or D is clicked (A go left, D go right)
        if (Phaser.Input.Keyboard.JustDown(this.keyA)) {
            this.inventory.decreaseSelection();
            this.updateHotbar();
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyD)) {
            this.inventory.increaseSelection();
            this.updateHotbar();
        }
        
        // If E is clicked, remove ingredient from hotbar
        if (Phaser.Input.Keyboard.JustDown(this.keyE)){
            this.inventory.removeIngredient(this.inventory.getSelected());
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

    showMessage(text){
        // Create a popup
        const popupText = this.add.text(150, 220, text,
            {
                fontFamily: 'daydream',
                fontSize: '30px',
                color: '#8c2f39',
                padding: { top: 4, bottom: 6 }
            }
            ).setOrigin(0, 0).setDepth(100);

        // Fade the text out over 1.5 seconds, then destroy it
        this.tweens.add({
            targets: popupText,
            alpha: 0,
            y: popupText.y - 30, // move upward slightly
            ease: 'Power1',
            duration: 1500,
            onComplete: () => {
                popupText.destroy();
            }
        });
    }
}
import Recipes from '../classes/Recipes.js'

export default class StoveMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'StoveMenu', active: false });

        this.stove;
        this.inventory;
        this.recipes;
        this.selectedSlot = 0;

        this.ingredientZones = [];
        this.ingredients = [];
    }

    create(){
        // Access global fridge object
        this.stove = this.registry.get('stove');
        this.inventory = this.registry.get('inventory');
        
        this.recipes = new Recipes();

        this.initialiseStoveMenu();
    }

    initialiseStoveMenu(){
        const sizes = this.registry.get('sizes');

        const menuX = 30;
        const menuY = 30;
        const menuWidth = sizes.width - 60;
        const menuHeight = sizes.height - 120;

        // Add background and cancel button
        this.add.rectangle(menuX, menuY, menuWidth, menuHeight, 0xfadde1).setOrigin(0, 0).setInteractive();
        this.add.image(menuWidth + 10, menuY - 15, "cancel").setOrigin(0).setDepth;

        // Makes the cancel button clickable
        let cancelZone = this.add.zone(sizes.width - 54, 12, 42, 42).setOrigin(0).setInteractive({ useHandCursor: true }).setDepth(10);

        // If cancel is clicked then close the scene
        cancelZone.on('pointerdown', () => {
            this.stove.close();
        });

        // Add the label
        this.add.text(40, 40, 'Stove', {
            fontFamily: 'daydream',
            fontSize: '25px',
            color: '#000000'
        });

        

        // Add the 3 ingredient zone locations
        let zoneX = menuX + 50;
        let zoneY = menuY + 70;
        let zoneWidth = 118;
        let zoneHeight = 70;
        let zoneGap = 120;

        // Add the frying pan and select image
        this.add.image(menuWidth/2 - 30, menuHeight/2, "pan").setOrigin(0, 0).setScale(4);
        this.add.image(zoneX, zoneY, 'select').setOrigin(0, 0);

        for (let i = 0; i < 3; i++) {
            let zone = this.add.zone(zoneX, zoneY, zoneWidth, zoneHeight).setOrigin(0, 0);
            this.add.text(zoneX + 25, zoneY + 20, "???",{
                fontFamily: 'daydream',
                fontSize: '25px',
                color: '#999999'
            });

            this.ingredientZones.push(zone);
            
            zoneX += zoneWidth + zoneGap;
        }

    }
}
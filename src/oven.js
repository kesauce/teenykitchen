export default class Oven {
  constructor(scene) {

    this.scene = scene;
    this.zone;
    this.openImage;
    this.menu;

    // Sets the clickable stove
    this.zone = scene.add.zone(91, 46, 29, 21).setOrigin(0).setInteractive({ useHandCursor: true });
    this.openImage = scene.add.image(91, 46, "ovenon").setOrigin(0, 0).setVisible(false);

    // Opens menu when clicked
    this.zone.on('pointerdown', () => {
      console.log("Oven clicked!");
      this.open();
    });

    // Show open oven when hovered
    this.zone.on('pointerover', () => {
      this.openImage.setVisible(true);
    });

    // Hide open oven when not hovered
    this.zone.on('pointerout', () => {
      this.openImage.setVisible(false);
    });
  }

  open() {
    
  }
  
}
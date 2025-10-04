export default class Oven {
  constructor(scene) {

    this.scene = scene;
    this.zone;
    this.openImage;
    this.menu;

    // Sets the clickable stove
    this.zone = scene.add.zone(273, 138, 90, 69).setOrigin(0).setInteractive({ useHandCursor: true });
    this.openImage = scene.add.image(273, 138, "ovenon").setOrigin(0, 0).setVisible(false);

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
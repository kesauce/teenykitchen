export default class Stove {
  constructor(scene) {

    this.scene = scene;
    this.zone;
    this.openImage;
    this.menu;

    // Sets the clickable stove
    this.zone = scene.add.zone(90, 31, 30, 14).setOrigin(0).setInteractive({ useHandCursor: true });
    this.openImage = scene.add.image(89, 31, "stoveon").setOrigin(0, 0).setVisible(false);

    // Opens menu when clicked
    this.zone.on('pointerdown', () => {
      console.log("Stove clicked!");
      this.open();
    });

    // Show open stove when hovered
    this.zone.on('pointerover', () => {
      this.openImage.setVisible(true);
    });

    // Hide open stove when not hovered
    this.zone.on('pointerout', () => {
      this.openImage.setVisible(false);
    });
  }

  open() {
    
  }
  
}